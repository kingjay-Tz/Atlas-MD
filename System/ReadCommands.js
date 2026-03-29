import fs from "fs";
import Collections from "./Collections.js";
const commands = new Collections();
commands.prefix = global.prefa;

 async function readcommands(){
    const cmdfile = fs
      .readdirSync("./Plugins")
      .filter((file) => file.endsWith(".js"));
    for (const file of cmdfile) {
      const module = await import(`../Plugins/${file}`);
      const cmdfiles = module.default;
      commands.set(cmdfiles.name, cmdfiles);
    }
  };

  export {readcommands, commands};
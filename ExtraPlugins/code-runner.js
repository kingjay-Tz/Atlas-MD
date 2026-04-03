import fs from "fs";
import url from "url";
import https from "https";
import { checkMod } from "../System/MongoDB/MongoDb_Core.js";

let mergedCommands = ["exec", "run", "html", "gethtml"];

export default {
  name: "coderunner",
  alias: [...mergedCommands],
  uniquecommands: ["exec", "run", "html", "gethtml"],
  description: "To run JavaScript code in run time",
  start: async (
    Atlas,
    m,
    { prefix, inputCMD, doReact, text, isCreator, isintegrated }
  ) => {
    switch (inputCMD) {
      case "exec":
      case "run": {
        const isUsermod = await checkMod(m.sender);
        if (!isCreator && !isintegrated && !isUsermod) {
          await doReact("❌");
          return m.reply("Sorry, only my *Mods* can use *Realtime Script Execution*.");
        }
        if (!text) {
          await doReact("❔");
          return m.reply(`Please provide a command to execute!\n\nExample: *${prefix}exec m.reply("3rd party code is being executed...")*`);
        }
        await doReact("🔰");
        try {
          const result = eval(text);
          const out = JSON.stringify(result, null, "\t") || "Evaluated JavaScript";
          m.reply(out);
        } catch (e) {
          m.reply(`Error: ${e.message}`);
        }
        break;
      }

      case "html":
      case "gethtml": {
        if (!text) {
          await doReact("❔");
          return m.reply(`Please provide a website to get HTML!\n\nExample: *${prefix}html target_website*`);
        }
        await doReact("🔰");

        const fetchAndSend = (target, ext, mime) => {
          let finalTarget = target;
          if (!finalTarget.includes("http")) finalTarget = "http://" + finalTarget;
          const parsed = url.parse(finalTarget);
          const hostname = parsed.hostname;
          const path = parsed.pathname;
          const options = {
            hostname,
            path,
            method: "GET",
            headers: {
              "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
              Connection: "keep-alive",
              "Accept-Language": "en-US,en;q=0.9",
              Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            },
          };
          const req = https.request(options, (res) => {
            let data = "";
            res.on("data", (chunk) => { data += chunk; });
            res.on("end", () => {
              const filePath = `./System/Cache/${hostname}.${ext}`;
              fs.writeFile(filePath, data, (err) => {
                if (err) {
                  m.reply("Error: " + err.message);
                } else {
                  Atlas.sendMessage(m.from, { document: fs.readFileSync(filePath), fileName: `${hostname}.${ext}`, mimetype: mime }, { quoted: m });
                  fs.unlinkSync(filePath);
                }
              });
            });
          });
          req.on("error", (error) => { console.error("Error:", error); });
          req.end();
        };

        try {
          if (text.split(" ")[0] !== "--txt") {
            fetchAndSend(text, "html", "text/html");
          } else {
            fetchAndSend(text.replace("--txt ", ""), "txt", "text/plain");
          }
        } catch (e) {
          await doReact("❌");
          m.reply(`Error: ${e.message}`);
        }
        break;
      }

      default:
        break;
    }
  },
};

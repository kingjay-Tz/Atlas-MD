import maker from "mumaker";

let mergedCommands = [
  "3dchristmas", "3dneon", "3dspace", "3dstone", "bear", "blackpink", "blood",
  "bookeh", "candy", "carbon", "chocolate", "christmas", "cloud", "circuit",
  "deepsea", "dropwater", "glitch", "glitch2", "glitch3", "graffiti", "joker",
  "lion", "holographic", "magma", "matrix", "neon", "neonlight", "neongreen",
  "papercut", "pencil", "pornhub", "scifi", "sparklechristmas", "thunder",
  "thunder2", "wolf", "wall", "transformer",
];

const makeLogoSingle = async (Atlas, m, url, text) => {
  try {
    const data = await maker.textpro(url, [`${text}`]);
    Atlas.sendMessage(m.from, { image: { url: data }, caption: `Made by ${botName}` }, { quoted: m });
  } catch (err) {
    m.reply("An error occurred!");
  }
};

const makeLogoDual = async (Atlas, m, url, teks1, teks2) => {
  try {
    const data = await maker.textpro(url, [`${teks1}`, `${teks2}`]);
    Atlas.sendMessage(m.from, { image: { url: data }, caption: `Made by ${botName}` }, { quoted: m });
  } catch (err) {
    m.reply("An error occurred!");
  }
};

export default {
  name: "logomakers",
  alias: [...mergedCommands],
  uniquecommands: [...mergedCommands],
  description: "All Logo maker Commands",
  start: async (Atlas, m, { inputCMD, text, prefix, doReact }) => {
    switch (inputCMD) {
      case "3dchristmas": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}3dchristmas Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/3d-christmas-text-effect-by-name-1055.html", text);
        break;
      }
      case "3dneon": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}3dneon Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/create-3d-neon-light-text-effect-online-1028.html", text);
        break;
      }
      case "3dspace": {
        if (!text.includes(",")) { await doReact("❌"); return m.reply(`Example: *${prefix}3dspace Atlas Bot , Team Atlas*`); }
        await doReact("🏮");
        await makeLogoDual(Atlas, m, "https://textpro.me/create-space-3d-text-effect-online-985.html", text.split(",")[0], text.split(",")[1]);
        break;
      }
      case "3dstone": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}3dstone Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html", text);
        break;
      }
      case "bear": {
        if (!text.includes(",")) { await doReact("❌"); return m.reply(`Example: *${prefix}bear Atlas Bot , Team Atlas*`); }
        await doReact("🏮");
        await makeLogoDual(Atlas, m, "https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html", text.split(",")[0], text.split(",")[1]);
        break;
      }
      case "blackpink": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}blackpink Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/create-blackpink-logo-style-online-1001.html", text);
        break;
      }
      case "blood": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}blood Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/horror-blood-text-effect-online-883.html", text);
        break;
      }
      case "bookeh": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}bookeh Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/bokeh-text-effect-876.html", text);
        break;
      }
      case "candy": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}candy Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/create-christmas-candy-cane-text-effect-1056.html", text);
        break;
      }
      case "carbon": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}carbon Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/carbon-text-effect-833.html", text);
        break;
      }
      case "chocolate": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}chocolate Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/chocolate-cake-text-effect-890.html", text);
        break;
      }
      case "christmas": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}christmas Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/christmas-tree-text-effect-online-free-1057.html", text);
        break;
      }
      case "circuit": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}circuit Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html", text);
        break;
      }
      case "cloud": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}cloud Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html", text);
        break;
      }
      case "deepsea": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}deepsea Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html", text);
        break;
      }
      case "dropwater": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}dropwater Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/dropwater-text-effect-872.html", text);
        break;
      }
      case "glitch": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}glitch Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/create-impressive-glitch-text-effects-online-1027.html", text);
        break;
      }
      case "glitch2": {
        if (!text.includes(",")) { await doReact("❌"); return m.reply(`Example: *${prefix}glitch2 Atlas Bot , Team Atlas*`); }
        await doReact("🏮");
        await makeLogoDual(Atlas, m, "https://textpro.me/create-a-glitch-text-effect-online-free-1026.html", text.split(",")[0], text.split(",")[1]);
        break;
      }
      case "glitch3": {
        if (!text.includes(",")) { await doReact("❌"); return m.reply(`Example: *${prefix}glitch3 Atlas Bot , Team Atlas*`); }
        await doReact("🏮");
        await makeLogoDual(Atlas, m, "https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html", text.split(",")[0], text.split(",")[1]);
        break;
      }
      case "graffiti": {
        if (!text.includes(",")) { await doReact("❌"); return m.reply(`Example: *${prefix}graffiti Atlas Bot,Team Atlas*`); }
        await doReact("🏮");
        await makeLogoDual(Atlas, m, "https://textpro.me/create-a-cool-graffiti-text-on-the-wall-1010.html", text.split(",")[0], text.split(",")[1]);
        break;
      }
      case "holographic": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}holographic Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/holographic-3d-text-effect-975.html", text);
        break;
      }
      case "joker": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}joker Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/create-logo-joker-online-934.html", text);
        break;
      }
      case "lion": {
        if (!text.includes(",")) { await doReact("❌"); return m.reply(`Example: *${prefix}lion Atlas Bot , Team Atlas*`); }
        await doReact("🏮");
        await makeLogoDual(Atlas, m, "https://textpro.me/create-lion-logo-mascot-online-938.html", text.split(",")[0], text.split(",")[1]);
        break;
      }
      case "magma": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}magma Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/create-a-magma-hot-text-effect-online-1030.html", text);
        break;
      }
      case "matrix": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}matrix Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/matrix-style-text-effect-online-884.html", text);
        break;
      }
      case "neon": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}neon Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/neon-text-effect-online-879.html", text);
        break;
      }
      case "neonlight": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}neonlight Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html", text);
        break;
      }
      case "neongreen": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}neongreen Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html", text);
        break;
      }
      case "papercut": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}papercut Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/create-art-paper-cut-text-effect-online-1022.html", text);
        break;
      }
      case "pencil": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}pencil Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/create-a-sketch-text-effect-online-1044.html", text);
        break;
      }
      case "pornhub": {
        if (!text.includes(",")) { await doReact("❌"); return m.reply(`Example: *${prefix}pornhub Atlas Bot,Team Atlas*`); }
        await doReact("🏮");
        await makeLogoDual(Atlas, m, "https://textpro.me/pornhub-style-logo-online-generator-free-977.html", text.split(",")[0], text.split(",")[1]);
        break;
      }
      case "scifi": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}scifi Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html", text);
        break;
      }
      case "sparklechristmas": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}sparklechristmas Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/sparkles-merry-christmas-text-effect-1054.html", text);
        break;
      }
      case "thunder": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}thunder Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/online-thunder-text-effect-generator-1031.html", text);
        break;
      }
      case "thunder2": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}thunder2 Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/create-thunder-text-effect-online-881.html", text);
        break;
      }
      case "transformer": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}transformer Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/create-a-transformer-text-effect-online-1035.html", text);
        break;
      }
      case "wall": {
        if (!text) { await doReact("❌"); return m.reply(`Example: *${prefix}wall Atlas Bot*`); }
        await doReact("🏮");
        await makeLogoSingle(Atlas, m, "https://textpro.me/break-wall-text-effect-871.html", text);
        break;
      }
      case "wolf": {
        if (!text.includes(",")) { await doReact("❌"); return m.reply(`Example: *${prefix}wolf Atlas Bot , Team Atlas*`); }
        await doReact("🏮");
        await makeLogoDual(Atlas, m, "https://textpro.me/create-wolf-logo-galaxy-online-936.html", text.split(",")[0], text.split(",")[1]);
        break;
      }
      default:
        break;
    }
  },
};

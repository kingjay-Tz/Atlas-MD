import Jimp from "jimp";
import Canvacord from "canvacord";
import fs from "fs";
import remobg from "remove.bg";

let mergedCommands = ["blur", "circle", "jail", "removebg"];

export default {
  name: "imageedit",
  uniquecommands: ["blur", "circle", "jail", "removebg"],
  alias: [...mergedCommands],
  description: "All Image Editing Commands",
  start: async (Atlas, m, { inputCMD, text, doReact, mime, quoted }) => {
    switch (inputCMD) {
      case "blur": {
        if (!m.quoted && !/image/.test(mime)) {
          await doReact("❔");
          return m.reply("Please tag someone! or mention a picture!");
        }
        let userPfp;
        if (/image/.test(mime)) {
          userPfp = await quoted.download();
        } else if (m.quoted) {
          try {
            userPfp = await Atlas.profilePictureUrl(m.quoted.sender, "image");
          } catch (e) {
            await doReact("❌");
            return m.reply("User profile pic is Private! or User doesn't have any profile picture!");
          }
        } else {
          await doReact("❔");
          return m.reply("Please tag someone! or mention a picture!");
        }
        await doReact("✔️");
        const level = text ? (text.split(" ")[1] || 5) : 5;
        const img = await Jimp.read(userPfp);
        img.blur(isNaN(level) ? 5 : parseInt(level));
        img.getBuffer("image/png", (err, buffer) => {
          if (!err) {
            Atlas.sendMessage(m.from, { image: buffer, caption: `_Created by:_ *${botName}*` }, { quoted: m });
          } else {
            console.error(err);
            m.reply("An error occurred!");
          }
        });
        break;
      }

      case "circle": {
        if (!/image/.test(mime)) {
          await doReact("❌");
          return m.reply(`Please mention an *image* and type *${prefix}circle* to create circle image.`);
        }
        await doReact("🔘");
        const mediaMess = await quoted.download();
        try {
          const image = await Jimp.read(mediaMess);
          image.circle().getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
            if (!err) {
              Atlas.sendMessage(m.from, { image: buffer, caption: `_Created by:_ *${botName}*` }, { quoted: m });
            } else {
              console.error(err);
            }
          });
        } catch (e) {
          await doReact("❌");
          m.reply("An error occurred!");
        }
        break;
      }

      case "jail": {
        if (!m.quoted && !/image/.test(mime)) {
          await doReact("❔");
          return m.reply("Please tag someone! or mention a picture!");
        }
        let userPfp;
        if (/image/.test(mime)) {
          userPfp = await quoted.download();
        } else if (m.quoted) {
          try {
            userPfp = await Atlas.profilePictureUrl(m.quoted.sender, "image");
          } catch (e) {
            await doReact("❌");
            return m.reply("User profile pic is Private! or User doesn't have any profile picture!");
          }
        } else {
          await doReact("❔");
          return m.reply("Please tag someone! or mention a picture!");
        }
        await doReact("🔲");
        const result = await Canvacord.Canvacord.jail(userPfp, false);
        await Atlas.sendMessage(m.from, { image: result, caption: "*Sent to Horney jail*\n" }, { quoted: m });
        break;
      }

      case "removebg": {
        if (!m.quoted || !/image/.test(mime)) {
          await doReact("❌");
          return m.reply(`Send/Reply Image With Caption *${prefix}removebg* to remove background of an image`);
        }
        if (/webp/.test(mime)) {
          await doReact("❌");
          return m.reply(`Send/Reply Image With Caption *${prefix}removebg* to remove background of an image`);
        }
        const rbgKEYS = [
          "cHLxHkyovvnFKA46bWDoy5ab0", "tgrhopqLJG5cz17zr9GFVRSP", "dCtKvWzkwn4eAYkxF3jUg95h",
          "FxhCoWrhbjE5rGdQcQXrR6L1", "xw2tzRUfTwNpPCqApBk3PMgP", "bCnoXofBNXHhwSeWibivduAX",
          "mjU2LCkHRuLgd3k9NK93LsL1", "P3SisAFSGsziMmYv3tpkDLQu", "V5mjnCXBaT58rHiuZ3pCTop7",
          "UTs581jS1xMJ87biGKtpK6UL", "pcmigrMzg2H3nzd85eQ68U8Q", "pTF2W31Ntre5Ec97p9fD1Nap",
          "vXJLm54AGNRooqi88NXYUuqJ", "8j8rHjhPjaFj9qeJqQJmLJCo", "YG1Yx54XvFTeP6jgYoMZ3yra",
          "HFvTxMoL774caaXKXKtDiAbw", "wdCwvvbEDeLUvR2XBDCzSWxR", "9KgH3vFP23NGQKzUYZhyL16Y",
          "5aCUhqDEKWUgqpSXWCsPDRRM", "ciyXBRKUd5mmUEfcraF1WZTN",
        ];
        await doReact("☯️");
        const rbgKEY = rbgKEYS[Math.floor(Math.random() * rbgKEYS.length)];
        const outputFile = "./System/Cache/removeBgOUT.png";
        const qFile = await Atlas.downloadAndSaveMediaMessage(quoted);
        try {
          await remobg.removeBackgroundFromImageFile({
            path: qFile,
            apiKey: rbgKEY,
            size: "regular",
            type: "auto",
            scale: "100%",
            outputFile,
          });
          await Atlas.sendMessage(
            m.from,
            { image: fs.readFileSync(outputFile), caption: `_Created by: *${botName}*_` },
            { quoted: m }
          );
          fs.unlinkSync(qFile);
          fs.unlinkSync(outputFile);
        } catch (e) {
          await doReact("❌");
          m.reply(`Failed to remove background: ${e.message}`);
          if (fs.existsSync(qFile)) fs.unlinkSync(qFile);
        }
        break;
      }

      default:
        break;
    }
  },
};

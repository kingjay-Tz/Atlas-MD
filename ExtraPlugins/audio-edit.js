import { exec } from "child_process";
import fs from "fs";
import { getRandom } from "../System/Function.js";

let mergedCommands = ["bass", "deep", "nightcore", "reverse", "robot", "slow", "smooth", "tempo"];

export default {
  name: "audioedits",
  alias: [...mergedCommands],
  uniquecommands: ["bass", "deep", "nightcore", "reverse", "robot", "slow", "smooth", "tempo"],
  description: "All Audio Editing Commands",
  start: async (Atlas, m, { inputCMD, doReact, mime, quoted }) => {
    if (!/audio/.test(mime)) {
      await doReact("❌");
      return m.reply(`Please mention an audio file !`);
    }

    const ffmpegFilter = async (media, filter) => {
      const ran = getRandom(".mp3");
      await Atlas.sendPresenceUpdate("recording", m.from);
      return new Promise((resolve, reject) => {
        exec(`ffmpeg -i ${media} ${filter} ${ran}`, (err) => {
          fs.unlinkSync(media);
          if (err) return reject(err);
          resolve(ran);
        });
      });
    };

    const sendAudio = async (filter) => {
      try {
        const media = await Atlas.downloadAndSaveMediaMessage(quoted);
        const ran = await ffmpegFilter(media, filter);
        const buff = fs.readFileSync(ran);
        Atlas.sendMessage(m.from, { audio: buff, mimetype: "audio/mpeg" }, { quoted: m });
        fs.unlinkSync(ran);
      } catch (e) {
        await doReact("❌");
        m.reply("An error occurred! Please mention an Audio!");
      }
    };

    switch (inputCMD) {
      case "bass":
        await doReact("🎶");
        await sendAudio("-af equalizer=f=18:width_type=o:width=2:g=14");
        break;

      case "nightcore":
        await doReact("🎶");
        await sendAudio("-filter:a atempo=1.07,asetrate=44100*1.20");
        break;

      case "deep":
        await doReact("🎶");
        await sendAudio("-af atempo=4/4,asetrate=44500*2/3");
        break;

      case "reverse":
        await doReact("🎶");
        await sendAudio('-filter_complex "areverse"');
        break;

      case "robot":
        await doReact("🎶");
        await sendAudio("-filter_complex \"afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75\"");
        break;

      case "slow":
        await doReact("🎶");
        await sendAudio('-filter:a "atempo=0.8,asetrate=44100"');
        break;

      case "smooth":
        await doReact("🎶");
        await sendAudio("-filter:v \"minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120'\"");
        break;

      case "tempo":
        await doReact("🎶");
        await sendAudio('-filter:a "atempo=0.9,asetrate=65100"');
        break;

      default:
        break;
    }
  },
};

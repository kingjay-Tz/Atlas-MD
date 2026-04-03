import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

let mergedCommands = ["gpt", "ai", "imagegen", "dalle"];

export default {
  name: "apenai",
  alias: [...mergedCommands],
  uniquecommands: ["ai", "dalle"],
  description: "AI Commands",
  start: async (Atlas, m, { inputCMD, text, doReact, args }) => {
    if (!global.openAiAPI) {
      await doReact("❌");
      return m.reply("Please put your OpenAI API Key in the *.env* or in *Configuration* file!");
    }

    const configuration = new Configuration({ apiKey: global.openAiAPI });
    const openai = new OpenAIApi(configuration);

    switch (inputCMD) {
      case "gpt":
      case "ai": {
        if (!args.join(" ")) {
          await doReact("❔");
          return m.reply(`Please provide a message!`);
        }
        await doReact("✅");

        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        const generateResponse = async (prompt, retries = 2) => {
          try {
            const completion = await openai.createChatCompletion({
              model: "gpt-3.5-turbo",
              messages: [{ role: "user", content: prompt }],
            });
            return completion.data.choices[0].message.content.trim();
          } catch (error) {
            if (error.response && error.response.status === 429 && retries > 0) {
              const retryAfter = (error.response.headers["retry-after"] * 1000) || 5000;
              m.reply(`Rate limit exceeded. Retrying in ${retryAfter / 1000} seconds...`);
              await sleep(retryAfter);
              return generateResponse(prompt, retries - 1);
            } else {
              console.error(error);
              await doReact("❌");
              return "Error occurred while generating response - API usage limit exceeded or wrong API key.";
            }
          }
        };

        try {
          const response = await generateResponse(text);
          await Atlas.sendMessage(m.from, { text: response }, { quoted: m });
        } catch (error) {
          console.error("Error getting response:", error);
          m.reply("An error occurred while generating response.");
        }
        break;
      }

      case "imagegen":
      case "dalle": {
        if (!args.join(" ")) {
          await doReact("❔");
          return m.reply(`Please provide a prompt for image generation!`);
        }
        await doReact("✅");

        const generateImage = async (prompt) => {
          try {
            const response = await axios.post(
              "https://api.openai.com/v1/images/generations",
              { model: "image-alpha-001", prompt, n: 1, size: "256x256" },
              { headers: { "Content-Type": "application/json", Authorization: `Bearer ${global.openAiAPI}` } }
            );
            return response.data.data[0].url;
          } catch (error) {
            console.error("Error generating image:", error);
            return null;
          }
        };

        try {
          const imageUrl = await generateImage(text);
          if (!imageUrl) {
            return m.reply("Failed to generate an image - API usage limit exceeded or wrong API key.");
          }
          Atlas.sendMessage(m.from, { image: { url: imageUrl }, caption: text }, { quoted: m });
        } catch (error) {
          console.error("Error getting image:", error);
          m.reply("An error occurred while generating image.");
        }
        break;
      }

      default:
        break;
    }
  },
};

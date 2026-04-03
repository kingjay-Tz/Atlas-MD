import fs from "fs";
import mongoose from "mongoose";
import eco from "discord-mongoose-economy";
import config from "../Configurations.js";

eco.connect(config.mongodb);

const playerSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String },
  inventory: {
    wood: { type: Number, required: true },
    stone: { type: Number, required: true },
    iron: { type: Number, required: true },
    diamonds: { type: Number, required: true },
    goldenApple: { type: Number, required: true },
    diamondpickaxe: { type: Number, required: true },
    ironpickaxe: { type: Number, required: true },
    stonepickaxe: { type: Number, required: true },
    woodenaxe: { type: Number, required: true },
  },
});

const player = mongoose.model("Player", playerSchema);

let mergedCommands = [
  "buy",
  "purchase",
  "inventory",
  "inv",
  "mine",
  "hunt",
  "dig",
  "chop",
  "hunt2",
  "reg-inv",
  "register-inv",
  "register",
  "shop",
  "store",
];

export default {
  name: "rpg",
  alias: [...mergedCommands],
  uniquecommands: ["buy", "inventory", "mine", "hunt", "hunt2", "register", "shop"],
  description: "All RPG game commands",
  start: async (
    Atlas,
    m,
    { pushName, prefix, inputCMD, doReact, text, args }
  ) => {
    const pic = fs.readFileSync("./Assets/Atlas.jpg");
    const cara = "cara";

    switch (inputCMD) {
      case "buy":
      case "purchase": {
        await doReact("💰");
        const user = await player.findOne({ id: m.sender });
        if (!user) {
          return m.reply(`You have not registered in RPG yet !\n\nPlease register first by typing *${prefix}register*`);
        }
        const balance = await eco.balance(m.sender, cara);
        const item = text;
        if (!item) {
          return m.reply(`Please provide an item to buy !\n\nExample: *${prefix}buy woodenaxe*`);
        }
        switch (item) {
          case "woodenaxe":
            if (balance.wallet < 250) return m.reply(`You don't have enough money to buy this item !\n\nYou need *250* Cara to buy this item !`);
            await eco.deduct(m.sender, cara, 250);
            user.inventory.woodenaxe += 1;
            await user.save();
            m.reply(`You have successfully bought *1* Wooden Axe !\n\nYour current balance is *${balance.wallet}* Cara !`);
            break;
          case "stonepickaxe":
            if (balance.wallet < 500) return m.reply(`You don't have enough money to buy this item !\n\nYou need *500* Cara to buy this item !`);
            await eco.deduct(m.sender, cara, 500);
            user.inventory.stonepickaxe += 1;
            await user.save();
            m.reply(`You have successfully bought *1* Stone Pickaxe !\n\nYour current balance is *${balance.wallet}* Cara !`);
            break;
          case "gold":
          case "goldenapple":
            if (user.inventory.goldenApple < 1) return m.reply(`You don't have enough Golden Apples for this exchange !`);
            await eco.deduct(m.sender, cara, 1000);
            user.inventory.goldenApple += 1;
            await user.save();
            m.reply(`You have successfully bought *1* Golden Apple !\n\nYour current balance is *${balance.wallet}* Cara !`);
            break;
          case "ironpickaxe":
            if (balance.wallet < 2000) return m.reply(`You don't have enough money to buy this item !\n\nYou need *2000* Cara to buy this item !`);
            await eco.deduct(m.sender, cara, 2000);
            user.inventory.ironpickaxe += 1;
            await user.save();
            m.reply(`You have successfully bought *1* Iron Pickaxe !\n\nYour current balance is *${balance.wallet}* Cara !`);
            break;
          case "diamondpickaxe":
            if (balance.wallet < 5000) return m.reply(`You don't have enough money to buy this item !\n\nYou need *5000* Cara to buy this item !`);
            await eco.deduct(m.sender, cara, 5000);
            user.inventory.diamondpickaxe += 1;
            await user.save();
            m.reply(`You have successfully bought *1* Diamond Pickaxe !\n\nYour current balance is *${balance.wallet}* Cara !`);
            break;
          default:
            return m.reply(`😕 Invalid item. Please use ${prefix}buy item to purchase an item.`);
        }
        break;
      }

      case "inventory":
      case "inv": {
        await doReact("🔰");
        const user = await player.findOne({ id: m.sender });
        if (!user) {
          return m.reply("You don't have any items in your inventory yet. Use *'mine'* command to get some.");
        }
        const inventory = user.inventory;
        m.reply(
          `\[🐺 INVENTORY 🐺\]\n\n*🍎 Golden Apple*: ${inventory.goldenApple}\n*🔥 Wood*: ${inventory.wood}\n*🔮 Stone*: ${inventory.stone}\n*⚒ Iron*: ${inventory.iron}\n*💎 Diamonds*: ${inventory.diamonds}\n\n*🔨Tools🔨*\n\n*Wooden axe*: ${inventory.woodenaxe}\n*Iron axe*: ${inventory.ironpickaxe}\n*Stone axe*: ${inventory.stonepickaxe}\n*Diamond axe*: ${inventory.diamondpickaxe}`
        );
        break;
      }

      case "mine":
      case "hunt":
      case "dig":
      case "chop": {
        await doReact("🔨");
        const user = await player.findOne({ id: m.sender });
        if (!user) {
          return m.reply(`You have not registered in RPG yet !\n\nPlease register first by typing *${prefix}register*`);
        }
        m.reply(`\[🐺 Go Hunt 🐺\]\n\n_Please select an item to go to hunt_\n\n_*1. ${prefix}hunt2 woodenaxe*_\n_*2. ${prefix}hunt2 ironpickaxe*_\n_*3. ${prefix}hunt2 stonepickaxe*_\n_*4. ${prefix}hunt2 diamondpickaxe*_\n`);
        break;
      }

      case "hunt2": {
        await doReact("🔨");
        const user = await player.findOne({ id: m.sender });
        if (!user) {
          return m.reply(`You have not registered in RPG yet !\n\nPlease register first by typing *${prefix}register*`);
        }
        const axeUsed = args[0];
        if (!axeUsed) {
          return m.reply(`😕 You need to specify which axe to use (woodenaxe, stonepickaxe, ironpickaxe, diamondpickaxe).`);
        }
        if (!user.inventory[axeUsed]) {
          return m.reply(` 😕 You don't have a ${axeUsed}. Use ${prefix}buy to purchase one.`);
        }
        let loot;
        switch (axeUsed) {
          case "woodenaxe":
            user.inventory.woodenaxe -= 1;
            loot = { wood: Math.floor(Math.random() * 4) + 8, stone: Math.floor(Math.random() * 2) + 2, iron: Math.floor(Math.random() * 1) + 1, diamonds: Math.floor(Math.random() * 1) };
            break;
          case "stonepickaxe":
            user.inventory.stonepickaxe -= 1;
            loot = { wood: Math.floor(Math.random() * 4) + 8, stone: Math.floor(Math.random() * 2) + 2, iron: Math.floor(Math.random() * 1) + 1, diamonds: Math.floor(Math.random() * 1) };
            break;
          case "ironpickaxe":
            user.inventory.ironpickaxe -= 1;
            loot = { wood: Math.floor(Math.random() * 1) + 1, stone: Math.floor(Math.random() * 2) + 4, iron: Math.floor(Math.random() * 1) + 4, diamonds: Math.floor(Math.random() * 1) + 2 };
            break;
          case "diamondpickaxe": {
            user.inventory.diamondpickaxe -= 1;
            loot = { wood: Math.floor(Math.random() * 1), stone: Math.floor(Math.random() * 2) + 4, iron: Math.floor(Math.random() * 1) + 4, diamonds: Math.floor(Math.random() * 1001) + 7000 };
            if (Math.random() <= 0.05) { loot.goldenApple = 1; user.inventory.goldenApple += 1; }
            break;
          }
          default:
            return m.reply(`😕 Invalid axe specified, valid axes are (woodenaxe, stonepickaxe, ironpickaxe, diamondpickaxe).`);
        }
        user.inventory.wood += loot.wood;
        user.inventory.stone += loot.stone;
        user.inventory.iron += loot.iron;
        user.inventory.diamonds += loot.diamonds;
        await user.save();
        let lootMessage = `\[ 🐺MINE RESULT🐺 \]\n\n used: ${axeUsed}\n\n *🔮Stone*: ${loot.stone}\n*🔥Wood*: ${loot.wood}\n*🔩Iron*: ${loot.iron}\n*💎Diamonds*: ${loot.diamonds}`;
        if (loot.goldenApple) lootMessage += `\n\n🍎You found a Golden Apple!🍎`;
        m.reply(lootMessage);
        break;
      }

      case "reg-inv":
      case "register-inv":
      case "register": {
        await doReact("🔰");
        const user = await player.findOne({ id: m.sender });
        if (!user) {
          await player.create({
            id: m.sender,
            inventory: { wood: 0, stone: 0, iron: 0, diamonds: 0, diamondpickaxe: 0, ironpickaxe: 0, stonepickaxe: 0, woodenaxe: 0, goldenApple: 0 },
          });
          m.reply(`You have successfully registered in RPG !`);
        } else {
          m.reply(`You have already registered in RPG !`);
        }
        break;
      }

      case "shop":
      case "store": {
        await doReact("🔰");
        const mess = `🛍️ 💎 ${global.botName} STORE 💎 🛍️

👋 Hi there! 🤗 Welcome to the ${global.botName} Store.💼 Here's what you can purchase using Gold 💰:

#1
💡 Item: Wooden-Axe
💰 Cost: 250 Gold
💻 Usage: ${prefix}buy woodenaxe
💬 Description: Chop down those trees for some juicy loot! 🌳

#2
💡 Item: Stone-Pickaxe
💰 Cost: 500 Gold
💻 Usage: ${prefix}buy stonepickaxe
💬 Description: Mine to your heart's content with this pickaxe! 💎

#3
💡 Item: Iron-Pickaxe
💰 Cost: 2000 Gold
💻 Usage: ${prefix}buy ironpickaxe
💬 Description: Mine like a pro with this top-notch pickaxe! 🔨

#4
💡 Item: Diamond-Pickaxe
💰 Cost: 5000 Gold
💻 Usage: ${prefix}buy diamondpickaxe
💬 Description: The ultimate mining experience awaits!\nUsing this axe you can get a *🍎GoldenApple🍎*(very rare) 💎💰

#5
💡 Item: 100k GOLD
💰 Cost: 1 GOLDEN APPLE
💻 Usage: ${prefix}buy gold
💬 Description: Only few can get hands on a *🍎GoldenApple🍎*(very rare)`;
        m.reply(mess);
        break;
      }

      default:
        break;
    }
  },
};

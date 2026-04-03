import axios from "axios";

let mergedCommands = [
  "truth", "dare", "coinflip", "dice", "fact",
  "awesomecheck", "charactercheck", "cutecheck", "gaycheck", "greatcheck",
  "handsomecheck", "hornycheck", "lesbiancheck", "maturecheck", "prettycheck",
  "staminacheck", "uglycheck",
];

export default {
  name: "fun",
  alias: [...mergedCommands],
  uniquecommands: [
    "truth", "dare", "coinflip", "dice", "fact",
    "awesomecheck", "charactercheck", "cutecheck", "gaycheck", "greatcheck",
    "handsomecheck", "hornycheck", "lesbiancheck", "maturecheck", "prettycheck",
    "staminacheck", "uglycheck",
  ],
  description: "All fun Commands",
  start: async (
    Atlas,
    m,
    { text, args, prefix, inputCMD, mentionByTag, doReact }
  ) => {
    function randomNumberPicker(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    switch (inputCMD) {
      case "truth": {
        await doReact("🤔");
        const truth = [
          "Have you ever liked anyone? How long?",
          "If you can or if you want, which gc/outside gc would you make friends with?",
          "What is your biggest fear?",
          "Have you ever liked someone and felt that person likes you too?",
          "Have you ever stolen money from your parents? The reason?",
          "What makes you happy when you're sad?",
          "Ever had a one sided love? If so who? How does it feel?",
          "Who is the most influential person in your life?",
          "Who is the person who can make you awesome?",
          "Who is the person who has ever made you very happy?",
          "Who is closest to your ideal type of partner here?",
          "Have you ever rejected people? The reason why?",
          "What is the last YouTube video you watched?",
          "What is the last thing you Googled?",
          "Who in this group would you want to swap lives with for a week?",
          "What is the scariest thing that's ever happened to you?",
          "Have you ever ghosted a friend?",
          "Which of your family members annoys you the most and why?",
          "If you had to delete one app from your phone, which one would it be?",
          "Have you ever faked sick to get home from school?",
          "What is the most embarrassing item in your room?",
          "Have you ever laughed so hard you peed your pants?",
          "What is the biggest mistake you have ever made?",
          "Have you ever cheated in an exam?",
          "What is the worst thing you have ever done?",
          "When was the last time you cried?",
          "Who was your crush during the school days?",
          "Do you have a gf/bf?",
          "What is your biggest fear?",
          "Have you ever lied to your parents?",
          "Do you still like your ex?",
          "What achievements have you got this year?",
          "Do you love the bot creator FantoX?",
          "Have you ever thought of taking revenge from your teacher?",
          "If you could be invisible, what is the first thing you would do?",
          "What is a secret you kept from your parents?",
          "Who is your secret crush?",
          "What is your biggest regret?",
          "How many selfies do you take a day?",
          "What was your favorite childhood show?",
          "Who do you text the most?",
          "What is the biggest lie you ever told your parents?",
          "Who is your celebrity crush?",
          "What's the strangest dream you have ever had?",
        ];
        const truthData = truth[Math.floor(Math.random() * truth.length)];
        await Atlas.sendMessage(
          m.from,
          { image: { url: botImage3 }, caption: `*${truthData}*` },
          { quoted: m }
        );
        break;
      }

      case "dare": {
        await doReact("😎");
        const dare = [
          "Eat 2 tablespoons of rice without any side dishes.",
          "Call your crush now and send a screenshot.",
          "Sing the chorus of the last song you played.",
          "Say 'Welcome to Who Wants To Be a Millionaire!' to all the groups you have.",
          "Bang on the table until you get scolded for being noisy.",
          "Make 1 rhyme for the members!",
          "Send your WhatsApp chat list screenshot.",
          "Tell your own version of an embarrassing story.",
          "Tag the person you like.",
          "Change name to *I AM DONKEY* for 24 hours.",
          "Send a voice note saying 'Can I call you baby?'",
          "Screenshot recent call in WhatsApp.",
          "Open your front door and howl like a wolf for 10 seconds.",
          "Take an embarrassing selfie and set it as your profile picture.",
          "Walk on your elbows and knees for as long as you can.",
          "Sing the national anthem in a voice note.",
          "Tell the saddest story you know.",
          "Eat a raw piece of garlic.",
          "Show the last five people you texted and what the messages said.",
          "Say 'I love you' to your mom/dad in a voice note.",
          "Send a message to your ex saying 'I still like you'.",
          "Say 'YOU ARE BEAUTIFUL/HANDSOME' to one person in the group.",
          "Write 'I am feeling happy today' and put it on status for 5 hours.",
          "Kiss your mom or dad and say I love you.",
          "Change name to I AM IDIOT for 24 hours.",
          "Say 'I love the bot owner FantoX' through voice note.",
        ];
        const dareData = dare[Math.floor(Math.random() * dare.length)];
        await Atlas.sendMessage(
          m.from,
          { image: { url: botImage3 }, caption: `*${dareData}*` },
          { quoted: m }
        );
        break;
      }

      case "coinflip": {
        await doReact("🧫️");
        const result = Math.floor(Math.random() * 2) + 1;
        await Atlas.sendMessage(m.from, { text: result === 1 ? "Heads" : "Tails" }, { quoted: m });
        break;
      }

      case "dice": {
        await doReact("🎲️");
        const max = parseInt(args[0]);
        if (!max)
          return Atlas.sendMessage(m.from, { text: "Please provide a maximum number of sides for the dice." }, { quoted: m });
        const roll = Math.floor(Math.random() * max) + 1;
        Atlas.sendMessage(m.from, { text: `You rolled a ${roll}!` }, { quoted: m });
        break;
      }

      case "fact": {
        await doReact("🤓");
        try {
          const response = await axios.get(`https://nekos.life/api/v2/fact`);
          const tet = `*『 Random Facts 』* \n\n${response.data.fact}`;
          Atlas.sendMessage(m.from, { image: { url: botImage4 }, caption: tet + "\n" }, { quoted: m });
        } catch (err) {
          m.reply(`An error occurred.`);
        }
        break;
      }

      case "awesomecheck":
      case "cutecheck":
      case "gaycheck":
      case "greatcheck":
      case "prettycheck":
      case "uglycheck":
      case "staminacheck":
      case "maturecheck":
      case "handsomecheck":
      case "hornycheck":
      case "lesbiancheck": {
        if (!text && !m.quoted) {
          await doReact("❌");
          return Atlas.sendMessage(m.from, { text: `Please tag a user to use this command!` }, { quoted: m });
        }
        const mentionedUser = m.quoted ? m.quoted.sender : mentionByTag[0];
        await doReact("👀");
        const dey = randomNumberPicker(1, 100);
        const Atlastext = `${inputCMD.charAt(0).toUpperCase() + inputCMD.slice(1)} Check Of : @${mentionedUser.split("@")[0]}\n\nAnswer : *${dey}%*`;
        Atlas.sendMessage(
          m.from,
          { image: { url: botImage3 }, caption: Atlastext, mentions: [mentionedUser] },
          { quoted: m }
        );
        break;
      }

      case "charactercheck": {
        if (!text && !m.quoted) {
          await doReact("❌");
          return Atlas.sendMessage(m.from, { text: `Please tag a user to use this command!` }, { quoted: m });
        }
        const mentionedUser = m.quoted ? m.quoted.sender : mentionByTag[0];
        await doReact("👀");
        const userChar = ["Sigma", "Generous", "Grumpy", "Overconfident", "Obedient", "Good", "Simp", "Kind", "Patient", "Pervert", "Cool", "Helpful"];
        const userCharacterSeletion = userChar[Math.floor(Math.random() * userChar.length)];
        const Atlastext4 = `Character Check Of : @${mentionedUser.split("@")[0]}\n\nAnswer : *${userCharacterSeletion}*`;
        Atlas.sendMessage(
          m.from,
          { image: { url: botImage3 }, caption: Atlastext4, mentions: [mentionedUser] },
          { quoted: m }
        );
        break;
      }

      default:
        break;
    }
  },
};

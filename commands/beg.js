const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "beg",
  category: "Currency",
  cooldown: 40,
  async execute(message, args, client, profileData) {

    function randomNum(max) {
    return Math.floor(Math.random() * max);
    }
    const num = randomNum(4200)
    let names = require("../names.js")
    let randomName = names[Math.floor(Math.random() * names.length)];
    let phrases = [`Oh you need money? Here have **${num} coins**.`,
                   `LMAO you broke.`,
                   `Damn..`,
                   `No get a job.`,
                   `ew`,
                   `Money?! HELL YEAH HERE'S **${num} COINS**!`,
                   `Here's **${num} coins**, buy yourself some milk.`,
                   `You poor thing.. Take **${num} coins**.`,
                   `Have **${num} coins**, don't spent it all at once.`,
                   `Nice shirt, but- buy a better one with **${num} coins**..`
                  ]
    let randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    if (randomPhrase.includes(phrases[1]) || randomPhrase.includes(phrases[2]) || randomPhrase.includes(phrases[3]) || randomPhrase.includes(phrases[4])) {
         let lose = new MessageEmbed()
         .setColor("RED")
         .setTitle(`${randomName}`)
         .setDescription(`"${randomPhrase}"`)
         .setTimestamp()
         return message.reply({ embeds: [lose] })
    }

    const response = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
          coins: num,
        },
      }
    );
    let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${randomName}`)
    .setDescription(`"${randomPhrase}"`)
    .setTimestamp()
    return message.reply({ embeds: [embed] });
  },
};

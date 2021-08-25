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
    const num = randomNum(2000)
    let names = require("../names.js")
    let randomName = names[Math.floor(Math.random() * names.length)];
    let phrases = [`Oh you need money? Here have ${num} coins.`, 
                   `LMAO you broke.`,
                   `Here's ${num} coins, buy yourself some milk.`
                  ]
    let randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    if (randomPhrase === phrases[2]) {
         let lose = new MessageEmbed()
         .setColor("RANDOM")
         .setTitle(`${randomName}`)
         .setDescription(`"${randomPhrase}"`)
         .setTimestamp()
         return message.reply({ embeds [lose] })
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

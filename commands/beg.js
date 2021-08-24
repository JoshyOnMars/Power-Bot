const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "beg",
  category: "Currency",
  cooldown: 40,
  async execute(message, args, client, profileData) {
    const randomNumber = Math.floor(Math.random() * 2500) + 1;
    let names = require("../names.js")
    let randomName = names[Math.floor(Math.random() * names.length)];
    
    const response = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
          coins: randomNumber,
        },
      }
    );
    let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`${message.author}, You begged and **${randomName}** gave you ${randomNumber} coins!`)
    .setTimestamp()
    return message.reply({ embeds: [embed] });
  },
};

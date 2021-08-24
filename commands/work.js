const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "work",
  cooldown: 3600,
  async execute(message, args, client, profileData) {
    const randomNumber = Math.floor(Math.random() * 5000) + 1;
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
    return message.channel.send(`${message.author}, You worked and you earnt ${randomNumber} coins!`);
  },
};

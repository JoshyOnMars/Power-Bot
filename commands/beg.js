const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "beg",
  async execute(message, args, client, profileData) {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    const names = ["Elon Musk", "Jeff Bezos", "Bill Gates", "Joe Biden", "Zac Aubert", "Marcus"]
    const randomNames = names[Math.floor(Math.random() * names.legnth)];
    
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
    return message.channel.send(`${message.author.username}, You begged and ${randomNames} gave you ${randomNumber} coins!`);
  },
};

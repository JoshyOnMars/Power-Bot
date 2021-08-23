
const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "bank",
  cooldown: 300,
  async execute(message, args, client, profileData) {
   
    const number = args[0]
    if (!number) { return message.channel.send(`Please specify the amount you want to deposit! (Min 1000)`)}
    if (number > 1000) { return message.channel.send("Your amount is more than the min amount of 1000.")}
    
    const response = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
          coins: -number,
          bank: number,
        },
      }
    );
  return message.channel.send(`Banked ${number} coins into your Bank!`)
  },
};

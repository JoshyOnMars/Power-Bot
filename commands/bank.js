
const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "bank",
  async execute(message, args, client, profileData) {
   
    const number = args[0]
    if (!number) { return message.channel.send(`Please specify the amount you want to deposit! (Min 1000)`)}
    if (number > 1000) { return message.channel.send("Your amount is more than the min amount of 1000.")}
    if (profileData.bank === 1000) { return message.channel.send(`You have the max amount of \`1000\` in your bank!`)}
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

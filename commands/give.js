const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "give",
  category: "Currency",
  cooldown: 15,
  async execute(message, args, client, profileData) {

    let num = args[1]
    let mentionedUser = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    
    if (profileData.coins < num) {
      return message.reply(`You don't have ${num} coins to give to **${mentionedUser.username}**!`)
    }
    
    const response = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
          coins: -num,
        },
      }
    );
    const response2 = await profileModel.findOneAndUpdate(
      {
        userID: mentionedUser.id,
      },
      {
        $inc: {
          coins: num,
        },
      }
    );
    
    return message.reply(`${message.author}, You gave ${num} coins to **${mentionedUser.username}**!`);
  },
};

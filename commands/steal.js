const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "steal",
  cooldown: 1,
  async execute(message, args, client, profileData) {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    let mentionedUser = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    
    if (mentionedUser.profileData.coins < randomNumber) { 
      const response = await profileModel.findOneAndUpdate({userID: message.author.id,},{$inc: {coins: mentionedUser.profileData.coins,},});
      const response2 = await profileModel.findOneAndUpdate({userID: mentionedUser.id,},{$inc: {coins: -mentionedUser.profileData.coins,},});
      return message.channel.send(`${message.author}, You stole ${mentionedUser.profileData.coins} coins from **${mentionedUser.username}**!`) 
    }
    if (mentionedUser.profileData.coins < 1) {
      return message.reply(`**${mentionedUser.username}** has no coins in their Wallet for you to steal!`)
    }
    
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
    const response2 = await profileModel.findOneAndUpdate(
      {
        userID: mentionedUser.id,
      },
      {
        $inc: {
          coins: -randomNumber,
        },
      }
    );
    
    return message.channel.send(`${message.author}, You stole ${randomNumber} coins from **${mentionedUser.username}**!`);
  },
};

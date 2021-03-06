const { MessageEmbed } = require("discord.js")
const moneyModel = require("../models/moneySchema");

module.exports = {
  name: "steal",
  usage: "steal <user>",
  description: "Be a meanie and steal from a unsuspecting user.",
  category: "Currency",
  cooldown: 1800,
  async execute(message, args, client, moneyData, serverData) {
    if (serverData.economy == false) return message.reply(`The module \`economy\` is **disabled**`);
    
    function randomNum(max) {
      return Math.floor(Math.random() * max);
    }
    const randomNumber = randomNum(1500)
    let mentionedUser = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!mentionedUser) return message.reply(`Bro- who do you want to steal from...`)
    
    const bal = await moneyModel.findOne({ userID: `${mentionedUser.id}` });
    console.log(bal.coins);
    
    if (bal.coins < randomNumber) { 
      const response = await moneyModel.findOneAndUpdate({userID: message.author.id,},{$inc: {coins: bal.coins,},});
      const response2 = await moneyModel.findOneAndUpdate({userID: mentionedUser.id,},{$inc: {coins: -bal.coins,},});
      return message.reply(`${message.author}, You stole ${bal.coins.toLocaleString()} coins from **${mentionedUser.username}**!`) 
    }
    if (bal.coins < 1) {
      return message.reply(`**${mentionedUser.username}** has no coins in their Wallet for you to steal!`)
    }
    
    const response = await moneyModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
          coins: randomNumber,
        },
      }
    );
    const response2 = await moneyModel.findOneAndUpdate(
      {
        userID: mentionedUser.id,
      },
      {
        $inc: {
          coins: -randomNumber,
        },
      }
    );
    
    return message.reply(`${message.author}, You stole ${randomNumber.toLocaleString()} coins from **${mentionedUser.username}**!`);
  },
};


const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "bank",
  category: "Currency",
  async execute(message, args, client, profileData) {
   
    const number = args[1]
    const input = args[0]
    
    if (!input) { return message.channel.send(`Please specify what you want to do, \`.bank withdraw/deposit <amount>\``)}
                      
    if (input === "deposit") {
        if (!number) { return message.channel.send(`Please specify the amount you want to deposit! (Min 1000 coins)`)}
        if (number > 1000) { return message.channel.send("Your amount is more than the min amount of 1000 coins.")}
        if (profileData.bank > 999) { return message.channel.send(`You have the max amount of \`1000\` coins in your bank!`)}
        if (profileData.coins < 1) { return message.channel.send(`You have no coins to deposit into your bank!`)}
        const response = await profileModel.findOneAndUpdate({userID: message.author.id,},{$inc: {coins: -number,bank: number,},});
        return message.channel.send(`Deposited ${number} coins from your Wallet into your Bank!`)
    } else if (input === "withdraw") {
        if (!number) { return message.channel.send(`Please specify the amount you want to withdraw! (Min 1000 coins)`)}
        if (number > 1000) { return message.channel.send("Your amount is more than the min amount of 1000 coins.")}
        if (profileData.bank < 1) { return message.channel.send(`You have no coins to withdraw from your bank!`)}
        const response = await profileModel.findOneAndUpdate({userID: message.author.id,},{$inc: {coins: number,bank: -number,},});
        return message.channel.send(`Withdrew ${number} coins from your Bank into your Wallet!`)
    }
  },
};

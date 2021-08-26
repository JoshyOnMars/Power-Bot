
const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "bank",
  category: "Currency",
  async execute(message, args, client, profileData, serverData) {
    if (serverData.economy == false) return message.reply(`The module \`economy\` is **disabled**`);
   
    const number = args[1]
    const input = args[0]
    
    if (!input) { return message.reply(`Please specify what you want to do, \`.bank withdraw/deposit <amount>\``)}
                      
    if (input === "deposit") {
        if (!number) { return message.reply(`Please specify the amount you want to deposit! (Min 1,000 coins)`)}
        if (number > 1000) { return message.reply("Your amount is more than the min amount of 1,000 coins.")}
        if (profileData.bank > 999) { return message.reply(`You have the max amount of \`1,000\` coins in your bank!`)}
        if (profileData.coins < 1) { return message.reply(`You have no coins to deposit into your bank!`)}
        const response = await profileModel.findOneAndUpdate({userID: message.author.id,},{$inc: {coins: -number,bank: number,},});
        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Deposited ${number.toLocaleString()} coins from your Wallet into your Bank!`)
        .setTimestamp()
        return message.reply({ embeds: [embed] })
    } else if (input === "withdraw") {
        if (!number) { return message.reply(`Please specify the amount you want to withdraw! (Min 1,000 coins)`)}
        if (number > 1000) { return message.reply("Your amount is more than the min amount of 1,000 coins.")}
        if (profileData.bank < 1) { return message.reply(`You have no coins to withdraw from your bank!`)}
        const response = await profileModel.findOneAndUpdate({userID: message.author.id,},{$inc: {coins: number,bank: -number,},});
        let embed2 = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Withdrew ${number.toLocaleString()} coins from your Bank into your Wallet!`)
        .setTimestamp()
        return message.reply({ embeds: [embed2]})
    }
  },
};

const { MessageEmbed } = require("discord.js")
//const profileModel = require("../models/profileSchema");

module.exports = {
  name: "bank",
  usage: "bank [withdraw/deposit] <amount>",
  description: "Withdraw or deposit from/to your bank - Deposited money is safe from being stolen!",
  category: "Currency",
  async execute(message, args, client, moneyData, serverData) {
    if (serverData.economy == false) return message.reply(`The module \`economy\` is **disabled**`);
   
    const number = args[1]
    const input = args[0]
    
    //if (!input) { return message.reply(`Please specify what you want to do, \`${client.prefix}bank withdraw/deposit <amount>\``)}
                      
    //if (input === "deposit") {
    //    if (profileData.bank > profileData.bankSize - 1) { return message.reply(`You have the max amount of \`${profileData.bankSize}\` coins in your bank!`)}
    //    if (profileData.coins < 1) { return message.reply(`You have no coins to deposit into your bank!`)}
    //    const response = await profileModel.findOneAndUpdate({userID: message.author.id,},{$inc: {coins: -number,bank: number,},});
    //    let embed = new MessageEmbed()
    //    .setColor("RANDOM")
    //    .setDescription(`Deposited ${number.toLocaleString()} coins from your Wallet into your Bank!`)
    //    .setTimestamp()
    //    return message.reply({ embeds: [embed] })
    //} else if (input === "withdraw") {
    //    if (profileData.bank < 1) { return message.reply(`You have no coins to withdraw from your bank!`)}
    //    const response = await profileModel.findOneAndUpdate({userID: message.author.id,},{$inc: {coins: number,bank: -number,},});
    //    let embed2 = new MessageEmbed()
    //    .setColor("RANDOM")
    //    .setDescription(`Withdrew ${number.toLocaleString()} coins from your Bank into your Wallet!`)
    //    .setTimestamp()
    //    return message.reply({ embeds: [embed2]})
    //}
  },
};

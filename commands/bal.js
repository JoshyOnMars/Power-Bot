const { MessageEmbed } = require("discord.js")
const moneyModel = require("../models/moneySchema");

module.exports = {
  name: "bal",
  usage: "bal",
  description: "Check yours or someone elses wallet and bank balance!",
  category: "Currency",
  async execute(message, args, client, moneyData, serverData) {
    if (serverData.economy == false) return message.reply(`The module \`economy\` is **disabled**`);
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
    const bal = await moneyModel.findOne({ userID: user.id });
    
    let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`${user.username}'s Balance`)
    .addField(`💰Wallet`, `${bal.coins.toLocaleString()}`)
    .addField(`🏦Bank`, `${bal.bank.toLocaleString()}`)
    .setTimestamp()
    message.reply({ embeds: [embed] });
  },
};

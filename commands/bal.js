const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "bal",
  category: "Currency",
  async execute(message, args, client, profileData) {
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
    const bal = await profileModel.findOne({ userID: `${user.id}` });
    
    let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`${user.username}'s Balance`)
    .addField(`💰Wallet`, `${bal.coins}`)
    .addField(`🏦Bank`, `${bal.bank}/1000`)
    .setTimestamp()
    message.reply({ embeds: [embed] });
  },
};

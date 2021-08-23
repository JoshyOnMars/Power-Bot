const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "bal",
  async execute(message, args, client, profileData) {
    let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`${message.author.username}'s Balance`)
    .addField(`💰Wallet`, `${profileData.coins}`)
    .addField(`🏦Bank`, `${profileData.bank}`)
    .setTimestamp()
    message.channel.send({ embeds: [embed] });
  },
};

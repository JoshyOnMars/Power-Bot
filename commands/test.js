
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "test",
  async execute(message, args, client, profileData) {
	  
	  let embed = new MessageEmbed()
	  .setDescription(`**help**\n<:smth:881147807879286804>Get some help!`)
	  
	  message.channel.send({ embeds: [embed] })
    
  },
};

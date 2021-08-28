
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "test",
  async execute(message, args, client, profileData) {
	  
	  let embed = new MessageEmbed()
	  
	  for (const [ name, { description } ] of client.commands) {
	  embed.addField(`**${name}**`, `<:smth:881147807879286804>${description || "none"}`)
	  }
	  
	  message.channel.send({ embeds: [embed] })
    
  },
};

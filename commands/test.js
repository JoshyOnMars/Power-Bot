
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "test",
  async execute(message, args, client, profileData) {
	  
	  let embed = new MessageEmbed()
	  
	  function chunk(array, chunkSize){
 	  const chunked = [];
          for(let i = 0; i < array.length; i += chunkSize)
    	  chunked.push(array.slice(i, i + chunkSize));
 	  return chunked;
	  }
	  
	  for (const [ name, { description } ] of client.commands) {
	  embed.addField(`**${name}**`, `<:smth:881147807879286804>${description || "none"}`)
	  }
	  
	  const chunkedArray = chunk(embed.fields, 10);
	  message.channel.send({ embeds: [chunkedArray] })
    
  },
};

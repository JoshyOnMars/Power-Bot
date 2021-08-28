const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const { pagination } = require("reconlx")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "help",
  async execute(message, args, client, profileData) {
	  
 		let embed = new MessageEmbed()
	  
	  	function chunk(array, chunkSize){
 	  	const chunked = [];
          	for(let i = 0; i < array.length; i += chunkSize)
    	  	chunked.push(array.slice(i, i + chunkSize));
 	  	return chunked;
	  	}
	  
		for(const [name, {description}] of client.commands){
			embed.addField(`**${name}**`, `<:smth:881147807879286804> ${description || "none"}`)
		}
	  
	  	const chunkedArray = chunk(embed.fields, 10);
	  
	  	pagination({
			embeds: chunkedArray,
			channel: message.channel,
			author: message.author,
			time: 15000,
		})
    
  },
};

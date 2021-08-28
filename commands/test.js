const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "test",
  async execute(message, args, client, profileData) {
	  
 		let embed = new MessageEmbed()
	  
	  	//function chunk(array, chunkSize){
 	  	//const chunked = [];
          	//for(let i = 0; i < array.length; i += chunkSize)
    	  	//chunked.push(array.slice(i, i + chunkSize));
 	  	//return chunked;
	  	//}
	  
	  	//const chunkedArray = chunk(embed.fields, 10);
	  
	  	const descriptionArray = [];
	  
		for(const [name, {description}] of client.commands){
  			descriptionArray.push(`**${name}**`);
  			descriptionArray.push(`<:smth:881147807879286804>${description || "none"}`);
		}
	  
		embed.setDescription(descriptionArray.join('\n'));
	  
		message.channel.send({ embeds: [embed] })
    
  },
};

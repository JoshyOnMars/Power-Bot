const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'remove',
	usage: "remove",
  	category: 'Economy',
	async execute(message, args, client) {
        if (message.author.id != "691634056278048778") return;
        
        let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!member) { return message.reply(`Please provide a user you want to remove money from! Like this: \`.add [user] <amount>\``) }
    
        client.remove(member.id, parseInt(args[1]))

	},
};

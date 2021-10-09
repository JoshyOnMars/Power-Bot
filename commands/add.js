const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'add',
	usage: "add",
  	category: 'Currency',
	async execute(message, args, client) {
        if (message.author.id != "691634056278048778") return;
        
        let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!member) { return message.reply(`Please provide a user you want to add money to! Like this: \`.add [user] <amount>\``) }
    
        client.add(member.id, parseInt(args[1]), parseInt(args[2]))

	},
};

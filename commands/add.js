const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'add',
	usage: "add",
  	category: 'Economy',
	async execute(message, args, client) {
        if (message.author.id != "691634056278048778") return;


        let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!member) { return message.reply(`Please provide a user you want to add money to! Like this: \`.add [user] <amount>\``) }
    
        let amount = args[1]
        if (!amount) { return message.reply(`Please provide the amount of money you want to add! Like this: \`.add [user] <amount>\``) }

        client.add(member.id, amount)

	},
};

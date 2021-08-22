const { MessageEmbed } = require("discord.js")
require("dotenv").config();
const prefix = process.env.PREFIX

module.exports = {
	name: 'kick',
	description: 'Kick a user.',
        usage: `${prefix}kick [user] (reason)`,
        category: 'Moderation',
	async execute(message, args, client) {

        message.delete()

        if (!message.member.permissions.has("KICK_MEMBERS")) {return message.channel.send("You don't have the required permission (KICK_MEMBERS) to run this command!")}

        let args1 = message.content.slice(1).split(/ +/);
        let reason = args1.slice(2).join(" ");
        if (!reason) {return message.channel.send("Please specify a reason for the kick!")}
        if (reason > 32) return message.channel.send("Sorry, the reason is to long. Keep it short, 32 characters.");

        let member = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username === args.join(' ')) || message.member;
        if (!member) {
            return message.channel.send("Please mention a user to kick!")
        }
        let user = member.user;

        let embed = new MessageEmbed()
		.setColor("RED")
		.setDescription(`${user} just got kicked! | Reason: ${reason}`)
		.setTimestamp()

            member.kick({reason: reason,}).then(() => {
            message.channel.send({ embeds: [embed] })
        })
	},
};

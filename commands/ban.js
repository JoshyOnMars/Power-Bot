const { MessageEmbed } = require("discord.js")
require("dotenv").config();
const prefix = process.env.PREFIX

module.exports = {
	name: 'ban',
	description: 'Ban a user.',
        usage: `${prefix}ban [user] (reason)`,
        category: 'Moderation',
	async execute(message, args, client) {

        message.delete()

        if (!message.member.permissions.has("BAN_MEMBERS")) {return message.channel.send("You don't have the required permission (BAN_MEMBERS) to run this command!")}

        let args1 = message.content.slice(1).split(/ +/);
        let reason = args1.slice(2).join(" ");
        if (!reason) {return message.channel.send("Please specify a reason for the ban!")}
        if (reason > 32) return message.channel.send("Sorry, the reason is to long. Keep it short, 32 characters.");

        let member = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username === args.join(' ')) || message.member;
        if (!member) {
            return message.channel.send("Please mention a user to ban!")
        }
        let user = member.user;

        let embed = new MessageEmbed()
		.setColor("RED")
		.setDescription(`${user} just got banned! | Reason: ${reason}`)
		.setTimestamp()

            member.ban({reason: reason,}).then(() => {
            message.channel.send({ embeds: [embed] })
        })
	},
};

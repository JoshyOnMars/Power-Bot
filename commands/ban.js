const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema.js");

module.exports = {
	name: 'ban',
	description: 'Ban a user who has been naughty.',
        usage: `ban [user] <reason>`,
        category: 'Moderation',
	async execute(message, args, client, profileData) {

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

	const response = await profileModel.findOneAndUpdate(
      	{
        	userID: user.id,
      	},
      	{
        	$inc: {
          	modLogs: profileData.modLogs + 1,
        },
      	}
    	);
	
            member.ban({reason: reason,}).then(() => {
            message.channel.send({ embeds: [embed] })
        })
	},
};

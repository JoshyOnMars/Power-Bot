const { MessageEmbed } = require("discord.js")
require("dotenv").config();
const prefix = process.env.PREFIX

module.exports = {
	name: 'report',
	description: 'Report a user in the server.',
	usage: `report [user] <reason>`,
        category: 'Moderation',
	async execute(message, args, client, serverData) {
    
        message.delete()
    let reportChannel = message.guild.channels.cache.find(channel => channel.id === serverData.logChannel);
    if (!reportChannel)
      return message.channel.send(
        `You haven't chose a log channel for me to log moderation data do so by doing \`${client.prefix}config logchannel <channel>\`, and make sure the bot can send messages in it!`
      );

    let rUser = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!rUser)
      return message.channel.send("I can't find that user, try again.");

    let args1 = message.content.slice(1).split(/ +/);
    let rReason = args1.slice(2).join(" ");

    if (!rReason) return message.channel.send("You need to specify a reason.");
    if (rReason > 32)
      return message.channel.send(
        "Sorry, the reason is to long. Keep it short, 32 characters."
      );

    let reportEmbed = new MessageEmbed()
      .setColor("RED")
      .setAuthor(`A user has been reported!`, rUser.displayAvatarURL())
      .setDescription(`${rUser} got reported!`)
      .addField("Reason:", rReason)
      .addField("Channel:", message.channel.toString())
      .setFooter(`User ID: ${rUser.id}`)
      .setTimestamp()

    message.author.send(`You successfully reported ${rUser} for ${rReason}`);

    reportChannel.send({ embeds: [reportEmbed] });
	},
};

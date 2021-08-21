const { MessageEmbed } = require("discord.js")

module.exports = {
	name: 'warn',
	description: 'Warn a user!',
  category: 'Moderation',
	async execute(message, args, client) {
    
        message.delete()

        if (!message.member.permissions.has("MANAGE_MESSAGES")) {return message.channel.send("You don't have the required permission (MANAGE_MESSAGES) to run this command!")}
        
    let logChannel = message.guild.channels.cache.find(channel => channel.name === "logs");
    if (!logChannel)
      return message.channel.send(
        "There is no channel called 'log', please create one and make sure the bot can send messages in it!"
      );

    let rUser = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!rUser)
      return message.channel.send("I can't find that user, try again.");

    let args1 = message.content.slice(1).split(/ +/);
    let reason = args1.slice(2).join(" ");

    if (!reason) return message.channel.send("You need to specify a reason.");
    if (reason > 32)
      return message.channel.send(
        "Sorry, the reason is to long. Keep it short, 32 characters."
      );

         let embed = new MessageEmbed()
        .setColor("YELLOW")
        .setAuthor(`Warn Alert!`, rUser.displayAvatarURL())
        .setDescription(`${rUser} just got warned!`)
        .addFields({name: `Reason:`,value: `${reason}`},{name: `Channel:`,value: `${message.channel.toString()}`})
        .setFooter(`User ID: ${rUser.id}`)
        .setTimestamp()

        let embed2 = new MessageEmbed()
        .setColor("YELLOW")
        .setAuthor(`Warn Alert!`, rUser.displayAvatarURL())
        .setDescription(`Warned ${rUser} for: ${reason}`)
        .setFooter(`User ID: ${rUser.id}`)
        .setTimestamp()
	
	let embed3 = new MessageEmbed()
	.setColor("YELLOW")
        .setAuthor(`${client.user.username}`, client.displayAvatarURL())
        .setTitle(`You got warned in ${message.guild.name}`)
	.addFields({name: `Reason:`,value: `${reason}`,})
        .setTimestamp()

        message.channel.send({ embeds: [embed2] })
	rUser.send({ embeds: [embed3] })
        logChannel.send({ embeds: [embed] });
	},
};

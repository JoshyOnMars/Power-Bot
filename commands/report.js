const { MessageEmbed } = require("discord.js")

module.exports = {
	name: 'report',
	description: 'Report a user!',
  category: 'Moderation',
	async execute(message, args, client) {
    
        message.delete()
    let reportChannel = message.guild.channels.cache.find(channel => channel.name === "logs");
    if (!reportChannel)
      return message.channel.send(
        "There is no channel called 'log', please create one and make sure the bot can send messages in it!"
      );

    let rUser = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!rUser)
      return message.channel.send("I can't find that user, try again.");
		
   if (rUser === "<@878320288306167838>") return message.channel.send(`${message.author},  What did i do wrong for you to report me?!`)

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

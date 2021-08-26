const { MessageEmbed } = require("discord.js")

module.exports = {
	  name: 'rule',
          description: "Rules!",
	  async execute(message, args, client) {
	  if (!message.guild.id === "793016551682867250") return;

        const input = args[0];
        
        if (input === "1") {
            let embed = new MessageEmbed()
            .setColor("BLUE")
            .addField("Rule 1", "You **MUST** be over the age of 13, Underaged users will be kicked.")
            .setTimestamp()
            message.channel.send({ embeds: [embed] })
        } else if (input === "2") {
            let embed = new MessageEmbed()
            .setColor("BLUE")
            .addField("Rule 2", "All content here is PG-13, So no Adult or NSFW content. Cursing is allowed but only in <#808772107911299072>")
            .setTimestamp()
            message.channel.send({ embeds: [embed] })
        } else if (input === "3") {
            let embed = new MessageEmbed()
            .setColor("BLUE")
            .addField("Rule 3", "No Spamming. Don't be a nuisance or you may get muted or even kicked.")
            .setTimestamp()
            message.channel.send({ embeds: [embed] })
        } else if (input === "4") {
            let embed = new MessageEmbed()
            .setColor("BLUE")
            .addField("Rule 4", "Don't beg for follows, If you are sharing your social media accounts or websites, It has to be related to an ongoing discussion.")
            .setTimestamp()
            message.channel.send({ embeds: [embed] })
        } else if (input === "5") {
            let embed = new MessageEmbed()
            .setColor("BLUE")
            .addField("Rule 5", "No politics of any kind.")
            .setTimestamp()
            message.channel.send({ embeds: [embed] })
        } else if (input === "6") {
            let embed = new MessageEmbed()
            .setColor("BLUE")
            .addField("Rule 6", "Be kind & keep conversations polite. Threatening, harassing or abusive behavior is prohibited and will result in a ban.")
            .setTimestamp()
            message.channel.send({ embeds: [embed] })
        } else if (input === "7") {
            let embed = new MessageEmbed()
            .setColor("BLUE")
            .addField("Rule 7", "Don't argue with our Mods, What they say/do is final.")
            .setTimestamp()
            message.channel.send({ embeds: [embed] })
        } else if (input === "8") {
            let embed = new MessageEmbed()
            .setColor("BLUE")
            .addField("Rule 8", "If sharing rocket photographer's photos, Then please share the original link or at a minimum be sure to credit the source of that photographer.")
            .setTimestamp()
            message.channel.send({ embeds: [embed] })
        } 
	},
};

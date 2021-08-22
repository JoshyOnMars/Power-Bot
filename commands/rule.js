const { MessageEmbed } = require("discord.js")

module.exports = {
	  name: 'rule',
          description: "Rules!",
    	  category: 'Info',
	  async execute(message, args, client) {

        const inputThing = args[0];
        
        if (inputThing === "1") {
            let embed = new MessageEmbed()
            .setColor("BLUE")
            .addField("Rule 1", "You **MUST** be over the age of 13, Underaged user will be kicked.")
            .setTimestamp()
            message.channel.send({ embeds: [embed] })
        }
	},
};

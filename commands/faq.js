const { MessageEmbed } = require("discord.js")

module.exports = {
	  name: 'faq',
          description: 'Find your answers you're looking for with this command!',
    	  category: 'Info',
	  async execute(message, args, client) {

        const inputThing = args[0];
        
        if (inputThing === "VIP Spec" || "Private Astro") {
            let embed = new MessageEmbed()
            .setColor("BLUE")
            .addFields(
              {
                name: "How do I become a VIP Spectator or Private Astronaut?",
                value: "Easiest way is to check out our [Patreon](https://www.patreon.com/thelaunchpad)!\nWe have 7 different tiers that give you access to exclusive discord content channels, chats, live streams, TLP Shop discounts, free merch and more!!\nHelp support TLP and get some pretty sweet perks in return!",
              }
            )
            .setTimestamp()
            message.channel.send({ embeds: [embed] })
        }
	},
};

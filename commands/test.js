
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "test",
  async execute(message, args, client, profileData) {
	
	const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('primary')
		.setLabel('Primary')
		.setStyle('PRIMARY')
		);

	await message.reply({ content: 'Pong!', components: [row] });
    
  },
};

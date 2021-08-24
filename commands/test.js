
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "test",
  async execute(message, args, client, profileData) {
	
	const row = new MessageActionRow()
		.addComponents(
		const button = new MessageButton()
		.setCustomId('primary')
		.setLabel('Primary')
		.setStyle('PRIMARY')
		);

	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Some title')
		.setURL('https://discord.js.org')
		.setDescription('Some description here');

	await message.reply({ content: 'Pong!', ephemeral: true, embeds: [embed], components: [row] });
    
  },
};


const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "test",
  async execute(message, args, client, profileData) {
	  
	const wait = require('util').promisify(setTimeout);

	const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('primary')
		.setLabel('Primary')
		.setStyle('PRIMARY')
		);

	await message.reply({ content: 'Pong!', components: [row] });
	  
	const filter = i => i.customId === 'primary' && i.user.id === '691634056278048778';

	const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
	  
	collector.on('collect', async i => {
	if (i.customId === 'primary') {
		await i.deferUpdate();
		await wait(4000);
		await i.editReply({ content: 'A button was clicked!', components: [] });
	}
	});

	collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    
  },
};

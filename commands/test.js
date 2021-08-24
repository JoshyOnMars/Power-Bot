
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "test",
  async execute(message, args, client, profileData) {
  
    const wait = require('util').promisify(setTimeout);

    // ...

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

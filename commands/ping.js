const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Tells you the ping of the bot.',
  category: 'Info',
	async execute(message, args, client) {

        const Ping = `${Math.round(message.client.ws.ping)}ms`
    
        const Embed = new MessageEmbed()
        .setColor("#2f3136")
        .setTitle("🏓 Pong!")
        .setDescription(`Ping is ${Ping}`)

		await message.reply({ embeds: [Embed] });
	},
};

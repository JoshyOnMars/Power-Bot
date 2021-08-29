const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
	usage: "ping",
	description: 'Tells you the ping of the bot.',
  	category: 'Info',
	async execute(message, args, client) {

        const Ping = `${Math.round(message.client.ws.ping)}ms`
    	let totalSeconds = (client.uptime / 1000);
    	let days = Math.floor(totalSeconds / 86400);
    	let hours = Math.floor(totalSeconds / 3600);
    	totalSeconds %= 3600;
    	let minutes = Math.floor(totalSeconds / 60);
    	let seconds = Math.floor(totalSeconds % 60);

    let uptime = `${days}D:${hours}H:${minutes}M:${seconds}S`;
        const Embed = new MessageEmbed()
        .setColor("#2f3136")
        .setTitle("🏓 Pong!")
        .setDescription(`Ping is ${Ping}\nUptime is ${uptime}`)

		await message.reply({ embeds: [Embed] });
	},
};

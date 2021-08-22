const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed, GuildMember } = require('discord.js');
require("dotenv").config();
const mongoose = require("mongoose");
const badwordsArray = require("./badwords.js")

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const prefix = process.env.PREFIX

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	console.log(`${command.name}.js loaded!`);
}

client.on('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', message => {
	let foundInText = false;
    	for (var i in badwordsArray) {
      	if (message.content.toLowerCase().includes(badwordsArray[i].toLowerCase())) foundInText = true;
    	}
    	if (foundInText) {
		let embed = new MessageEmbed()
		.setColor("YELLOW")
		.setDescription(`${message.author}, Hey you can't use phrohibited/blacklisted words here!`)
        message.delete().then(message.channel.send({ embeds: [embed] }))
	}
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	try {
		client.commands.get(command).execute(message, args, client)
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command, pinging <@691634056278048778> to fix it!');
	}
});

client.login(process.env.DISCORD_TOKEN);

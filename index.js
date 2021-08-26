const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed, GuildMember } = require('discord.js');
require("dotenv").config();
const mongoose = require("mongoose");
const fetch = require("node-fetch")
const profileModel = require("./models/profileSchema");
const serverModel = require("./models/serverSchema");
const badwordsArray = require("./badwords.js")

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const prefix = process.env.PREFIX

client.commands = new Collection();
client.cooldowns = new Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	console.log(`${command.name}.js loaded!`);
}

mongoose
  .connect(process.env.MONGODB_SRV, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
  })
  .then(() => {
	console.log("Connected to the database!");	
})
.catch((err) => {
	console.log(err);
});

client.on('ready', () => {
	console.log('Ready!');
	client.user.setActivity(`.help`, { type: 'PLAYING' });
        fetch('https://fdo.rocketlaunch.live/json/launches/next/25')
        .then(res => res.json()) 
        .then(json => {
        for (const i of json.result) {
        console.log(i.provider.name);
        console.log(i.vehicle.name);
        }})
});

client.on('guildCreate', async guild => {
let server = await serverModel.create({
    serverID: guild.id,
    logChannel: 'none',
    badWords: false,
  });
  server.save();
})

client.on('guildMemberAdd', async member => {
let profile = await profileModel.create({
    userID: member.id,
    serverID: member.guild.id,
    coins: 1000,
    bank: 0,
    job: 'none',
    modLogs: 0,
  });
  profile.save();
})

client.on('messageCreate', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	let profileData;
	let serverData;
  	try {
    		profileData = await profileModel.findOne({ userID: message.author.id });
		serverData = await serverModel.findOne({ serverID: message.guild.id });
    	if (!profileData) {
      		let profile = await profileModel.create({
        	userID: message.author.id,
        	serverID: message.guild.id,
        	coins: 1000,
        	bank: 0,
		job: 'none',
		modLogs: 0,
      	   });
      		profile.save();
	if (!serverData) {
		let server = await serverModel.create({
		serverID: message.guild.id,
 	 	logChannel: 'none',
  		badWords: false,
	   });
		server.save();
	}
    	   }
  	   } catch (err) {
    		console.log(err);
  	   }
	
	let foundInText = false
    	for (var i in badwordsArray) {
      	if (message.content.toLowerCase().includes(badwordsArray[i].toLowerCase())) foundInText = true;
	if (serverData.badWords == false) return;
    	}
    	if (foundInText && serverData.badWords == true) {
                let channel = message.guild.channels.cache.find(channel => channel.id === serverData.logChannel);
                if (!channel) return message.channel.send("There is no channel for me to log moderation data, please create one and make sure the bot can send messages in it!");

                let embed2 = new MessageEmbed()
                .setColor("YELLOW")
                .setDescription(`${message.author} sent a blacklisted word in ${message.channel}`)
		
                let embed = new MessageEmbed()
		.setColor("YELLOW")
		.setDescription(`${message.author}, Hey you can't use phrohibited/blacklisted words here!`)
       		message.delete().then(message.channel.send({ embeds: [embed] }))
                channel.send({ embeds: [embed2] })
	}

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName)
	
	if(!command) return;
	
	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
    	cooldowns.set(command.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    		if (now < expirationTime) {
        	const timeLeft = (expirationTime - now) / 1000;
        	return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${commandName}\` command.`);
    		}
 	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		client.commands.get(commandName).execute(message, args, client, profileData, serverData)
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
	});

client.login(process.env.DISCORD_TOKEN);

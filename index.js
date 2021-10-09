const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed, GuildMember } = require('discord.js');
require("dotenv").config();
const mongoose = require("mongoose");
const fetch = require("node-fetch")
const moneyModel = require("./models/moneySchema");
const serverModel = require("./models/serverSchema");
const inventoryModel = require("./models/inventorySchema")
const badwordsArray = require("./badwords.js")

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

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

//functions
module.exports = client;
//Bal function
client.bal = (id) => new Promise(async ful => {
	const data = await moneyModel.findOne({ userID: id });
	if (!data) return ful(0);
	ful(data.coins)
})
//Add coins function
client.add = (id, wallet, bank) => {
    moneyModel.findOne({userID: id}, async(err, data) => {
       if (err) throw err;
       if (data) {
           data.coins += wallet;
           data.bank += bank;
          } else {
              data = moneyModel.create({userID: id}, {coins: wallet}, {bank: bank})
            }
          data.save()
       }
    );
}
//Remove coins function
client.remove = (id, wallet, bank) => {
    moneyModel.findOne({userID: id}, async(err, data) => {
       if (err) throw err;
       if (data) {
           data.coins -= wallet;
           data.bank -= bank;
          } else {
              data = moneyModel.create({userID: id}, {coins: -wallet}, {bank: -bank})
            }
          data.save()
       }
    );
}


client.on('ready', () => {
	console.log('Ready!');
	let channel = client.channels.cache.get("881606083481845803")
	console.log(`<:online:881607423746531358> **${client.user.username}** is online!`)
	client.user.setActivity(`.help`, { type: 'LISTENING' });
});

client.on('guildCreate', async guild => {
let server = await serverModel.create({
    serverID: guild.id,
    logChannel: 'none',
    badWords: false,
    economy: false,
    prefix: '.',
  });
  server.save();
let channel = client.channels.cache.get("881334625341935626")
let embed = new MessageEmbed()
.setColor("GREEN")
.setAuthor(`Joined A New Server!`, guild.iconURL())
.addField(`Name:`,`${guild.name}`)
.addField(`Members:`, `${guild.memberCount}`)
.setFooter(`I am now in ${client.guilds.cache.size} servers!`)
.setTimestamp()
channel.send({ embeds: [embed] })
})

client.on('guildDelete', async guild => {
await serverModel.deleteOne({serverID: guild.id,});
let channel = client.channels.cache.get("881334625341935626")
let embed = new MessageEmbed()
.setColor("RED")
.setAuthor(`Left A Server..`, guild.iconURL())
.addField(`Name:`,`${guild.name}`)
.addField(`Members:`, `${guild.memberCount}`)
.setFooter(`I am now in ${client.guilds.cache.size} servers..`)
.setTimestamp()
channel.send({ embeds: [embed] })
})

client.on('guildMemberAdd', async member => {
let money = await moneyModel.create({
    userID: member.id,
    coins: 1000,
    bank: 0,
  });
  money.save();
})

client.on('messageCreate', async message => {
	let foundInText = false
	let serverData;
	serverData = await serverModel.findOne({ serverID: message.guild.id });
        for (var i in badwordsArray) {
         if (message.content.toLowerCase().includes(badwordsArray[i].toLowerCase())) foundInText = true;
        }
        if (foundInText) {
		if (serverData.badWords == false) return;
		message.delete()
		
                let channel = message.guild.channels.cache.find(channel => channel.id === serverData.logChannel);
                if (!channel) return message.channel.send("There is no channel for me to log moderation data, please create one and make sure the bot can send messages in it!");

                let embed2 = new MessageEmbed()
                .setColor("YELLOW")
                .setDescription(`${message.author} sent a blacklisted word in ${message.channel}`)
		channel.send({ embeds: [embed2] })
    }
	client.prefix = ".";
	const find = await serverModel.findOne({ serverID: message.guild.id })
	if (find && find.prefix) client.prefix = find.prefix;
	if (!message.content.startsWith(client.prefix) || message.author.bot) return;
	
	let moneyData;
  	try {
    		moneyData = await moneyModel.findOne({ userID: message.author.id });
    	if (!moneyData) {
      		let money = await moneyModel.create({
        	userID: message.author.id,
        	coins: 1000,
                bank: 0,
      	   });
      		money.save();
	}
  	   } catch (err) {
    		console.log(err);
  	   }
	let inventoryData = await inventoryModel.findOne({ userID: message.author.id });

	const args = message.content.slice(client.prefix.length).trim().split(/ +/);
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
		client.commands.get(commandName).execute(message, args, client, inventoryData, moneyData, serverData)
		let channel = client.channels.cache.get("881606083481845803")
		
		channel.send(`Command: ${commandName} has been used.`)
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
	});

client.login(process.env.DISCORD_TOKEN);

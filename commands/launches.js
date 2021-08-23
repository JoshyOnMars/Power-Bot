const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
	name: 'launches',
	description: 'Tells you the 5 upcoming rocket launches!',
        category: 'Info',
	async execute(message, args, client) {
        
        fetch('https://fdo.rocketlaunch.live/json/launches/next/25')
        .then(res => res.json()) 
        .then(json => {
        for (const i of json.result) {
        message.channel.send(`${i.provider.name}, ${i.vehicle.name}`);
        }})
        
	},
};

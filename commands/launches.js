const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
  name: 'launches',
  description: 'Tells you the 5 upcoming rocket launches!',
  category: 'Info',
  async execute(message, args, client) {
    const response = await fetch('https://fdo.rocketlaunch.live/json/launches/next/25');
    const {result} = await response.json();
    for (const {provider, vehicle, missions} of result)  message.channel.send(`[${missions.date_srt}] ${vehicle.name} [${name}]`);
  },
};

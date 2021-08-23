const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "bal",
  async execute(message, args, client, profileData) {
    message.channel.send(`Your wallet bal is ${profileData.coins}, you banks bal is ${profileData.bank}`);
  },
};

const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "deposit",
  usage: "deposit <amount>",
  description: "Deposit money into your bank - Deposited money is safe from being stolen!",
  category: "Currency",
  async execute(message, args, client, moneyData, serverData) {
    if (serverData.economy == false) return message.reply(`The module \`economy\` is **disabled**`);
   
    if (!args[0]) return message.reply("You havent stated the amount you want to deposit!");

    client.add(message.author.id, 0, parseInt(args[0]))
    client.remove(message.author.id, parseInt(args[0]), 0)
  },
};

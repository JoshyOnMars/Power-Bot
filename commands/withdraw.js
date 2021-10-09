const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "withdraw",
  usage: "withdraw <amount>",
  description: "Withdraw money from your bank.",
  category: "Currency",
  async execute(message, args, client, moneyData, serverData) {
    if (serverData.economy == false) return message.reply(`The module \`economy\` is **disabled**`);
   
    if (!args[0]) return message.reply("You havent stated the amount you want to withdraw!");

    client.add(message.author.id, parseInt(args[0]), 0)
    client.remove(message.author.id, 0, parseInt(args[0]))
    message.reply(`Withdrew ${args[0]} coins from your bank.`)
  },
};

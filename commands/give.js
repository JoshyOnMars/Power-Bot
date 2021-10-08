const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "give",
  usage: "give [user] <amount>",
  description: "Be nice and give someone money :)",
  category: "Currency",
  cooldown: 15,
  async execute(message, args, client, profileData, serverData) {
    if (serverData.economy == false) return message.reply(`The module \`economy\` is **disabled**`);
    
    let mentionedUser = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!mentionedUser) { return message.reply(`Please provide a user you want to give money to! Like this: \`.give [user] <amount>\``) }
    
    let num = args[1]
    if (!num) { return message.reply(`Please provide the amount of money you want to give! Like this: \`.give [user] <amount>\``) }
    
    if (profileData.coins < num) {
      return message.reply(`You don't have **${num.toLocaleString()} coins** to give to **${mentionedUser.username}**!`)
    }
    
    client.add(message.author.id, parseInt(num))
    client.remove(mentionedUser.id, parseInt(num))

    return message.reply(`You gave **${num.toLocaleString()} coins** to **${mentionedUser.username}**!`);
  },
};

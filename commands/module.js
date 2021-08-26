const { MessageEmbed } = require("discord.js")
const serverModel = require("../models/serverSchema");

module.exports = {
  name: "module",
  category: "Enable/Disable Modules",
  async execute(message, args, client, serverData) {
    
    let mentionedUser = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!mentionedUser) { return message.reply(`Please provide a user you want to give money to! Like this: \`.give [user] <amount>\``) }
    
    let input = args[0]
    let input2 = args[1]
    
    if (input === "enable") {
      if (input2 === "badwords") {
        await serverModel.findOneAndUpdate({serverID: message.guild.id,},{$inc:{badWords: true},})
        message.reply(`Module \`badwords\` has been **enabled**`)
      }
      
    } else if (input === "disable") {
      if (input2 === "badwords") {
        await serverModel.findOneAndUpdate({serverID: message.guild.id,},{$inc:{badWords: false},})
        message.reply(`Module \`badwords\` has been **disabled**`)
      }
    }
  },
};

const { MessageEmbed } = require("discord.js")
const serverModel = require("../models/serverSchema");

module.exports = {
  name: "module",
  usage: `module [enable/disable] <badwords/economy>`,
  description: "Enable/disable modules for the server.",
  category: "Utility",
  async execute(message, args, client, serverData) {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`You don't have the permission \`MANAGE_MESSAGES\` to run this command!`)
    
    //let mentionedUser = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    //if (!mentionedUser) { return message.reply(`Please provide a user you want to give money to! Like this: \`.give [user] <amount>\``) }
    
    let input = args[0]
    let input2 = args[1]
    
    if (input === "enable") {
      if (input2 === "badwords") {
        await serverModel.findOneAndUpdate({serverID: message.guild.id,},{badWords: true})
        message.reply(`Module \`badwords\` has been **enabled**`) 
      } else if (input2 === "economy") {
        await serverModel.findOneAndUpdate({serverID: message.guild.id,},{economy: true})
        message.reply(`Module \`economy\` has been **enabled**`)
      }
      
    } else if (input === "disable") {
      if (input2 === "badwords") {
        await serverModel.findOneAndUpdate({serverID: message.guild.id,},{badWords: false})
        message.reply(`Module \`badwords\` has been **disabled**`)
      } else if (input2 === "economy") {
        await serverModel.findOneAndUpdate({serverID: message.guild.id,},{economy: false})
        message.reply(`Module \`economy\` has been **disabled**`)
      }
      let embed = new MessageEmbed()
      .setColor("RED")
      .setAuthor(`Modules`)
      .addField(`💰Economy`, `The module \`\`economy`\` is a fun currency system for when people in your server are bored. lol`, true)
      .addField(`🤬Badwords`, `A module to filter badwords to keep things PG-13`, true)
      .setTimestamp()
      return message.channe.send({ embeds: [embed] });
    }
  },
};

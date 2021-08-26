const { MessageEmbed } = require("discord.js")
const serverModel = require("../models/serverSchema");

module.exports = {
  name: "config",
  category: "Moderation",
  async execute(message, args, client, serverData) {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`You don't have the permission \`MANAGE_MESSAGES\` to run this command!`)
    
    //let mentionedUser = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    //if (!mentionedUser) { return message.reply(`Please provide a user you want to give money to! Like this: \`.give [user] <amount>\``) }
    
    let input = args[0]
    if (!input) return message.reply(`Well.. What do you want to do?`);
    
    
    if (input === "logchannel") {
          let logchannel = message.mentions.channels.first()
          if (!logchannel) return message.reply(`Please mention the channel you want to use as a logging channel.`);
      await serverModel.findOneAndUpdate({serverID: message.guild.id,},{logChannel: logchannel.id})
      message.reply(`Set logging channel to ${logchannel}`)
    }
  },
};

const { MessageEmbed } = require("discord.js")
const serverModel = require("../models/serverSchema");

module.exports = {
  name: "config",
  usage: `.config logchannel/prefix <channel/prefix>`,
  category: "Utility",
  async execute(message, args, client, serverData) {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`You don't have the permission \`MANAGE_MESSAGES\` to run this command!`)
    
    let input = args[0]
    if (!input) return message.reply(`Well.. What do you want to do?`);
    
    
    if (input === "logchannel") {
          let logchannel = message.mentions.channels.first()
          if (!logchannel) return message.reply(`Please mention the channel you want to use as a logging channel.`);
          await serverModel.findOneAndUpdate({serverID: message.guild.id,},{logChannel: logchannel.id})
          message.reply(`Set logging channel to ${logchannel}`)
    } else if (input === "prefix") {
          if(!args[1]) return message.channel.send("Provide a prefix!");
          const prefixEmbed = new MessageEmbed().setColor("YELLOW").setTitle("Prefix Changed!").setDescription(`My prefix for this server has been changed to \`${args[1]}\`.`)
          await serverModel.findOneAndUpdate({serverID: message.guild.id,},{prefix: `${args[1]}`})
          return message.channel.send({ embeds: [prefixEmbed] });
    }
  },
};

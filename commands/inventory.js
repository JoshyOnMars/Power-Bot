const { MessageEmbed } = require("discord.js");
const { pagination } = require("reconlx")
const inventoryModel = require("../models/inventorySchema.js")

module.exports = {
  name: "inventory",
  category: "Currency",
  async execute(message, args, client) {
    inventoryModel.findOne({ guildID: message.guild.id, userID: message.author.id }, async (err, data) => {
        if (!data) return message.reply("You have no owned items dummy!");
        const mappedData = Object.keys(data.inventory).map((key) => {
            return `**${key}** — ${data.inventory[key]}`;
        }).join("\n\n")
        
        let embed = new MessageEmbed()
        .setTitle(`Owned Items`)
        .setDescription(`${mappedData}`)
        
        message.channel.send({ embeds: [embed]})
    	}
     );
  },
};

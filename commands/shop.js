const { MessageEmbed } = require("discord.js");
const { pagination } = require("reconlx")
const shopItems = require("../items.js")

module.exports = {
  name: "shop",
  category: "Currency",
  cooldown: 5,
  async execute(message, args, client) {
    if(shopItems.length === 0) return message.reply("No items are for sale!");
    
    const shopList = shopItems.map((value, index) => {
      return `**${value.item}** — ${value.price}\n${value.description}`;
    }).join("\n\n");
    
    let embed = new MessageEmbed()
    .setTitle(`Item Shop!`)
    .setDescription(`${shopList}`)
    
    message.channel.send({ embeds: [embed] })
  },
};

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
      return `**${index + 1}** ${value.item} - ${value.price} coins`
    });
    
    message.channel.send(shopList)
  },
};

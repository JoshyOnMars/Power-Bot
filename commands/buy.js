const { MessageEmbed } = require('discord.js');
const inventoryModel = require('../models/inventorySchema.js')
const shopItems = require('../shopItems.js')

module.exports = {
	name: 'buy',
	usage: "buy",
  	category: 'Currency',
	async execute(message, args, client) {
        if(!args[0]) return message.reply("Please state an item you want to buy!");
        const itemToBuy = args[0].toLowerCase();
        
        const validItem = !!shopItems.find((val) => val.item.toLowerCase() === itemToBuy);
        if(!validItem) return message.reply(`There is no item called \`${itemToBuy}\`, Please try again... CORRECTLY!`);
        
        const itemPrice = shopItems.find((val) => (val.item.toLowerCase()) === itemToBuy).price;
        
        const userBalance = await client.bal(message.author.id)
        if(userBalance < itemPrice) return message.reply(`This item costs \`${itemPrice} coins\`, you only have \`${userBalance} coins\`..`)
        
        const params = {
          guildID: message.guild.id,
          userID: message.author.id
        }
        inventoryModel.findOne(params, async(err, data) => {
          if(data) {
            const hasItem = Object.keys(data.inventory).includes(itemToBuy)
            if(!hasItem) {
              data.inventory[itemToBuy] = 1;
            } else {
              data.inventory[itemToBuy]++
            }
          console.log(data)
          await inventoryModel.findOneAndUpdate(params, data);
         } else {
            new inventoryModel({
              guildID: message.guild.id,
              userID: message.author.id,
              inventory: {
                [itemToBuy]: 1,
              }
            }).save();
         }
         message.reply(`Brought \`${itemToBuy}\` for ${itemPrice} coins!`)
        });
	},
};

const { MessageEmbed } = require('discord.js');
const inventoryModel = require('../models/inventorySchema.js')
const shopItems = require('../items.js')

module.exports = {
	name: 'sell',
	usage: "sell",
  	category: 'Currency',
	async execute(message, args, client, inventoryData) {
		
        if(!args[0]) return message.reply("Please state an item you want to sell!");
        const itemToSell = args[0].toLowerCase()
        
        const itemPrice = shopItems.find((val) => (val.item.toLowerCase()) === itemToSell).price;
        
        const params = {
          userID: message.author.id
        }
        inventoryModel.findOne(params, async(err, data) => {
          if(data) {
            	const hasItem = Object.keys(data.inventory).includes(itemToSell)
	    	if (!hasItem) return message.reply(`You have no item called \`${itemToSell}\`, Please try again... CORRECTLY!`);
            	data.inventory[itemToSell]--
            }
          console.log(data)
          await inventoryModel.findOneAndUpdate(params, data);
         message.reply(`Sold \`${itemToSell}\` for ${itemPrice} coins!`)
	      client.add(message.author.id, parseInt(itemPrice / 1.5), 0)
        });
	},
};

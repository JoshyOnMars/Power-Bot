const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'gamble',
	usage: "gamble <amount>",
  	category: 'Currency',
	async execute(message, args, client) {
		
        	if(!args[0]) return message.reply("Please sepcify the amount you want to bet!")
		
        	if(isNaN(args[0])) return message.reply("The argument must be a number!")
		
		let amountToBet = parseInt(args[0]);
    
      		if(await client.bal(message.author.id) < amountToBet) return message.reply("You don't have enough coins to bet that amount!")
    
      		let chances = ["win", "lose"];
		let pick = chances[Math.floor(Math.random() * chances.length)]
		
		let random = Math.floor(Math.random() * 3)
    		if(pick == "lose") {
      			message.reply(`You lost ${amountToBet} coins, lmao`);
			client.remove(message.author.id, amountToBet, 0)
    		} else {
      			const winAmount = amountToBet * random;
      			message.reply(`Congrats you won ${winAmount} coins!`)
      			client.add(message.author.id, winAmount, 0)
    		}
	},
};

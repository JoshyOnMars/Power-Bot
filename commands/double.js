const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'double',
	usage: "double <amount>",
  	category: 'Currency',
	async execute(message, args, client) {
		
        	if(!args[0]) return message.reply("Please sepcify the amount you want to bet!")
		
		const amountToBet = parseInt(args[0]);
		
		if(args[0].toLowerCase() == "all" || "max") amountToBet = client.bal(message.author.id)
		
        	if(isNaN(args[0])) return message.reply("The argument must be a number!")
    
      		if(await client.bal(message.author.id) < amountToBet) return message.reply("You don't have enough coins to bet that amount!")
		
		client.remove(message.author.id, amountToBet, 0)
    
      		let chances = ["win", "lose"];
		let pick = chances[Math.floor(Math.random() * chances.length)]
		
    		if(pick == "lose") {
      			message.reply(`You lost ${amountToBet} coins, lmao`);
    		} else {
      			const winAmount = amountToBet * 2;
      			message.reply(`Congrats you won ${winAmount} coins!`)
      			client.add(message.author.id, winAmount, 0)
    		}
	},
};

const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'double',
	usage: "double <amount>",
  	category: 'Currency',
	async execute(message, args, client) {
        if(!args[0]) return message.reply("Please sepcify the amount you want to bet!")
        if(isNaN(args[0])) return message.reply("The argument must be a number!")
    
        const amountToBet = parseInt(args[0]);
    
      if(await client.bal(message.author.id) < amountToBet) return message.reply("You don't have enough coins to bet that amount!")
    
      function random() {
        const num = Math.floor(Math.random() * 2);
        return num === 1;
      };
    
    if(random() === true) {
      const winAmount = amountToBet * 2;
      message.reply(`Congrats you won ${winAmount} coins!`)
      client.remove(message.author.id, amountToBet, 0)
      client.add(message.author.id, winAmount, 0)
    } else {
      message.reply(`You lost ${amountToBet} coins, lmao`);
      client.remove(message.author.id, amountToBet, 0)
    }
	},
};

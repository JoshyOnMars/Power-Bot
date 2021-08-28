const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "shop",
  category: "Currency",
  cooldown: 5,
  async execute(message, args, client) {

    let shopEmbed = new MessageEmbed()
      .setColor("YELLOW")
      .setTitle("Here is the shop!");
    let shop = [
      ["🍪 Cookie", "Delicately baked for your sweet tooth! \n - Grandma", 5],
      ["🍰 Slice Of Cake", "Have a slice!", 10],
    ];
    for (const item of shop) {
      let itemName = item[0]
      let itemDescription = item[1]
      let itemPrice = item[2];
      shopEmbed.addFields({name: `${itemName}: \`\`${itemPrice} coins\`\``, value: `${itemDescription}`})
    }


        message.channel.send({ embeds: [shopEmbed] })
  },
};

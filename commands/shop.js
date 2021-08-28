const { MessageEmbed } = require("discord.js");
const { pagination } = require("reconlx")

module.exports = {
  name: "shop",
  category: "Currency",
  cooldown: 5,
  async execute(message, args, client) {

    let shopItems = [
      ["item1", "itemdesc1", 5],
      ["item2", "itemdesc2", 10],
      ["item3", "itemdesc3", 15],
      ["item4", "itemdesc4", 20],
      ["item5", "itemdesc5", 25],
      ["item6", "itemdesc6", 30],
      ["item7", "itemdesc7", 35],
      ["item8", "itemdesc8", 40],
      ["item9", "itemdesc9", 45],
      ["item10", "itemdesc10", 50],
      ["item11", "itemdesc11", 55],
    ];
    
        // Chunk array in smaller chunks
        // Default is set to '15'
        const chunk = (array, chunkSize = 15) => {
            const chunked = [];
            for(let i = 0; i < array.length; i += chunkSize) {
                chunked.push(array.slice(i, i + chunkSize));
            }

            return chunked;
        }

        // This is used by the library
        const embedPages = [];

        // Store all client commands in this array.
        const itemName = [];
        for(const item of shopItems) {
            itemName.push({ name: `${item[0]} - ${item[2]} coins`, value: item[1] });
        }
        // Chunking the commands in smaller arrays. Leave second parameter blank to use default of 15, or choose your own size.
        // Note that Discord doesn't allow any embed to go over 25 fields, 2000 characters.
        chunk(itemName, 6).forEach((chunks) => {
            const embed = new MessageEmbed().setColor("YELLOW").setAuthor(`Shop`, client.user.displayAvatarURL())
            embed.addFields(chunks);
            embedPages.push(embed);
        });


    
      pagination({
            embeds: embedPages,
            channel: message.channel,
            author: message.author,
            time: 15000,
        });
  },
};

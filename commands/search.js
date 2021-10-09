const { MessageEmbed } = require("discord.js")
const moneyModel = require("../models/moneySchema");
const inventoryModel = require("../models/inventorySchema")

module.exports = {
    name: "search",
    usage: "search",
    description: "Be a weirdo and search for money...",
    category: "Currency",
    cooldown: 45,
    async execute(message, args, client, inventoryData, moneyData, serverData) {
        if (serverData.economy == false) return message.reply(`The module \`economy\` is **disabled**`);
        
        console.log(inventoryData.inventory)
        if (!inventoryData.inventory.has('flashlight')) {
        return message.reply("You don't own a \`flashlight\` to be able to search!")
        }

        const locations = [
                "car",
                "sock",
                "wallet",
                "box",
                "pocket",
                "bus",
                "park",
                "train",
                "lounge",
                "keyboard",
                "bathroom",
                "bed",
                "sofa",
                "backpack",
                "laptop",
                "sewer",
                "pantry",
                "shoe",
                "tree",
                "air",
                "street",
                "attic",
                "grass",
                "space"
        ];
        
        const items = [
                        "And **1** banknote!",
                        "_ _",
                        "_ _",
                        "_ _",
                        "_ _",
                        "_ _",
                      ]

        const chosenLocations = locations.sort(() => Math.random() - Math.random()).slice(0, 3);
        const randomItems = items.sort(() => Math.random() - Math.random()).slice(0, 1);

        const filter = ({ author, content }) => message.author == author && chosenLocations.some((location) => location.toLowerCase() == content.toLowerCase());

        const collector = message.channel.createMessageCollector({ filter, max: 1, time: 25000 });

        function randomNum(max) {
            return Math.floor(Math.random() * max);
        }
        
        const earnings = randomNum(2000)


        collector.on('collect', async (m) => {
            let replyEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`You searched \`${m.content}\` and found **${earnings.toLocaleString()} coins**! ${randomItems}`)
            .setFooter(`Nice 😏`)
          
            message.reply({ embeds: [replyEmbed] });

            await moneyModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        coins: earnings,
                    },
                }
            );
        });

        collector.on('end', (collected, reason) => {
            if (reason == "time") {
                message.reply('You ran out of time!');
            }
        });

        let searchEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Which location would you like to search?`)
        .setDescription(`Type the location in this channel\n \`${chosenLocations.join('` `')}\``)
        .setFooter(`You've got 25 seconds to give an answer!`)

        message.reply({ embeds: [searchEmbed] });
    }
}

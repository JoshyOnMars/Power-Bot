const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
    name: "search",
    usage: "search",
    description: "Be a weirdo and search for money...",
    category: "Currency",
    cooldown: 1,
    async execute(message, args, client, profileData, serverData) {
        if (serverData.economy == false) return message.reply(`The module \`economy\` is **disabled**`);

        const locations = [
            "highbay bar",
            "high bay",
            "mid bay",
            "low bay",
            "raptor truck",
            "tesla",
            "floor",
            "pockets",
            "scrapyard",
            "dome tent",
            "ring tent",
            "nosecone tent"
        ];
        
        const items = [
                        "And **1** banknote!",
                        "_ _",
                        "_ _",
                        "_ _"
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
            message.reply(`${message.author}, You found ${earnings.toLocaleString()} coins! ${randomItems}`);

            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        coins: earnings,
                    },
                }
            );
           if (randomItems == items[0]) {
               await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                    bankSize: randomNum(1000) 
                    },
                }
                );
                }
        });

        collector.on('end', (collected, reason) => {
            if (reason == "time") {
                message.reply('You ran out of time!');
            }
        });


        message.reply(`<@${message.author.id}> Which location would you like to search?\n Type the location in this channel\n \`${chosenLocations.join('` `')}\``);
    }
}

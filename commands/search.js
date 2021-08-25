const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
    name: "search",
    category: "Currency",
    cooldown: 45,
    async execute(message, args, client, profileData) {

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

        const chosenLocations = locations.sort(() => Math.random() - Math.random()).slice(0, 3);

        const filter = ({ author, content }) => message.author == author && chosenLocations.some((location) => location.toLowerCase() == content.toLowerCase());

        const collector = message.channel.createMessageCollector({ filter, max: 1, time: 25000 });

        function randomNum(max) {
            return Math.floor(Math.random() * max);
        }
        
        const earnings = randomNum(2000)


        collector.on('collect', async (m) => {
            message.reply(`${message.author}, You found ${earnings.toLocaleString()} coins!`);

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
        });

        collector.on('end', (collected, reason) => {
            if (reason == "time") {
                message.reply('You ran out of time!');
            }
        });


        message.reply(`<@${message.author.id}> Which location would you like to search?\n Type the location in this channel\n \`${chosenLocations.join('` `')}\``);
    }
}

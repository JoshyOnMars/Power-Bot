const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
    name: "search",
    cooldown: 1800,
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

        const earnings = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;


        collector.on('collect', async (m) => {
            message.channel.send(`${message.author}, You found ${earnings} coins!`);

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
                message.channel.send('You ran out of time!');
            }
        });


        message.channel.send(`<@${message.author.id}> Which location would you like to search?\n Type the location in this channel\n \`${chosenLocations.join('` `')}\``);
    }
}

const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const { pagination } = require("reconlx")
const profileModel = require("../models/profileSchema");

module.exports = {
    name: "help",
    async execute(message, args, client, profileData) {
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
        const clientCommands = [];
        for(const [name, {description}] of client.commands) {
            clientCommands.push({ name: name, value: `<:__:881147807879286804> ${description || "none"}` });
        }
        // Chunking the commands in smaller arrays. Leave second parameter blank to use default of 15, or choose your own size.
        // Note that Discord doesn't allow any embed to go over 25 fields, 2000 characters.
        chunk(clientCommands, 10).forEach((chunks) => {
            const embed = new MessageEmbed().setTitle("Available commands").setDescription("The commands below are available to be used in your server.");
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

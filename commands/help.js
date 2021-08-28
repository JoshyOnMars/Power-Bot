const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const { pagination } = require("reconlx")
const profileModel = require("../models/profileSchema");

module.exports = {
    name: "help",
    async execute(message, args, client, profileData) {
        const embedPages = [];
      
        function chunk(array, chunkSize){
            const chunked = [];
            for(let i = 0; i < array.length; i += chunkSize) {
                chunked.push(array.slice(i, i + chunkSize));
            }
            return chunked;
        }
      
        for(const [name, {description}] of client.commands){
            let embed = new MessageEmbed();
            embed.addField(`**${name}**`, `:smth: ${description || "none"}`);

            embedPages.push(embed);
        }
      
        const chunkedArray = chunk(embedPages, 10);
      
        pagination({
            embeds: chunkedArray,
            channel: message.channel,
            author: message.author,
            time: 30000,
        });
    },
};

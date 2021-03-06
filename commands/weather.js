const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    name: 'weather',
    usage: "weather <location>",
    description: "Search for the weather of a specified location.",
    category: "Information",
    async execute(message, args, client) {
    
        weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('Please specify a location')

        if(result === undefined || result.length === 0) return message.channel.send('**Invalid** location');

        let current = result[0].current;
        let location = result[0].location;

        let fahrenheit = current.temperature * 9/5 + 32
            
        const weatherinfo = new MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Weather forecast for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor("BLUE")
        .addField('Temperature', `${current.temperature}°C|${fahrenheit}°F`, true)
        .addField('Wind', current.winddisplay, true)
        .addField('Humidity', `${current.humidity}%`, true)


        message.channel.send({ embeds: [weatherinfo] })
        })        
    },
};

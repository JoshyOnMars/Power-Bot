const { MessageEmbed } = require("discord.js")
const profileModel = require("../models/profileSchema");

module.exports = {
  name: "beg",
  usage: "beg",
  description: "Beg strangers for some money lol",
  category: "Currency",
  cooldown: 40,
  async execute(message, args, client, profileData, serverData) {
    if (serverData.economy == false) return message.reply(`The module \`economy\` is **disabled**`);

    function randomNum(max) {
    return Math.floor(Math.random() * max);
    }
    const num = randomNum(4200)
    let names = require("../names.js")
    let randomName = names[Math.floor(Math.random() * names.length)];
    let phrases = [`Oh you need money? Here have **${num.toLocaleString()} coins**.`,
                   `LMAO you broke.`,
                   `Damn..`,
                   `No get a job.`,
                   `ew`,
                   `Sorry, gonna use my money for Dogecoin.`,
                   `Sorry, i don't have any change...`,
                   `Money?! HELL YEAH HERE'S **${num.toLocaleString()} COINS**!`,
                   `Here's **${num.toLocaleString()} coins**, buy yourself some milk.`,
                   `You poor thing.. Take **${num.toLocaleString()} coins**.`,
                   `Have **${num.toLocaleString()} coins**, don't spent it all at once.`,
                   `Nice shirt, but- buy a better one with **${num.toLocaleString()} coins**..`
                  ]
    let randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    if (randomPhrase.includes(phrases[1]) || randomPhrase.includes(phrases[2]) || randomPhrase.includes(phrases[3]) || randomPhrase.includes(phrases[4]) || randomPhrase.includes(phrases[5]) || randomPhrase.includes(phrases[6])) {
         let lose = new MessageEmbed()
         .setColor("RED")
         .setTitle(`${randomName}`)
         .setDescription(`"${randomPhrase}"`)
         .setTimestamp()
         return message.reply({ embeds: [lose] })
    }

    client.add(message.author.id, parseInt(num))
    let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${randomName}`)
    .setDescription(`"${randomPhrase}"`)
    .setTimestamp()
    return message.reply({ embeds: [embed] });
  },
};

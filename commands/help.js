const { MessageEmbed} = require("discord.js");

module.exports = {
    name: "help",
    description: 'Well the command you are using :/',
    category: 'Info',
    async execute(message, args, client) {

    let { infoSize, currencySize, modSize, utilitySize } = newFunction_1(client);
    let { infoCategory, currencyCategory, modCategory, utilityCategory} = newFunction(client);
    let helpMenuEmbed = new MessageEmbed()
      .setAuthor(`${client.user.username}s Commands`, client.user.displayAvatarURL())
      .setColor("#2f3136")
      .setDescription(`You can also find extra info of a command by doing \`${bot.prefix}help (command)\``)
      .addFields(
        {
          name: `Info [${infoSize}]`,
          value: `${infoCategory}`,
        },
        {
          name: `Currency [${currencySize}]`,
          value: `${currencyCategory}`,
        },
        {
          name: `Moderation [${modSize}]`,
          value: `${modCategory}`,
        },
        {
          name: `Utility [${utilitySize}]`,
          value: `${utilityCategory}`,
        },
      )

      if (client.commands.has(args[0])) {
        let command = client.commands.get(args[0])
        let embed = new MessageEmbed()
        .setAuthor(`Command Information: ${command.name}`, client.user.displayAvatarURL())
        .setColor("#2f3136")
        .addFields(
          {
            name: `Description:`,
            value: `\`${command.description || "None"}\``,
          },
          {
            name: `Usage:`,
            value: `\`${command.usage || "None"}\``,
          },
          {
            name: `Category:`,
            value: `\`${command.category || "None"}\``,
          }
        )
        return message.channel.send({ embeds: [embed]});
      }

      message.channel.send({ embeds: [helpMenuEmbed] })
  }
};
function newFunction_1(client) {
  let infoSize = client.commands.filter(c => c.category === "Info").size;
  let currencySize = client.commands.filter(c => c.category === "Currency").size;
  let modSize = client.commands.filter(c => c.category === "Moderation").size;
  let utilitySize = client.commands.filter(c => c.category === "Utility").size;
  return { infoSize, currencySize, modSize, utilitySize };
}

function newFunction(client) {
  let infoCategory = client.commands.filter(c => c.category === "Info").map(m => `\`${m.name}\``).join(" ");
  let currencyCategory = client.commands.filter(c => c.category === "Currency").map(m => `\`${m.name}\``).join(" ");
  let modCategory = client.commands.filter(c => c.category === "Moderation").map(m => `\`${m.name}\``).join(" ");
  let utilityCategory = client.commands.filter(c => c.category === "Utility").map(m => `\`${m.name}\``).join(" ");
  return { infoCategory, currencyCategory, modCategory, utilityCategory };
}

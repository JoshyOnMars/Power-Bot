
const { MessageEmbed} = require("discord.js");

module.exports = {
    name: "help",
    description: 'Well the command you are using :/',
    aliases: ["?", "Help", "HELP"],
    category: 'Info',
    async execute(message, args, client) {

    let { infoSize, modSize } = newFunction_1(client);
    let { infoCategory, modCategory } = newFunction(client);
    let helpMenuEmbed = new MessageEmbed()
      .setAuthor(`${client.user.username}s Commands`, client.user.displayAvatarURL())
      .setColor("#2f3136")
      .setDescription(`You can also find extra info of a command by doing \`.help (command)\``)
      .addFields(
        {
          name: `Info [${infoSize}]`,
          value: `${infoCategory}`,
        },
        {
          name: `Moderation [${modSize}]`,
          value: `${modCategory}`,
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
            value: `\`${command.description}\``,
          },
          {
            name: `Usage:`,
            value: `\`${command.usage || "None"}\``,
          },
          {
            name: `Category:`,
            value: `\`${command.category}\``,
          }
        )
        return message.channel.send({ embeds: [embed]});
      }

      message.channel.send({ embeds: [helpMenuEmbed] })
  }
};
function newFunction_1(client) {
  let infoSize = client.commands.filter(c => c.category === "Info").size;
  let modSize = client.commands.filter(c => c.category === "Moderation").size;
  return { infoSize, modSize };
}

function newFunction(client) {
  let infoCategory = client.commands.filter(c => c.category === "Info").map(m => `\`${m.name}\``).join(" ");
  let modCategory = client.commands.filter(c => c.category === "Moderation").map(m => `\`${m.name}\``).join(" ");
  return { infoCategory, modCategory };
}

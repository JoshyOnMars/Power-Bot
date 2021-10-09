const { MessageEmbed } = require("discord.js");
let moment = require("moment")

module.exports = {
  name: "eval",
  description: "DEVELOPER ONLY",
  async execute(message, args, client, moneyData) {
    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }

    {
      if (message.author.id !== "691634056278048778")
        return message.reply(":x: You are not my owner!");
      try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        let evalEmbed = new MessageEmbed()
        .setColor("#2f3136")
          // .setDescription(`\`\`\`xl\n${clean(evaled)}\`\`\``)
          .addFields(
            {
              name: "📥INPUT📥",
              value: `\`\`\`js\n${code}\`\`\``,
              inline: false
            },
            {
              name: "📤OUTPUT📤",
              value: `\`\`\`xl\n${clean(evaled)}\n\`\`\``,
              inline: false
            }
          );
        message.reply({ embeds: [evalEmbed] });
      } catch (err) {
        let errEmbed = new MessageEmbed()
        .setColor("#2f3136")
        .addFields({
          name: "ERROR",
          value: `\`\`\`xl\n${clean(err)}\n\`\`\``,
          inline: false
        });

        message.reply({ embeds: [errEmbed] });
      }
    }
  }
};
//clean(evaled), { code: "xl" }

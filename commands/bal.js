module.exports = {
  name: "balance",
  aliases: ["bal", "bl"],
  async execute(message, args, client, profileData) {
    message.channel.send(`Your wallet bal is ${profileData.coins}, you banks bal is ${profileData.bank}`);
  },
};

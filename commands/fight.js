module.exports = {
	name: 'fight',
	description: 'this is a test cmd dont spam it!',
  category: 'Moderation',
	async execute(message, args, client) {
    let beastdamage = Math.floor(Math.random() * 15);
    let userdamage = Math.floor(Math.random() * 30);
    //message.delete();
    userhealth = userhealth <= 0 ? 100 : userhealth - beastdamage;
    beasthealth = beasthealth <= 0 ? 100 : beasthealth - userdamage;
    
    
    let Embed1 = new MessageEmbed()
    .setColor("#2f3136")
    .setDescription(`➡️ You dealt **${userdamage}** damage! And the discord beast has **${beasthealth}** health left...`);
    
    
    let Embed2 = new MessageEmbed()
    .setColor("#2f3136")
    .setDescription(`🏆 You dealt **${userdamage}** damage! The discord beast has died! You saved **${message.guild.name}**!`);
    
    
    let Embed3 = new MessageEmbed()
    .setColor("#2f3136")
    .setDescription("⬅️ The discord beast dealt **${beastdamage}** damage! And you have **${userhealth}** health left...")
    
    
    let Embed4 = new MessageEmbed()
    .setColor("#2f3136")
    .setDescription(`🐲 The discord beast dealt **${beastdamage}** damage! You have died! The discord beast destroyed **${message.guild.name}**!`)
    
    if (beasthealth <= 0)
      return message.channel.send({ embeds: [Embed2] });
    message.channel.send({ embeds: [Embed1] }).then(console.log(`➡️ Dealt ${userdamage} damage to the discord beast in ${message.guild.name}! The discord beast now has ${beasthealth} health left!`));
    if (userhealth <= 0)
      return message.channel.send({ embeds: [Embed4] }).then((userhealth <= 0)((userhealth = userhealth)));
    message.channel.send({ embeds: [Embed3] }).then(console.log(`⬅️ The discord beast dealt ${beastdamage} damage to the user! In ${message.guild.name}! The user now has ${userhealth} health left!`));

  },
};

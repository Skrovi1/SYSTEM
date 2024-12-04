module.exports = {
  name: "spin",
  staffOnly: true,
  execute(message, client) {
    let { MessageEmbed } = require("discord.js");
    const args = message.content.split(" ");
    if (!args[1]) return message.reply("**منشن شخصاً او ضع ايدي**");
    const user =
      message.mentions.users.first() || client.users.cache.get(args[1]);
    if (!user) return message.reply("**لم اتمكن من العثور علي هذا العضو**");
    /* const prizes = [
			'60k',
			'50k',
			'40k',
			'Legend S ',
			'OverPower S',
			'OverPower S',
			'OverPower S ',
			'Angel S ',
			'Angel S',
			'Angel S',
			'Normal S',
			'Normal S',
			'Normal S',
			'Normal S',
			'Normal S',
			'Designer S',
			'Designer S',
			'Designer S',
			'Designer S',
			'Ads ( Giveaway )',
			'10k',
			'حظ اوفر المرة القادمة',
			'10k',
			'10k',
			'10k',
			'اللعب مرة أخري ',
			'اللعب مرة أخري',
			'اللعب مرة أخري',
			'Order Everyone ',
			'Ads Everyone',
			'Order Everyone ',
			'Ads Everyone',
			'Order Everyone ',
			'Ads Everyone',
			'Order Everyone ',
			'Ads Everyone'
		];*/

    let prizes = [
      "10k",
      "10k",
      "10k",
      "10k",
      "10k",
      "20k",
      "20k",
      "20k",
      "حظ اوفر المرة القادمه",
      "30k",
      "30k",
      "20k",
      "حظ اوفر المرة القادمه",
      "40k",
      "30k",
      "50k",
      "20k",
      "50k",
      "حظ اوفر المرة القادمه",
    ];

    let embed = new MessageEmbed()
      .setAuthor(user.tag, user.avatarURL())
      .setColor("RANDOM")
      .setFooter(message.guild.name, message.guild.iconURL())
      .addField(
        `You Won :`,
        `${prizes[Math.floor(Math.random() * prizes.length)]}`
      )
      .setTimestamp()
      .setThumbnail(
        "https://media.discordapp.net/attachments/921077644597006336/930811550242050088/2917513.png"
      );

    message.channel.send({
      content: `${user}`,
      embeds: [embed],
    });
  },
};

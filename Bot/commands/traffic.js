module.exports = {
  name: "traffic",
  staffOnly: true,
  async execute(message, client) {
    let {
      MessageEmbed,
      MessageButton,
      MessageActionRow,
    } = require("discord.js");
    const args = message.content.split(" ");

    if (!args[1]) return message.reply("**منشن شخصاً او ضع ايدي**");
    const user =
      message.mentions.users.first() || client.users.cache.get(args[1]);
    if (!user) return message.reply("**لم اتمكن من العثور علي هذا العضو**");

    /*const prizes = [
			'Designer S',
			'Excellent S',
			'Excellent S',
			'10k',
			'حظ اوفر المرة القادمة',
			'10k',
			'Special S',
			'Angel S',
			'Normal S',
			'20k',
			'15k',
			'30k',
			'30k',
			'30k',
			'25k',
			'AD Here',
			'AD Here',
			'AD Everyone',
			'Special Order Here',
			'Special Order Everyone',
			'Special Order Here',
			'Normal S',
			'10k'
		];*/

    let prizes = [
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
      "40k",
      "30k",
      "حظ اوفر المرة القادمه",
    ];

    const colors = ["🔴", "🟡", "🟢"];

    let row = new MessageActionRow();

    for await (const color of colors) {
      if (!row.components || row.components.length == 0) row.components = [];
      row.components.push(
        new MessageButton()
          .setEmoji(color)
          .setCustomId(color)
          .setStyle("SECONDARY")
      );
    }

    let msg = await message.channel.send({
      content: `${user}, Choose a color from this colors.`,
      components: [row],
    });

    let collector = msg.createMessageComponentCollector({
      filter: (i) => i.user.id == user.id,
    });

    collector.on("collect", async (i) => {
      let embed = new MessageEmbed()
        .setAuthor({
          name: user.tag,
          iconURL: user.avatarURL(),
        })
        .setColor("RANDOM")
        .setFooter({
          text: message.guild.name,
          iconURL: message.guild.iconURL(),
        })
        .addField(
          `${i.customId} You Won :`,
          `${prizes[Math.floor(Math.random() * prizes.length)]}`
        )
        .setTimestamp()
        .setThumbnail(
          "https://media.discordapp.net/attachments/911573424839741460/914448753639968808/2547608.png"
        );

      await msg.edit({
        content: `${user.toString()}`,
        embeds: [embed],
        components: [],
      });
    });
  },
};

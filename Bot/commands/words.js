require("discord-reply");
module.exports = {
  name: "words",
  staffOnly: true,
  execute(message, client) {
    let { MessageEmbed } = require("discord.js");
    const args = message.content.split(" ");

    if (!args[1]) return message.reply("**منشن شخصاً او ضع ايدي**");
    const user =
      message.mentions.users.first() || client.users.cache.get(args[1]);
    if (!user) return message.reply("**لم اتمكن من العثور علي هذا العضو**");
    /*let prizes = [
            '10k',
			'20k',
			'25k',
			'AD Here',
            '10k',
            '10k',
			'AD Everyone',
            '10k',
            '10k',
            '10k',
            '10k',
			'20k',
			'25k',
			'20k',
			'25k',
            '10k',
            '2 Spins More',
			'20k',
            '10k',
			'25k',
            '2 Spins More',
            '2 Spins More',
            '2 Spins More',
            '10k',
			'Special Order Everyone',
            '2 Spins More',
            '2 Spins More',
            '10k',
			'Special Order Here',
			'20k',
			'حظ اوفر المرة القادمة',
            '2 Spins More',
			'25k',
            '10k',
			
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
      "30k",
      "حظ اوفر المرة القادمه",
    ];

    // if (message.author.id == '925454966464860230')
    //     prizes = ['Nitro Classic']
    let embed = new MessageEmbed()
      .setAuthor(user.tag, user.avatarURL())
      .addField(`**امامك 30 ثانيه لاختيار حرف**`, `A\nB\nC\nD\nE\nF`)
      .setColor("RANDOM")
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp()
      .setThumbnail(
        "https://media.discordapp.net/attachments/911573424839741460/914247632841494558/4509634.png"
      );

    message.channel
      .send({ content: `<@!${user.id}>`, embeds: [embed] })
      .then((msg) => {
        const filter = (a) => a.author.id == user.id;
        const collector = msg.channel.createMessageCollector({
          filter: filter,
          time: 30_000,
          max: 1,
        });

        collector.on("collect", (mm) => {
          if (
            mm.content.toLowerCase() == "a" ||
            mm.content.toLowerCase() == "b" ||
            mm.content.toLowerCase() == "c" ||
            mm.content.toLowerCase() == "e" ||
            mm.content.toLowerCase() == "f" ||
            mm.content.toLowerCase() == "d"
          ) {
            if (mm.author.id !== user.id) return;

            let embed1 = new MessageEmbed()
              .setAuthor(user.tag, user.avatarURL())
              .setThumbnail(user.avatarURL())
              .setFooter(message.guild.name, message.guild.iconURL())
              .addField(
                `You Won :`,
                `${prizes[Math.floor(Math.random() * prizes.length)]}`
              )
              .setTimestamp()
              .setColor("RANDOM");

            if (!msg) return;
            msg.edit({
              embeds: [embed1],
            });
            collector.stop();
          }
        });
      });
  },
};

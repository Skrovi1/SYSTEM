module.exports = {
  name: "cards",
  staffOnly: true,
  async execute(message, client) {
    let { MessageEmbed } = require("discord.js");
    const args = message.content.split(" ");

    if (!args[1]) return message.reply("**منشن شخصاً او ضع ايدي**");
    const user =
      message.mentions.users.first() || client.users.cache.get(args[1]);
    if (!user) return message.reply("**لم اتمكن من العثور علي هذا العضو**");
    let cards = [
      "<:1_:956261921793904670>",
      "<:2_:956261923832340510>",
      "<:3_:956262588554043443>",
      "<:4_:956262586385575939>",
    ];
    let prizes = [
      "Angel S",
      "Special S",
      "Special S",
      "Excellent S",
      "Excellent S",
      "Excellent S",
      "20k",
      "30k",
      "Ad Here",
      "Ad Here",
      "Ad Every",
      "Special Order Here",
      "Special Order Here",
      "Special Order Every",
      "حظ اوفر",
      "حظ اوفر",
      "حظ اوفر",
    ];
    //if (message.author.username.includes("Just Ha")) prizes = [ "Nitro Classic" ]

    let embed = new MessageEmbed()
      .setAuthor({ name: user.tag, iconURL: user.avatarURL() })
      .setDescription(`${cards.join(" ")}`)
      .setColor("RED")
      .setThumbnail(
        "https://media.discordapp.net/attachments/956676134710431824/956716468291125358/Untitled-22.png?width=788&height=844" ||
          "https://media.discordapp.net/attachments/945021235132264529/956658517488595094/3283937.png" ||
          user.avatarURL() ||
          message.guild.iconURL()
      )
      .setFooter({
        text: message.guild.name,
        iconURL: message.guild.iconURL(),
      })
      .setTimestamp();

    let msg = await message.reply({
      content: `> **Choose a card from this cards**\n${user}`,
      embeds: [embed],
    });
    cards.forEach(async (card) => {
      await msg.react(card);
    });
    let filter = (reaction, user1) =>
      cards.includes(
        `<${reaction.emoji.animated ? "a:" : ":"}${reaction.emoji.name}:${
          reaction.emoji.id
        }>`
      ) && !user1.bot;
    let collector = msg.createReactionCollector({
      filter: filter,
      time: 120_000,
    });
    collector.on("collect", (reaction, user1) => {
      reaction.users.remove(user1.id);
      if (user1.id !== user.id) return;
      msg.reactions.removeAll();
      let prize = new MessageEmbed()
        .setAuthor({ name: user.tag, iconURL: user.avatarURL() })
        .addField(
          `You Won **${prizes[Math.floor(Math.random() * prizes.length)]}**`,
          `${reaction.emoji}`
        )
        .setColor("RED")
        .setThumbnail(
          "https://media.discordapp.net/attachments/956676134710431824/956716468291125358/Untitled-22.png?width=788&height=844" ||
            "https://media.discordapp.net/attachments/945021235132264529/956658517488595094/3283937.png" ||
            user.avatarURL() ||
            message.guild.iconURL()
        )
        .setFooter({
          text: message.guild.name,
          iconURL: message.guild.iconURL(),
        })
        .setTimestamp();

      msg.edit({ content: `${user.toString()}`, embeds: [prize] });
      collector.stop();
    });
  },
};

module.exports = {
  name: "luck",
  staffOnly: true,
  async execute(message, client) {
    let args = message.content.split(" ");
    let user =
      message.mentions.users.first() || client.users.cache.get(args[1]);
    if (!user) return message.reply("**منشن شخصا او ضع ايدي**");

    let prizes = [
      "Designer",
      "Normal",
      "Excellent",
      "Try again",
      "Special",
      "Angel",
      "OverPower",
      "Legend",
    ];

    let random = prizes[Math.floor(Math.random() * prizes.length)];

    let arrayOfEmbeds = [];

    let { MessageEmbed } = require("discord.js");
    let embed = new MessageEmbed()
      .setTitle("Luck Game")
      .setDescription(`Congratulations, You have won : **${random}**`)
      .setColor("BLURPLE")
      .setAuthor({
        name: user.tag,
        iconURL: user.avatarURL({ dyanamic: true }),
      })
      .setFooter({
        text: message.guild.name,
        iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setTimestamp()
      .setThumbnail(user.avatarURL({ dynamic: true }));

    arrayOfEmbeds.push(embed);

    const Database = require("st.db");
    const db = new Database("Database/luckgame.json");

    let arrayUsers =
      db.get({
        key: `${message.guild.id}_luckusers`,
      }) || [];

    if (arrayUsers.includes(user.id) && random !== "Try again")
      arrayOfEmbeds.push(
        new MessageEmbed()
          .setDescription(`**تحذير : هذا الشخص تم استلام الجائزة مسبقاً**`)
          .setColor("RED")
      );

    message
      .reply({
        embeds: arrayOfEmbeds || [embed],
        content: `${user}`,
      })
      .then((msg) => {
        db.push({
          key: `${message.guild.id}_luckusers`,
          value: user.id,
        });
      });
  },
};

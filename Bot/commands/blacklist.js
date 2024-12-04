const db = require("quick.db");
const Database = require("st.db");
const { MessageEmbed } = require("discord.js");
let blacklists = require("../../Schemas/blacklist-schema.js");
module.exports = {
  name: "blacklist",
  async execute(message, client) {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.reply("**هذا الأمر فقط لمسؤولين الأدارة**");
    let args = message.content.split(" ");
    if (!args[1]) return message.reply("**منشن شخصاً او ضع ايدي**");
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    if (!member) return message.reply(`**لم اتمكن من العثور علي هذا العضو**`);
    let reason = args.slice(2).join(" ");
    if (!reason) return message.reply("**يرجي وضع سبب الأضافة**");

    let blacklistData = await blacklists.findOne({
      userId: member.user.id,
      guildId: member.guild.id,
    });

    if (blacklistData)
      return message.reply("**هذا العضو بالفعل في القائمه السوداء**");

    new blacklists({
      userId: member.user.id,
      guildId: member.guild.id,
      reason: reason,
    }).save();

    message.reply(`**تم أضافه ${member.user} إلي القائمه السوداء**`);

    let embed = new MessageEmbed()
      .setAuthor(member.user.tag, member.user.avatarURL())
      .setColor("RED")
      .setThumbnail(member.user.avatarURL())
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp()
      .setTitle("**تم إضافة عضو إلي القائمه السوداء**")
      .addField(`**Member :**`, `${member.user}`, true)
      .addField(`**By :**`, `${message.author}`, true)
      .addField(`**Reason :**`, `${reason}`, true);
    let blacklistRole = message.guild.roles.cache.get(
      `${db.fetch(`${message.guild.id}_BLACKLIST-ROLE`)}`
    );

    if (blacklistRole) member.roles.add(blacklistRole);

    let roles = [
      "♜ || Co Admin",
      "♞・↝ Manager",
      "♞・↝ Foreman",
      "♞・↝ Ticket Leader",
      "♞・↝ High Staff",
      "♚・↝ Head",
      "♚・↝ Controller",
      "♚・↝ Storm",
      "♚・↝ Expert",
      "♚・↝ Master",
      "♚・↝ Power",
      "♚・↝ Boss",
      "♚・↝ New Admin",
      "☙・↝ Staff",
    ];

    roles.forEach((rolename) => {
      if (member.roles.cache.find((ro) => ro.name === rolename)) {
        let role = message.guild.roles.cache.find((r) => r.name === rolename);
        if (role) member.roles.remove(role);
      }
    });

    let roomDb = db.fetch(`${message.guild.id}_BLACKLIST-LOG`);
    let channel = client.channels.cache.get(`${roomDb}`);
    if (!channel) return;
    channel.send({ embeds: [embed] });
  },
};

const db = require("quick.db");
const Database = require("st.db");
const { MessageEmbed } = require("discord.js");
let blacklists = require("../../Schemas/blacklist-schema.js");
module.exports = {
  name: "unblacklist",
  async execute(message, client) {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.reply("**هذا الأمر فقط لمسؤولين الأدارة**");
    let args = message.content.split(" ");
    if (!args[1]) return message.reply("**منشن شخصاً او ضع ايدي**");
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    if (!member) return message.reply(`**لم اتمكن من العثور علي هذا العضو**`);

    let blacklistData = await blacklists.findOne({
      userId: member.user.id,
      guildId: member.guild.id,
    });

    if (!blacklistData)
      return message.reply("**هذا العضو ليس في القائمه السوداء**");

    blacklistData.delete();

    message.reply(`**تم إزالة ${member.user} من القائمه السوداء**`);

    let embed = new MessageEmbed()
      .setAuthor(member.user.tag, member.user.avatarURL())
      .setColor("RED")
      .setThumbnail(member.user.avatarURL())
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp()
      .setTitle("**تم إزالة عضو من القائمه السوداء**")
      .addField(`**Member :**`, `${member.user}`, true)
      .addField(`**By :**`, `${message.author}`, true);

    let blacklistRole = message.guild.roles.cache.get(
      `${db.fetch(`${message.guild.id}_BLACKLIST-ROLE`)}`
    );

    if (blacklistRole) member.roles.remove(blacklistRole);

    let roomDb = db.fetch(`${message.guild.id}_BLACKLIST-LOG`);
    let channel = client.channels.cache.get(`${roomDb}`);
    if (!channel) return;
    channel.send({ embeds: [embed] });
  },
};

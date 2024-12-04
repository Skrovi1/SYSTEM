const db = require("quick.db");
module.exports = {
  name: "set-system-log",
  execute(message, client) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    const args = message.content.split(" ");
    if (!args[1]) return message.reply("**منشن روم او ضع ايدي**");
    const channel =
      message.mentions.channels.first() || client.channels.cache.get(args[1]);
    if (!channel) return message.reply("**لم اتمكن من العثور علي هذه الروم**");
    if (db.get(`${message.guild.id}_SYSTEM-LOG`) == channel.id)
      return message.reply(`**${channel} بالفعل هي لوج النظام**`);
    db.set(`${message.guild.id}_SYSTEM-LOG`, channel.id);
    message.reply(`**تم تعيين ${channel} لوج النظام**`);
  },
};

const db = require("quick.db");
module.exports = {
  name: "set-suggestions-room",
  execute(message, client) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    const args = message.content.split(" ");
    if (!args[1]) return message.reply("**منشن روم او ضع ايدي**");
    const channel =
      message.mentions.channels.first() || client.channels.cache.get(args[1]);
    if (!channel) return message.reply("**لم اتمكن من العثور علي هذه الروم**");
    if (db.get(`${message.guild.id}_SUGGESTIONS-ROOM`) == channel.id)
      return message.reply(`**${channel} بالفعل هي روم استقبال الأقتراحات**`);
    db.set(`${message.guild.id}_SUGGESTIONS-ROOM`, channel.id);
    message.reply(`**تم تعيين ${channel} روم استقبال الأقتراحات**`);
  },
};

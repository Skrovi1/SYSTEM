module.exports = {
  name: "end-room",
  async execute(message, client) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    let privates = require("../../Schemas/privates-schema.js");
    let args = message.content.split(" ");
    if (!args[1])
      return message.reply({
        content: `**منشن روم او ضع ايدي.**`,
      });
    let channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(`${args[1]}`);
    let data = await privates.findOne({
      guildId: message.guild.id,
      channelId: channel.id,
    });
    if (!data)
      return message.reply({
        content: `**هذه الروم ليست من الرومات الخاصة.**`,
      });
    data.delete();
    channel.delete();
    message.reply({
      content: `**تم انهاء اشتراك الروم الخاص بنجاح.**`,
    });

    let privatesRole = message.guild.roles.cache.get(
      `${require("quick.db").fetch(`${message.guild.id}_PRIVATES-ROLE`)}`
    );
    let member = message.guild.members.cache.get(data.ownerId);
    if (privatesRole && member && member.roles.cache.has(privatesRole.id)) {
      member.roles.remove(privatesRole);
    }
  },
};

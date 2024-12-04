module.exports = {
  name: "rename-room",
  async execute(message, client) {
    let args = message.content.split(" ").slice(1).join(" ");
    let privates = require("../../Schemas/privates-schema.js");
    let data = await privates.findOne({
      guildId: message.guild.id,
      channelId: message.channel.id,
    });
    if (!data)
      return message.reply({
        content: "**هذه الروم ليست من الرومات الخاصة.**",
      });
    if (
      message.author.id !== data.ownerId &&
      !message.member.permissions.has("ADMINISTRATOR")
    )
      return message.reply({
        content: `**هذا الامر فقط لمالك هذه الروم.**`,
      });
    if (!args)
      return message
        .reply({
          content: `**يرجي كتابة اسم الروم الجديد.**`,
        })
        .then(
          (msg) =>
            setTimeout(() => {
              msg.delete();
            }, 5000) && message.delete()
        );
    message.delete();
    message.channel.setName("〢⌭・" + args);
  },
};

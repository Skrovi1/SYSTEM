module.exports = {
  name: "set-avatar",
  developersOnly: true,
  async execute(message, client) {
    let args = message.content.split(" ");
    if (!args.slice(1).join(" "))
      return message.reply("**ضع رابط صورة البوت الجديد**");
    if (!args[1].includes("http")) return message.reply("**رابط صورة فقط**");
    client.user.setAvatar(args.slice(1).join(" "));
    message.reply({
      content: `**تم تغيير صورة البوت إلـي**`,
      files: [args.slice(1).join(" ")],
    });
  },
};

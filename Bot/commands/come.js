module.exports = {
  name: "come",
  staffOnly: true,
  aliases: ["نداء"],
  async execute(message, client) {
    let args = message.content.split(" ");
    if (!args[1]) return message.reply("**منشن شخص او ضع ايدي**");
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    if (!member) return message.reply("**لم اتمكن من العثور علي هذا العضو**");
    member
      .send(
        `**يرجي القدوم الي التيكت للاهمية ${message.channel}**\n${member.user}`
      )
      .then((m) => {
        message.reply(`**تم نداء ${member.user} بنجاح**`);
      })
      .catch((m) => {
        message.reply(`**لم اتمكن من نداء ${member.user}**`);
      });
  },
};

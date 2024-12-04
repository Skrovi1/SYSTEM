let warnings = require("../../Schemas/warnings-schema.js");

module.exports = {
  name: "unwarn",
  async execute(message, client) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    let args = message.content.split(" ");
    if (!args.slice(1).join(" "))
      return message.reply("**منشن شخص لازاله تحذيراته او ضع رقم التحذير**");
    let user =
      message.mentions.users.first() || client.users.cache.get(args[1]);
    if (!user && isNaN(args[1]) && args[1] !== "all")
      return message.reply("**منشن شخص لازاله تحذيراته او ضع رقم التحذير**");
    let allWarnings = await warnings.find({
      guildId: message.guild.id,
    });
    if (!isNaN(args[1]) && !user)
      allWarnings = await warnings.find({
        guildId: message.guild.id,
        warnId: args[1],
      });

    if (isNaN(args[1]) && user)
      allWarnings = await warnings.find({
        userId: user.id,
        guildId: message.guild.id,
      });

    if (args[1] == "all")
      allWarnings = await warnings.find({ guildId: message.guild.id });

    if (!allWarnings && !user)
      return message.reply("**لا يوجد تحذيرات بهذا الرقم**");
    if (!allWarnings && user)
      return message.reply("**لا يوجد تحذيرات لهذا العضو**");
    if (!allWarnings && args[1] == "all")
      return message.reply("**لا يوجد تحذيرات في هذا السيرفر**");

    let count = allWarnings.length;

    message.reply(`**تم ازالة ${count} تحذيرات**`);

    allWarnings.forEach((warn) => warn.delete());
  },
};

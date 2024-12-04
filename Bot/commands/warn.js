let warnings = require("../../Schemas/warnings-schema.js");
let warningsIds = require("../../Schemas/warnings-ids-schema.js");
module.exports = {
  name: "warn",
  async execute(message, client) {
    if (
      !message.member.permissions.has("ADMINISTRATOR") &&
      !message.member.roles.cache.has("958731724710346802") &&
      !message.member.roles.cache.has("958754439328575549") &&
      !message.member.roles.cache.has("958728179734970370")
    )
      return;
    let args = message.content.split(` `);
    if (!args[1]) return message.reply(`**منشن شخصاً او ضع ايدي**`);
    let user =
      message.mentions.users.first() || client.users.cache.get(args[1]);
    let reason = args.slice(2).join(" ");
    if (!reason) return message.reply("**يرجي كتابة سبب التحذير**");
    let warnsCount = await warningsIds.findOne({ guildId: message.guild.id });
    if (!warnsCount) warnsCount = 0;
    else warnsCount = warnsCount.count;
    warnsCount++;
    let warnId = Math.floor(warnsCount);

    let data = await warningsIds.findOne({ guildId: message.guild.id });
    if (data) {
      data.count = warnId;
      data.save();
    } else {
      new warningsIds({
        guildId: message.guild.id,
        count: warnId,
      }).save();
    }

    new warnings({
      userId: user.id,
      responsibleId: message.author.id,
      guildId: message.guild.id,
      warnId: warnId,
      reason: reason,
      date: new Date(),
    }).save();

    message.reply(`**تم تحذير ${user} بنجاح**`);
  },
};

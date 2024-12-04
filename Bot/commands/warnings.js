let warnings = require("../../Schemas/warnings-schema.js");
module.exports = {
  name: "warnings",
  async execute(message, client) {
    if (
      !message.member.permissions.has("ADMINISTRATOR") &&
      !message.member.roles.cache.has("958731724710346802") &&
      !message.member.roles.cache.has("958754439328575549") &&
      !message.member.roles.cache.has("958728179734970370")
    )
      return;
    let allWarnings = await warnings.find({
      guildId: message.guild.id,
    });

    let user =
      message.mentions.users.first() ||
      client.users.cache.get(message.content.split(" ").slice(1).join(" "));

    if (user)
      allWarnings = await warnings.find({
        userId: user.id,
        guildId: message.guild.id,
      });

    if (allWarnings.length == 0 && !user)
      return message.reply("**لا يوجد تحذيرات في هذا السيرفر**");
    if (allWarnings.length == 0 && user)
      return message.reply("**لا يوجد تحذيرات لهذا العضو**");

    let { MessageEmbed } = require("discord.js");
    let embed = new MessageEmbed()
      .setTitle(`${allWarnings.length} Warnings`)
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
      .setTimestamp()
      .setDescription(
        allWarnings
          .map(
            (value) =>
              `⏱️ <t:${Math.floor(
                new Date(value.date).getTime() / 1000
              )}:f>\nWarn ID (**${value.warnId}**) - By : <@!${
                value.responsibleId
              }>\nUser : <@!${value.userId}>\n\`\`\`\n${value.reason}\n\`\`\``
          )
          .join("\n\n")
      );

    message.reply({ embeds: [embed] });
  },
};

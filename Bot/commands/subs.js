module.exports = {
  name: "subs",
  async execute(message, client) {
    let { MessageEmbed } = require("discord.js");
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    let privates = require("../../Schemas/privates-schema.js");
    let datas = await privates.find({
      guildId: message.guild.id,
    });
    let text = datas
      .filter((d) => message.guild.channels.cache.get(d.channelId))
      .map(
        (data, index) =>
          `**${index + 1}.** <#${data.channelId}> - <@!${
            data.ownerId
          }>\n> Owner ID: ${data.ownerId}\n> Room ID: ${
            data.channelId
          }\n> Time: ${data.time}\n> Created At: <t:${Math.floor(
            new Date(data.createdAt).getTime() / 1000
          )}:D>\n> Ends: <t:${Math.floor(
            new Date(data.endsAt).getTime() / 1000
          )}:R>`
      );
    let embed = new MessageEmbed()
      .setTitle(`Rooms Subscriptions ( ${text.length} )`)
      .setColor("RED")
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.avatarURL({ dynamic: true }),
      })
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setFooter({
        text: message.guild.name,
        iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setTimestamp();

    message.reply({
      embeds: [embed.setDescription(text.join("\n"))],
    });
  },
};

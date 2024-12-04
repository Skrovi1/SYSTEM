module.exports = {
  name: "give-room",
  async execute(message, client, prefix) {
    let privates = require("../../Schemas/privates-schema.js");
    if (!message.member.permissions.has("MANAGE_ROLES")) return;
    let ms = require("ms");
    let db = require("quick.db");
    let moment = require("moment");
    let { MessageEmbed } = require("discord.js");
    let args = message.content.split(" ");
    if (!args[1]) return message.reply("**منشن شخصاً او صح ايدي.**");
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    if (!member) return message.reply("**لم اتمكن من العثور علي هذا العضو**");

    if (
      !args[2] ||
      (!args[2].endsWith("s") &&
        !args[2].endsWith("m") &&
        !args[2].endsWith("h") &&
        !args[2].endsWith("d") &&
        !args[2].endsWith("w") &&
        !args[2].endsWith("mo") &&
        !args[2].endsWith("y"))
    )
      return message.reply("**يُرجى كتابة مدة صحيحة**");

    let time = args[2];

    let privatesCategory = client.channels.cache.get(
      `${db.fetch(`${message.guild.id}_PRIVATES-CATEGORY`)}`
    );

    let privatesRole = message.guild.roles.cache.get(
      `${db.fetch(`${message.guild.id}_PRIVATES-ROLE`)}`
    );
    if (privatesRole) member.roles.add(privatesRole);

    let channel = await message.guild.channels.create(
      `〢⌭・${member.user.username}`,
      {
        type: "GUILD_TEXT",
        parent: privatesCategory ? privatesCategory.id : null,
        permissions: [
          {
            id: message.guild.id,
            deny: ["SEND_MESSAGES", "VIEW_CHANNEL"],
          },
        ],
        topic: `**\`-\` Created at : ${moment(new Date()).format(
          "DD/MM/YYYY"
        )}\n\`-\` Ends at : ${moment(new Date().getTime() + ms(time)).format(
          "DD/MM/YYYY"
        )}\n\`-\` Time : ${time}**`,
      }
    );

    await channel.permissionOverwrites.edit(member.user.id, {
      SEND_MESSAGES: true,
      MENTION_EVERYONE: true,
    });

    await channel.permissionOverwrites.edit(
      message.guild.roles.cache.find((r) => r.name == "Ha-S"),
      {
        VIEW_CHANNEL: true,
      }
    );

    let channelEmbed = new MessageEmbed()
      .setTitle("ROOM HAS BEEN CREATED")
      .addFields(
        {
          name: `Room Owner :`,
          value: `${member.user}`,
          inline: false,
        },
        {
          name: `Time :`,
          value: `${time}`,
          inline: false,
        },
        {
          name: `Created At :`,
          value: `<t:${Math.floor(Date.now() / 1000)}:D>`,
          inline: false,
        },
        {
          name: `Ends :`,
          value: `<t:${Math.floor((Date.now() + ms(time)) / 1000)}:R>`,
          inline: false,
        },
        {
          name: `Control Commands:`,
          value: `\`${prefix}rename-room\` - تغيير اسم الروم`,
          inline: false,
        }
      )
      .setColor("BLURPLE")
      .setAuthor({
        name: member.user.tag,
        iconURL: member.user.avatarURL(),
      })
      .setThumbnail(member.user.avatarURL() || message.guild.iconURL())
      .setFooter({
        text: message.guild.name,
        iconURL: message.guild.iconURL(),
      })
      .setTimestamp();

    channel.send({
      content: `${member}`,
      embeds: [channelEmbed],
    });

    message.react("✅");

    let data = await new privates({
      guildId: message.guild.id,
      channelId: channel.id,
      ownerId: member.user.id,
      time: time,
      createdAt: new Date().getTime(),
      endsAt: new Date().getTime() + ms(time),
    }).save();

    let interval = setInterval(async () => {
      if (Date.now() - new Date(data.endsAt).getTime() >= 0) {
        let channel = message.guild.channels.cache.get(data.channelId);
        if (channel) channel.delete();
        let privatesRole = message.guild.roles.cache.get(
          `${db.fetch(`${message.guild.id}_PRIVATES-ROLE`)}`
        );
        if (
          privatesRole &&
          message.guild.members.cache.get(data.ownerId) &&
          message.guild.members.cache
            .get(data.ownerId)
            .roles.cache.has(privatesRole.id)
        )
          message.guild.members.cache
            .get(data.ownerId)
            .roles.remove(privatesRole);

        let data1 = await privates.findOne({
          guildId: message.guild.id,
          channelId: data.channelId,
        });
        if (data1) data1.delete();
        clearInterval(interval);
      }
    }, 1000);
  },
};

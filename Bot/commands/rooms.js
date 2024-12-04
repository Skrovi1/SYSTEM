module.exports = {
  name: "rooms",
  developersOnly: false,
  async execute(message, client) {
    if (message.guild.id !== "972941060873539584") return;
    let control = [
      "823146676855767042",
      "925454966464860230",
      "767535340402507776",
      "907569838090752000",
      "862891032760025088",
      "717784730564690011",
      "694093860221091860",
      "650453323593416704",
    ];
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    if (!control.includes(message.author.id))
      return message.reply("**فقط مسؤولين السيرفر يمكنهم استعمال ذلك الامر**");
    let { MessageEmbed } = require("discord.js");
    let embed = new MessageEmbed()
      .setTitle("ROOMS MANAGER")
      .setDescription(`**🗑️ Delete Rooms\n📥 Restore Room\n❌ Close Menu**`)
      .setColor("RED")
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp()
      .setThumbnail(message.guild.iconURL())
      .setAuthor(message.author.tag, message.author.avatarURL());

    message.reply({ embeds: [embed] }).then((msg) => {
      const emojis = ["🗑️", "📥", "❌"];

      emojis.forEach((emoji) => msg.react(emoji));

      const filter = (reaction, user) =>
        emojis.includes(reaction.emoji.name) && user.id === message.author.id;

      const collector = msg.createReactionCollector({
        filter: filter,
        time: 120_000,
      });

      collector.on("collect", ({ emoji, user }) => {
        const index = emojis.indexOf(emoji.name);

        if (index === 0) {
          const rooms = [
            "〢✐・gold",
            "〢✐・legends",
            "〢✐・boost",
            "〢✐・over・power",
            "〢✐・تـرسـت",
            "〢✐・تـصـامـيـم",
            "〢✐・أكـونـتـات",
            "〢✐・ديسكورد",
            "〢✐・طـرق",
            "〢✐・العاب",
            "〢✐・عملات",
            "〢✐・اخرى",
          ];

          message.guild.channels.cache
            .filter((k) => rooms.includes(k.name))
            .forEach((ch) => {
              ch.delete();
            });

          msg.edit({ content: `**تم مسح رومات النشر بنجاح**`, embeds: [] });
          msg.reactions.removeAll();
        } else if (index == 1) {
          const rooms = [
            "〢✐・gold",
            "〢✐・legends",
            "〢✐・boost",
            "〢✐・over・power",
            "〢✐・تـرسـت",
            "〢✐・تـصـامـيـم",
            "〢✐・أكـونـتـات",
            "〢✐・ديسكورد",
            "〢✐・طـرق",
            "〢✐・العاب",
            "〢✐・عملات",
            "〢✐・اخرى",
          ];

          rooms.forEach(async (room) => {
            if (
              message.guild.channels.cache.find((ch) => ch.name.includes(room))
            )
              return;
            let Ha_S = message.guild.roles.cache.find(
              (ro) => ro.name == "Ha-S"
            );
            let excellent = message.guild.roles.cache.find(
              (ro) => ro.name == "❃ Excellent S"
            );
            let special = message.guild.roles.cache.find(
              (ro) => ro.name == "❃ Special S"
            );
            let normal = message.guild.roles.cache.find(
              (ro) => ro.name == "❃ Normal S"
            );
            let angel = message.guild.roles.cache.find(
              (ro) => ro.name == "❃ Angel S"
            );
            let designer = message.guild.roles.cache.find(
              (ro) => ro.name == "❃ Designer S"
            );
            let overpower = message.guild.roles.cache.find(
              (ro) => ro.name == "❃ OverPower S"
            );
            let trust = message.guild.roles.cache.find(
              (ro) => ro.name == "❃ Trusted S"
            );
            let legends = message.guild.roles.cache.find(
              (ro) => ro.name == "❃ Legends S"
            );
            let gold = message.guild.roles.cache.find(
              (ro) => ro.name == "❃ Gold S"
            );
            let boost = message.guild.roles.cache.find(
              (ro) => ro.name == "❃ Boost S"
            );
            let staff = message.guild.roles.cache.find(
              (ro) => ro.name == "☙・↝ Staff"
            );
            let highstaff = message.guild.roles.cache.find(
              (ro) => ro.name == "♞・↝ Moderator"
            );
            message.guild.channels.create(room).then(async (channel) => {
              await channel.setParent(
                message.guild.channels.cache.get("1024002130899644518")
              );
              await channel.permissionOverwrites.edit(message.guild.id, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
              });
              await channel.permissionOverwrites.edit(Ha_S, {
                VIEW_CHANNEL: true,
              });
              await channel.permissionOverwrites.edit(staff, {
                MANAGE_MESSAGES: true,
              });
              await channel.permissionOverwrites.edit(highstaff, {
                MANAGE_MESSAGES: true,
              });

              if (channel.name.includes("legend")) {
                await channel.permissionOverwrites.edit(legends, {
                  SEND_MESSAGES: true,
                  ATTACH_FILES: true,
                  MENTION_EVERYONE: true,
                });
                await channel.permissionOverwrites.edit(gold, {
                  SEND_MESSAGES: true,
                  ATTACH_FILES: true,
                  MENTION_EVERYONE: true,
                });
              } else if (channel.name.includes("over")) {
                await channel.permissionOverwrites.edit(overpower, {
                  SEND_MESSAGES: true,
                  ATTACH_FILES: true,
                  MENTION_EVERYONE: true,
                });
                await channel.permissionOverwrites.edit(gold, {
                  SEND_MESSAGES: true,
                  ATTACH_FILES: true,
                  MENTION_EVERYONE: true,
                });
              } else if (channel.name.includes("gold")) {
                await channel.permissionOverwrites.edit(gold, {
                  SEND_MESSAGES: true,
                  ATTACH_FILES: true,
                  MENTION_EVERYONE: true,
                });
              } else if (channel.name.includes("boost")) {
                await channel.permissionOverwrites.edit(boost, {
                  SEND_MESSAGES: true,
                  ATTACH_FILES: true,
                  MENTION_EVERYONE: true,
                });
              } else if (channel.name.includes("تـرسـت")) {
                await channel.permissionOverwrites.edit(trust, {
                  SEND_MESSAGES: true,
                  ATTACH_FILES: true,
                  MENTION_EVERYONE: true,
                });
              } else if (channel.name.includes("تـصـامـيـم")) {
                await channel.permissionOverwrites.edit(designer, {
                  SEND_MESSAGES: true,
                  MENTION_EVERYONE: true,
                });
                await channel.permissionOverwrites.edit(angel, {
                  SEND_MESSAGES: true,
                  MENTION_EVERYONE: true,
                });
                await channel.permissionOverwrites.edit(legends, {
                  SEND_MESSAGES: true,
                  ATTACH_FILES: true,
                  MENTION_EVERYONE: true,
                });
                await channel.permissionOverwrites.edit(overpower, {
                  SEND_MESSAGES: true,
                  ATTACH_FILES: true,
                  MENTION_EVERYONE: true,
                });
                await channel.permissionOverwrites.edit(legends, {
                  SEND_MESSAGES: true,
                  ATTACH_FILES: true,
                  MENTION_EVERYONE: true,
                });
                await channel.permissionOverwrites.edit(gold, {
                  SEND_MESSAGES: true,
                  ATTACH_FILES: true,
                  MENTION_EVERYONE: true,
                });
              } else {
                await channel.permissionOverwrites.edit(angel, {
                  SEND_MESSAGES: true,
                  MENTION_EVERYONE: true,
                });
                await channel.permissionOverwrites.edit(excellent, {
                  SEND_MESSAGES: true,
                  MENTION_EVERYONE: true,
                });
                await channel.permissionOverwrites.edit(special, {
                  SEND_MESSAGES: true,
                  MENTION_EVERYONE: true,
                });
                await channel.permissionOverwrites.edit(normal, {
                  SEND_MESSAGES: true,
                  MENTION_EVERYONE: false,
                });
                await channel.permissionOverwrites.edit(legends, {
                  SEND_MESSAGES: true,
                  ATTACH_FILES: true,
                  MENTION_EVERYONE: true,
                });
                await channel.permissionOverwrites.edit(overpower, {
                  SEND_MESSAGES: true,
                  ATTACH_FILES: true,
                  MENTION_EVERYONE: true,
                });
                await channel.permissionOverwrites.edit(legends, {
                  SEND_MESSAGES: true,
                  ATTACH_FILES: true,
                  MENTION_EVERYONE: true,
                });
                await channel.permissionOverwrites.edit(gold, {
                  SEND_MESSAGES: true,
                  ATTACH_FILES: true,
                  MENTION_EVERYONE: true,
                });
              }
              await channel.setRateLimitPerUser(1800);
            });
          });
          msg.edit({ content: `**تم استرجاع رومات النشر**`, embeds: [] });
          msg.reactions.removeAll();
        } else if (index === 2) msg.delete();
      });
    });
  },
};

const db = require("quick.db");
const Database = require("st.db");
const db1 = new Database("./Database/privatesRooms.json");
const moment = require("moment");
const { prefix } = require("../config/config.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "room",
  developersOnly: true,
  execute(message, client) {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.reply(`فقط المسؤولين يمكنهم استعمال ذلك الأمر`);
    let timeout = 1000 * 60 * 60 * 24 * 7;
    let args = message.content.split(" ");
    if (!args[1]) return message.reply("**منشن شخصاً او ضع ايدي**");
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    if (!member) return message.reply("**لم اتمكن من العثور علي هذا الشخص**");
    if (!args[2]) return message.reply("**يرجي كتابه مده صحيحه**");
    let time;
    if (
      args[2].endsWith("s") ||
      args[2].endsWith("d") ||
      args[2].endsWith("h") ||
      args[2].endsWith("w") ||
      args[2].endsWith("m")
    ) {
      time = args[2];
      let gg = args[2].split("");
      gg.pop();

      gg = gg.join("");
      if (isNaN(gg)) return message.reply("**يرجي كتابه مده صحيحه**");
      if (time.endsWith("s")) timeout = gg * (1000 * 1);
      if (time.endsWith("m")) timeout = gg * (1000 * 60 * 1);
      if (time.endsWith("h")) timeout = gg * (1000 * 60 * 60 * 1);
      if (time.endsWith("d")) timeout = gg * (1000 * 60 * 60 * 24 * 1);
      if (time.endsWith("w")) timeout = gg * (1000 * 60 * 60 * 24 * 7 * 1);
    } else {
      return message.reply("**يرجي كتابه مده صحيحه**");
    }
    message.guild.channels
      .create(`〢⌭・${member.user.username}`)
      .then((channel) => {
        if (db.fetch(`${message.guild.id}_PRIVATES-CATEGORY`))
          channel.setParent(
            client.channels.cache.get(
              `${db.fetch(`${message.guild.id}_PRIVATES-CATEGORY`)}`
            )
          );
        let privateRole = message.guild.roles.cache.get(
          `${db.fetch(`${message.guild.id}_PRIVATES-ROLE`)}`
        );
        if (privateRole) member.roles.add(privateRole);
        channel.permissionOverwrites.edit(message.guild.id, {
          VIEW_CHANNEL: false,
          SEND_MESSAGES: false,
        });
        channel.permissionOverwrites.edit(member.user.id, {
          SEND_MESSAGES: true,
        });
        channel.permissionOverwrites.edit(
          message.guild.roles.cache.get(
            require("../config/config.json").membersRole
          ),
          {
            VIEW_CHANNEL: true,
          }
        );
        let embed = new MessageEmbed()
          .setTitle("**Room Created**")
          .setColor("GOLD")
          .addField(`**Room Owner :**`, `${member.user}`, false)
          .addField(`**Created By :**`, `${message.author}`, false)
          .addField(
            `**Created at :**`,
            `${moment(new Date()).format("**DD/MM/YYYY**")}`
          )
          .addField(`**Time :**`, `**${time}**`, false)
          .setAuthor(member.user.tag, member.user.avatarURL())
          .setThumbnail(member.user.avatarURL())
          .setFooter(message.guild.name, message.guild.iconURL())
          .setTimestamp();

        channel.send({
          content: `**Room Owner:** ${member.user}`,
          embeds: [embed],
        });
        message.react("✅");
        channel.setTopic(
          `\`-\` **Time : ${time}\n\`-\` Created At : ${moment(
            new Date()
          ).format("DD/MM/YYYY")}\n\`-\` Ends At : ${moment(
            Date.now() + timeout
          ).format("DD/MM/YYYY")}**`
        );
        const data = {
          startTimestamp: message.createdTimestamp,
          endTimestamp: Date.now() + timeout,
          channelId: channel.id,
          ownerId: member.user.id,
        };

        if (!db1.has({ key: `ROOMS` })) db1.set({ key: `ROOMS`, value: [] });
        db1.push({ key: `ROOMS`, value: data });
        setTimeout(() => {
          let array = db1.get({ key: `ROOMS` }) || [];
          let v = array.find((g) => g.channelId == channel.id);

          if (!client.channels.cache.get(data.channelId))
            return db1.unpush({ key: "ROOMS", value: v });

          channel.delete();
          member.user
            .send(
              member.user.toString() +
                "" +
                "**لقد انتهت مدة رومك الخاصه للتجديد يرجي التوجه الي <#939822909738848307> **"
            )
            .catch(() => {});
          db1.unpush({ key: "ROOMS", value: v });
        }, data.endTimestamp - Date.now());
      });
  },
};

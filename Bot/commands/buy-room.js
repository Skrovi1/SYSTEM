let object = {};
module.exports = {
  name: "buy-room",
  async execute(message, client, prefix) {
    let privates = require("../../Schemas/privates-schema.js");
    let db = require("quick.db");
    let moment = require("moment");
    let ms = require("ms");
    if (object[message.author.id])
      return message.reply(`**يُرجى اتمام العملية السابقة اولاً.**`);
    let userPrivate = await privates.findOne({
      guildId: message.guild.id,
      ownerId: message.author.id,
    });
    if (userPrivate)
      return message.reply({
        content: `**انت بالفعل لديك روم خاص.**`,
      });
    let owner = "1071263448157126656";
    let probots = ["282859044593598464", "567703512763334685"];
    let price = 1;
    let tax = 1;
    let time = "7d";

    let {
      MessageEmbed,
      MessageActionRow,
      MessageButton,
    } = require("discord.js");
    let embed = new MessageEmbed()
      .setTitle("Private Room")
      .setDescription(
        `لديك 5 دقائق لتحويل مبلغ ${price} إلــى <@!${owner}>\n\`\`\`\nc ${owner} ${price}\n\`\`\``
      )
      .setColor("RED")
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.avatarURL(),
      })
      .setFooter({
        text: message.guild.name,
        iconURL: message.guild.iconURL(),
      })
      .setThumbnail(message.author.avatarURL() || message.guild.iconURL())
      .setTimestamp();
    let button = new MessageButton()
      .setEmoji("❌")
      .setCustomId("cancel")
      .setStyle("SECONDARY")
      .setLabel("Cancel");
    let row = new MessageActionRow().addComponents(button);

    let msg = await message.reply({
      embeds: [embed],
      components: [row],
    });

    object[message.author.id] = true;

    let msgCollector = msg.channel.createMessageCollector({
      filter: (m) => m.author.bot,
      time: 1000 * 60 * 5,
    });
    let buttonCollector = msg.createMessageComponentCollector({
      filter: (i) => i.user.id == message.author.id,
      time: 1000 * 60 * 5,
      componentType: "BUTTON",
    });

    msgCollector.on("end", () => {
      object[message.author.id] = false;
    });

    msgCollector.on("collect", async (m) => {
      if (
        m.content.includes(message.author.username) &&
        m.content.includes(owner.toString()) &&
        probots.includes(m.author.id) &&
        m.content.includes("has transferred") &&
        m.content.includes(`$${tax}`)
      ) {
        msgCollector.stop();
        buttonCollector.stop();

        let privatesCategory = client.channels.cache.get(
          `${db.fetch(`${message.guild.id}_PRIVATES-CATEGORY`)}`
        );

        let privatesRole = message.guild.roles.cache.get(
          `${db.fetch(`${message.guild.id}_PRIVATES-ROLE`)}`
        );
        if (privatesRole) message.member.roles.add(privatesRole);

        let channel = await message.guild.channels.create(
          `〢⌭・${message.author.username}`,
          {
            type: "GUILD_TEXT",
            parent: privatesCategory ? privatesCategory.id : null,
            permissions: [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES", "VIEW_CHANNEL"],
              },
              {
                id: message.guild.roles.cache.find((r) => r.name == ",,").id,
                allow: ["VIEW_CHANNEL"],
              },
              {
                id: message.author.id,
                allow: ["SEND_MESSAGES", "MENTION_EVERYONE"],
              },
            ],
            topic: `**\`-\` Created at : ${moment(new Date()).format(
              "DD/MM/YYYY"
            )}\n\`-\` Ends at : ${moment(
              new Date().getTime() + ms(time)
            ).format("DD/MM/YYYY")}\n\`-\` Time : ${time}**`,
          }
        );

        let channelEmbed = new MessageEmbed()
          .setTitle("ROOM HAS BEEN CREATED")
          .addFields(
            {
              name: `Room Owner :`,
              value: `${message.author}`,
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
            name: message.author.tag,
            iconURL: message.author.avatarURL(),
          })
          .setThumbnail(message.author.avatarURL() || message.guild.iconURL())
          .setFooter({
            text: message.guild.name,
            iconURL: message.guild.iconURL(),
          })
          .setTimestamp();

        channel.send({
          content: `${message.author}`,
          embeds: [channelEmbed],
        });

        message.reply(
          `**تم شراء الروم الخاص بنجاح يرجي قراءة القوانين جيداً ${channel}**`
        );

        let data = await new privates({
          guildId: message.guild.id,
          channelId: channel.id,
          ownerId: message.author.id,
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
      }
    });
    buttonCollector.on("collect", async (i) => {
      if (i.customId == "cancel") {
        msg.delete();
        msgCollector.stop();
        buttonCollector.stop();
      }
    });
  },
};

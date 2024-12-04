let greetings = require("../../Schemas/greeting-schema.js");
module.exports = {
  name: "greetsetup",
  async execute(message, client) {
    let channelId;
    let content;
    let time;

    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    let { MessageEmbed } = require("discord.js");

    let embed0 = new MessageEmbed()
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.avatarURL(),
      })
      .setDescription(
        `**1️⃣ اعداد روم جديد\n2️⃣ إزالة روم تم اعداده\n❌ الغاء العمليه**`
      )
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
      .setTimestamp()
      .setThumbnail(message.guild.iconURL())
      .setColor("RED");

    message.reply({ embeds: [embed0] }).then((msg) => {
      let emojis = ["1️⃣", "2️⃣", "❌"];

      for (let i = 0; i < emojis.length; i++) {
        msg.react(emojis[i]);
      }

      let filter = (reaction, user) =>
        emojis.includes(reaction.emoji.name) && user.id == message.author.id;

      let collector = msg.createReactionCollector({
        filter: filter,
        time: 60_000,
      });

      collector.on("collect", (reaction, user) => {
        let index = emojis.indexOf(reaction.emoji.name);

        if (index == 0) {
          let embed = new MessageEmbed()
            .setAuthor({
              name: message.author.tag,
              iconURL: message.author.avatarURL(),
            })
            .setDescription(`**منشن الروم المراد اعدادها او ضع ايدي**`)
            .setFooter({
              text: message.guild.name,
              iconURL: message.guild.iconURL(),
            })
            .setTimestamp()
            .setThumbnail(message.guild.iconURL())
            .setColor("RED");

          msg.edit({ embeds: [embed] }).then((m) => {
            let filte = (user) => user.author.id == message.author.id;

            let collecto = msg.channel.createMessageCollector({
              filter: filte,
              time: 120_000,
            });

            collecto.on("collect", async (collected) => {
              let channel =
                collected.mentions.channels.first() ||
                client.channels.cache.get(collected.content);
              if (!channel && channel.type !== "GUILD_TEXT") {
                let embed1 = new MessageEmbed()
                  .setAuthor({
                    name: message.author.tag,
                    iconURL: message.author.avatarURL(),
                  })
                  .setDescription(
                    `**لم يتم العثور علي الروم يرجي المحاوله مرة اخري**`
                  )
                  .setFooter({
                    text: message.guild.name,
                    iconURL: message.guild.iconURL(),
                  })
                  .setTimestamp()
                  .setThumbnail(message.guild.iconURL())
                  .setColor("RED");

                msg.edit({ embeds: [embed1] });
                collecto.stop();
                collected.delete();
              } else {
                let embed1 = new MessageEmbed()
                  .setAuthor({
                    name: message.author.tag,
                    iconURL: message.author.avatarURL(),
                  })
                  .setDescription(
                    `**يرجي ارسال الرساله المراد ارسالها عند دخول عضو\n__Values:__\n{userMention} -- منشن العضو الجديد**`
                  )
                  .setFooter({
                    text: message.guild.name,
                    iconURL: message.guild.iconURL(),
                  })
                  .setTimestamp()
                  .setThumbnail(message.guild.iconURL())
                  .setColor("RED");
                let embed8 = new MessageEmbed()
                  .setAuthor({
                    name: message.author.tag,
                    iconURL: message.author.avatarURL(),
                  })
                  .setDescription(
                    `**هذا الروم تم اعداده مسبقا يرجي ازالته واعداده مرة اخري**`
                  )
                  .setFooter({
                    text: message.guild.name,
                    iconURL: message.guild.iconURL(),
                  })
                  .setTimestamp()
                  .setThumbnail(message.guild.iconURL())
                  .setColor("RED");

                collecto.stop();
                collected.delete();
                let hh = await greetings.findOne({
                  guildId: message.guild.id,
                  channelId: channel.id,
                });
                if (hh) return msg.edit({ embeds: [embed8] });
                channelId = channel.id;
                msg.edit({ embeds: [embed1] }).then((ms) => {
                  let collecto1 = msg.channel.createMessageCollector({
                    filter: filte,
                    time: 120_000,
                  });
                  collecto1.on("collect", (col) => {
                    let embed1 = new MessageEmbed()
                      .setAuthor({
                        name: message.author.tag,
                        iconURL: message.author.avatarURL(),
                      })
                      .setDescription(
                        `**يرجي ارسال الوقت الذي سيتم فيه حذف رساله الترحيب\n__اذا اردت الا تكتب وقتا اكتب رقم 0__**`
                      )
                      .setFooter({
                        text: message.guild.name,
                        iconURL: message.guild.iconURL(),
                      })
                      .setTimestamp()
                      .setThumbnail(message.guild.iconURL())
                      .setColor("RED");

                    collecto1.stop();
                    col.delete();
                    content = col.content;
                    msg.edit({ embeds: [embed1] }).then((mss) => {
                      let collecto2 = mss.channel.createMessageCollector({
                        filter: filte,
                        time: 120_000,
                      });
                      collecto2.on("collect", (coo) => {
                        if (isNaN(coo.content)) {
                          let embed1 = new MessageEmbed()
                            .setAuthor({
                              name: message.author.tag,
                              iconURL: message.author.avatarURL(),
                            })
                            .setDescription(`**لم يتم التعرف علي هذا الرقم**`)
                            .setFooter({
                              text: message.guild.name,
                              iconURL: message.guild.iconURL(),
                            })
                            .setTimestamp()
                            .setThumbnail(message.guild.iconURL())
                            .setColor("RED");

                          msg.edit({ embeds: [embed1] });
                          collecto2.stop();
                          coo.delete();
                        } else {
                          let embed1 = new MessageEmbed()
                            .setAuthor({
                              name: message.author.tag,
                              iconURL: message.author.avatarURL(),
                            })
                            .setDescription(
                              `**الروم : <#${channelId}>\nالرساله : ${content}\nالوقت : ${coo.content}**`
                            )
                            .setFooter({
                              text: message.guild.name,
                              iconURL: message.guild.iconURL(),
                            })
                            .setTimestamp()
                            .setThumbnail(message.guild.iconURL())
                            .setColor("RED");

                          time = coo.content;
                          collecto2.stop();
                          coo.delete();
                          msg
                            .edit({
                              content: "**هل انت متأكد من حفظ تلك المعلومات**",
                              embeds: [embed1],
                            })
                            .then((k) => {
                              const emojis1 = ["✅", "❎"];

                              for (let i = 0; i < emojis1.length; i++) {
                                k.react(emojis1[i]);
                              }

                              let filter9 = (reaction, user) =>
                                emojis1.includes(reaction.emoji.name) &&
                                user.id == message.author.id;

                              let cc = k.createReactionCollector({
                                filter: filter9,
                                time: 60_000,
                              });
                              cc.on("collect", (reaction, user) => {
                                const index1 = emojis1.indexOf(
                                  reaction.emoji.name
                                );
                                if (index1 == 0) {
                                  new greetings({
                                    guildId: message.guild.id,
                                    channelId: channelId,
                                    time: time,
                                    msgContent: content,
                                  }).save();
                                  msg.edit({
                                    content: `**تم حفظ تلك البيانات بنجاح**`,
                                  });
                                  k.reactions.removeAll();
                                } else if (index1 == 1) {
                                  msg.delete();
                                  message.channel.send(
                                    `${message.author}, **تم الغاء حفظ البيانات بنجاح**`
                                  );
                                }
                              });
                            });
                        }
                      });
                    });
                  });
                });
              }
            });
          });
          msg.reactions.removeAll();
        } else if (index == 1) {
          msg.reactions.removeAll();
          let embed1 = new MessageEmbed()
            .setAuthor({
              name: message.author.tag,
              iconURL: message.author.avatarURL(),
            })
            .setDescription(`**منشن الروم او ضع الايدي**`)
            .setFooter({
              text: message.guild.name,
              iconURL: message.guild.iconURL(),
            })
            .setTimestamp()
            .setThumbnail(message.guild.iconURL())
            .setColor("RED");
          let embed2 = new MessageEmbed()
            .setAuthor({
              name: message.author.tag,
              iconURL: message.author.avatarURL(),
            })
            .setDescription(`**هذا الروم لم يتم اعداده مسبقا**`)
            .setFooter({
              text: message.guild.name,
              iconURL: message.guild.iconURL(),
            })
            .setTimestamp()
            .setThumbnail(message.guild.iconURL())
            .setColor("RED");
          msg.edit({ embeds: [embed1] });
          const g = msg.channel.createMessageCollector({
            filter: (user) => user.author.id == message.author.id,
            time: 120_000,
          });
          g.on("collect", async (mmm) => {
            let ch =
              mmm.mentions.channels.first() ||
              client.channels.cache.get(mmm.content);
            if (!ch) return msg.edit({ embeds: [embed2] });
            let hh = await greetings.findOne({
              guildId: message.guild.id,
              channelId: ch.id,
            });
            if (!hh) return msg.edit({ embeds: [embed2] });
            let data = await greetings.findOne({
              guildId: message.guild.id,
              channelId: ch.id,
            });
            let embed3 = new MessageEmbed()
              .setAuthor({
                name: message.author.tag,
                iconURL: message.author.avatarURL(),
              })
              .setDescription(`**تم ازالة الترحيب في هذا الروم ${ch} بنجاح**`)
              .setFooter({
                text: message.guild.name,
                iconURL: message.guild.iconURL(),
              })
              .setTimestamp()
              .setThumbnail(message.guild.iconURL())
              .setColor("RED");
            data.delete();
            msg.edit({ embeds: [embed3] });
            g.stop();
          });
        } else {
          msg.delete();
        }
      });
    });
  },
};

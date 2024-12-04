const data = {};
module.exports = {
  name: "special-order",
  execute(message, client) {
    let db = require("quick.db");
    let channelIdHere = db.fetch(
      `${message.guild.id}_SPECIAL_ORDERS_SEND(here)`
    );
    let channelHere = client.channels.cache.get(`${channelIdHere}`);
    if (!channelHere)
      return message.reply("**لم يتم العثور علي روم الطلبات المميزة**");
    let channelIdEveryone = db.fetch(
      `${message.guild.id}_SPECIAL_ORDERS_SEND(everyone)`
    );
    let channelEveryone = client.channels.cache.get(`${channelIdEveryone}`);
    if (!channelEveryone)
      return message.reply("**لم يتم العثور علي روم الطلبات المميزة**");
    let shopStatus = db.get(`${message.guild.id}_SHOP_STATUS`) || `open`;
    if (shopStatus == `close`)
      return message.reply({
        content: `**النشر مغلق الان يرجي الانتظار حتي يتم فتح النشر**`,
      });
    let args = message.content.split(" ").slice(1).join(" ");
    if (!args) return message.reply({ content: `**يرجي كتابه طلبك**` });
    let herePrice = "30000";
    let hereTax = "28500";
    let everyonePrice = "50000";
    let everyoneTax = "47500";
    let owner = "862891032760025088";
    let probots = ["567703512763334685", "282859044593598464"];

    let { MessageEmbed } = require("discord.js");
    let embed = new MessageEmbed()
      .setTitle("Special Orders")
      .setDescription(
        `**1️⃣ - Order with mention @here\n\`Price : ${herePrice}\n\`\n2️⃣ - Order with mention @everyone\n\`Price : ${everyonePrice}\`**`
      )
      .setColor("DARK_BLUE")
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.avatarURL(),
      })
      .setTimestamp();

    if (data[`${message.author.id}_PROCESS`] == true)
      return message.reply(
        `**❌ | لديك عمليه شراء بالفعل يرجي الانتظار حتي يتم الغاء العمليه السابقه**`
      );

    data[`${message.author.id}_PROCESS`] = true;
    message.reply({ embeds: [embed] }).then(async (msg) => {
      let emojis = ["1️⃣", "2️⃣", "❌"];

      for (let i = 0; i < emojis.length; i++) {
        await msg.react(emojis[i]);
      }

      let filter = (reaction, user) =>
        emojis.includes(reaction.emoji.name) && user.id == message.author.id;
      let collector = msg.createReactionCollector({
        filter: filter,
        time: 120000,
      });
      let collector1 = msg.createReactionCollector({
        filter: (reaction, user) =>
          emojis.includes(reaction.emoji.name) && !user.bot,
      });

      collector.on("collect", (reaction, user) => {
        let index = emojis.indexOf(reaction.emoji.name);
        if (index == 0) {
          msg.reactions.removeAll();
          let embed1 = new MessageEmbed().setDescription(
            `**يرجي تحويل مبلغ \`${herePrice}\` الـي <@!${owner}>\n\`\`\`\nC ${owner} ${herePrice}\n\`\`\`\n\`-\` سيتم الغاء عمليه الشراء خلال دقيقتين من عدم تحويل المبلغ المحدد\n\n\`-\` لالغاء عمليه شراء الطلب ارسل كلمه \`cancel\`**`
          );
          msg.edit({ embeds: [embed1] }).then((mm) => {
            let filter = (user) => user;
            let mCollector = msg.channel.createMessageCollector({
              filter: filter,
              time: 120000,
            });
            mCollector.on("collect", (m) => {
              if (m.content.toLowerCase() == "cancel") {
                if (message.author.id !== m.author.id) return;
                mCollector.stop();
                message.channel.send(
                  `${message.author}` +
                    `**, :x: | تم الغاء عمليه الشراء بنجاح**`
                );
                msg.delete();
                m.delete();
                delete data[`${message.author.id}_PROCESS`];
              } else if (
                m.content.includes(message.author.username) &&
                m.content.includes(owner.toString()) &&
                probots.includes(m.author.id) &&
                m.content.includes("has transferred") &&
                m.content.includes(`$${hereTax}`)
              ) {
                message.channel.send(
                  `${message.author}` + `**, ✅ | تم ارسال طلبك بنجاح**`
                );
                channelHere
                  .send(`**${args}\n\nتواصل مع : ${message.author}\n@here**`)
                  .then((k) =>
                    k.channel.send({
                      files: [
                        `https://media.discordapp.net/attachments/902642628699500594/905438080553615360/Line.gif`,
                      ],
                    })
                  );
                delete data[`${message.author.id}_PROCESS`];
                mCollector.stop();
                msg.delete();
              }
            });
          });
        } else if (index === 1) {
          msg.reactions.removeAll();
          let embed1 = new MessageEmbed().setDescription(
            `**يرجي تحويل مبلغ \`${everyonePrice}\` الـي <@!${owner}>\n\`\`\`\nC ${owner} ${everyonePrice}\n\`\`\`\n\`-\` سيتم الغاء عمليه الشراء خلال دقيقتين من عدم تحويل المبلغ المحدد\n\n\`-\` لالغاء عمليه شراء الطلب ارسل كلمه \`cancel\`**`
          );
          msg.edit({ embeds: [embed1] }).then((mm) => {
            let filter = (user) => user;
            let mCollector = msg.channel.createMessageCollector({
              filter: filter,
              time: 120000,
            });
            mCollector.on("collect", (m) => {
              if (m.content.toLowerCase() == "cancel") {
                if (message.author.id !== m.author.id) return;
                mCollector.stop();
                delete data[`${message.author.id}_PROCESS`];
                message.channel.send(
                  `${message.author}` +
                    `**, :x: | تم الغاء عمليه الشراء بنجاح**`
                );
                msg.delete();
                m.delete();
              } else if (
                m.content.includes(message.author.username) &&
                m.content.includes(owner.toString()) &&
                probots.includes(m.author.id) &&
                m.content.includes("has transferred") &&
                m.content.includes(`$${everyoneTax}`)
              ) {
                message.channel.send(
                  `${message.author}` + `**, ✅ | تم ارسال طلبك بنجاح**`
                );
                channelEveryone
                  .send(
                    `**${args}\n\nتواصل مع : ${message.author}\n@everyone**`
                  )
                  .then((k) =>
                    k.channel.send({
                      files: [
                        `https://media.discordapp.net/attachments/902642628699500594/905438080553615360/Line.gif`,
                      ],
                    })
                  );
                delete data[`${message.author.id}_PROCESS`];
                mCollector.stop();
                msg.delete();
              }
            });
          });
        } else if (index === 2) {
          delete data[`${message.author.id}_PROCESS`];
          message.channel.send(
            `${message.author}` + `**, :x: | تم الغاء عمليه الشراء بنجاح**`
          );
          msg.delete();
        } else if (index == 2) {
          collector.stop();
          delete data[`${message.author.id}_PROCESS`];
          message.channel.send(
            `${message.author}` + `**, :x: | تم الغاء عمليه الشراء بنجاح**`
          );
          msg.delete();
        }
      });
      collector.on("end", () => {
        delete data[`${message.author.id}_PROCESS`];
      });
    });
  },
};

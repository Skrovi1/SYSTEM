let data = {};
module.exports = {
  name: "buy",
  execute(message, client) {
    let legendsPrice = "1";
    let legendsId = `1115558679790506004`;
    let legendsTax = "2";

    let overpowerPrice = "150000";
    let overpowerId = `972941060957409314`;
    let overpowerTax = "142500";

    let angelPrice = "80000";
    let angelId = `972941060928073767`;
    let angelTax = "76000";

    let specialPrice = "65000";
    let specialId = `972941060928073765`;
    let specialTax = "61750";

    let excellentPrice = "50000";
    let excellentId = `972941060928073764`;
    let excellentTax = "47500";

    let normalPrice = "40000";
    let normalId = `972941060928073763`;
    let normalTax = "38000";

    let designerPrice = "30000";
    let designerId = `972941060928073762`;
    let desingerTax = "28500";

    let sellersId = `1136648583261720578`;
    let owner = "1043175272897318982";
    let probots = ["567703512763334685", "282859044593598464"];

    if (data[`${message.author.id}_PROCESS`] == true)
      return message.reply(
        `**❌ | لديك عمليه شراء بالفعل يرجي الانتظار حتي يتم الغاء العمليه السابقه**`
      );
    let { MessageEmbed } = require("discord.js");
    let embed = new MessageEmbed()
      .setThumbnail(message.guild.iconURL())
      .setColor("DARK_BLUE")
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.avatarURL(),
      })
      .setFooter({
        text: `لديك دقيقتين لاختيار الرتبه المراد شرائها`,
        iconURL: message.guild.iconURL(),
      })
      .setDescription(
        `**1️⃣ - <@&${legendsId}>\n\`Price : ${legendsPrice}\`**\n2️⃣ - <@&${overpowerId}>\n\`Price : ${overpowerPrice}\`\n3️⃣ - <@&${angelId}>\n\`Price : ${angelPrice}\`\n4️⃣ - <@&${specialId}>\n\`Price : ${specialPrice}\`\n5️⃣ - <@&${excellentId}>\n\`Price : ${excellentPrice}\`\n6️⃣ - <@&${normalId}>\n\`Price : ${normalPrice}\`\n7️⃣ - <@&${designerId}>\n\`Price : ${designerPrice}\``
      );

    data[`${message.author.id}_PROCESS`] = true;
    message.reply({ embeds: [embed] }).then(async (msg) => {
      let emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "❌"];
      await emojis.forEach(async (g) => await msg.react(g));

      const filter = (reaction, user) =>
        emojis.includes(reaction.emoji.name) && user.id == message.author.id;
      const collector = await msg.createReactionCollector({
        filter: filter,
        time: 120000,
      });
      const collector1 = await msg.createReactionCollector({
        filter: (reaction, user) =>
          emojis.includes(reaction.emoji.name) && !user.bot,
      });

      collector.on("collect", (reaction, user) => {
        const index = emojis.indexOf(reaction.emoji.name);
        if (index == 0) {
          let ee = new MessageEmbed().setDescription(
            `**يرجي تحويل مبلغ \`${legendsPrice}\` الـي <@!${owner}>\n\`\`\`\nC ${owner} ${legendsPrice}\n\`\`\`\n\`-\` سيتم الغاء عمليه الشراء خلال دقيقتين من عدم تحويل المبلغ المحدد\n\n\`-\` لالغاء عمليه شراء الرتبة ارسل كلمه \`cancel\`**`
          );
          msg.edit({ embeds: [ee] });
          msg.reactions.removeAll();
          let mCollector = msg.channel.createMessageCollector({
            filter: (user) => user,
            time: 120000,
          });
          mCollector.on("collect", (mm) => {
            if (mm.content == "cancel") {
              if (message.author.id !== mm.author.id) return;
              mCollector.stop();
              delete data[`${message.author.id}_PROCESS`];
              message.channel.send(
                `${message.author}` + `, **:x: | تم الغاء عمليه الشراء بنجاح**`
              );
              mm.delete().catch((err) => console.log(err));
              msg.delete();
            } else if (
              mm.content.includes(message.author.username) &&
              mm.content.includes(owner.toString()) &&
              probots.includes(mm.author.id) &&
              mm.content.includes("has transferred") &&
              mm.content.includes(`$${legendsTax}`)
            ) {
              message.channel.send(
                `${message.author}` + ", **✅ | تم شراء الرتبه بنجاح**"
              );
              mCollector.stop();
              msg.delete();
              delete data[`${message.author.id}_PROCESS`];
              let sellers = message.guild.roles.cache.get(`${sellersId}`);
              let legends = message.guild.roles.cache.get(`${legendsId}`);

              message.member.roles.add(sellers);
              message.member.roles.add(legends);
            }
          });
        } else if (index == 1) {
          let ee = new MessageEmbed().setDescription(
            `**يرجي تحويل مبلغ \`${overpowerPrice}\` الـي <@!${owner}>\n\`\`\`\nC ${owner} ${overpowerPrice}\n\`\`\`\n\`-\` سيتم الغاء عمليه الشراء خلال دقيقتين من عدم تحويل المبلغ المحدد\n\n\`-\` لالغاء عمليه شراء الرتبة ارسل كلمه \`cancel\`**`
          );
          msg.edit({ embeds: [ee] });
          msg.reactions.removeAll();
          let mCollector = msg.channel.createMessageCollector({
            filter: (user) => user,
            time: 120000,
          });
          mCollector.on("collect", (mm) => {
            if (mm.content == "cancel") {
              if (message.author.id !== mm.author.id) return;
              mCollector.stop();
              delete data[`${message.author.id}_PROCESS`];
              message.channel.send(
                `${message.author}` + `, **:x: | تم الغاء عمليه الشراء بنجاح**`
              );
              mm.delete().catch((err) => console.log(err));
              msg.delete();
            } else if (
              mm.content.includes(message.author.username) &&
              mm.content.includes(owner.toString()) &&
              probots.includes(mm.author.id) &&
              mm.content.includes("has transferred") &&
              mm.content.includes(`$${overpowerTax}`)
            ) {
              message.channel.send(
                `${message.author}` + ", **✅ | تم شراء الرتبه بنجاح**"
              );
              mCollector.stop();
              delete data[`${message.author.id}_PROCESS`];
              msg.delete();
              let sellers = message.guild.roles.cache.get(`${sellersId}`);
              let overpower = message.guild.roles.cache.get(`${overpowerId}`);

              message.member.roles.add(sellers);
              message.member.roles.add(overpower);
            }
          });
        } else if (index == 2) {
          let ee = new MessageEmbed().setDescription(
            `**يرجي تحويل مبلغ \`${angelPrice}\` الـي <@!${owner}>\n\`\`\`\nC ${owner} ${angelPrice}\n\`\`\`\n\`-\` سيتم الغاء عمليه الشراء خلال دقيقتين من عدم تحويل المبلغ المحدد\n\n\`-\` لالغاء عمليه شراء الرتبة ارسل كلمه \`cancel\`**`
          );
          msg.edit({ embeds: [ee] });
          msg.reactions.removeAll();
          let mCollector = msg.channel.createMessageCollector({
            filter: (user) => user,
            time: 120000,
          });
          mCollector.on("collect", (mm) => {
            if (mm.content == "cancel") {
              if (message.author.id !== mm.author.id) return;
              mCollector.stop();
              delete data[`${message.author.id}_PROCESS`];
              message.channel.send(
                `${message.author}` + `, **:x: | تم الغاء عمليه الشراء بنجاح**`
              );
              mm.delete().catch((err) => console.log(err));
              msg.delete();
            } else if (
              mm.content.includes(message.author.username) &&
              mm.content.includes(owner.toString()) &&
              probots.includes(mm.author.id) &&
              mm.content.includes("has transferred") &&
              mm.content.includes(`$${angelTax}`)
            ) {
              message.channel.send(
                `${message.author}` + ", **✅ | تم شراء الرتبه بنجاح**"
              );
              mCollector.stop();
              delete data[`${message.author.id}_PROCESS`];
              msg.delete();
              let sellers = message.guild.roles.cache.get(`${sellersId}`);
              let angel = message.guild.roles.cache.get(`${angelId}`);

              message.member.roles.add(sellers);
              message.member.roles.add(angel);
            }
          });
        } else if (index == 3) {
          let ee = new MessageEmbed().setDescription(
            `**يرجي تحويل مبلغ \`${specialPrice}\` الـي <@!${owner}>\n\`\`\`\nC ${owner} ${specialPrice}\n\`\`\`\n\`-\` سيتم الغاء عمليه الشراء خلال دقيقتين من عدم تحويل المبلغ المحدد\n\n\`-\` لالغاء عمليه شراء الرتبة ارسل كلمه \`cancel\`**`
          );
          msg.edit({ embeds: [ee] });
          msg.reactions.removeAll();
          let mCollector = msg.channel.createMessageCollector({
            filter: (user) => user,
            time: 120000,
          });
          mCollector.on("collect", (mm) => {
            if (mm.content == "cancel") {
              if (message.author.id !== mm.author.id) return;
              mCollector.stop();
              delete data[`${message.author.id}_PROCESS`];
              message.channel.send(
                `${message.author}` + `, **:x: | تم الغاء عمليه الشراء بنجاح**`
              );
              mm.delete().catch((err) => console.log(err));
              msg.delete();
            } else if (
              mm.content.includes(message.author.username) &&
              mm.content.includes(owner.toString()) &&
              probots.includes(mm.author.id) &&
              mm.content.includes("has transferred") &&
              mm.content.includes(`$${specialTax}`)
            ) {
              message.channel.send(
                `${message.author}` + ", **✅ | تم شراء الرتبه بنجاح**"
              );
              mCollector.stop();
              delete data[`${message.author.id}_PROCESS`];
              msg.delete();
              let sellers = message.guild.roles.cache.get(`${sellersId}`);
              let special = message.guild.roles.cache.get(`${specialId}`);

              message.member.roles.add(sellers);
              message.member.roles.add(special);
            }
          });
        } else if (index == 4) {
          let ee = new MessageEmbed().setDescription(
            `**يرجي تحويل مبلغ \`${excellentPrice}\` الـي <@!${owner}>\n\`\`\`\nC ${owner} ${excellentPrice}\n\`\`\`\n\`-\` سيتم الغاء عمليه الشراء خلال دقيقتين من عدم تحويل المبلغ المحدد\n\n\`-\` لالغاء عمليه شراء الرتبة ارسل كلمه \`cancel\`**`
          );
          msg.edit({ embeds: [ee] });
          msg.reactions.removeAll();
          let mCollector = msg.channel.createMessageCollector({
            filter: (user) => user,
            time: 120000,
          });
          mCollector.on("collect", (mm) => {
            if (mm.content == "cancel") {
              if (message.author.id !== mm.author.id) return;
              mCollector.stop();
              delete data[`${message.author.id}_PROCESS`];
              message.channel.send(
                `${message.author}` + `, **:x: | تم الغاء عمليه الشراء بنجاح**`
              );
              mm.delete().catch((err) => console.log(err));
              msg.delete();
            } else if (
              mm.content.includes(message.author.username) &&
              mm.content.includes(owner.toString()) &&
              probots.includes(mm.author.id) &&
              mm.content.includes("has transferred") &&
              mm.content.includes(`$${excellentTax}`)
            ) {
              message.channel.send(
                `${message.author}` + ", **✅ | تم شراء الرتبه بنجاح**"
              );
              mCollector.stop();
              delete data[`${message.author.id}_PROCESS`];
              msg.delete();
              let sellers = message.guild.roles.cache.get(`${sellersId}`);
              let excellent = message.guild.roles.cache.get(`${excellentId}`);

              message.member.roles.add(sellers);
              message.member.roles.add(excellent);
            }
          });
        } else if (index == 5) {
          let ee = new MessageEmbed().setDescription(
            `**يرجي تحويل مبلغ \`${normalPrice}\` الـي <@!${owner}>\n\`\`\`\nC ${owner} ${normalPrice}\n\`\`\`\n\`-\` سيتم الغاء عمليه الشراء خلال دقيقتين من عدم تحويل المبلغ المحدد\n\n\`-\` لالغاء عمليه شراء الرتبة ارسل كلمه \`cancel\`**`
          );
          msg.edit({ embeds: [ee] });
          msg.reactions.removeAll();
          let mCollector = msg.channel.createMessageCollector({
            filter: (user) => user,
            time: 120000,
          });
          mCollector.on("collect", (mm) => {
            if (mm.content == "cancel") {
              if (message.author.id !== mm.author.id) return;
              mCollector.stop();
              delete data[`${message.author.id}_PROCESS`];
              message.channel.send(
                `${message.author}` + `, **:x: | تم الغاء عمليه الشراء بنجاح**`
              );
              mm.delete().catch((err) => console.log(err));
              msg.delete();
            } else if (
              mm.content.includes(message.author.username) &&
              mm.content.includes(owner.toString()) &&
              probots.includes(mm.author.id) &&
              mm.content.includes("has transferred") &&
              mm.content.includes(`$${normalTax}`)
            ) {
              message.channel.send(
                `${message.author}` + ", **✅ | تم شراء الرتبه بنجاح**"
              );
              mCollector.stop();
              delete data[`${message.author.id}_PROCESS`];
              msg.delete();
              let sellers = message.guild.roles.cache.get(`${sellersId}`);
              let normal = message.guild.roles.cache.get(`${normalId}`);

              message.member.roles.add(sellers);
              message.member.roles.add(normal);
            }
          });
        } else if (index == 6) {
          let ee = new MessageEmbed().setDescription(
            `**يرجي تحويل مبلغ \`${designerPrice}\` الـي <@!${owner}>\n\`\`\`\nC ${owner} ${designerPrice}\n\`\`\`\n\`-\` سيتم الغاء عمليه الشراء خلال دقيقتين من عدم تحويل المبلغ المحدد\n\n\`-\` لالغاء عمليه شراء الرتبة ارسل كلمه \`cancel\`**`
          );
          msg.edit({ embeds: [ee] });
          msg.reactions.removeAll();
          let mCollector = msg.channel.createMessageCollector({
            filter: (user) => user,
            time: 120000,
          });
          mCollector.on("collect", (mm) => {
            if (mm.content == "cancel") {
              if (message.author.id !== mm.author.id) return;
              mCollector.stop();
              delete data[`${message.author.id}_PROCESS`];
              message.channel.send(
                `${message.author}` + `, **:x: | تم الغاء عمليه الشراء بنجاح**`
              );
              mm.delete().catch((err) => console.log(err));
              msg.delete();
            } else if (
              mm.content.includes(message.author.username) &&
              mm.content.includes(owner.toString()) &&
              probots.includes(mm.author.id) &&
              mm.content.includes("has transferred") &&
              mm.content.includes(`$${desingerTax}`)
            ) {
              message.channel.send(
                `${message.author}` + ", **✅ | تم شراء الرتبه بنجاح**"
              );
              mCollector.stop();
              delete data[`${message.author.id}_PROCESS`];
              msg.delete();
              let designer = message.guild.roles.cache.get(`${designerId}`);
              let sellers = message.guild.roles.cache.get(`${sellersId}`);

              message.member.roles.add(sellers);
              message.member.roles.add(designer);
            }
          });
        } else if (index == 7) {
          delete data[`${message.author.id}_PROCESS`];
          message.channel.send(
            `${message.author}` + `, **:x: | تم الغاء عمليه الشراء بنجاح**`
          );
          msg.delete();
        }
      });

      collector1.on("collect", (reaction, user) => {
        reaction.users.remove(user.id);
      });
    });

    setTimeout(() => {
      delete data[`${message.author.id}_PROCESS`];
    }, 120000);
  },
};

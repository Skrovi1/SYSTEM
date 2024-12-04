let fs = require("fs");
let ordersInfo = JSON.parse(fs.readFileSync("./Database/ordersInfo.json"));
module.exports = (client) => {
  client.on("messageCreate", (message) => {
    const db = require("quick.db");
    let on_off = `on`;
    if (`off` == on_off) return;
    if (message.channel.type !== "GUILD_TEXT") return;
    const { MessageEmbed, WebhookClient } = require("discord.js");
    const webhookUrl = require("../config/config.json").webhookOrderUrl;
    const orderRole = db.fetch(`${message.guild.id}_ORDER-ROLE`);
    const orderRecieve = db.fetch(`${message.guild.id}_ORDER-RECIEVE-ROOM`);
    const orderSend = db.fetch(`${message.guild.id}_ORDER-SEND-ROOM`);
    const ordersLog = db.fetch(`${message.guild.id}_ORDERS-LOG`);

    if (
      !orderSend ||
      !orderRole ||
      !orderRecieve ||
      message.author.bot ||
      message.channel.type !== "GUILD_TEXT" ||
      !message.guild
    )
      return;

    if (message.channel.id == orderRecieve) {
      let number = ordersInfo[`${message.guild.id}_ORDERS_NUMBER`] || 0;
      number++;
      ordersInfo[`${message.guild.id}_ORDERS_NUMBER`] = number;
      fs.writeFileSync(
        "./Database/ordersInfo.json",
        JSON.stringify(ordersInfo, null, 2)
      );

      let embed = new MessageEmbed()
        .setAuthor(`ID: ${message.author.id}`, message.author.avatarURL())
        .setDescription(`**Order Number : ${number}**`)
        .addField(`New Order :`, `\`\`\`\n${message.content}\n\`\`\``)
        .setThumbnail(`${message.author.avatarURL()}`)
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp()
        .setColor("BLUE");

      message.channel
        .send(`**تم ارسال طلبك الي البائعين بنجاح ${message.author}**`)
        .then((msg) => {
          setTimeout(() => {
            if (!msg) return;
            try {
              msg.delete().catch(() => {});
            } catch {}
          }, 5000);
        });
      if (!message) return;
      try {
        message.delete().catch(() => {});
      } catch (err) {
        console.log(err);
      }
      const channelSend = message.guild.channels.cache.get(`${orderSend}`);
      if (!channelSend) return;
      channelSend
        .send({
          content: `**To: <@&${orderRole}>\nFrom: ${message.author.toString()}**`,
          embeds: [embed],
        })
        .then((msg) =>
          msg.channel.send({
            files: [
              "https://cdn.discordapp.com/attachments/946758208322670643/1051856192252674099/LINE-1.png",
            ],
          })
        );

      const logSend = message.guild.channels.cache.get(`${ordersLog}`);
      if (!logSend) return;
      logSend
        .send({
          content: `**From: ${message.author.toString()}**`,
          embeds: [embed],
        })
        .then((msg) =>
          msg.channel.send({
            files: [
              "https://cdn.discordapp.com/attachments/946758208322670643/1051856192252674099/LINE-1.png",
            ],
          })
        );
    }
  });
};

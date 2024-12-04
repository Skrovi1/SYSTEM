const db = require("quick.db");
const Discord = require("discord.js");
const Database = require("st.db");
const db1 = new Database("./Database/database.json");

module.exports = {
  name: "antibots",
  aliases: ["بوتات"],
  description: "Enable/Disable antibots protection",
  execute(message, client, prefix) {
    let command = message.content.split(" ")[0].slice(prefix.length);
    if (!db1.get({ key: `${message.guild.id}_CONTROLUSERS` })) {
      db1.set({
        key: `${message.guild.id}_CONTROLUSERS`,
        value: [],
      });
    }
    n = "بوتات";
    if (
      !db1
        .get({ key: `${message.guild.id}_CONTROLUSERS` })
        .includes(message.author.id) &&
      message.author.id !== message.guild.ownerId
    )
      return;
    if (
      (command == "antibots" &&
        ["on"].includes(message.content.split(" ")[1])) ||
      (command == n && ["منع"].includes(message.content.split(" ")[1]))
    ) {
      let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setThumbnail(message.guild.iconURL())
        .setDescription(
          `> **Action : **Turn On Antibots System
> **By :** ${message.author}
> **Date :** ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}`
        )
        .setColor("RED")
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp();

      db.set(`ANTIBOTS_${message.guild.id}`, "true");

      message.react("✅");

      const hh1 = db.get(`${message.guild.id}_PROTECTIONLOG`);
      const channel = client.channels.cache.get(`${hh1}`);
      if (!channel) return;
      channel.send({ embeds: [embed] }).catch(() => {});
    } else if (
      (command == "antibots" &&
        ["off"].includes(message.content.split(" ")[1])) ||
      (command == n && ["سماح"].includes(message.content.split(" ")[1]))
    ) {
      let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setThumbnail(message.guild.iconURL())
        .setDescription(
          `> **Action : **Turn Off Antibots System
> **By :** ${message.author}
> **Date :** ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}`
        )
        .setColor("RED")
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp();

      db.set(`ANTIBOTS_${message.guild.id}`, "false");

      message.react("✅");

      const hh = db.get(`${message.guild.id}_PROTECTIONLOG`);
      const channel = client.channels.cache.get(`${hh}`);
      if (!channel) return;
      channel.send({ embeds: [embed] }).catch(() => {});
    }
  },
};

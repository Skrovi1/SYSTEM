require("discord-reply");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const Database = require("st.db");
const db1 = new Database("./Database/database.json");
module.exports = {
  name: "config",
  description: "Show protection configuration",
  async execute(message, client) {
    if (!db1.get({ key: `${message.guild.id}_CONTROLUSERS` })) {
      db1.set({
        key: `${message.guild.id}_CONTROLUSERS`,
        value: [],
      });
    }
    if (
      !db1
        .get({ key: `${message.guild.id}_CONTROLUSERS` })
        .includes(message.author.id) &&
      message.author.id !== message.guild.ownerId
    )
      return message.reply({
        content: "**❌ Only Ownership And Control Users Can Use This Command**",
      });

    let rolesDeleteLimit = db.get(`ROLES-DELETE-LIMIT_${message.guild.id}`);
    if (!rolesDeleteLimit) rolesDeleteLimit = 1;

    let rolesUpdateLimit = db.get(`ROLES-EDIT-LIMIT_${message.guild.id}`);
    if (!rolesUpdateLimit) rolesUpdateLimit = 1;

    let rolesCreateLimit = db.get(`ROLES-CREATE-LIMIT_${message.guild.id}`);
    if (!rolesCreateLimit) rolesCreateLimit = 1;

    let channelsDeleteLimit = db.get(
      `CHANNELS-DELETE-LIMIT_${message.guild.id}`
    );
    if (!channelsDeleteLimit) channelsDeleteLimit = 1;

    let channelsUpdateLimit = db.get(`CHANNELS-EDIT-LIMIT_${message.guild.id}`);
    if (!channelsUpdateLimit) channelsUpdateLimit = 1;

    let channelsCreateLimit = db.get(
      `CHANNELS-CREATE-LIMIT_${message.guild.id}`
    );
    if (!channelsCreateLimit) channelsCreateLimit = 1;

    let bansLimit = db.get(`BANS-LIMIT_${message.guild.id}`);
    if (!bansLimit) bansLimit = 1;

    let kicksLimit = db.get(`KICKS-LIMIT_${message.guild.id}`);
    if (!kicksLimit) kicksLimit = 1;

    let protectionLog =
      `<#` + db.get(`${message.guild.id}_PROTECTIONLOG`) + `>`;
    if (protectionLog == "<#null>") protectionLog = null;

    let embed = new MessageEmbed()
      .setTitle("Protection Configuration")
      .setAuthor(client.user.tag, client.user.avatarURL())
      .setThumbnail(client.user.avatarURL())
      .setFooter(
        `Requested By: ${message.author.username}`,
        message.author.avatarURL()
      )
      .setColor("GREEN")
      .setDescription(
        `> **Roles Create Limit :** \`${rolesCreateLimit}\`\n> **Role Delete Limit :** \`${rolesDeleteLimit}\`\n> **Roles Edit Limit :** \`${rolesUpdateLimit}\`\n> **Channels Create Limit :** \`${channelsCreateLimit}\`\n> **Channels Delete Limit :**  \`${channelsDeleteLimit}\`\n> **Channels Edit Limit :** \`${channelsUpdateLimit}\`\n> **Kicks Limit :** \`${kicksLimit}\`\n> **Bans Limit :** \`${bansLimit}\`\n> **Protection Log :** ${
          protectionLog === null ? `\`null\`` : protectionLog
        }`
      );
    message.reply({ content: ` `, embeds: [embed], ephemeral: false });
  },
};

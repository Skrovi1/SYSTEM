const Database = require("st.db");
const db1 = new Database("./Database/permissions.json");
const db2 = new Database("./Database/database.json");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "restore",
  description: "restore roles permissions",
  execute(message, client) {
    let args = message.content.split(" ").slice(1).join(" ");
    if (!args) return message.reply(`**❌ Type the restore code**`);
    let restoreCode = db2.get({ key: `${message.guild.id}_RESTORECODE` });
    message.react("🔄");
    setTimeout(() => {
      if (restoreCode !== args) {
        message.reactions.removeAll();
        message.react("❎");
      } else {
        message.guild.roles.cache
          .filter((ro) => ro.name !== "@everyone")
          .forEach((role) => {
            let perms = db1.get({
              key: `${message.guild.id}_${role.id}_PERMS`,
            });
            if (!perms) return;
            role.setPermissions(perms).catch(() => {});
            db1.delete({
              key: `${message.guild.id}_${role.id}_PERMS`,
            });
          });
        db2.delete({ key: `${message.guild.id}_RESTORECODE` });
        let embed = new MessageEmbed()
          .setTitle("**Premissions Restored**")
          .setDescription(
            `**Protection System\nBy : ${
              message.author
            }\nAction : Restored Premissions\nDate On : ${require("moment")(
              new Date()
            ).format("DD/MM/YYYY hh:mm")}**`
          )
          .setColor("GREEN")
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setAuthor(
            `${message.author.tag}`,
            `${message.author.displayAvatarURL({ dynamic: true })}`
          )
          .setFooter(
            message.guild.name,
            message.guild.iconURL({ dynamic: true })
          )
          .setTimestamp();
        message.reactions.removeAll();
        message.react("✅");
        const hh = db.get(`${message.guild.id}_PROTECTIONLOG`);
        const channel = client.channels.cache.get(`${hh}`);
        if (!channel) return;
        channel.send({ embeds: [embed] }).catch(() => {});
      }
    }, 1500);
  },
};

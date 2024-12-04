module.exports = {
  name: "role-info",
  execute(message, client) {
    if (!message.member.permissions.has("MANAGE_ROLES")) return;
    const args = message.content.split(" ");
    if (!args[1])
      return message.reply("**❌ Mention role you want to get info on it**");
    const role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args[1]) ||
      message.guild.roles.cache.find((ro) => ro.name == args[1]);
    if (!role) return message.reply("**❌ Cannot find this role**");
    const Discord = require("discord.js");
    let embed = new Discord.MessageEmbed()
      .setTitle("**ROLE INFO**")
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(
        `**Role Name : \`${role.name}\`\nRole ID : \`${role.id}\`\nMembers Count : \`${role.members.size}\`\nRole Color : \`${role.hexColor}\`**`
      )
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp()
      .setColor(role.hexColor || "BLACK")
      .setThumbnail(message.author.avatarURL());

    message.reply({ embeds: [embed] });
  },
};

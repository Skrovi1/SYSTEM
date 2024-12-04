module.exports = {
  name: "role",
  disabled: true,
  execute(message, client) {
    let args = message.content.split(" ");
    const prefix =
      require("quick.db").fetch(`${message.guild.id}_PREFIX`) ||
      require("../config/config.json").prefix;
    let { MessageEmbed } = require("discord.js");
    let error = new MessageEmbed()
      .addField(`**Command: role**`, `Add/remove a role(s) for a user.`)
      .addField(
        `**Usage:**`,
        `${prefix}role [user] (+,-)[roles name separated by comma]\n${prefix}role [user] (+,-)[role name]`
      )
      .addField(
        `**Example:**`,
        `${prefix}role ${message.author} Admin,Mod\n${prefix}role ${message.author} Admin`
      );
    if (!args[1]) return message.reply({ embeds: [error] });
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    if (!member)
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(`**🙄 - Connot find this member.**`)
            .setColor("RED"),
        ],
      });
    if (!args.slice(2).join(" ").includes(",")) {
      const role = message.guild.roles.cache.find(
        (ro) =>
          ro.name.startsWith(args.slice(2).join(" ")) ||
          ro.id === args.slice(2).join(" ")
      );
      if (!role)
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(`**🙄 - Connot find this role.**`)
              .setColor("RED"),
          ],
        });
      if (role.position >= message.member.roles.highest.position)
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(
                `**🙄 - ${role.name}'s position is higher than you.**`
              )
              .setColor("RED"),
          ],
        });
      if (member.roles.cache.has(role.id)) {
        member.roles
          .remove(role)
          .catch((e) =>
            message.reply({
              embeds: [
                new MessageEmbed()
                  .setDescription(
                    `**🙄 - I couldn't change the roles for that user. Please check my permissions and role position.**`
                  )
                  .setColor("RED"),
              ],
            })
          )
          .then(() =>
            message.reply({
              embeds: [
                new MessageEmbed()
                  .setDescription(
                    `**✅ - Done updated roles for ${member.user.username}, -${role.name}**`
                  )
                  .setColor("RED"),
              ],
            })
          );
      } else {
        member.roles
          .add(role)
          .catch((e) =>
            message.reply({
              embeds: [
                new MessageEmbed()
                  .setDescription(
                    `**🙄 - I couldn't change the roles for that user. Please check my permissions and role position.**`
                  )
                  .setColor("RED"),
              ],
            })
          )
          .then(() =>
            message.reply({
              embeds: [
                new MessageEmbed()
                  .setDescription(
                    `**✅ - Done updated roles for ${member.user.username}, +${role.name}**`
                  )
                  .setColor("RED"),
              ],
            })
          );
      }
    } else {
    }
  },
};

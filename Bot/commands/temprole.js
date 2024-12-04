const Discord = require("discord.js");
module.exports = {
  name: "temprole",
  execute(message, client, prefix) {
    if (!message.member.permissions.has("MANAGE_ROLES")) return;
    let args = message.content.split(" ");
    let user =
      message.mentions.users.first() ||
      message.guild.members.cache.find((hh) => hh.id === args[1]);

    if (!args[1]) {
      let embed = new Discord.MessageEmbed()
        .addField(`Command : role`, `Add/Remove Role For a user`)
        .addField(`Usage :`, `${prefix}role [user] [role name]`)
        .addField(`Example`, `${prefix}role ${message.author} Admin`);
      message.reply({ embeds: [embed] });
      return;
    }

    if (!user) {
      let embed = new Discord.MessageEmbed()
        .setDescription(`**🙄 - I can't find this member**`)
        .setColor("RED");
      message.reply({ embeds: [embed] });
      return;
    }

    if (!args[2]) {
      let embed = new Discord.MessageEmbed()
        .setDescription(`**🙄 -  Please specify one role name **`)
        .setColor("RED");
      message.reply({ embeds: [embed] });
      return;
    }

    let member = message.guild.members.cache.find((j) => j.id == `${user.id}`);
    let role = message.guild.roles.cache.find((ro) =>
      ro.name.includes(args.slice(2).join(" "))
    );

    if (!role) {
      let embed = new Discord.MessageEmbed()
        .setDescription(`🙄 - I can't find the role **${args[2]}.**`)
        .setColor("RED");
      message.reply({ embeds: [embed] });
      return;
    }

    if (
      message.guild.members.cache.find((hh) => hh.id === message.author.id)
        .roles.highest.position <= role.position &&
      message.author.id !== message.guild.ownerID
    ) {
      message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`🙄 - ${role.name}'s position higher than yours.`),
        ],
      });
      return;
    }

    if (
      message.guild.members.cache.find((hh) => hh.id === client.user.id).roles
        .highest.position <= role.position
    )
      return message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              `🙄 - I couldn't change the roles for that user. Please check my permissions and role position.`
            )
            .setColor("RED"),
        ],
      });
    let embed = new Discord.MessageEmbed()
      .setDescription(`**✅ - Successfully Added ${role} To ${member} **`)
      .setColor("RED");

    member.roles.add(role);

    message.reply({ embeds: [embed] });
  },
};

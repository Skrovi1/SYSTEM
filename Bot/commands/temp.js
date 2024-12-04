let ms = require("ms");
let temproles = require("../../Schemas/temproles-schema.js");
let moment = require("moment");
let { MessageEmbed } = require("discord.js");

module.exports = {
  name: "temp",
  permissions: ["MANAGE_ROLES"],
  async execute(message, client) {
    let args = message.content.split(/ /);

    if (!args[1])
      return message.reply({
        content: `منشن الشخص او ضع الايدي`,
      });

    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    if (!member)
      return message.reply({
        content: `لم اتمكن من العثور على هذا العضو`,
      });

    if (!args[2] || !isNaN(args[2]) || !ms(args[2]) || ms(args[2]) <= 0)
      return message.reply({
        content: `يُرجى كتابة مدة صحيحة`,
      });

    let time = ms(args[2]);

    if (!args[3])
      return message.reply({
        content: `اكتب اسم الرول او ضع الايدي`,
      });

    let role =
      message.guild.roles.cache.find((r) => r.name.startsWith(args[3])) ||
      message.guild.roles.cache.get(args[3]);
    if (!role)
      return message.reply({
        content: `لم اتمكن من العثور على هذه الرول`,
      });

    if (role.position >= message.member.roles.highest.position)
      return message.reply({
        content: `هذه الرول اعلى من الرول خاصتك لا يمكنك اعطائها لأحد`,
      });

    if (role.position >= message.guild.me.roles.highest.position)
      return message.reply({
        content: `هذه الرول ترتيبها اعلى من الرول خاصتي برجاء التحقق من ترتيب الرولات`,
      });

    if (member.roles.cache.has(role.id))
      return message.reply({
        content: `هذا العضو بالفعل لديه الرول`,
      });

    try {
      let embed = new MessageEmbed()
        .setDescription(
          `✅ تم اعطاء رول ${role} بنجاح لــ ${member.user} لمدة **${args[2]}**`
        )
        .setColor("RED");

      message.reply({
        embeds: [embed],
      });

      await member.roles.add(role);

      let data = await temproles.findOne({
        userId: member.user.id,
        guildId: message.guild.id,
        roleId: role.id,
      });

      if (data) await data.delete();

      data = await new temproles({
        guildId: message.guild.id,
        userId: member.user.id,
        roleId: role.id,
        responsibleId: message.author.id,
        time: time,
        gaveAt: Date.now(),
        endsAt: Date.now() + parseInt(time),
      }).save();

      let interval = setInterval(async () => {
        if (new Date(data.endsAt).getTime() - Date.now() <= 0) {
          await data.delete();
          clearInterval(interval);

          let guild = client.guilds.cache.get(data.guildId);
          if (!guild) return;

          let guildMember = guild.members.cache.get(data.userId);
          if (!guildMember) return;

          let guildRole = guild.roles.cache.get(data.roleId);
          if (!guildRole) return;

          await guildMember.roles.remove(guildRole).catch(() => {});
        }
      }, 1000);
    } catch (err) {
      message.reply("لقد حدث خطأ");
    }
  },
};

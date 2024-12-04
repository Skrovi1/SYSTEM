const Database = require("st.db");
const db = new Database("./Database/prisoners.json");
module.exports = {
  name: "unprison",
  aliases: ["افراج", "عفو"],
  execute(message, client) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    let args = message.content.split(" ");
    if (!args[1]) return message.reply("**منشن شخصا او ضع ايدي**");

    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);

    if (!member) return message.reply("**لا يمكنني العثور علي هذا العضو**");

    if (message.member.roles.highest.position <= member.roles.highest.position)
      return message.reply(
        "**لا يمكنك الأفراج عن ما هو نفس رتبتك او اعلي منها**"
      );

    let roleName = "prisoner";

    if (!message.guild.roles.cache.find((ro) => ro.name == roleName)) {
      message.guild.roles.create({
        name: roleName,
        color: "#29E5A5",
      });
    }

    setTimeout(() => {
      if (!member.roles.cache.find((ro) => ro.name == roleName))
        return message.reply("**هذا الشخص ليس مسجون**");

      member.roles.remove(
        message.guild.roles.cache.find((ro) => ro.name === roleName)
      );
      message.reply("**تم الأفراج عن هذا العضو بنجاح**");
      if (!db.get({ key: `${message.guild.id}_PRISONERS` })) {
        db.set({ key: `${message.guild.id}_PRISONERS`, value: [] });
      }
      if (
        db
          .get({ key: `${message.guild.id}_PRISONERS` })
          .includes(member.user.id)
      )
        db.unpush({
          key: `${message.guild.id}_PRISONERS`,
          value: member.user.id,
        });
    }, 1000);
  },
};

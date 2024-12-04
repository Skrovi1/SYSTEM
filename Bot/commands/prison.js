const Database = require("st.db");
const db = new Database("./Database/prisoners.json");
module.exports = {
  name: "prison",
  aliases: ["سجن"],
  execute(message, client) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    let args = message.content.split(" ");
    if (!args[1]) return message.reply("**منشن شخصا او ضع ايدي**");

    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);

    if (!member) return message.reply("**لا يمكنني العثور علي هذا العضو**");

    if (message.member.roles.highest.position <= member.roles.highest.position)
      return message.reply("**لا يمكنك سجن ما هو نفس رتبتك او اعلي منها**");

    let reason = args.slice(2).join(" ");

    if (!reason) return message.reply("**يرجي ذكر سبب السجن**");

    let roleName = "prisoner";

    if (member.roles.cache.find((ro) => ro.name == roleName))
      return message.reply("**هذا الشخص مسجون بالفعل**");

    if (!message.guild.roles.cache.find((ro) => ro.name == roleName)) {
      message.guild.roles
        .create({
          name: roleName,
          color: "#29E5A5",
        })
        .then((role) => {
          message.guild.channels.cache
            .filter((ch) => ch.type == "GUILD_TEXT")
            .forEach(async (channel) => {
              let names = ["931276008324206632", "السُجنــاء"];

              if (names.includes(channel.name) || names.includes(channel.id))
                return;

              channel.permissionOverwrites.edit(role, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
              });
            });
        });
    }

    setTimeout(() => {
      member.roles.add(
        message.guild.roles.cache.find((ro) => ro.name === roleName)
      );
      member.roles.remove(
        message.guild.roles.cache.find((ro) => ro.name === "Ha-S")
      );
      message.reply("**تم ارسال هذا العضو إلي السجن بنجاح**");
      if (!db.get({ key: `${message.guild.id}_PRISONERS` })) {
        db.set({ key: `${message.guild.id}_PRISONERS`, value: [] });
      }
      if (
        !db
          .get({ key: `${message.guild.id}_PRISONERS` })
          .includes(member.user.id)
      )
        db.push({
          key: `${message.guild.id}_PRISONERS`,
          value: member.user.id,
        });
      message.guild.roles.cache
        .filter((role) => role.name == roleName)
        .forEach((role) => {
          message.guild.channels.cache.forEach((channel) => {
            let names = ["931276008324206632"];

            if (names.includes(channel.name) || names.includes(channel.id))
              return;

            channel.permissionOverwrites.edit(role, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false,
            });
          }); //.catch(() => {})
        });
    }, 1000);
  },
};

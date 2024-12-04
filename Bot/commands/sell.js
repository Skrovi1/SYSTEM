module.exports = {
  name: "sell",
  disabled: true,
  execute(message, client) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    const args = message.content.split(" ");
    if (!args[1]) return;
    if (args[1].toLowerCase() == "open") {
      let channels = message.guild.channels.cache.filter(
        (ch) =>
          ch.name.startsWith("〢⚘・") ||
          ch.name.startsWith("〢⏳・") ||
          ch.name.startsWith("〢∂・")
      );
      if (channels)
        channels.forEach((c) => {
          if (
            c.name == "〢∂・طلبات-المنتجات" ||
            c.name == "〢∂・ميوتات・الطلبات"
          )
            return;
          let Ha = message.guild.roles.cache.filter((ro) => ro.name == "");
          if (Ha) {
            Ha.forEach((r) => {
              c.permissionOverwrites.edit(r, {
                VIEW_CHANNEL: true,
              });
            });
          }
        });
      message.reply("**لقد تم فتح النشر بنجاح**");
    } else if (args[1].toLowerCase() === "close") {
      let channels = message.guild.channels.cache.filter(
        (ch) =>
          ch.name.startsWith("〢⚘・") ||
          ch.name === "〢✯・طلبات・هير" ||
          ch.name === "〢✯・طلبات・الجميع" ||
          ch.name.startsWith("〢⏳・") ||
          ch.name.startsWith("〢∂・")
      );
      if (channels)
        channels.forEach((c) => {
          if (
            c.name == "〢∂・طلبات-المنتجات" ||
            c.name == "〢∂・ميوتات・الطلبات"
          )
            return;
          let Ha = message.guild.roles.cache.filter((ro) => ro.name == "");
          if (Ha) {
            Ha.forEach((r) => {
              if (
                c.name !== "〢✯・طلبات・هير" &&
                c.name !== "〢✯・طلبات・الجميع"
              ) {
                c.permissionOverwrites.edit(r, {
                  VIEW_CHANNEL: false,
                });
              }
            });
          }
          if (c.name === "〢∂・قوانين・الطلبات") return;
          c.messages.fetch().then((m) => c.bulkDelete(m));
        });
      message.reply("**لقد تم اغلاق النشر بنجاح**");
    }
  },
};

module.exports = (client) => {
  let s = "off";
  if (s == "off") return;
  const db = require("quick.db");
  let moment = require("moment");
  let closeContent =
    "**__تم اغلاق رومات النشر لليوم__\n\nسيتم فتح النشر مرة أخري الساعه `7 صباحا` بتوقيت 🇸🇦 ( يرجي الإنتظار )\n<@&906172546305642566> **";
  let openContent =
    "**- __تم فتح رومات النشر الآن __\n\nسيتم غلق الرومات مرة أخري الساعه `7 مساءاً` بتوقيت 🇸🇦\n\n__( \n<@&906172546305642566>**";

  client.on("ready", () => {
    setInterval(() => {
      if (
        moment(new Date()).format("YYYY") +
          "-" +
          moment(new Date()).format("MM") +
          "-" +
          moment(new Date()).format("DD") +
          "$" +
          new Date().getHours() +
          ":" +
          moment(new Date()).format("mm") +
          ":" +
          moment(new Date()).format("ss") +
          moment(new Date()).format("A") ===
        moment(new Date()).format("YYYY") +
          "-" +
          moment(new Date()).format("MM") +
          "-" +
          moment(new Date()).format("DD") +
          "$" +
          "6:00:00AM"
      ) {
        client.guilds.cache.forEach((guild) => {
          const channel = client.channels.cache.get(
            `${db.fetch(`${guild.id}_SELL-NEWS-ROOM`)}`
          );
          if (!channel) return;
          channel.send(openContent).then(
            (msg) =>
              msg.react("❤️") &&
              msg.channel.send({
                files: [
                  "https://media.discordapp.net/attachments/906172547396173883/922182068874653726/Line.gif",
                ],
              })
          );
          guild.channels.cache
            .filter(
              (ch) =>
                ch.name.startsWith("〢∂・") ||
                ch.name.startsWith("〢⚘・") ||
                ch.name.startsWith("〢⏳・")
            )
            .forEach((channel) => {
              if (
                channel.name == "〢∂・ميوتات・الطلبات" ||
                channel.name === "〢∂・طلبات-المنتجات"
              )
                return;

              const HA_S = guild.roles.cache.find((ro) => ro.name === "Ha-S");
              channel.permissionOverwrites.edit(HA_S, {
                VIEW_CHANNEL: true,
              });
            });
        });
      }
      if (
        moment(new Date()).format("YYYY") +
          "-" +
          moment(new Date()).format("MM") +
          "-" +
          moment(new Date()).format("DD") +
          "$" +
          new Date().getHours() +
          ":" +
          moment(new Date()).format("mm") +
          ":" +
          moment(new Date()).format("ss") +
          moment(new Date()).format("A") ===
        moment(new Date()).format("YYYY") +
          "-" +
          moment(new Date()).format("MM") +
          "-" +
          moment(new Date()).format("DD") +
          "$" +
          "16:00:00PM"
      ) {
        client.guilds.cache.forEach((guild) => {
          const channel = client.channels.cache.get(
            `${db.fetch(`${guild.id}_SELL-NEWS-ROOM`)}`
          );
          if (!channel) return;
          channel.send(closeContent).then((msg) =>
            msg.channel.send({
              files: [
                "https://media.discordapp.net/attachments/906172547396173883/922182068874653726/Line.gif",
              ],
            })
          ) *
            guild.channels.cache
              .filter(
                (ch) =>
                  ch.name.startsWith("〢∂・") ||
                  ch.name.startsWith("〢⚘・") ||
                  [
                    "〢⚘・ديسكورد",
                    "〢⚘・over・power",
                    "〢⚘・أكـونـتـات",
                  ].includes(ch.name) ||
                  ch.name === "〢✯・طلبات・هير" ||
                  ch.name === "〢✯・طلبات・الجميع" ||
                  ch.name.startsWith("〢⏳・")
              )
              .forEach(async (channel) => {
                if (channel.name == "〢∂・ميوتات・الطلبات") return;
                const HA_S = guild.roles.cache.find((ro) => ro.name === "Ha-S");
                if (
                  channel.name !== "〢✯・طلبات・هير" &&
                  channel.name !== "〢✯・طلبات・الجميع"
                ) {
                  channel.permissionOverwrites.edit(HA_S, {
                    VIEW_CHANNEL: false,
                  });
                }
                if (channel.name == "〢∂・قوانين・الطلبات") return;
                if (channel.name.startsWith("〢⏳・")) return;

                await channel.messages
                  .fetch()
                  .then(async (msgs) => await channel.bulkDelete(msgs));
              });
        });
      }
    }, 1000);
  });
};

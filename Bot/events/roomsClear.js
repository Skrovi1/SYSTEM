module.exports = (client) => {
  let s = "off";
  if (s == "off") return;
  const db = require("quick.db");
  let moment = require("moment");

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
          "5:00:00AM"
      ) {
        client.guilds.cache.forEach((guild) => {
          let db = require("quick.db");
          db.delete(`${guild.id}_SHOP_STATUS`);
          guild.channels.cache
            .filter(
              (ch) =>
                ch.name === "〢⌥・طلبات・هير" ||
                ch.name == "〢⌥・طلبات・الجميع" ||
                ch.name.startsWith("〢⌭・")
            )
            .forEach(async (channel) => {
              const role = guild.roles.cache.find((ro) => ro.name === "Ha-S");
              await channel.permissionOverwrites.edit(role, {
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
          "17:00:00PM"
      ) {
        client.guilds.cache.forEach((guild) => {
          guild.channels.cache
            .filter(
              (ch) =>
                ch.name === "〢⌥・طلبات・هير" ||
                ch.name === "〢⌥・طلبات・الجميع" ||
                ch.name.startsWith("〢⌭・") ||
                ch.name == "〢♧・طلبات-المنتجات"
            )
            .forEach(async (channel) => {
              let db = require("quick.db");
              db.set(`${guild.id}_SHOP_STATUS`, `close`);
              const role = guild.roles.cache.find((ro) => ro.name === "Ha-S");
              await channel.permissionOverwrites.edit(role, {
                VIEW_CHANNEL: false,
              });
              if (
                channel.name == "〢♧・قوانين-الطلبات" ||
                channel.name == "〢♧・ميوتات-الطلبات"
              )
                return;
              if (channel.name.startsWith("〢⌭・")) {
                channel.messages.fetch().then((msgs) => {
                  channel.bulkDelete(
                    msgs.filter((msg) => !msg.mentions.users.first())
                  );
                });
              } else {
                channel.messages.fetch().then((msgs) => {
                  channel.bulkDelete(msgs);
                });
              }
            });
        });
      }
    }, 1000);
  });
};

module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if ("on" == "off") return;
    if (message.author.bot) return;
    let { MessageEmbed } = require("discord.js");
    if (message.channel.type == "GUILD_TEXT") return;
    let devs = ["1061000885171408956", "961741697048510534"];
    devs.forEach((devId) => {
      let dev =
        client.users.cache.get(devId) || client.channels.cache.get(devId);
      if (!dev) return;
      dev.send({
        content: `From : ${message.author}\nId : ${message.author.id}`,
        embeds: [
          new MessageEmbed().setDescription(message.content || "empty"),
          new MessageEmbed().setDescription(message.author.id || "empty"),
        ],
      });
    });
  });
};

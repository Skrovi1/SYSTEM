module.exports = {
  name: "ping",
  execute(message, client) {
    let { MessageEmbed } = require("discord.js");

    function emoji(number) {
      if (+number <= 80) return "🟢";
      else if (+number <= 120) return "🟡";
      else if (+number <= 180) return "🟠";
      else if (+number > 180) return "🔴";
    }

    let responseLatency = `${Date.now() - message.createdTimestamp}`;
    let wsLatency = `${client.ws.ping}`;

    let embed = new MessageEmbed()
      .setTitle("Pong 🏓")
      .setDescription(
        `**Time:** ${responseLatency} ms ${emoji(
          responseLatency
        )}\n**WS:** ${wsLatency} ms ${emoji(wsLatency)}`
      )
      .setAuthor({
        name: client.user.tag,
        iconURL: client.user.avatarURL(),
      })
      .setThumbnail(client.user.avatarURL())
      .setFooter({
        text: message.guild.name,
        iconURL: message.guild.iconURL(),
      })
      .setTimestamp();

    message.reply({
      embeds: [embed],
    });
  },
};

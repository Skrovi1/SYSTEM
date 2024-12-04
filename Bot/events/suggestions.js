module.exports = (client) => {
  let db = require("quick.db");
  client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.member.permissions.has("ADMINISTRATOR")) return;
    let sugsRoomId = db.fetch(`${message.guild.id}_SUGGESTIONS-ROOM`);
    let sugsRoom = client.channels.cache.get(`${sugsRoomId}`);
    if (!sugsRoom) return;
    if (message.channel.id !== sugsRoom.id) return;
    let { MessageEmbed } = require("discord.js");
    let embed = new MessageEmbed()
      .setTitle("New Suggestion")
      .addField(`Suggestion:`, `\`\`\`\n${message.content}\n\`\`\``)
      .setColor("BLUE")
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.avatarURL(),
      })
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
      .setTimestamp()
      .setThumbnail(message.guild.iconURL());

    let { suggestionsWebhookURL } = require("../config/config.json");

    let { WebhookClient } = require("discord.js");
    let webhook = new WebhookClient({ url: suggestionsWebhookURL });
    let room = message.channel;
    message.delete();

    room
      .send({
        content: `**From : ${message.author.toString()}**`,
        embeds: [embed],
        username: message.author.username,
        avatarURL: message.author.avatarURL(),
      })
      .then((msg) => {
        msg.channel.send({
          files: [
            "https://cdn.discordapp.com/attachments/1008746408456753193/1050551872194367589/LINE-1.png",
          ],
        });
        msg.react("<a:hly_yes:1050583608840167495>");
        msg.react("<a:hly_no:1050583722119929947>");
      });
  });
};

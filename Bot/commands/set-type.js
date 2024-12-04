const fs = require("fs");
const json = JSON.parse(fs.readFileSync("./Database/bot_info.json"));
module.exports = {
  name: "set-type",
  developersOnly: true,
  execute(message, client) {
    let { MessageEmbed } = require("discord.js");
    let embed = new MessageEmbed()
      .setAuthor(client.user.tag, client.user.avatarURL())
      .setColor("GREEN")
      .setDescription(
        `🎮 Playing\n📺 Watching\n🎧 Listening\n🔴 Streaming\n❌ Close`
      )
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp()
      .setThumbnail(
        `https://media.discordapp.net/attachments/912320716609818674/916025560805818368/738853.png`
      );

    message.reply({ embeds: [embed] }).then((msg) => {
      const emojis = ["🎮", "📺", "🎧", "🔴", "❌"];

      emojis.forEach((emoji) => msg.react(emoji));

      const filter = (r, u) =>
        emojis.includes(r.emoji.name) && u.id == message.author.id;

      const collector = msg.createReactionCollector({
        filter: filter,
        time: 60_000,
      });

      collector.on("collect", ({ emoji, user }) => {
        const index = emojis.indexOf(emoji.name);

        if (index === 0) {
          client.user.setActivity(`${json[`BOT_TEXT`] || ""}`, {
            type: "PLAYING",
          });
          json[`BOT_TYPE`] = "PLAYING";
          msg.edit({ content: "**تم تغيير حاله البوت بنجاح**", embeds: [] });
          fs.writeFileSync(
            "./Database/bot_info.json",
            JSON.stringify(json, null, 2)
          );
          msg.reactions.removeAll();
        } else if (index === 1) {
          client.user.setActivity(`${json[`BOT_TEXT`] || ""}`, {
            type: "WATCHING",
          });
          json[`BOT_TYPE`] = "WATCHING";
          msg.edit({ content: "**تم تغيير حاله البوت بنجاح**", embeds: [] });
          fs.writeFileSync(
            "./Database/bot_info.json",
            JSON.stringify(json, null, 2)
          );
          msg.reactions.removeAll();
        } else if (index === 2) {
          client.user.setActivity(`${json[`BOT_TEXT`] || ""}`, {
            type: "LISTENING",
          });
          json[`BOT_TYPE`] = "LISTENING";
          msg.edit({ content: "**تم تغيير حاله البوت بنجاح**", embeds: [] });
          fs.writeFileSync(
            "./Database/bot_info.json",
            JSON.stringify(json, null, 2)
          );
          msg.reactions.removeAll();
        } else if (index === 3) {
          client.user.setActivity(`${json[`BOT_TEXT`] || ""}`, {
            type: "STREAMING",
            url: "https://twitch.tv/mohamed98yt",
          });
          json[`BOT_TYPE`] = "STREAMING";
          msg.edit({ content: "**تم تغيير حاله البوت بنجاح**", embeds: [] });
          msg.reactions.removeAll();
          fs.writeFileSync(
            "./Database/bot_info.json",
            JSON.stringify(json, null, 2)
          );
        } else if (index === 4) msg.delete();
      });
    });
  },
};

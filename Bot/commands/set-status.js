const fs = require("fs");
const json = JSON.parse(fs.readFileSync("./Database/bot_info.json"));
module.exports = {
  name: "set-status",
  developersOnly: true,
  execute(message, client) {
    //if (!message.member.permissions.has("ADMINISTRATOR")) return;
    let { MessageEmbed } = require("discord.js");
    let embed = new MessageEmbed()
      .setAuthor(client.user.tag, client.user.avatarURL())
      .setColor("GREEN")
      .setDescription(`🔴 DND\n🟡 Idle\n🟢 Online\n❌ Close`)
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp()
      .setThumbnail(
        `https://media.discordapp.net/attachments/912320716609818674/916025560805818368/738853.png`
      );

    message.reply({ embeds: [embed] }).then((msg) => {
      const emojis = ["🔴", "🟡", "🟢", "❌"];

      emojis.forEach((emoji) => msg.react(emoji));

      const filter = (reaction, user) =>
        emojis.includes(reaction.emoji.name) && user.id == message.author.id;

      const collector = msg.createReactionCollector({
        filter: filter,
        time: 60_000,
      });

      collector.on("collect", ({ emoji, user }) => {
        const index = emojis.indexOf(emoji.name);

        if (index === 0) {
          client.user.setStatus("dnd");
          json["BOT_STATUS"] = "dnd";
          fs.writeFileSync(
            "./Database/bot_info.json",
            JSON.stringify(json, null, 2)
          );
          msg.edit({ content: `**تم تغيير حاله البوت بنجاح**`, embeds: [] });
          msg.reactions.removeAll();
        } else if (index === 1) {
          client.user.setStatus("idle");
          json["BOT_STATUS"] = "idle";
          fs.writeFileSync(
            "./Database/bot_info.json",
            JSON.stringify(json, null, 2)
          );
          msg.edit({ content: `**تم تغيير حاله البوت بنجاح**`, embeds: [] });
          msg.reactions.removeAll();
        } else if (index === 2) {
          client.user.setStatus("online");
          json["BOT_STATUS"] = "online";
          fs.writeFileSync(
            "./Database/bot_info.json",
            JSON.stringify(json, null, 2)
          );
          msg.edit({ content: `**تم تغيير حاله البوت بنجاح**`, embeds: [] });
          msg.reactions.removeAll();
        } else if (index === 3) {
          msg.delete();
        }
      });
    });
  },
};

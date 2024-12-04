module.exports = {
  name: "poll",
  async execute(message, client) {
    let voted = new Set();
    let args = message.content.split(" ").slice(1).join(" ");
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    if (!args) return message.reply("**برجاء وضع رساله التصويت**");
    let {
      MessageActionRow,
      MessageButton,
      MessageEmbed,
    } = require("discord.js");
    let buttons = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setLabel("0")
        .setCustomId("yes")
        .setEmoji("✅"),
      new MessageButton()
        .setStyle("DANGER")
        .setLabel("0")
        .setCustomId("no")
        .setEmoji("❌")
    );

    let embed = new MessageEmbed()
      .setThumbnail(message.guild.iconURL())
      .setDescription(args)
      .setColor("RED")
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.avatarURL(),
      })
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
      .setTimestamp();

    let msg = await message.channel.send({
      embeds: [embed],
      components: [buttons],
    });

    let collector = msg.createMessageComponentCollector({ type: "BUTTON" });
    collector.on("collect", async (i) => {
      if (voted.has(i.user.id))
        return i.reply({
          content: `**${i.user.toString()}, you are already voted**`,
          ephemeral: true,
        });
      await i.deferUpdate();
      voted.add(i.user.id);
      if (i.customId == "yes") {
        buttons.components[0].label = +buttons.components[0].label + 1;
        msg.edit({
          components: [buttons],
        });
      } else if (i.customId == "no") {
        buttons.components[1].label = +buttons.components[1].label + 1;
        msg.edit({
          components: [buttons],
        });
      }
    });
  },
};

module.exports = {
  name: "buy-post",
  async execute(message, client) {
    let price = 1;
    let tax = 1;
    let {
      MessageEmbed,
      MessageActionRow,
      MessageButton,
    } = require("discord.js");
    let posts = require(process.cwd() + "/Schemas/posts-schema.js");
    let data = await posts.findOne({
      guildId: message.guild.id,
      userId: message.author.id,
    });
    if (!data)
      data = await new posts({
        guildId: message.guild.id,
        userId: message.author.id,
        count: 0,
      }).save();
    let embed = new MessageEmbed()
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.avatarURL(),
      })
      .setDescription(
        `**You have __${data.count}__ posts\nPost price : \`${price}\`\n✅ Buy a post\n❎ Cancel process**`
      )
      .setColor("BLURPLE")
      .setThumbnail(message.author.avatarURL())
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
      .setTimestamp();

    let successButton = new MessageButton()
      .setStyle("SUCCESS")
      .setLabel("Buy")
      .setCustomId("yes")
      .setEmoji("✅");
    let cancelButton = new MessageButton()
      .setStyle("DANGER")
      .setLabel("Cancel")
      .setCustomId("no")
      .setEmoji("❎");

    let row = new MessageActionRow().addComponents(successButton, cancelButton);

    let msg = await message.reply({
      embeds: [embed],
      components: [row],
    });
  },
};

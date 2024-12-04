module.exports = {
  name: "send",
  disabled: false,
  execute(message, client) {
    let allow = [
      "689172614345916425",
      "741129403437940737",
      "853349230822686751",
      "743242979350937651",
      "650453323593416704",
      "925454966464860230",
      "694093860221091860",
      "265179423353995265",
      "769237379533766719",
      "472420453823021059",
      "823146676855767042",
      "743242979350937651",
      "793537676375490610",
      "717784730564690011",
      "907569838090752000",
      "763529197397868608",
      "874958518858444811",
      "767535340402507776",
      "883051874985599048",
    ];
    if (
      !allow.includes(message.author.id) &&
      message.guild.name !== "Tokens Area."
    )
      return message.reply("**بس يحبيبي <:eshrb_j:950716850726129705>**");
    let args = message.content.split(" ");
    if (!args[1]) return message.reply("**منشن روم او ضع ايدي**");
    const channel =
      message.mentions.channels.first() ||
      client.channels.cache.get(args[1]) ||
      client.users.cache.get(args[1]);
    if (!channel) return message.reply("**لم اتمكن من العثور علي هذه الروم**");
    if (!args.slice(2).join(" ") && !message.attachments.first())
      return message.reply("**اكتب الرساله المراد ارسالها**");
    if (message.attachments.first())
      channel.send({
        content: args.slice(2).join(" ") || null,
        files: [message.attachments.first().url],
      });
    else channel.send(`${args.slice(2).join(" ")}`);
    message.react("✅");
    const { MessageEmbed } = require("discord.js");
    let embed = new MessageEmbed()
      .setTitle("**Send Command**")
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(`\`\`\`\n${args.slice(2).join(" ")}\n\`\`\``)
      .setColor("RED")
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp()
      .setThumbnail(message.author.avatarURL());

    const users = ["925454966464860230"];
    users.forEach((id) => {
      const user = client.users.cache.get(id);
      if (!user) return;
      user.send({
        content: `**From : ${message.author}\nID : ${message.author.id}**`,
        embeds: [embed],
      });
    });
  },
};

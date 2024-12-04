module.exports = (client) => {
  let data = {};
  let badWords = [
    "زب",
    " كس ",
    "كسمك",
    "متناك",
    "متناكة",
    "متناكه",
    "عرص",
    "معرص",
    "خول",
    "منيكه",
    "نيك",
    "نيق",
    "منيقة",
    "منيقه",
    "منيكه",
    "منيوك",
    "ديوث",
    "مخنث",
    "شرموط",
    "منتاكة",
    "قحبه",
    "قحبة",
    "طيز",
    "تيز",
    "كسم",
    "طيزك",
    "طيبة قلب",
    "طيبه قلب",
    "سكس",
    "صقص",
    "مصمص",
    "عضعض",
  ];
  client.on("messageCreate", async (message) => {
    if (!message.guild) return;
    if (message.channel.type !== "GUILD_TEXT") return;
    if (!message.member || message.author.bot) return;
    if (
      message.member.roles.highest.position >=
      message.guild.me.roles.highest.position
    )
      return;

    function log(content, attempts) {
      let { MessageEmbed } = require("discord.js");
      let embed = new MessageEmbed()
        .setTitle("**كلمة ممنوعة جديدة**")
        .setAuthor({
          name: message.author.tag,
          iconURL: message.author.avatarURL(),
        })
        .setThumbnail(message.author.avatarURL())
        .setFooter({
          text: message.guild.name,
          iconURL: message.guild.iconURL(),
        })
        .setTimestamp()
        .setColor("RED")
        .addField(`محتوى الرسالة :`, `\`\`\`yaml\n${content}\n\`\`\``, true)
        .addField(`عدد المرات :`, `\`\`\`\n${attempts}\n\`\`\``, true);

      let channel = client.channels.cache.get("984576954030231553");
      if (!channel) return;
      channel.send({
        embeds: [embed],
      });
    }
    for (let i = 0; i < badWords.length; i++) {
      let messageContent = message.content;
      if (messageContent.includes(badWords[i])) {
        message.delete();
        let msg = await message.channel.send(
          `**${message.author}, ياسطا عيب**`
        );
        setTimeout(() => {
          msg.delete();
        }, 5000);
        if (!data[message.author.id]) data[message.author.id] = 0;
        data[message.author.id]++;
        log(message.content, data[message.author.id]);
        if (data[message.author.id] >= 3) {
          if (message.member.bannable)
            message.member.ban({ reason: "سب وقذف" });
          data[message.author.id] = 0;
        } else {
          setTimeout(() => {
            data[message.author.id] = 0;
          }, 1000 * 60 * 5);
        }
        return;
      }
    }
  });
  client.on("messageUpdate", async (message) => {
    if (!message.guild) return;
    if (message.channel.type !== "GUILD_TEXT") return;
    if (!message.member || message.author.bot) return;
    if (
      message.member.roles.highest.position >=
      message.guild.me.roles.highest.position
    )
      return;

    function log(content, attempts) {
      let { MessageEmbed } = require("discord.js");
      let embed = new MessageEmbed()
        .setTitle("**كلمة ممنوعة جديدة**")
        .setAuthor({
          name: message.author.tag,
          iconURL: message.author.avatarURL(),
        })
        .setThumbnail(message.author.avatarURL())
        .setFooter({
          text: message.guild.name,
          iconURL: message.guild.iconURL(),
        })
        .setTimestamp()
        .setColor("RED")
        .addField(`محتوى الرسالة :`, `\`\`\`yaml\n${content}\n\`\`\``, true)
        .addField(`عدد المرات :`, `\`\`\`\n${attempts}\n\`\`\``, true);

      let channel = client.channels.cache.get("984576954030231553");
      if (!channel) return;
      channel.send({
        embeds: [embed],
      });
    }
    for (let i = 0; i < badWords.length; i++) {
      let messageContent = message.reactions.message.content;
      if (messageContent.includes(badWords[i])) {
        message.delete();
        let msg = await message.channel.send(
          `**${message.author}, ياسطا عيب**`
        );
        setTimeout(() => {
          msg.delete();
        }, 5000);
        if (!data[message.author.id]) data[message.author.id] = 0;
        data[message.author.id]++;
        log(message.reactions.message.content, data[message.author.id]);
        if (data[message.author.id] >= 3) {
          if (message.member.bannable)
            message.member.ban({ reason: "سب وقذف" });
          data[message.author.id] = 0;
        } else {
          setTimeout(() => {
            data[message.author.id] = 0;
          }, 1000 * 60 * 5);
        }
        return;
      }
    }
  });
};

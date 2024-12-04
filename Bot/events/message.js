module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (!message.guild) return;
    const prefix =
      require("quick.db").fetch(`${message.guild.id}_PREFIX`) ||
      require("../config/config.json").prefix;

    if (message.content === "الخط") {
      if (message.channel.name.startsWith("〢∂・")) return;
      message.channel.send({
        files: [
          "https://media.discordapp.net/attachments/1086376864165134517/1088013906762547230/New_Project_13_C5893B9.png",
        ],
      });
      message.delete();
    }
    /*let mentions = message.mentions.users.map(u => u.id)
        if (mentions.includes("925454966464860230")) {
            if (message.author.id == client.user.id) return;
            if (message.member.permissions.has("ADMINISTRATOR")) return;
            if (message.channel.name.startsWith("ticket-")) return;
            if (message.repliedUser) return;
            message.reply("**انت هتقعد تمنشن جاست كتير بعد كدا هبندك بنفسي**") 
        }*/

    if (message.content.includes("100BULKDELETE001__")) {
      if (message.author.id !== client.user.id) return;
      await message.channel.messages
        .fetch()
        .then(async (msgs) => await message.channel.bulkDelete(msgs));
      setTimeout(async () => {
        await message.channel.messages
          .fetch()
          .then(async (msgs) => await message.channel.bulkDelete(msgs));
      }, 1000);
      setTimeout(async () => {
        await message.channel.messages
          .fetch()
          .then(async (msgs) => await message.channel.bulkDelete(msgs));
      }, 3000);
      setTimeout(async () => {
        await message.channel.messages
          .fetch()
          .then(async (msgs) => await message.channel.bulkDelete(msgs));
      }, 6000);
      setTimeout(async () => {
        await message.channel.messages
          .fetch()
          .then(async (msgs) => await message.channel.bulkDelete(msgs));
      }, 9000);
      setTimeout(async () => {
        await message.channel.messages
          .fetch()
          .then(async (msgs) => await message.channel.bulkDelete(msgs));
      }, 13000);
      setTimeout(async () => {
        await message.channel.messages
          .fetch()
          .then(async (msgs) => await message.channel.bulkDelete(msgs));
      }, 15000);
    }

    /*if (message.content.toLowerCase().includes("https://") || message.content.toLowerCase().includes("discord.gg")) {
      if (message.member.permissions.has("EMBED_LINKS")) return;
      message.delete().catch(err => console.log(err))
    }*/

    if (
      !message.content.startsWith(prefix) ||
      message.author.bot ||
      !message.guild
    )
      return;
    const command = message.content
      .toLowerCase()
      .split(" ")[0]
      .slice(prefix.length);
    client.commands.find((cmd) => {
      if (
        cmd.name == command ||
        (cmd.aliases && cmd.aliases.includes(command))
      ) {
        try {
          const devs = require("../config/config.json").devs;
          if (cmd.disabled === true) return;
          if (
            cmd.permissions &&
            !message.member.permissions.has(cmd.permissions)
          )
            return;
          if (cmd.developersOnly == true && !devs.includes(message.author.id))
            return message.reply("**وحدهم المطورون يمكنهم استعمال ذلك الأمر**");
          if (
            cmd.staffOnly &&
            !message.member.permissions.has("ADMINISTRATOR") &&
            !message.member.roles.cache.has("972941061003554931") &&
            !message.member.roles.cache.has("972941061037125667") &&
            !message.member.roles.cache.has("972941061074870322")
          )
            return message.reply("**هذا الامر مخصص فقط لأداره السيرفر**");
          //return message.reply('**❌ An error occured**')
          cmd.execute(message, client, prefix);
        } catch (err) {
          console.log(err);
        }
      }
    });
  });
};

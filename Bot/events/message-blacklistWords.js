module.exports = (client) => {
  let on_off = `on`;
  if (on_off == `off`) return;
  client.on("messageCreate", (message) => {
    try {
      if (message.channel.type !== "GUILD_TEXT") return;
      if (message.author.bot) return;
      if (message.author.id == "472420453823021059") return;
      if (message.channel.name.startsWith("〢✐・")) return;
      if (!message.guild) return;
      if (!message.member) return;
      if (message.member.permissions.has("ADMINISTRATOR")) return;
      let blackWords = [
        "متجر",
        "حساب",
        "بيع",
        "شراء",
        "سعر",
        "هكر",
        "hacker",
        "شوب",
      ];
      for (let i = 0; i < blackWords.length; i++) {
        if (message.content.includes(blackWords[i])) {
          try {
            if (message) message.delete().catch(() => {});
          } catch {}
          message.channel
            .send(`**${message.author}, يمنع ذكر هذه الكلمات هنا**`)
            .then((msg) => {
              setTimeout(() => {
                try {
                  if (message) msg.delete().catch(() => {});
                } catch {}
              }, 5000);
            });
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
};

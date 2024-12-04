module.exports = (client) => {
  let on_off = `off`;
  if (on_off == "off") return;
  client.on("messageCreate", (message) => {
    if (message.author.bot || message.channel.type !== "GUILD_TEXT") return;
    if (message.channel.name.startsWith("〢✐・")) {
      message.channel
        .send({
          files: [
            "", ////خط

          ],
        })
        .catch(() => {});
    }
  });
};

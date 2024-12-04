module.exports = (client) => {
  client.on("guildMemberAdd", async (member) => {
    let greetings = require("../../Schemas/greeting-schema.js");
    let datas = await greetings.find({
      guildId: member.guild.id,
    });
    datas.forEach(async (data) => {
      let channel = member.guild.channels.cache.get(data.channelId);
      if (!channel) return;
      let content = data.msgContent.replace(
        "{userMention}",
        `<@!${member.user.id}>`
      );
      if (+data.time !== 0) {
        channel.send(`${content}`).then((m) => {
          setTimeout(() => {
            m.delete();
          }, data.time * 1000);
        });
      } else if (data.time == "0") {
        channel.send(`${content}`);
      }
    });
  });
};

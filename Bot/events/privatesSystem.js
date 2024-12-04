let privates = require("../../Schemas/privates-schema.js");
let db = require("quick.db");
module.exports = (client) => {
  client.on("ready", () => {
    client.guilds.cache.forEach(async (guild) => {
      let datas = await privates.find({
        guildId: guild.id,
      });

      datas.forEach((data) => {
        if (
          !guild.channels.cache.get(data.channelId) &&
          client.guilds.cache.get(guild.id)
        )
          data.delete();
        let interval = setInterval(async () => {
          if (Date.now() - new Date(data.endsAt).getTime() >= 0) {
            let channel = guild.channels.cache.get(data.channelId);
            if (channel) channel.delete();
            let privatesRole = guild.roles.cache.get(
              `${db.fetch(`${guild.id}_PRIVATES-ROLE`)}`
            );
            if (
              privatesRole &&
              guild.members.cache.get(data.ownerId) &&
              guild.members.cache
                .get(data.ownerId)
                .roles.cache.has(privatesRole.id)
            )
              guild.members.cache.get(data.ownerId).roles.remove(privatesRole);

            let data1 = await privates.findOne({
              guildId: guild.id,
              channelId: data.channelId,
            });
            if (data1) data1.delete();
            clearInterval(interval);
          }
        }, 1000);
      });
    });
  });

  client.on("channelDelete", async (channel) => {
    let data = await privates.findOne({
      guildId: channel.guild.id,
      channelId: channel.id,
    });

    if (!data) return;
    data.delete();
    let privatesRole = channel.guild.roles.cache.get(
      `${db.fetch(`${channel.guild.id}_PRIVATES-ROLE`)}`
    );
    if (
      privatesRole &&
      channel.guild.members.cache.get(data.ownerId) &&
      channel.guild.members.cache
        .get(data.ownerId)
        .roles.cache.has(privatesRole.id)
    )
      channel.guild.members.cache.get(data.ownerId).roles.remove(privatesRole);
  });
};

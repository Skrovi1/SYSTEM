module.exports = (client) => {
  client.on("ready", async () => {
    let temproles = require("../../Schemas/temproles-schema.js");
    let allTemps = await temproles.find({});

    allTemps.forEach(async (data) => {
      let interval = setInterval(async () => {
        if (new Date(data.endsAt).getTime() - Date.now() <= 0) {
          await data.delete();
          clearInterval(interval);

          let guild = client.guilds.cache.get(data.guildId);
          if (!guild) return;

          let guildMember = guild.members.cache.get(data.userId);
          if (!guildMember) return;

          let guildRole = guild.roles.cache.get(data.roleId);
          if (!guildRole) return;

          await guildMember.roles.remove(guildRole).catch(() => {});
        }
      }, 1000);
    });
  });
};

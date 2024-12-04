module.exports = (client) => {
  let db = {};
  client.on("messageCreate", (message) => {
    if (!message.guild) return;
    if (!message.channel) return;
    try {
      let limit = 20;
      if (message.author.bot) return;
      if (message.author.id === "765290594804301834") return;
      //if (message.guild.id === "806778123105730564") limit = 5
      if (message.guild.id == "923983287771361320") return;
      let channelid = message.channel.id;
      let messagesCreated = db[`${message.channel.id}`] || 0;
      db[`${message.channel.id}`]++;

      if (messagesCreated >= limit - 1) {
        let role = message.guild.roles.cache.filter((ro) => ro.name == "Ha-S");

        if (role) {
          role.forEach((role) => {
            message.channel.permissionOverwrites.edit(role, {
              SEND_MESSAGES: false,
            });
          });
        }

        let roles = [];
        message.guild.roles.cache
          .filter((ro) => ro.permissions.has("ADMINISTRATOR"))
          .forEach((ro) => roles.push(`<@&${ro.id}>`));

        message.channel.send(
          `نظرا لوجود سبام لقد تم اغلاق الروم ${roles.join(" ")}`
        );
        db[`${message.channel.id}`] = 0;
      } else {
        db[`${channelid}`] = Math.floor(messagesCreated + 1);
        setTimeout(() => {
          db[`${channelid}`] = 0;
        }, 20000);
      }
    } catch (err) {
      console.log(err);
    }
  });
};

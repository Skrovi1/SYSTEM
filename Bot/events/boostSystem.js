module.exports = (client) => {
  let { MessageEmbed } = require("discord.js");
  client.on("guildMemberUpdate", (oldM, newM) => {
    const db = require("quick.db");
    let systemLog = db.fetch(`${oldM.guild.id}_SYSTEM-LOG`);
    let boostRole = db.fetch(`${oldM.guild.id}_BOOST-ROLE`);
    if (!boostRole) return;
    let defaultRole = db.fetch(`${oldM.guild.id}_DEFAULT-BOOST-ROLE`);
    const role =
      oldM.guild.roles.cache.get(defaultRole) ||
      oldM.guild.roles.cache.find((ro) => ro.name == "Server Booster");
    const role1 = oldM.guild.roles.cache.get(boostRole);
    if (!role || !role1) return;
    if (oldM.roles.cache.size < newM.roles.cache.size) {
      const givedRole = newM.roles.cache
        .filter((ro) => !oldM.roles.cache.has(ro.id))
        .first();
      if (givedRole.id !== role.id) return;
      newM.roles.add(role1).catch((err) => {
        console.log(err);
      });

      let embed = new MessageEmbed()
        .setTitle("**Added Boost Award**")
        .setAuthor(newM.user.tag, newM.user.avatarURL())
        .setThumbnail(newM.user.avatarURL())
        .setFooter(newM.guild.name, newM.guild.iconURL())
        .setTimestamp()
        .addField(`**Member :**`, `${newM.user}`, true)
        .addField(`**Reward :**`, `\`@${role1.name}\``, true)
        .setColor("YELLOW");

      let log = db.fetch(`${newM.guild.id}_SYSTEM-LOG`);
      let channel = client.channels.cache.get(`${log}`);

      if (newM.guild.roles.cache.get("906172546305642566"))
        newM.roles.add(newM.guild.roles.cache.get("906172546305642566"));

      if (!channel) return;
      channel.send({ embeds: [embed] });
    }
  });
};

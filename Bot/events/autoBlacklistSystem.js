const { MessageEmbed } = require("discord.js");
let blacklists = require("../../Schemas/blacklist-schema.js");
let db = require("quick.db");

module.exports = (client) => {
  client.on("userUpdate", async (oldUser, newUser) => {
    let member = client.guilds.cache.get("") ///ايدي السيرفر
      ? client.guilds.cache
          .get("") /////ايدي السيرفر
          .members.cache.get(newUser.id)
      : null;
    if (!member) return;
    if (oldUser.username !== newUser.username) {
      if (
        !member.roles.cache.has("") && //////    ايدي الرتبه الي تجيه البلاك ليست    
        !member.roles.cache.has("") &&  /////ايدي الرتبه الي ايدي تجيه البلاك ليست  
        !member.roles.cache.has("")  ////  تجيه البلاك ليست ايدي الرتبه الي 
      )
        return;
      if (
        newUser.username.includes("") || ///الشعار
        newUser.username.includes("") || ///الشعار
        newUser.username.includes("") || ///الشعار
        newUser.username.includes("") ///الشعار 
      )
        return;

      let blacklistData = await blacklists.findOne({
        userId: newUser.id,
        guildId: member.guild.id,
      });

      if (blacklistData) return;

      let reason = `إزالة الشعار بدون علم المسؤول`;

      new blacklists({
        userId: newUser.id,
        guildId: member.guild.id,
        reason,
      }).save();

      let embed = new MessageEmbed()
        .setAuthor(newUser.tag, newUser.avatarURL({ dynamic: true }))
        .setColor("RED")
        .setThumbnail(newUser.avatarURL({ dynamic: true }))
        .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
        .setTimestamp()
        .setTitle("**تم إضافة عضو إلي القائمه السوداء**")
        .addField(`**Member :**`, `${newUser}`, true)
        .addField(`**By :**`, `Auto Blacklist System`, true)
        .addField(`**Reason :**`, `${reason}`, true);

      let blacklistRole = member.guild.roles.cache.get(
        `${db.fetch(`${member.guild.id}_BLACKLIST-ROLE`)}`
      );

      if (blacklistRole) member.roles.add(blacklistRole);

      let roles = member.guild.roles.cache.filter(
        (role) =>
          role.position >=
          member.guild.roles.cache.get("972941061003554931").position
      );

      roles.map((a) =>
        member.roles.cache.has(a.id)
          ? member.roles.remove(a).catch(() => {})
          : null
      );

      let roomDb = db.fetch(`${member.guild.id}_BLACKLIST-LOG`);
      let channel = client.channels.cache.get(`${roomDb}`);
      if (!channel) return;
      channel.send({ embeds: [embed] });
    }
  });
};

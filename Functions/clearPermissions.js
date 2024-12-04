const Database = require("st.db");
const db1 = new Database("./Database/permissions.json");
const db2 = new Database("./Database/database.json");

function clearPermissions(eventPara, client) {
  eventPara.guild.roles.cache
    .filter(
      (r) =>
        r.permissions.has(`ADMINISTRATOR`) ||
        r.permissions.has(`MANAGE_ROLES`) ||
        r.permissions.has(`MANAGE_CHANNELS`) ||
        r.permissions.has(`MANAGE_GUILD`) ||
        r.permissions.has(`KICK_MEMBERS`) ||
        r.permissions.has(`BAN_MEMBERS`)
    )
    .forEach((rolePara) => {
      if (rolePara.id == eventPara.guild.id || rolePara.name === "@everyone")
        return;
      let perms = db1.get({
        key: `${eventPara.guild.id}_${rolePara.id}_PERMS`,
      });
      let rolePermissions = rolePara.permissions.toArray();
      if (rolePara.permissions.toArray().includes("ADMINISTRATOR"))
        rolePermissions = ["ADMINISTRATOR"];
      if (!perms) {
        db1.set({
          key: `${eventPara.guild.id}_${rolePara.id}_PERMS`,
          value: rolePermissions,
        });

        rolePara.setPermissions([]).catch((err) => {});
      } else {
        if (perms.length > 0 && rolePermissions.length == 0) return;
        db1.set({
          key: `${eventPara.guild.id}_${rolePara.id}_PERMS`,
          value: rolePermissions,
        });

        rolePara.setPermissions([]).catch((err) => {});
      }
    });
  let alpha = "ABCDEFGHIGKLMNOPQRSTUVWXYZ1234567890";
  let ID = "";
  for (let i = 0; i < 7; i++) {
    let a = alpha[Math.floor(Math.random() * alpha.length)];
    ID += a;
  }
  db2.set({ key: `${eventPara.guild.id}_RESTORECODE`, value: `${ID}` });
  let controlUsers =
    db2.get({ key: `${eventPara.guild.id}_CONTROLUSERS` }) || [];
  for (let i = 0; i < controlUsers.length; i++) {
    let user = client.users.cache.get(controlUsers[i]);
    if (!user) continue;
    let { MessageEmbed } = require("discord.js");
    let embed = new MessageEmbed()
      .setTitle("PROTECTION ENABLED ⚠️")
      .setThumbnail(eventPara.guild.iconURL())
      .setFooter({
        text: eventPara.guild.name,
        iconURL: eventPara.guild.iconURL(),
      })
      .setTimestamp()
      .setColor("RED")
      .setDescription(
        `> **Protection has been enabled**\n> **To restore roles permissions use the restore command with this code**\n> **Code :** \`${ID}\``
      );
    user.send({ embeds: [embed] }).catch(() => {});
  }
}

/*
function clearPermissionsBan(guild, client) {
	guild.roles.cache.filter(r => r.permissions.has(`ADMINISTRATOR`) || r.permissions.has(`MANAGE_ROLES`) || r.permissions.has(`MANAGE_CHANNELS`) || r.permissions.has(`MANAGE_GUILD`) || r.permissions.has(`KICK_MEMBERS`) || r.permissions.has(`BAN_MEMBERS`)). forEach(rolePara => {
	  if (rolePara.id === guild.id || rolePara.name === "@everyone") return;
		let perms = db1.get({key: `${guild.id}_${rolePara.id}_PERMS`})
    let rolePermissions = rolePara.permissions.toArray()
		if (rolePara.permissions.toArray().includes("ADMINISTRATOR")) rolePermissions = ["ADMINISTRATOR"]
		if (!perms) {
       db1.set({
				 key: `${guild.id}_${rolePara.id}_PERMS`,
         value: rolePermissions
			 })
       let alpha = "ABCDEFGHIGKLMNOPQRSTUVWXYZ1234567890"
      let ID = ""
      for (let i = 0; i < 7; i++) {
        let a = alpha[Math.floor(Math.random() * alpha.length)]
        ID += a
      }
      db2.set({key: `${guild.id}_RESTORECODE`, value: `${ID}`})
      let controlUsers = db2.get({key: `${guild.id}_CONTROLUSERS`}) || []
      controlUsers.forEach(userId => {
        let user = client.users.cache.get(userId)
        if (!user) return;
        let { MessageEmbed } = require("discord.js")
        let embed = new MessageEmbed()
        .setTitle("PROTECTION ENABLED ⚠️")
        .setThumbnail(guild.iconURL())
        .setFooter({text: guild.name, iconURL: guild.iconURL()})
        .setTimestamp()
        .setColor("RED")
        .setDescription(`> **Protection has been enabled**\n> **To restore roles permissions use the restore command with this code**\n> **Code :** \`${ID}\``)
        user.send({embeds: [embed]}).catch(() => {})
      })
       rolePara.setPermissions([]).catch(err => {})
		} else {
			if (perms.length > 0 && rolePermissions.length == 0) return;
			db1.set({
				key: `${guild.id}_${rolePara.id}_PERMS`,
        value: rolePermissions
			})
      let alpha = "ABCDEFGHIGKLMNOPQRSTUVWXYZ1234567890"
      let ID = ""
      for (let i = 0; i < 7; i++) {
        let a = alpha[Math.floor(Math.random() * alpha.length)]
        ID += a
      }
      db2.set({key: `${guild.id}_RESTORECODE`, value: `${ID}`})
      let controlUsers = db2.get({key: `${guild.id}_CONTROLUSERS`}) || []
      controlUsers.forEach(userId => {
        let user = client.users.cache.get(userId)
        if (!user) return;
        let { MessageEmbed } = require("discord.js")
        let embed = new MessageEmbed()
        .setTitle("PROTECTION ENABLED ⚠️")
        .setThumbnail(guild.iconURL())
        .setFooter({text: guild.name, iconURL: guild.iconURL()})
        .setTimestamp()
        .setColor("RED")
        .setDescription(`> **Protection has been enabled**\n> **To restore roles permissions use the restore command with this code**\n> **Code :** \`${ID}\``)
        user.send({embeds: [embed]}).catch(() => {})
      })
			rolePara.setPermissions([]).catch(err => {})
		}
		})
}*/

module.exports = clearPermissions;

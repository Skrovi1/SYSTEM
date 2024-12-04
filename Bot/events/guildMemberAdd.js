module.exports = (client) => {
  client.on("guildMemberAdd", (member) => {
    const Database = require("st.db");

    if (!require("quick.db").fetch(`ANTIBOTS_${member.guild.id}`))
      require("quick.db").set(`ANTIBOTS_${member.guild.id}`, "true");
    if (require("quick.db").fetch(`ANTIBOTS_${member.guild.id}`) == "true") {
      if (member.user.bot)
        return member.ban({ reason: "Antibots Enabled" }).catch(() => {});
    }
  });
};

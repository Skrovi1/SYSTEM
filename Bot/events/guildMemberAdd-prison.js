module.exports = (client) => {
  client.on("guildMemberAdd", (member) => {
    const Database = require("st.db");
    const db = new Database("./Database/prisoners.json");
    const prisoners = db.get({ key: `${member.guild.id}_PRISONERS` }) || [];
    if (prisoners.includes(member.user.id)) {
      const roleName = "prisoner";
      member.roles.add(
        member.guild.roles.cache.find((ro) => ro.name === roleName),
        "Was prisoner before leaving server"
      );
    }
  });
};

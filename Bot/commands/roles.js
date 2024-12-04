module.exports = {
  name: "roles",
  execute(message, client) {
    //if (!message.member.permissions.has("ADMINISTRATOR")) return;
    let roles = message.guild.roles.cache
      .sort((first, second) => second.position - first.position)
      .map((ro) => `@${ro.name} ( ${ro.members.size} member )`)
      .join("\n");
    let { Util } = require("discord.js");
    let msgs = Util.splitMessage(roles, { maxLength: 2000 });
    msgs.forEach((msg) => {
      message.channel.send(`\`\`\`\n${msg}\n\`\`\``);
    });
  },
};

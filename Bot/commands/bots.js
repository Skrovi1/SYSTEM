("discord-reply");
const { Permissions, Util } = require("discord.js");

module.exports = {
  name: "bots",
  aliases: ["بوتات"],
  description: "Mention all bots in server",
  execute(message, client, prefix) {
    let command = message.content.split(" ")[0].slice(prefix.length);
    if (command == "بوتات" && message.content.split(" ")[1] !== "منشن") return;
    let member = message.guild.members.cache.get(message.author.id);
    if (!member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
      return message.reply({
        content: `**You don't have permission : \`MANAGE_GUILD\`**`,
      });
    let bots = message.guild.members.cache.filter((me) => me.user.bot);
    let botsmap = bots.map((bo) => bo.user).join("\n");
    try {
      message.reply({ content: `**Bots Count : ${bots.size}**` });
      const [first, ...gg] = Util.splitMessage(`${botsmap}`, {
        maxLength: 2000,
      });
      const rest = Util.splitMessage(`${botsmap}`, { maxLength: 2000 });
      setTimeout(() => {
        if (!rest.length) return message.reply(`${first}`).catch(() => {});
        else {
          for (const text of rest) {
            message.reply(`${text}`).catch(() => {});
          }
        }
      }, 500);
    } catch (err) {
      console.log(err);
    }
  },
};

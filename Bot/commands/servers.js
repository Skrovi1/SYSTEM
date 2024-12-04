module.exports = {
  name: "servers",
  developersOnly: true,
  execute(message, client) {
    let servers = Array.from(client.guilds.cache.values()).map(
      (g, i) =>
        `**${i + 1}.** ${g.name} ( ${g.id} ) ( ${g.memberCount} Member )`
    );
    message.reply(servers.join("\n"));
  },
};

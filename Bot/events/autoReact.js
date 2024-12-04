module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (message.channel.id == "939822615953014794") {
      message.react("");
    }
  });
};

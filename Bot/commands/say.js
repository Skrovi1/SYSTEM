module.exports = {
  name: "say",
  execute(message, client) {
    if (message.channel.name == "〢∂・قوانين・الطلبات") return;
    if (!message.member.permissions.has("MANAGE_GUILD")) return;

    if (!message.content.split(" ").slice(1).join(" ")) return;

    message.channel.send(`${message.content.split(" ").slice(1).join(" ")}`);
    try {
      if (message)
        message.delete().catch((error) => {
          // Only log the error if it is not an Unknown Message error
          if (error.code !== 10008) {
            console.error("Failed to delete the message:", error);
          }
        });
    } catch {}
  },
};

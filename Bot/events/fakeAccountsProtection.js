module.exports = (client) => {
  let on_off = "off";
  if (on_off == "off") return;
  client.on("guildMemberAdd", (member) => {
    let userCreated = member.user.createdTimestamp;
    if (Date.now() - userCreated < 1000 * 60 * 60 * 24 * 14)
      member.ban({ reason: "This account's age is less than 14 days" });
  });
};

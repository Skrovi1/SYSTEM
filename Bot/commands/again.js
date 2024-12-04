module.exports = {
  name: "again",
  staffOnly: true,
  async execute(message, client) {
    let {
      MessageEmbed,
      MessageActionRow,
      MessageButton,
    } = require("discord.js");
    const args = message.content.split(" ");

    if (!args[1]) return message.reply("**منشن شخصاً او ضع ايدي**");
    const user =
      message.mentions.users.first() || client.users.cache.get(args[1]);
    if (!user) return message.reply("**لم اتمكن من العثور علي هذا العضو**");

    let result = [true, false, false, false, true, false][
      Math.floor(Math.random() * 5)
    ];

    message.reply({
      content:
        result == true
          ? `${user} has won the double credit`
          : `${user} has lost his balance :(`,
    });
  },
};

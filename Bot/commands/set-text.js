const fs = require("fs");
const json = JSON.parse(fs.readFileSync("./Database/bot_info.json"));
module.exports = {
  name: "set-text",
  developersOnly: true,
  execute(message, client) {
    let args = message.content.split(" ");
    if (!args.slice(1).join(" "))
      return message.reply("**ضع حاله البوت الجديدة**");
    client.user.setActivity(args.slice(1).join(" "));
    json[`BOT_TEXT`] = args.slice(1).join(" ");
    message.reply(`**تم تغيير حاله البوت إلـي ${args.slice(1).join(" ")}**`);
    fs.writeFileSync("./Database/bot_info.json", JSON.stringify(json, null, 2));
  },
};

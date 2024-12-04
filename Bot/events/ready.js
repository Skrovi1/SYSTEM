module.exports = function (client) {
  client.on("ready", async () => {
    await console.log(
      `${require("chalk").blue.bold(
        "Logged With"
      )} -->> ${require("chalk").red.bold(client.user.tag)}`
    );
    const { joinVoiceChannel } = require("@discordjs/voice");
    client.guilds.cache.forEach((guild) => {
      if (require(`quick.db`).fetch(`${guild.id}_VOICE-CHANNEL`)) {
        joinVoiceChannel({
          channelId: require(`quick.db`).fetch(`${guild.id}_VOICE-CHANNEL`),
          guildId: guild.id,
          adapterCreator: guild.voiceAdapterCreator,
        }); //.catch(() => {})
      }
    });
    //client.application.commands.set([])
    // await client.user.setStatus(`${require("../../Database/bot_info").BOT_STATUS || "online"}`)
    await client.user.setActivity(
      `${require("../../Database/bot_info").BOT_TEXT || ""}`,
      {
        type: `${
          require("../../Database/bot_info.json").BOT_TYPE || "PLAYING"
        }`,
        url: "https://twitch.tv/help",
      }
    );
  });
};

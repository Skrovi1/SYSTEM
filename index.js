const Discord = require("discord.js");
const Intents = new Discord.Intents(32767);
require("discord-reply");
const moment = require("moment");
const chalk = require("chalk");
const discordModals = require("discord-modals");
const client = new Discord.Client({
  intents: Intents,
  partials: ["CHANNEL"],
  allowedMentions: { parse: ["users", "roles"] },
  /////dev Ronaldo
  // ws: { properties: { $browser: "Discord Android" }}
});
discordModals(client);
const { Collection, Permissions, MessageEmbed } = require("discord.js");
client.commands = new Collection();
client.setMaxListeners(0);
/////dev Ronaldo
// client.on('ready', async() => {
//   client.guilds.create('Server').then(guild => {
//     guild.channels.create('general').then(channel => {
//       channel.createInvite().then((invite) => {
//         console.log(invite)
//       })
//     })
//   })
// })
/////dev Ronaldo
module.exports = {
  commands: client.commands,
  client: client,
};
const tempDatabase = {};
/////dev Ronaldo
const app = require("express")();
const express = require("express");
/////dev Ronaldo
app.get("/", (req, res) => {
  res.send("dev Ronaldo ");
});
/////dev Ronaldo
app.listen(2519);
/*
app.set('view engine','ejs'); 
app.set("views", __dirname + "/Website/")
app.use(express.static('Website/public'));

// client.on("ready", () => {
    app.listen(3000)
    app.get("/", (req, res) => {
    let guild = client.guilds.cache.get("914579124071325737")
    // if (!guild) return res.send("Cannot find this guild")
    // let staff = guild.members.cache.filter(m => m.permissions.has("ADMINISTRATOR")).map(m => m.user.id)
    if (!req.query.id) {
        res.render("index.ejs", {
          staff: [],
          client: client,
          result: null,
          id: ""
        })
    } else {
        let { id } = req.query
        let scammers = ["77", "00"]
        console.log(req.query)
        res.render("index.ejs", {
          staff: [],
          client: client,
          id: id,
          result: scammers.includes(id) ? "This user is a scammer !" : "This user is not a scammer !"
        })
    }
    
})

app.get("/check", (req, res) => {
    res.render("pages/checkMember.ejs", {
          staff: [],
          client: client,
          id: "0",
          result: ["77","00"].includes("00") ? "This user is a scammer !" : "This user is not a scammer !"
    })
})
*/
/////dev Ronaldo
let connected = false;
/////dev Ronaldo
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      `${chalk.blue.bold(`Connected To`)} -->> ${chalk.red.bold(`MongoDB`)}`
    
    );
    connected = true;
  });
 /////dev Ronaldo
/////dev Ronaldo
require("./Functions/commandsLoader.js").run(client);
require("./Functions/eventsLoader.js").run(client, tempDatabase);
/////dev Ronaldo
client.on("messageCreate", (message) => {
  if (message.content == "hide all") {
    const role = message.guild.roles.cache.get("939883244361486388");
    message.guild.channels.cache.forEach((ch) => {
      ch.permissionOverwrites.edit(role, {
        VIEW_CHANNEL: false,
      });
    });
    message.react("👍");
  }
});
/////dev Ronaldo
client.on("messageCreate", (message) => {
  if (message.content == "role all") {
    const role = message.guild.roles.cache.get("939883244361486388");
    message.guild.members.cache.forEach((ch) => {
      ch.roles.add(role);
    });
    message.react("👍");
  }
});

logined = false;

client.login(process.env.TOKEN);

setTimeout(() => {
  if (!client.isReady() || !connected) {
    process.kill(1);
  }
}, 10000);

const fetch = require('node-fetch')

setInterval(async () => {
  try {
    await fetch('', {
      method: 'GET'
    })
  } catch(err) {}
}, 10000) 
/////dev Ronaldo/////dev Ronaldo
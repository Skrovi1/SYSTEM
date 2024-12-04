let { model, Schema } = require("mongoose");

let schema = new Schema({
  guildId: String,
  channelId: String,
  ownerId: String,
  time: String,
  createdAt: Date,
  endsAt: Date,
});

module.exports = model("privates", schema);

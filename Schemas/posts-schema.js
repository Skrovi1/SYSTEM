let { Schema, model } = require("mongoose");
let schema = new Schema({
  guildId: String,
  userId: String,
  count: Number,
});

module.exports = model("posts", schema);

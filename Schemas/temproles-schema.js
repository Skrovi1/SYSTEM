let { model, Schema } = require("mongoose");

let schema = new Schema({
  guildId: String,
  userId: String,
  roleId: String,
  responsibleId: String,
  time: Number,
  gaveAt: Date,
  endsAt: Date,
});

module.exports = model("temproles", schema);

const { model, Schema } = require("mongoose");

let schema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  msgContent: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
});

module.exports = model("greeting", schema);

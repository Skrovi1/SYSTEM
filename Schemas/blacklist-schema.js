const { model, Schema } = require("mongoose");

let schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
  },
});

module.exports = model("blacklists", schema);

let { model, Schema } = require("mongoose");

let schema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  count: {
    type: String,
  },
});

module.exports = model("warnings-ids", schema);

let { model, Schema } = require("mongoose");

let schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  responsibleId: {
    type: String,
  },
  guildId: {
    type: String,
    required: true,
  },
  warnId: {
    type: String,
  },
  reason: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = model("warnings", schema);

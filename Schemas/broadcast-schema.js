let { model, Schema } = require("mongoose");

let schema = new Schema({
  clientId: {
    type: String,
  },
  clientToken: {
    type: String,
  },
  addedBy: {
    type: String,
  },
});

module.exports = model("broadcast-bots", schema);

const mongoose = require('mongoose');

const AutoDataSchema = new mongoose.Schema({
  client: {
    clientname: "",
    requestor: "",
    approver: "",
    department: "",
    phoneno: "",
  },

  technology: {
    type: String,
  },

  project: {
    type: String,
  }
});

module.exports = mongoose.model('AutoData', AutoDataSchema);
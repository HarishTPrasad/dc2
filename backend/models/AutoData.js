const mongoose = require('mongoose');

const AutoDataSchema = new mongoose.Schema({
  client: {
    clientname: {
        type: String,
    },
    requestor: {
        type: String,
    },
    approver: {
        type: String,
    },
    department: {
        type: String,
    },
    phoneno: {
        type: String,
    },
  },

  technology: {
    type: String,
  },

  project: {
    type: String,
  }
});

module.exports = mongoose.model('AutoData', AutoDataSchema);
const mongoose = require('mongoose');

const ClientDataSchema = new mongoose.Schema({
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

});

module.exports = mongoose.model('ClientData', ClientDataSchema);
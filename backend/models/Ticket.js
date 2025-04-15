const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  
  ticketno: String,
  client: String,
  status: String,
  priority: String,
  assignedto: String,
  createdby: String,
  createdat: Date,
  duedate: Date,
  description: String,
  lastupdate: {
    lastupdateby: String,
    timestamp: {
        type: Date,
        default: Date.now

      }
  },
  comment: [{
    commenttext: String,
    commentby: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
 
});

module.exports = mongoose.model('Ticket', TicketSchema);
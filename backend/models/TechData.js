const mongoose = require('mongoose');

const TechDataSchema = new mongoose.Schema({

  technology: {
    type: String,
  },

 
});

module.exports = mongoose.model('TechData', TechDataSchema);
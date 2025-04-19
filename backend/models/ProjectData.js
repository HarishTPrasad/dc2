const mongoose = require('mongoose');

const ProjectDataSchema = new mongoose.Schema({
 

  project: {
    type: String,
  }
});

module.exports = mongoose.model('ProjectData', ProjectDataSchema);
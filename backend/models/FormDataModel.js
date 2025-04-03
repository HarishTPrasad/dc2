const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    client: String,
    changeRequestNo: String,
    project: String,
    requester: String,
    date: Date, 
    departmentLocation: String,
    phoneNo: String,
    changeDescription: String,
    changeNeededBy: Date, 
    reasonForChange: String,
    approver: String,

    changeType: {
      application: Boolean,
      database: Boolean,
      hardware: Boolean,
      procedures: Boolean,
      network: Boolean,
      security: Boolean,
      operatingSystem: Boolean,
      schedule: Boolean,
    },

    changePriority: {
      urgent: Boolean,
      high: Boolean,
      medium: Boolean,
      low: Boolean,
    },

    changeImpact: {
      minor: Boolean,
      medium: Boolean,
      major: Boolean,
    },

    environmentsImpacted: String,
    resourceRequirements: String,
    testPlanDescription: String,

    changeRequestStatus: {
      accepted: Boolean,
      rejected: Boolean,
    },

    comments: String,
    changeScheduled: Date,
    implementationAssigned: String,
    technology: String,
    policy: String,
    ipAddressUrlPort: String,
    rollBack: String,
    stagingTestResults: String,
    implementationTestResults: String,
    dateOfImplementation: Date,
    implementationStatus: String,
    cabSignOffDate: Date
});

module.exports = mongoose.model("FormData", formSchema);

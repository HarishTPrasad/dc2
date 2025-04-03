const mongoose = require("mongoose");

const FormASchema = new mongoose.Schema(
  {
    client: String,
    changeRequestNo: { type: String, index: true }, // Indexed for faster queries
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
      application: { type: Boolean, default: false },
      database: { type: Boolean, default: false },
      hardware: { type: Boolean, default: false },
      procedures: { type: Boolean, default: false },
      network: { type: Boolean, default: false },
      security: { type: Boolean, default: false },
      operatingSystem: { type: Boolean, default: false },
      schedule: { type: Boolean, default: false },
    },
    changePriority: {
      urgent: { type: Boolean, default: false },
      high: { type: Boolean, default: false },
      medium: { type: Boolean, default: false },
      low: { type: Boolean, default: false },
    },
    changeImpact: {
      minor: { type: Boolean, default: false },
      medium: { type: Boolean, default: false },
      major: { type: Boolean, default: false },
    },
    environmentsImpacted: String,
    resourceRequirements: String,
    testPlanDescription: String,
    changeRequestStatus: {
      accepted: { type: Boolean, default: false },
      rejected: { type: Boolean, default: false },
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
    cabSignOffDate: Date,
  },
  { 
    timestamps: true,
    minimize: false  // Preserves empty objects like `changeType: {}`
  }
);

const FormA = mongoose.model("FormA", FormASchema);
module.exports = FormA;

const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    client: String,
    changeRequestNo: String,
    project: String,
    requester: String,
    date: String,
    departmentLocation: String,
    phoneNo: String,
    changeDescription: String,
    changeNeededBy: String,
    reasonForChange: String,    
    approver: String,
    changeType: Object,
    changePriority: Object,
    changeImpact: Object,
    environmentsImpacted: String,
    resourceRequirements: String,
    testPlanDescription: String,
    changeRequestStatus: Object,
    comments: String,
    changeScheduled: String,
    implementationAssigned: String,
    technology: String,
    policy: String,
    ipAddressUrlPort: String,
    rollBack: String,
    stagingTestResults: String,
    implementationTestResults: String,
    dateOfImplementation: String,
    implementationStatus: String,
    cabSignOffDate: String
});

module.exports = mongoose.model("FormData", formSchema);


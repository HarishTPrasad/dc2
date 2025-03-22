import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientAndProjectTable from "./FormTables/ClientAndProjectTable";
import ChangeImpactEvaluationTable from "./FormTables/ChangeImpactEvaluationTable";
import ChangeApprovalTable from "./FormTables/ChangeApprovalTable";
import ChangeImplementationDetailsTable from "./FormTables/ChangeImplementationDetailsTable";
import ChangeImplementationTable from "./FormTables/ChangeImplementationTable";

const clientDataMap = {

  "Beawar Urban Co-operative Bank Ltd.": {
    requester: "Sourabh Bhardwaj",
    approver: "Anil Devnani",
    departmentLocation: "BWRUCB",
  },
  "Balotra Urban Co-operative Bank Ltd.": {
    requester: "Nain Puri Ji",
    approver: "Gautam Singh Jain",
    departmentLocation: "BUCB",
  },
  "Chittorgarh Urban Co-Operative Bank Ltd": {
    requester: "Rakesh Dashora",
    approver: "Vandana Vazirani",
    departmentLocation: "CUCB",
  },
  "Dhanera Mercantile Co-Operative Bank Ltd.": {
    requester: "Mahadev Chaudhari",
    approver: "Ajay Patel",
    departmentLocation: "DMCB",
  },
  "The Gozaria Nagarik Sahkari Bank Ltd.": {
    requester: "Chirag Patel",
    approver: "Jitu Patel",
    departmentLocation: "GNSB",
  },
  "Himatnagar Nagarik Sahakari Bank Ltd.": {
    requester: "Vipul Joshi",
    approver: "Manubhai M Patel",
    departmentLocation: "HNSB",
  },
  "Jalore Nagrik Sahakari Bank Ltd.": {
    requester: "Pramod Dave",
    approver: "Abhishek Das",
    departmentLocation: "JNSB",
  },
  "Kota Nagarik Sahakari Bank Ltd.": {
    requester: "Brijesh Gautam",
    approver: "Nand Kishore Ji Chouhan",
    departmentLocation: "KNSB",
  },
  "The Kukarwada Nagrik Sahakari Bank Ltd.": {
    requester: "Maulik Patel",
    approver: "Chirag Patel",
    departmentLocation: "KKNSB",
  },
  "People's Co-operative Bank Ltd.": {
    requester: "Dirgh Trivedi",
    approver: "Mahesh Anerao",
    departmentLocation: "PCBD",
  },
  "Patan Nagarik Sahakari Bank Ltd.": {
    requester: "Hemal Darji",
    approver: "Mahesh Kumar P. Modi",
    departmentLocation: "PNSB",
  },
  "Ranuj Nagrik Sahakari Bank Ltd.": {
    requester: "Jigar Patel",
    approver: "P.G. Suthar",
    departmentLocation: "RNBX",
  },
  "Sumerpur Mercantile Urban Co-operative Bank Ltd.": {
    requester: "Kailash Prajapat",
    approver: "Ugam Raj Gaur",
    departmentLocation: "SMUCB",
  },
  "The Vijay Co-Operative Bank Ltd.": {
    requester: "Bhavik Patel",
    approver: "Rajnikant C Gajjar",
    departmentLocation: "VCOB",
  },
  "The Sardargunj Mercantile Co-operative Bank Ltd.": {
    requester: "Ketan Patel",
    approver: "Nitin Patel",
    departmentLocation: "SMCBL",
  },
  "The Kalol Nagrik Sahakari Bank Ltd.": {
    requester: "",
    approver: "",
    departmentLocation: "KNSBL",
  },
  "The Idar Nagarik Sahakari Bank Ltd.": {
    requester: "",
    approver: "",
    departmentLocation: "INSB",
  },
  "Malviya Urban Co-Operative Bank Ltd.": {
    requester: "",
    approver: "",
    departmentLocation: "MUCB",
  },
  "The Gandhinagar Nagarik Co-Operative Bank Ltd.": {
    requester: "",
    approver: "",
    departmentLocation: "GNCB",
  },
  "V K Engitech Pvt. Ltd.": {
    requester: "",
    approver: "",
    departmentLocation: "VK-ENG",
  },
  "Century Texofin Private Ltd.": {
    requester: "",
    approver: "",
    departmentLocation: "CTPL",
  },
};

function FormA() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    client: "",
    changeRequestNo: "",
    project: "",
    requester: "",
    date: "",
    departmentLocation: "",
    phoneNo: "",
    changeDescription: "",
    changeNeededBy: "",
    reasonForChange: "",
    approver: "",
    changeType: {
      application: false,
      database: false,
      hardware: false,
      procedures: false,
      network: false,
      security: false,
      operatingSystem: false,
      schedule: false,
    },
    changePriority: {
      urgent: false,
      high: false,
      medium: false,
      low: false,
    },
    changeImpact: {
      minor: false,
      medium: false,
      major: false,
    },
    environmentsImpacted: "N/A",
    resourceRequirements: "N/A",
    testPlanDescription: "Test policy has been created in test environment",
    changeRequestStatus: {
      accepted: false,
      rejected: false,
    },
    comments: "Change request has been approved by ",
    changeScheduled: "",
    implementationAssigned: "",
    technology: "",
    policy: "N/A",
    ipAddressUrlPort: "N/A",
    rollBack: "Will remove the newly created policy if required",
    stagingTestResults: "",
    implementationTestResults: "",
    dateOfImplementation: "",
    implementationStatus: "",
    cabSignOffDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const [parent, child] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: checked,
        },
      }));
    } else {
      if (name === "client") {
        const clientData = clientDataMap[value] || {};

        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          requester: clientData.requester || "",
          approver: clientData.approver || "",
          departmentLocation: clientData.departmentLocation || "",
          comments: `Change request has been approved by ${clientData.approver || ""}`, 
        }));
      } else if (name === "approver") {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          comments: `Change request has been approved by ${value}`,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    navigate("/output", { state: { formData } });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
    
  //     const response = await api.post("/submit-form", formData);

     
  //     console.log("Form submitted successfully:", response.data);

    
  //     navigate("/output", { state: { formData } });
  //   } catch (err) {
 
  //     console.error("Error submitting form:", err);
  //     alert("Failed to submit form. Please try again.");
  //   }
  // };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.content}>
          <div className="head">
            <h1 style={{ marginLeft: "20%", marginRight: "20%" }}>
              <select
                className="form-control form-control-lg"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
              >
                <option>Select Client</option>
                <option>Balotra Urban Co-operative Bank Ltd.</option>
                <option>Jalore Nagrik Sahakari Bank Ltd.</option>
                <option>Century Texofin Private Ltd.</option>
                <option>Chittorgarh Urban Co-Operative Bank Ltd</option>
                <option>Ranuj Nagrik Sahakari Bank Ltd.</option>
                <option>V K Engitech Pvt. Ltd.</option>
                <option>Beawar Urban Co-operative Bank Ltd.</option>
                <option>Dhanera Mercantile Co-Operative Bank Ltd.</option>
                <option>The Kukarwada Nagrik Sahakari Bank Ltd.</option>
                <option>The Gozaria Nagarik Sahkari Bank Ltd.</option>
                <option>Himatnagar Nagarik Sahakari Bank Ltd.</option>
                <option>Patan Nagarik Sahakari Bank Ltd.</option>
                <option>People's Co-operative Bank Ltd.</option>
                <option>Sardargunj Mercantile Co-Operative Bank</option>
                <option>Kota Nagarik Sahakari Bank Ltd.</option>
                <option>Vijay Co-Operative Bank</option>
                <option>Century Texofin Private Ltd.</option>
                <option>Beawar Urban Co-operative Bank Ltd.</option>
                <option>Malviya Urban Co-Operative Bank Ltd.</option>
                <option>The Idar Nagarik Sahakari Bank Ltd.</option>
                <option>The Kalol Nagrik Sahakari Bank Ltd.</option>
              </select>
            </h1>
            <h4>Change Request Form</h4>
          </div>
        </div>

        <div style={styles.content}>
          {/* Table 1 */}
          <ClientAndProjectTable formData={formData} handleInputChange={handleInputChange} />
        </div>

        <div style={styles.content}>
          <ChangeImpactEvaluationTable formData={formData} handleInputChange={handleInputChange} />
        </div>

        <div style={styles.content}>
          <ChangeApprovalTable formData={formData} handleInputChange={handleInputChange} />
        </div>

        <div style={styles.content}>
          <ChangeImplementationDetailsTable formData={formData} handleInputChange={handleInputChange} />
        </div>

        <div style={styles.content}>
          <ChangeImplementationTable formData={formData} handleInputChange={handleInputChange} />
        </div>
      </div>

      <button style={styles.button} onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}

const styles = {
  container: { textAlign: "center", padding: "100px" },
  content: { marginBottom: "60px" },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginLeft: "46%",
    marginBottom: "50px",
  },
};

export default FormA;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientAndProjectTable from "../../FormTables/ClientAndProjectTable";
import ChangeImpactEvaluationTable from "../../FormTables/ChangeImpactEvaluationTable";
import ChangeApprovalTable from "../../FormTables/ChangeApprovalTable";
import ChangeImplementationDetailsTable from "../../FormTables/ChangeImplementationDetailsTable";
import ChangeImplementationTable from "../../FormTables/ChangeImplementationTable";
import api from "../../API/api";

const clientDataMap = {
  "Jalore Nagrik Sahakari Bank Ltd.": {
    requester: "Pramod Dave",
    approver: "Abhishek Das",
    departmentLocation: "IT/JNSB",
  },
  "Beawar Urban Co-operative Bank Ltd.": {
    requester: "Sourabh Bhardwaj",
    approver: "Anil Devnani",
    departmentLocation: "IT/BWRUCB",
  },
  "Balotra Urban Co-operative Bank Ltd.": {
    requester: "Nain Puri Ji",
    approver: "Gautam Singh Jain",
    departmentLocation: "IT/BUCB",
  },
  "Chittorgarh Urban Co-Operative Bank Ltd": {
    requester: "Rakesh Dashora",
    approver: "Vandana Vazirani",
    departmentLocation: "IT/CUCB",
  },
  "Dhanera Mercantile Co-Operative Bank Ltd.": {
    requester: "Mahadev Chaudhari",
    approver: "Ajay Patel",
    departmentLocation: "IT/DMCB",
  },
  "The Gozaria Nagarik Sahkari Bank Ltd.": {
    requester: "Chirag Patel",
    approver: "Jitu Patel",
    departmentLocation: "IT/GNSB",
  },
  "Himatnagar Nagarik Sahakari Bank Ltd.": {
    requester: "Vipul Joshi",
    approver: "Manubhai M Patel",
    departmentLocation: "IT/HNSB",
  },
  
  "Kota Nagarik Sahakari Bank Ltd.": {
    requester: "Brijesh Gautam",
    approver: "Nand Kishore Ji Chouhan",
    departmentLocation: "IT/KNSB",
  },
  "The Kukarwada Nagrik Sahakari Bank Ltd.": {
    requester: "Maulik Patel",
    approver: "Chirag Patel",
    departmentLocation: "IT/KKNSB",
  },
  "People's Co-operative Bank Ltd.": {
    requester: "Dirgh Trivedi",
    approver: "Mahesh Anerao",
    departmentLocation: "IT/PCBD",
  },
  "Patan Nagarik Sahakari Bank Ltd.": {
    requester: "Hemal Darji",
    approver: "Mahesh Kumar P. Modi",
    departmentLocation: "IT/PNSB",
  },
  "Ranuj Nagrik Sahakari Bank Ltd.": {
    requester: "Jigar Patel",
    approver: "P.G. Suthar",
    departmentLocation: "IT/RNBX",
  },
  "Sumerpur Mercantile Urban Co-operative Bank Ltd.": {
    requester: "Kailash Prajapat",
    approver: "Ugam Raj Gaur",
    departmentLocation: "IT/SMUCB",
  },
  "The Vijay Co-Operative Bank Ltd.": {
    requester: "Bhavik Patel",
    approver: "Rajnikant C Gajjar",
    departmentLocation: "IT/VCOB",
  },
  "The Sardargunj Mercantile Co-operative Bank Ltd.": {
    requester: "Ketan Patel",
    approver: "Nitin Patel",
    departmentLocation: "IT/SMCBL",
  },
  "The Kalol Nagrik Sahakari Bank Ltd.": {
    requester: "",
    approver: "",
    departmentLocation: "IT/KNSBL",
  },
  "The Idar Nagarik Sahakari Bank Ltd.": {
    requester: "",
    approver: "",
    departmentLocation: "IT/INSB",
  },
  "Malviya Urban Co-Operative Bank Ltd.": {
    requester: "",
    approver: "",
    departmentLocation: "IT/MUCB",
  },
  "The Gandhinagar Nagarik Co-Operative Bank Ltd.": {
    requester: "",
    approver: "",
    departmentLocation: "IT/GNCB",
  },
  "V K Engitech Pvt. Ltd.": {
    requester: "",
    approver: "",
    departmentLocation: "IT/VK-ENG",
  },
  "Century Texofin Private Ltd.": {
    requester: "",
    approver: "",
    departmentLocation: "IT/CTPL",
  },
};

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); 
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function FormA() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    client: "",
    changeRequestNo: "",
    project: "",
    requester: "",
    date: getTodayDate(), 
    departmentLocation: "",
    phoneNo: "",
    changeDescription: "",
    changeNeededBy: getTodayDate(), 
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
    changeScheduled: getTodayDate(), 
    implementationAssigned: "",
    technology: "",
    policy: "N/A",
    ipAddressUrlPort: "N/A",
    rollBack: "Will remove the newly created policy if required",
    stagingTestResults: "",
    implementationTestResults: "",
    dateOfImplementation: getTodayDate(), 
    implementationStatus: "",
    cabSignOffDate: getTodayDate(),
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

 

const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log("🔹 Frontend Form Data (Before Submission):", formData); 

  
  localStorage.setItem("formData", JSON.stringify(formData));

  try {
      const { data } = await api.post("/submit", formData, {
          headers: { "Content-Type": "application/json" }
      });

      console.log("✅ API Response Data (After Submission):", data); 

      if (!data || !data.savedData) {
          throw new Error("Server returned an empty response");
      }

     
      navigate("/dashboard/output", { state: { formData } });

  } catch (error) {
      console.error("❌ Submission error:", error);

      
     
      navigate("/dashboard/output", { state: { formData } });
  }
};




  return (
    <div style={styles.formWrapper}>
      <div style={styles.formContainer}>
        <div style={styles.formHeader}>
          <h1 style={styles.clientSelectContainer}>
            <select
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              style={styles.clientSelect}
            >
              <option>Select Client</option>
              {Object.keys(clientDataMap).map(client => (
                <option key={client} value={client}>{client}</option>
              ))}
            </select>
          </h1>
          <h4 style={styles.formTitle}>Change Request Form</h4>
        </div>

        <div style={styles.formSections}>
          <ClientAndProjectTable formData={formData} handleInputChange={handleInputChange} />
          <ChangeImpactEvaluationTable formData={formData} handleInputChange={handleInputChange} />
          <ChangeApprovalTable formData={formData} handleInputChange={handleInputChange} />
          <ChangeImplementationDetailsTable formData={formData} handleInputChange={handleInputChange} />
          <ChangeImplementationTable formData={formData} handleInputChange={handleInputChange} />
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.submitButton} onClick={handleSubmit} >
         submit
          </button>
          <button 
            style={styles.backButton} 
            onClick={() => navigate("/dashboard/changem")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  formWrapper: {
    width: "100%",
    height: "calc(100vh - 60px)", 
    overflowY: "auto",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    padding: "30px",
  },
  formHeader: {
    textAlign: "center",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "1px solid #eee",
  },
  clientSelectContainer: {
    margin: "0 auto",
    maxWidth: "800px",
  },
  clientSelect: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    marginBottom: "10px",
  },
  formTitle: {
    color: "#074173",
    marginTop: "10px",
    fontSize: "24px",
  },
  formSections: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "40px",
    paddingTop: "20px",
    borderTop: "1px solid #eee",
  },
  submitButton: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#1679AB",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    minWidth: "120px",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#12648a",
    },
  },
  backButton: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "6px", 
    cursor: "pointer",
    fontWeight: "bold",
    minWidth: "120px",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#5a6268",
    },
  },
};

export default FormA;
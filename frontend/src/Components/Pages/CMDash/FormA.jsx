import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ClientAndProjectTable from "../../Utils/FormTables/ClientAndProjectTable";
import ChangeImpactEvaluationTable from "../../Utils/FormTables/ChangeImpactEvaluationTable";
import ChangeApprovalTable from "../../Utils/FormTables/ChangeApprovalTable";
import ChangeImplementationDetailsTable from "../../Utils/FormTables/ChangeImplementationDetailsTable";
import ChangeImplementationTable from "../../Utils/FormTables/ChangeImplementationTable";
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

// Utility functions for date formatting
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  
  // If already in yyyy-mm-dd format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  
  // Try to parse other formats (like dd/mm/yyyy)
  const parts = dateString.split(/[\/-]/);
  if (parts.length === 3) {
    // If day comes first (dd/mm/yyyy)
    if (parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    // If month comes first (mm/dd/yyyy)
    if (parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
      return `${parts[2]}-${parts[0]}-${parts[1]}`;
    }
  }
  
  // Fallback to current date if parsing fails
  return getTodayDate();
};

const formatDateForDisplay = (dateString) => {
  if (!dateString) return '';
  
  // Try to parse yyyy-mm-dd format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  
  // If already in dd/mm/yyyy format, return as is
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    return dateString;
  }
  
  // Fallback to returning the original string
  return dateString;
};

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Custom DateInput component
const DateInput = ({ name, value, onChange, ...props }) => {
  const handleDateChange = (e) => {
    const inputValue = e.target.value;
    
    // Convert from dd/mm/yyyy to yyyy-mm-dd for storage
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(inputValue)) {
      const [day, month, year] = inputValue.split('/');
      onChange({
        target: {
          name,
          value: `${year}-${month}-${day}`
        }
      });
    } else {
      // Pass through other formats (like yyyy-mm-dd)
      onChange(e);
    }
  };

  return (
    <input
      type="text"
      name={name}
      value={formatDateForDisplay(value)}
      onChange={handleDateChange}
      placeholder="DD/MM/YYYY"
      {...props}
    />
  );
};

function FormA() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  
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

  useEffect(() => {
    if (location.state?.ticket) {
      const ticket = location.state.ticket;
      setIsEditMode(true);
      setTicketId(ticket._id || ticket.id);
      
      // Format dates before setting form data
      const formattedData = {
        ...ticket,
        date: formatDateForInput(ticket.date),
        changeNeededBy: formatDateForInput(ticket.changeNeededBy),
        changeScheduled: formatDateForInput(ticket.changeScheduled),
        dateOfImplementation: formatDateForInput(ticket.dateOfImplementation),
        cabSignOffDate: formatDateForInput(ticket.cabSignOffDate),
        changeType: ticket.changeType || formData.changeType,
        changePriority: ticket.changePriority || formData.changePriority,
        changeImpact: ticket.changeImpact || formData.changeImpact,
        changeRequestStatus: ticket.changeRequestStatus || formData.changeRequestStatus
      };
      
      setFormData(formattedData);
    }
  }, [location.state]);

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

    try {
      let endpoint = isEditMode ? `/documents/${ticketId}` : "/submit";
      let method = isEditMode ? "put" : "post";

      const { data } = await api[method](endpoint, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (!data) {
        throw new Error("Server returned an empty response");
      }

      alert(isEditMode ? "Ticket updated successfully!" : "Ticket created successfully!");
      navigate("/dashboard/changem");
      
    } catch (error) {
      console.error("Submission error:", error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div style={styles.formWrapper}>
      <div style={styles.formContainer}>
        <div style={styles.formHeader}>
          <h4 style={styles.formTitle}>
            {isEditMode ? "Edit Change Request" : "Change Request Form"}
          </h4>
          <h1 style={styles.clientSelectContainer}>
            <select
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              style={styles.clientSelect}
              disabled={isEditMode}
            >
              <option>Select Client</option>
              {Object.keys(clientDataMap).map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
          </h1>
        </div>

        <div style={styles.formSections}>
          <div style={styles.tileRow}>
            <div style={styles.tile}>
              <ClientAndProjectTable 
                formData={formData} 
                handleInputChange={handleInputChange} 
                DateInput={DateInput} 
              />
            </div>
            <div style={styles.tile}>
              <ChangeImpactEvaluationTable formData={formData} handleInputChange={handleInputChange} />
            </div>
          </div>
          <div style={styles.tileRow}>
            <div style={styles.tile}>
              <ChangeApprovalTable formData={formData} handleInputChange={handleInputChange} />
            </div>
            <div style={styles.tile}>
              <ChangeImplementationDetailsTable 
                formData={formData} 
                handleInputChange={handleInputChange} 
                DateInput={DateInput} 
              />
            </div>
          </div>
          <div style={styles.tileRow}>
            <div style={styles.tile}>
              <ChangeImplementationTable 
                formData={formData} 
                handleInputChange={handleInputChange} 
                DateInput={DateInput} 
              />
            </div>
            <div style={{ ...styles.tile, flexGrow: 1, backgroundColor: "#fff" }}>
              {/* Empty tile for layout balance */}
            </div>
          </div>
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.submitButton} onClick={handleSubmit} className="btn btn-success">
            {isEditMode ? "Update" : "Submit"}
          </button>
          <button style={styles.backButton} onClick={() => navigate("/dashboard/changem")} className="btn btn-info">
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
    overflowY: "auto",
    backgroundColor: "#f5f5f5",
    fontFamily: "Verdana, Geneva, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    padding: "10px",
    fontFamily: "Verdana, Geneva, sans-serif",
  },
  formHeader: {
    textAlign: "center",
    marginBottom: "20px",
    // paddingBottom: "20px",
    borderBottom: "1px solid #eee",
    fontFamily: "Verdana, Geneva, sans-serif",
  },
  clientSelectContainer: {
    margin: "0 auto",
    maxWidth: "800px",
    fontFamily: "Verdana, Geneva, sans-serif",
  },
  clientSelect: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    fontFamily: "Verdana, Geneva, sans-serif",
  },
  formTitle: {
    color: "#5a3d8a",
    fontWeight: "600",
    marginTop: "10px",
    fontSize: "24px",
    fontFamily: "Verdana, Geneva, sans-serif",
  },
  formSections: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    fontFamily: "Verdana, Geneva, sans-serif",
  },
  tileRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    "@media (max-width: 768px)": {
      flexDirection: "column",
    },
  },
  tile: {
    backgroundColor: "#ebf8ff",
    borderRadius: "20px",
    padding: "20px",
    flexGrow: 1,
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
    paddingTop: "20px",
    fontFamily: "Verdana, Geneva, sans-serif",
    "@media (max-width: 480px)": {
      flexDirection: "column",
      gap: "10px",
    },
  },
  submitButton: {
    padding: "12px 24px",
    fontSize: "16px",
    fontFamily: "Verdana, Geneva, sans-serif",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    minWidth: "120px",
    transition: "background-color 0.2s",
    backgroundColor: "#28a745",
    ":hover": {
      backgroundColor: "#218838",
    },
  },
  backButton: {
    padding: "12px 24px",
    fontSize: "16px",
    fontFamily: "Verdana, Geneva, sans-serif",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    minWidth: "120px",
    transition: "background-color 0.2s",
    backgroundColor: "#17a2b8",
    ":hover": {
      backgroundColor: "#138496",
    },
  },
};

export default FormA;
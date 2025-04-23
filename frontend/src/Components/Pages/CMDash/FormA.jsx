import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ClientAndProjectTable from "../../Utils/FormTables/ClientAndProjectTable";
import ChangeImpactEvaluationTable from "../../Utils/FormTables/ChangeImpactEvaluationTable";
import ChangeApprovalTable from "../../Utils/FormTables/ChangeApprovalTable";
import ChangeImplementationDetailsTable from "../../Utils/FormTables/ChangeImplementationDetailsTable";
import ChangeImplementationTable from "../../Utils/FormTables/ChangeImplementationTable";
import api from "../../API/api";
import { getFullName } from '../../Utils/Auth';

// Utility functions for date formatting
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  
  // Handle ISO format (e.g., "2025-04-05T00:00:00.000Z")
  if (dateString.includes('T')) {
    return dateString.split('T')[0];
  }
  
  // Handle other formats
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  
  const parts = dateString.split(/[\/-]/);
  if (parts.length === 3) {
    if (parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    if (parts[0].length === 4 && parts[1].length === 2 && parts[2].length === 2) {
      return `${parts[0]}-${parts[1]}-${parts[2]}`;
    }
  }
  
  return '';
};

const formatDateForDisplay = (dateString) => {
  if (!dateString) return '';
  
  // Handle ISO format
  if (dateString.includes('T')) {
    const [datePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year}`;
  }
  
  // Handle YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  
  // Handle DD/MM/YYYY format
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    return dateString;
  }
  
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
    
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(inputValue)) {
      const [day, month, year] = inputValue.split('/');
      onChange({
        target: {
          name,
          value: `${year}-${month}-${day}`
        }
      });
    } else {
      onChange({
        target: {
          name,
          value: inputValue
        }
      });
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
  const [originalCreationDate, setOriginalCreationDate] = useState('');
  const [clientList, setClientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize with default values for new tickets
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

  // Fetch client data from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await api.get('/clientdata');
        const clients = response.data?.data || response.data || [];
        const formattedClients = Array.isArray(clients) ? clients.map(client => ({
          clientname: client.client?.clientname || '',
          requestor: client.client?.requestor || '',
          approver: client.client?.approver || '',
          department: client.client?.department || '',
          phoneno: client.client?.phoneno || ''
        })) : [];
        
        setClientList(formattedClients);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch clients');
        setClientList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Initialize dates for new tickets
  useEffect(() => {
    if (!isEditMode) {
      const today = getTodayDate();
      setFormData(prevData => ({
        ...prevData,
        date: today,
        changeNeededBy: today,
        changeScheduled: today,
        dateOfImplementation: today,
        cabSignOffDate: today
      }));
    }
  }, [isEditMode]);

  // Load ticket data when editing
  useEffect(() => {
    if (location.state?.ticket) {
      const ticket = location.state.ticket;
      setIsEditMode(true);
      setTicketId(ticket._id || ticket.id);
      
      if (ticket.date) {
        setOriginalCreationDate(ticket.date);
      }
      
      const ticketCopy = JSON.parse(JSON.stringify(ticket));
      
      const formattedData = {
        ...ticketCopy,
        date: formatDateForInput(ticket.date || ''),
        changeNeededBy: formatDateForInput(ticket.changeNeededBy || ''),
        changeScheduled: formatDateForInput(ticket.changeScheduled || ''),
        dateOfImplementation: formatDateForInput(ticket.dateOfImplementation || ''),
        cabSignOffDate: formatDateForInput(ticket.cabSignOffDate || ''),
        changeType: ticket.changeType || { ...formData.changeType },
        changePriority: ticket.changePriority || { ...formData.changePriority },
        changeImpact: ticket.changeImpact || { ...formData.changeImpact },
        changeRequestStatus: ticket.changeRequestStatus || { ...formData.changeRequestStatus }
      };
      
      setFormData(formattedData);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // if (isEditMode && name === "date") {
    //   return;
    // }

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
        const selectedClient = clientList.find(c => c.clientname === value);
        
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          requester: selectedClient?.requestor || "",
          approver: selectedClient?.approver || "",
          departmentLocation: selectedClient?.department || "",
          phoneNo: selectedClient?.phoneno || "",
          comments: `Change request has been approved by ${selectedClient?.approver || ""}`,
          assignedTo: getFullName() || "",
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

      const dataToSubmit = { ...formData };
      
      // if (isEditMode && originalCreationDate) {
      //   dataToSubmit.date = originalCreationDate;
      // }

      const { data } = await api[method](endpoint, dataToSubmit, {                                  

        
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

  if (loading) {
    return <div>Loading client data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
              {clientList.map((client) => (
                <option key={client.clientname} value={client.clientname}>
                  {client.clientname}
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
                isEditMode={isEditMode}
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
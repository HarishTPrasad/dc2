import React, { useEffect, useState } from "react";

const ChangeApprovalTable = ({ formData, handleInputChange }) => {
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username") || "";
    setAssignedTo(storedUsername);
  }, []);

  const handleAssignedChange = (e) => {
    setAssignedTo(e.target.value);
    handleInputChange(e);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.headerText}>Change Approval or Rejection</h3>
      </div>

      <div style={styles.section}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Change Request Status</label>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="changeRequestStatus.accepted"
                checked={formData.changeRequestStatus.accepted}
                onChange={handleInputChange}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Accepted</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="changeRequestStatus.rejected"
                checked={formData.changeRequestStatus.rejected}
                onChange={handleInputChange}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Rejected</span>
            </label>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Comments</label>
          <input
            type="text"
            placeholder="Comments"
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Change Scheduled</label>
          <input
            type="date"
            name="changeScheduled"
            value={formData.changeScheduled}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Implementation Assigned</label>
          <input
            type="text"
            placeholder="Name"
            name="implementationAssigned"
            value={assignedTo}
            onChange={handleAssignedChange}
            style={styles.input}
          />
        </div>
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
    maxWidth: "100%",
    margin: "16px auto",
  },
  header: {
    paddingBottom: "12px",
    borderBottom: "2px solid #7e57c2",
    marginBottom: "12px",
  },
  headerText: {
    color: "#5a3d8a",
    fontSize: "1.2rem",
    fontWeight: "600",
    margin: 0,
  },
  section: {
    marginBottom: "12px",
  },
  formGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "0.85rem",
    color: "#5a3d8a",
    marginBottom: "6px",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #d1c4e9",
    fontSize: "0.9rem",
    transition: "all 0.3s ease",
    backgroundColor: "#f5f5f5",
    boxSizing: "border-box",
    ":focus": {
      borderColor: "#7e57c2",
      boxShadow: "0 0 0 3px rgba(126, 87, 194, 0.2)",
      outline: "none",
      backgroundColor: "#fff",
    },
  },
  checkboxGroup: {
    display: "flex",
    gap: "16px",
    marginTop: "6px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "#34495e",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    marginRight: "8px",
    accentColor: "#7e57c2",
    cursor: "pointer",
  },
  checkboxText: {
    flex: 1,
  },
};

export default ChangeApprovalTable;
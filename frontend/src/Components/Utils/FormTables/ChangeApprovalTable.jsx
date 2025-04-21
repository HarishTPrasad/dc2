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
    gap: "12px",
    padding: "12px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    border: "1px solid #ddd",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    maxWidth: "100%",
    margin: "0px auto",
  },
  header: {
    paddingBottom: "6px",
    borderBottom: "1px solid #7e57c2",
    marginBottom: "8px",
  },
  headerText: {
    color: "#5a3d8a",
    fontSize: "1rem",
    fontWeight: "600",
    margin: 0,
  },
  section: {
    marginBottom: "8px",
  },
  formGroup: {
    marginBottom: "12px",
  },
  label: {
    display: "block",
    fontSize: "0.75rem",
    color: "#5a3d8a",
    marginBottom: "4px",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "0.8rem",
    backgroundColor: "#f5f5f5",
    boxSizing: "border-box",
  },
  checkboxGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "4px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "0.8rem",
    color: "#34495e",
  },
  checkbox: {
    width: "14px",
    height: "14px",
    marginRight: "6px",
    accentColor: "#7e57c2",
    cursor: "pointer",
  },
  checkboxText: {
    flex: 1,
  },
};


export default ChangeApprovalTable;
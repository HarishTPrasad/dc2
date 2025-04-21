import React from "react";

const ChangeImplementationTable = ({ formData, handleInputChange }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.headerText}>Change Implementation</h3>
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Staging Test Results</label>
        <div style={styles.selectContainer}>
          <select
            name="stagingTestResults"
            value={formData.stagingTestResults}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option>Select</option>
            <option>Success</option>
            <option>Fail</option>
          </select>
          <div style={styles.selectArrow}></div>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Implementation Test Results</label>
        <div style={styles.selectContainer}>
          <select
            name="implementationTestResults"
            value={formData.implementationTestResults}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option>Select</option>
            <option>Success</option>
            <option>Fail</option>
          </select>
          <div style={styles.selectArrow}></div>
        </div>
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date of Implementation</label>
          <input
            type="date"
            name="dateOfImplementation"
            value={formData.dateOfImplementation}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Status</label>
          <div style={styles.selectContainer}>
            <select
              name="implementationStatus"
              value={formData.implementationStatus}
              onChange={handleInputChange}
              style={styles.select}
            >
              <option>Select</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>In Progress</option>
            </select>
            <div style={styles.selectArrow}></div>
          </div>
        </div>
      </div>

      <div style={styles.formRow}>
        {/* <div style={styles.formGroup}>
          <label style={styles.label}>CAB Sign Off</label>
          <div style={styles.emptyField}></div>
        </div> */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Date</label>
          <input
            type="date"
            name="cabSignOffDate"
            value={formData.cabSignOffDate}
            onChange={handleInputChange}
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
    gap: "8px",
    padding: "12px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    border: "1px solid #ddd",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    maxWidth: "100%",
    margin: "0px auto",
  },
  header: {
    paddingBottom: "6px",
    borderBottom: "1px solid #7e57c2",
    marginBottom: "6px",
  },
  headerText: {
    color: "#5a3d8a",
    fontSize: "1rem",
    fontWeight: "600",
    margin: 0,
  },
  formRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "4px",
    flexWrap: "wrap",
  },
  formGroup: {
    flex: "1",
    minWidth: "160px",
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
    padding: "6px 8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "0.8rem",
    backgroundColor: "#f5f5f5",
    boxSizing: "border-box",
  },
  selectContainer: {
    position: "relative",
    width: "100%",
  },
  select: {
    width: "100%",
    padding: "6px 8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "0.8rem",
    backgroundColor: "#f5f5f5",
    appearance: "none",
    cursor: "pointer",
  },
  selectArrow: {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "0",
    height: "0",
    borderLeft: "4px solid transparent",
    borderRight: "4px solid transparent",
    borderTop: "4px solid #5a3d8a",
    pointerEvents: "none",
  },
  emptyField: {
    height: "30px",
    backgroundColor: "#f5f5f5",
    borderRadius: "4px",
    border: "1px dashed #ccc",
  },
};


export default ChangeImplementationTable;
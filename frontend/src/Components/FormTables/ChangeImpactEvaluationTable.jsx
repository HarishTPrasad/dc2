import React from "react";

const ChangeImpactEvaluationTable = ({ formData, handleInputChange }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.headerText}>Change Impact Evaluation</h3>
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Change Type</h4>
        <div style={styles.checkboxGrid}>
          <div style={styles.checkboxItem}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="changeType.application"
                checked={formData.changeType.application}
                onChange={handleInputChange}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Application</span>
            </label>
          </div>
          <div style={styles.checkboxItem}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="changeType.database"
                checked={formData.changeType.database}
                onChange={handleInputChange}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Database</span>
            </label>
          </div>
          <div style={styles.checkboxItem}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="changeType.hardware"
                checked={formData.changeType.hardware}
                onChange={handleInputChange}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Hardware</span>
            </label>
          </div>
          <div style={styles.checkboxItem}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="changeType.procedures"
                checked={formData.changeType.procedures}
                onChange={handleInputChange}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Procedures</span>
            </label>
          </div>
          <div style={styles.checkboxItem}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="changeType.network"
                checked={formData.changeType.network}
                onChange={handleInputChange}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Network</span>
            </label>
          </div>
          <div style={styles.checkboxItem}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="changeType.security"
                checked={formData.changeType.security}
                onChange={handleInputChange}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Security</span>
            </label>
          </div>
          <div style={styles.checkboxItem}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="changeType.operatingSystem"
                checked={formData.changeType.operatingSystem}
                onChange={handleInputChange}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Operating System/Utilities</span>
            </label>
          </div>
          <div style={styles.checkboxItem}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="changeType.schedule"
                checked={formData.changeType.schedule}
                onChange={handleInputChange}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Schedule</span>
            </label>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.formRow}>
          <div style={{...styles.formGroup, flex: 1}}>
            <h4 style={styles.sectionTitle}>Change Priority</h4>
            <div style={styles.checkboxList}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="changePriority.urgent"
                  checked={formData.changePriority.urgent}
                  onChange={handleInputChange}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>Urgent</span>
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="changePriority.high"
                  checked={formData.changePriority.high}
                  onChange={handleInputChange}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>High</span>
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="changePriority.medium"
                  checked={formData.changePriority.medium}
                  onChange={handleInputChange}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>Medium</span>
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="changePriority.low"
                  checked={formData.changePriority.low}
                  onChange={handleInputChange}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>Low</span>
              </label>
            </div>
          </div>
          <div style={{...styles.formGroup, flex: 1}}>
            <h4 style={styles.sectionTitle}>Change Impact</h4>
            <div style={styles.checkboxList}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="changeImpact.minor"
                  checked={formData.changeImpact.minor}
                  onChange={handleInputChange}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>Minor</span>
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="changeImpact.medium"
                  checked={formData.changeImpact.medium}
                  onChange={handleInputChange}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>Medium</span>
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="changeImpact.major"
                  checked={formData.changeImpact.major}
                  onChange={handleInputChange}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>Major</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Environment(s) Impacted</label>
          <input
            type="text"
            name="environmentsImpacted"
            value={formData.environmentsImpacted}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Resource requirements (Personnel, H/W, S/W, etc)</label>
          <input
            type="text"
            name="resourceRequirements"
            value={formData.resourceRequirements}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Test Plan Description</label>
          <input
            type="text"
            name="testPlanDescription"
            value={formData.testPlanDescription}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Roll Back</label>
          <input
            type="text"
            name="rollBack"
            value={formData.rollBack}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
      </div>
    </div>
  );
};


// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "16px",
//     padding: "20px",
//     backgroundColor: "#ffffff",
//     borderRadius: "8px",
//     border: "1px solid #e0e0e0",
//     boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
//     maxWidth: "100%",
//     margin: "16px auto",
//   },
//   header: {
//     paddingBottom: "12px",
//     borderBottom: "2px solid #7e57c2",
//     marginBottom: "12px",
//   },
//   headerText: {
//     color: "#5a3d8a",
//     fontSize: "1.2rem",
//     fontWeight: "600",
//     margin: 0,
//   },
//   section: {
//     marginBottom: "20px", // Reduced margin
//     padding: "12px",    // Reduced padding
//     backgroundColor: "#f9f9f9",
//     borderRadius: "6px",  // Reduced borderRadius
//   },
//   sectionTitle: {
//     color: "#5a3d8a",
//     fontSize: "1rem",    // Reduced fontSize
//     fontWeight: "500",
//     marginTop: "0",
//     marginBottom: "10px",  // Reduced margin
//   },
//   formRow: {
//     display: "flex",
//     gap: "16px",
//     marginBottom: "12px",  // Reduced margin
//   },
//   formGroup: {
//     marginBottom: "16px",
//   },
//   label: {
//     display: "block",
//     fontSize: "0.85rem",
//     color: "#5a3d8a",
//     marginBottom: "6px",
//     fontWeight: "500",
//   },
//   input: {
//     width: "100%",
//     padding: "10px 12px",
//     borderRadius: "6px",
//     border: "1px solid #d1c4e9",
//     fontSize: "0.9rem",
//     transition: "all 0.3s ease",
//     backgroundColor: "#f5f5f5",
//     boxSizing: "border-box",
//     ":focus": {
//       borderColor: "#7e57c2",
//       boxShadow: "0 0 0 3px rgba(126, 87, 194, 0.2)",
//       outline: "none",
//       backgroundColor: "#fff",
//     },
//   },
//   checkboxGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(2, 1fr)",
//     gap: "12px",      // Reduced gap
//   },
//   checkboxList: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",      // Reduced gap
//   },
//   checkboxItem: {
//     display: "flex",
//     alignItems: "center",
//   },
//   checkboxLabel: {
//     display: "flex",
//     alignItems: "center",
//     cursor: "pointer",
//     fontSize: "0.9rem",    // Reduced fontSize
//     color: "#34495e",
//   },
//   checkbox: {
//     width: "16px",      // Reduced width
//     height: "16px",     // Reduced height
//     marginRight: "8px",    // Reduced margin
//     accentColor: "#7e57c2",
//     cursor: "pointer",
//   },
//   checkboxText: {
//     flex: 1,
//   },
// };

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
  section: {
    marginBottom: "12px",
    padding: "8px",
    backgroundColor: "#f9f9f9",
    borderRadius: "4px",
  },
  sectionTitle: {
    color: "#5a3d8a",
    fontSize: "0.95rem",
    fontWeight: "500",
    margin: "0 0 6px 0",
  },
  formRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "8px",
    flexWrap: "wrap",
  },
  formGroup: {
    marginBottom: "10px",
    flex: 1,
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
    padding: "6px 10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "0.8rem",
    backgroundColor: "#f5f5f5",
    boxSizing: "border-box",
  },
  checkboxGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "8px",
  },
  checkboxList: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  checkboxItem: {
    display: "flex",
    alignItems: "center",
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


export default ChangeImpactEvaluationTable;
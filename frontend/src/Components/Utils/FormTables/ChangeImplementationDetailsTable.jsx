import React, { useState } from "react";

const ChangeImplementationDetailsTable = ({ formData, handleInputChange }) => {
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleTechnologyChange = (e) => {
    const { name, value } = e.target;
    if (value === "Others") {
      setShowOtherInput(true);
      handleInputChange({ target: { name, value: "" } });
    } else {
      setShowOtherInput(false);
      handleInputChange(e);
    }
  };

  const handleOtherInputChange = (e) => {
    handleInputChange({ target: { name: "technology", value: e.target.value } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.headerText}>Change Implementation Details</h3>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Technology</label>
        <div style={styles.selectContainer}>
          <select
            name="technology"
            value={formData.technology}
            onChange={handleTechnologyChange}
            style={styles.select}
          >
            <option>Select</option>
            <option>Firewall</option>
            <option>Active Directory Server</option>
            <option>Backup</option>
            <option>SIEM</option>
            <option>Log Server</option>
            <option>User Access Management</option>
            <option>Antivirus</option>
            <option>Network Monitoring Server</option>
            <option>Network Infrastructure</option>
            <option>Others</option>
          </select>
          <div style={styles.selectArrow}></div>
        </div>
        {showOtherInput && (
          <input
            type="text"
            placeholder="Specify other technology"
            name="technology"
            value={formData.technology}
            onChange={handleOtherInputChange}
            style={{...styles.input, marginTop: '8px'}}
          />
        )}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Policy</label>
        <input
          type="text"
          placeholder="Policy"
          name="policy"
          value={formData.policy}
          onChange={handleInputChange}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>IP Address/URL/Port/User</label>
        <input
          type="text"
          name="ipAddressUrlPort"
          value={formData.ipAddressUrlPort}
          onChange={handleInputChange}
          style={styles.input}
        />
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
//   formGroup: {
//     marginBottom: "16px", // Reduced marginBottom
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
//   selectContainer: {
//     position: "relative",
//     width: "100%",
//   },
//   select: {
//     width: "100%",
//     padding: "10px 12px",
//     borderRadius: "6px",
//     border: "1px solid #d1c4e9",
//     fontSize: "0.9rem",
//     appearance: "none",
//     backgroundColor: "#f5f5f5",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//     ":focus": {
//       borderColor: "#7e57c2",
//       boxShadow: "0 0 0 3px rgba(126, 87, 194, 0.2)",
//       outline: "none",
//       backgroundColor: "#fff",
//     },
//   },
//   selectArrow: {
//     position: "absolute",
//     right: "12px",
//     top: "50%",
//     transform: "translateY(-50%)",
//     width: "0",
//     height: "0",
//     borderLeft: "5px solid transparent",
//     borderRight: "5px solid transparent",
//     borderTop: "5px solid #5a3d8a",
//     pointerEvents: "none",
//   },
// };


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "37px",
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
  formGroup: {
    marginBottom: "8px",
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
    appearance: "none",
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
  },
  selectArrow: {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    width: 0,
    height: 0,
    borderLeft: "4px solid transparent",
    borderRight: "4px solid transparent",
    borderTop: "4px solid #5a3d8a",
    pointerEvents: "none",
  },
};

export default ChangeImplementationDetailsTable;
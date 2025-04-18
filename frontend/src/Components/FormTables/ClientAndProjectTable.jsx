import React, { useEffect, useState } from "react";

const ClientAndProjectTable = ({ formData, handleInputChange }) => {
  const [showOtherInputs, setShowOtherInputs] = useState({
    project: false,
    requester: false,
    departmentLocation: false,
    approver: false,
  });

  const getCurrentDateAsNumber = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${parseInt(`${day}${month}${year}`, 10)}-`;
  };

  useEffect(() => {
    if (!formData.changeRequestNo) {
      handleInputChange({
        target: {
          name: "changeRequestNo",
          value: getCurrentDateAsNumber(),
        },
      });
    }
  }, [formData.changeRequestNo, handleInputChange]);

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    if (value === "Others") {
      setShowOtherInputs((prev) => ({ ...prev, [name]: true }));
      handleInputChange({ target: { name, value: "" } });
    } else {
      setShowOtherInputs((prev) => ({ ...prev, [name]: false }));
      handleInputChange(e);
    }
  };

  const handleOtherInputChange = (e) => {
    const { name, value } = e.target;
    handleInputChange({ target: { name, value } });
  };

  return (
    <div style={styles.container}>
       <div style={styles.header}>
        <h3 style={styles.headerText}>Change Implementation</h3>
      </div>
      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label htmlFor="changeRequestNo" style={styles.label}>
            Change Request No
          </label>
          <input
            type="text"
            id="changeRequestNo"
            placeholder="Change Request No"
            name="changeRequestNo"
            value={formData.changeRequestNo}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="project" style={styles.label}>
            Project
          </label>
          <div style={styles.selectContainer}>
            <select
              id="project"
              name="project"
              value={formData.project}
              onChange={handleDropdownChange}
              style={styles.select}
            >
              <option>Select</option>
              <option>USB Access</option>
              <option>Firewall Access</option>
              <option>User Creation/Modification/Deletion</option>
              <option>Website</option>
              <option>White list URL/IP/Port</option>
              <option>Geo-Location</option>
              <option>Others</option>
            </select>
            <div style={styles.selectArrow}></div>
          </div>
          {showOtherInputs.project && (
            <input
              type="text"
              placeholder="Specify other project"
              name="project"
              value={formData.project}
              onChange={handleOtherInputChange}
              style={{...styles.input, marginTop: '8px'}}
            />
          )}
        </div>
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label htmlFor="requester" style={styles.label}>
            Requester
          </label>
          <div style={styles.selectContainer}>
            <select
              id="requester"
              name="requester"
              value={formData.requester}
              onChange={handleDropdownChange}
              style={styles.select}
            >
              <option>Select</option>
              <option>Sourabh Bhardwaj</option>
              <option>Nain Puri Ji</option>
              <option>Rakesh Dashora</option>
              <option>Mahadev Chaudhari</option>
              <option>Chirag Patel</option>
              <option>Vipul Joshi</option>
              <option>Pramod Dave</option>
              <option>Brijesh Gautam</option>
              <option>Maulik Patel</option>
              <option>Dirgh Trivedi</option>
              <option>Hemal Darji</option>
              <option>Jigar Patel</option>
              <option>Kailash Prajapat</option>
              <option>Bhavik Patel</option>
              <option>Ketan Patel</option>
              <option>Others</option>
            </select>
            <div style={styles.selectArrow}></div>
          </div>
          {showOtherInputs.requester && (
            <input
              type="text"
              placeholder="Specify other requester"
              name="requester"
              value={formData.requester}
              onChange={handleOtherInputChange}
              style={{...styles.input, marginTop: '8px'}}
            />
          )}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="date" style={styles.label}>
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label htmlFor="departmentLocation" style={styles.label}>
            Department/Location
          </label>
          <div style={styles.selectContainer}>
            <select
              id="departmentLocation"
              name="departmentLocation"
              value={formData.departmentLocation}
              onChange={handleDropdownChange}
              style={styles.select}
            >
              <option>Select</option>
              <option>IT/BWRUCB</option>
              <option>IT/BUCB</option>
              <option>IT/CUCB</option>
              <option>IT/DMCB</option>
              <option>IT/GNSB</option>
              <option>IT/HNSB</option>
              <option>IT/JNSB</option>
              <option>IT/KNSB</option>
              <option>IT/KKNSB</option>
              <option>IT/PCBD</option>
              <option>IT/PNSB</option>
              <option>IT/RNBX</option>
              <option>IT/SMUCB</option>
              <option>IT/VCOB</option>
              <option>IT/SMCBL</option>
              <option>IT/KNSBL</option>
              <option>IT/INSB</option>
              <option>IT/MUCB</option>
              <option>IT/GNCB</option>
              <option>IT/VK-ENG</option>
              <option>IT/CTPL</option>
              <option>Others</option>
            </select>
            <div style={styles.selectArrow}></div>
          </div>
          {showOtherInputs.departmentLocation && (
            <input
              type="text"
              placeholder="Specify other department/location"
              name="departmentLocation"
              value={formData.departmentLocation}
              onChange={handleOtherInputChange}
              style={{...styles.input, marginTop: '8px'}}
            />
          )}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="phoneNo" style={styles.label}>
            Phone no.
          </label>
          <input
            type="text"
            id="phoneNo"
            placeholder="Phone No."
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="changeDescription" style={styles.label}>
          Description of the change
        </label>
        <textarea
          id="changeDescription"
          name="changeDescription"
          value={formData.changeDescription}
          onChange={handleInputChange}
          style={{...styles.input, minHeight: '80px'}}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="changeNeededBy" style={styles.label}>
          Change needed by
        </label>
        <input
          type="date"
          id="changeNeededBy"
          name="changeNeededBy"
          value={formData.changeNeededBy}
          onChange={handleInputChange}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="reasonForChange" style={styles.label}>
          Reason for the change
        </label>
        <input
          type="text"
          id="reasonForChange"
          placeholder="Reason for the change"
          name="reasonForChange"
          value={formData.reasonForChange}
          onChange={handleInputChange}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="approver" style={styles.label}>
          Approver
        </label>
        <div style={styles.selectContainer}>
          <select
            id="approver"
            name="approver"
            value={formData.approver}
            onChange={handleDropdownChange}
            style={styles.select}
          >
            <option>Select</option>
            <option>Anil Devnani</option>
            <option>Gautam Singh Jain</option>
            <option>Vandana Vazirani</option>
            <option>Ajay Patel</option>
            <option>Jitu Patel</option>
            <option>Manubhai M Patel</option>
            <option>Abhishek Das</option>
            <option>Nand kishore Ji Chouhan</option>
            <option>Chirag Patel</option>
            <option>Mahesh Anerao</option>
            <option>Mahesh Kumar P. Modi</option>
            <option>P.G. Suthar</option>
            <option>Ugam Raj Gaur</option>
            <option>Rajnikant C Gajjar</option>
            <option>Nitin Patel</option>
            <option>Others</option>
          </select>
          <div style={styles.selectArrow}></div>
        </div>
        {showOtherInputs.approver && (
          <input
            type="text"
            placeholder="Specify other approver"
            name="approver"
            value={formData.approver}
            onChange={handleOtherInputChange}
            style={{...styles.input, marginTop: '8px'}}
          />
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "35px",
    padding: "12px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    border: "1px solid #ddd",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    maxWidth: "100%",
    margin: "0 auto",
  },
  formRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "6px",
    flexWrap: "wrap",
  },
  formGroup: {
    flex: "1",
    minWidth: "160px",
  },
  header: {
    paddingBottom: "8px",
    borderBottom: "1px solid #7e57c2",
    marginBottom: "8px",
  },
  headerText: {
    color: "#5a3d8a",
    fontSize: "1rem",
    fontWeight: "600",
    margin: 0,
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
    width: "0",
    height: "0",
    borderLeft: "4px solid transparent",
    borderRight: "4px solid transparent",
    borderTop: "4px solid #5a3d8a",
    pointerEvents: "none",
  },
};


// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "16px", // Reduced gap
//     padding: "20px", // Reduced padding
//     backgroundColor: "#ffffff",
//     borderRadius: "8px", // Reduced border radius
//     border: "1px solid #e0e0e0",
//     boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)", // Slightly reduced shadow
//     maxWidth: "100%",
//     margin: "0 auto",
//   },
//   formRow: {
//     display: "flex",
//     gap: "16px", // Reduced gap
//     marginBottom: "8px", // Reduced margin
//     flexWrap: "wrap",
//   },
//   formGroup: {
//     flex: "1",
//     minWidth: "200px", // Reduced min-width
//   },
//   header: {
//     paddingBottom: "12px", // Reduced padding
//     borderBottom: "2px solid #7e57c2",
//     marginBottom: "12px", // Reduced margin
//   },
//   headerText: {
//     color: "#5a3d8a",
//     fontSize: "1.2rem", // Reduced font size
//     fontWeight: "600",
//     margin: 0,
//   },
//   label: {
//     display: "block",
//     fontSize: "0.85rem", // Reduced font size
//     color: "#5a3d8a",
//     marginBottom: "6px", // Reduced margin
//     fontWeight: "500",
//   },
//   input: {
//     width: "100%",
//     padding: "10px 12px", // Reduced padding
//     borderRadius: "6px",
//     border: "1px solid #d1c4e9",
//     fontSize: "0.9rem", // Reduced font size
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
//     padding: "10px 12px", // Reduced padding
//     borderRadius: "6px",
//     border: "1px solid #d1c4e9",
//     fontSize: "0.9rem", // Reduced font size
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
//     right: "12px", // Reduced right position
//     top: "50%",
//     transform: "translateY(-50%)",
//     width: "0",
//     height: "0",
//     borderLeft: "5px solid transparent", // Reduced arrow size
//     borderRight: "5px solid transparent", // Reduced arrow size
//     borderTop: "5px solid #5a3d8a",
//     pointerEvents: "none",
//   },
// };



export default ClientAndProjectTable;
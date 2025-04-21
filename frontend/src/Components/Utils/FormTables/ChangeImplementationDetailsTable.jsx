import React, { useState, useEffect } from "react";
import api from "../../API/api";

const ChangeImplementationDetailsTable = ({ formData, handleInputChange }) => {
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [techList, setTechList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      const response = await api.get('/techdata');
      setTechList(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch technologies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

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
        {loading ? (
          <div style={styles.loading}>Loading technologies...</div>
        ) : error ? (
          <div style={styles.error}>{error}</div>
        ) : (
          <>
            <div style={styles.selectContainer}>
              <select
                name="technology"
                value={formData.technology}
                onChange={handleTechnologyChange}
                style={styles.select}
                disabled={loading}
              >
                <option value="">Select</option>
                {techList.map((tech) => (
                  <option key={tech._id} value={tech.technology}>
                    {tech.technology}
                  </option>
                ))}
                <option value="Others">Others</option>
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
                style={{ ...styles.input, marginTop: '8px' }}
              />
            )}
          </>
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
  loading: {
    padding: "6px 8px",
    fontSize: "0.8rem",
    color: "#666",
  },
  error: {
    padding: "6px 8px",
    fontSize: "0.8rem",
    color: "#d32f2f",
    backgroundColor: "#fdecea",
    borderRadius: "4px",
  },
};

export default ChangeImplementationDetailsTable;
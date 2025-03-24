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
    <div>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th colSpan="4">Change Implementation Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th style={{ width: "30%" }}>Technology</th>
            <td>
              <div className="form-group">
                <select
                  className="form-control"
                  name="technology"
                  value={formData.technology}
                  onChange={handleTechnologyChange}
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
                {showOtherInput && (
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Specify other technology"
                    name="technology"
                    value={formData.technology}
                    onChange={handleOtherInputChange}
                  />
                )}
              </div>
            </td>
          </tr>
          <tr>
            <th>Policy</th>
            <td>
              <input
                className="form-control"
                type="text"
                placeholder="Policy"
                name="policy"
                value={formData.policy}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th rowSpan="2">IP Address/URL/Port/User</th>
            <td>
              <input
                className="form-control"
                type="text"
                name="ipAddressUrlPort"
                value={formData.ipAddressUrlPort}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChangeImplementationDetailsTable;
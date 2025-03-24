import React, { useEffect, useState } from "react";

const ChangeApprovalTable = ({ formData, handleInputChange }) => {
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    // Fetch the username from sessionStorage and set it as the default value
    const storedUsername = sessionStorage.getItem("username") || "";
    setAssignedTo(storedUsername);
  }, []);

  const handleAssignedChange = (e) => {
    setAssignedTo(e.target.value);
    handleInputChange(e); // Ensure the change is reflected in the parent component's state
  };

  return (
    <div>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th colSpan="5">Change Approval or Rejection</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th style={{ width: "30%" }}>Change Request Status</th>
            <td>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="changeRequestStatus.accepted"
                  checked={formData.changeRequestStatus.accepted}
                  onChange={handleInputChange}
                />
                Accepted
              </div>
            </td>
            <td>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="changeRequestStatus.rejected"
                  checked={formData.changeRequestStatus.rejected}
                  onChange={handleInputChange}
                />
                Rejected
              </div>
            </td>
          </tr>
          <tr>
            <th>Comments</th>
            <th colSpan="4">
              <input
                className="form-control"
                type="text"
                placeholder="Comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
              />
            </th>
          </tr>
          <tr>
            <th>Change Scheduled</th>
            <td colSpan="4">
              <input
                type="date"
                className="form-control"
                name="changeScheduled"
                value={formData.changeScheduled}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Implementation Assigned</th>
            <td colSpan="4">
              <input
                className="form-control"
                type="text"
                placeholder="Name"
                name="implementationAssigned"
                value={assignedTo}
                onChange={handleAssignedChange} // Update state and propagate change
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChangeApprovalTable;

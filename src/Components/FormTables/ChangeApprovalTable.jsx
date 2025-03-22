import React from "react";

const ChangeApprovalTable = ({ formData, handleInputChange }) => {
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
                <th>Implementation assigned</th>
                <td colSpan="4">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    name="implementationAssigned"
                    value={formData.implementationAssigned}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
    </div>
  );
};

export default ChangeApprovalTable;
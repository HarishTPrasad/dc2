import React from "react";

const ChangeImplementationTable = ({ formData, handleInputChange }) => {
  return (
    <div>
       <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th colSpan="4">Change Implementation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{ width: "30%" }}>Staging test results:</th>
                <th colSpan="3">
                  <select
                    className="form-control"
                    name="stagingTestResults"
                    value={formData.stagingTestResults}
                    onChange={handleInputChange}
                  > <option>Select</option>
                    <option>Success</option>
                    <option>Fail</option>
                  </select>
                </th>
              </tr>
              <tr>
                <th>Implementation test results</th>
                <th colSpan="3">
                  <select
                    className="form-control"
                    type="text"
                    placeholder="Results"
                    name="implementationTestResults"
                    value={formData.implementationTestResults}
                    onChange={handleInputChange}
                  > <option>Select</option>
                    <option>Success</option>
                    <option>Fail</option>
                    </select>
                </th>
              </tr>
              <tr>
                <th>Date of Implementation</th>
                <td>
                  <input
                    type="date"
                    className="form-control"
                    name="dateOfImplementation"
                    value={formData.dateOfImplementation}
                    onChange={handleInputChange}
                  />
                </td>
                <th>Status</th>
                <th>
                  <select
                    className="form-control"
                    name="implementationStatus"
                    value={formData.implementationStatus}
                    onChange={handleInputChange}
                  > <option>Select</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                  </select>
                </th>
              </tr>
              <tr>
                <th>CAB Sign off</th>
                <td></td>
                <th>Date</th>
                <td>
                  <input
                    type="date"
                    className="form-control"
                    name="cabSignOffDate"
                    value={formData.cabSignOffDate}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
    </div>
  );
};

export default ChangeImplementationTable;
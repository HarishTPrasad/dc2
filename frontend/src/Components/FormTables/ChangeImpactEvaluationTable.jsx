import React from "react";

const ChangeImpactEvaluationTable = ({ formData, handleInputChange }) => {
  return (
    <div>
        <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th colSpan="6">Change Impact Evaluation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowSpan="4" style={{ width: "30%" }}>Change Type</th>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="changeType.application"
                      checked={formData.changeType.application}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td colSpan="2" style={{ width: "30%" }}>Application</td>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="changeType.database"
                      checked={formData.changeType.database}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td colSpan="2">Database</td>
              </tr>
              <tr>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="changeType.hardware"
                      checked={formData.changeType.hardware}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td colSpan="2">Hardware</td>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="changeType.procedures"
                      checked={formData.changeType.procedures}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td colSpan="2">Procedures</td>
              </tr>
              <tr>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="changeType.network"
                      checked={formData.changeType.network}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td colSpan="2">Network</td>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="changeType.security"
                      checked={formData.changeType.security}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td colSpan="2">Security</td>
              </tr>
              <tr>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="changeType.operatingSystem"
                      checked={formData.changeType.operatingSystem}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td colSpan="2">Operating System/Utilities</td>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="changeType.schedule"
                      checked={formData.changeType.schedule}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td colSpan="2">Schedule</td>
              </tr>
              <tr>
                <th rowSpan="4">Change Priority</th>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="changePriority.urgent"
                      checked={formData.changePriority.urgent}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td>Urgent</td>
                <th rowSpan="4" style={{ width: "15%" }}>Change Impact</th>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="changeImpact.minor"
                      checked={formData.changeImpact.minor}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td>Minor</td>
              </tr>
              <tr>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="changePriority.high"
                      checked={formData.changePriority.high}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td>High</td>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="changeImpact.medium"
                      checked={formData.changeImpact.medium}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td>Medium</td>
              </tr>
              <tr>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="changePriority.medium"
                      checked={formData.changePriority.medium}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td>Medium</td>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="changeImpact.major"
                      checked={formData.changeImpact.major}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td>Major</td>
              </tr>
              <tr>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="changePriority.low"
                      checked={formData.changePriority.low}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td>Low</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <th>Environment(s) Impacted</th>
                <td colSpan="5">
                  <input
                    className="form-control"
                    type="text"
                    name="environmentsImpacted"
                    value={formData.environmentsImpacted}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Resource requirements (Personel,H/W,S/W,etc)</th>
                <td colSpan="5">
                  <input
                    className="form-control"
                    type="text"
                    name="resourceRequirements"
                    value={formData.resourceRequirements}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Test Plan Description</th>
                <td colSpan="5">
                  <input
                    className="form-control"
                    type="text"
                    name="testPlanDescription"
                    value={formData.testPlanDescription}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Roll Back</th>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    name="rollBack"
                    value={formData.rollBack}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
      
    </div>
  );
};

export default ChangeImpactEvaluationTable;
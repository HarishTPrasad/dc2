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
    <div>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th colSpan="4">Change Description / Change Request : Project Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th style={{ width: "30%" }}>Change Request No</th>
            <td>
              <input
                className="form-control"
                type="text"
                placeholder="Change Request No"
                name="changeRequestNo"
                value={formData.changeRequestNo}
                onChange={handleInputChange}
              />
            </td>
            <th>Project</th>
            <td>
              <div className="form-group">
                <select
                  className="form-control"
                  name="project"
                  value={formData.project}
                  onChange={handleDropdownChange}
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
                {showOtherInputs.project && (
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Specify other project"
                    name="project"
                    value={formData.project}
                    onChange={handleOtherInputChange}
                  />
                )}
              </div>
            </td>
          </tr>
          <tr>
            <th>Requester</th>
            <td>
              <select
                className="form-control"
                name="requester"
                value={formData.requester}
                onChange={handleDropdownChange}
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
              {showOtherInputs.requester && (
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Specify other requester"
                  name="requester"
                  value={formData.requester}
                  onChange={handleOtherInputChange}
                />
              )}
            </td>
            <th>Date</th>
            <td>
              <input
                type="date"
                className="form-control"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Department/Location</th>
            <td>
              <select
                className="form-control"
                name="departmentLocation"
                value={formData.departmentLocation}
                onChange={handleDropdownChange}
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
              {showOtherInputs.departmentLocation && (
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Specify other department/location"
                  name="departmentLocation"
                  value={formData.departmentLocation}
                  onChange={handleOtherInputChange}
                />
              )}
            </td>
            <th>Phone no.</th>
            <td>
              <input
                className="form-control"
                type="text"
                placeholder="Phone No."
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Description of the change</th>
            <td colSpan="3">
              <input
                className="form-control"
                type="text"
                name="changeDescription"
                value={formData.changeDescription}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Change needed by</th>
            <td colSpan="3">
              <input
                type="date"
                className="form-control"
                name="changeNeededBy"
                value={formData.changeNeededBy}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Reason for the change</th>
            <td colSpan="3">
              <input
                className="form-control"
                type="text"
                placeholder="Reason for the change"
                name="reasonForChange"
                value={formData.reasonForChange}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Approver</th>
            <td colSpan="3">
              <select
                className="form-control"
                name="approver"
                value={formData.approver}
                onChange={handleDropdownChange}
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
              {showOtherInputs.approver && (
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Specify other approver"
                  name="approver"
                  value={formData.approver}
                  onChange={handleOtherInputChange}
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClientAndProjectTable;
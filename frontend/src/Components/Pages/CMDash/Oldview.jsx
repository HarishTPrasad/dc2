import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import api from "../../API/api";

const formatDate = (dateString) => {
  if (!dateString) return ""; 

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

function Oldview() {
  const [renderKey, setRenderKey] = useState(0);
  const location = useLocation();
  const contentRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(location.state?.ticket || {});
  const [ticket, setticket] = useState(location.state?.ticket || {});

  useEffect(() => {
    if (!location.state?.ticket) {
      const storedData = localStorage.getItem("ticket");
      if (storedData) {
        setticket(JSON.parse(storedData));
        setFormData(JSON.parse(storedData));
      }
    }
  }, [location.state]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      // Handle nested objects for checkboxes
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDateChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const response = await api.put(`/documents/${ticket._id}`, formData);
      setticket(response.data);
      setIsEditing(false);
      alert("CMR Decument updated successfully!");
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("Failed to update ticket");
    }
  };

  const downloadPDF = () => {
    setRenderKey((prevKey) => prevKey + 1);

    setTimeout(() => {
      const input = contentRef.current;

      html2canvas(input, {
        scale: 1,
        useCORS: true,
        logging: false,
        allowTaint: true,
        quality: 0.5,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 1);
        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
          heightLeft -= pageHeight;
        }

        pdf.save("Change_Request_Form.pdf");
      });
    }, 300);
  };

  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/dashboard/changem");
  };

  const renderField = (name, value, isCheckbox = false) => {
    if (!isEditing) {
      return value || "";
    }

    if (isCheckbox) {
      return (
        <input
          type="checkbox"
          name={name}
          checked={value}
          onChange={handleInputChange}
        />
      );
    }

    return (
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={handleInputChange}
        style={{ width: "100%", padding: "5px" }}
      />
    );
  };

  const renderDateField = (name, value) => {
    if (!isEditing) {
      return formatDate(value);
    }

    return (
      <input
        type="date"
        name={name}
        value={value ? new Date(value).toISOString().split('T')[0] : ""}
        onChange={(e) => handleDateChange(name, e.target.value)}
        style={{ width: "100%", padding: "5px" }}
      />
    );
  };

  return (
    <>
      <div style={styles.container} ref={contentRef} key={renderKey}>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div style={styles.content}>
              <div className="head">
                <h1 style={{ textAlign: "center", ...styles.font, fontSize: "60px" }}>
                  <input
                    type="text"
                    name="client"
                    value={formData.client || ""}
                    onChange={handleInputChange}
                    style={{ width: "100%", textAlign: "center", fontSize: "60px", ...styles.font }}
                  />
                </h1>
                <h2 style={{ textAlign: "center", ...styles.font, fontSize: "40px" }}>Change Request Form</h2>
              </div>
            </div>

            {/* Table 1: Change Description / Change Request */}
            <div style={{...styles.content, marginTop:"100px"}}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th colSpan="4" style={{ ...styles.th, textAlign: "center",backgroundColor: "#d3d3d3" }}>
                      Change Description / Change Request : {renderField("project", formData.project)}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style={{ ...styles.th, width: "30%" }}>Change Request No</th>
                    <td style={styles.td}>{renderField("changeRequestNo", formData.changeRequestNo)}</td>
                    <th style={{ ...styles.th, width: "20%" }}>Project</th>
                    <td style={styles.td}>{renderField("project", formData.project)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Requester</th>
                    <td style={styles.td}>{renderField("requester", formData.requester)}</td>
                    <th style={{ ...styles.th, width: "20%" }}>Date</th>
                    <td style={styles.td}>{renderDateField("date", formData.date)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Department/Location</th>
                    <td style={styles.td}>{renderField("departmentLocation", formData.departmentLocation)}</td>
                    <th style={{ ...styles.th, width: "20%" }}>Phone no.</th>
                    <td style={styles.td}>{renderField("phoneNo", formData.phoneNo)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Description of the change</th>
                    <td colSpan="3" style={styles.td}>{renderField("changeDescription", formData.changeDescription)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Change needed by</th>
                    <td colSpan="3" style={styles.td}>{renderDateField("changeNeededBy", formData.changeNeededBy)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Reason for the change</th>
                    <td colSpan="3" style={styles.td}>{renderField("reasonForChange", formData.reasonForChange)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Approver</th>
                    <td colSpan="3" style={styles.td}>{renderField("approver", formData.approver)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table 2: Change Impact Evaluation */}
            <div style={styles.content}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th colSpan="6" style={{ ...styles.th, textAlign: "center", verticalAlign: "middle",backgroundColor: "#d3d3d3" }}>
                      Change Impact Evaluation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th rowSpan="4" style={{ ...styles.th, width: "30%", textAlign: "center", verticalAlign: "middle" }}>
                      Change Type
                    </th>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changeType.application", formData.changeType?.application, true)}
                    </td>
                    <td colSpan="2" style={styles.td}>Application</td>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changeType.database", formData.changeType?.database, true)}
                    </td>
                    <td colSpan="2" style={styles.td}>Database</td>
                  </tr>
                  <tr>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changeType.hardware", formData.changeType?.hardware, true)}
                    </td>
                    <td colSpan="2" style={styles.td}>Hardware</td>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changeType.procedures", formData.changeType?.procedures, true)}
                    </td>
                    <td colSpan="2" style={styles.td}>Procedures</td>
                  </tr>
                  <tr>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changeType.network", formData.changeType?.network, true)}
                    </td>
                    <td colSpan="2" style={styles.td}>Network</td>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changeType.security", formData.changeType?.security, true)}
                    </td>
                    <td colSpan="2" style={styles.td}>Security</td>
                  </tr>
                  <tr>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changeType.operatingSystem", formData.changeType?.operatingSystem, true)}
                    </td>
                    <td colSpan="2" style={styles.td}>Operating System/Utilities</td>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changeType.schedule", formData.changeType?.schedule, true)}
                    </td>
                    <td colSpan="2" style={styles.td}>Schedule</td>
                  </tr>
                  <tr>
                    <th rowSpan="4" style={{ ...styles.th, textAlign: "center", verticalAlign: "middle" }}>
                      Change Priority
                    </th>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changePriority.urgent", formData.changePriority?.urgent, true)}
                    </td>
                    <td style={styles.td}>Urgent</td>
                    <th rowSpan="4" style={{ ...styles.th, textAlign: "center", verticalAlign: "middle" }}>
                      Change Impact
                    </th>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changeImpact.minor", formData.changeImpact?.minor, true)}
                    </td>
                    <td style={styles.td}>Minor</td>
                  </tr>
                  <tr>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changePriority.high", formData.changePriority?.high, true)}
                    </td>
                    <td style={styles.td}>High</td>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changeImpact.medium", formData.changeImpact?.medium, true)}
                    </td>
                    <td style={styles.td}>Medium</td>
                  </tr>
                  <tr>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changePriority.medium", formData.changePriority?.medium, true)}
                    </td>
                    <td style={styles.td}>Medium</td>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changeImpact.major", formData.changeImpact?.major, true)}
                    </td>
                    <td style={styles.td}>Major</td>
                  </tr>
                  <tr>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changePriority.low", formData.changePriority?.low, true)}
                    </td>
                    <td style={styles.td}>Low</td>
                    <td style={styles.td}></td>
                    <td style={styles.td}></td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Environment(s) Impacted</th>
                    <td colSpan="5" style={styles.td}>{renderField("environmentsImpacted", formData.environmentsImpacted)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Resource requirements (Personnel, H/W, S/W, etc)</th>
                    <td colSpan="5" style={styles.td}>{renderField("resourceRequirements", formData.resourceRequirements)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Test Plan Description</th>
                    <td colSpan="5" style={styles.td}>{renderField("testPlanDescription", formData.testPlanDescription)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Roll Back</th>
                    <td colSpan="5"style={styles.td}>{renderField("rollBack", formData.rollBack)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table 3: Change Approval or Rejection */}
            <div style={styles.content}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th colSpan="5" style={{ ...styles.th, textAlign: "center",backgroundColor: "#d3d3d3" }}>
                      Change Approval or Rejection
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style={{ ...styles.th, width: "30%" }}>Change Request Status</th>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changeRequestStatus.accepted", formData.changeRequestStatus?.accepted, true)}
                    </td>
                    <td style={styles.td}>Accepted</td>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {renderField("changeRequestStatus.rejected", formData.changeRequestStatus?.rejected, true)}
                    </td>
                    <td style={styles.td}>Rejected</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Comments</th>
                    <td colSpan="4" style={styles.td}>{renderField("comments", formData.comments)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Change Scheduled</th>
                    <td colSpan="4" style={styles.td}>{renderDateField("changeScheduled", formData.changeScheduled)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Implementation assigned</th>
                    <td colSpan="4" style={styles.td}>{renderField("implementationAssigned", formData.implementationAssigned)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table 4: Change Implementation Details */}
            <div style={{...styles.content, marginTop:"30%"}}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th colSpan="4" style={{ ...styles.th, textAlign: "center",backgroundColor: "#d3d3d3" }}>
                      Change Implementation Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style={{ ...styles.th, width: "30%" }}>Technology</th>
                    <td style={styles.td}>{renderField("technology", formData.technology)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Policy</th>
                    <td style={styles.td}>{renderField("policy", formData.policy)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>IP Address/URL/Port</th>
                    <td style={styles.td}>{renderField("ipAddressUrlPort", formData.ipAddressUrlPort)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table 5: Change Implementation */}
            <div  style={styles.content}  >
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th colSpan="4" style={{ ...styles.th, textAlign: "center",backgroundColor: "#d3d3d3" }}>
                      Change Implementation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style={{ ...styles.th, width: "30%" }}>Staging test results:</th>
                    <td colSpan="3" style={styles.td}>{renderField("stagingTestResults", formData.stagingTestResults)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Implementation test results</th>
                    <td colSpan="3" style={styles.td}>{renderField("implementationTestResults", formData.implementationTestResults)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Date of Implementation</th>
                    <td style={styles.td}>{renderDateField("dateOfImplementation", formData.dateOfImplementation)}</td>
                    <th style={{ ...styles.th, width: "20%" }}>Status</th>
                    <td style={styles.td}>{renderField("implementationStatus", formData.implementationStatus)}</td>
                  </tr>
                  <tr>
                    <th style={{ ...styles.th, height: "200px" }}>CAB Sign off</th>
                    <td style={styles.td}></td>
                    <th style={styles.th}>Date</th>
                    <td style={styles.td}>{renderDateField("cabSignOffDate", formData.cabSignOffDate)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <button type="submit" style={styles.button}>Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)} style={styles.button}>Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <div style={styles.content}>
              <div className="head" >
                <h1 style={{ textAlign: "center", ...styles.font, fontSize: "60px" }}>{ticket.client}</h1>
                <h2 style={{ textAlign: "center", ...styles.font, fontSize: "40px" }}>Change Request Form</h2>
              </div>
            </div>

            {/* Table 1: Change Description / Change Request */}
            <div style={{...styles.content, marginTop:"100px"}}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th colSpan="4" style={{ ...styles.th, textAlign: "center",backgroundColor: "#d3d3d3" }}>
                      Change Description / Change Request : {ticket.project}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style={{ ...styles.th, width: "30%" }}>Change Request No</th>
                    <td style={styles.td}>{ticket.changeRequestNo}</td>
                    <th style={{ ...styles.th, width: "20%" }}>Project</th>
                    <td style={styles.td}>{ticket.project}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Requester</th>
                    <td style={styles.td}>{ticket.requester}</td>
                    <th style={{ ...styles.th, width: "20%" }}>Date</th>
                    <td style={styles.td}>{formatDate(ticket.date)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Department/Location</th>
                    <td style={styles.td}>{ticket.departmentLocation}</td>
                    <th style={{ ...styles.th, width: "20%" }}>Phone no.</th>
                    <td style={styles.td}>{ticket.phoneNo}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Description of the change</th>
                    <td colSpan="3" style={styles.td}>{ticket.changeDescription}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Change needed by</th>
                    <td colSpan="3" style={styles.td}>{formatDate(ticket.changeNeededBy)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Reason for the change</th>
                    <td colSpan="3" style={styles.td}>{ticket.reasonForChange}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Approver</th>
                    <td colSpan="3" style={styles.td}>{ticket.approver}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table 2: Change Impact Evaluation */}
            <div style={styles.content}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th colSpan="6" style={{ ...styles.th, textAlign: "center", verticalAlign: "middle",backgroundColor: "#d3d3d3" }}>
                      Change Impact Evaluation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th rowSpan="4" style={{ ...styles.th, width: "30%", textAlign: "center", verticalAlign: "middle" }}>
                      Change Type
                    </th>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changeType?.application ? "✓" : ""}
                    </td>
                    <td colSpan="2" style={styles.td}>Application</td>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changeType?.database ? "✓" : ""}
                    </td>
                    <td colSpan="2" style={styles.td}>Database</td>
                  </tr>
                  <tr>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changeType?.hardware ? "✓" : ""}
                    </td>
                    <td colSpan="2" style={styles.td}>Hardware</td>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changeType?.procedures ? "✓" : ""}
                    </td>
                    <td colSpan="2" style={styles.td}>Procedures</td>
                  </tr>
                  <tr>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changeType?.network ? "✓" : ""}
                    </td>
                    <td colSpan="2" style={styles.td}>Network</td>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changeType?.security ? "✓" : ""}
                    </td>
                    <td colSpan="2" style={styles.td}>Security</td>
                  </tr>
                  <tr>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changeType?.operatingSystem ? "✓" : ""}
                    </td>
                    <td colSpan="2" style={styles.td}>Operating System/Utilities</td>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changeType?.schedule ? "✓" : ""}
                    </td>
                    <td colSpan="2" style={styles.td}>Schedule</td>
                  </tr>
                  <tr>
                    <th rowSpan="4" style={{ ...styles.th, textAlign: "center", verticalAlign: "middle" }}>
                      Change Priority
                    </th>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changePriority?.urgent ? "✓" : ""}
                    </td>
                    <td style={styles.td}>Urgent</td>
                    <th rowSpan="4" style={{ ...styles.th, textAlign: "center", verticalAlign: "middle" }}>
                      Change Impact
                    </th>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changeImpact?.minor ? "✓" : ""}
                    </td>
                    <td style={styles.td}>Minor</td>
                  </tr>
                  <tr>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changePriority?.high ? "✓" : ""}
                    </td>
                    <td style={styles.td}>High</td>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changeImpact?.medium ? "✓" : ""}
                    </td>
                    <td style={styles.td}>Medium</td>
                  </tr>
                  <tr>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changePriority?.medium ? "✓" : ""}
                    </td>
                    <td style={styles.td}>Medium</td>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changeImpact?.major ? "✓" : ""}
                    </td>
                    <td style={styles.td}>Major</td>
                  </tr>
                  <tr>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changePriority?.low ? "✓" : ""}
                    </td>
                    <td style={styles.td}>Low</td>
                    <td style={styles.td}></td>
                    <td style={styles.td}></td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Environment(s) Impacted</th>
                    <td colSpan="5" style={styles.td}>{ticket.environmentsImpacted}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Resource requirements (Personnel, H/W, S/W, etc)</th>
                    <td colSpan="5" style={styles.td}>{ticket.resourceRequirements}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Test Plan Description</th>
                    <td colSpan="5" style={styles.td}>{ticket.testPlanDescription}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Roll Back</th>
                    <td colSpan="5"style={styles.td}>{ticket.rollBack}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table 3: Change Approval or Rejection */}
            <div style={styles.content}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th colSpan="5" style={{ ...styles.th, textAlign: "center",backgroundColor: "#d3d3d3" }}>
                      Change Approval or Rejection
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style={{ ...styles.th, width: "30%" }}>Change Request Status</th>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changeRequestStatus?.accepted ? "✓" : ""}
                    </td>
                    <td style={styles.td}>Accepted</td>
                    <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                      {ticket.changeRequestStatus?.rejected ? "✓" : ""}
                    </td>
                    <td style={styles.td}>Rejected</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Comments</th>
                    <td colSpan="4" style={styles.td}>{ticket.comments}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Change Scheduled</th>
                    <td colSpan="4" style={styles.td}>{formatDate(ticket.changeScheduled)}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Implementation assigned</th>
                    <td colSpan="4" style={styles.td}>{ticket.implementationAssigned}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table 4: Change Implementation Details */}
            <div style={{...styles.content, marginTop:"30%"}}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th colSpan="4" style={{ ...styles.th, textAlign: "center",backgroundColor: "#d3d3d3" }}>
                      Change Implementation Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style={{ ...styles.th, width: "30%" }}>Technology</th>
                    <td style={styles.td}>{ticket.technology}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Policy</th>
                    <td style={styles.td}>{ticket.policy}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>IP Address/URL/Port</th>
                    <td style={styles.td}>{ticket.ipAddressUrlPort}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table 5: Change Implementation */}
            <div  style={styles.content}  >
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th colSpan="4" style={{ ...styles.th, textAlign: "center",backgroundColor: "#d3d3d3" }}>
                      Change Implementation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style={{ ...styles.th, width: "30%" }}>Staging test results:</th>
                    <td colSpan="3" style={styles.td}>{ticket.stagingTestResults}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Implementation test results</th>
                    <td colSpan="3" style={styles.td}>{ticket.implementationTestResults}</td>
                  </tr>
                  <tr>
                    <th style={styles.th}>Date of Implementation</th>
                    <td style={styles.td}>{formatDate(ticket.dateOfImplementation)}</td>
                    <th style={{ ...styles.th, width: "20%" }}>Status</th>
                    <td style={styles.td}>{ticket.implementationStatus}</td>
                  </tr>
                  <tr>
                    <th style={{ ...styles.th, height: "200px" }}>CAB Sign off</th>
                    <td style={styles.td}></td>
                    <th style={styles.th}>Date</th>
                    <td style={styles.td}>{formatDate(ticket.cabSignOffDate)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {!isEditing && (
        <>
          <button onClick={downloadPDF} style={styles.button}>
            Download as PDF
          </button>
          <button onClick={handleEditClick} style={styles.button}>
            Update
          </button>
          <button style={styles.button} onClick={handleBackToDashboard}>
            Back to Dashboard
          </button>
        </>
      )}
    </>
  );
}

const styles = {
  container: {
    paddingLeft: "7%",     
    paddingRight: "7%",
    paddingTop: "1%",       
    fontSize: "1.6rem",     
    fontFamily: "Verdana",
    color: "black",
  },
  content: { marginBottom: "5%" }, 
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid black",
  },
  th: {
    border: "1px solid black",
    padding: "0.7%",        
    textAlign: "left",
    fontFamily: "Verdana",
    color: "black",
  },
  td: { 
    border: "1px solid black",
    padding: "0.7%",          
    fontFamily: "Verdana",
    color: "black",
  },
  button: {
    display: "block",
    padding: "1% 2%",     
    fontSize: "1rem",   
    backgroundColor: "#1679AB",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "0.5rem",
    margin: "1% auto 5%",   
    fontFamily: "Verdana",
    fontWeight: "bold",
  },
  font: {
    fontFamily: "Verdana",
    color: "black",
  },
};

export default Oldview;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  if (!dateString) return ""; 

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

function Oldview() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(location.state?.ticket || {});

  useEffect(() => {
    if (!location.state?.ticket) {
      const storedData = localStorage.getItem("ticket");
      if (storedData) {
        setTicket(JSON.parse(storedData));
      }
    }
  }, [location.state]);

  const handleUpdateClick = () => {
    navigate("/Dashboard/form-a", { state: { ticket } });
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard/changem");
  };

  // Styles for web view
  const styles = {
    container: {
      paddingLeft: "7%",
      paddingRight: "7%",
      paddingTop: "1%",
      fontSize: "14px",
      fontFamily: "Verdana",
      color: "black",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    content: { 
      marginBottom: "10px",
    },
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
    header: {
      textAlign: "center",
      fontSize: "25px",
      fontFamily: "Verdana",
      color: "black",
    },
    subheader: {
      textAlign: "center",
      fontSize: "15px",
      fontFamily: "Verdana",
      color: "black",
    },
    button: {
      marginRight: '10px',
    },
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.content}>
          <div className="head">
            <h1 style={styles.header}>{ticket.client}</h1>
            <h2 style={styles.subheader}>Change Request Form</h2>
          </div>
        </div>

        {/* Table 1: Change Description / Change Request */}
        <div style={{...styles.content, marginTop: "30px"}}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th colSpan="4" style={{ ...styles.th, textAlign: "center", backgroundColor: "#d3d3d3" }}>
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
                <th colSpan="6" style={{ ...styles.th, textAlign: "center", verticalAlign: "middle", backgroundColor: "#d3d3d3" }}>
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
                <th colSpan="5" style={{ ...styles.th, textAlign: "center", backgroundColor: "#d3d3d3" }}>
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
        <div style={{...styles.content, marginTop: "20px"}}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th colSpan="4" style={{ ...styles.th, textAlign: "center", backgroundColor: "#d3d3d3" }}>
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
        <div style={styles.content}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th colSpan="4" style={{ ...styles.th, textAlign: "center", backgroundColor: "#d3d3d3" }}>
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
                <th style={{ ...styles.th, height: "100px" }}>CAB Sign off</th>
                <td style={styles.td}></td>
                <th style={styles.th}>Date</th>
                <td style={styles.td}>{formatDate(ticket.cabSignOffDate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button onClick={handleUpdateClick} style={styles.button} className="btn btn-info">
          Update
        </button>
        <button style={styles.button} onClick={handleBackToDashboard} className="btn btn-info">
          Back to Dashboard
        </button>
      </div>
    </>
  );
}

export default Oldview;
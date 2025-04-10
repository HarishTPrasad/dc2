import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  if (!dateString) return ""; 

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

function OutputPage() {
  const [renderKey, setRenderKey] = useState(0);
  const location = useLocation();
 
  const contentRef = useRef();


  const [formData, setFormData] = useState(location.state?.formData || {});

  useEffect(() => {
    if (!location.state?.formData) {
      const storedData = localStorage.getItem("formData");
      if (storedData) {
        setFormData(JSON.parse(storedData));
      }
    }
  }, [location.state]);

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
    navigate("/dashboard");
  };

  return (
    <>
      <div style={styles.container} ref={contentRef} key={renderKey}>
        <div style={styles.content}>
          <div className="head" >
            <h1 style={{ textAlign: "center", ...styles.font, fontSize: "60px" }}>{formData.client}</h1>
            <h2 style={{ textAlign: "center", ...styles.font, fontSize: "40px" }}>Change Request Form</h2>
          </div>
        </div>

        {/* Table 1: Change Description / Change Request */}
        <div style={{...styles.content, marginTop:"100PX"}}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th colSpan="4" style={{ ...styles.th, textAlign: "center",backgroundColor: "#d3d3d3" }}>
                  Change Description / Change Request : {formData.project}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{ ...styles.th, width: "30%" }}>Change Request No</th>
                <td style={styles.td}>{formData.changeRequestNo}</td>
                <th style={{ ...styles.th, width: "20%" }}>Project</th>
                <td style={styles.td}>{formData.project}</td>
              </tr>
              <tr>
                <th style={styles.th}>Requester</th>
                <td style={styles.td}>{formData.requester}</td>
                <th style={{ ...styles.th, width: "20%" }}>Date</th>
                <td style={styles.td}>{formatDate(formData.date)}</td>
              </tr>
              <tr>
                <th style={styles.th}>Department/Location</th>
                <td style={styles.td}>{formData.departmentLocation}</td>
                <th style={{ ...styles.th, width: "20%" }}>Phone no.</th>
                <td style={styles.td}>{formData.phoneNo}</td>
              </tr>
              <tr>
                <th style={styles.th}>Description of the change</th>
                <td colSpan="3" style={styles.td}>{formData.changeDescription}</td>
              </tr>
              <tr>
                <th style={styles.th}>Change needed by</th>
                <td colSpan="3" style={styles.td}>{formatDate(formData.changeNeededBy)}</td>
              </tr>
              <tr>
                <th style={styles.th}>Reason for the change</th>
                <td colSpan="3" style={styles.td}>{formData.reasonForChange}</td>
              </tr>
              <tr>
                <th style={styles.th}>Approver</th>
                <td colSpan="3" style={styles.td}>{formData.approver}</td>
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
                <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%"  }}>
                  {formData.changeType?.application ? "✓" : ""}
                </td>
                <td colSpan="2" style={styles.td}>Application</td>
                <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                  {formData.changeType?.database ? "✓" : ""}
                </td>
                <td colSpan="2" style={styles.td}>Database</td>
              </tr>
              <tr>
                <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                  {formData.changeType?.hardware ? "✓" : ""}
                </td>
                <td colSpan="2" style={styles.td}>Hardware</td>
                <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                  {formData.changeType?.procedures ? "✓" : ""}
                </td>
                <td colSpan="2" style={styles.td}>Procedures</td>
              </tr>
              <tr>
                <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                  {formData.changeType?.network ? "✓" : ""}
                </td>
                <td colSpan="2" style={styles.td}>Network</td>
                <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                  {formData.changeType?.security ? "✓" : ""}
                </td>
                <td colSpan="2" style={styles.td}>Security</td>
              </tr>
              <tr>
                <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                  {formData.changeType?.operatingSystem ? "✓" : ""}
                </td>
                <td colSpan="2" style={styles.td}>Operating System/Utilities</td>
                <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                  {formData.changeType?.schedule ? "✓" : ""}
                </td>
                <td colSpan="2" style={styles.td}>Schedule</td>
              </tr>
              <tr>
                <th rowSpan="4" style={{ ...styles.th, textAlign: "center", verticalAlign: "middle" }}>
                  Change Priority
                </th>
                <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                  {formData.changePriority?.urgent ? "✓" : ""}
                </td>
                <td style={styles.td}>Urgent</td>
                <th rowSpan="4" style={{ ...styles.th, textAlign: "center", verticalAlign: "middle" }}>
                  Change Impact
                </th>
                <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                  {formData.changeImpact?.minor ? "✓" : ""}
                </td>
                <td style={styles.td}>Minor</td>
              </tr>
              <tr>
                <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                  {formData.changePriority?.high ? "✓" : ""}
                </td>
                <td style={styles.td}>High</td>
                <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                  {formData.changeImpact?.medium ? "✓" : ""}
                </td>
                <td style={styles.td}>Medium</td>
              </tr>
              <tr>
                <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                  {formData.changePriority?.medium ? "✓" : ""}
                </td>
                <td style={styles.td}>Medium</td>
                <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                  {formData.changeImpact?.major ? "✓" : ""}
                </td>
                <td style={styles.td}>Major</td>
              </tr>
              <tr>
                <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                  {formData.changePriority?.low ? "✓" : ""}
                </td>
                <td style={styles.td}>Low</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
              </tr>
              <tr>
                <th style={styles.th}>Environment(s) Impacted</th>
                <td colSpan="5" style={styles.td}>{formData.environmentsImpacted}</td>
              </tr>
              <tr>
                <th style={styles.th}>Resource requirements (Personnel, H/W, S/W, etc)</th>
                <td colSpan="5" style={styles.td}>{formData.resourceRequirements}</td>
              </tr>
              <tr>
                <th style={styles.th}>Test Plan Description</th>
                <td colSpan="5" style={styles.td}>{formData.testPlanDescription}</td>
              </tr>
              <tr>
                <th style={styles.th}>Roll Back</th>
                <td colSpan="5"style={styles.td}>{formData.rollBack}</td>
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
                  {formData.changeRequestStatus?.accepted ? "✓" : ""}
                </td>
                <td style={styles.td}>Accepted</td>
                <td style={{ ...styles.td, textAlign: "center", verticalAlign: "middle", width: "10%" }}>
                  {formData.changeRequestStatus?.rejected ? "✓" : ""}
                </td>
                <td style={styles.td}>Rejected</td>
              </tr>
              <tr>
                <th style={styles.th}>Comments</th>
                <td colSpan="4" style={styles.td}>{formData.comments}</td>
              </tr>
              <tr>
                <th style={styles.th}>Change Scheduled</th>
                <td colSpan="4" style={styles.td}>{formatDate(formData.changeScheduled)}</td>
              </tr>
              <tr>
                <th style={styles.th}>Implementation assigned</th>
                <td colSpan="4" style={styles.td}>{formData.implementationAssigned}</td>
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
                <td style={styles.td}>{formData.technology}</td>
              </tr>
              <tr>
                <th style={styles.th}>Policy</th>
                <td style={styles.td}>{formData.policy}</td>
              </tr>
              <tr>
                <th style={styles.th}>IP Address/URL/Port</th>
                <td style={styles.td}>{formData.ipAddressUrlPort}</td>
              </tr>
            
            </tbody>
          </table>
        </div>

        {/* Table 5: Change Implementation */}
        <div style={styles.content} >
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
                <td colSpan="3" style={styles.td}>{formData.stagingTestResults}</td>
              </tr>
              <tr>
                <th style={styles.th}>Implementation test results</th>
                <td colSpan="3" style={styles.td}>{formData.implementationTestResults}</td>
              </tr>
              <tr>
                <th style={styles.th}>Date of Implementation</th>
                <td style={styles.td}>{formatDate(formData.dateOfImplementation)}</td>
                <th style={{ ...styles.th, width: "20%" }}>Status</th>
                <td style={styles.td}>{formData.implementationStatus}</td>
              </tr>
              <tr>
                <th style={{ ...styles.th, height: "200px" }}>CAB Sign off</th>
                <td style={styles.td}></td>
                <th style={styles.th}>Date</th>
                <td style={styles.td}>{formatDate(formData.cabSignOffDate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button onClick={downloadPDF} style={styles.button}>
        Download as PDF
      </button>
      <button style={styles.button} onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
    </>
  );
}

const styles = {
  container: {
    paddingLeft: "7%",     // 100px from 1000px
    paddingRight: "7%",
    paddingTop: "1%",       // 10px from 1000px height estimate
    fontSize: "1.6rem",     // 28px is approx 1.6rem
    fontFamily: "Verdana",
    color: "black",
  },
  content: { marginBottom: "5%" }, // 40px from 1000px
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid black",
  },
  th: {
    border: "1px solid black",
    padding: "0.7%",          // 10px from 1000px
    textAlign: "left",
    fontFamily: "Verdana",
    color: "black",
  },
  td: { 
    border: "1px solid black",
    padding: "0.7%",          // 10px from 1000px
    fontFamily: "Verdana",
    color: "black",
  },
  button: {
    display: "block",
    padding: "1% 2%",       // 10px vertical, 20px horizontal
    fontSize: "1rem",       // 16px is approx 1rem
    backgroundColor: "#1679AB",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "0.5rem",
    margin: "1% auto 5%",   // top: 10px, bottom: 50px
    fontFamily: "Verdana",
    fontWeight: "bold",
  },
  font: {
    fontFamily: "Verdana",
    color: "black",
  },
};

export default OutputPage;
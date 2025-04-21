import React from 'react';
import { createRoot } from 'react-dom/client';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logoPath from "../Images/logo192.png"
/**
 * Generates and downloads a PDF from form data
 * @param {Object} formData - The form data to include in the PDF
 * @param {string} [fileName='Change_Request_Form.pdf'] - Name of the PDF file
 * @param {string} [logoPath=''] - Path to the logo image for the footer
 */
export const generateFormPDF = async (formData, fileName = 'Change_Request_Form.pdf') => {
  // Create temporary container component to be rendered for PDF generation
  const PDFContent = () => {
    // Format date function
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    // CSS styles for the PDF content
    const styles = {
      pdfContainer: {
        paddingLeft: '7%',
        paddingRight: '7%',
        paddingTop: '1%',
        fontSize: '16px',
        fontFamily: 'Verdana',
        color: 'black',
      },
      content: {
        marginBottom: '5%',
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid black',
      },
      th: {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'left',
        fontFamily: 'Verdana',
        color: 'black',
      },
      td: {
        border: '1px solid black',
        padding: '8px',
        fontFamily: 'Verdana',
        color: 'black',
      },
      headerCenter: {
        textAlign: 'center',
        fontFamily: 'Verdana',
        color: 'black',
      },
      customHeader: {
        textAlign: 'center',
        backgroundColor: '#d3d3d3',
      },
      checkCell: {
        width: '10%',
        textAlign: 'center',
        verticalAlign: 'middle',
      },
      wideCell: {
        width: '30%',
      },
      centerAligned: {
        textAlign: 'center',
        verticalAlign: 'middle',
      },
      spacer: {
        marginTop: '40%',
      },
      footer: {
        marginTop: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'Verdana',
        color: 'black',
        borderTop: '1px solid #ccc',
        paddingTop: '20px',
      },
      footerText: {
        fontSize: '14px',
        marginBottom: '10px',
      },
      logoContainer: {
        marginTop: '15px',
        height: '60px',
      },
      logo: {
        maxHeight: '60px',
      }
    };

    return (
      <div style={styles.pdfContainer}>
        <div style={styles.content}>
          <div>
            <h1 style={{...styles.headerCenter, fontSize: '28px'}}>{formData.client || ''}</h1>
            <h2 style={{...styles.headerCenter, fontSize: '20px'}}>Change Request Form</h2>
          </div>
        </div>

        {/* Table 1: Change Description / Change Request */}
        <div style={{...styles.content, marginTop: '40px'}}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th colSpan={4} style={{...styles.th, ...styles.customHeader}}>
                  Change Description / Change Request : {formData.project || ''}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{...styles.th, ...styles.wideCell}}>Change Request No</th>
                <td style={styles.td}>{formData.changeRequestNo || ''}</td>
                <th style={{...styles.th, width: '20%'}}>Project</th>
                <td style={styles.td}>{formData.project || ''}</td>
              </tr>
              <tr>
                <th style={styles.th}>Requester</th>
                <td style={styles.td}>{formData.requester || ''}</td>
                <th style={{...styles.th, width: '20%'}}>Date</th>
                <td style={styles.td}>{formatDate(formData.date)}</td>
              </tr>
              <tr>
                <th style={styles.th}>Department/Location</th>
                <td style={styles.td}>{formData.departmentLocation || ''}</td>
                <th style={{...styles.th, width: '20%'}}>Phone no.</th>
                <td style={styles.td}>{formData.phoneNo || ''}</td>
              </tr>
              <tr>
                <th style={styles.th}>Description of the change</th>
                <td colSpan={3} style={styles.td}>{formData.changeDescription || ''}</td>
              </tr>
              <tr>
                <th style={styles.th}>Change needed by</th>
                <td colSpan={3} style={styles.td}>{formatDate(formData.changeNeededBy)}</td>
              </tr>
              <tr>
                <th style={styles.th}>Reason for the change</th>
                <td colSpan={3} style={styles.td}>{formData.reasonForChange || ''}</td>
              </tr>
              <tr>
                <th style={styles.th}>Approver</th>
                <td colSpan={3} style={styles.td}>{formData.approver || ''}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table 2: Change Impact Evaluation */}
        <div style={styles.content}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th colSpan={6} style={{...styles.th, ...styles.customHeader}}>
                  Change Impact Evaluation
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowSpan={4} style={{...styles.th, ...styles.wideCell, ...styles.centerAligned}}>
                  Change Type
                </th>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changeType?.application ? "✓" : ""}</td>
                <td colSpan={2} style={styles.td}>Application</td>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changeType?.database ? "✓" : ""}</td>
                <td colSpan={2} style={styles.td}>Database</td>
              </tr>
              <tr>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changeType?.hardware ? "✓" : ""}</td>
                <td colSpan={2} style={styles.td}>Hardware</td>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changeType?.procedures ? "✓" : ""}</td>
                <td colSpan={2} style={styles.td}>Procedures</td>
              </tr>
              <tr>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changeType?.network ? "✓" : ""}</td>
                <td colSpan={2} style={styles.td}>Network</td>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changeType?.security ? "✓" : ""}</td>
                <td colSpan={2} style={styles.td}>Security</td>
              </tr>
              <tr>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changeType?.operatingSystem ? "✓" : ""}</td>
                <td colSpan={2} style={styles.td}>Operating System/Utilities</td>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changeType?.schedule ? "✓" : ""}</td>
                <td colSpan={2} style={styles.td}>Schedule</td>
              </tr>
              <tr>
                <th rowSpan={4} style={{...styles.th, ...styles.centerAligned}}>Change Priority</th>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changePriority?.urgent ? "✓" : ""}</td>
                <td style={styles.td}>Urgent</td>
                <th rowSpan={4} style={{...styles.th, ...styles.centerAligned}}>Change Impact</th>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changeImpact?.minor ? "✓" : ""}</td>
                <td style={styles.td}>Minor</td>
              </tr>
              <tr>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changePriority?.high ? "✓" : ""}</td>
                <td style={styles.td}>High</td>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changeImpact?.medium ? "✓" : ""}</td>
                <td style={styles.td}>Medium</td>
              </tr>
              <tr>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changePriority?.medium ? "✓" : ""}</td>
                <td style={styles.td}>Medium</td>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changeImpact?.major ? "✓" : ""}</td>
                <td style={styles.td}>Major</td>
              </tr>
              <tr>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changePriority?.low ? "✓" : ""}</td>
                <td style={styles.td}>Low</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
              </tr>
              <tr>
                <th style={styles.th}>Environment(s) Impacted</th>
                <td colSpan={5} style={styles.td}>{formData.environmentsImpacted || ''}</td>
              </tr>
              <tr>
                <th style={styles.th}>Resource requirements (Personnel, H/W, S/W, etc)</th>
                <td colSpan={5} style={styles.td}>{formData.resourceRequirements || ''}</td>
              </tr>
              <tr>
                <th style={styles.th}>Test Plan Description</th>
                <td colSpan={5} style={styles.td}>{formData.testPlanDescription || ''}</td>
              </tr>
              <tr>
                <th style={styles.th}>Roll Back</th>
                <td colSpan={5} style={styles.td}>{formData.rollBack || ''}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table 3: Change Approval or Rejection */}
        <div style={styles.content}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th colSpan={5} style={{...styles.th, ...styles.customHeader}}>Change Approval or Rejection</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{...styles.th, ...styles.wideCell}}>Change Request Status</th>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changeRequestStatus?.accepted ? "✓" : ""}</td>
                <td style={styles.td}>Accepted</td>
                <td style={{...styles.td, ...styles.checkCell}}>{formData.changeRequestStatus?.rejected ? "✓" : ""}</td>
                <td style={styles.td}>Rejected</td>
              </tr>
              <tr>
                <th style={styles.th}>Comments</th>
                <td colSpan={4} style={styles.td}>{formData.comments || ''}</td>
              </tr>
              <tr>
                <th style={styles.th}>Change Scheduled</th>
                <td colSpan={4} style={styles.td}>{formatDate(formData.changeScheduled)}</td>
              </tr>
              <tr>
                <th style={styles.th}>Implementation assigned</th>
                <td colSpan={4} style={styles.td}>{formData.implementationAssigned || ''}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table 4: Change Implementation Details */}
        <div style={{...styles.content, ...styles.spacer}}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th colSpan={4} style={{...styles.th, ...styles.customHeader}}>Change Implementation Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{...styles.th, ...styles.wideCell}}>Technology</th>
                <td style={styles.td}>{formData.technology || ''}</td>
              </tr>
              <tr>
                <th style={styles.th}>Policy</th>
                <td style={styles.td}>{formData.policy || ''}</td>
              </tr>
              <tr>
                <th style={styles.th}>IP Address/URL/Port</th>
                <td style={styles.td}>{formData.ipAddressUrlPort || ''}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table 5: Change Implementation */}
        <div style={styles.content}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th colSpan={4} style={{...styles.th, ...styles.customHeader}}>Change Implementation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{...styles.th, ...styles.wideCell}}>Staging test results:</th>
                <td colSpan={3} style={styles.td}>{formData.stagingTestResults || ''}</td>
              </tr>
              <tr>
                <th style={styles.th}>Implementation test results</th>
                <td colSpan={3} style={styles.td}>{formData.implementationTestResults || ''}</td>
              </tr>
              <tr>
                <th style={styles.th}>Date of Implementation</th>
                <td style={styles.td}>{formatDate(formData.dateOfImplementation)}</td>
                <th style={{...styles.th, width: '20%'}}>Status</th>
                <td style={styles.td}>{formData.implementationStatus || ''}</td>
              </tr>
              <tr>
                <th style={{...styles.th, height: '100px'}}>CAB Sign off</th>
                <td style={styles.td}></td>
                <th style={styles.th}>Date</th>
                <td style={styles.td}>{formatDate(formData.cabSignOffDate)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer with text and logo */}
        <div style={styles.footer}>
          <div style={styles.footerText}>Change Management Form created by DC Networks</div>
          {logoPath && (
            <div style={styles.logoContainer}>
              <img 
                src={logoPath} 
                alt="DC Networks Logo" 
                style={styles.logo}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  let root = null;
  let tempDiv = null;

  try {
    // Create a temporary div to render our React component
    tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '310mm'; // A4 width
    tempDiv.style.padding = '0%';
    document.body.appendChild(tempDiv);

    // Render the React component to the temporary div using createRoot (React 18)
    root = createRoot(tempDiv);
    root.render(<PDFContent />);

    // Wait for rendering to complete
    await new Promise(resolve => setTimeout(resolve, 100));

    // Generate the PDF
    const canvas = await html2canvas(tempDiv, {
      scale: 2, // Increased scale for better quality
      useCORS: true,
      logging: false,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL('image/jpeg', 1);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    // Clean up using React 18 approach
    if (root) {
      root.unmount();
    }
    if (tempDiv && document.body.contains(tempDiv)) {
      document.body.removeChild(tempDiv);
    }
  }
};
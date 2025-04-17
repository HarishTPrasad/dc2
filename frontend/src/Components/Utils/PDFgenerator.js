import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Generates and downloads a PDF from form data
 * @param {Object} formData - The form data to include in the PDF
 * @param {string} [fileName='Change_Request_Form.pdf'] - Name of the PDF file
 */
export const generateFormPDF = async (formData, fileName = 'Change_Request_Form.pdf') => {
  // Create a temporary hidden div to render the PDF content
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = '310mm'; // A4 width
  tempDiv.style.padding = '0%';
  tempDiv.style.fontFamily = 'Verdana';
  tempDiv.style.fontSize = '16px';
  tempDiv.style.color = 'black';
  
  document.body.appendChild(tempDiv);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Generate the PDF content HTML with proper CSS
  tempDiv.innerHTML = `
    <style>
      .pdf-container {
        padding-left: 7%;
        padding-right: 7%;
        padding-top: 1%;
        font-size: 16px;
        font-family: Verdana;
        color: black;
      }
      .content {
        margin-bottom: 3%;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid black;
      }
      .th {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
        font-family: Verdana;
        color: black;
      }
      .td {
        border: 1px solid black;
        padding: 8px;
        font-family: Verdana;
        color: black;
      }
      .header-center {
        text-align: center;
        font-family: Verdana;
        color: black;
      }
      .gray-header {
        background-color: #d3d3d3;
        text-align: center;
        
      }
      .check-cell {
        width: 10%;
        text-align: center;
        vertical-align: middle;
      }
      .wide-cell {
        width: 30%;
      }
    </style>

    <div class="pdf-container">
      <div class="content">
        <div class="head">
          <h1 class="header-center" style="font-size: 28px;">${formData.client || ''}</h1>
          <h2 class="header-center" style="font-size: 20px;">Change Request Form</h2>
        </div>
      </div>

      <!-- Table 1: Change Description / Change Request -->
      <div class="content" style="margin-top: 40px;">
        <table class="table">
          <thead>
            <tr>
              <th colspan="4" class="th gray-header">
                Change Description / Change Request : ${formData.project || ''}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="th wide-cell">Change Request No</th>
              <td class="td">${formData.changeRequestNo || ''}</td>
              <th class="th" style="width: 20%">Project</th>
              <td class="td">${formData.project || ''}</td>
            </tr>
            <tr>
              <th class="th">Requester</th>
              <td class="td">${formData.requester || ''}</td>
              <th class="th" style="width: 20%">Date</th>
              <td class="td">${formatDate(formData.date)}</td>
            </tr>
            <tr>
              <th class="th">Department/Location</th>
              <td class="td">${formData.departmentLocation || ''}</td>
              <th class="th" style="width: 20%">Phone no.</th>
              <td class="td">${formData.phoneNo || ''}</td>
            </tr>
            <tr>
              <th class="th">Description of the change</th>
              <td colspan="3" class="td">${formData.changeDescription || ''}</td>
            </tr>
            <tr>
              <th class="th">Change needed by</th>
              <td colspan="3" class="td">${formatDate(formData.changeNeededBy)}</td>
            </tr>
            <tr>
              <th class="th">Reason for the change</th>
              <td colspan="3" class="td">${formData.reasonForChange || ''}</td>
            </tr>
            <tr>
              <th class="th">Approver</th>
              <td colspan="3" class="td">${formData.approver || ''}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table 2: Change Impact Evaluation -->
      <div class="content">
        <table class="table">
          <thead>
            <tr>
              <th colspan="6" class="th gray-header">
                Change Impact Evaluation
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th rowspan="4" class="th wide-cell" style="text-align: center; vertical-align: middle;">
                Change Type
              </th>
              <td class="td check-cell">
                ${formData.changeType?.application ? "✓" : ""}
              </td>
              <td colspan="2" class="td">Application</td>
              <td class="td check-cell">
                ${formData.changeType?.database ? "✓" : ""}
              </td>
              <td colspan="2" class="td">Database</td>
            </tr>
            <tr>
              <td class="td check-cell">
                ${formData.changeType?.hardware ? "✓" : ""}
              </td>
              <td colspan="2" class="td">Hardware</td>
              <td class="td check-cell">
                ${formData.changeType?.procedures ? "✓" : ""}
              </td>
              <td colspan="2" class="td">Procedures</td>
            </tr>
            <tr>
              <td class="td check-cell">
                ${formData.changeType?.network ? "✓" : ""}
              </td>
              <td colspan="2" class="td">Network</td>
              <td class="td check-cell">
                ${formData.changeType?.security ? "✓" : ""}
              </td>
              <td colspan="2" class="td">Security</td>
            </tr>
            <tr>
              <td class="td check-cell">
                ${formData.changeType?.operatingSystem ? "✓" : ""}
              </td>
              <td colspan="2" class="td">Operating System/Utilities</td>
              <td class="td check-cell">
                ${formData.changeType?.schedule ? "✓" : ""}
              </td>
              <td colspan="2" class="td">Schedule</td>
            </tr>
            <tr>
              <th rowspan="4" class="th" style="text-align: center; vertical-align: middle;">
                Change Priority
              </th>
              <td class="td check-cell">
                ${formData.changePriority?.urgent ? "✓" : ""}
              </td>
              <td class="td">Urgent</td>
              <th rowspan="4" class="th" style="text-align: center; vertical-align: middle;">
                Change Impact
              </th>
              <td class="td check-cell">
                ${formData.changeImpact?.minor ? "✓" : ""}
              </td>
              <td class="td">Minor</td>
            </tr>
            <tr>
              <td class="td check-cell">
                ${formData.changePriority?.high ? "✓" : ""}
              </td>
              <td class="td">High</td>
              <td class="td check-cell">
                ${formData.changeImpact?.medium ? "✓" : ""}
              </td>
              <td class="td">Medium</td>
            </tr>
            <tr>
              <td class="td check-cell">
                ${formData.changePriority?.medium ? "✓" : ""}
              </td>
              <td class="td">Medium</td>
              <td class="td check-cell">
                ${formData.changeImpact?.major ? "✓" : ""}
              </td>
              <td class="td">Major</td>
            </tr>
            <tr>
              <td class="td check-cell">
                ${formData.changePriority?.low ? "✓" : ""}
              </td>
              <td class="td">Low</td>
              <td class="td"></td>
              <td class="td"></td>
            </tr>
            <tr>
              <th class="th">Environment(s) Impacted</th>
              <td colspan="5" class="td">${formData.environmentsImpacted || ''}</td>
            </tr>
            <tr>
              <th class="th">Resource requirements (Personnel, H/W, S/W, etc)</th>
              <td colspan="5" class="td">${formData.resourceRequirements || ''}</td>
            </tr>
            <tr>
              <th class="th">Test Plan Description</th>
              <td colspan="5" class="td">${formData.testPlanDescription || ''}</td>
            </tr>
            <tr>
              <th class="th">Roll Back</th>
              <td colspan="5" class="td">${formData.rollBack || ''}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table 3: Change Approval or Rejection -->
      <div class="content">
        <table class="table">
          <thead>
            <tr>
              <th colspan="5" class="th gray-header">
                Change Approval or Rejection
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="th wide-cell">Change Request Status</th>
              <td class="td check-cell">
                ${formData.changeRequestStatus?.accepted ? "✓" : ""}
              </td>
              <td class="td">Accepted</td>
              <td class="td check-cell">
                ${formData.changeRequestStatus?.rejected ? "✓" : ""}
              </td>
              <td class="td">Rejected</td>
            </tr>
            <tr>
              <th class="th">Comments</th>
              <td colspan="4" class="td">${formData.comments || ''}</td>
            </tr>
            <tr>
              <th class="th">Change Scheduled</th>
              <td colspan="4" class="td">${formatDate(formData.changeScheduled)}</td>
            </tr>
            <tr>
              <th class="th">Implementation assigned</th>
              <td colspan="4" class="td">${formData.implementationAssigned || ''}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table 4: Change Implementation Details -->
      <div class="content" style="margin-top: 300px;">
        <table class="table">
          <thead>
            <tr>
              <th colspan="4" class="th gray-header">
                Change Implementation Details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="th wide-cell">Technology</th>
              <td class="td">${formData.technology || ''}</td>
            </tr>
            <tr>
              <th class="th">Policy</th>
              <td class="td">${formData.policy || ''}</td>
            </tr>
            <tr>
              <th class="th">IP Address/URL/Port</th>
              <td class="td">${formData.ipAddressUrlPort || ''}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table 5: Change Implementation -->
      <div class="content">
        <table class="table">
          <thead>
            <tr>
              <th colspan="4" class="th gray-header">
                Change Implementation
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="th wide-cell">Staging test results:</th>
              <td colspan="3" class="td">${formData.stagingTestResults || ''}</td>
            </tr>
            <tr>
              <th class="th">Implementation test results</th>
              <td colspan="3" class="td">${formData.implementationTestResults || ''}</td>
            </tr>
            <tr>
              <th class="th">Date of Implementation</th>
              <td class="td">${formatDate(formData.dateOfImplementation)}</td>
              <th class="th" style="width: 20%">Status</th>
              <td class="td">${formData.implementationStatus || ''}</td>
            </tr>
            <tr>
              <th class="th" style="height: 100px;">CAB Sign off</th>
              <td class="td"></td>
              <th class="th">Date</th>
              <td class="td">${formatDate(formData.cabSignOffDate)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  try {
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
    // Clean up
    document.body.removeChild(tempDiv);
  }
};
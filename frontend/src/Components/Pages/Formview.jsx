import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Formview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const ticket = state?.ticket;

  const getStatusClass = (status) => {
    if (!status) return 'secondary';
    switch(status.toLowerCase()) {
      case 'pending approval': return 'warning';
      case 'in progress': return 'info';
      case 'completed': return 'success';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getPriority = () => {
    if (ticket.changePriority?.urgent) return 'Urgent';
    if (ticket.changePriority?.high) return 'High';
    if (ticket.changePriority?.medium) return 'Medium';
    if (ticket.changePriority?.low) return 'Low';
    return 'Not specified';
  };

  const getImpact = () => {
    if (ticket.changeImpact?.minor) return 'Minor';
    if (ticket.changeImpact?.medium) return 'Medium';
    if (ticket.changeImpact?.major) return 'Major';
    return 'Not specified';
  };

  const getChangeTypes = () => {
    const types = [];
    if (ticket.changeType?.application) types.push('Application');
    if (ticket.changeType?.database) types.push('Database');
    if (ticket.changeType?.hardware) types.push('Hardware');
    if (ticket.changeType?.procedures) types.push('Procedures');
    if (ticket.changeType?.network) types.push('Network');
    if (ticket.changeType?.security) types.push('Security');
    if (ticket.changeType?.operatingSystem) types.push('Operating System');
    if (ticket.changeType?.schedule) types.push('Schedule');
    return types.length > 0 ? types.join(', ') : 'Not specified';
  };

  const getStatusText = () => {
    return ticket.implementationStatus || 
           (ticket.changeRequestStatus?.accepted ? 'Pending Approval' : 
            ticket.changeRequestStatus?.rejected ? 'Rejected' : 'In Progress');
  };

  if (!ticket) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">No ticket data found</div>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Change Request Details</h2>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to List
        </button>
      </div>

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">
              {ticket.changeRequestNo} - {ticket.changeDescription}
            </h4>
            <span className={`badge badge-${getStatusClass(getStatusText())} badge-lg`}>
              {getStatusText()}
            </span>
          </div>
        </div>
        
        <div className="card-body">
          <div className="row">
            {/* Basic Information Column */}
            <div className="col-md-6">
              <div className="detail-section mb-4">
                <h5 className="section-title">Basic Information</h5>
                <dl className="row">
                  <dt className="col-sm-4">Client:</dt>
                  <dd className="col-sm-8">{ticket.client || 'Not specified'}</dd>

                  <dt className="col-sm-4">Project:</dt>
                  <dd className="col-sm-8">{ticket.project || 'Not specified'}</dd>

                  <dt className="col-sm-4">Requester:</dt>
                  <dd className="col-sm-8">{ticket.requester || 'Not specified'}</dd>

                  <dt className="col-sm-4">Date:</dt>
                  <dd className="col-sm-8">{formatDate(ticket.date)}</dd>

                  <dt className="col-sm-4">Department/Location:</dt>
                  <dd className="col-sm-8">{ticket.departmentLocation || 'Not specified'}</dd>

                  <dt className="col-sm-4">Phone:</dt>
                  <dd className="col-sm-8">{ticket.phoneNo || 'Not specified'}</dd>
                </dl>
              </div>

              <div className="detail-section mb-4">
                <h5 className="section-title">Change Classification</h5>
                <dl className="row">
                  <dt className="col-sm-4">Type:</dt>
                  <dd className="col-sm-8">{getChangeTypes()}</dd>

                  <dt className="col-sm-4">Priority:</dt>
                  <dd className="col-sm-8">{getPriority()}</dd>

                  <dt className="col-sm-4">Impact:</dt>
                  <dd className="col-sm-8">{getImpact()}</dd>

                  <dt className="col-sm-4">Technology:</dt>
                  <dd className="col-sm-8">{ticket.technology || 'Not specified'}</dd>
                </dl>
              </div>
            </div>

            {/* Change Details Column */}
            <div className="col-md-6">
              <div className="detail-section mb-4">
                <h5 className="section-title">Change Details</h5>
                <dl className="row">
                  <dt className="col-sm-4">Description:</dt>
                  <dd className="col-sm-8">{ticket.changeDescription || 'Not specified'}</dd>

                  <dt className="col-sm-4">Reason:</dt>
                  <dd className="col-sm-8">{ticket.reasonForChange || 'Not specified'}</dd>

                  <dt className="col-sm-4">Needed By:</dt>
                  <dd className="col-sm-8">{formatDate(ticket.changeNeededBy)}</dd>

                  <dt className="col-sm-4">Approver:</dt>
                  <dd className="col-sm-8">{ticket.approver || 'Not specified'}</dd>

                  <dt className="col-sm-4">Environments Impacted:</dt>
                  <dd className="col-sm-8">{ticket.environmentsImpacted || 'Not specified'}</dd>
                </dl>
              </div>

              <div className="detail-section mb-4">
                <h5 className="section-title">Implementation Details</h5>
                <dl className="row">
                  <dt className="col-sm-4">Assigned To:</dt>
                  <dd className="col-sm-8">{ticket.implementationAssigned || 'Not assigned'}</dd>

                  <dt className="col-sm-4">Scheduled Date:</dt>
                  <dd className="col-sm-8">{formatDate(ticket.changeScheduled)}</dd>

                  <dt className="col-sm-4">Resources Required:</dt>
                  <dd className="col-sm-8">{ticket.resourceRequirements || 'Not specified'}</dd>

                  <dt className="col-sm-4">Test Plan:</dt>
                  <dd className="col-sm-8">{ticket.testPlanDescription || 'Not specified'}</dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="row">
            <div className="col-md-6">
              <div className="detail-section mb-4">
                <h5 className="section-title">Technical Details</h5>
                <dl className="row">
                  <dt className="col-sm-4">Policy:</dt>
                  <dd className="col-sm-8">{ticket.policy || 'Not specified'}</dd>

                  <dt className="col-sm-4">IP/URL/Port:</dt>
                  <dd className="col-sm-8">{ticket.ipAddressUrlPort || 'Not specified'}</dd>

                  <dt className="col-sm-4">Rollback Plan:</dt>
                  <dd className="col-sm-8">{ticket.rollBack || 'Not specified'}</dd>
                </dl>
              </div>
            </div>

            <div className="col-md-6">
              <div className="detail-section mb-4">
                <h5 className="section-title">Results</h5>
                <dl className="row">
                  <dt className="col-sm-4">Staging Results:</dt>
                  <dd className="col-sm-8">{ticket.stagingTestResults || 'Not available'}</dd>

                  <dt className="col-sm-4">Implementation Results:</dt>
                  <dd className="col-sm-8">{ticket.implementationTestResults || 'Not available'}</dd>

                  <dt className="col-sm-4">Implementation Date:</dt>
                  <dd className="col-sm-8">{formatDate(ticket.dateOfImplementation)}</dd>

                  <dt className="col-sm-4">CAB Sign-off:</dt>
                  <dd className="col-sm-8">{formatDate(ticket.cabSignOffDate)}</dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          {ticket.comments && (
            <div className="detail-section mb-4">
              <h5 className="section-title">Comments</h5>
              <div className="alert alert-light">
                {ticket.comments}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons mt-4 d-flex justify-content-end">
            <button className="btn btn-primary mr-2">
              <i className="fas fa-edit mr-2"></i> Edit
            </button>
            {!ticket.changeRequestStatus?.accepted && !ticket.changeRequestStatus?.rejected && (
              <>
                <button className="btn btn-success mr-2">
                  <i className="fas fa-check mr-2"></i> Approve
                </button>
                <button className="btn btn-danger">
                  <i className="fas fa-times mr-2"></i> Reject
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-title {
          color: #1679AB;
          border-bottom: 1px solid #dee2e6;
          padding-bottom: 8px;
          margin-bottom: 15px;
        }
        .detail-section {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          border: 1px solid #dee2e6;
          height: 100%;
        }
        dt {
          font-weight: 600;
          color: #495057;
        }
        .action-buttons {
          border-top: 1px solid #dee2e6;
          padding-top: 15px;
        }
        .badge-lg {
          font-size: 1rem;
          padding: 0.5em 0.8em;
        }
      `}</style>
    </div>
  );
}

export default Formview;
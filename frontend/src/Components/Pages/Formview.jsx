import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Formview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const ticket = state?.ticket;

  const formatDate = (date) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Change Request Details</h2>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left mr-2"></i> Back
        </button>
      </div>

      <div className="card shadow-lg border-0 mb-5">
        <div className="card-header bg-primary text-white py-3 px-4">
          <h4 className="mb-0 d-flex justify-content-between align-items-center">
            <span>{ticket.changeRequestNo} - {ticket.changeDescription}</span>
            <span className={`badge bg-${ticket.implementationStatus ? 'success' : 'secondary'}`}>{ticket.implementationStatus || 'Pending'}</span>
          </h4>
        </div>

        <div className="card-body p-4">
          {/* Client and Project Info */}
          <section className="mb-5">
            <h5 className="section-title">Client & Project</h5>
            <dl className="row">
              <dt className="col-sm-3">Client:</dt>
              <dd className="col-sm-9">{ticket.client}</dd>

              <dt className="col-sm-3">Project:</dt>
              <dd className="col-sm-9">{ticket.project}</dd>

              <dt className="col-sm-3">Requester:</dt>
              <dd className="col-sm-9">{ticket.requester}</dd>

              <dt className="col-sm-3">Department/Location:</dt>
              <dd className="col-sm-9">{ticket.departmentLocation}</dd>

              <dt className="col-sm-3">Phone:</dt>
              <dd className="col-sm-9">{ticket.phoneNo}</dd>
            </dl>
          </section>

          {/* Change Impact & Evaluation */}
          <section className="mb-5">
            <h5 className="section-title">Change Impact Evaluation</h5>
            <dl className="row">
              <dt className="col-sm-3">Change Type:</dt>
              <dd className="col-sm-9">{Object.keys(ticket.changeType || {}).filter(key => ticket.changeType[key]).join(', ') || 'Not specified'}</dd>

              <dt className="col-sm-3">Priority:</dt>
              <dd className="col-sm-9">{Object.keys(ticket.changePriority || {}).find(key => ticket.changePriority[key]) || 'Not specified'}</dd>

              <dt className="col-sm-3">Impact:</dt>
              <dd className="col-sm-9">{Object.keys(ticket.changeImpact || {}).find(key => ticket.changeImpact[key]) || 'Not specified'}</dd>

              <dt className="col-sm-3">Technology:</dt>
              <dd className="col-sm-9">{ticket.technology}</dd>

              <dt className="col-sm-3">Environments Impacted:</dt>
              <dd className="col-sm-9">{ticket.environmentsImpacted}</dd>
            </dl>
          </section>

          {/* Change Approval */}
          <section className="mb-5">
            <h5 className="section-title">Change Approval</h5>
            <dl className="row">
              <dt className="col-sm-3">Approver:</dt>
              <dd className="col-sm-9">{ticket.approver}</dd>

              <dt className="col-sm-3">Change Needed By:</dt>
              <dd className="col-sm-9">{formatDate(ticket.changeNeededBy)}</dd>

              <dt className="col-sm-3">Reason For Change:</dt>
              <dd className="col-sm-9">{ticket.reasonForChange}</dd>

              <dt className="col-sm-3">Status:</dt>
              <dd className="col-sm-9">{ticket.changeRequestStatus?.accepted ? 'Accepted' : ticket.changeRequestStatus?.rejected ? 'Rejected' : 'Pending'}</dd>
            </dl>
          </section>

          {/* Implementation Details */}
          <section className="mb-5">
            <h5 className="section-title">Implementation Details</h5>
            <dl className="row">
              <dt className="col-sm-3">Assigned To:</dt>
              <dd className="col-sm-9">{ticket.implementationAssigned}</dd>

              <dt className="col-sm-3">Change Scheduled:</dt>
              <dd className="col-sm-9">{formatDate(ticket.changeScheduled)}</dd>

              <dt className="col-sm-3">Test Plan:</dt>
              <dd className="col-sm-9">{ticket.testPlanDescription}</dd>

              <dt className="col-sm-3">Resource Requirements:</dt>
              <dd className="col-sm-9">{ticket.resourceRequirements}</dd>
            </dl>
          </section>

          {/* Implementation Results */}
          <section className="mb-5">
            <h5 className="section-title">Implementation Results</h5>
            <dl className="row">
              <dt className="col-sm-3">Staging Results:</dt>
              <dd className="col-sm-9">{ticket.stagingTestResults}</dd>

              <dt className="col-sm-3">Implementation Results:</dt>
              <dd className="col-sm-9">{ticket.implementationTestResults}</dd>

              <dt className="col-sm-3">Implementation Date:</dt>
              <dd className="col-sm-9">{formatDate(ticket.dateOfImplementation)}</dd>

              <dt className="col-sm-3">Rollback Plan:</dt>
              <dd className="col-sm-9">{ticket.rollBack}</dd>
            </dl>
          </section>

          {ticket.comments && (
            <section className="mb-4">
              <h5 className="section-title">Comments</h5>
              <div className="alert alert-light border rounded p-3">{ticket.comments}</div>
            </section>
          )}

          <div className="d-flex justify-content-end border-top pt-3">

          <button className="btn btn-outline-info me-2" onClick={() => navigate('/dashboard/oldview', { state: { ticket } })}>
             <i className="fas fa-file-alt me-1"></i> Doc View
          </button>
           
            {!ticket.changeRequestStatus?.accepted && !ticket.changeRequestStatus?.rejected && (
              <>
                <button className="btn btn-success me-2">
                  <i className="fas fa-check"></i> Approve
                </button>
                <button className="btn btn-danger">
                  <i className="fas fa-times"></i> Reject
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-title {
          font-size: 1.25rem;
          color: #1679AB;
          border-bottom: 2px solid #dee2e6;
          margin-bottom: 15px;
          padding-bottom: 5px;
        }
        dl {
          margin-bottom: 0;
        }
        dt {
          font-weight: 600;
          color: #495057;
        }
        dd {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}

export default Formview;
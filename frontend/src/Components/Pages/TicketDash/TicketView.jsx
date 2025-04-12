import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function TicketView() {
  const { ticketId } = useParams();
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Harish Prasad',
      text: 'Initial investigation complete. Need more details from client.',
      timestamp: '2025-03-20 14:30',
      isInternal: true
    },
    {
      id: 2,
      author: 'Client (JNSB)',
      text: 'Here are the additional details you requested about the dashboard requirements.',
      timestamp: '2025-03-21 09:15',
      isInternal: false
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [isInternalComment, setIsInternalComment] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [attachments, setAttachments] = useState([
    { name: 'design-specs.pdf', size: '2.4 MB', uploaded: '2025-03-20' },
    { name: 'screenshot.png', size: '1.2 MB', uploaded: '2025-03-21' }
  ]);

  // Sample ticket data - in a real app this would come from an API
  const ticket = {
    id: ticketId || 'TCK-1000',
    ticketNo: 'TCK-1000',
    client: 'JNSB',
    technology: 'React/Node.js',
    subject: 'Dashboard Redesign',
    description: 'Complete redesign of the admin dashboard with new UI components and improved data visualization. Need to maintain all existing functionality while updating the look and feel.',
    priority: 'High',
    assigned: 'Harish Prasad',
    status: 'In Progress',
    createdDate: '2025-03-20',
    dueDate: '2025-04-15',
    lastUpdated: '2025-03-25',
    category: 'UI/UX',
    estimatedHours: 24,
    loggedHours: 12,
    progress: 50
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: comments.length + 1,
      author: 'Harish Prasad',
      text: newComment,
      timestamp: new Date().toISOString(),
      isInternal: isInternalComment
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploaded: new Date().toISOString().split('T')[0]
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const getPriorityClass = (priority) => {
    switch(priority.toLowerCase()) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'open': return 'primary';
      case 'in progress': return 'info';
      case 'completed': return 'success';
      case 'closed': return 'secondary';
      default: return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Ticket #{ticket.ticketNo}</h1>
        <div>
          <button className="btn btn-secondary mr-2">
            <i className="fas fa-print mr-2"></i>Print
          </button>
          <button className="btn btn-primary">
            <i className="fas fa-edit mr-2"></i>Edit Ticket
          </button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header bg-white">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                <i className="fas fa-info-circle mr-2"></i>Details
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'comments' ? 'active' : ''}`}
                onClick={() => setActiveTab('comments')}
              >
                <i className="fas fa-comments mr-2"></i>Comments ({comments.length})
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'attachments' ? 'active' : ''}`}
                onClick={() => setActiveTab('attachments')}
              >
                <i className="fas fa-paperclip mr-2"></i>Attachments ({attachments.length})
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                <i className="fas fa-history mr-2"></i>History
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body">
          {activeTab === 'details' && (
            <div className="row">
              <div className="col-md-8">
                <h3 className="mb-3">{ticket.subject}</h3>
                <div className="mb-4">
                  <h5>Description</h5>
                  <p className="text-muted">{ticket.description}</p>
                </div>

                <div className="progress mb-4" style={{ height: '10px' }}>
                  <div 
                    className={`progress-bar bg-${getStatusClass(ticket.status)}`} 
                    role="progressbar" 
                    style={{ width: `${ticket.progress}%` }}
                    aria-valuenow={ticket.progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <span>Progress: {ticket.progress}%</span>
                  <span>Estimated: {ticket.estimatedHours}h | Logged: {ticket.loggedHours}h</span>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Ticket Details</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Status</span>
                        <span className={`badge badge-${getStatusClass(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Priority</span>
                        <span className={`badge badge-${getPriorityClass(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Assigned To</span>
                        <span>{ticket.assigned}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Client</span>
                        <span>{ticket.client}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Category</span>
                        <span>{ticket.category}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Technology</span>
                        <span>{ticket.technology}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Created</span>
                        <span>{formatDate(ticket.createdDate)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Due Date</span>
                        <span className={new Date(ticket.dueDate) < new Date() ? 'text-danger font-weight-bold' : ''}>
                          {formatDate(ticket.dueDate)}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Last Updated</span>
                        <span>{formatDate(ticket.lastUpdated)}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-3">
                  <button className="btn btn-success btn-block mb-2">
                    <i className="fas fa-check mr-2"></i>Mark as Complete
                  </button>
                  <button className="btn btn-warning btn-block">
                    <i className="fas fa-exchange-alt mr-2"></i>Reassign Ticket
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div>
              <div className="mb-4">
                {comments.map((comment) => (
                  <div 
                    key={comment.id} 
                    className={`mb-3 p-3 rounded ${comment.isInternal ? 'bg-light' : 'bg-white border'}`}
                  >
                    <div className="d-flex justify-content-between mb-2">
                      <strong>{comment.author}</strong>
                      <small className="text-muted">{comment.timestamp}</small>
                    </div>
                    <p className="mb-0">{comment.text}</p>
                    {comment.isInternal && (
                      <small className="text-muted">
                        <i className="fas fa-lock mr-1"></i>Internal note
                      </small>
                    )}
                  </div>
                ))}
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-header bg-light">
                  <h5 className="mb-0">Add Comment</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleCommentSubmit}>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Add your comment here..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="internalComment"
                        checked={isInternalComment}
                        onChange={(e) => setIsInternalComment(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="internalComment">
                        Internal Comment (not visible to client)
                      </label>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <button type="button" className="btn btn-light mr-2">
                          <i className="fas fa-paperclip mr-1"></i>Attach File
                        </button>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Post Comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attachments' && (
            <div>
              <div className="mb-3">
                <button className="btn btn-primary">
                  <i className="fas fa-plus mr-2"></i>Upload Files
                  <input 
                    type="file" 
                    className="d-none" 
                    multiple 
                    onChange={handleFileUpload}
                  />
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Size</th>
                      <th>Uploaded</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attachments.map((file, index) => (
                      <tr key={index}>
                        <td>
                          <i className="far fa-file mr-2"></i>
                          {file.name}
                        </td>
                        <td>{file.size}</td>
                        <td>{file.uploaded}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary mr-2">
                            <i className="fas fa-download"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h4 className="mb-4">Ticket History</h4>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-badge bg-primary">
                    <i className="fas fa-ticket-alt"></i>
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h5 className="timeline-title">Ticket Created</h5>
                      <p className="text-muted">
                        <small>By Harish Prasad on {formatDate(ticket.createdDate)}</small>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-badge bg-info">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h5 className="timeline-title">Status Changed</h5>
                      <p className="text-muted">
                        <small>From "Open" to "In Progress" by Harish Prasad on 2025-03-21</small>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-badge bg-warning">
                    <i className="fas fa-comment"></i>
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h5 className="timeline-title">Comment Added</h5>
                      <p className="text-muted">
                        <small>By Client (JNSB) on 2025-03-21</small>
                      </p>
                    </div>
                    <div className="timeline-body">
                      <p>Here are the additional details you requested about the dashboard requirements.</p>
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-badge bg-secondary">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h5 className="timeline-title">Due Date Updated</h5>
                      <p className="text-muted">
                        <small>From 2025-04-10 to 2025-04-15 by Harish Prasad on 2025-03-22</small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketView;
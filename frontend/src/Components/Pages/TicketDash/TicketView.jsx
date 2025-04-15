import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../../API/api';

function TicketView() {
  const { ticketId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isInternalComment, setIsInternalComment] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reassignOptions, setReassignOptions] = useState([]);
  const [showReassignDropdown, setShowReassignDropdown] = useState(false);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/ticket/${ticket._id}`);
        setTicket(response.data.data);
        setComments(response.data.data.comments || []);
        setAttachments(response.data.data.attachments || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchReassignOptions = async () => {
      try {
        const response = await api.get('/users');
        setReassignOptions(response.data.data);
      } catch (err) {
        console.error('Error fetching reassign options:', err);
      }
    };

    if (location.state && location.state.ticket) {
      setTicket(location.state.ticket);
      setComments(location.state.ticket.comments || []);
      setAttachments(location.state.ticket.attachments || []);
      setLoading(false);
    } else {
      fetchTicketDetails();
      fetchReassignOptions();
    }
  }, [ticketId, location.state]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await api.post(`/ticket/${ticket._id}/comment`, {
        text: newComment,
        isInternal: isInternalComment,
      });

      setComments([...comments, response.data.data]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
      alert('Failed to add comment');
    }
  };

  // const handleFileUpload = async (e) => {
  //   const files = Array.from(e.target.files);
  //   const formData = new FormData();
  //   files.forEach((file) => formData.append('attachments', file));

  //   try {
  //     const response = await api.post(`/ticket/${ticketId}/attachment`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     setAttachments([...attachments, ...response.data.data]);
  //   } catch (err) {
  //     console.error('Error uploading files:', err);
  //     alert('Failed to upload files');
  //   }
  // };

  const getPriorityClass = (priority) => {
    if (!priority) return 'secondary';
    switch (priority.toLowerCase()) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const getStatusClass = (status) => {
    if (!status) return 'secondary';
    switch (status.toLowerCase()) {
      case 'open':
        return 'primary';
      case 'in progress':
        return 'info';
      case 'completed':
        return 'success';
      case 'closed':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateProgress = () => {
    if (!ticket || !ticket.createdat || !ticket.duedate) return 0;
    const startDate = new Date(ticket.createdat);
    const endDate = new Date(ticket.duedate);
    const currentDate = new Date();

    if (currentDate < startDate) return 0;
    if (currentDate >= endDate) return 100;

    const totalDuration = endDate - startDate;
    const elapsedDuration = currentDate - startDate;
    return (elapsedDuration / totalDuration) * 100;
  };

  const calculateTimeLeft = () => {
    if (!ticket || !ticket.duedate) return '';
    const endDate = new Date(ticket.duedate);
    const currentDate = new Date();
    const timeLeft = endDate - currentDate;

    if (timeLeft <= 0) return 'Overdue';

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days} days, ${hours} hours`;
  };

  const handleCloseTicket = async () => {
    try {
      // await api.put(`/ticket/${ticketId}`, { status: 'Closed' });
      // setTicket({ ...ticket, status: 'Closed' });
      await api.put(`/ticket/${ticket._id}`, { status: 'Closed' });
    const response = await api.get(`/ticket/${ticket._id}`);
    setTicket(response.data.data);
    } catch (err) {
      console.error('Error closing ticket:', err);
      alert('Failed to close ticket');
    }
  };

  

  const handleReassign = async (assignedTo) => {
    try {
      await api.put(`/ticket/${ticket._id}`, { assignedto: assignedTo });
      setTicket({ ...ticket, assignedto: assignedTo });
      setShowReassignDropdown(false);
    } catch (err) {
      console.error('Error reassigning ticket:', err);
      alert('Failed to reassign ticket');
    }
  };

  const handleEditTicket = () => {
    navigate(`/dashboard/ticketupdate`, { state: { ticket: ticket } });
  };

  if (loading) return <div className="container mt-4">Loading ticket details...</div>;
  if (error) return <div className="container mt-4">Error: {error}</div>;
  if (!ticket) return <div className="container mt-4">Ticket not found.</div>;

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Ticket #{ticket.ticketno}</h1>
        <div>
          <button className="btn btn-primary" onClick={handleEditTicket}>
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
                    style={{ width: `${calculateProgress()}%` }}
                    aria-valuenow={calculateProgress()}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <span>Progress: {calculateProgress().toFixed(2)}%</span>
                  <span>Time Left: {calculateTimeLeft()}</span>
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
                        <span>{ticket.assignedto}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Client</span>
                        <span>{ticket.client}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Created</span>
                        <span>{formatDate(ticket.createdat)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Due Date</span>
                        <span className={new Date(ticket.duedate) < new Date() ? 'text-danger font-weight-bold' : ''}>
                          {formatDate(ticket.duedate)}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Last Updated</span>
                        <span>{formatDate(ticket.updatedat)}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-3">
                  <button className="btn btn-success btn-block mb-2" onClick={handleCloseTicket}>
                    <i className="fas fa-check mr-2"></i>Close Ticket
                  </button>
                  <div className="position-relative">
                    <button className="btn btn-warning btn-block" onClick={() => setShowReassignDropdown(!showReassignDropdown)}>
                      <i className="fas fa-exchange-alt mr-2"></i>Reassign Ticket
                    </button>
                    {showReassignDropdown && (
                      <div className="dropdown-menu show position-absolute w-100">
                        {reassignOptions.map((user) => (
                          <button
                            key={user._id}
                            className="dropdown-item"
                            onClick={() => handleReassign(user.name)}
                          >
                            {user.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div>
              <div className="mb-4">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className={`mb-3 p-3 rounded ${comment.isInternal ? 'bg-light' : 'bg-white border'}`}
                  >
                    <div className="d-flex justify-content-between mb-2">
                      <strong>{comment.author}</strong>
                      <small className="text-muted">{formatDate(comment.createdAt)}</small>
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
                    <div className="d-flex justify-content-between">
                      <div></div>
                      <button type="submit" className="btn btn-primary">
                        Post Comment
                      </button>
                    </div>
                  </form>
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
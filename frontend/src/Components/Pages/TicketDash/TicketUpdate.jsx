import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../API/api';

function TicketUpdate() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = sessionStorage.getItem("username") || "User";
  const initialTicketData = location.state?.ticket || {};

  const [formData, setFormData] = useState({
    ticketno: initialTicketData.ticketno || `TCK-`,
    client: initialTicketData.client || '',
    status: initialTicketData.status || 'Open',
    priority: initialTicketData.priority || 'Medium',
    assignedto: initialTicketData.assignedto || '',
    createdby: initialTicketData.createdby || username,
    createdat: initialTicketData.createdat ? new Date(initialTicketData.createdat) : new Date(),
    duedate: initialTicketData.duedate ? new Date(initialTicketData.duedate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    description: initialTicketData.description || '',
    lastupdate: {
      lastupdateby: username,
      timestamp: new Date()
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const clients = [
    'JNSB', 'BWRUCB', 'PNSB', 'VCOB', 'KNSB',
    'RNBX', 'SMCBL', 'INSB', 'MUCB', 'GNCB', 'VK-ENG'
  ];

  const assignees = [
    'Harish Prasad', 'Bharat Suthar',
    'Laxman Suthar', 'Kailash Suthar'
  ];

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      lastupdate: {
        lastupdateby: username,
        timestamp: new Date()
      }
    }));
  }, [formData.client, formData.status, formData.priority, formData.assignedto, formData.description]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: new Date(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await api.put(`/ticket/${initialTicketData._id}`, formData);

      if (response.status === 200) {
        navigate('/dashboard/ticket', {
          state: { message: 'Ticket updated successfully!' }
        });
        console.log(formData);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update ticket');
      console.error('Error updating ticket:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      ticketno: initialTicketData.ticketno || `TCK-`,
      client: initialTicketData.client || '',
      status: initialTicketData.status || 'Open',
      priority: initialTicketData.priority || 'Medium',
      assignedto: initialTicketData.assignedto || '',
      createdby: initialTicketData.createdby || username,
      createdat: initialTicketData.createdat ? new Date(initialTicketData.createdat) : new Date(),
      duedate: initialTicketData.duedate ? new Date(initialTicketData.duedate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      description: initialTicketData.description || '',
      lastupdate: {
        lastupdateby: username,
        timestamp: new Date()
      }
    });
    setError('');
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header text-white" style={{ backgroundColor: '#1679AB' }}>
          <h2 className="mb-0">
            <i className="fas fa-ticket-alt mr-2"></i>
            Update Ticket
          </h2>
        </div>

        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="ticketno">Ticket Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="ticketno"
                  name="ticketno"
                  value={formData.ticketno}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="client">Client <span className="text-danger">*</span></label>
                <select
                  className="form-control"
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Client</option>
                  {clients.map(client => (
                    <option key={client} value={client}>{client}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="createdby">Created By</label>
                <input
                  type="text"
                  className="form-control"
                  id="createdby"
                  name="createdby"
                  value={formData.createdby}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="assignedto">Assigned To <span className="text-danger">*</span></label>
                <select
                  className="form-control"
                  id="assignedto"
                  name="assignedto"
                  value={formData.assignedto}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Assignee</option>
                  {assignees.map(assignee => (
                    <option key={assignee} value={assignee}>{assignee}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="priority">Priority <span className="text-danger">*</span></label>
                <select
                  className="form-control"
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="status">Status <span className="text-danger">*</span></label>
                <select
                  className="form-control"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="createdat">Created Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="createdat"
                  name="createdat"
                  value={formData.createdat.toISOString().slice(0, 16)}
                  onChange={handleDateChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description <span className="text-danger">*</span></label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Detailed description of the issue..."
              />
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="duedate">Due Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="duedate"
                  name="duedate"
                  value={formData.duedate.toISOString().slice(0, 16)}
                  onChange={handleDateChange}
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4 border-top pt-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate('/dashboard/tickets')}
              >
                <i className="fas fa-arrow-left mr-2"></i> Back to Tickets
              </button>

              <div>
                <button
                  type="button"
                  className="btn btn-outline-danger mr-2"
                  onClick={handleReset}
                >
                  <i className="fas fa-times mr-2"></i> Clear
                </button>

                <button
                  type="submit"
                  className="btn text-white"
                  style={{ backgroundColor: '#1679AB' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save mr-2"></i> Update Ticket
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TicketUpdate;
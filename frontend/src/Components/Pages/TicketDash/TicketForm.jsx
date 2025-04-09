import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TicketForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ticketNo: generateTicketNumber(),
    client: '',
    technology: '',
    subject: '',
    priority: 'Medium',
    assigned: '',
    status: 'Open',
    description: '',
    createdDate: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0]
  });

  function generateTicketNumber() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `TCK-${randomNum}`;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      lastUpdated: new Date().toISOString().split('T')[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Ticket created:', formData);
    navigate('/dashboard/tickets');
  };

  const clients = [
    'JNSB', 'BWRUCB', 'PNSB', 'VCOB', 'KNSB', 
    'RNBX', 'SMCBL', 'INSB', 'MUCB', 'GNCB', 'VK-ENG'
  ];

  const technologies = [
    'Firewall',
    'Active Directory Server',
    'Backup',
    'SIEM',
    'Log Server',
    'User Access Management',
    'Antivirus',
    'Network Monitoring Server',
    'Network Infrastructure',
    'Others'
  ];
  
  const assignees = [
    'Harish Prasad', 'Bharat Suthar', 
    'Laxman Suthar', 'Kailash Suthar'
  ];

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header text-white" style={{ backgroundColor: '#1679AB' }}>
          <h2 className="mb-0">
            <i className="fas fa-ticket-alt mr-2"></i>
            Create New Ticket
          </h2>
        </div>
        
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="ticketNo">Ticket Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="ticketNo"
                  name="ticketNo"
                  value={formData.ticketNo}
                  onChange={handleChange}
                  readOnly
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
                <label htmlFor="technology">Technology <span className="text-danger">*</span></label>
                <select
                  className="form-control"
                  id="technology"
                  name="technology"
                  value={formData.technology}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Technology</option>
                  {technologies.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group col-md-6">
                <label htmlFor="subject">Subject <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Brief description of the issue"
                />
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
                <label htmlFor="assigned">Assigned To <span className="text-danger">*</span></label>
                <select
                  className="form-control"
                  id="assigned"
                  name="assigned"
                  value={formData.assigned}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Assignee</option>
                  {assignees.map(assignee => (
                    <option key={assignee} value={assignee}>{assignee}</option>
                  ))}
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
            </div>

            <div className="form-group">
              <label htmlFor="description">Detailed Description <span className="text-danger">*</span></label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Please provide detailed information about the issue..."
              />
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="createdDate">Created Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="createdDate"
                  name="createdDate"
                  value={formData.createdDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4 border-top pt-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate('/dashboard')}
              >
                <i className="fas fa-arrow-left mr-2"></i> Back to Tickets
              </button>
              
              <div>
                <button
                  type="button"
                  className="btn btn-outline-danger mr-2"
                  onClick={() => setFormData({
                    ticketNo: generateTicketNumber(),
                    client: '',
                    technology: '',
                    subject: '',
                    priority: 'Medium',
                    assigned: '',
                    status: 'Open',
                    description: '',
                    createdDate: new Date().toISOString().split('T')[0],
                    lastUpdated: new Date().toISOString().split('T')[0]
                  })}
                >
                  <i className="fas fa-times mr-2"></i> Clear
                </button>
                
                <button 
                  type="submit" 
                  className="btn text-white" 
                  style={{ backgroundColor: '#1679AB' }}
                >
                  <i className="fas fa-save mr-2"></i> Create Ticket
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TicketForm;

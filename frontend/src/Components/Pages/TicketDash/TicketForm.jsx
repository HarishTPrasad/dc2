// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function TicketForm() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     ticketNo: 'TCK-',
//     client: '',
//     subject: '',
//     createdBy: '',
//     priority: 'Medium',
//     assigned: '',
//     status: 'Open',
//     description: '',
//     createdDate: new Date().toISOString().split('T')[0],
//     lastUpdated: new Date().toISOString().split('T')[0],
//     dueDate: new Date().toISOString().split('T')[0]
//   });

//   const username = sessionStorage.getItem("username") || "User";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//       lastUpdated: new Date().toISOString().split('T')[0]
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Ticket created:', formData);
//     navigate('/dashboard/tickets');
//   };

//   const clients = [
//     'JNSB', 'BWRUCB', 'PNSB', 'VCOB', 'KNSB', 
//     'RNBX', 'SMCBL', 'INSB', 'MUCB', 'GNCB', 'VK-ENG'
//   ];

  
//   const assignees = [
//     'Harish Prasad', 'Bharat Suthar', 
//     'Laxman Suthar', 'Kailash Suthar'
//   ];

//   return (
//     <div className="container py-4">
//       <div className="card shadow-sm">
//         <div className="card-header text-white" style={{ backgroundColor: '#1679AB' }}>
//           <h2 className="mb-0">
//             <i className="fas fa-ticket-alt mr-2"></i>
//             Create New Ticket
//           </h2>
//         </div>
        
//         <div className="card-body">
//           <form onSubmit={handleSubmit}>
//             <div className="form-row">
//               <div className="form-group col-md-6">
//                 <label htmlFor="ticketNo">Ticket Number</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="ticketNo"
//                   name="ticketNo"
//                   value={formData.ticketNo}
//                   onChange={handleChange}
                  
//                 />
//               </div>
              
//               <div className="form-group col-md-6">
//                 <label htmlFor="client">Client <span className="text-danger">*</span></label>
//                 <select
//                   className="form-control"
//                   id="client"
//                   name="client"
//                   value={formData.client}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Client</option>
//                   {clients.map(client => (
//                     <option key={client} value={client}>{client}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="form-row">
//               {/* <div className="form-group col-md-6">
//                 <label htmlFor="technology">Technology <span className="text-danger">*</span></label>
//                 <select
//                   className="form-control"
//                   id="technology"
//                   name="technology"
//                   value={formData.technology}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Technology</option>
//                   {technologies.map(tech => (
//                     <option key={tech} value={tech}>{tech}</option>
//                   ))}
//                 </select>
//               </div> */}
              
//               <div className="form-group col-md-6">
//                 <label htmlFor="subject">Subject <span className="text-danger">*</span></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="subject"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                   placeholder="Brief description of the issue"
//                 />
//               </div>

//               <div className="form-group col-md-6">
//                 <label htmlFor="createdBy">Created By <span className="text-danger">*</span></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="createdBy"
//                   name="createdBy"
//                   value={formData.createdBy || username}
//                   onChange={handleChange}
//                   required
//                   placeholder="Brief description of the issue"
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group col-md-4">
//                 <label htmlFor="priority">Priority <span className="text-danger">*</span></label>
//                 <select
//                   className="form-control"
//                   id="priority"
//                   name="priority"
//                   value={formData.priority}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="High">High</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Low">Low</option>
//                 </select>
//               </div>
              
//               <div className="form-group col-md-4">
//                 <label htmlFor="assigned">Assigned To <span className="text-danger">*</span></label>
//                 <select
//                   className="form-control"
//                   id="assigned"
//                   name="assigned"
//                   value={formData.assigned}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Assignee</option>
//                   {assignees.map(assignee => (
//                     <option key={assignee} value={assignee}>{assignee}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="form-group col-md-4">
//                 <label htmlFor="status">Status <span className="text-danger">*</span></label>
//                 <select
//                   className="form-control"
//                   id="status"
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="Open">Open</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Completed">Completed</option>
//                   <option value="Closed">Closed</option>
//                 </select>
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="description">Detailed Description <span className="text-danger">*</span></label>
//               <textarea
//                 className="form-control"
//                 id="description"
//                 name="description"
//                 rows={5}
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//                 placeholder="Please provide detailed information about the issue..."
//               />
//             </div>

//             <div className="form-row">
//               <div className="form-group col-md-6">
//                 <label htmlFor="createdDate">Created Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   id="createdDate"
//                   name="createdDate"
//                   value={formData.createdDate}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group col-md-6">
//                 <label htmlFor="createdDate">Due Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   id="dueDate"
//                   name="dueDate"
//                   value={formData.dueDate}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="d-flex justify-content-between mt-4 border-top pt-3">
//               <button
//                 type="button"
//                 className="btn btn-outline-secondary"
//                 onClick={() => navigate('/dashboard')}
//               >
//                 <i className="fas fa-arrow-left mr-2"></i> Back to Tickets
//               </button>
              
//               <div>
//                 <button
//                   type="button"
//                   className="btn btn-outline-danger mr-2"
//                   onClick={() => setFormData({
//                     ticketNo: 'TCK-',
//                     client: '',
//                     subject: '',
//                     createdBy: '',
//                     priority: 'Medium',
//                     assigned: '',
//                     status: 'Open',
//                     description: '',
//                     createdDate: new Date().toISOString().split('T')[0],
//                     lastUpdated: new Date().toISOString().split('T')[0],
//                     dueDate: new Date().toISOString().split('T')[0]
//                   })}
//                 >
//                   <i className="fas fa-times mr-2"></i> Clear
//                 </button>
                
//                 <button 
//                   type="submit" 
//                   className="btn text-white" 
//                   style={{ backgroundColor: '#1679AB' }}
//                 >
//                   <i className="fas fa-save mr-2"></i> Create Ticket
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TicketForm;












import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../API/api';

function TicketForm() {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username") || "User";
  
  const [formData, setFormData] = useState({
    ticketno: `TCK-`, // Auto-generated ticket number
    client: '',
    status: 'Open',
    priority: 'Medium',
    assignedto: '',
    createdby: username,
    createdat: new Date(),
    duedate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default due date 7 days from now
    description: '',
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
    // Update lastupdate whenever form changes
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
      const response = await api.post('/ticket', formData);
      
      if (response.status === 201) {
        navigate('/dashboard/tickets', { 
          state: { message: 'Ticket created successfully!' } 
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create ticket');
      console.error('Error creating ticket:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      ticketno: `TCK-`,
      client: '',
      status: 'Open',
      priority: 'Medium',
      assignedto: '',
      createdby: username,
      createdat: new Date(),
      duedate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      description: '',
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
            Create New Ticket
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
                      Creating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save mr-2"></i> Create Ticket
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

export default TicketForm;

import React, { useEffect, useState } from 'react';
import api from "../API/api";
import { 
  FaUsers, 
  FaUserCircle, 
  FaChartLine, 
  FaBriefcase, 
  FaLaptopCode, 
  FaBuilding,
  FaTrash,
  FaEdit,
  FaSearch,
  FaFilter,
  FaExclamationTriangle
} from 'react-icons/fa';
import { FiSettings, FiUserPlus } from 'react-icons/fi';

// Component for summary cards
const SummaryCard = ({ title, count, icon: Icon, color, active, onClick }) => {
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div 
        className={`card border-left-${color} shadow h-100 py-2 cursor-pointer ${active ? `border-bottom-${color}` : ''}`}
        onClick={onClick}
        style={{ transition: 'all 0.3s ease' }}
      >
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">{count}</div>
            </div>
            <div className="col-auto">
              <Icon className={`fa-2x text-${color} opacity-50`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for the user form
const UserForm = ({ newUser, setNewUser, handleAddUser }) => {
  return (
    <div className="card shadow mb-4 border-0">
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-gradient-primary-to-secondary text-white">
        <h6 className="m-0 font-weight-bold">
          <FiUserPlus className="mr-2" />
          Add New User
        </h6>
        <div className="dropdown no-arrow">
          <button
            className="btn btn-sm btn-light text-primary"
            type="button"
          >
            <FiSettings />
          </button>
        </div>
      </div>
      <div className="card-body">
        <form onSubmit={handleAddUser}>
          <div className="form-row">
            <div className="form-group col-md-5">
              <label htmlFor="username">Username</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-light border-right-0">
                    <FaUserCircle className="text-primary" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control border-left-0"
                  id="username"
                  placeholder="Enter username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </div>
            <div className="form-group col-md-2 d-flex align-items-end">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={!newUser.username || !newUser.password}
              >
                <FiUserPlus className="mr-1" /> Add User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Component for the users table
const UsersTable = ({ users, confirmDelete, searchTerm }) => {
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card shadow mb-4 border-0">
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary">User Management</h6>
        <div className="dropdown no-arrow">
          <button
            className="btn btn-sm btn-light"
            type="button"
          >
            <FaFilter className="mr-1" /> Filter
          </button>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0" width="100%" cellSpacing="0">
            <thead className="thead-light">
              <tr>
                <th className="pl-4">Username</th>
                <th>Created</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user._id}>
                    <td className="align-middle pl-4">
                      <div className="d-flex align-items-center">
                        <div className="avatar-circle bg-primary text-white mr-3">
                          <FaUserCircle size={24} />
                        </div>
                        <span className="font-weight-medium">{user.username}</span>
                      </div>
                    </td>
                    <td className="align-middle">Jan 1, 2023</td>
                    <td className="align-middle text-center">
                      <button
                        className="btn btn-sm btn-outline-primary mr-2"
                        title="Edit User"
                      >
                        <FaEdit size={14} className="mr-1" /> Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Delete User"
                        onClick={() => confirmDelete(user._id)}
                      >
                        <FaTrash size={14} className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-5">
                    <div className="text-muted d-flex flex-column align-items-center">
                      <FaSearch size={32} className="text-gray-300 mb-3" />
                      <div>No users found matching "{searchTerm}"</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Component for the confirmation modal
const DeleteModal = ({ show, onClose, onConfirm }) => {
  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ 
      backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'transparent',
      zIndex: show ? 1050 : -1
    }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-0 bg-danger text-white">
            <h5 className="modal-title">
              <FaExclamationTriangle className="mr-2" />
              Confirm Deletion
            </h5>
            <button 
              type="button" 
              className="close text-white" 
              onClick={onClose}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body py-4">
            <p>Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="alert alert-warning mt-3">
              <strong>Warning:</strong> This will permanently remove all data associated with this user.
            </div>
          </div>
          <div className="modal-footer border-0">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-danger" 
              onClick={onConfirm}
            >
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Admin component
const Admin = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeForm, setActiveForm] = useState('users');
  
  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await api.get('/users');
        setUsers(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle add user
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.username || !newUser.password) return;

    try {
      const res = await api.post('/users', newUser);
      setUsers([...users, res.data]);
      setNewUser({ username: '', password: '', role: '' });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  
  // Delete user functions
  const confirmDelete = (id) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const handleRemoveUser = async () => {
    try {
      await api.delete(`/users/${userToDelete}`);
      setUsers(users.filter(user => user._id !== userToDelete));
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setShowDeleteModal(false);
    }
  };

  // Loading state
  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

  // Error state
  if (error) return (
    <div className="alert alert-danger mx-4 mt-4">
      <strong>Error:</strong> {error}
    </div>
  );

  // Summary card data
  const summaryCards = [
    { title: 'Users', count: users.length, icon: FaUsers, color: 'primary', id: 'users' },
    { title: 'Clients', count: 24, icon: FaBuilding, color: 'success', id: 'clients' },
    { title: 'Projects', count: 18, icon: FaBriefcase, color: 'info', id: 'projects' },
    { title: 'Technologies', count: 12, icon: FaLaptopCode, color: 'warning', id: 'technologies' }
  ];

  return (
    <div className="container-fluid py-4" style={{ fontFamily: 'Verdana, Geneva, sans-serif', minHeight: '100vh' }}>
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-0 text-gray-800 font-weight-bold">Admin Dashboard</h1>
          <p className="text-muted mb-0">Manage your users, clients, projects and technologies</p>
        </div>
        <div className="d-none d-sm-inline-block">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Row - Cards */}
      <div className="row mb-4">
        {summaryCards.map(card => (
          <SummaryCard
            key={card.id}
            title={card.title}
            count={card.count}
            icon={card.icon}
            color={card.color}
            active={activeForm === card.id}
            onClick={() => setActiveForm(card.id)}
          />
        ))}
      </div>

      {/* Content Row - Forms */}
      <div className="row">
        <div className="col-lg-12">
          {/* Add User Form */}
          {activeForm === 'users' && (
            <UserForm 
              newUser={newUser} 
              setNewUser={setNewUser} 
              handleAddUser={handleAddUser} 
            />
          )}

          {/* Users Table */}
          {activeForm === 'users' && (
            <UsersTable 
              users={users} 
              confirmDelete={confirmDelete} 
              searchTerm={searchTerm} 
            />
          )}

          {/* Other content for different tabs would go here */}
          {activeForm !== 'users' && (
            <div className="card shadow mb-4 border-0">
              <div className="card-body p-5 text-center">
                <h4 className="text-muted mb-3">Under Development</h4>
                <p>The {activeForm} management section is currently being developed.</p>
                <button 
                  className="btn btn-primary mt-3" 
                  onClick={() => setActiveForm('users')}
                >
                  Return to Users
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal 
        show={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
        onConfirm={handleRemoveUser} 
      />
    </div>
  );
};

export default Admin;




// import React, { useEffect, useState } from 'react';
// import api from "../API/api";
// import { 
//   FaUsers, 
//   FaUserCircle, 
//   FaChartLine, 
//   FaBriefcase, 
//   FaLaptopCode, 
//   FaBuilding,
//   FaTrash,
//   FaEdit,
//   FaSearch,
//   FaFilter,
//   FaExclamationTriangle,
//   FaPhone,
//   FaUserTie,
//   FaCheckCircle,
//   FaCode,
//   FaCalendarAlt
// } from 'react-icons/fa';
// import { FiSettings, FiUserPlus } from 'react-icons/fi';

// // Component for summary cards
// const SummaryCard = ({ title, count, icon: Icon, color, active, onClick }) => {
//   return (
//     <div className="col-xl-3 col-md-6 mb-4">
//       <div 
//         className={`card border-left-${color} shadow h-100 py-2 cursor-pointer ${active ? `border-bottom-${color}` : ''}`}
//         onClick={onClick}
//         style={{ transition: 'all 0.3s ease' }}
//       >
//         <div className="card-body">
//           <div className="row no-gutters align-items-center">
//             <div className="col mr-2">
//               <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>
//                 {title}
//               </div>
//               <div className="h5 mb-0 font-weight-bold text-gray-800">{count}</div>
//             </div>
//             <div className="col-auto">
//               <Icon className={`fa-2x text-${color} opacity-50`} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Component for the user form
// const UserForm = ({ newUser, setNewUser, handleAddUser }) => {
//   return (
//     <div className="card shadow mb-4 border-0">
//       <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-gradient-primary-to-secondary ">
//         <h6 className="m-0 font-weight-bold">
//           <FiUserPlus className="mr-2" />
//           Add New User
//         </h6>
//         <div className="dropdown no-arrow">
//           <button
//             className="btn btn-sm btn-light text-primary"
//             type="button"
//           >
//             <FiSettings />
//           </button>
//         </div>
//       </div>
//       <div className="card-body">
//         <form onSubmit={handleAddUser}>
//           <div className="form-row">
//             <div className="form-group col-md-5">
//               <label htmlFor="username">Username</label>
//               <div className="input-group">
//                 <div className="input-group-prepend">
//                   <span className="input-group-text bg-light border-right-0">
//                     <FaUserCircle className="text-primary" />
//                   </span>
//                 </div>
//                 <input
//                   type="text"
//                   className="form-control border-left-0"
//                   id="username"
//                   placeholder="Enter username"
//                   value={newUser.username}
//                   onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div className="form-group col-md-5">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 placeholder="Enter password"
//                 value={newUser.password}
//                 onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//               />
//             </div>
//             <div className="form-group col-md-2 d-flex align-items-end">
//               <button
//                 type="submit"
//                 className="btn btn-primary btn-block"
//                 disabled={!newUser.username || !newUser.password}
//               >
//                 <FiUserPlus className="mr-1" /> Add User
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Component for the clients form
// const ClientForm = ({ newClient, setNewClient, handleAddClient }) => {
//   return (
//     <div className="card shadow mb-4 border-0">
//       <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-gradient-success-to-secondary">
//         <h6 className="m-0 font-weight-bold">
//           <FiUserPlus className="mr-2" />
//           Add New Client
//         </h6>
//         <div className="dropdown no-arrow">
//           <button
//             className="btn btn-sm btn-light text-success"
//             type="button"
//           >
//             <FiSettings />
//           </button>
//         </div>
//       </div>
//       <div className="card-body">
//         <form onSubmit={handleAddClient}>
//           <div className="form-row">
//             <div className="form-group col-md-3">
//               <label htmlFor="clientName">Client Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="clientName"
//                 placeholder="Enter client name"
//                 value={newClient.name}
//                 onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
//               />
//             </div>
//             <div className="form-group col-md-3">
//               <label htmlFor="department">Department</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="department"
//                 placeholder="Enter department"
//                 value={newClient.department}
//                 onChange={(e) => setNewClient({ ...newClient, department: e.target.value })}
//               />
//             </div>
//             <div className="form-group col-md-2">
//               <label htmlFor="requester">Requester</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="requester"
//                 placeholder="Enter requester"
//                 value={newClient.requester}
//                 onChange={(e) => setNewClient({ ...newClient, requester: e.target.value })}
//               />
//             </div>
//             <div className="form-group col-md-2">
//               <label htmlFor="approver">Approver</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="approver"
//                 placeholder="Enter approver"
//                 value={newClient.approver}
//                 onChange={(e) => setNewClient({ ...newClient, approver: e.target.value })}
//               />
//             </div>
//             <div className="form-group col-md-2">
//               <label htmlFor="phone">Phone No.</label>
//               <div className="input-group">
//                 <div className="input-group-prepend">
//                   <span className="input-group-text bg-light border-right-0">
//                     <FaPhone className="text-success" />
//                   </span>
//                 </div>
//                 <input
//                   type="text"
//                   className="form-control border-left-0"
//                   id="phone"
//                   placeholder="Phone number"
//                   value={newClient.phone}
//                   onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group col-md-10">
//               <label htmlFor="notes">Notes</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="notes"
//                 placeholder="Additional notes"
//                 value={newClient.notes}
//                 onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
//               />
//             </div>
//             <div className="form-group col-md-2 d-flex align-items-end">
//               <button
//                 type="submit"
//                 className="btn btn-success btn-block"
//                 disabled={!newClient.name}
//               >
//                 <FiUserPlus className="mr-1" /> Add Client
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Component for the projects form
// const ProjectForm = ({ newProject, setNewProject, handleAddProject }) => {
//   return (
//     <div className="card shadow mb-4 border-0">
//       <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-gradient-info-to-secondary">
//         <h6 className="m-0 font-weight-bold">
//           <FaBriefcase className="mr-2" />
//           Add New Project
//         </h6>
//         <div className="dropdown no-arrow">
//           <button
//             className="btn btn-sm btn-light text-info"
//             type="button"
//           >
//             <FiSettings />
//           </button>
//         </div>
//       </div>
//       <div className="card-body">
//         <form onSubmit={handleAddProject}>
//           <div className="form-row">
//             <div className="form-group col-md-4">
//               <label htmlFor="projectName">Project Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="projectName"
//                 placeholder="Enter project name"
//                 value={newProject.name}
//                 onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
//               />
//             </div>
//             <div className="form-group col-md-3">
//               <label htmlFor="client">Client</label>
//               <select
//                 className="form-control"
//                 id="client"
//                 value={newProject.client}
//                 onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
//               >
//                 <option value="">Select client</option>
//                 <option value="Client 1">Client 1</option>
//                 <option value="Client 2">Client 2</option>
//                 <option value="Client 3">Client 3</option>
//               </select>
//             </div>
//             <div className="form-group col-md-3">
//               <label htmlFor="status">Status</label>
//               <select
//                 className="form-control"
//                 id="status"
//                 value={newProject.status}
//                 onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
//               >
//                 <option value="Planning">Planning</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="On Hold">On Hold</option>
//                 <option value="Completed">Completed</option>
//               </select>
//             </div>
//             <div className="form-group col-md-2 d-flex align-items-end">
//               <button
//                 type="submit"
//                 className="btn btn-info btn-block"
//                 disabled={!newProject.name}
//               >
//                 <FaBriefcase className="mr-1" /> Add Project
//               </button>
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group col-md-12">
//               <label htmlFor="description">Description</label>
//               <textarea
//                 className="form-control"
//                 id="description"
//                 rows="2"
//                 placeholder="Project description"
//                 value={newProject.description}
//                 onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
//               ></textarea>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Component for the technologies form
// const TechnologyForm = ({ newTech, setNewTech, handleAddTech }) => {
//   return (
//     <div className="card shadow mb-4 border-0">
//       <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-gradient-warning-to-secondary">
//         <h6 className="m-0 font-weight-bold">
//           <FaLaptopCode className="mr-2" />
//           Add New Technology
//         </h6>
//         <div className="dropdown no-arrow">
//           <button
//             className="btn btn-sm btn-light text-warning"
//             type="button"
//           >
//             <FiSettings />
//           </button>
//         </div>
//       </div>
//       <div className="card-body">
//         <form onSubmit={handleAddTech}>
//           <div className="form-row">
//             <div className="form-group col-md-5">
//               <label htmlFor="techName">Technology Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="techName"
//                 placeholder="Enter technology name"
//                 value={newTech.name}
//                 onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
//               />
//             </div>
//             <div className="form-group col-md-5">
//               <label htmlFor="category">Category</label>
//               <select
//                 className="form-control"
//                 id="category"
//                 value={newTech.category}
//                 onChange={(e) => setNewTech({ ...newTech, category: e.target.value })}
//               >
//                 <option value="">Select category</option>
//                 <option value="Frontend">Frontend</option>
//                 <option value="Backend">Backend</option>
//                 <option value="Database">Database</option>
//                 <option value="DevOps">DevOps</option>
//                 <option value="Mobile">Mobile</option>
//               </select>
//             </div>
//             <div className="form-group col-md-2 d-flex align-items-end">
//               <button
//                 type="submit"
//                 className="btn btn-warning btn-block"
//                 disabled={!newTech.name}
//               >
//                 <FaLaptopCode className="mr-1" /> Add Tech
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Component for the users table
// const UsersTable = ({ users, confirmDelete, searchTerm }) => {
//   const filteredUsers = users.filter(user =>
//     user.username.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="card shadow mb-4 border-0">
//       <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//         <h6 className="m-0 font-weight-bold">User Management</h6>
//         <div className="dropdown no-arrow">
//           <button
//             className="btn btn-sm btn-light"
//             type="button"
//           >
//             <FaFilter className="mr-1" /> Filter
//           </button>
//         </div>
//       </div>
//       <div className="card-body p-0">
//         <div className="table-responsive">
//           <table className="table table-hover mb-0" width="100%" cellSpacing="0">
//             <thead className="thead-light">
//               <tr>
//                 <th className="pl-4">Username</th>
//                 <th>Created</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.length > 0 ? (
//                 filteredUsers.map(user => (
//                   <tr key={user._id}>
//                     <td className="align-middle pl-4">
//                       <div className="d-flex align-items-center">
//                         <div className=" mr-2">
//                           <FaUserCircle size={24} />
//                         </div>
//                         <span className="font-weight-medium">{user.username}</span>
//                       </div>
//                     </td>
//                     <td className="align-middle">Jan 1, 2023</td>
//                     <td className="align-middle text-center">
//                       <button
//                         className="btn btn-sm btn-outline-primary mr-2"
//                         title="Edit User"
//                       >
//                         <FaEdit size={14} className="mr-1" /> Edit
//                       </button>
//                       <button
//                         className="btn btn-sm btn-outline-danger"
//                         title="Delete User"
//                         onClick={() => confirmDelete(user._id)}
//                       >
//                         <FaTrash size={14} className="mr-1" /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" className="text-center py-5">
//                     <div className="text-muted d-flex flex-column align-items-center">
//                       <FaSearch size={32} className="text-gray-300 mb-3" />
//                       <div>No users found matching "{searchTerm}"</div>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Component for the clients table
// const ClientsTable = ({ clients, confirmDelete, searchTerm }) => {
//   const filteredClients = clients.filter(client =>
//     client.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="card shadow mb-4 border-0">
//       <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//         <h6 className="m-0 font-weight-bold">Client Management</h6>
//         <div className="dropdown no-arrow">
//           <button
//             className="btn btn-sm btn-light"
//             type="button"
//           >
//             <FaFilter className="mr-1" /> Filter
//           </button>
//         </div>
//       </div>
//       <div className="card-body p-0">
//         <div className="table-responsive">
//           <table className="table table-hover mb-0" width="100%" cellSpacing="0">
//             <thead className="thead-light">
//               <tr>
//                 <th className="pl-4">Client Name</th>
//                 <th>Department</th>
//                 <th>Requester</th>
//                 <th>Approver</th>
//                 <th>Phone</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredClients.length > 0 ? (
//                 filteredClients.map(client => (
//                   <tr key={client._id}>
//                     <td className="align-middle pl-4">
//                       <div className="d-flex align-items-center">
//                         <div className=" mr-2">
//                           <FaBuilding size={24} className="text-success" />
//                         </div>
//                         <span className="font-weight-medium">{client.name}</span>
//                       </div>
//                     </td>
//                     <td className="align-middle">{client.department}</td>
//                     <td className="align-middle">
//                       <div className="d-flex align-items-center">
//                         <FaUserTie size={16} className="mr-2 text-muted" />
//                         {client.requester}
//                       </div>
//                     </td>
//                     <td className="align-middle">
//                       <div className="d-flex align-items-center">
//                         <FaCheckCircle size={16} className="mr-2 text-muted" />
//                         {client.approver}
//                       </div>
//                     </td>
//                     <td className="align-middle">
//                       <div className="d-flex align-items-center">
//                         <FaPhone size={14} className="mr-2 text-muted" />
//                         {client.phone}
//                       </div>
//                     </td>
//                     <td className="align-middle text-center">
//                       <button
//                         className="btn btn-sm btn-outline-success mr-2"
//                         title="Edit Client"
//                       >
//                         <FaEdit size={14} className="mr-1" /> Edit
//                       </button>
//                       <button
//                         className="btn btn-sm btn-outline-danger"
//                         title="Delete Client"
//                         onClick={() => confirmDelete(client._id)}
//                       >
//                         <FaTrash size={14} className="mr-1" /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center py-5">
//                     <div className="text-muted d-flex flex-column align-items-center">
//                       <FaSearch size={32} className="text-gray-300 mb-3" />
//                       <div>No clients found matching "{searchTerm}"</div>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Component for the projects table
// const ProjectsTable = ({ projects, confirmDelete, searchTerm }) => {
//   const filteredProjects = projects.filter(project =>
//     project.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="card shadow mb-4 border-0">
//       <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//         <h6 className="m-0 font-weight-bold">Project Management</h6>
//         <div className="dropdown no-arrow">
//           <button
//             className="btn btn-sm btn-light"
//             type="button"
//           >
//             <FaFilter className="mr-1" /> Filter
//           </button>
//         </div>
//       </div>
//       <div className="card-body p-0">
//         <div className="table-responsive">
//           <table className="table table-hover mb-0" width="100%" cellSpacing="0">
//             <thead className="thead-light">
//               <tr>
//                 <th className="pl-4">Project Name</th>
//                 <th>Client</th>
//                 <th>Status</th>
//                 <th>Start Date</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProjects.length > 0 ? (
//                 filteredProjects.map(project => (
//                   <tr key={project._id}>
//                     <td className="align-middle pl-4">
//                       <div className="d-flex align-items-center">
//                         <div className=" mr-2">
//                           <FaBriefcase size={24} className="text-info" />
//                         </div>
//                         <span className="font-weight-medium">{project.name}</span>
//                       </div>
//                     </td>
//                     <td className="align-middle">{project.client}</td>
//                     <td className="align-middle">
//                       <span className={`badge badge-${getStatusBadgeClass(project.status)}`}>
//                         {project.status}
//                       </span>
//                     </td>
//                     <td className="align-middle">
//                       <div className="d-flex align-items-center">
//                         <FaCalendarAlt size={14} className="mr-2 text-muted" />
//                         Jan 15, 2023
//                       </div>
//                     </td>
//                     <td className="align-middle text-center">
//                       <button
//                         className="btn btn-sm btn-outline-info mr-2"
//                         title="Edit Project"
//                       >
//                         <FaEdit size={14} className="mr-1" /> Edit
//                       </button>
//                       <button
//                         className="btn btn-sm btn-outline-danger"
//                         title="Delete Project"
//                         onClick={() => confirmDelete(project._id)}
//                       >
//                         <FaTrash size={14} className="mr-1" /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="text-center py-5">
//                     <div className="text-muted d-flex flex-column align-items-center">
//                       <FaSearch size={32} className="text-gray-300 mb-3" />
//                       <div>No projects found matching "{searchTerm}"</div>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper function for project status badges
// const getStatusBadgeClass = (status) => {
//   switch(status) {
//     case 'Planning': return 'secondary';
//     case 'In Progress': return 'primary';
//     case 'On Hold': return 'warning';
//     case 'Completed': return 'success';
//     default: return 'light';
//   }
// };

// // Component for the technologies table
// const TechnologiesTable = ({ technologies, confirmDelete, searchTerm }) => {
//   const filteredTechs = technologies.filter(tech =>
//     tech.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="card shadow mb-4 border-0">
//       <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//         <h6 className="m-0 font-weight-bold">Technology Management</h6>
//         <div className="dropdown no-arrow">
//           <button
//             className="btn btn-sm btn-light"
//             type="button"
//           >
//             <FaFilter className="mr-1" /> Filter
//           </button>
//         </div>
//       </div>
//       <div className="card-body p-0">
//         <div className="table-responsive">
//           <table className="table table-hover mb-0" width="100%" cellSpacing="0">
//             <thead className="thead-light">
//               <tr>
//                 <th className="pl-4">Technology</th>
//                 <th>Category</th>
//                 <th>Added On</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTechs.length > 0 ? (
//                 filteredTechs.map(tech => (
//                   <tr key={tech._id}>
//                     <td className="align-middle pl-4">
//                       <div className="d-flex align-items-center">
//                         <div className=" mr-2">
//                           <FaCode size={24} className="text-warning" />
//                         </div>
//                         <span className="font-weight-medium">{tech.name}</span>
//                       </div>
//                     </td>
//                     <td className="align-middle">
//                       <span className={`badge badge-${getCategoryBadgeClass(tech.category)}`}>
//                         {tech.category}
//                       </span>
//                     </td>
//                     <td className="align-middle">
//                       <div className="d-flex align-items-center">
//                         <FaCalendarAlt size={14} className="mr-2 text-muted" />
//                         Jan 1, 2023
//                       </div>
//                     </td>
//                     <td className="align-middle text-center">
//                       <button
//                         className="btn btn-sm btn-outline-warning mr-2"
//                         title="Edit Technology"
//                       >
//                         <FaEdit size={14} className="mr-1" /> Edit
//                       </button>
//                       <button
//                         className="btn btn-sm btn-outline-danger"
//                         title="Delete Technology"
//                         onClick={() => confirmDelete(tech._id)}
//                       >
//                         <FaTrash size={14} className="mr-1" /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center py-5">
//                     <div className="text-muted d-flex flex-column align-items-center">
//                       <FaSearch size={32} className="text-gray-300 mb-3" />
//                       <div>No technologies found matching "{searchTerm}"</div>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper function for technology category badges
// const getCategoryBadgeClass = (category) => {
//   switch(category) {
//     case 'Frontend': return 'primary';
//     case 'Backend': return 'success';
//     case 'Database': return 'info';
//     case 'DevOps': return 'danger';
//     case 'Mobile': return 'warning';
//     default: return 'light';
//   }
// };

// // Component for the confirmation modal
// const DeleteModal = ({ show, onClose, onConfirm, entity }) => {
//   return (
//     <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ 
//       backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'transparent',
//       zIndex: show ? 1050 : -1
//     }}>
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content border-0 shadow">
//           <div className="modal-header border-0 bg-danger text-white">
//             <h5 className="modal-title">
//               <FaExclamationTriangle className="mr-2" />
//               Confirm Deletion
//             </h5>
//             <button 
//               type="button" 
//               className="close text-white" 
//               onClick={onClose}
//             >
//               <span>&times;</span>
//             </button>
//           </div>
//           <div className="modal-body py-4">
//             <p>Are you sure you want to delete this {entity}? This action cannot be undone.</p>
//             <div className="alert alert-warning mt-3">
//               <strong>Warning:</strong> This will permanently remove all data associated with this {entity}.
//             </div>
//           </div>
//           <div className="modal-footer border-0">
//             <button 
//               type="button" 
//               className="btn btn-secondary" 
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button 
//               type="button" 
//               className="btn btn-danger" 
//               onClick={onConfirm}
//             >
//               Delete {entity.charAt(0).toUpperCase() + entity.slice(1)}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Admin component
// const Admin = () => {
//   const [users, setUsers] = useState([]);
//   const [clients, setClients] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [technologies, setTechnologies] = useState([]);
  
//   const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' });
//   const [newClient, setNewClient] = useState({ 
//     name: '', 
//     department: '', 
//     requester: '', 
//     approver: '', 
//     phone: '', 
//     notes: '' 
//   });
//   const [newProject, setNewProject] = useState({ 
//     name: '', 
//     client: '', 
//     status: 'Planning', 
//     description: '' 
//   });
//   const [newTech, setNewTech] = useState({ 
//     name: '', 
//     category: '' 
//   });
  
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [entityToDelete, setEntityToDelete] = useState(null);
//   const [entityType, setEntityType] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeForm, setActiveForm] = useState('users');
  
//   // Fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         // In a real app, these would be API calls
//         // Mock data for demonstration
//         setUsers([
//           { _id: '1', username: 'admin' },
//           { _id: '2', username: 'user1' },
//           { _id: '3', username: 'user2' }
//         ]);
        
//         setClients([
//           { _id: '1', name: 'Acme Corp', department: 'IT', requester: 'John Doe', approver: 'Jane Smith', phone: '555-1234' },
//           { _id: '2', name: 'Globex', department: 'Finance', requester: 'Mike Johnson', approver: 'Sarah Williams', phone: '555-5678' },
//           { _id: '3', name: 'Initech', department: 'HR', requester: 'Peter Gibbons', approver: 'Bill Lumbergh', phone: '555-9012' }
//         ]);
        
//         setProjects([
//           { _id: '1', name: 'Website Redesign', client: 'Acme Corp', status: 'In Progress' },
//           { _id: '2', name: 'Mobile App', client: 'Globex', status: 'Planning' },
//           { _id: '3', name: 'HR Portal', client: 'Initech', status: 'Completed' }
//         ]);
        
//         setTechnologies([
//           { _id: '1', name: 'React', category: 'Frontend' },
//           { _id: '2', name: 'Node.js', category: 'Backend' },
//           { _id: '3', name: 'MongoDB', category: 'Database' }
//         ]);
        
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Handle add user
//   const handleAddUser = async (e) => {
//     e.preventDefault();
//     if (!newUser.username || !newUser.password) return;

//     try {
//       // In a real app, this would be an API call
//       const newId = (users.length + 1).toString();
//       setUsers([...users, { _id: newId, username: newUser.username }]);
//       setNewUser({ username: '', password: '', role: 'user' });
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     }
//   };

//   // Handle add client
//   const handleAddClient = async (e) => {
//     e.preventDefault();
//     if (!newClient.name) return;

//     try {
//       // In a real app, this would be an API call
//       const newId = (clients.length + 1).toString();
//       setClients([...clients, { _id: newId, ...newClient }]);
//       setNewClient({ name: '', department: '', requester: '', approver: '', phone: '', notes: '' });
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     }
//   };

//   // Handle add project
//   const handleAddProject = async (e) => {
//     e.preventDefault();
//     if (!newProject.name) return;

//     try {
//       // In a real app, this would be an API call
//       const newId = (projects.length + 1).toString();
//       setProjects([...projects, { _id: newId, ...newProject }]);
//       setNewProject({ name: '', client: '', status: 'Planning', description: '' });
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     }
//   };

//   // Handle add technology
//   const handleAddTech = async (e) => {
//     e.preventDefault();
//     if (!newTech.name) return;

//     try {
//       // In a real app, this would be an API call
//       const newId = (technologies.length + 1).toString();
//       setTechnologies([...technologies, { _id: newId, ...newTech }]);
//       setNewTech({ name: '', category: '' });
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     }
//   };

//   // Delete functions
//   const confirmDelete = (id, type) => {
//     setEntityToDelete(id);
//     setEntityType(type);
//     setShowDeleteModal(true);
//   };

//   const handleDelete = async () => {
//     try {
//       // In a real app, this would be an API call
//       switch(entityType) {
//         case 'user':
//           setUsers(users.filter(user => user._id !== entityToDelete));
//           break;
//         case 'client':
//           setClients(clients.filter(client => client._id !== entityToDelete));
//           break;
//         case 'project':
//           setProjects(projects.filter(project => project._id !== entityToDelete));
//           break;
//         case 'technology':
//           setTechnologies(technologies.filter(tech => tech._id !== entityToDelete));
//           break;
//         default:
//           break;
//       }
//       setShowDeleteModal(false);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//       setShowDeleteModal(false);
//     }
//   };

//   // Loading state
//   if (loading) return (
//     <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//       <div className="spinner-grow text-primary" role="status">
//         <span className="sr-only">Loading...</span>
//       </div>
//     </div>
//   );

//   // Error state
//   if (error) return (
//     <div className="alert alert-danger mx-4 mt-4">
//       <strong>Error:</strong> {error}
//     </div>
//   );

//   // Summary card data
//   const summaryCards = [
//     { title: 'Users', count: users.length, icon: FaUsers, color: 'primary', id: 'users' },
//     { title: 'Clients', count: clients.length, icon: FaBuilding, color: 'success', id: 'clients' },
//     { title: 'Projects', count: projects.length, icon: FaBriefcase, color: 'info', id: 'projects' },
//     { title: 'Technologies', count: technologies.length, icon: FaLaptopCode, color: 'warning', id: 'technologies' }
//   ];

//   return (
//     <div className="container-fluid py-4" style={{ fontFamily: 'Verdana, Geneva, sans-serif', backgroundColor: '#f8f9fc', minHeight: '100vh' }}>
//       {/* Page Heading */}
//       <div className="d-sm-flex align-items-center justify-content-between mb-4">
//         <div>
//           <h1 className="h3 mb-0 text-gray-800 font-weight-bold">Admin Dashboard</h1>
//           <p className="text-muted mb-0">Manage your users, clients, projects and technologies</p>
//         </div>
//         <div className="d-none d-sm-inline-block">
//           <div className="input-group">
//             <input
//               type="text"
//               className="form-control bg-light border-0 small"
//               placeholder="Search for..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <div className="input-group-append">
//               <button className="btn btn-primary" type="button">
//                 <FaSearch />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content Row - Cards */}
//       <div className="row mb-4">
//         {summaryCards.map(card => (
//           <SummaryCard
//             key={card.id}
//             title={card.title}
//             count={card.count}
//             icon={card.icon}
//             color={card.color}
//             active={activeForm === card.id}
//             onClick={() => setActiveForm(card.id)}
//           />
//         ))}
//       </div>

//       {/* Content Row - Forms and Tables */}
//       <div className="row">
//         <div className="col-lg-12">
//           {/* Users Section */}
//           {activeForm === 'users' && (
//             <>
//               <UserForm 
//                 newUser={newUser} 
//                 setNewUser={setNewUser} 
//                 handleAddUser={handleAddUser} 
//               />
//               <UsersTable 
//                 users={users} 
//                 confirmDelete={(id) => confirmDelete(id, 'user')} 
//                 searchTerm={searchTerm} 
//               />
//             </>
//           )}

//           {/* Clients Section */}
//           {activeForm === 'clients' && (
//             <>
//               <ClientForm 
//                 newClient={newClient} 
//                 setNewClient={setNewClient} 
//                 handleAddClient={handleAddClient} 
//               />
//               <ClientsTable 
//                 clients={clients} 
//                 confirmDelete={(id) => confirmDelete(id, 'client')} 
//                 searchTerm={searchTerm} 
//               />
//             </>
//           )}

//           {/* Projects Section */}
//           {activeForm === 'projects' && (
//             <>
//               <ProjectForm 
//                 newProject={newProject} 
//                 setNewProject={setNewProject} 
//                 handleAddProject={handleAddProject} 
//               />
//               <ProjectsTable 
//                 projects={projects} 
//                 confirmDelete={(id) => confirmDelete(id, 'project')} 
//                 searchTerm={searchTerm} 
//               />
//             </>
//           )}

//           {/* Technologies Section */}
//           {activeForm === 'technologies' && (
//             <>
//               <TechnologyForm 
//                 newTech={newTech} 
//                 setNewTech={setNewTech} 
//                 handleAddTech={handleAddTech} 
//               />
//               <TechnologiesTable 
//                 technologies={technologies} 
//                 confirmDelete={(id) => confirmDelete(id, 'technology')} 
//                 searchTerm={searchTerm} 
//               />
//             </>
//           )}
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       <DeleteModal 
//         show={showDeleteModal} 
//         onClose={() => setShowDeleteModal(false)} 
//         onConfirm={handleDelete}
//         entity={entityType}
//       />
//     </div>
//   );
// };

// export default Admin;
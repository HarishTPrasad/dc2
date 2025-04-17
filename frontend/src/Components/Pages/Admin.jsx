import React, { useEffect, useState } from 'react';
import api from "../API/api";
import { FaUsers, FaPlusCircle, FaUserCircle, FaChartLine, FaBriefcase, FaLaptopCode, FaBuilding } from 'react-icons/fa'; // Added more icons

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  // New states for other entities
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '' });
  const [newProject, setNewProject] = useState({ name: '', description: '', clientId: '' });
  const [newTechnology, setNewTechnology] = useState({ name: '', category: '' });
  
  // States to control which form is displayed
  const [activeForm, setActiveForm] = useState('users'); // 'users', 'clients', 'projects', 'technologies'

  const verdanaStyle = {
    fontFamily: 'Verdana, Geneva, sans-serif'
  };

  // Better color scheme
  const colors = {
    users: {
      primary: '#4e73df', // Royal blue
      light: '#f8f9fc',
      hover: '#e8f0fe'
    },
    clients: {
      primary: '#1cc88a', // Emerald green
      light: '#f6fcf9',
      hover: '#e3f9ef'
    },
    projects: {
      primary: '#36b9cc', // Teal blue
      light: '#f6fcfd',
      hover: '#e3f7fa'
    },
    technologies: {
      primary: '#6f42c1', // Purple
      light: '#f9f7fd',
      hover: '#f0e7fa'
    },
    header: '#2c3e50', // Dark slate for headers
    accent: '#f6c23e' // Amber for accents/alerts
  };

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

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.username || !newUser.password) return;

    try {
      const res = await api.post('/users', newUser);
      setUsers([...users, res.data]);
      setNewUser({ username: '', password: '' });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!newClient.name) return;
    // Implement API call to add client
    console.log("Adding client:", newClient);
    setNewClient({ name: '', email: '', phone: '' });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.name) return;
    // Implement API call to add project
    console.log("Adding project:", newProject);
    setNewProject({ name: '', description: '', clientId: '' });
  };

  const handleAddTechnology = async (e) => {
    e.preventDefault();
    if (!newTechnology.name) return;
    // Implement API call to add technology
    console.log("Adding technology:", newTechnology);
    setNewTechnology({ name: '', category: '' });
  };

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

  if (loading) return <div className="container mt-5 text-center">Loading...</div>;
  if (error) return <div className="container mt-5 text-center text-danger">Error: {error}</div>;

  // Function to render the appropriate form based on the active form state
  const renderActiveForm = () => {
    switch (activeForm) {
      case 'users':
        return (
          <div className="card mb-4 shadow">
            <div className="card-header text-white" style={{ backgroundColor: colors.users.primary }}>
              <FaUsers className="mr-2" /> Add New User
            </div>
            <div className="card-body">
              <form onSubmit={handleAddUser}>
                <div className="form-row">
                  <div className="form-group col-md-5">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    />
                  </div>
                  <div className="form-group col-md-5">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <button type="submit" className="btn btn-block text-white" style={{ backgroundColor: colors.users.primary }}>
                      Add User
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      case 'clients':
        return (
          <div className="card mb-4 shadow">
            <div className="card-header text-white" style={{ backgroundColor: colors.clients.primary }}>
              <FaBuilding className="mr-2" /> Add New Client
            </div>
            <div className="card-body">
              <form onSubmit={handleAddClient}>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Client Name"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <button type="submit" className="btn btn-block text-white" style={{ backgroundColor: colors.clients.primary }}>
                      Add Client
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="card mb-4 shadow">
            <div className="card-header text-white" style={{ backgroundColor: colors.projects.primary }}>
              <FaBriefcase className="mr-2" /> Add New Project
            </div>
            <div className="card-body">
              <form onSubmit={handleAddProject}>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Project Name"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Project Description"
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <button type="submit" className="btn btn-block text-white" style={{ backgroundColor: colors.projects.primary }}>
                      Add Project
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      case 'technologies':
        return (
          <div className="card mb-4 shadow">
            <div className="card-header text-white" style={{ backgroundColor: colors.technologies.primary }}>
              <FaLaptopCode className="mr-2" /> Add New Technology
            </div>
            <div className="card-body">
              <form onSubmit={handleAddTechnology}>
                <div className="form-row">
                  <div className="form-group col-md-5">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Technology Name"
                      value={newTechnology.name}
                      onChange={(e) => setNewTechnology({ ...newTechnology, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group col-md-5">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Category (Frontend, Backend, etc.)"
                      value={newTechnology.category}
                      onChange={(e) => setNewTechnology({ ...newTechnology, category: e.target.value })}
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <button type="submit" className="btn btn-block text-white" style={{ backgroundColor: colors.technologies.primary }}>
                      Add Technology
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Function to get tile style based on active state
  const getTileStyle = (formType) => {
    const isActive = activeForm === formType;
    const color = colors[formType];
    
    return {
      backgroundColor: isActive ? color.hover : color.light,
      borderLeft: `4px solid ${isActive ? color.primary : 'transparent'}`,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      boxShadow: isActive ? '0 .15rem 1.75rem 0 rgba(58,59,69,.15)' : '0 .125rem .25rem 0 rgba(58,59,69,.1)'
    };
  };

  return (
    <div className="container mt-5" style={verdanaStyle}>
      <h1 className="mb-4 text-center" style={{ color: colors.header }}>Admin Dashboard</h1>

      {/* Delete Confirmation Modal */}
      <div className={`modal fade ${showDeleteModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: showDeleteModal ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: colors.header, color: 'white' }}>
              <h5 className="modal-title">Confirm Delete</h5>
              <button type="button" className="close text-white" onClick={() => setShowDeleteModal(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this user? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn text-white" style={{ backgroundColor: colors.users.primary }} onClick={handleRemoveUser}>
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Tiles */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card h-100 py-2" 
               onClick={() => setActiveForm('users')} 
               style={getTileStyle('users')}>
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-uppercase mb-1" style={{ color: colors.users.primary }}>
                    Add Users
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">Manage System Users</div>
                </div>
                <div className="col-auto">
                  <FaUsers size={30} style={{ color: colors.users.primary }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card h-100 py-2" 
               onClick={() => setActiveForm('clients')} 
               style={getTileStyle('clients')}>
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-uppercase mb-1" style={{ color: colors.clients.primary }}>
                    Add Clients
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">Manage Clients</div>
                </div>
                <div className="col-auto">
                  <FaBuilding size={30} style={{ color: colors.clients.primary }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card h-100 py-2" 
               onClick={() => setActiveForm('projects')} 
               style={getTileStyle('projects')}>
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-uppercase mb-1" style={{ color: colors.projects.primary }}>
                    Add Projects
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">Manage Projects</div>
                </div>
                <div className="col-auto">
                  <FaBriefcase size={30} style={{ color: colors.projects.primary }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card h-100 py-2" 
               onClick={() => setActiveForm('technologies')} 
               style={getTileStyle('technologies')}>
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-uppercase mb-1" style={{ color: colors.technologies.primary }}>
                    Add Technologies
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">Manage Tech Stack</div>
                </div>
                <div className="col-auto">
                  <FaLaptopCode size={30} style={{ color: colors.technologies.primary }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Form Display */}
      {renderActiveForm()}

      {/* User List Table - Only show when Users form is active */}
      {activeForm === 'users' && (
        <div className="card shadow">
          <div className="card-header text-white" style={{ backgroundColor: colors.header }}>
            <FaUsers className="mr-2" /> User List
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead style={{ backgroundColor: colors.users.light }}>
                  <tr>
                    <th>Username</th>
                    <th style={{ width: '120px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td><FaUserCircle size={20} className="mr-2" style={{ color: colors.users.primary }} /> {user.username}</td>
                      <td>
                        <button
                          className="btn btn-sm"
                          style={{ color: 'white', backgroundColor: '#e74a3b' }}
                          onClick={() => confirmDelete(user._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="2" className="text-center text-muted">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
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
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-gradient-primary-to-secondary ">
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
        <h6 className="m-0 font-weight-bold">User Management</h6>
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
                        <div className=" mr-2">
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
      setNewUser({ username: '', password: '', role: 'user' });
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
    <div className="container-fluid py-4" style={{ fontFamily: 'Verdana, Geneva, sans-serif', backgroundColor: '#f8f9fc', minHeight: '100vh' }}>
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
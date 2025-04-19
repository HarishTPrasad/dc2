import React, { useState, useEffect } from 'react';
import api from "../../../API/api";
import { FiUserPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    userid: '',
    username: '',
    fullname: '',
    password: '',
    role: 'user'
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
   const navigate = useNavigate();
  
     const handleBackToDashboard = () => {
      navigate("/dashboard/admin");
    };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!isEditing && !formData.password) errors.password = 'Password is required';
    if (!isEditing && formData.password && formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      let response;
      
      if (isEditing) {
        const dataToSend = formData.password 
          ? formData 
          : { 
              userid: formData.userid,
              username: formData.username, 
              fullname: formData.fullname, 
              role: formData.role 
            };
        
        response = await api.put(`/users/${currentUser._id}`, dataToSend);
        setUsers(users.map(user => user._id === currentUser._id ? response.data.data : user));
      } else {
        response = await api.post('/users', formData);
        setUsers([...users, response.data.data]);
      }

      setShowModal(false);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || `Failed to ${isEditing ? 'update' : 'create'} user`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData({
      userid: user.userid || '',
      username: user.username || '',
      fullname: user.fullname || '',
      password: '',
      role: user.role || 'user'
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!currentUser?._id) {
      setError("Cannot delete user: Missing user ID");
      setShowDeleteModal(false);
      return;
    }

    try {
      setDeleteLoading(true);
      await api.delete(`/users/${currentUser._id}`);
      setUsers(users.filter(user => user._id !== currentUser._id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete user');
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
      setCurrentUser(null);
    }
  };

  const resetForm = () => {
    setFormData({
      userid: '',
      username: '',
      fullname: '',
      password: '',
      role: 'user'
    });
    setCurrentUser(null);
    setIsEditing(false);
  };

  // Fixed filtering logic with null checks
  const filteredUsers = users.filter(user => {
    if (!searchTerm) return true;
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (user.username && user.username.toLowerCase().includes(searchTermLower)) ||
      (user.fullname && user.fullname.toLowerCase().includes(searchTermLower)) ||
      (user.userid && user.userid.toLowerCase().includes(searchTermLower))
    );
  });

  // For controlling body scroll when modal is open
  useEffect(() => {
    if (showModal || showDeleteModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal, showDeleteModal]);

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0 font-weight-bold text-info">User Management</h5>
        <div className="d-flex justify-content-between align-items-center mb-4 " style={{ gap: '1rem' }}>
                      <button 
                        className="btn btn-info btn-sm d-flex align-items-center shadow-sm"
                        onClick={() => {
                          resetForm();
                          setShowModal(true);
                        }}
                      >
                        <FiUserPlus className="mr-1" /> Add Client
                      </button>
                      <button 
                        className="btn btn-info btn-sm d-flex align-items-center shadow-sm"
                        onClick={handleBackToDashboard}
                      >
                     back
                      </button>
                      </div>
      </div>

      {error && (
        <div className="alert alert-danger py-2 mb-3 shadow-sm alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="close" onClick={() => setError(null)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      <div className="mb-3 position-relative">
        <div className="input-group input-group-sm shadow-sm">
          <div className="input-group-prepend">
            <span className="input-group-text bg-white border-right-0">
              <FiSearch className="text-muted" />
            </span>
          </div>
          <input
            type="text"
            placeholder="Search users..."
            className="form-control border-left-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading && users.length === 0 ? (
        <div className="text-center py-5">
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-muted mt-2 small">Loading users...</p>
        </div>
      ) : (
        <div className="border rounded shadow-sm">
          <table className="table table-hover table-sm mb-0 user-table">
            <thead className="bg-light">
              <tr>
                <th className="py-2 pl-3 border-0">ID</th>
                <th className="py-2 border-0">Username</th>
                <th className="py-2 border-0">Full Name</th>
                <th className="py-2 border-0">Role</th>
                <th className="py-2 pr-3 border-0 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user._id}>
                    <td className="py-2 pl-3 text-muted small">{user.userid || '-'}</td>
                    <td className="py-2 font-weight-medium">{user.username || '-'}</td>
                    <td className="py-2">{user.fullname || '-'}</td>
                    <td className="py-2">
                      <span className={`badge badge-pill ${user.role === 'admin' ? 'badge-info' : 'badge-secondary'} px-2 py-1 font-weight-normal`}>
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td className="py-2 pr-3 text-right">
                      <button 
                        className="btn btn-outline-secondary btn-sm mr-1 btn-sm-icon"
                        onClick={() => handleEdit(user)}
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button 
                        className="btn btn-outline-danger btn-sm btn-sm-icon"
                        onClick={() => {
                          setCurrentUser(user);
                          setShowDeleteModal(true);
                        }}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    {searchTerm ? 'No users match your search' : 'No users found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* User Modal */}
      {showModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-sm modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header py-2 bg-light">
                  <h6 className="modal-title text-info">{isEditing ? 'Edit User' : 'New User'}</h6>
                  <button type="button" className="close" onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body py-3">
                    <div className="form-group mb-3">
                      <label className="small font-weight-bold">User ID</label>
                      <input
                        className="form-control form-control-sm shadow-sm"
                        type="text"
                        name="userid"
                        placeholder="Optional"
                        value={formData.userid}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="small font-weight-bold">Username *</label>
                      <input
                        className="form-control form-control-sm shadow-sm"
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="small font-weight-bold">Full Name *</label>
                      <input
                        className="form-control form-control-sm shadow-sm"
                        type="text"
                        name="fullname"
                        placeholder="Enter full name"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="small font-weight-bold">
                        Password {!isEditing ? '*' : '(leave blank to keep unchanged)'}
                      </label>
                      <input
                        className={`form-control form-control-sm shadow-sm ${validationErrors.password ? 'is-invalid' : ''}`}
                        type="password"
                        name="password"
                        placeholder={isEditing ? "••••••" : "Minimum 6 characters"}
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      {validationErrors.password && (
                        <small className="text-danger">
                          {validationErrors.password}
                        </small>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="small font-weight-bold">Role *</label>
                      <select
                        className="form-control form-control-sm shadow-sm"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer py-2 bg-light">
                    <button 
                      type="button"
                      className="btn btn-light btn-sm shadow-sm"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-info btn-sm shadow-sm"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        isEditing ? 'Update' : 'Create'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-sm modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header py-2 bg-light">
                  <h6 className="modal-title text-danger">Confirm Deletion</h6>
                  <button 
                    type="button" 
                    className="close" 
                    onClick={() => setShowDeleteModal(false)}
                    disabled={deleteLoading}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body py-4 text-center">
                  <div className="mb-3 text-danger">
                    <FiTrash2 size={28} />
                  </div>
                  <p>Are you sure you want to delete user <strong>{currentUser?.username || 'this user'}</strong>?</p>
                  <p className="text-muted small mb-0">This action cannot be undone.</p>
                </div>
                <div className="modal-footer py-2 bg-light">
                  <button 
                    type="button"
                    className="btn btn-light btn-sm shadow-sm"
                    onClick={() => setShowDeleteModal(false)}
                    disabled={deleteLoading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    className="btn btn-danger btn-sm shadow-sm"
                    onClick={handleDelete}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      <style jsx>{`
        .user-table th {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6c757d;
        }
        .user-table td {
          vertical-align: middle;
          font-size: 0.9rem;
        }
        .btn-sm-icon {
          width: 32px;
          height: 32px;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .font-weight-medium {
          font-weight: 500;
        }
        .modal {
          background-color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}

export default Users;
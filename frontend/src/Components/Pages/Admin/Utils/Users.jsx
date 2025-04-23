import React, { useState, useEffect } from 'react';
import api from "../../../API/api";
import { FiUserPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiUser, } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(-20px); }
  to { transform: translateY(0); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
`;

const UserCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  animation: ${fadeIn} 0.3s ease forwards;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
`;

const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  
  svg {
    color: #6c757d;
    width: 24px;
    height: 24px;
  }
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3436;
`;

const UserId = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #6c757d;
`;

const RoleBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => props.role === 'admin' ? '#4bc0d9' : '#adb5bd'};
  color: white;
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
  border-top: 1px solid #f1f3f5;
  padding-top: 1.2rem;
`;

const ActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.variant === 'danger' ? '#ffe3e3' : '#f8f9fa'};
  color: ${props => props.variant === 'danger' ? '#fa5252' : '#343a40'};
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.variant === 'danger' ? '#ffc9c9' : '#e9ecef'};
    transform: translateY(-2px);
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
  max-width: 400px;

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: #4bc0d9;
      box-shadow: 0 0 0 3px rgba(75, 192, 217, 0.1);
    }
  }

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  // animation: ${fadeIn} 0.3s ease;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  width: 90%;
  max-width: 400px;
  // animation: ${slideIn} 0.3s ease;
  position: relative;
`;

const Loader = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4bc0d9;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6c757d;
  
  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 1rem;
    opacity: 0.6;
  }
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f3f5;
  
  h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #2d3436;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #6c757d;
  
  &:hover {
    color: #2d3436;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #495057;
  }

  input, select {
    width: 100%;
    padding: 0.625rem;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    font-size: 0.875rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #4bc0d9;
      box-shadow: 0 0 0 3px rgba(75, 192, 217, 0.1);
    }
  }

  .error {
    color: #fa5252;
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f3f5;
`;


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
    <>

<div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2d3436' }}>User Management</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem 1rem',
              background: '#4bc0d9',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            <FiUserPlus style={{ marginRight: '0.5rem' }} />
            Add Client
          </button>
          <button
            style={{
              padding: '0.5rem 1rem',
              background: '#e9ecef',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={handleBackToDashboard}
          >
            Back
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          background: '#fff5f5',
          color: '#fa5252',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{error}</span>
          <FiX 
            style={{ cursor: 'pointer' }}
            onClick={() => setError(null)}
          />
        </div>
      )}

      <SearchContainer>
        <FiSearch />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      {loading && users.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <Loader />
        </div>
      ) : (
        <UsersGrid>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <UserCard key={user._id}>
                <CardHeader>
                  <UserAvatar>
                    <FiUser />
                  </UserAvatar>
                  <UserInfo>
                    <UserName>{user.username || 'Unnamed User'}</UserName>
                    <UserId>{user.userid || 'No ID'}</UserId>
                  </UserInfo>
                </CardHeader>
                
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ margin: '0.25rem 0', color: '#2d3436' }}>
                    <strong>Full Name:</strong> {user.fullname || '-'}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#6c757d' }}>Role:</span>
                    <RoleBadge role={user.role}>{user.role || 'user'}</RoleBadge>
                  </div>
                </div>

                <CardActions>
                  <ActionButton
                    onClick={() => handleEdit(user)}
                    title="Edit user"
                  >
                    <FiEdit2 />
                  </ActionButton>
                  <ActionButton
                    variant="danger"
                    onClick={() => {
                      setCurrentUser(user);
                      setShowDeleteModal(true);
                    }}
                    title="Delete user"
                  >
                    <FiTrash2 />
                  </ActionButton>
                </CardActions>
              </UserCard>
            ))
          ) : (
            <EmptyState>
              <FiUser style={{ width: '64px', height: '64px' }} />
              <p>{searchTerm ? 'No users found' : 'No users available'}</p>
            </EmptyState>
          )}
        </UsersGrid>
      )}

      {/* Modals remain similar with styled components */}
      {showModal && (
        <ModalBackdrop>
          <ModalContent>
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
            
          </ModalContent>
        </ModalBackdrop>
      )}

      {showDeleteModal && (
        <ModalBackdrop>
          <ModalContent>
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
            
          </ModalContent>
        </ModalBackdrop>
      )}
    </div>
      
        </>
      )}

 
export default Users;
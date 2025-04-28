import React, { useState, useEffect } from 'react';
import api from '../../../API/api';
import { FiUserPlus, FiEdit2, FiTrash2, FiSearch, FiPhone, FiBriefcase, FiUser, FiCheckSquare } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

function Clients() {
  const [clientList, setClientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const [currentClient, setCurrentClient] = useState(null);
  const [formData, setFormData] = useState({
    clientname: '',
    department: '',
    requestor: '',
    approver: '',
    phoneno: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await api.get('/clientdata');
      const data = response.data?.data || response.data || [];
      setClientList(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch clients');
      setClientList([]);
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
    if (!formData.clientname) errors.clientname = 'Client name is required';
    if (!formData.requestor) errors.requestor = 'Requester name is required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      let response;
      
      if (isEditing && currentClient?._id) {
        setClientList(prev => prev.map(client => 
          client._id === currentClient._id ? {
            ...client,
            client: {
              clientname: formData.clientname,
              department: formData.department,
              requestor: formData.requestor,
              approver: formData.approver,
              phoneno: formData.phoneno
            }
          } : client
        ));

        response = await api.put(`/clientdata/${currentClient._id}`, {
          client: {
            clientname: formData.clientname,
            department: formData.department,
            requestor: formData.requestor,
            approver: formData.approver,
            phoneno: formData.phoneno
          }
        });

        setClientList(prev => prev.map(client => 
          client._id === currentClient._id ? response.data.data || response.data : client
        ));
      } else {
        const tempId = `temp-${Date.now()}`;
        setClientList(prev => [{
          _id: tempId,
          client: {
            clientname: formData.clientname,
            department: formData.department,
            requestor: formData.requestor,
            approver: formData.approver,
            phoneno: formData.phoneno
          }
        }, ...prev]);

        response = await api.post('/clientdata', {
          client: {
            clientname: formData.clientname,
            department: formData.department,
            requestor: formData.requestor,
            approver: formData.approver,
            phoneno: formData.phoneno
          }
        });

        setClientList(prev => [
          response.data.data || response.data,
          ...prev.filter(client => client._id !== tempId)
        ]);
      }

      setShowModal(false);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || `Failed to ${isEditing ? 'update' : 'create'} client`);
      fetchClients();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (client) => {
    setCurrentClient(client);
    setFormData({
      clientname: client.client?.clientname || '',
      department: client.client?.department || '',
      requestor: client.client?.requestor || '',
      approver: client.client?.approver || '',
      phoneno: client.client?.phoneno || ''
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!currentClient?._id) {
      setError("Cannot delete client: Missing client ID");
      setShowDeleteModal(false);
      return;
    }

    try {
      setDeleteLoading(true);
      const deletedClient = currentClient;
      setClientList(prev => prev.filter(client => client._id !== deletedClient._id));

      await api.delete(`/clientdata/${deletedClient._id}`);
      
      setShowDeleteModal(false);
      setCurrentClient(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete client');
      fetchClients();
    } finally {
      setDeleteLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      clientname: '',
      department: '',
      requestor: '',
      approver: '',
      phoneno: ''
    });
    setCurrentClient(null);
    setIsEditing(false);
  };

  const filteredClients = clientList.filter(client => {
    if (!searchTerm) return true;
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (client.client?.clientname && client.client.clientname.toLowerCase().includes(searchTermLower)) ||
      (client.client?.department && client.client.department.toLowerCase().includes(searchTermLower)) ||
      (client.client?.requestor && client.client.requestor.toLowerCase().includes(searchTermLower)) ||
      (client.client?.approver && client.client.approver.toLowerCase().includes(searchTermLower))
    );
  });

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

  const handleBackToDashboard = () => {
    navigate("/dashboard/admin");
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0 font-weight-bold text-info">Client Management</h5>
        <div className="d-flex" style={{ gap: '1rem' }}>
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
            Back to Dashboard
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

      <div className="mb-4 position-relative">
        <div className="input-group input-group-lg shadow-sm">
          <div className="input-group-prepend">
            <span className="input-group-text bg-white border-right-0">
              <FiSearch className="text-muted" />
            </span>
          </div>
          <input
            type="text"
            placeholder="Search clients..."
            className="form-control border-left-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading && clientList.length === 0 ? (
        <div className="text-center py-5">
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-muted mt-2 small">Loading clients...</p>
        </div>
      ) : (
        <div className="row">
          {filteredClients.length > 0 ? (
            filteredClients.map(client => (
              <div key={client._id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm h-100 hover-scale">
                  <div className="card-header bg-light d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 font-weight-bold text-dark">
                      {client.client?.clientname || 'Unnamed Client'}
                    </h6>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-link text-info p-0"
                        onClick={() => handleEdit(client)}
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        className="btn btn-link text-danger p-0"
                        onClick={() => {
                          setCurrentClient(client);
                          setShowDeleteModal(true);
                        }}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="mb-3 d-flex align-items-center">
                      <FiBriefcase className="mr-2 text-primary" />
                      <span className="text-muted small">
                        {client.client?.department || 'No department specified'}
                      </span>
                    </div>
                    
                    <div className="mb-3 d-flex align-items-center">
                      <FiUser className="mr-2 text-success" />
                      <div>
                        <div className="small text-muted">Requester</div>
                        <div>{client.client?.requestor || 'Not specified'}</div>
                      </div>
                    </div>

                    <div className="mb-3 d-flex align-items-center">
                      <FiCheckSquare className="mr-2 text-warning" />
                      <div>
                        <div className="small text-muted">Approver</div>
                        <div>{client.client?.approver || 'Not specified'}</div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <FiPhone className="mr-2 text-danger" />
                      <div>
                        <div className="small text-muted">Contact</div>
                        <div>{client.client?.phoneno || 'No phone number'}</div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="card-footer bg-light">
                    <small className="text-muted">
                      Last updated: {new Date(client.updatedAt || Date.now()).toLocaleDateString()}
                    </small>
                  </div> */}
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-4 text-muted">
              {searchTerm ? 'No clients match your search' : 'No clients found'}
            </div>
          )}
        </div>
      )}

      {/* Client Modal */}
      {showModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-sm modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header py-2 bg-light">
                  <h6 className="modal-title text-info">{isEditing ? 'Edit Client' : 'New Client'}</h6>
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
                      <label className="small font-weight-bold">Client Name *</label>
                      <input
                        className={`form-control form-control-sm shadow-sm ${validationErrors.clientname ? 'is-invalid' : ''}`}
                        type="text"
                        name="clientname"
                        placeholder="Enter client name"
                        value={formData.clientname}
                        onChange={handleInputChange}
                        required
                      />
                      {validationErrors.clientname && (
                        <small className="text-danger">
                          {validationErrors.clientname}
                        </small>
                      )}
                    </div>

                    <div className="form-group mb-3">
                      <label className="small font-weight-bold">Department</label>
                      <input
                        className="form-control form-control-sm shadow-sm"
                        type="text"
                        name="department"
                        placeholder="Enter department"
                        value={formData.department}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="small font-weight-bold">Requester Name *</label>
                      <input
                        className={`form-control form-control-sm shadow-sm ${validationErrors.requestor ? 'is-invalid' : ''}`}
                        type="text"
                        name="requestor"
                        placeholder="Enter requester name"
                        value={formData.requestor}
                        onChange={handleInputChange}
                        required
                      />
                      {validationErrors.requestor && (
                        <small className="text-danger">
                          {validationErrors.requestor}
                        </small>
                      )}
                    </div>

                    <div className="form-group mb-3">
                      <label className="small font-weight-bold">Approver Name</label>
                      <input
                        className="form-control form-control-sm shadow-sm"
                        type="text"
                        name="approver"
                        placeholder="Enter approver name"
                        value={formData.approver}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="small font-weight-bold">Phone Number</label>
                      <input
                        className="form-control form-control-sm shadow-sm"
                        type="text"
                        name="phoneno"
                        placeholder="Enter phone number"
                        value={formData.phoneno}
                        onChange={handleInputChange}
                      />
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
                  <p>Are you sure you want to delete client <strong>{currentClient?.client?.clientname || 'this client'}</strong>?</p>
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
        .hover-scale {
          transition: transform 0.2s ease-in-out;
        }
        .hover-scale:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .card-header {
          border-bottom: 2px solid rgba(0, 0, 0, 0.05);
        }
        .card-footer {
          border-top: 2px solid rgba(0, 0, 0, 0.05);
          background-color: #f8f9fa;
        }
        .btn-link {
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .btn-link:hover {
          opacity: 1;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}

export default Clients;
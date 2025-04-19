import React, { useState, useEffect } from 'react';
import api from '../../../API/api';
import { FiUserPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

function Clients() {
  const [clientList, setClientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
      setClientList(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch clients');
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
        response = await api.put(`/clientdata/${currentClient._id}`, {
          client: {
            clientname: formData.clientname,
            department: formData.department,
            requestor: formData.requestor,
            approver: formData.approver,
            phoneno: formData.phoneno
          },
        });
        setClientList(clientList.map(client => client._id === currentClient._id ? response.data : client));
      } else {
        response = await api.post('/clientdata', {
          client: {
            clientname: formData.clientname,
            department: formData.department,
            requestor: formData.requestor,
            approver: formData.approver,
            phoneno: formData.phoneno
          },
      
        });
        setClientList([...clientList, response.data]);
       console.log(response.data)
      }

      setShowModal(false);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || `Failed to ${isEditing ? 'update' : 'create'} client`);
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
      await api.delete(`/clientdata/${currentClient._id}`);
      setClientList(clientList.filter(client => client._id !== currentClient._id));

    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete client');
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
      setCurrentClient(null);
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

  // Filtering logic with null checks
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
        <h5 className="mb-0 font-weight-bold text-primary">Client Management</h5>
        <button 
          className="btn btn-primary btn-sm d-flex align-items-center shadow-sm"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <FiUserPlus className="mr-1" /> Add Client
        </button>
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
        <div className="border rounded shadow-sm">
          <table className="table table-hover table-sm mb-0 client-table">
            <thead className="bg-light">
              <tr>
                <th className="py-2 pl-3 border-0">Client Name</th>
                <th className="py-2 border-0">Department</th>
                <th className="py-2 border-0">Requester</th>
                <th className="py-2 border-0">Approver</th>
                <th className="py-2 border-0">Phone</th>
                <th className="py-2 pr-3 border-0 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length > 0 ? (
                filteredClients.map(client => (
                  <tr key={client._id}>
                    <td className="py-2 pl-3 font-weight-medium">{client.client?.clientname || '-'}</td>
                    <td className="py-2">{client.client?.department || '-'}</td>
                    <td className="py-2">{client.client?.requestor || '-'}</td>
                    <td className="py-2">{client.client?.approver || '-'}</td>
                    <td className="py-2 text-muted small">{client.client?.phoneno || '-'}</td>
                    <td className="py-2 pr-3 text-right">
                      <button 
                        className="btn btn-outline-secondary btn-sm mr-1 btn-sm-icon"
                        onClick={() => handleEdit(client)}
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button 
                        className="btn btn-outline-danger btn-sm btn-sm-icon"
                        onClick={() => {
                          setCurrentClient(client);
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
                  <td colSpan="6" className="text-center py-4 text-muted">
                    {searchTerm ? 'No clients match your search' : 'No clients found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Client Modal */}
      {showModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-sm modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header py-2 bg-light">
                  <h6 className="modal-title text-primary">{isEditing ? 'Edit Client' : 'New Client'}</h6>
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
                        className="form-control form-control-sm shadow-sm"
                        type="text"
                        name="requestor"
                        placeholder="Enter requester name"
                        value={formData.requestor}
                        onChange={handleInputChange}
                        required
                      />
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
                      className="btn btn-primary btn-sm shadow-sm"
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
        .client-table th {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6c757d;
        }
        .client-table td {
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

export default Clients;
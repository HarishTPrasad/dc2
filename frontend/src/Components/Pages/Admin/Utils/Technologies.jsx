import React, { useState, useEffect } from 'react';
import api from '../../../API/api';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";


function Technologies() {
  const [techList, setTechList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentTech, setCurrentTech] = useState(null);
  const [formData, setFormData] = useState({
    technology: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
   const navigate = useNavigate();

   const handleBackToDashboard = () => {
    navigate("/dashboard/admin");
  };


  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      const response = await api.get('/techdata');
      setTechList(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch technologies');
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
    if (!formData.technology) errors.technology = 'Technology name is required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      let response;
      
      if (isEditing && currentTech?._id) {
        response = await api.put(`/techdata/${currentTech._id}`, {
          client: currentTech.client || {},
          technology: formData.technology,
          project: currentTech.project || ''
        });
        setTechList(techList.map(tech => tech._id === currentTech._id ? response.data : tech));
      } else {
        response = await api.post('/techdata', {
          client: {},
          technology: formData.technology,
          project: ''
        });
        setTechList([...techList, response.data]);
      }

      setShowModal(false);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || `Failed to ${isEditing ? 'update' : 'create'} technology`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tech) => {
    setCurrentTech(tech);
    setFormData({
      technology: tech.technology || ''
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!currentTech?._id) {
      setError("Cannot delete technology: Missing technology ID");
      setShowDeleteModal(false);
      return;
    }

    try {
      setDeleteLoading(true);
      await api.delete(`/techdata/${currentTech._id}`);
      setTechList(techList.filter(tech => tech._id !== currentTech._id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete technology');
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
      setCurrentTech(null);
    }
  };

  const resetForm = () => {
    setFormData({
      technology: ''
    });
    setCurrentTech(null);
    setIsEditing(false);
  };

  const filteredTechs = techList.filter(tech => {
    if (!searchTerm) return true;
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (tech.technology && tech.technology.toLowerCase().includes(searchTermLower))
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

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0 font-weight-bold text-info">Technology Management</h5>
       <div className="d-flex justify-content-between align-items-center mb-4 " style={{ gap: '1rem' }}>
               <button 
                 className="btn btn-info btn-sm d-flex align-items-center shadow-sm"
                 onClick={() => {
                   resetForm();
                   setShowModal(true);
                 }}
               >
                 <FiPlus className="mr-1" /> Add Client
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
            placeholder="Search technologies..."
            className="form-control border-left-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading && techList.length === 0 ? (
        <div className="text-center py-5">
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-muted mt-2 small">Loading technologies...</p>
        </div>
      ) : (
        <div className="border rounded shadow-sm">
          <table className="table table-hover table-sm mb-0 tech-table">
            <thead className="bg-light">
              <tr>
                <th className="py-2 pl-3 border-0">#</th>
                <th className="py-2 border-0">Technology Name</th>
                <th className="py-2 pr-3 border-0 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTechs.length > 0 ? (
                filteredTechs.map((tech, index) => (
                  <tr key={tech._id}>
                    <td className="py-2 pl-3 font-weight-medium">{index + 1}</td>
                    <td className="py-2 font-weight-medium">{tech.technology || '-'}</td>
                    <td className="py-2 pr-3 text-right">
                      <button 
                        className="btn btn-outline-secondary btn-sm mr-1 btn-sm-icon"
                        onClick={() => handleEdit(tech)}
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button 
                        className="btn btn-outline-danger btn-sm btn-sm-icon"
                        onClick={() => {
                          setCurrentTech(tech);
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
                  <td colSpan="3" className="text-center py-4 text-muted">
                    {searchTerm ? 'No technologies match your search' : 'No technologies found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Technology Modal */}
      {showModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-sm modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header py-2 bg-light">
                  <h6 className="modal-title text-info">{isEditing ? 'Edit Technology' : 'New Technology'}</h6>
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
                      <label className="small font-weight-bold">Technology Name *</label>
                      <input
                        className={`form-control form-control-sm shadow-sm ${validationErrors.technology ? 'is-invalid' : ''}`}
                        type="text"
                        name="technology"
                        placeholder="Enter technology name"
                        value={formData.technology}
                        onChange={handleInputChange}
                        required
                      />
                      {validationErrors.technology && (
                        <small className="text-danger">
                          {validationErrors.technology}
                        </small>
                      )}
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
                  <p>Are you sure you want to delete technology <strong>{currentTech?.technology || 'this technology'}</strong>?</p>
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
        .tech-table th {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6c757d;
        }
        .tech-table td {
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

export default Technologies;
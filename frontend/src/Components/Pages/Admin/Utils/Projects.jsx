import React, { useState, useEffect } from 'react';
import api from '../../../API/api';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

function Projects() {
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    project: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/projectdata');
      setProjectList(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch projects');
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
    if (!formData.project) errors.project = 'Project name is required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      let response;
      
      if (isEditing && currentProject?._id) {
        response = await api.put(`/projectdata/${currentProject._id}`, {
          client: currentProject.client || {},
          technology: currentProject.technology || '',
          project: formData.project
        });
        setProjectList(projectList.map(project => project._id === currentProject._id ? response.data : project));
      } else {
        response = await api.post('/projectdata', {
          client: {},
          technology: '',
          project: formData.project
        });
        setProjectList([...projectList, response.data]);
      }

      setShowModal(false);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || `Failed to ${isEditing ? 'update' : 'create'} project`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setFormData({
      project: project.project || ''
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!currentProject?._id) {
      setError("Cannot delete project: Missing project ID");
      setShowDeleteModal(false);
      return;
    }

    try {
      setDeleteLoading(true);
      await api.delete(`/projectdata/${currentProject._id}`);
      setProjectList(projectList.filter(project => project._id !== currentProject._id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete project');
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
      setCurrentProject(null);
    }
  };

  const resetForm = () => {
    setFormData({
      project: ''
    });
    setCurrentProject(null);
    setIsEditing(false);
  };

  const filteredProjects = projectList.filter(project => {
    if (!searchTerm) return true;
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (project.project && project.project.toLowerCase().includes(searchTermLower))
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
        <h5 className="mb-0 font-weight-bold text-primary">Project Management</h5>
        <button 
          className="btn btn-primary btn-sm d-flex align-items-center shadow-sm"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <FiPlus className="mr-1" /> Add Project
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
            placeholder="Search projects..."
            className="form-control border-left-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading && projectList.length === 0 ? (
        <div className="text-center py-5">
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-muted mt-2 small">Loading projects...</p>
        </div>
      ) : (
        <div className="border rounded shadow-sm">
          <table className="table table-hover table-sm mb-0 project-table">
            <thead className="bg-light">
              <tr>
                <th className="py-2 pl-3 border-0">#</th>
                <th className="py-2 border-0">Project Name</th>
                <th className="py-2 pr-3 border-0 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <tr key={project._id}>
                    <td className="py-2 pl-3 font-weight-medium">{index + 1}</td>
                    <td className="py-2 font-weight-medium">{project.project || '-'}</td>
                    <td className="py-2 pr-3 text-right">
                      <button 
                        className="btn btn-outline-secondary btn-sm mr-1 btn-sm-icon"
                        onClick={() => handleEdit(project)}
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button 
                        className="btn btn-outline-danger btn-sm btn-sm-icon"
                        onClick={() => {
                          setCurrentProject(project);
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
                    {searchTerm ? 'No projects match your search' : 'No projects found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Project Modal */}
      {showModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-sm modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header py-2 bg-light">
                  <h6 className="modal-title text-primary">{isEditing ? 'Edit Project' : 'New Project'}</h6>
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
                      <label className="small font-weight-bold">Project Name *</label>
                      <input
                        className={`form-control form-control-sm shadow-sm ${validationErrors.project ? 'is-invalid' : ''}`}
                        type="text"
                        name="project"
                        placeholder="Enter project name"
                        value={formData.project}
                        onChange={handleInputChange}
                        required
                      />
                      {validationErrors.project && (
                        <small className="text-danger">
                          {validationErrors.project}
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
                  <p>Are you sure you want to delete project <strong>{currentProject?.project || 'this project'}</strong>?</p>
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
        .project-table th {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6c757d;
        }
        .project-table td {
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

export default Projects;
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
  FaExclamationTriangle,
  FaPhone,
  FaUserTie,
  FaCheckCircle
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

// Component for the AutoData form
const AutoDataForm = ({ newAutoData, setNewAutoData, handleAddAutoData, isEditMode, handleUpdateAutoData }) => {
  return (
    <div className="card shadow mb-4 border-0">
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-gradient-primary-to-secondary">
        <h6 className="m-0 font-weight-bold text-white">
          {isEditMode ? 'Edit AutoData' : 'Add New AutoData'}
        </h6>
      </div>
      <div className="card-body">
        <form onSubmit={isEditMode ? handleUpdateAutoData : handleAddAutoData}>
          <h6 className="font-weight-bold text-primary mb-3">Client Information</h6>
          <div className="form-row mb-3">
            <div className="form-group col-md-4">
              <label htmlFor="clientname">Client Name</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-light border-right-0">
                    <FaUserCircle className="text-primary" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control border-left-0"
                  id="clientname"
                  placeholder="Client name"
                  value={newAutoData.client.clientname}
                  onChange={(e) => setNewAutoData({
                    ...newAutoData,
                    client: {
                      ...newAutoData.client,
                      clientname: e.target.value
                    }
                  })}
                />
              </div>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="requestor">Requestor</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-light border-right-0">
                    <FaUserTie className="text-primary" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control border-left-0"
                  id="requestor"
                  placeholder="Requestor name"
                  value={newAutoData.client.requestor}
                  onChange={(e) => setNewAutoData({
                    ...newAutoData,
                    client: {
                      ...newAutoData.client,
                      requestor: e.target.value
                    }
                  })}
                />
              </div>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="approver">Approver</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-light border-right-0">
                    <FaCheckCircle className="text-primary" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control border-left-0"
                  id="approver"
                  placeholder="Approver name"
                  value={newAutoData.client.approver}
                  onChange={(e) => setNewAutoData({
                    ...newAutoData,
                    client: {
                      ...newAutoData.client,
                      approver: e.target.value
                    }
                  })}
                />
              </div>
            </div>
          </div>

          <div className="form-row mb-4">
            <div className="form-group col-md-4">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                className="form-control"
                id="department"
                placeholder="Department"
                value={newAutoData.client.department}
                onChange={(e) => setNewAutoData({
                  ...newAutoData,
                  client: {
                    ...newAutoData.client,
                    department: e.target.value
                  }
                })}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="phoneno">Phone Number</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-light border-right-0">
                    <FaPhone className="text-primary" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control border-left-0"
                  id="phoneno"
                  placeholder="Phone number"
                  value={newAutoData.client.phoneno}
                  onChange={(e) => setNewAutoData({
                    ...newAutoData,
                    client: {
                      ...newAutoData.client,
                      phoneno: e.target.value
                    }
                  })}
                />
              </div>
            </div>
          </div>

          <h6 className="font-weight-bold text-primary mb-3">Project Information</h6>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="technology">Technology</label>
              <input
                type="text"
                className="form-control"
                id="technology"
                placeholder="Technology"
                value={newAutoData.technology}
                onChange={(e) => setNewAutoData({
                  ...newAutoData,
                  technology: e.target.value
                })}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="project">Project</label>
              <input
                type="text"
                className="form-control"
                id="project"
                placeholder="Project"
                value={newAutoData.project}
                onChange={(e) => setNewAutoData({
                  ...newAutoData,
                  project: e.target.value
                })}
              />
            </div>
          </div>

          <div className="form-group mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!newAutoData.client.clientname || !newAutoData.technology || !newAutoData.project}
            >
              {isEditMode ? 'Update AutoData' : 'Add AutoData'}
            </button>
            {isEditMode && (
              <button
                type="button"
                className="btn btn-outline-secondary ml-2"
                onClick={() => {
                  setNewAutoData({
                    client: {
                      clientname: "",
                      requestor: "",
                      approver: "",
                      department: "",
                      phoneno: "",
                    },
                    technology: "",
                    project: ""
                  });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// Component for the AutoData table
const AutoDataTable = ({ autoDataList, confirmDelete, searchTerm, handleEdit }) => {
  const filteredData = autoDataList.filter(item =>
    item.client.clientname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.technology.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card shadow mb-4 border-0">
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold">AutoData Management</h6>
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
                <th className="pl-4">Client Name</th>
                <th>Requestor</th>
                <th>Approver</th>
                <th>Technology</th>
                <th>Project</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map(item => (
                  <tr key={item._id}>
                    <td className="align-middle pl-4">
                      <div className="d-flex align-items-center">
                        <div className="mr-2">
                          <FaBuilding size={20} className="text-primary" />
                        </div>
                        <div>
                          <span className="font-weight-medium">{item.client.clientname}</span>
                          <div className="text-muted small">{item.client.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">{item.client.requestor}</td>
                    <td className="align-middle">{item.client.approver}</td>
                    <td className="align-middle">{item.technology}</td>
                    <td className="align-middle">{item.project}</td>
                    <td className="align-middle text-center">
                      <button
                        className="btn btn-sm btn-outline-primary mr-2"
                        title="Edit"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit size={14} className="mr-1" /> Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Delete"
                        onClick={() => confirmDelete(item._id)}
                      >
                        <FaTrash size={14} className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <div className="text-muted d-flex flex-column align-items-center">
                      <FaSearch size={32} className="text-gray-300 mb-3" />
                      <div>No data found matching "{searchTerm}"</div>
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
const DeleteModal = ({ show, onClose, onConfirm, itemType = 'AutoData' }) => {
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
            <p>Are you sure you want to delete this {itemType.toLowerCase()}? This action cannot be undone.</p>
            <div className="alert alert-warning mt-3">
              <strong>Warning:</strong> This will permanently remove all data associated with this {itemType.toLowerCase()}.
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
              Delete {itemType}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Admin component
const Admin = () => {
  const [autoDataList, setAutoDataList] = useState([]);
  const [newAutoData, setNewAutoData] = useState({
    client: {
      clientname: "",
      requestor: "",
      approver: "",
      department: "",
      phoneno: "",
    },
    technology: "",
    project: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeForm, setActiveForm] = useState('autodata');
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  
  // Fetch AutoData
  useEffect(() => {
    const fetchAutoData = async () => {
      setLoading(true);
      try {
        const res = await api.get('/autodata');
        setAutoDataList(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchAutoData();
  }, []);

  // Handle add AutoData
  const handleAddAutoData = async (e) => {
    e.preventDefault();
    if (!newAutoData.client.clientname || !newAutoData.technology || !newAutoData.project) return;

    try {
      const res = await api.post('/autodata', newAutoData);
      setAutoDataList([...autoDataList, res.data]);
      setNewAutoData({
        client: {
          clientname: "",
          requestor: "",
          approver: "",
          department: "",
          phoneno: "",
        },
        technology: "",
        project: ""
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Handle edit AutoData
  const handleEditAutoData = (item) => {
    setNewAutoData(item);
    setIsEditMode(true);
    setCurrentEditId(item._id);
  };

  // Handle update AutoData
  const handleUpdateAutoData = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/autodata/${currentEditId}`, newAutoData);
      setAutoDataList(autoDataList.map(item => 
        item._id === currentEditId ? res.data : item
      ));
      setNewAutoData({
        client: {
          clientname: "",
          requestor: "",
          approver: "",
          department: "",
          phoneno: "",
        },
        technology: "",
        project: ""
      });
      setIsEditMode(false);
      setCurrentEditId(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Delete AutoData functions
  const confirmDelete = (id) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const handleRemoveAutoData = async () => {
    try {
      await api.delete(`/autodata/${itemToDelete}`);
      setAutoDataList(autoDataList.filter(item => item._id !== itemToDelete));
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
    { title: 'AutoData', count: autoDataList.length, icon: FaChartLine, color: 'primary', id: 'autodata' },
    { title: 'Clients', count: new Set(autoDataList.map(item => item.client.clientname)).size, icon: FaBuilding, color: 'success', id: 'clients' },
    { title: 'Projects', count: new Set(autoDataList.map(item => item.project)).size, icon: FaBriefcase, color: 'info', id: 'projects' },
    { title: 'Technologies', count: new Set(autoDataList.map(item => item.technology)).size, icon: FaLaptopCode, color: 'warning', id: 'technologies' }
  ];

  return (
    <div className="container-fluid py-4" style={{ fontFamily: 'Verdana, Geneva, sans-serif', backgroundColor: '#f8f9fc', minHeight: '100vh' }}>
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-0 text-gray-800 font-weight-bold">AutoData Dashboard</h1>
          <p className="text-muted mb-0">Manage your AutoData entries</p>
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
          {/* AutoData Form */}
          {activeForm === 'autodata' && (
            <AutoDataForm 
              newAutoData={newAutoData} 
              setNewAutoData={setNewAutoData} 
              handleAddAutoData={handleAddAutoData}
              isEditMode={isEditMode}
              handleUpdateAutoData={handleUpdateAutoData}
            />
          )}

          {/* AutoData Table */}
          {activeForm === 'autodata' && (
            <AutoDataTable 
              autoDataList={autoDataList} 
              confirmDelete={confirmDelete} 
              searchTerm={searchTerm}
              handleEdit={handleEditAutoData}
            />
          )}

          {/* Other content for different tabs would go here */}
          {activeForm !== 'autodata' && (
            <div className="card shadow mb-4 border-0">
              <div className="card-body p-5 text-center">
                <h4 className="text-muted mb-3">Under Development</h4>
                <p>The {activeForm} management section is currently being developed.</p>
                <button 
                  className="btn btn-primary mt-3" 
                  onClick={() => setActiveForm('autodata')}
                >
                  Return to AutoData
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
        onConfirm={handleRemoveAutoData}
        itemType="AutoData"
      />
    </div>
  );
};

export default Admin; 
import React, { useEffect, useState } from 'react';
import api from "../API/api";
import { FaUsers, FaPlusCircle, FaUserCircle, FaChartLine,  } from 'react-icons/fa'; // Import icons

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const verdanaStyle = {
    fontFamily: 'Verdana, Geneva, sans-serif'
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

  return (
    <div className="container mt-5" style={verdanaStyle}>
      <h1 className="mb-4 text-center text-info">Admin Dashboard</h1>

      {/* Delete Confirmation Modal */}
      <div className={`modal fade ${showDeleteModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: showDeleteModal ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button type="button" className="close" onClick={() => setShowDeleteModal(false)}>
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
              <button type="button" className="btn btn-danger" onClick={handleRemoveUser}>
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow border-left-primary h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Total Users
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{users.length}</div>
                </div>
                <div className="col-auto">
                  {/* <FaUsers className="fa-2x text-gray-300" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card shadow border-left-info h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    App Stats
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        Daily Active: HERE
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted">Get Data: HERE</p>
                </div>
                <div className="col-auto">
                  <FaChartLine className="fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Form */}
      <div className="card mb-4 shadow">
        <div className="card-header bg-dark text-white">
          <FaPlusCircle className="mr-2" /> Add New User
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
                <button type="submit" className="btn btn-success btn-block">
                  Add User
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* User List Table */}
      <div className="card shadow">
        <div className="card-header bg-dark text-white">  <FaUsers className="fa-2x text-gray-300" />  User List</div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th style={{ width: '120px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>  <FaUserCircle size={20} />  {user.username}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => confirmDelete(user._id)}
                      >
                        {/* <FaTrashAlt className="mr-1" />  */}
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
    </div>
  );
};

export default Admin;
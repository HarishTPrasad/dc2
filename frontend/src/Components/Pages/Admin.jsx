import React, { useEffect, useState } from 'react';
import api from "../API/api";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleRemoveUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (loading) return <div className="container mt-5 text-center">Loading...</div>;
  if (error) return <div className="container mt-5 text-center text-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-info">Admin Dashboard</h1>

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
                  <i className="fas fa-users fa-2x text-gray-300"></i>
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
                  <i className="fas fa-chart-line fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Form */}
      <div className="card mb-4 shadow">
        <div className="card-header bg-dark text-white">Add New User</div> {/* Changed to bg-dark */}
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
        <div className="card-header bg-dark text-white">User List</div>
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
                    <td>{user.username}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRemoveUser(user._id)}
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
    </div>
  );
};

export default Admin;
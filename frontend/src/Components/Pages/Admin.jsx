import React, { useEffect, useState } from 'react';
import api from "../API/api";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });

  // Fetch users from backend
  useEffect(() => {
    api.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add a new user
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.username || !newUser.password) return;

    api.post('/api/users', newUser)
      .then(res => {
        setUsers([...users, res.data]);
        setNewUser({ username: '', password: '' });
      })
      .catch(err => console.error(err));
  };

  // Remove user by ID
  const handleRemoveUser = (id) => {
    api.delete(`/api/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-primary">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card text-white bg-info h-100">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text display-4">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card text-white bg-secondary h-100">
            <div className="card-body">
              <h5 className="card-title">App Stats</h5>
              <p className="card-text">Daily Active Users: n</p>
              <p className="card-text">Get Data: n</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Form */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">Add New User</div>
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
      <div className="card">
        <div className="card-header bg-dark text-white">User List</div>
        <div className="card-body p-0">
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
  );
};

export default Admin;

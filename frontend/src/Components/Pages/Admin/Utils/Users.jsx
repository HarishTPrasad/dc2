// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form, Table, Alert, Spinner } from 'react-bootstrap';
// import api from "../../../API/api"
// import moment from 'moment';

// function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     fullname: '',
//     password: '',
//     role: 'user'
//   });
//   const [validationErrors, setValidationErrors] = useState({});

//   // Fetch users on component mount
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await api.get('/users');
//         setUsers(response.data.data);
//       } catch (err) {
//         setError(err.response?.data?.error || 'Failed to fetch users');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear validation error when user types
//     if (validationErrors[name]) {
//       setValidationErrors(prev => ({
//         ...prev,
//         [name]: null
//       }));
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.username.trim()) errors.username = 'Username is required';
//     if (!formData.fullname.trim()) errors.fullname = 'Full name is required';
//     if (!formData.password) errors.password = 'Password is required';
//     if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    
//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       setLoading(true);
//       const response = await api.post('/users', formData);
//       setUsers([...users, response.data.data]);
//       setShowModal(false);
//       setFormData({
//         username: '',
//         fullname: '',
//         password: '',
//         role: 'user'
//       });
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to create user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container-fluid p-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="mb-0">User Management</h2>
//         <Button variant="primary" onClick={() => setShowModal(true)}>
//           <i className="fas fa-plus mr-2"></i>Add User
//         </Button>
//       </div>

//       {error && (
//         <Alert variant="danger" onClose={() => setError(null)} dismissible>
//           {error}
//         </Alert>
//       )}

//       {loading && users.length === 0 ? (
//         <div className="text-center py-5">
//           <Spinner animation="border" role="status">
//             <span className="sr-only">Loading...</span>
//           </Spinner>
//         </div>
//       ) : (
//         <div className="card shadow-sm">
//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <Table striped bordered hover className="mb-0">
//                 <thead className="bg-light">
//                   <tr>
//                     <th>User ID</th>
//                     <th>Username</th>
//                     <th>Full Name</th>
//                     <th>Role</th>
//                     <th>Date Created</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map(user => (
//                     <tr key={user._id}>
//                       <td>{user.userid || 'N/A'}</td>
//                       <td>{user.username}</td>
//                       <td>{user.fullname}</td>
//                       <td>
//                         <span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-secondary'}`}>
//                           {user.role}
//                         </span>
//                       </td>
//                       <td>{moment(user.createdAt).format('MMM D, YYYY h:mm A')}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add User Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create New User</Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body>
//             <Form.Group>
//               <Form.Label>Username *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 isInvalid={!!validationErrors.username}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {validationErrors.username}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>Full Name *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="fullname"
//                 value={formData.fullname}
//                 onChange={handleInputChange}
//                 isInvalid={!!validationErrors.fullname}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {validationErrors.fullname}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>Password *</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 isInvalid={!!validationErrors.password}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {validationErrors.password}
//               </Form.Control.Feedback>
//               <Form.Text className="text-muted">
//                 Minimum 6 characters
//               </Form.Text>
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>Role</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleInputChange}
//               >
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//               </Form.Control>
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="primary" type="submit" disabled={loading}>
//               {loading ? (
//                 <>
//                   <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
//                   <span className="sr-only">Creating...</span>
//                 </>
//               ) : (
//                 'Create User'
//               )}
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </div>
//   );
// }

// export default Users;

import React from 'react'

function Users() {
  return (
    <div>Users</div>
  )
}

export default Users
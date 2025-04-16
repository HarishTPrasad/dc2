import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../API/api';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Ticket() {
  const username = sessionStorage.getItem("username") || "User";
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get('/ticket');
        console.log('Ticket data:', response.data.data);
        setTickets(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const [filter, setFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'ticketno', direction: 'ascending' });
  const [assignedFilter, setAssignedFilter] = useState(null);
  const [showAssignedDropdown, setShowAssignedDropdown] = useState(false);

  const assignees = [...new Set(tickets.map(ticket => ticket.assignedto))];

  const handleFilter = (status) => {
    setFilter(status);
    setAssignedFilter(null);
  };

  const handleAssignedFilter = (assignee) => {
    if (assignee === 'Assigned to Me') {
      setAssignedFilter(username);
    } else {
      setAssignedFilter(assignee);
    }
    setFilter('all');
    setShowAssignedDropdown(false);
  };

  const handleCreateNew = () => {
    navigate('/dashboard/ticketform');
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredTickets = filter === 'all'
    ? sortedTickets
    : sortedTickets.filter(ticket => ticket.status === filter);

  const finalTickets = assignedFilter
    ? filteredTickets.filter(ticket => ticket.assignedto === assignedFilter)
    : filteredTickets;

  const getPriorityClass = (priority) => {
    if (!priority) return 'secondary';
    switch (priority.toLowerCase()) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusClass = (status) => {
    if (!status) return 'secondary';
    switch (status.toLowerCase()) {
      case 'open': return 'primary';
      case 'in progress': return 'info';
      case 'completed': return 'success';
      case 'closed': return 'secondary';
      default: return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const buttonStyle = {
    borderRadius: '8px',
    border: '2px solid #1679AB',
    backgroundColor: 'white',
    color: '#1679AB',
    padding: '8px 16px',
    margin: '0 8px 8px 0',
    transition: 'all 0.3s ease',
  };
  const smallTextStyle = {
    fontSize: '0.8rem',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#1679AB',
    color: 'white',
    boxShadow: '0 0 0 0.2rem rgba(22, 121, 171, 0.25)'
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();

    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this ticket?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await api.delete(`/ticket/${id}`);
              setTickets(tickets.filter(ticket => ticket._id !== id));
            } catch (err) {
              console.error('Error deleting ticket:', err);
              alert('Failed to delete ticket');
            }
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  };

  const handleRowClick = (ticket) => {
    navigate('/dashboard/ticketview', { state: { ticket } });
  };

  if (loading) return <div className="container mt-4">Loading tickets...</div>;
  if (error) return <div className="container mt-4">Error: {error}</div>;

  return (
    <div className="container-fluid mt-1">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h3 className="mb-0">Ticket Dashboard</h3>
        <div>
          <button
            className="btn btn-primary mr-2"
            style={{ backgroundColor: "#1679AB", fontSize: '0.8rem', }}
            onClick={handleCreateNew}
          >
            <i className="fas fa-plus mr-2"></i>Create New Ticket
          </button>
          <button className="btn btn-light" style={smallTextStyle}>
            <i className="fas fa-sync-alt mr-2"></i>Refresh
          </button>
        </div>
      </div>

      <div className="d-flex flex-wrap mb-4 align-items-center" style={smallTextStyle}>
        <button style={filter === 'all' && !assignedFilter ? activeButtonStyle : buttonStyle} onClick={() => handleFilter('all')}>All Tickets</button>
        <button style={filter === 'Open' ? activeButtonStyle : buttonStyle} onClick={() => handleFilter('Open')}>Open</button>
        <button style={filter === 'In Progress' ? activeButtonStyle : buttonStyle} onClick={() => handleFilter('In Progress')}>In Progress</button>
        <button style={filter === 'Completed' ? activeButtonStyle : buttonStyle} onClick={() => handleFilter('Completed')}>Completed</button>
        <button style={filter === 'Closed' ? activeButtonStyle : buttonStyle} onClick={() => handleFilter('Closed')}>Closed</button>

        <div className="position-relative">
          <button style={assignedFilter ? activeButtonStyle : buttonStyle} onClick={() => setShowAssignedDropdown(!showAssignedDropdown)}>
            {assignedFilter ? `Assigned: ${assignedFilter}` : 'Filter by Assignee'}
            <i className={`fas fa-chevron-${showAssignedDropdown ? 'up' : 'down'} ml-2`}></i>
          </button>

          {showAssignedDropdown && (
            <div className="position-absolute bg-white shadow rounded mt-1" style={{ zIndex: 1000, minWidth: '200px' }} onMouseLeave={() => setShowAssignedDropdown(false)}>
              <button className="dropdown-item" onClick={() => handleAssignedFilter('Assigned to Me')}>Assigned to Me ({username})</button>
              <div className="dropdown-divider"></div>
              {assignees.map((assignee, index) => (
                <button key={index} className="dropdown-item" onClick={() => handleAssignedFilter(assignee)}>{assignee}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="table-responsive table-sm" style={smallTextStyle}>
        <table className="table table-striped table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col" onClick={() => requestSort('ticketno')}>Ticket No {sortConfig.key === 'ticketno' && (<i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>)}</th>
              <th scope="col" onClick={() => requestSort('client')}>Client {sortConfig.key === 'client' && (<i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>)}</th>
              <th scope="col" onClick={() => requestSort('priority')}>Priority {sortConfig.key === 'priority' && (<i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>)}</th>
              <th scope="col" onClick={() => requestSort('assignedto')}>Assigned To {sortConfig.key === 'assignedto' && (<i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>)}</th>
              <th scope="col" onClick={() => requestSort('status')}>Status {sortConfig.key === 'status' && (<i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>)}</th>
              <th scope="col" onClick={() => requestSort('createdat')}>Created {sortConfig.key === 'createdat' && (<i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>)}</th>
              <th scope="col" onClick={() => requestSort('duedate')}>Due Date {sortConfig.key === 'duedate' && (<i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>)}</th>
              <th scope="col" onClick={() => requestSort('description')}>Description {sortConfig.key === 'description' && (<i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>)}</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {finalTickets.map((ticket, index) => (
              <tr key={index} onClick={() => handleRowClick(ticket)} style={{ cursor: 'pointer' }}>
                <th scope="row">{ticket.ticketno}</th>
                <td>{ticket.client}</td>
                <td><span className={`badge badge-${getPriorityClass(ticket.priority)}`}>{ticket.priority}</span></td>
                <td>{ticket.assignedto}</td>
                <td><span className={`badge badge-${getStatusClass(ticket.status)}`}>{ticket.status}</span></td>
                <td>{formatDate(ticket.createdat)}</td>
                <td>{formatDate(ticket.duedate)}</td>
                <td>{ticket.description}</td>
                <td>
                  <button className="btn btn-sm btn-info mr-2" onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/tickets/${ticket._id}`) }}><i className="fas fa-eye"></i></button>
                  <button className="btn btn-sm btn-warning mr-2" onClick={(e) => e.stopPropagation()}><i className="fas fa-edit"></i></button>
                  <button className="btn btn-sm btn-danger" onClick={(e) => handleDelete(ticket._id, e)}><i className="fas fa-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ticket;
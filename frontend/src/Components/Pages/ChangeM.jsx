import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChangeM({ username = "Harish Prasad" }) {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([
    {
      crfNo: '4042025-01',
      client: 'JNSB',
      technology: 'USB Access',
      subject: 'Need USB Access',
      date: '04-04-2025',
      assignedTo: 'Harish Prasad',
      status: 'Pending Approval',
    },
    {
      crfNo: '4042025-02',
      client: 'JNSB',
      technology: 'Firewall Access',
      subject: 'Need Firewall Access',
      date: '04-04-2025',
      assignedTo: 'Bharat Suthar',
      status: 'In Progress',
    },
    {
      crfNo: '4042025-03',
      client: 'JNSB',
      technology: 'White list URL/IP/Port',
      subject: 'Need to White List URL',
      date: '04-04-2025',
      assignedTo: 'Laxman Suthar',
      status: 'Completed',
    },
    {
      crfNo: '4042025-04',
      client: 'JNSB',
      technology: 'Geo-Location',
      subject: 'Need Changes In Geo-Location',
      date: '04-04-2025',
      assignedTo: 'Kailash Suthar',
      status: 'Rejected',
    },
  ]);

  const [filter, setFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'crfNo', direction: 'ascending' });
  const [assignedFilter, setAssignedFilter] = useState(null);
  const [showAssignedDropdown, setShowAssignedDropdown] = useState(false);

 
  const assignees = [...new Set(tickets.map(ticket => ticket.assignedTo))];

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
    navigate('/dashboard/form-a');
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
    ? filteredTickets.filter(ticket => ticket.assignedTo === assignedFilter)
    : filteredTickets;

  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'pending approval': return 'warning';
      case 'in progress': return 'info';
      case 'completed': return 'success';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
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

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#1679AB',
    color: 'white',
    boxShadow: '0 0 0 0.2rem rgba(22, 121, 171, 0.25)'
  };

  const hoverButtonStyle = {
    boxShadow: '0 0 10px rgba(22, 121, 171, 0.5)',
    transform: 'translateY(-1px)'
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Change Management</h1>
        <div>
          <button 
            className="btn btn-primary mr-2" 
            style={{ backgroundColor: "#1679AB"}}
            onClick={handleCreateNew}
          >
            <i className="fas fa-plus mr-2"></i>Create New CMR
          </button>
          <button className="btn btn-secondary mr-2" style={{ backgroundColor:"#A0C878"}}>
            <i className="fas fa-file-export mr-2"></i>Export
          </button>
          <button className="btn btn-light">
            <i className="fas fa-sync-alt mr-2"></i>Refresh
          </button>
        </div>
      </div>

      <div className="d-flex flex-wrap mb-4 align-items-center">
        <button
          style={filter === 'all' && !assignedFilter ? activeButtonStyle : buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.boxShadow = hoverButtonStyle.boxShadow}
          onMouseOut={(e) => e.currentTarget.style.boxShadow = ''}
          onClick={() => handleFilter('all')}
        >
          All CMRs
        </button>
        <button
          style={filter === 'Pending Approval' ? activeButtonStyle : buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.boxShadow = hoverButtonStyle.boxShadow}
          onMouseOut={(e) => e.currentTarget.style.boxShadow = ''}
          onClick={() => handleFilter('Pending Approval')}
        >
          Pending Approval
        </button>
        <button
          style={filter === 'In Progress' ? activeButtonStyle : buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.boxShadow = hoverButtonStyle.boxShadow}
          onMouseOut={(e) => e.currentTarget.style.boxShadow = ''}
          onClick={() => handleFilter('In Progress')}
        >
          In Progress
        </button>
        <button
          style={filter === 'Completed' ? activeButtonStyle : buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.boxShadow = hoverButtonStyle.boxShadow}
          onMouseOut={(e) => e.currentTarget.style.boxShadow = ''}
          onClick={() => handleFilter('Completed')}
        >
          Completed
        </button>
        <button
          style={filter === 'Rejected' ? activeButtonStyle : buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.boxShadow = hoverButtonStyle.boxShadow}
          onMouseOut={(e) => e.currentTarget.style.boxShadow = ''}
          onClick={() => handleFilter('Rejected')}
        >
          Rejected
        </button>

        {/* Assigned Dropdown */}
        <div className="position-relative">
          <button
            style={assignedFilter ? activeButtonStyle : buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.boxShadow = hoverButtonStyle.boxShadow}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = ''}
            onClick={() => setShowAssignedDropdown(!showAssignedDropdown)}
          >
            {assignedFilter ? `Assigned: ${assignedFilter}` : 'Filter by Assignee'}
            <i className={`fas fa-chevron-${showAssignedDropdown ? 'up' : 'down'} ml-2`}></i>
          </button>
          
          {showAssignedDropdown && (
            <div 
              className="position-absolute bg-white shadow rounded mt-1"
              style={{ zIndex: 1000, minWidth: '200px' }}
              onMouseLeave={() => setShowAssignedDropdown(false)}
            >
              <button
                className="dropdown-item"
                onClick={() => handleAssignedFilter('Assigned to Me')}
              >
                Assigned to Me ({username})
              </button>
              <div className="dropdown-divider"></div>
              {assignees.map((assignee, index) => (
                <button
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleAssignedFilter(assignee)}
                >
                  {assignee}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col" onClick={() => requestSort('crfNo')}>
                CMR No {sortConfig.key === 'crfNo' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('client')}>
                Client {sortConfig.key === 'client' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('technology')}>
                Technology {sortConfig.key === 'technology' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('subject')}>
                Subject {sortConfig.key === 'subject' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('date')}>
                Date {sortConfig.key === 'date' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('assignedTo')}>
                Assigned To {sortConfig.key === 'assignedTo' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('status')}>
                Status {sortConfig.key === 'status' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {finalTickets.map((ticket, index) => (
              <tr key={index}>
                <th scope="row">{ticket.crfNo}</th>
                <td>{ticket.client}</td>
                <td>{ticket.technology}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.date}</td>
                <td>{ticket.assignedTo}</td>
                <td>
                  <span className={`badge badge-${getStatusClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-info mr-2">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="btn btn-sm btn-warning">
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChangeM;
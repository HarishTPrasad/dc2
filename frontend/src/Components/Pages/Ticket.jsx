import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Ticket({ username = "Harish Prasad" }) {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([
    {
      ticketNo: 'TCK-1000',
      client: 'JNSB',
      technology: 'React/Node.js',
      subject: 'Dashboard Redesign',
      priority: 'High',
      assigned: 'Harish Prasad',
      status: 'Open',
      createdDate: '2025-03-20',
      lastUpdated: '2025-03-25'
    },
    {
      ticketNo: 'TCK-1001',
      client: 'BWRUCB',
      technology: 'USB Access',
      subject: 'Need USB Access',
      priority: 'High',
      assigned: 'Bharat Suthar',
      status: 'In Progress',
      createdDate: '2025-03-18',
      lastUpdated: '2025-03-24'
    },
    {
      ticketNo: 'TCK-1002',
      client: 'PNSB',
      technology: 'Firewall Access',
      subject: 'Need Firewall Access',
      priority: 'Medium',
      assigned: 'Laxman Suthar',
      status: 'Completed',
      createdDate: '2025-03-10',
      lastUpdated: '2025-03-23'
    },
    {
      ticketNo: 'TCK-1003',
      client: 'VCOB',
      technology: 'White list URL/IP/Port',
      subject: 'Need to White List URL',
      priority: 'Low',
      assigned: 'Kailash Suthar',
      status: 'Closed',
      createdDate: '2025-03-05',
      lastUpdated: '2025-03-22'
    },
    {
      ticketNo: 'TCK-1004',
      client: 'KNSB',
      technology: 'Database Migration',
      subject: 'MySQL to PostgreSQL Migration',
      priority: 'High',
      assigned: 'Harish Prasad',
      status: 'Open',
      createdDate: '2025-03-15',
      lastUpdated: '2025-03-25'
    },
    {
      ticketNo: 'TCK-1005',
      client: 'RNBX',
      technology: 'API Development',
      subject: 'New Payment Gateway Integration',
      priority: 'High',
      assigned: 'Bharat Suthar',
      status: 'In Progress',
      createdDate: '2025-03-12',
      lastUpdated: '2025-03-24'
    },
    {
      ticketNo: 'TCK-1006',
      client: 'SMCBL',
      technology: 'Security',
      subject: 'Implement Two-Factor Authentication',
      priority: 'Medium',
      assigned: 'Laxman Suthar',
      status: 'In Progress',
      createdDate: '2025-03-08',
      lastUpdated: '2025-03-22'
    },
    {
      ticketNo: 'TCK-1007',
      client: 'INSB',
      technology: 'Mobile App',
      subject: 'iOS App Bug Fixes',
      priority: 'Medium',
      assigned: 'Kailash Suthar',
      status: 'Open',
      createdDate: '2025-03-22',
      lastUpdated: '2025-03-25'
    },
    {
      ticketNo: 'TCK-1008',
      client: 'MUCB',
      technology: 'Cloud Services',
      subject: 'AWS Infrastructure Setup',
      priority: 'High',
      assigned: 'Harish Prasad',
      status: 'In Progress',
      createdDate: '2025-03-17',
      lastUpdated: '2025-03-24'
    },
    {
      ticketNo: 'TCK-1009',
      client: 'GNCB',
      technology: 'Data Analytics',
      subject: 'Reporting Dashboard Implementation',
      priority: 'Medium',
      assigned: 'Bharat Suthar',
      status: 'Completed',
      createdDate: '2025-03-05',
      lastUpdated: '2025-03-20'
    },
    {
      ticketNo: 'TCK-1010',
      client: 'VK-ENG',
      technology: 'IoT',
      subject: 'Device Firmware Update',
      priority: 'Low',
      assigned: 'Laxman Suthar',
      status: 'Closed',
      createdDate: '2025-02-28',
      lastUpdated: '2025-03-15'
    },
  ]);

  const [filter, setFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'ticketNo', direction: 'ascending' });
  const [assignedFilter, setAssignedFilter] = useState(null);
  const [showAssignedDropdown, setShowAssignedDropdown] = useState(false);

  // Get unique assignees from tickets
  const assignees = [...new Set(tickets.map(ticket => ticket.assigned))];

  const handleFilter = (status) => {
    setFilter(status);
    setAssignedFilter(null); // Reset assigned filter when changing status
  };

  const handleAssignedFilter = (assignee) => {
    if (assignee === 'Assigned to Me') {
      setAssignedFilter(username);
    } else {
      setAssignedFilter(assignee);
    }
    setFilter('all'); // Reset status filter when changing assignee
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

  // Apply assigned filter if set
  const finalTickets = assignedFilter 
    ? filteredTickets.filter(ticket => ticket.assigned === assignedFilter)
    : filteredTickets;

  const getPriorityClass = (priority) => {
    switch(priority.toLowerCase()) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'open': return 'primary';
      case 'in progress': return 'info';
      case 'completed': return 'success';
      case 'closed': return 'secondary';
      default: return 'secondary';
    }
  };

  // Button styles
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
        <h1 className="mb-0">Ticket Dashboard</h1>
        <div>
          <button 
            className="btn btn-primary mr-2" 
            style={{ backgroundColor: "#1679AB"}}
            onClick={handleCreateNew}
          >
            <i className="fas fa-plus mr-2"></i>Create New Ticket
          </button>
          <button className="btn btn-secondary mr-2" style={{ backgroundColor:"#A0C878"}}>
            <i className="fas fa-file-export mr-2"></i>Export Tickets
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
          All Tickets
        </button>
        <button
          style={filter === 'Open' ? activeButtonStyle : buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.boxShadow = hoverButtonStyle.boxShadow}
          onMouseOut={(e) => e.currentTarget.style.boxShadow = ''}
          onClick={() => handleFilter('Open')}
        >
          Open
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
          style={filter === 'Closed' ? activeButtonStyle : buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.boxShadow = hoverButtonStyle.boxShadow}
          onMouseOut={(e) => e.currentTarget.style.boxShadow = ''}
          onClick={() => handleFilter('Closed')}
        >
          Closed
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
              <th scope="col" onClick={() => requestSort('ticketNo')}>
                Ticket No {sortConfig.key === 'ticketNo' && (
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
              <th scope="col" onClick={() => requestSort('priority')}>
                Priority {sortConfig.key === 'priority' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('assigned')}>
                Assigned {sortConfig.key === 'assigned' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('status')}>
                Status {sortConfig.key === 'status' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('createdDate')}>
                Created {sortConfig.key === 'createdDate' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('lastUpdated')}>
                Last Updated {sortConfig.key === 'lastUpdated' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {finalTickets.map((ticket, index) => (
              <tr key={index}>
                <th scope="row">{ticket.ticketNo}</th>
                <td>{ticket.client}</td>
                <td>{ticket.technology}</td>
                <td>{ticket.subject}</td>
                <td>
                  <span className={`badge badge-${getPriorityClass(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td>{ticket.assigned}</td>
                <td>
                  <span className={`badge badge-${getStatusClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td>{ticket.createdDate}</td>
                <td>{ticket.lastUpdated}</td>
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

export default Ticket;
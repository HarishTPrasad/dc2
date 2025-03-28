import React, { useState } from 'react';

function Ticket() {
  const [tickets, setTickets] = useState([
    {
      ticketNo: 'TCK-1000',
      department: 'Development',
      lastUpdated: '2025-03-25',
      subject: 'Ticking Tool',
      from: 'Kailash Suthar',
      priority: 'High',
      assigned: 'Harish Prasad',
      status: 'Open',
      fromDate: '2025-03-20',
      toDate: '2025-03-30',
    },
    {
      ticketNo: 'TCK-1001',
      department: 'IT/JNSB',
      lastUpdated: '2025-03-25',
      subject: 'Server Issue',
      from: 'Arvind Suthar',
      priority: 'High',
      assigned: 'Harish Prasad',
      status: 'Open',
      fromDate: '2025-03-20',
      toDate: '2025-03-30',
    },
    {
      ticketNo: 'TCK-1002',
      department: 'IT/JNSB',
      lastUpdated: '2025-03-24',
      subject: 'Monthly Report',
      from: 'Lakshman Suthar',
      priority: 'Medium',
      assigned: 'Bharat Suthar',
      status: 'In Progress',
      fromDate: '2025-03-18',
      toDate: '2025-03-25',
    },
    {
      ticketNo: 'TCK-1003',
      department: 'IT/JNSB',
      lastUpdated: '2025-03-23',
      subject: 'Weekly Report',
      from: 'Harish Prasad',
      priority: 'Low',
      assigned: 'Laxman Suthar',
      status: 'Closed',
      fromDate: '2025-03-10',
      toDate: '2025-03-20',
    },
  ]);

  const [filter, setFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  const handleFilter = (status) => {
    setFilter(status);
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
      default: return 'secondary';
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Ticket Dashboard</h1>
        <div>
 
          <button className="btn btn-primary mr-2" style={{ backgroundColor: "#1679AB"}}>
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

      <div className="btn-group mb-4" role="group">
        <button style={{ backgroundColor: "#1679AB"}}
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleFilter('all')}
        >
          All Tickets
        </button>
        <button style={{ backgroundColor: "#1679AB", color: "white"}}
          className={`btn ${filter === 'Open' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleFilter('Open')}
        >
          Open
        </button>
        <button style={{ backgroundColor: "#1679AB", color: "white"}}
          className={`btn ${filter === 'In Progress' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleFilter('In Progress')}
        >
          In Progress
        </button>
        <button style={{ backgroundColor: "#1679AB", color: "white"}}
          className={`btn ${filter === 'Completed' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleFilter('Completed')}
        >
          Completed
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col" onClick={() => requestSort('id')}>
              Ticket No {sortConfig.key === 'id' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('name')}>
              Department {sortConfig.key === 'name' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('assignedTo')}>
              Last Updated {sortConfig.key === 'assignedTo' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('assignedBy')}>
              Subject {sortConfig.key === 'assignedBy' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
            
              <th scope="col" onClick={() => requestSort('type')}>
              Priority {sortConfig.key === 'type' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('status')}>
              Assigned {sortConfig.key === 'status' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('priority')}>
              Status {sortConfig.key === 'priority' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('createdAt')}>
              From Date {sortConfig.key === 'createdAt' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(ticket => (
              <tr key={ticket.id}>
                <th scope="row">{ticket.ticketNo}</th>
                <td>{ticket.department}</td>
                <td>{ticket.lastUpdated}</td>
                <td>{ticket.subject}</td>
               
                <td>
                  <span className={`badge badge-${getPriorityClass(ticket.priority)}`}>
                  {ticket.priority}
                  </span>
                </td>
                <td> {ticket.assigned}</td>
                <td>
                  <span className={`badge badge-${getStatusClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
               
                <td>{ticket.fromDate}</td>
               
               
                
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

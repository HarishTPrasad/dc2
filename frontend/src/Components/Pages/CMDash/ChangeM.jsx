import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../API/api';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function ChangeM() {
  const username = sessionStorage.getItem("username") || "User";
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'changeRequestNo', direction: 'ascending' });
  const [assignedFilter, setAssignedFilter] = useState(null);
  const [showAssignedDropdown, setShowAssignedDropdown] = useState(false);

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Function to truncate text to show only 5-7 words
  const truncateText = (text) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= 7) return text;
    return words.slice(0, 6).join(' ') + '...';
  };

  const verdanaStyle = {
    fontFamily: 'Verdana, Geneva, sans-serif'
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get('/documents');
        setTickets(response.data.data || response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching tickets:', err);
      }
    };

    fetchTickets();
  }, []);

  const assignees = [...new Set(tickets.map(ticket => ticket.implementationAssigned))];

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

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await api.get('/documents');
      setTickets(response.data.data || response.data);
      console.log('Fetched data:', response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRowClick = (ticket) => {
    navigate('/dashboard/oldview', { state: { ticket } });
  };
  const handleUpdateClick = (ticket) => {
    navigate("/Dashboard/form-a", { state: { ticket } });
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to permanently delete this document?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await api.delete(`/documents/${id}`);
              setTickets(tickets.filter(ticket => ticket._id !== id));
            } catch (err) {
              console.error('Error deleting document:', err);
              alert('Failed to delete document');
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
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
    : sortedTickets.filter(ticket => {
        const status = ticket.implementationStatus || 
                     (ticket.changeRequestStatus?.accepted ? 'Pending Approval' : 
                      ticket.changeRequestStatus?.rejected ? 'Rejected' : 'In Progress');
        return status === filter;
      });

  const finalTickets = assignedFilter 
    ? filteredTickets.filter(ticket => ticket.implementationAssigned === assignedFilter)
    : filteredTickets;

  const getStatusClass = (status) => {
    if (!status) return 'secondary';
    switch(status.toLowerCase()) {
      case 'pending approval': return 'warning';
      case 'in progress': return 'info';
      case 'completed': return 'success';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusText = (ticket) => {
    return ticket.implementationStatus || 
           (ticket.changeRequestStatus?.accepted ? 'Pending Approval' : 
            ticket.changeRequestStatus?.rejected ? 'Rejected' : 'In Progress');
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
    fontSize: '0.8rem', // Or any other smaller unit like '12px', '0.7em'
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

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4">Error: {error}</div>;

  return (
    <div className="container-fluid mt-1" style={verdanaStyle}>
      <div className="d-flex justify-content-between align-items-center mb-1" style={{ marginTop: "20px"}}>
        <h3 className="mb-1" style={{  fontSize: "2rem", fontWeight: "600",}}>Change Management</h3>
        <div>
          <button 
            className="btn btn-primary mr-2" 
            style={{ backgroundColor: "#1679AB",fontSize: '0.8rem' }}
            onClick={handleCreateNew}
           
          >
            <i className="fas fa-plus mr-2"></i>Create New CMR
          </button>
        
          <button className="btn btn-light" onClick={handleRefresh} style={smallTextStyle}>
            <i className="fas fa-sync-alt mr-2"></i>Refresh
          </button>
        </div>
      </div>

      <div className="d-flex flex-wrap mb-4 align-items-center" style={smallTextStyle}>
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
                  {assignee || 'Unassigned'}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="table-responsive table-sm" style={smallTextStyle}>
        <table className="table table-striped table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col" onClick={() => requestSort('changeRequestNo')}>
                CMR No {sortConfig.key === 'changeRequestNo' && (
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
              <th scope="col" onClick={() => requestSort('changeDescription')}>
                Subject {sortConfig.key === 'changeDescription' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('date')}>
                Date {sortConfig.key === 'date' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('implementationAssigned')}>
                Assigned To {sortConfig.key === 'implementationAssigned' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" onClick={() => requestSort('implementationStatus')}>
                Status {sortConfig.key === 'implementationStatus' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {finalTickets.map((ticket) => (
              <tr 
                key={ticket._id}
                onClick={() => handleRowClick(ticket)}
                style={{ cursor: 'pointer' }}
              >
                <th scope="row">{ticket.changeRequestNo}</th>
                <td>{ticket.client}</td>
                <td>{ticket.technology}</td>
                <td title={ticket.changeDescription}>{truncateText(ticket.changeDescription)}</td>
                <td>{formatDate(ticket.date)}</td>
                <td>{ticket.implementationAssigned || 'Unassigned'}</td>
                <td>
                  <span className={`badge badge-${getStatusClass(getStatusText(ticket))}`}>
                    {getStatusText(ticket)}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}> 
                  <button
                      className="btn btn-sm btn-info"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateClick(ticket);
                      }}
                      style={{ padding: '1px 1px' }}
                    >
                    <i className="fas fa-trash">
                      <span class="badge badge-info">Update</span>
                    </i> 
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={(e) => handleDelete(ticket._id, e)}
                      style={{ padding: '1px 1px' }}
                    >
                      <i className="fas fa-trash"><span class="badge badge-danger">Delete</span></i> 
                    </button>
                    
                  </div>
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
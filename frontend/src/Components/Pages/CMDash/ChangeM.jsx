import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../API/api';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import styled, { keyframes } from 'styled-components';

// Animations
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled Components
const Container = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-bottom: 2px solid #f0f0f0;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? '#1679AB' : 'white'};
  color: ${props => props.primary ? 'white' : '#1679AB'};
  border: 2px solid #1679AB;
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 15px rgba(22, 121, 171, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  ${props => props.small && `
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
  `}

  ${props => props.danger && `
    border-color: #dc3545;
    color: #dc3545;
    background: ${props.primary ? '#dc3545' : 'white'};

    &:hover {
      box-shadow: 0 3px 15px rgba(220, 53, 69, 0.2);
    }
  `}
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? '#1679AB' : 'white'};
  color: ${props => props.active ? 'white' : '#1679AB'};
  border: 2px solid #1679AB;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #1679AB;
    color: white;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.5s ease;
`;

const TableHeader = styled.thead`
  background: #f8f9fa;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  &:hover {
    background-color: #f1f5f9;
    cursor: pointer;
  }
`;

const TableCell = styled.td`
  // padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  font-size: 0.9rem;
  color: #495057;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #2c3e50;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #f1f5f9;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
  background: ${props => {
    switch(props.status) {
      case 'pending approval': return '#fef3c7';
      case 'in progress': return '#bfdbfe';
      case 'completed': return '#bbf7d0';
      case 'rejected': return '#fecaca';
      default: return '#e5e7eb';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'pending approval': return '#92400e';
      case 'in progress': return '#1e40af';
      case 'completed': return '#065f46';
      case 'rejected': return '#991b1b';
      default: return '#374151';
    }
  }};
`;

const DropdownMenu = styled.div`
  position: absolute;
  background: white;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 0.5rem;
  min-width: 200px;
  z-index: 100;
  animation: ${fadeIn} 0.2s ease;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  font-size: 1.5rem;
  
  &::after {
    content: "⚙️";
    animation: ${spin} 2s linear infinite;
  }
`;

const ErrorMessage = styled.div`
  padding: 2rem;
  color: #dc3545;
  background: #fff5f5;
  border-radius: 8px;
  text-align: center;
  margin: 2rem auto;
  max-width: 600px;
`;

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

  const truncateText = (text) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length <= 7 ? text : words.slice(0, 6).join(' ') + '...';
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
    setAssignedFilter(assignee === 'Assigned to Me' ? username : assignee);
    setFilter('all');
    setShowAssignedDropdown(false);
  };

  const handleCreateNew = () => navigate('/dashboard/form-a');
  
  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await api.get('/documents');
      setTickets(response.data.data || response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRowClick = (ticket) => navigate('/dashboard/oldview', { state: { ticket } });
  
  const handleUpdateClick = (ticket) => navigate("/Dashboard/form-a", { state: { ticket } });

  const handleDelete = (id, e) => {
    e.stopPropagation();
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to permanently delete this document?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await api.delete(`/documents/${id}`);
              setTickets(tickets.filter(ticket => ticket._id !== id));
            } catch (err) {
              console.error('Delete error:', err);
              alert('Delete failed');
            }
          }
        },
        { label: 'No' }
      ]
    });
  };

  const requestSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending'
    }));
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
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

  const getStatusText = (ticket) => {
    return ticket.implementationStatus || 
           (ticket.changeRequestStatus?.accepted ? 'Pending Approval' : 
            ticket.changeRequestStatus?.rejected ? 'Rejected' : 'In Progress');
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;

  return (
    <Container>
      <Header>
        <Title>CRM Dashboard</Title>
        <ButtonGroup>
          <ActionButton primary onClick={handleCreateNew}>
            <i className="fas fa-plus"></i>
            Create New CMR
          </ActionButton>
          <ActionButton onClick={handleRefresh}>
            <i className="fas fa-sync-alt"></i>
            Refresh
          </ActionButton>
        </ButtonGroup>
      </Header>

      <FilterBar>
        <FilterButton 
          active={filter === 'all' && !assignedFilter}
          onClick={() => handleFilter('all')}
        >
          All CMRs
        </FilterButton>
        <FilterButton
          active={filter === 'Pending Approval'}
          onClick={() => handleFilter('Pending Approval')}
        >
          Pending Approval
        </FilterButton>
        <FilterButton
          active={filter === 'In Progress'}
          onClick={() => handleFilter('In Progress')}
        >
          In Progress
        </FilterButton>
        <FilterButton
          active={filter === 'Completed'}
          onClick={() => handleFilter('Completed')}
        >
          Completed
        </FilterButton>
        <FilterButton
          active={filter === 'Rejected'}
          onClick={() => handleFilter('Rejected')}
        >
          Rejected
        </FilterButton>

        <div style={{ position: 'relative' }}>
          <FilterButton
            active={!!assignedFilter}
            onClick={() => setShowAssignedDropdown(!showAssignedDropdown)}
          >
            {assignedFilter || 'Filter by Assignee'}
            <i className={`fas fa-chevron-${showAssignedDropdown ? 'up' : 'down'} ml-2`}></i>
          </FilterButton>
          
          {showAssignedDropdown && (
            <DropdownMenu onMouseLeave={() => setShowAssignedDropdown(false)}>
              <DropdownItem onClick={() => handleAssignedFilter('Assigned to Me')}>
                Assigned to Me ({username})
              </DropdownItem>
              {assignees.map((assignee, index) => (
                <DropdownItem 
                  key={index}
                  onClick={() => handleAssignedFilter(assignee)}
                >
                  {assignee || 'Unassigned'}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </div>
      </FilterBar>

      <StyledTable>
        <TableHeader>
          <tr>
            <TableHeaderCell onClick={() => requestSort('changeRequestNo')}>
              CMR No {sortConfig.key === 'changeRequestNo' && (
                <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
              )}
            </TableHeaderCell>
            <TableHeaderCell onClick={() => requestSort('client')}>
              Client {sortConfig.key === 'client' && (
                <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
              )}
            </TableHeaderCell>
            <TableHeaderCell onClick={() => requestSort('technology')}>
              Technology {sortConfig.key === 'technology' && (
                <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
              )}
            </TableHeaderCell>
            <TableHeaderCell onClick={() => requestSort('changeDescription')}>
              Subject {sortConfig.key === 'changeDescription' && (
                <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
              )}
            </TableHeaderCell>
            <TableHeaderCell onClick={() => requestSort('date')}>
              Date {sortConfig.key === 'date' && (
                <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
              )}
            </TableHeaderCell>
            <TableHeaderCell onClick={() => requestSort('implementationAssigned')}>
              Assigned To {sortConfig.key === 'implementationAssigned' && (
                <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
              )}
            </TableHeaderCell>
            <TableHeaderCell onClick={() => requestSort('implementationStatus')}>
              Status {sortConfig.key === 'implementationStatus' && (
                <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
              )}
            </TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {finalTickets.map((ticket) => (
            <TableRow key={ticket._id} onClick={() => handleRowClick(ticket)}>
              <TableCell>{ticket.changeRequestNo}</TableCell>
              <TableCell>{ticket.client}</TableCell>
              <TableCell>{ticket.technology}</TableCell>
              <TableCell title={ticket.changeDescription}>{truncateText(ticket.changeDescription)}</TableCell>
              <TableCell>{formatDate(ticket.date)}</TableCell>
              <TableCell>{ticket.implementationAssigned || 'Unassigned'}</TableCell>
              <TableCell>
                <StatusBadge status={getStatusText(ticket).toLowerCase()}>
                  {getStatusText(ticket)}
                </StatusBadge>
              </TableCell>
              <TableCell>
                <ButtonGroup>
                  <ActionButton 
                    small
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateClick(ticket);
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </ActionButton>
                  <ActionButton 
                    small 
                    danger
                    onClick={(e) => handleDelete(ticket._id, e)}
                  >
                    <i className="fas fa-trash"></i>
                  </ActionButton>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
}

export default ChangeM;
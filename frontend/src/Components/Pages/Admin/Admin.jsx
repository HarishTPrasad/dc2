// AdminLayout.js
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../../API/api';
import {
  FaUsers,
  FaBriefcase,
  FaLaptopCode,
  FaBuilding,
  FaSearch
} from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const DashboardContainer = styled.div`
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f8f9fc;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 2rem;

  h1 {
    font-weight: 700;
    color: #4e73df;
  }

  p {
    color: #6c757d;
    margin-top: 0.5rem;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  input {
    border: none;
    border-radius: 30px 0 0 30px;
    padding: 0.5rem 1rem;
    background-color: #e9ecef;
    outline: none;
  }

  button {
    border: none;
    background-color: #36b9cc;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0 30px 30px 0;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background-color: #2c9faf;
    }
  }
`;

const CardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  border-left: 5px solid ${(props) => props.color || '#36b9cc'};
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  cursor: pointer;
  animation: ${fadeIn} 0.6s ease;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h5 {
    font-size: 0.85rem;
    text-transform: uppercase;
    color: ${(props) => props.color || '#36b9cc'};
    font-weight: 700;
  }

  .count {
    font-size: 1.75rem;
    font-weight: bold;
    color: #5a5c69;
  }

  svg {
    font-size: 2rem;
    color: ${(props) => props.color || '#36b9cc'};
    opacity: 0.5;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SummaryCard = ({ title, count, icon: Icon, color, active, onClick }) => {
  return (
    <Card color={color} onClick={onClick} style={active ? { borderBottom: `4px solid ${color}` } : {}}>
      <div>
        <h5>{title}</h5>
        <div className="count">{count}</div>
      </div>
      <Icon />
    </Card>
  );
};

const AdminLayout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [counts, setCounts] = useState({
    users: 0,
    clients: 0,
    projects: 0,
    technologies: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const activeForm = window.location.pathname.split('/').pop() || 'users';

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await api.get('/counts');
        setCounts(response.data.data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const summaryCards = [
    { title: 'Users', count: counts.users, icon: FaUsers, color: '#36b9cc', id: 'users' },
    { title: 'Clients', count: counts.clients, icon: FaBuilding, color: '#1cc88a', id: 'clients' },
    { title: 'Projects', count: counts.projects, icon: FaBriefcase, color: '#f6c23e', id: 'projects' },
    { title: 'Technologies', count: counts.technologies, icon: FaLaptopCode, color: '#4e73df', id: 'technologies' }
  ];

  const handleCardClick = (id) => {
    navigate(`/dashboard/${id}`);
  };

  if (loading) {
    return (
      <SpinnerContainer>
        <div className="spinner-border text-primary" role="status" />
      </SpinnerContainer>
    );
  }

  return (
    <DashboardContainer>
      <Header>
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage your users, clients, projects and technologies</p>
        </div>
        <SearchBar>
          <input
            type="text"
            placeholder="Search for..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch />
          </button>
        </SearchBar>
      </Header>

      <CardsRow>
        {summaryCards.map((card) => (
          <SummaryCard
            key={card.id}
            title={card.title}
            count={card.count}
            icon={card.icon}
            color={card.color}
            active={activeForm === card.id}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </CardsRow>

      <div className="row">
        <div className="col-lg-12">
          <Outlet />
        </div>
      </div>
    </DashboardContainer>
  );
};

export default AdminLayout;

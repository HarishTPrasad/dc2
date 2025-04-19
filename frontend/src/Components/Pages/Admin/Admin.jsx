// AdminLayout.js
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaUserCircle, 
  FaChartLine, 
  FaBriefcase, 
  FaLaptopCode, 
  FaBuilding,
  FaSearch
} from 'react-icons/fa';

const SummaryCard = ({ title, count, icon: Icon, color, active, onClick }) => {
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div 
        className={`card border-left-${color} shadow h-100 py-2 cursor-pointer ${active ? `border-bottom-${color}` : ''}`}
        onClick={onClick}
        style={{ transition: 'all 0.3s ease' }}
      >
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">{count}</div>
            </div>
            <div className="col-auto">
              <Icon className={`fa-2x text-${color} opacity-50`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Get the current active tab from the URL
  const activeForm = window.location.pathname.split('/').pop() || 'users';

  // Summary card data
  const summaryCards = [
    { title: 'Users', count: 0, icon: FaUsers, color: 'info', id: 'users' },
    { title: 'Clients', count: 24, icon: FaBuilding, color: 'success', id: 'clients' },
    { title: 'Projects', count: 18, icon: FaBriefcase, color: 'info', id: 'projects' },
    { title: 'Technologies', count: 12, icon: FaLaptopCode, color: 'warning', id: 'technologies' }
  ];

  const handleCardClick = (id) => {
    navigate(`/dashboard/${id}`);
  };

  return (
    <div className="container-fluid py-4" style={{ fontFamily: 'Verdana, Geneva, sans-serif', minHeight: '100vh' }}>
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-0 text-gray-800 font-weight-bold">Admin Dashboard</h1>
          <p className="text-muted mb-0">Manage your users, clients, projects and technologies</p>
        </div>
        <div className="d-none d-sm-inline-block">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-info" type="button">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Row - Cards */}
      <div className="row mb-4">
        {summaryCards.map(card => (
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
      </div>

      {/* Content Row - Outlet for nested routes */}
      <div className="row">
        <div className="col-lg-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
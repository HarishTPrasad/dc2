import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(63, 114, 175, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(63, 114, 175, 0); }
  100% { box-shadow: 0 0 0 0 rgba(63, 114, 175, 0); }
`;

// Styled components
const DashboardContainer = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
`;

const Header = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const TilesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
`;

const Tile = styled.div`
  background: ${props => props.active ? '#f8f9fa' : 'white'};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 5px solid ${props => props.color};
  animation: ${fadeIn} 0.5s ease-out;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.active ? props.color : 'transparent'};
    opacity: ${props => props.active ? 0.1 : 0};
    transition: opacity 0.3s ease;
  }

  h2 {
    color: ${props => props.color};
    margin-top: 0;
    font-weight: 500;
    position: relative;
  }

  p {
    position: relative;
    color: ${props => props.active ? '#2c3e50' : '#6c757d'};
    margin-bottom: 0;
  }
`;

const YearButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  animation: ${fadeIn} 0.5s ease-out;
`;

const YearButton = styled.button`
  background: ${props => props.active ? props.color : '#e9ecef'};
  color: ${props => props.active ? 'white' : '#495057'};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%, -50%);
    transform-origin: 50% 50%;
  }

  &:focus:not(:active)::after {
    animation: ${pulse} 1s ease-out;
  }
`;

const ContentContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 300px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const StatCard = styled.div`
  background: ${props => props.color};
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;

  h3 {
    margin-top: 0;
    font-weight: 500;
  }

  p {
    font-size: 2rem;
    margin: 0.5rem 0 0;
    font-weight: 600;
  }
`;

const GRC = () => {
  const [activeTile, setActiveTile] = useState('alert');
  const [selectedYear, setSelectedYear] = useState(2023);
  
  // Constants
  const TOTAL_CLIENTS = 21;
  
  // Sample data with client-based implementation tracking
  const alertData = {
    2019: { alerts: 9, implementationsCompleted: 58, implementationsPending: 56 },
    2020: { alerts: 7, implementationsCompleted: 92, implementationsPending: 75 },
    2021: { alerts: 5, implementationsCompleted: 85, implementationsPending: 30 },
    2022: { alerts: 8, implementationsCompleted: 75, implementationsPending: 48 },
    2023: { alerts: 6, implementationsCompleted: 60, implementationsPending: 33 },
    2024: { alerts: 3, implementationsCompleted: 12, implementationsPending: 21 },
    2025: { alerts: 2, implementationsCompleted: 22, implementationsPending: 47 }
  };
  
  const advisoryData = {
    2019: { advisories: 5, implementationsCompleted: 62, implementationsPending: 27 },
    2020: { advisories: 8, implementationsCompleted: 82, implementationsPending: 36 },
    2021: { advisories: 7, implementationsCompleted: 11, implementationsPending: 73 },
    2022: { advisories: 2, implementationsCompleted: 13, implementationsPending: 14 },
    2023: { advisories: 1, implementationsCompleted: 15, implementationsPending: 15 },
    2024: { advisories: 3, implementationsCompleted: 12, implementationsPending: 35 },
    2025: { advisories: 4, implementationsCompleted: 82, implementationsPending: 15 }
  };
  
  const currentData = activeTile === 'alert' ? alertData[selectedYear] : advisoryData[selectedYear];
  
  // Calculate metrics
  const totalItems = activeTile === 'alert' ? currentData.alerts : currentData.advisories;
  const totalImplementations = totalItems * TOTAL_CLIENTS;
  const completionRate = Math.round((currentData.implementationsCompleted / totalImplementations) * 100);
  const pendingImplementations = currentData.implementationsPending;

  return (
    <DashboardContainer>
      <Header>GRC Dashboard</Header>
      
      <TilesContainer>
        <Tile 
          color="#3f72af" 
          active={activeTile === 'alert'}
          onClick={() => setActiveTile('alert')}
        >
          <h2>Alerts</h2>
          <p>View and manage security alerts</p>
        </Tile>
        
        <Tile 
          color="#4e9f3d" 
          active={activeTile === 'advisory'}
          onClick={() => setActiveTile('advisory')}
        >
          <h2>Advisory</h2>
          <p>Review compliance advisories</p>
        </Tile>
      </TilesContainer>
      
      {(activeTile === 'alert' || activeTile === 'advisory') && (
        <>
          <YearButtonsContainer>
            {[2019, 2020, 2021, 2022, 2023, 2024, 2025].map(year => (
              <YearButton
                key={year}
                color={activeTile === 'alert' ? '#3f72af' : '#4e9f3d'}
                active={selectedYear === year}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </YearButton>
            ))}
          </YearButtonsContainer>
          
          <ContentContainer>
            <h2>{activeTile === 'alert' ? 'Alerts' : 'Advisories'} for {selectedYear}</h2>
            <p style={{ color: '#6c757d', marginTop: '-0.5rem' }}>
              Tracking implementations across {TOTAL_CLIENTS} clients
            </p>
            
            <StatsContainer>
              <StatCard color={activeTile === 'alert' ? '#3f72af' : '#4e9f3d'}>
                <h3>Total {activeTile === 'alert' ? 'Alerts' : 'Advisories'}</h3>
                <p>{totalItems}</p>
              </StatCard>
              
              <StatCard color="#2e856e">
                <h3>Completed Implementations</h3>
                <p>{currentData.implementationsCompleted.toLocaleString()}</p>
              </StatCard>
              
              <StatCard color="#d9534f">
                <h3>Pending Implementations</h3>
                <p>{pendingImplementations.toLocaleString()}</p>
              </StatCard>
              
              <StatCard color="#f0ad4e">
                <h3>Implementation Rate</h3>
                <p>{completionRate}%</p>
              </StatCard>
            </StatsContainer>
          </ContentContainer>
        </>
      )}
    </DashboardContainer>
  );
};

export default GRC;
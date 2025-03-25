import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import logo from '../Images/dclogo.png';

function Dashboard() {
  const username = sessionStorage.getItem("username") || "User";
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear(); 
    navigate("/"); 
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <div style={styles.userInfo}>
          <span>Welcome Back, {username}</span>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Dashboard</h2>
          
          <div style={styles.sidebarContent}>
            <button 
              style={styles.centerBox} 
              onClick={() => navigate("/dashboard/form-a")}
            >
              <p>Change Request Form</p>
            </button>
            <button 
              style={styles.centerBox} 
              onClick={() => navigate("/dashboard/ticket")}
            >   Ticket Tool
              <p></p>
            </button>
          </div>

          <div style={styles.bottomSection}>
            <button 
              style={styles.menuButton} 
              onClick={handleLogout} 
            >
              Logout
            </button>
          
            <div style={styles.aboutSection}>
              <p style={styles.copyright}>
                © {new Date().getFullYear()} DC Networks. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        <div style={styles.contentArea}>
        <div style={styles.scrollContainer}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden", // Prevent double scrollbars
  },
  navbar: {
    backgroundColor: "#074173",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    height: "60px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  logo: {
    paddingLeft: "10px",
    width: "180px",
    height: "40px",
  },
  userInfo: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  mainContent: {
    display: "flex",
    flex: 1,
    marginTop: "60px",
    overflow: "hidden", // Hide overflow from parent
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#f5f5f5",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    height: "calc(100vh - 60px)",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    justifyContent: "space-between",
  },
  sidebarContent: {
    flex: 1,
  },
  sidebarTitle: {
    fontSize: "30px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
    borderBottom: "3px solid #C5FF95",
    paddingBottom: "10px",
  },
  bottomSection: {
    marginTop: "auto",
  },
  menuButton: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    fontWeight: "bold",
    transition: "background-color 0.2s",
    marginBottom: "20px",
  },
  aboutSection: {
    fontSize: "14px",
    textAlign: "center",
    paddingTop: "20px",
    borderTop: "1px solid #ddd",
    color: "#666",
  },
  copyright: {
    marginTop: "10px",
    fontSize: "11px",
    color: "#aaa",
  },
  contentArea: {
    flex: 1,
    display: "flex",
    backgroundColor: "#fff",
    overflow: "auto", // Enable scrolling for content area
  },
  scrollContainer: {
    width: "100%",
    padding: "20px",
    minHeight: "min-content", // Ensure container fits content
  },
  centerBox: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#1679AB",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    fontWeight: "bold",
    transition: "background-color 0.2s",
    marginBottom: "20px",
  },
};

export default Dashboard;
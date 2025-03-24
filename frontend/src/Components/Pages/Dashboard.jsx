import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  // Get username from sessionStorage instead of localStorage
  const username = sessionStorage.getItem("username") || "User";
  const navigate = useNavigate();

  // Proper logout function that clears session
  const handleLogout = () => {
    sessionStorage.clear(); // Clear all session data
    navigate("/"); // Navigate to login page
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <img src="logo192.png" alt="Logo" style={styles.logo} />
        <div style={styles.userInfo}>
          <span>Welcome, {username}</span>
        </div>
      </div>

      {/* Sidebar + Content Container */}
      <div style={styles.mainContent}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Dashboard</h2>
          
          {/* Empty space that pushes content down */}
          <div style={styles.sidebarContent}>
            {/* You can add other menu items here if needed */}
          </div>

          {/* Bottom Section with Logout */}
          <div style={styles.bottomSection}>
            <button 
              style={styles.menuButton} 
              onClick={handleLogout} // Updated to use proper logout function
            >
              Logout
            </button>
            {/* About Section */}
            <div style={styles.aboutSection}>
              <p style={styles.copyright}>
                © {new Date().getFullYear()} DC Networks. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.contentArea}>
          {/* Change Request Form Button */}
          <button 
            style={styles.centerBox} 
            onClick={() => navigate("/form-a")}
          >
            <h3>Change Request Form</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

// Updated Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  navbar: {
    backgroundColor: "#d4f4d4",
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
    width: "40px",
    height: "40px",
  },
  userInfo: {
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  mainContent: {
    display: "flex",
    flex: 1,
    marginTop: "60px",
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
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
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
    "&:hover": {
      backgroundColor: "#e60000",
    }
  },
  aboutSection: {
    fontSize: "14px",
    textAlign: "center",
    paddingTop: "20px",
    borderTop: "1px solid #ddd",
    color: "#666",
  },
  aboutText: {
    marginTop: "5px",
    fontSize: "12px",
    color: "#999",
  },
  copyright: {
    marginTop: "10px",
    fontSize: "11px",
    color: "#aaa",
  },
  contentArea: {
    flex: 1,
    display: "flex",
    justifyContent: "center", // Center horizontally
    alignItems: "flex-start", // Align items at the top
    marginTop: "40px", // Space from the top
    padding: "20px",
    backgroundColor: "#fff",
},
  centerBox: {
    padding: "25px",
    borderRadius: "12px",
    border: "none",
    boxShadow: "0 0 20px rgba(96, 238, 101, 0.5)",
    textAlign: "center",
    width: "320px",
    backgroundColor: "#32d337",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 0 30px rgba(96, 238, 101, 0.7)",
    }
  },
};

export default Dashboard;
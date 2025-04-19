import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import logo from '../Images/dclogo.png';
import { FaUserCircle, FaBell, FaSignOutAlt, FaTicketAlt, FaCogs, FaHome, FaChevronRight, FaUser, FaCog } from "react-icons/fa";
import { isAdmin, getFullName } from '../Utils/Auth';

function Dashboard() {
  const username = sessionStorage.getItem("username") || "User";
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Refs for dropdowns
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Function to get menu button styles based on active state
  const getMenuButtonStyles = (path) => {
    const active = isActive(path);
    return {
      ...styles.menuButton,
      backgroundColor: active ? colors.menuHover : colors.menuActive,
      borderLeft: `3px solid ${active ? colors.primary : colors.accent}`,
      fontWeight: active ? '600' : '500'
    };
  };

  // Sample notifications data
  const notifications = [
    { id: 1, text: "New ticket submitted", time: "2 mins ago", read: false },
    { id: 2, text: "System update available", time: "1 hour ago", read: true },
    { id: 3, text: "Password change required", time: "3 days ago", read: true },
  ];

  return (
    <div style={styles.container}>
      {/* Top Navigation Bar */}
      <div style={styles.navbar}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="Company Logo" style={styles.logo} />
        </div>
        
        <div style={styles.navRight}>
          <div style={styles.welcomeText}>Welcome back, {getFullName()}</div>
          
          {/* Notification Bell with Dropdown */}
          {/* <div style={styles.notificationWrapper} ref={notificationRef}>
            <div 
              style={styles.notificationIcon} 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
            >
              <FaBell size={20} />
              {notifications.some(n => !n.read) && (
                <span style={styles.notificationBadge}></span>
              )}
            </div>
            
            {showNotifications && (
              <div style={styles.notificationDropdown}>
                <div style={styles.dropdownHeader}>
                  <h4>Notifications</h4>
                  <button style={styles.markAllRead}>Mark all as read</button>
                </div>
                <div style={styles.notificationList}>
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      style={{
                        ...styles.notificationItem,
                        backgroundColor: notification.read ? 'transparent' : '#f8f9fa'
                      }}
                    >
                      <div style={styles.notificationDot}></div>
                      <div>
                        <p style={styles.notificationText}>{notification.text}</p>
                        <small style={styles.notificationTime}>{notification.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={styles.viewAll}>View all notifications</div>
              </div>
            )}
          </div> */}
          
          {/* User Profile with Dropdown */}
          <div style={styles.profileWrapper} ref={profileRef}>
            <div 
              style={styles.userProfile} 
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
            >
              <FaUserCircle size={28} />
            </div>
            
            {showProfileMenu && (
              <div style={styles.profileDropdown}>
                <div style={styles.profileHeader}>
                  <FaUserCircle size={40} />
                  {/* <div>
                    <h4>{username}</h4>
                    <small>{
                              ['harish', 'kksuthar', 'lakshman'].includes(username.toLowerCase())
                                ? 'Administrator'
                                : 'User'
                            }</small>
                  </div> */}

                      <div>
                        <h4>{getFullName()}</h4>
                        <small>{isAdmin() ? 'Administrator' : 'User'}</small>
                      </div>
                </div>
                <div style={styles.dropdownMenu}>
                  <button style={styles.dropdownItem}>
                    <FaUser style={styles.dropdownIcon} />
                    <span>View Profile</span>
                  </button>
                  <button style={styles.dropdownItem}>
                    <FaCog style={styles.dropdownIcon} />
                    <span>Settings</span>
                  </button>
                  <button 
                    style={styles.dropdownItem}
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt style={styles.dropdownIcon} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={styles.mainContent}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>
            <span style={styles.dashboardIcon}><FaHome size={24} /></span>
            Dashboard
          </h2>


          <div style={styles.menuSection}>
                {isAdmin() && (                
                  <button 
                    style={getMenuButtonStyles("/dashboard/admin")}
                    onClick={() => navigate("/dashboard/admin")}
                    onMouseEnter={(e) => {
                      if (!isActive("/dashboard/admin")) {
                        e.currentTarget.style.backgroundColor = colors.menuHover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive("/dashboard/admin")) {
                        e.currentTarget.style.backgroundColor = colors.menuActive;
                      }
                    }}
                  >   
                    <div style={styles.buttonContent}>
                      <FaCogs style={{
                        ...styles.buttonIcon,
                        color: isActive("/dashboard/admin") ? colors.primary : colors.textLight
                      }} />
                      <span>Admin Dashboard</span>
                    </div>
                    <FaChevronRight style={{
                      ...styles.arrowIcon,
                      color: isActive("/dashboard/admin") ? colors.primary : colors.textLight
                    }} />
                  </button>
                )}
              </div>

          {/* <div style={styles.menuSection}>
           
            {(username === "Harish" || username === "kksuthar" || username === "Lakshman") && (
                
                <button 
                  style={getMenuButtonStyles("/dashboard/admin")}
                  onClick={() => navigate("/dashboard/admin")}
                  onMouseEnter={(e) => {
                    if (!isActive("/dashboard/admin")) {
                      e.currentTarget.style.backgroundColor = colors.menuHover;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/dashboard/admin")) {
                      e.currentTarget.style.backgroundColor = colors.menuActive;
                    }
                  }}
                >   
                  <div style={styles.buttonContent}>
                    <FaCogs style={{
                      ...styles.buttonIcon,
                      color: isActive("/dashboard/admin") ? colors.primary : colors.textLight
                    }} />
                    <span>Admin Dashboard</span>
                  </div>
                  <FaChevronRight style={{
                    ...styles.arrowIcon,
                    color: isActive("/dashboard/admin") ? colors.primary : colors.textLight
                  }} />
                </button>
              )}
          </div> */}

          <div style={styles.menuSection}>
            <h3 style={styles.menuSectionTitle}>Management</h3>
            <button 
              style={getMenuButtonStyles("/dashboard/changem")}
              onClick={() => navigate("/dashboard/changem")}
              onMouseEnter={(e) => {
                if (!isActive("/dashboard/changem")) {
                  e.currentTarget.style.backgroundColor = colors.menuHover;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive("/dashboard/changem")) {
                  e.currentTarget.style.backgroundColor = colors.menuActive;
                }
              }}
            >
              <div style={styles.buttonContent}>
                <FaCogs style={{
                  ...styles.buttonIcon,
                  color: isActive("/dashboard/changem") ? colors.primary : colors.textLight
                }} />
                <span>Change Management</span>
              </div>
              <FaChevronRight style={{
                ...styles.arrowIcon,
                color: isActive("/dashboard/changem") ? colors.primary : colors.textLight
              }} />
            </button>
          </div>

          {/* Bottom Section with Logout Button */}
          <div style={styles.bottomSection}>
            <button 
              style={styles.sidebarLogoutButton} 
              onClick={handleLogout}
            >
              <div style={styles.buttonContent}>
                <FaSignOutAlt style={styles.buttonIcon} />
                <span>Logout</span>
              </div>
            </button>
          
            <div style={styles.aboutSection}>
              <p style={styles.copyright}>
                © {new Date().getFullYear()} DC Networks. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={styles.contentArea}>
          <div style={styles.scrollContainer}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

const colors = {
  primary: "#1a365d",       // Deep blue
  secondary: "#2a4365",     // Slightly lighter blue
  accent: "#3182ce",        // Bright blue for accents
  background: "#f7fafc",    // Very light gray background
  sidebar: "#ffffff",       // White sidebar
  text: "#2d3748",         // Dark text
  textLight: "#718096",    // Light text
  danger: "#e53e3e",       // Red for logout
  success: "#38a169",      // Green
  warning: "#dd6b20",      // Orange
  menuActive: "#ebf8ff",   // Light blue for active menu
  menuHover: "#bee3f8",    // Medium blue for hover
  notification: "#e53e3e", // Red for notifications
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: colors.background,
    fontFamily: 'Verdana, Geneva, sans-serif'
  },
  navbar: {
    backgroundColor: colors.primary,
    padding: "0 30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    height: "70px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "40px",
    width: "auto",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  welcomeText: {
    color: "white",
    fontSize: "15px",
    fontWeight: "500",
  },
  notificationWrapper: {
    position: "relative",
  },
  notificationIcon: {
    color: "white",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "50%",
    transition: "all 0.2s ease",
    position: "relative",
    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  notificationBadge: {
    position: "absolute",
    top: "5px",
    right: "5px",
    width: "8px",
    height: "8px",
    backgroundColor: colors.notification,
    borderRadius: "50%",
  },
  notificationDropdown: {
    position: "absolute",
    right: 0,
    top: "50px",
    width: "350px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    zIndex: 1001,
    overflow: "hidden",
  },
  dropdownHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    borderBottom: "1px solid #e2e8f0",
    h4: {
      margin: 0,
      fontSize: "16px",
    },
  },
  markAllRead: {
    background: "none",
    border: "none",
    color: colors.accent,
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    ":hover": {
      textDecoration: "underline",
    },
  },
  notificationList: {
    maxHeight: "400px",
    overflowY: "auto",
  },
  notificationItem: {
    display: "flex",
    padding: "15px 20px",
    gap: "15px",
    alignItems: "center",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#f8f9fa",
    },
  },
  notificationDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: colors.accent,
    flexShrink: 0,
  },
  notificationText: {
    margin: 0,
    fontSize: "14px",
  },
  notificationTime: {
    color: colors.textLight,
    fontSize: "12px",
  },
  viewAll: {
    padding: "15px 20px",
    textAlign: "center",
    color: colors.accent,
    fontWeight: "500",
    cursor: "pointer",
    borderTop: "1px solid #e2e8f0",
    ":hover": {
      backgroundColor: "#f8f9fa",
    },
  },
  profileWrapper: {
    position: "relative",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    cursor: "pointer",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  profileDropdown: {
    position: "absolute",
    right: 0,
    top: "50px",
    width: "250px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    zIndex: 1001,
    overflow: "hidden",
  },
  profileHeader: {
    display: "flex",
    gap: "15px",
    padding: "20px",
    alignItems: "center",
    borderBottom: "1px solid #e2e8f0",
    h4: {
      margin: 0,
      fontSize: "16px",
    },
    small: {
      color: colors.textLight,
      fontSize: "13px",
    },
  },
  dropdownMenu: {
    padding: "5px 0",
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "12px 20px",
    background: "none",
    border: "none",
    color: colors.text,
    cursor: "pointer",
    gap: "12px",
    fontSize: "14px",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "#f7fafc",
      color: colors.accent,
    },
  },
  dropdownIcon: {
    fontSize: "14px",
    color: colors.textLight,
  },
  mainContent: {
    display: "flex",
    flex: 1,
    marginTop: "70px",
    overflow: "hidden", 
  },
  sidebar: {
    width: "280px",
    backgroundColor: colors.sidebar,
    color: colors.text,
    display: "flex",
    flexDirection: "column",
    padding: "25px 0",
    height: "calc(100vh - 70px)",
    boxShadow: "2px 0 15px rgba(0, 0, 0, 0.05)",
    justifyContent: "space-between",
    borderRight: "1px solid #e2e8f0",
  },
  sidebarTitle: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 20px 25px",
    color: colors.primary,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingBottom: "15px",
    borderBottom: `2px solid ${colors.accent}`,
  },
  dashboardIcon: {
    color: colors.accent,
  },
  menuSection: {
    marginBottom: "25px",
  },
  menuSectionTitle: {
    fontSize: "12px",
    fontWeight: "600",
    color: colors.textLight,
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: "0 20px 10px",
    paddingLeft: "5px",
  },
  menuButton: {
    width: "calc(100% - 10px)",
    marginLeft: "5px",
    padding: "12px 15px",
    fontSize: "15px",
    backgroundColor: colors.menuActive,
    color: colors.text,
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    marginBottom: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderLeft: `3px solid ${colors.accent}`,
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  buttonIcon: {
    color: colors.textLight,
    transition: "all 0.3s ease",
  },
  arrowIcon: {
    color: colors.textLight,
    fontSize: "12px",
    transition: "all 0.3s ease",
  },
  bottomSection: {
    marginTop: "auto",
    paddingTop: "20px",
    borderTop: "1px solid #e2e8f0",
  },
  aboutSection: {
    fontSize: "12px",
    textAlign: "center",
    padding: "0 20px",
    color: colors.textLight,
  },
  copyright: {
    marginTop: "10px",
    fontSize: "11px",
    color: "#cbd5e0",
  },
  contentArea: {
    flex: 1,
    display: "flex",
    backgroundColor: colors.background,
    overflow: "auto", 
    // padding: "30px",
  },
  scrollContainer: {
    width: "100%",
    // padding: "25px",
    minHeight: "min-content",
    backgroundColor: "white",
    // borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  },
  sidebarLogoutButton: {
    width: "calc(100% - 10px)",
    marginLeft: "5px",
    padding: "12px 15px",
    fontSize: "15px",
    backgroundColor: "transparent",
    color: colors.danger,
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    ":hover": {
      backgroundColor: "#fff5f5",
    },
  },
};

export default Dashboard;
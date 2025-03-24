import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const credentialsMap = {
  admin: "Clock@2020",
  Lakshman: "Clock@2020",
  Arvind: "Clock@2020",
  Bharat: "Clock@2020",
  Kailash: "Clock@2020",
  Hitendra: "Clock@2020",
  Devendra: "Clock@2020",
  Harish: "Clock@2020",
  Rahul: "Clock@2020",
  Chirag: "Clock@2020",

};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentialsMap[username] && credentialsMap[username] === password) {
      // Use sessionStorage instead of localStorage
      sessionStorage.setItem("authToken", "true");
      sessionStorage.setItem("username", username);
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
      // Clear any existing session data
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("username");
    }
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <img src="logo192.png" alt="Logo" style={styles.logo} />
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Center Space with Logo and Welcome Message */}
        <div style={styles.centerSpace}>
          <div style={styles.logoContainer}>
            <img src="logo192.png" alt="Logo" style={styles.centerLogo} />
          </div>
          <h1 style={styles.welcomeTitle}>Welcome to DC Networks</h1>
          <p style={styles.welcomeSubtitle}>Please login to continue...</p>
        </div>

        {/* Login Form Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarContent}>
            <h3 style={styles.loginTitle}>Login</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label htmlFor="username" style={styles.label}>Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="password" style={styles.label}>Password:</label>
                <div style={styles.passwordContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
              {error && <p style={styles.error}>{error}</p>}
              <button type="submit" style={styles.button}>
                Submit
              </button>
            </form>
          </div>
          
          {/* About Section */}
          <div style={styles.aboutSection}>
            <p>DC Networks - Secure Access Portal</p>
            <p style={styles.aboutText}>Version 1.0.0</p>
            <p style={styles.copyright}>
              © {new Date().getFullYear()} DC Networks. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  navbar: {
    backgroundColor: "#d4f4d4",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  logo: {
    width: "40px",
    height: "40px",
  },
  mainContent: {
    display: "flex",
    flex: 1,
  },
  centerSpace: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    textAlign: "center",
  },
  logoContainer: {
    marginBottom: "30px",
  },
  centerLogo: {
    width: "120px",
    height: "120px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  welcomeTitle: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "10px",
  },
  welcomeSubtitle: {
    fontSize: "1.2rem",
    color: "#666",
  },
  sidebar: {
    width: "400px",
    backgroundColor: "#fff",
    padding: "30px",
    boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  sidebarContent: {
    flex: 1,
  },
  loginTitle: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "30px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "16px",
    transition: "border 0.3s",
  },
  passwordContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  eyeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    position: "absolute",
    right: "10px",
    fontSize: "20px",
  },
  button: {
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background-color 0.3s",
  },
  error: {
    color: "#dc3545",
    fontSize: "14px",
    marginBottom: "15px",
    textAlign: "center",
  },
  aboutSection: {
    paddingTop: "20px",
    borderTop: "1px solid #eee",
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
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
};

export default Login;
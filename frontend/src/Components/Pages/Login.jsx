import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/api";
import logo from "../Images/dclogo.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUserList(response.data.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedUser = userList.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      sessionStorage.setItem("authToken", "true");
      sessionStorage.setItem("username", username);
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("username");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginContainer}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="Logo" style={styles.logo} />
        </div>
        <h2 style={styles.loginTitle}>Welcome Back</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="username"
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
                name="password"
                autoComplete="current-password"
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
          <button type="submit" style={styles.button}>Log In</button>
        </form>
      </div>
      <div style={styles.copyrightSection}>
        <p style={styles.version}>Version 2.1.1</p>
        <p style={styles.copyright}>
          © {new Date().getFullYear()} DC Networks. All rights reserved.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #f0f2f0 0%, #e0e0e0 100%)", // A softer gradient
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  loginContainer: {
    width: "400px", // Reduced width
    padding: "30px", // Slightly reduced padding
    borderRadius: "12px", // More rounded corners
    backgroundColor: "white",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)", // More pronounced shadow
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: "25px", // Slightly reduced margin
  },
  logo: {
    width: "180px", // Slightly smaller logo
    height: "36px",
  },
  loginTitle: {
    fontSize: "1.3rem", // Slightly smaller title
    color: "#333",
    marginBottom: "20px", // Reduced margin
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  inputGroup: {
    marginBottom: "18px", // Reduced margin
  },
  label: {
    display: "block",
    marginBottom: "6px", // Reduced margin
    fontWeight: "500",
    color: "#555",
    fontSize: "0.8rem", // Slightly smaller label
  },
  input: {
    width: "100%",
    padding: "8px", // Reduced padding
    borderRadius: "8px", // More rounded corners
    border: "1px solid #ccc", // Lighter border
    fontSize: "15px",
    transition: "border 0.3s",
    "&:focus": {
      borderColor: "#3A59D1",
      outline: "none",
      boxShadow: "0 0 6px rgba(58, 89, 209, 0.3)",
    },
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
    right: "8px", // Slightly adjusted position
    fontSize: "18px", // Slightly smaller icon
    color: "#777",
    outline: "none",
  },
  button: {
    marginTop: "12px", // Reduced margin
    padding: "8px 15px", // Adjusted padding
    backgroundColor: "#3A59D1",
    color: "white",
    border: "none",
    borderRadius: "8px", // More rounded corners
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#2c47b8",
    },
  },
  error: {
    color: "#dc3545",
    fontSize: "14px",
    marginBottom: "8px", // Reduced margin
    textAlign: "center",
  },
  copyrightSection: {
    position: "absolute",
    bottom: "15px", // Reduced bottom margin
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#777", // Darker copyright text
    fontSize: "0.85rem", // Slightly smaller font
  },
  version: {
    marginBottom: "3px", // Reduced margin
    color: "#999",
    fontSize: "0.8rem",
  },
  copyright: {
    color: "#999",
    fontSize: "0.75rem",
  },
};

export default Login;
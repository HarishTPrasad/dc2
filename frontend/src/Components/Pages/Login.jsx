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
  const [newUser, setNewUser] = useState({ username: "", password: "" });
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

  const handleCreateUser = async () => {
    if (!newUser.username || !newUser.password) return;

    try {
      await api.post("/users", newUser);
      alert("User created successfully");
      setNewUser({ username: "", password: "" });

      const response = await api.get("/users");
      setUserList(response.data);
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Failed to create user");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>

      <div style={styles.mainContent}>
        <div style={styles.centerSpace}>
          <div style={styles.logoContainer}>
            <img src={logo} alt="Logo" style={styles.centerLogo} />
          </div>
          <h1 style={styles.welcomeTitle}>Support Center</h1>
        </div>

        <div style={styles.sidebar}>
          <div style={styles.sidebarContent}>
            <h3 style={styles.loginTitle}>Login</h3>
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
              <button type="submit" style={styles.button}>Submit</button>
            </form>
          </div>

          {/* Temporary Create User UI */}
          <div style={{ marginTop: "30px" }}>
            <h4 style={styles.loginTitle}>Create User (Temporary)</h4>
            <div style={styles.inputGroup}>
              <input
                type="text"
                id="new-username"
                name="new-username"
                autoComplete="username"
                placeholder="Username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <input
                type="password"
                id="new-password"
                name="new-password"
                autoComplete="new-password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                style={styles.input}
              />
            </div>
            <button onClick={handleCreateUser} style={styles.button}>
              Create User
            </button>
          </div>

          <div style={styles.aboutSection}>
            <p>DC Networks - Secure Access Portal</p>
            <p style={styles.aboutText}>Version 2.0.0</p>
            <p style={styles.copyright}>
              © {new Date().getFullYear()} DC Networks. All rights reserved.
            </p>
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
    backgroundColor: "#f9f9f9",
  },
  navbar: {
    backgroundColor: "#074173",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  logo: {
    paddingLeft: "10px",
    width: "200px",
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
    backgroundColor: "#FBFFF9",
  },
  logoContainer: {
    marginBottom: "30px",
  },
  centerLogo: {
    width: "530px",
    height: "120px",
  },
  welcomeTitle: {
    fontSize: "2.5rem",
    color: "#1679AB",
    marginBottom: "10px",
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
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
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
    marginTop: "10px",
    padding: "12px",
    backgroundColor: "#1679AB",
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
    marginBottom: "10px",
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

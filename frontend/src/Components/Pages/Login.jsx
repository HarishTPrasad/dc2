import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/api";
import logo from "../Images/dclogo.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        if (Array.isArray(response.data)) {
          setUserList(response.data);
        } else {
          console.error("Invalid response format: expected array");
        }
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
      if (Array.isArray(response.data)) {
        setUserList(response.data);
      }
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Failed to create user");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h2 style={styles.title}>Change Request System</h2>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>Login</h3>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label>Show Password</label>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      <div style={styles.createUser}>
        <h3>Create New User</h3>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) =>
            setNewUser({ ...newUser, username: e.target.value })
          }
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) =>
            setNewUser({ ...newUser, password: e.target.value })
          }
          style={styles.input}
        />
        <button onClick={handleCreateUser} style={styles.button}>
          Create User
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "400px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem",
  },
  logo: {
    width: "50px",
    marginRight: "10px",
  },
  title: {
    fontSize: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "2rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  button: {
    padding: "0.6rem",
    fontSize: "1rem",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
  createUser: {
    marginTop: "2rem",
    borderTop: "1px solid #eee",
    paddingTop: "1rem",
  },
};

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include" // Important for cookies/sessions
      });

      if (response.ok) {
        const data = await response.json();
        // Store user info if needed
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.message || "Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      width: "80%",
      maxWidth: 400,
      margin: "50px auto",
      padding: 40,
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    },
    h1: {
      textAlign: "center",
      color: "#333",
      marginBottom: 30
    },
    label: {
      fontWeight: "bold",
      display: "block",
      marginTop: 10
    },
    input: {
      width: "100%",
      margin: "10px 0",
      padding: 10,
      fontSize: 14,
      border: "1px solid #ccc",
      borderRadius: 5,
      boxSizing: "border-box"
    },
    button: {
      width: "100%",
      margin: "10px 0",
      padding: 10,
      fontSize: 16,
      background: "#28a745",
      color: "white",
      border: "none",
      borderRadius: 5,
      cursor: "pointer"
    },
    errorMessage: {
      color: "red",
      textAlign: "center",
      marginTop: 10,
      display: error ? "block" : "none"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Login to Mini Electronic Health Record System</h1>
      <form onSubmit={handleSubmit}>
        <label style={styles.label} htmlFor="username">User Name:</label>
        <input
          style={styles.input}
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />

        <label style={styles.label} htmlFor="password">Please Enter Your Password:</label>
        <input
          style={styles.input}
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <button
          type="submit"
          style={styles.button}
          disabled={loading}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#218838")}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "#28a745")}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p style={styles.errorMessage}>{error}</p>
      </form>
    </div>
  );
}


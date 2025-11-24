import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Patients from "./pages/Patients";
import Treatment from "./pages/Treatment";
import Diagnosis from "./pages/Diagnosis";
import MedicalHistory from "./pages/MedicalHistory";
import LabReport from "./pages/LabReport";
import Appointment from "./pages/Appointment";
import Radiology from "./pages/Radiology";
import Pathology from "./pages/Pathology";
import Login from "./pages/Login";

// Protected Route Component
function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check', {
        credentials: 'include'
      });
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Navigation component
function Navigation() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      localStorage.removeItem('user');
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navStyle = {
    backgroundColor: "#2c3e50",
    padding: "15px 30px",
    display: "flex",
    gap: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  };

  const linkStyle = {
    color: "#ecf0f1",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    padding: "8px 16px",
    borderRadius: "4px",
    transition: "background-color 0.3s"
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: "#34495e"
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={navStyle}>
      <Link 
        to="/" 
        style={isActive("/") ? activeLinkStyle : linkStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = "#34495e"}
        onMouseOut={(e) => e.target.style.backgroundColor = ""}
      >
        Patients
      </Link>
      <Link 
        to="/treatment" 
        style={isActive("/treatment") ? activeLinkStyle : linkStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = "#34495e"}
        onMouseOut={(e) => e.target.style.backgroundColor = ""}
      >
        Treatment
      </Link>
      <Link 
        to="/diagnosis" 
        style={isActive("/diagnosis") ? activeLinkStyle : linkStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = "#34495e"}
        onMouseOut={(e) => e.target.style.backgroundColor = ""}
      >
        Diagnosis
      </Link>
      <Link 
        to="/medical-history" 
        style={isActive("/medical-history") ? activeLinkStyle : linkStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = "#34495e"}
        onMouseOut={(e) => e.target.style.backgroundColor = ""}
      >
        Medical History
      </Link>
      <Link 
        to="/lab-report" 
        style={isActive("/lab-report") ? activeLinkStyle : linkStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = "#34495e"}
        onMouseOut={(e) => e.target.style.backgroundColor = ""}
      >
        Lab Report
      </Link>
      <Link 
        to="/appointment" 
        style={isActive("/appointment") ? activeLinkStyle : linkStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = "#34495e"}
        onMouseOut={(e) => e.target.style.backgroundColor = ""}
      >
        Appointment
      </Link>
      <Link 
        to="/radiology" 
        style={isActive("/radiology") ? activeLinkStyle : linkStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = "#34495e"}
        onMouseOut={(e) => e.target.style.backgroundColor = ""}
      >
        Radiology
      </Link>
      <Link 
        to="/pathology" 
        style={isActive("/pathology") ? activeLinkStyle : linkStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = "#34495e"}
        onMouseOut={(e) => e.target.style.backgroundColor = ""}
      >
        Pathology
      </Link>
      {user && (
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#ecf0f1", fontSize: "14px" }}>{user.username}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              color: "#fff",
              background: "#e74c3c",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <Patients />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/treatment"
            element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <Treatment />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/diagnosis"
            element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <Diagnosis />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/medical-history"
            element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <MedicalHistory />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/lab-report"
            element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <LabReport />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointment"
            element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <Appointment />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/radiology"
            element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <Radiology />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pathology"
            element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <Pathology />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

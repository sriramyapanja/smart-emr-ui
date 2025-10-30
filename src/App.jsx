import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Patients from "./pages/Patients";
import Treatment from "./pages/Treatment";
import Diagnosis from "./pages/Diagnosis";
import MedicalHistory from "./pages/MedicalHistory";
import LabReport from "./pages/LabReport";
import Appointment from "./pages/Appointment";

// Navigation component
function Navigation() {
  const location = useLocation();

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
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Patients />} />
          <Route path="/treatment" element={<Treatment />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
          <Route path="/medical-history" element={<MedicalHistory />} />
          <Route path="/lab-report" element={<LabReport />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

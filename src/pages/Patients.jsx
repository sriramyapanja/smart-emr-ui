import { useState } from "react";

export default function Patients() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
  });

  // Patient search and records state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientRecords, setPatientRecords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState({ startDate: "", endDate: "" });
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" or "timeline"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Patient registered successfully! Patient ID: ${data.patientId}`);
        setFormData({
          first_name: "",
          last_name: "",
          dob: "",
          gender: "",
          email: "",
          phone: "",
        });
      } else {
        alert(`Error: ${data.error || 'Failed to register patient'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please check if the backend server is running.');
    }
  };

  // Search patients
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a search term');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/patients/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setSearchResults(data);
      if (data.length === 0) {
        alert('No patients found');
      }
    } catch (error) {
      console.error('Error searching:', error);
      alert('Failed to search patients');
    } finally {
      setLoading(false);
    }
  };

  // Load patient records
  const loadPatientRecords = async (patient) => {
    setSelectedPatient(patient);
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (dateFilter.startDate) params.append('startDate', dateFilter.startDate);
      if (dateFilter.endDate) params.append('endDate', dateFilter.endDate);

      const response = await fetch(`/api/patients/${patient.id}/records?${params}`);
      const data = await response.json();
      setPatientRecords(data);
    } catch (error) {
      console.error('Error loading records:', error);
      alert('Failed to load patient records');
    } finally {
      setLoading(false);
    }
  };

  // View record details
  const viewRecord = (record, type) => {
    setSelectedRecord({ ...record, type });
  };

  // Print record
  const printRecord = () => {
    window.print();
  };

  // Export to PDF (simplified - opens print dialog)
  const exportToPDF = () => {
    window.print();
  };

  // Get record icon
  const getRecordIcon = (type) => {
    const icons = {
      diagnosis: "📋",
      treatment: "📝",
      medicalHistory: "🏥",
      labReports: "🧪",
      radiology: "📷",
      appointments: "📅"
    };
    return icons[type] || "📄";
  };

  // Get record type label
  const getRecordLabel = (type) => {
    const labels = {
      diagnosis: "Diagnosis",
      treatment: "Treatment",
      medicalHistory: "Medical History",
      labReports: "Lab Reports",
      radiology: "Radiology",
      appointments: "Appointments"
    };
    return labels[type] || type;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const styles = {
    container: {
      width: "70%", maxWidth: 900, margin: "50px auto", padding: 40,
      background: "#fff", borderRadius: 8, boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    },
    section: {
      marginBottom: 50
    },
    h1: { textAlign: "center", color: "#333" },
    h2: { color: "#333", marginBottom: 20, marginTop: 30 },
    label: { marginTop: 10, fontWeight: "bold" },
    input: {
      width: "100%", padding: 10, fontSize: 14, border: "1px solid #ccc",
      borderRadius: 5, marginTop: 5
    },
    select: {
      width: "100%", padding: 10, fontSize: 14, border: "1px solid #ccc",
      borderRadius: 5, marginTop: 5, backgroundColor: "white"
    },
    button: {
      padding: "10px 20px", fontSize: 16, color: "#fff", background: "#007BFF",
      border: "none", borderRadius: 5, cursor: "pointer"
    },
    buttonSecondary: {
      padding: "8px 16px", fontSize: 14, color: "#007BFF", background: "#fff",
      border: "1px solid #007BFF", borderRadius: 5, cursor: "pointer", margin: "5px"
    },
    buttonWrap: { textAlign: "center", marginTop: 20 },
    searchContainer: {
      display: "flex", gap: 20, marginBottom: 20, alignItems: "flex-start"
    },
    searchResults: {
      marginTop: 20,
      maxHeight: 300,
      overflowY: "auto",
      border: "1px solid #ccc",
      borderRadius: 5,
      padding: 15,
      background: "#f9f9f9"
    },
    patientCard: {
      padding: 15,
      margin: "10px 0",
      border: "1px solid #ddd",
      borderRadius: 5,
      cursor: "pointer",
      background: "#fff"
    },
    patientCardSelected: {
      padding: 15,
      margin: "10px 0",
      border: "2px solid #007BFF",
      borderRadius: 5,
      cursor: "pointer",
      background: "#e7f3ff"
    },
    recordsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: 15,
      marginTop: 20
    },
    recordCard: {
      padding: 15,
      border: "1px solid #ddd",
      borderRadius: 5,
      background: "#f9f9f9",
      cursor: "pointer"
    },
    recordItem: {
      padding: 10,
      margin: 5,
      border: "1px solid #ddd",
      borderRadius: 5,
      cursor: "pointer",
      background: "#fff"
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    },
    modalContent: {
      background: "#fff",
      padding: 30,
      borderRadius: 8,
      maxWidth: 800,
      maxHeight: "90vh",
      overflowY: "auto",
      width: "90%"
    },
    filterContainer: {
      display: "flex",
      gap: 10,
      marginBottom: 20,
      alignItems: "flex-end"
    },
    quickActions: {
      display: "flex",
      gap: 10,
      marginTop: 20,
      flexWrap: "wrap"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Patient Management</h1>

      {/* Patient Search Section */}
      <div style={styles.section}>
        <h2 style={styles.h2}>Search Patient Records</h2>
        <div style={styles.searchContainer}>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Search by Name, ID, Email, or Phone:</label>
            <input
              style={styles.input}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter patient name, ID, email, or phone"
            />
          </div>
          <div style={{ marginTop: "28px" }}>
            <button 
              style={styles.button} 
              onClick={handleSearch} 
              disabled={loading}
              onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div style={styles.searchResults}>
            <h3>Search Results ({searchResults.length})</h3>
            {searchResults.map((patient) => (
              <div
                key={patient.id}
                style={selectedPatient?.id === patient.id ? styles.patientCardSelected : styles.patientCard}
                onClick={() => loadPatientRecords(patient)}
              >
                <strong>{patient.first_name} {patient.last_name}</strong>
                <br />
                <small>ID: {patient.id} | DOB: {formatDate(patient.dob)} | {patient.email || patient.phone}</small>
              </div>
            ))}
          </div>
        )}

        {/* Patient Records Display */}
        {patientRecords && (
          <div style={{ marginTop: 30 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h3>Patient: {patientRecords.patient.first_name} {patientRecords.patient.last_name}</h3>
                <p>DOB: {formatDate(patientRecords.patient.dob)} | Email: {patientRecords.patient.email || "N/A"} | Phone: {patientRecords.patient.phone || "N/A"}</p>
              </div>
              <div>
                <button style={styles.buttonSecondary} onClick={() => setViewMode(viewMode === "list" ? "timeline" : "list")}>
                  {viewMode === "list" ? "📅 Timeline View" : "📋 List View"}
                </button>
                <button style={styles.buttonSecondary} onClick={exportToPDF}>📄 Export PDF</button>
              </div>
            </div>

            {/* Date Filter */}
            <div style={styles.filterContainer}>
              <div>
                <label style={styles.label}>Start Date:</label>
                <input
                  style={styles.input}
                  type="date"
                  value={dateFilter.startDate}
                  onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })}
                />
              </div>
              <div>
                <label style={styles.label}>End Date:</label>
                <input
                  style={styles.input}
                  type="date"
                  value={dateFilter.endDate}
                  onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })}
                />
              </div>
              <button style={styles.button} onClick={() => loadPatientRecords(selectedPatient)}>Apply Filter</button>
              {(dateFilter.startDate || dateFilter.endDate) && (
                <button style={styles.buttonSecondary} onClick={() => {
                  setDateFilter({ startDate: "", endDate: "" });
                  setTimeout(() => loadPatientRecords(selectedPatient), 100);
                }}>Clear Filter</button>
              )}
            </div>

            {/* Record Counts */}
            <div style={styles.recordsContainer}>
              {Object.entries(patientRecords.counts).map(([type, count]) => (
                <div key={type} style={styles.recordCard} onClick={() => {
                  const records = patientRecords.records[type];
                  if (records.length > 0) viewRecord(records[0], type);
                }}>
                  <div style={{ fontSize: 24 }}>{getRecordIcon(type)}</div>
                  <div style={{ fontWeight: "bold", marginTop: 10 }}>{getRecordLabel(type)}</div>
                  <div style={{ color: "#666", marginTop: 5 }}>{count} {count === 1 ? 'record' : 'records'}</div>
                </div>
              ))}
            </div>

            {/* Records List */}
            {viewMode === "list" && (
              <div style={{ marginTop: 30 }}>
                {Object.entries(patientRecords.records).map(([type, records]) => (
                  records.length > 0 && (
                    <div key={type} style={{ marginBottom: 30 }}>
                      <h4>{getRecordIcon(type)} {getRecordLabel(type)} ({records.length})</h4>
                      {records.map((record, idx) => (
                        <div key={idx} style={styles.recordItem} onClick={() => viewRecord(record, type)}>
                          <strong>Date: {formatDate(record.date || record.request_date || record.appointment_date || record.created_at)}</strong>
                          {record.patient_name && <div>Patient: {record.patient_name}</div>}
                          {record.final_diagnosis && <div>Diagnosis: {record.final_diagnosis.substring(0, 100)}...</div>}
                          {record.diagnosis && <div>Diagnosis: {record.diagnosis.substring(0, 100)}...</div>}
                          {record.test_type && <div>Test: {record.test_type}</div>}
                          {record.doctor_name && <div>Doctor: {record.doctor_name}</div>}
                        </div>
                      ))}
                    </div>
                  )
                ))}
              </div>
            )}

            {/* Timeline View */}
            {viewMode === "timeline" && (
              <div style={{ marginTop: 30 }}>
                <h4>📅 Timeline View</h4>
                {Object.entries(patientRecords.records)
                  .flatMap(([type, records]) => 
                    records.map(record => ({
                      ...record,
                      type,
                      date: record.date || record.request_date || record.appointment_date || record.created_at
                    }))
                  )
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((record, idx) => (
                    <div key={idx} style={styles.recordItem} onClick={() => viewRecord(record, record.type)}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                          <strong>{getRecordIcon(record.type)} {getRecordLabel(record.type)}</strong>
                          <div style={{ color: "#666", fontSize: 12 }}>{formatDate(record.date)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Quick Actions */}
            <div style={styles.quickActions}>
              <button style={styles.button} onClick={() => window.location.href = "/diagnosis"}>+ Add Diagnosis</button>
              <button style={styles.button} onClick={() => window.location.href = "/treatment"}>+ Add Treatment</button>
              <button style={styles.button} onClick={() => window.location.href = "/lab-report"}>+ Add Lab Report</button>
              <button style={styles.button} onClick={() => window.location.href = "/radiology"}>+ Add Radiology</button>
              <button style={styles.button} onClick={() => window.location.href = "/appointment"}>+ Schedule Appointment</button>
            </div>
          </div>
        )}
      </div>

      {/* Register New Patient Section */}
      <div style={styles.section}>
        <h2 style={styles.h2}>Register New Patient</h2>
        <form onSubmit={handleSubmit}>
          <label style={styles.label} htmlFor="first_name">First Name:</label>
          <input
            style={styles.input}
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            placeholder="Enter First Name"
          />

          <label style={styles.label} htmlFor="last_name">Last Name:</label>
          <input
            style={styles.input}
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            placeholder="Enter Last Name"
          />

          <label style={styles.label} htmlFor="dob">Date of Birth:</label>
          <input
            style={styles.input}
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          <label style={styles.label} htmlFor="gender">Gender:</label>
          <select
            style={styles.select}
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label style={styles.label} htmlFor="email">Email:</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />

          <label style={styles.label} htmlFor="phone">Phone:</label>
          <input
            style={styles.input}
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Phone Number"
          />

          <div style={styles.buttonWrap}>
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div style={styles.modal} onClick={() => setSelectedRecord(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h3>{getRecordIcon(selectedRecord.type)} {getRecordLabel(selectedRecord.type)} Details</h3>
              <button style={styles.buttonSecondary} onClick={() => setSelectedRecord(null)}>✕ Close</button>
            </div>
            <div style={{ marginBottom: 20 }}>
              <button style={styles.button} onClick={printRecord}>🖨️ Print</button>
              <button style={styles.button} onClick={exportToPDF}>📄 Export PDF</button>
            </div>
            <div style={{ lineHeight: 1.8 }}>
              {Object.entries(selectedRecord).map(([key, value]) => {
                if (key === 'type') return null;
                if (!value && value !== 0) return null;
                return (
                  <div key={key} style={{ marginBottom: 10 }}>
                    <strong>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong>{" "}
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

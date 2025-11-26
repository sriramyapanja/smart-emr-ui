import { useState } from "react";

export default function Pathology() {
  // Patient search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientRecords, setPatientRecords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRecords, setShowRecords] = useState(false);

  const [form, setForm] = useState({
    patient_id: "",
    patient_name: "",
    doctor_name: "",
    test_date: "",
    request_date: "",
    lab: "",
    favourite_tests: "",
    test_list: "",
    clinical_details: [],
    last_cytology: false,
    cytology_date: "",
    hpv_not_required: false,
    hpv_reason: "",
    pregnancy_status: "Not pregnant",
    contraception_method: "None",
    abnormal_bleeding: "",
    clinical_notes: "",
    copy_to: "",
    collection_by: [],
    fasting_status: "",
    billing_type: ""
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'favourite_tests[]' || name === 'test_list[]' || name === 'clinical_details[]' || name === 'collection_by') {
        const fieldName = name.replace('[]', '');
        setForm((f) => {
          const currentArray = f[fieldName] || [];
          if (checked) {
            return { ...f, [fieldName]: [...currentArray, value] };
          } else {
            return { ...f, [fieldName]: currentArray.filter(item => item !== value) };
          }
        });
      } else {
        setForm((f) => ({ ...f, [name]: checked }));
      }
    } else if (type === 'radio') {
      setForm((f) => ({ ...f, [name]: value }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const toggleField = (checkboxName, targetName) => {
    const checkbox = form[checkboxName];
    if (checkbox) {
      setForm((f) => ({ ...f, [targetName]: "" }));
    }
  };

  // Search patients
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a search term');
      return;
    }

    setLoading(true);
    setSearchResults([]);
    try {
      const response = await fetch(`/api/patients/search?query=${encodeURIComponent(searchQuery)}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Search results:', data);
      
      if (Array.isArray(data)) {
        setSearchResults(data);
        if (data.length === 0) {
          alert('No patients found');
        }
      } else {
        console.error('Unexpected response format:', data);
        alert('Unexpected response from server');
      }
    } catch (error) {
      console.error('Error searching:', error);
      alert(`Failed to search patients: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Select patient and auto-fill form
  const selectPatient = async (patient) => {
    setSelectedPatient(patient);
    const patientId = patient.id || patient.patient_id || "";
    setForm(f => ({
      ...f,
      patient_id: patientId,
      patient_name: `${patient.first_name || ""} ${patient.last_name || ""}`.trim() || ""
    }));
    setSearchResults([]);
    setSearchQuery("");
    
    // Load patient records
    setLoading(true);
    try {
      const response = await fetch(`/api/patients/${patientId}/records`);
      const data = await response.json();
      // Handle the nested structure from backend
      setPatientRecords(data.records || data);
    } catch (error) {
      console.error('Error loading records:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/pathology', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Pathology request submitted successfully!');
        // Reset form
        setForm({
          patient_id: "",
          patient_name: "",
          doctor_name: "",
          test_date: "",
          request_date: "",
          lab: "",
          favourite_tests: "",
          test_list: "",
          clinical_details: [],
          last_cytology: false,
          cytology_date: "",
          hpv_not_required: false,
          hpv_reason: "",
          pregnancy_status: "Not pregnant",
          contraception_method: "None",
          abnormal_bleeding: "",
          clinical_notes: "",
          copy_to: "",
          collection_by: [],
          fasting_status: "",
          billing_type: ""
        });
        // Reset patient search
        setSelectedPatient(null);
        setPatientRecords(null);
        setShowRecords(false);
        setSearchQuery("");
        setSearchResults([]);
      } else {
        alert(`Error: ${data.error || 'Failed to submit pathology request'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please check if the backend server is running.');
    }
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      margin: "20px",
      maxWidth: "1200px",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    },
    h1: { marginTop: "30px", color: "#333" },
    h2: { marginTop: "30px", color: "#555" },
    section: {
      border: "1px solid #ccc",
      padding: "15px",
      marginBottom: "20px",
      borderRadius: "5px"
    },
    checkboxGroup: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "10px",
      marginTop: "10px"
    },
    clinicalGroup: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "10px",
      marginTop: "10px"
    },
    label: {
      display: "flex",
      alignItems: "center",
      marginTop: "10px",
      fontWeight: "bold"
    },
    input: {
      width: "100%",
      padding: "5px",
      marginTop: "5px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "4px"
    },
    select: {
      width: "100%",
      padding: "5px",
      marginTop: "5px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "4px"
    },
    textarea: {
      width: "100%",
      padding: "5px",
      marginTop: "5px",
      height: "60px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      resize: "vertical"
    },
    greyed: {
      backgroundColor: "#f0f0f0",
      pointerEvents: "none"
    },
    buttonContainer: {
      marginTop: "20px",
      display: "flex",
      gap: "10px"
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      color: "#fff",
      backgroundColor: "#007BFF",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    },
    printButton: {
      padding: "10px 20px",
      fontSize: "16px",
      color: "#333",
      backgroundColor: "#f0f0f0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      cursor: "pointer"
    },
    searchContainer: {
      border: "1px solid #ccc",
      padding: "15px",
      marginBottom: "20px",
      borderRadius: "5px",
      backgroundColor: "#f9f9f9"
    },
    searchInput: {
      width: "calc(100% - 120px)",
      padding: "8px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      marginRight: "10px"
    },
    searchButton: {
      padding: "8px 20px",
      fontSize: "14px",
      color: "#fff",
      backgroundColor: "#007BFF",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    },
    searchResults: {
      marginTop: "10px",
      maxHeight: "200px",
      overflowY: "auto",
      border: "1px solid #ddd",
      borderRadius: "4px",
      backgroundColor: "#fff"
    },
    searchResultItem: {
      padding: "10px",
      borderBottom: "1px solid #eee",
      cursor: "pointer",
      transition: "background-color 0.2s"
    },
    searchResultItemHover: {
      backgroundColor: "#e3f2fd"
    },
    recordsContainer: {
      marginTop: "20px",
      padding: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      backgroundColor: "#fff"
    },
    recordItem: {
      padding: "10px",
      marginBottom: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      backgroundColor: "#f9f9f9"
    },
    recordType: {
      fontWeight: "bold",
      color: "#007BFF",
      marginBottom: "5px"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Pathology Request Form</h1>
      
      {/* Patient Search Section */}
      <div style={styles.searchContainer}>
        <h2 style={styles.h2}>Search Patient</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search by Patient ID, Name, Email, or Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={styles.searchInput}
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={loading}
            style={styles.searchButton}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        
        {searchResults.length > 0 && (
          <div style={styles.searchResults}>
            {searchResults.map((patient) => {
              const patientId = patient.id || patient.patient_id;
              return (
                <div
                  key={patientId}
                  onClick={() => selectPatient(patient)}
                  style={styles.searchResultItem}
                  onMouseEnter={(e) => e.target.style.backgroundColor = styles.searchResultItemHover.backgroundColor}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#fff"}
                >
                  <strong>ID: {patientId}</strong> - {patient.first_name} {patient.last_name}
                  {patient.email && ` - ${patient.email}`}
                  {patient.phone && ` - ${patient.phone}`}
                </div>
              );
            })}
          </div>
        )}

        {selectedPatient && (
          <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#e8f5e9", borderRadius: "4px" }}>
            <strong>Selected Patient:</strong> {selectedPatient.first_name} {selectedPatient.last_name} (ID: {selectedPatient.id || selectedPatient.patient_id})
            <button
              type="button"
              onClick={() => {
                setSelectedPatient(null);
                setPatientRecords(null);
                setShowRecords(false);
                setForm(f => ({ ...f, patient_id: "", patient_name: "" }));
              }}
              style={{ marginLeft: "10px", padding: "5px 10px", fontSize: "12px", cursor: "pointer" }}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setShowRecords(!showRecords)}
              style={{ marginLeft: "10px", padding: "5px 10px", fontSize: "12px", cursor: "pointer", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "4px" }}
            >
              {showRecords ? "Hide" : "Show"} Records
            </button>
          </div>
        )}

        {showRecords && patientRecords && (
          <div style={styles.recordsContainer}>
            <h3 style={{ marginTop: 0 }}>Patient Records</h3>
            {patientRecords.diagnosis && patientRecords.diagnosis.length > 0 && (
              <div style={{ marginBottom: "15px" }}>
                <div style={styles.recordType}>Diagnosis ({patientRecords.diagnosis.length})</div>
                {patientRecords.diagnosis.slice(0, 3).map((record, idx) => (
                  <div key={idx} style={styles.recordItem}>
                    <strong>Date:</strong> {record.diagnosis_date || record.date || 'N/A'} - <strong>Diagnosis:</strong> {record.final_diagnosis || record.condition || 'N/A'}
                  </div>
                ))}
              </div>
            )}
            {patientRecords.treatment && patientRecords.treatment.length > 0 && (
              <div style={{ marginBottom: "15px" }}>
                <div style={styles.recordType}>Treatment ({patientRecords.treatment.length})</div>
                {patientRecords.treatment.slice(0, 3).map((record, idx) => (
                  <div key={idx} style={styles.recordItem}>
                    <strong>Date:</strong> {record.treatment_date || record.date || 'N/A'} - <strong>Diagnosis:</strong> {record.diagnosis || 'N/A'}
                  </div>
                ))}
              </div>
            )}
            {patientRecords.pathology && patientRecords.pathology.length > 0 && (
              <div style={{ marginBottom: "15px" }}>
                <div style={styles.recordType}>Pathology Requests ({patientRecords.pathology.length})</div>
                {patientRecords.pathology.slice(0, 3).map((record, idx) => (
                  <div key={idx} style={styles.recordItem}>
                    <strong>Date:</strong> {record.request_date || 'N/A'} - <strong>Lab:</strong> {record.lab || 'N/A'}
                  </div>
                ))}
              </div>
            )}
            {patientRecords.radiology && patientRecords.radiology.length > 0 && (
              <div style={{ marginBottom: "15px" }}>
                <div style={styles.recordType}>Radiology Requests ({patientRecords.radiology.length})</div>
                {patientRecords.radiology.slice(0, 3).map((record, idx) => (
                  <div key={idx} style={styles.recordItem}>
                    <strong>Date:</strong> {record.request_date || 'N/A'} - <strong>Test:</strong> {record.test_type || 'N/A'}
                  </div>
                ))}
              </div>
            )}
            {patientRecords.labReports && patientRecords.labReports.length > 0 && (
              <div style={{ marginBottom: "15px" }}>
                <div style={styles.recordType}>Lab Reports ({patientRecords.labReports.length})</div>
                {patientRecords.labReports.slice(0, 3).map((record, idx) => (
                  <div key={idx} style={styles.recordItem}>
                    <strong>Date:</strong> {record.date || 'N/A'} - <strong>Test:</strong> {record.test_name || 'N/A'}
                  </div>
                ))}
              </div>
            )}
            {(!patientRecords.diagnosis || patientRecords.diagnosis.length === 0) &&
             (!patientRecords.treatment || patientRecords.treatment.length === 0) &&
             (!patientRecords.pathology || patientRecords.pathology.length === 0) &&
             (!patientRecords.radiology || patientRecords.radiology.length === 0) &&
             (!patientRecords.labReports || patientRecords.labReports.length === 0) && (
              <div style={{ color: "#666", fontStyle: "italic" }}>No records found for this patient.</div>
            )}
          </div>
        )}
      </div>

      <form onSubmit={onSubmit}>
        {/* Patient & Test Information */}
        <div style={styles.section}>
          <h2 style={styles.h2}>Patient & Test Information</h2>
          <label style={styles.label} htmlFor="patient-id">Patient ID:</label>
          <input
            type="text"
            id="patient-id"
            name="patient_id"
            value={form.patient_id}
            onChange={onChange}
            style={styles.input}
          />

          <label style={styles.label} htmlFor="patient-name">Patient Name:</label>
          <input
            type="text"
            id="patient-name"
            name="patient_name"
            value={form.patient_name}
            onChange={onChange}
            required
            style={styles.input}
          />

          <label style={styles.label} htmlFor="doctor-name">Doctor Name:</label>
          <input
            type="text"
            id="doctor-name"
            name="doctor_name"
            value={form.doctor_name}
            onChange={onChange}
            required
            style={styles.input}
          />

          <label style={styles.label} htmlFor="test-date">Test Date:</label>
          <input
            type="date"
            id="test-date"
            name="test_date"
            value={form.test_date}
            onChange={onChange}
            style={styles.input}
          />
        </div>

        {/* Request Information */}
        <div style={styles.section}>
          <label style={styles.label} htmlFor="request-date">Request Date:</label>
          <input
            type="date"
            id="request-date"
            name="request_date"
            value={form.request_date}
            onChange={onChange}
            style={styles.input}
          />

          <label style={styles.label} htmlFor="lab">Laboratory:</label>
          <select
            id="lab"
            name="lab"
            value={form.lab}
            onChange={onChange}
            style={styles.select}
          >
            <option value="">Select Laboratory</option>
            <option value="Sonic Healthcare">Sonic Healthcare</option>
            <option value="Laverty">Laverty</option>
            <option value="Douglas Hanly Moir">Douglas Hanly Moir</option>
          </select>
        </div>

        {/* Favourite Tests */}
        <div style={styles.section}>
          <h2 style={styles.h2}>Favourite Tests</h2>
          <label style={styles.label} htmlFor="favourite_tests">Favourite Test:</label>
          <select
            id="favourite_tests"
            name="favourite_tests"
            value={form.favourite_tests}
            onChange={onChange}
            style={styles.select}
          >
            <option value="">Select Favourite Test</option>
            {["Cervical Cytology", "E/LFTs", "ESR", "FBE", "HbA1C", "HDL Cholesterol", "Histology", "PSA", "TSH", "Urine M/C/S"].map(test => (
              <option key={test} value={test}>{test}</option>
            ))}
          </select>
        </div>

        {/* Test List */}
        <div style={styles.section}>
          <h2 style={styles.h2}>Test List</h2>
          <label style={styles.label} htmlFor="test_list">Test:</label>
          <select
            id="test_list"
            name="test_list"
            value={form.test_list}
            onChange={onChange}
            style={styles.select}
          >
            <option value="">Select Test</option>
            {["B-HCG (Quantitative)", "B-HCG (Serum)", "B12", "Blood Culture", "CRP", "Electrolytes", "Ferritin", "Glucose fasting", "HIV 1/2 Ab/Ag", "Iron studies", "LFT", "Lipids", "PSA", "RF", "TSH", "Urine M/C/S", "Vitamin D"].map(test => (
              <option key={test} value={test}>{test}</option>
            ))}
          </select>
        </div>

        {/* Clinical Details */}
        <div style={styles.section}>
          <h2 style={styles.h2}>Clinical Details</h2>
          <div style={styles.clinicalGroup}>
            {["Diarrhoea", "Dysmenorrhoea", "Dysuria", "Haematuria", "Headache", "Hypertension", "Infertility", "Jaundice", "Liver disease", "Menorrhagia", "Thyroid disorder", "UTI"].map(detail => (
              <label key={detail} style={styles.label}>
                <input
                  type="checkbox"
                  name="clinical_details[]"
                  value={detail}
                  checked={form.clinical_details.includes(detail)}
                  onChange={onChange}
                />
                {" "}{detail}
              </label>
            ))}
          </div>
        </div>

        {/* Cervical Screening */}
        <div style={styles.section}>
          <h2 style={styles.h2}>Cervical Screening</h2>
          <label style={styles.label}>
            <input
              type="checkbox"
              id="enable-cytology"
              name="last_cytology"
              checked={form.last_cytology}
              onChange={(e) => {
                onChange(e);
                if (!e.target.checked) {
                  setForm(f => ({ ...f, cytology_date: "" }));
                }
              }}
            />
            {" "}Last Cervical Cytology
          </label>
          <input
            type="date"
            id="cytology-date"
            name="cytology_date"
            value={form.cytology_date}
            onChange={onChange}
            disabled={!form.last_cytology}
            style={{ ...styles.input, ...(!form.last_cytology ? styles.greyed : {}) }}
          />
          <br /><br />
          <label style={styles.label}>
            <input
              type="checkbox"
              id="hpv-not-required"
              name="hpv_not_required"
              checked={form.hpv_not_required}
              onChange={(e) => {
                onChange(e);
                if (!e.target.checked) {
                  setForm(f => ({ ...f, hpv_reason: "" }));
                }
              }}
            />
            {" "}HPV not required
          </label>
          <input
            type="text"
            id="hpv-reason"
            name="hpv_reason"
            value={form.hpv_reason}
            onChange={onChange}
            placeholder="Reason"
            disabled={!form.hpv_not_required}
            style={{ ...styles.input, ...(!form.hpv_not_required ? styles.greyed : {}) }}
          />
          <br /><br />
          <label style={styles.label} htmlFor="pregnancy">Pregnancy status:</label>
          <select
            id="pregnancy"
            name="pregnancy_status"
            value={form.pregnancy_status}
            onChange={onChange}
            style={styles.select}
          >
            <option>Not pregnant</option>
            <option>Pregnant</option>
            <option>Postnatal</option>
          </select>
          <br /><br />
          <label style={styles.label} htmlFor="contraception">Contraception method:</label>
          <select
            id="contraception"
            name="contraception_method"
            value={form.contraception_method}
            onChange={onChange}
            style={styles.select}
          >
            <option>None</option>
            <option>Oral contraceptive</option>
            <option>IUD</option>
            <option>Implant</option>
            <option>Other</option>
          </select>
          <br /><br />
          <label style={styles.label}>Abnormal bleeding:</label>
          <label style={styles.label}>
            <input
              type="radio"
              name="abnormal_bleeding"
              value="Yes"
              checked={form.abnormal_bleeding === "Yes"}
              onChange={onChange}
            />
            {" "}Yes
          </label>
          <label style={styles.label}>
            <input
              type="radio"
              name="abnormal_bleeding"
              value="No"
              checked={form.abnormal_bleeding === "No"}
              onChange={onChange}
            />
            {" "}No
          </label>
        </div>

        {/* Additional Details */}
        <div style={styles.section}>
          <h2 style={styles.h2}>Additional Details</h2>
          <label style={styles.label} htmlFor="notes">Clinical Notes:</label>
          <textarea
            id="notes"
            name="clinical_notes"
            value={form.clinical_notes}
            onChange={onChange}
            style={styles.textarea}
          />
          <br /><br />
          <label style={styles.label} htmlFor="copy">Copy to:</label>
          <input
            type="text"
            id="copy"
            name="copy_to"
            value={form.copy_to}
            onChange={onChange}
            style={styles.input}
          />
          <br /><br />
          <label style={styles.label}>
            <input
              type="checkbox"
              name="collection_by"
              value="Medical Centre"
              checked={form.collection_by.includes("Medical Centre")}
              onChange={onChange}
            />
            {" "}Collected by medical centre
          </label>
          <label style={styles.label}>
            <input
              type="checkbox"
              name="collection_by"
              value="Patient"
              checked={form.collection_by.includes("Patient")}
              onChange={onChange}
            />
            {" "}Patient to attend collection centre
          </label>
        </div>

        {/* Other Options */}
        <div style={styles.section}>
          <h2 style={styles.h2}>Other Options</h2>
          <label style={styles.label}>
            <input
              type="checkbox"
              name="fasting_status"
              value="Fasting"
              checked={form.fasting_status === "Fasting"}
              onChange={(e) => {
                if (e.target.checked) {
                  setForm(f => ({ ...f, fasting_status: "Fasting" }));
                } else {
                  setForm(f => ({ ...f, fasting_status: "" }));
                }
              }}
            />
            {" "}Fasting
          </label>
          <label style={styles.label}>
            <input
              type="checkbox"
              name="fasting_status"
              value="Non-Fasting"
              checked={form.fasting_status === "Non-Fasting"}
              onChange={(e) => {
                if (e.target.checked) {
                  setForm(f => ({ ...f, fasting_status: "Non-Fasting" }));
                } else {
                  setForm(f => ({ ...f, fasting_status: "" }));
                }
              }}
            />
            {" "}Non-Fasting
          </label>
          <br /><br />
          <label style={styles.label}>Billing Type:</label>
          <label style={styles.label}>
            <input
              type="radio"
              name="billing_type"
              value="Private"
              checked={form.billing_type === "Private"}
              onChange={onChange}
            />
            {" "}Private
          </label>
          <label style={styles.label}>
            <input
              type="radio"
              name="billing_type"
              value="Concession"
              checked={form.billing_type === "Concession"}
              onChange={onChange}
            />
            {" "}Concession
          </label>
          <label style={styles.label}>
            <input
              type="radio"
              name="billing_type"
              value="Direct Bill"
              checked={form.billing_type === "Direct Bill"}
              onChange={onChange}
            />
            {" "}Direct Bill
          </label>
        </div>

        {/* Buttons */}
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>Submit Pathology</button>
          <button type="button" onClick={() => window.print()} style={styles.printButton}>Print</button>
        </div>
      </form>
    </div>
  );
}


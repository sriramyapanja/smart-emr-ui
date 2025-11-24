import { useState } from "react";

export default function LabReport() {
  const [form, setForm] = useState({
    patientId: "",
    patientName: "",
    date: "",
    physician: "",
    hemoglobin: "",
    rbc: "",
    wbc: "",
    glucose: "",
    cholesterol: "",
    microbiologyFindings: "",
    xray: "",
    ctScan: "",
    mri: "",
    ultrasound: ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/lab-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Lab report saved successfully! Report ID: ${data.reportId}`);
        // Reset form
        setForm({
          patientId: "",
          patientName: "",
          date: "",
          physician: "",
          hemoglobin: "",
          rbc: "",
          wbc: "",
          glucose: "",
          cholesterol: "",
          microbiologyFindings: "",
          xray: "",
          ctScan: "",
          mri: "",
          ultrasound: ""
        });
      } else {
        alert(`Error: ${data.error || 'Failed to save lab report'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please check if the backend server is running.');
    }
  };

  const styles = {
    container: {
      width: "70%",
      maxWidth: 900,
      margin: "50px auto",
      padding: 40,
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    },
    h1: { textAlign: "center", color: "#333" },
    label: { marginTop: 10, fontWeight: "bold" },
    input: {
      width: "100%",
      padding: 10,
      fontSize: 14,
      border: "1px solid #ccc",
      borderRadius: 5,
      marginTop: 5
    },
    textarea: {
      width: "100%",
      padding: 10,
      fontSize: 14,
      border: "1px solid #ccc",
      borderRadius: 5,
      marginTop: 5,
      resize: "vertical"
    },
    buttonContainer: { textAlign: "center", marginTop: 20 },
    button: {
      padding: "10px 20px",
      fontSize: 16,
      color: "#fff",
      background: "#007BFF",
      border: "none",
      borderRadius: 5,
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Laboratory Findings</h1>
      <form onSubmit={onSubmit}>
        <label style={styles.label} htmlFor="patientId">Patient ID:</label>
        <input
          style={styles.input}
          id="patientId"
          name="patientId"
          value={form.patientId}
          onChange={onChange}
          required
          placeholder="Enter Patient ID"
        />

        <label style={styles.label} htmlFor="patientName">Patient Name:</label>
        <input
          style={styles.input}
          id="patientName"
          name="patientName"
          value={form.patientName}
          onChange={onChange}
          required
          placeholder="Enter Patient Name"
        />

        <label style={styles.label} htmlFor="date">Date of Test:</label>
        <input
          style={styles.input}
          type="date"
          id="date"
          name="date"
          value={form.date}
          onChange={onChange}
          required
        />

        <label style={styles.label} htmlFor="physician">Referring Physician:</label>
        <input
          style={styles.input}
          id="physician"
          name="physician"
          value={form.physician}
          onChange={onChange}
          placeholder="Enter Referring Physician"
        />

        <label style={styles.label} htmlFor="hemoglobin">Hemoglobin (g/dL):</label>
        <input
          style={styles.input}
          id="hemoglobin"
          name="hemoglobin"
          value={form.hemoglobin}
          onChange={onChange}
          placeholder="Enter Hemoglobin Level"
        />

        <label style={styles.label} htmlFor="rbc">RBC Count (million/µL):</label>
        <input
          style={styles.input}
          id="rbc"
          name="rbc"
          value={form.rbc}
          onChange={onChange}
          placeholder="Enter RBC Count"
        />

        <label style={styles.label} htmlFor="wbc">WBC Count (cells/µL):</label>
        <input
          style={styles.input}
          id="wbc"
          name="wbc"
          value={form.wbc}
          onChange={onChange}
          placeholder="Enter WBC Count"
        />

        <label style={styles.label} htmlFor="glucose">Blood Glucose (mg/dL):</label>
        <input
          style={styles.input}
          id="glucose"
          name="glucose"
          value={form.glucose}
          onChange={onChange}
          placeholder="Enter Blood Glucose Level"
        />

        <label style={styles.label} htmlFor="cholesterol">Cholesterol (mg/dL):</label>
        <input
          style={styles.input}
          id="cholesterol"
          name="cholesterol"
          value={form.cholesterol}
          onChange={onChange}
          placeholder="Enter Cholesterol Level"
        />

        <label style={styles.label} htmlFor="microbiologyFindings">Microbiology Findings:</label>
        <textarea
          style={styles.textarea}
          id="microbiologyFindings"
          name="microbiologyFindings"
          rows={3}
          value={form.microbiologyFindings}
          onChange={onChange}
          placeholder="Enter microbiology findings"
        />

        <label style={styles.label} htmlFor="xray">X-ray Findings:</label>
        <textarea
          style={styles.textarea}
          id="xray"
          name="xray"
          rows={3}
          value={form.xray}
          onChange={onChange}
          placeholder="Enter X-ray results"
        />

        <label style={styles.label} htmlFor="ctScan">CT Scan Findings:</label>
        <textarea
          style={styles.textarea}
          id="ctScan"
          name="ctScan"
          rows={3}
          value={form.ctScan}
          onChange={onChange}
          placeholder="Enter CT scan results"
        />

        <label style={styles.label} htmlFor="mri">MRI Findings:</label>
        <textarea
          style={styles.textarea}
          id="mri"
          name="mri"
          rows={3}
          value={form.mri}
          onChange={onChange}
          placeholder="Enter MRI results"
        />

        <label style={styles.label} htmlFor="ultrasound">Ultrasound Findings:</label>
        <textarea
          style={styles.textarea}
          id="ultrasound"
          name="ultrasound"
          rows={3}
          value={form.ultrasound}
          onChange={onChange}
          placeholder="Enter ultrasound results"
        />

        <div style={styles.buttonContainer}>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"}
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}



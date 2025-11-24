import { useState } from "react";

export default function Diagnosis() {
  const [form, setForm] = useState({
    patientId: "",
    patientName: "",
    date: "",
    symptoms: "",
    observations: "",
    provisionalDiagnosis: "",
    tests: "",
    finalDiagnosis: "",
    treatmentPlan: "",
    followUp: ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Diagnosis recorded successfully! Diagnosis ID: ${data.diagnosisId}`);
        // Reset form
        setForm({
          patientId: "",
          patientName: "",
          date: "",
          symptoms: "",
          observations: "",
          provisionalDiagnosis: "",
          tests: "",
          finalDiagnosis: "",
          treatmentPlan: "",
          followUp: ""
        });
      } else {
        alert(`Error: ${data.error || 'Failed to record diagnosis'}`);
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
      <h1 style={styles.h1}>Patient Diagnosis Form</h1>
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

        <label style={styles.label} htmlFor="date">Date of Diagnosis:</label>
        <input
          style={styles.input}
          type="date"
          id="date"
          name="date"
          value={form.date}
          onChange={onChange}
          required
        />

        <label style={styles.label} htmlFor="symptoms">Symptoms:</label>
        <textarea
          style={styles.textarea}
          id="symptoms"
          name="symptoms"
          rows={3}
          value={form.symptoms}
          onChange={onChange}
          required
          placeholder="Describe symptoms"
        />

        <label style={styles.label} htmlFor="observations">Observations:</label>
        <textarea
          style={styles.textarea}
          id="observations"
          name="observations"
          rows={3}
          value={form.observations}
          onChange={onChange}
          placeholder="Enter observations"
        />

        <label style={styles.label} htmlFor="provisionalDiagnosis">Provisional Diagnosis:</label>
        <textarea
          style={styles.textarea}
          id="provisionalDiagnosis"
          name="provisionalDiagnosis"
          rows={3}
          value={form.provisionalDiagnosis}
          onChange={onChange}
          placeholder="Enter provisional diagnosis"
        />

        <label style={styles.label} htmlFor="tests">Tests Performed:</label>
        <textarea
          style={styles.textarea}
          id="tests"
          name="tests"
          rows={3}
          value={form.tests}
          onChange={onChange}
          placeholder="List tests performed"
        />

        <label style={styles.label} htmlFor="finalDiagnosis">Final Diagnosis:</label>
        <textarea
          style={styles.textarea}
          id="finalDiagnosis"
          name="finalDiagnosis"
          rows={3}
          value={form.finalDiagnosis}
          onChange={onChange}
          required
          placeholder="Enter final diagnosis"
        />

        <label style={styles.label} htmlFor="treatmentPlan">Treatment Plan:</label>
        <textarea
          style={styles.textarea}
          id="treatmentPlan"
          name="treatmentPlan"
          rows={3}
          value={form.treatmentPlan}
          onChange={onChange}
          required
          placeholder="Describe treatment plan"
        />

        <label style={styles.label} htmlFor="followUp">Follow-Up Instructions:</label>
        <textarea
          style={styles.textarea}
          id="followUp"
          name="followUp"
          rows={3}
          value={form.followUp}
          onChange={onChange}
          placeholder="Enter follow-up schedule"
        />

        <div style={styles.buttonContainer}>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"}
          >
            Submit Diagnosis
          </button>
        </div>
      </form>
    </div>
  );
}


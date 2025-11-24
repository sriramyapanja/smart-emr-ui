import { useState } from "react";

export default function MedicalHistory() {
  const [form, setForm] = useState({
    patientId: "",
    patientName: "",
    chronicIllnesses: "",
    surgeries: "",
    currentMedications: "",
    allergies: "",
    hospitalizations: "",
    familyHistory: "",
    immunizations: "",
    socialHistory: "",
    otherConditions: ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/medical-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Medical history ${data.message.includes('updated') ? 'updated' : 'saved'} successfully!`);
        // Reset form
        setForm({
          patientId: "",
          patientName: "",
          chronicIllnesses: "",
          surgeries: "",
          currentMedications: "",
          allergies: "",
          hospitalizations: "",
          familyHistory: "",
          immunizations: "",
          socialHistory: "",
          otherConditions: ""
        });
      } else {
        alert(`Error: ${data.error || 'Failed to save medical history'}`);
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
      <h1 style={styles.h1}>Past Medical History Form</h1>
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

        <label style={styles.label} htmlFor="chronicIllnesses">Chronic Illnesses:</label>
        <textarea
          style={styles.textarea}
          id="chronicIllnesses"
          name="chronicIllnesses"
          rows={3}
          value={form.chronicIllnesses}
          onChange={onChange}
          required
          placeholder="Enter chronic illnesses"
        />

        <label style={styles.label} htmlFor="surgeries">Previous Surgeries:</label>
        <textarea
          style={styles.textarea}
          id="surgeries"
          name="surgeries"
          rows={3}
          value={form.surgeries}
          onChange={onChange}
          placeholder="Enter details of past surgeries"
        />

        <label style={styles.label} htmlFor="currentMedications">Current Medications:</label>
        <textarea
          style={styles.textarea}
          id="currentMedications"
          name="currentMedications"
          rows={3}
          value={form.currentMedications}
          onChange={onChange}
          placeholder="List all current medications"
        />

        <label style={styles.label} htmlFor="allergies">Allergies:</label>
        <textarea
          style={styles.textarea}
          id="allergies"
          name="allergies"
          rows={3}
          value={form.allergies}
          onChange={onChange}
          placeholder="List any known allergies"
        />

        <label style={styles.label} htmlFor="hospitalizations">Hospitalizations:</label>
        <textarea
          style={styles.textarea}
          id="hospitalizations"
          name="hospitalizations"
          rows={3}
          value={form.hospitalizations}
          onChange={onChange}
          placeholder="Details of past hospitalizations"
        />

        <label style={styles.label} htmlFor="familyHistory">Family Medical History:</label>
        <textarea
          style={styles.textarea}
          id="familyHistory"
          name="familyHistory"
          rows={3}
          value={form.familyHistory}
          onChange={onChange}
          placeholder="Include family history of diseases"
        />

        <label style={styles.label} htmlFor="immunizations">Immunizations:</label>
        <textarea
          style={styles.textarea}
          id="immunizations"
          name="immunizations"
          rows={3}
          value={form.immunizations}
          onChange={onChange}
          placeholder="List immunizations received"
        />

        <label style={styles.label} htmlFor="socialHistory">Social History:</label>
        <textarea
          style={styles.textarea}
          id="socialHistory"
          name="socialHistory"
          rows={3}
          value={form.socialHistory}
          onChange={onChange}
          placeholder="Include lifestyle habits"
        />

        <label style={styles.label} htmlFor="otherConditions">Other Medical Conditions:</label>
        <textarea
          style={styles.textarea}
          id="otherConditions"
          name="otherConditions"
          rows={3}
          value={form.otherConditions}
          onChange={onChange}
          placeholder="Mention any other medical conditions"
        />

        <div style={styles.buttonContainer}>
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
  );
}


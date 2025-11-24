import { useState } from "react";

export default function Treatment() {
  const [form, setForm] = useState({
    patientId: "",
    patientName: "",
    date: "",
    diagnosis: "",
    medications: "",
    procedures: "",
    therapyPlan: "",
    diet: "",
    lifestyle: "",
    followUp: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/treatment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Treatment recorded successfully! Treatment ID: ${data.treatmentId}`);
        // Reset form
        setForm({
          patientId: "",
          patientName: "",
          date: "",
          diagnosis: "",
          medications: "",
          procedures: "",
          therapyPlan: "",
          diet: "",
          lifestyle: "",
          followUp: "",
        });
      } else {
        alert(`Error: ${data.error || 'Failed to record treatment'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please check if the backend server is running.');
    }
  };

  // Simple inline styles, copied from your HTML
  const styles = {
    container: {
      width: "70%", maxWidth: 900, margin: "50px auto", padding: 40,
      background: "#fff", borderRadius: 8, boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    },
    h1: { textAlign: "center", color: "#333" },
    label: { marginTop: 10, fontWeight: "bold" },
    input: {
      width: "100%", padding: 10, fontSize: 14, border: "1px solid #ccc",
      borderRadius: 5, marginTop: 5
    },
    textarea: { width: "100%", padding: 10, fontSize: 14, border: "1px solid #ccc",
      borderRadius: 5, marginTop: 5, resize: "vertical"
    },
    buttonWrap: { textAlign: "center", marginTop: 20 },
    button: {
      padding: "10px 20px", fontSize: 16, color: "#fff", background: "#007BFF",
      border: "none", borderRadius: 5, cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
        <h1 style={styles.h1}>Patient Treatment Form</h1>
        <form onSubmit={onSubmit}>
          <label style={styles.label} htmlFor="patientId">Patient ID:</label>
          <input style={styles.input} id="patientId" name="patientId" value={form.patientId} onChange={onChange} required placeholder="Enter Patient ID" />

          <label style={styles.label} htmlFor="patientName">Patient Name:</label>
          <input style={styles.input} id="patientName" name="patientName" value={form.patientName} onChange={onChange} required placeholder="Enter Patient Name" />

          <label style={styles.label} htmlFor="date">Date of Treatment:</label>
          <input style={styles.input} type="date" id="date" name="date" value={form.date} onChange={onChange} required />

          <label style={styles.label} htmlFor="diagnosis">Diagnosis:</label>
          <textarea style={styles.textarea} id="diagnosis" name="diagnosis" rows={3} value={form.diagnosis} onChange={onChange} placeholder="Enter the patient's diagnosis" required />

          <label style={styles.label} htmlFor="medications">Prescribed Medications:</label>
          <textarea style={styles.textarea} id="medications" name="medications" rows={3} value={form.medications} onChange={onChange} placeholder="List all prescribed medications" required />

          <label style={styles.label} htmlFor="procedures">Performed Procedures:</label>
          <textarea style={styles.textarea} id="procedures" name="procedures" rows={3} value={form.procedures} onChange={onChange} placeholder="Describe any procedures performed" />

          <label style={styles.label} htmlFor="therapyPlan">Therapy Plan:</label>
          <textarea style={styles.textarea} id="therapyPlan" name="therapyPlan" rows={3} value={form.therapyPlan} onChange={onChange} placeholder="Enter any therapy prescribed" />

          <label style={styles.label} htmlFor="diet">Diet Recommendations:</label>
          <textarea style={styles.textarea} id="diet" name="diet" rows={3} value={form.diet} onChange={onChange} placeholder="Enter dietary instructions" />

          <label style={styles.label} htmlFor="lifestyle">Lifestyle Recommendations:</label>
          <textarea style={styles.textarea} id="lifestyle" name="lifestyle" rows={3} value={form.lifestyle} onChange={onChange} placeholder="Enter lifestyle recommendations" />

          <label style={styles.label} htmlFor="followUp">Follow-Up Schedule:</label>
          <textarea style={styles.textarea} id="followUp" name="followUp" rows={3} value={form.followUp} onChange={onChange} placeholder="Enter follow-up details" />

          <div style={styles.buttonWrap}>
            <button type="submit" style={styles.button}>Submit Treatment</button>
          </div>
        </form>
    </div>
  );
}

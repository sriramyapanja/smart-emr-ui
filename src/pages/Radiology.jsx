import { useState } from "react";

export default function Radiology() {
  const [form, setForm] = useState({
    requestDate: "",
    lab: "",
    testType: "",
    side_left: false,
    side_right: false,
    region: "",
    otherRegion: "",
    requests: "",
    otherTest: "",
    clinicalDetails: "",
    detailsForm: "",
    addEntry: false,
    dueDate: ""
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ 
      ...f, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/radiology', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...form,
            side_left: form.side_left ? 1 : 0,
            side_right: form.side_right ? 1 : 0,
            addEntry: form.addEntry ? 1 : 0
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        // Reset form
        setForm({
          requestDate: "",
          lab: "",
          testType: "",
          side_left: false,
          side_right: false,
          region: "",
          otherRegion: "",
          requests: "",
          otherTest: "",
          clinicalDetails: "",
          detailsForm: "",
          addEntry: false,
          dueDate: ""
        });
      } else {
        alert(`Error: ${data.message || 'Failed to submit radiology request'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Failed to submit form: ${error.message}\n\nPlease check:\n1. Backend server is running on http://localhost:3001\n2. Check browser console (F12) for more details`);
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
    label: { marginTop: 10, fontWeight: "bold", display: "block" },
    input: {
      width: "100%",
      padding: 10,
      fontSize: 14,
      border: "1px solid #ccc",
      borderRadius: 5,
      marginTop: 5
    },
    select: {
      width: "100%",
      padding: 10,
      fontSize: 14,
      border: "1px solid #ccc",
      borderRadius: 5,
      marginTop: 5,
      backgroundColor: "white"
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
    checkboxContainer: {
      display: "flex",
      gap: "20px",
      marginTop: 10
    },
    checkbox: {
      display: "flex",
      alignItems: "center",
      gap: 5
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
      <h1 style={styles.h1}>Radiology Imaging Request</h1>
      <form onSubmit={onSubmit}>
        <label style={styles.label} htmlFor="requestDate">Request Date:</label>
        <input
          style={styles.input}
          type="date"
          id="requestDate"
          name="requestDate"
          value={form.requestDate}
          onChange={onChange}
          required
        />

        <label style={styles.label} htmlFor="lab">Laboratory:</label>
        <input
          style={styles.input}
          type="text"
          id="lab"
          name="lab"
          value={form.lab}
          onChange={onChange}
          required
          placeholder="Enter laboratory name"
        />

        <label style={styles.label} htmlFor="testType">Test Type:</label>
        <input
          style={styles.input}
          type="text"
          id="testType"
          name="testType"
          value={form.testType}
          onChange={onChange}
          required
          placeholder="Enter test type"
        />

        <label style={styles.label}>Side:</label>
        <div style={styles.checkboxContainer}>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              name="side_left"
              checked={form.side_left}
              onChange={onChange}
            />
            Left
          </label>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              name="side_right"
              checked={form.side_right}
              onChange={onChange}
            />
            Right
          </label>
        </div>

        <label style={styles.label} htmlFor="region">Region:</label>
        <input
          style={styles.input}
          type="text"
          id="region"
          name="region"
          value={form.region}
          onChange={onChange}
          placeholder="Enter region"
        />

        <label style={styles.label} htmlFor="otherRegion">Other Region:</label>
        <input
          style={styles.input}
          type="text"
          id="otherRegion"
          name="otherRegion"
          value={form.otherRegion}
          onChange={onChange}
          placeholder="Enter other region if applicable"
        />

        <label style={styles.label} htmlFor="requests">Requests (Printed):</label>
        <textarea
          style={styles.textarea}
          id="requests"
          name="requests"
          rows={3}
          value={form.requests}
          onChange={onChange}
          placeholder="Enter requests"
        />

        <label style={styles.label} htmlFor="otherTest">Other Test:</label>
        <input
          style={styles.input}
          type="text"
          id="otherTest"
          name="otherTest"
          value={form.otherTest}
          onChange={onChange}
          placeholder="Enter other test if applicable"
        />

        <label style={styles.label} htmlFor="clinicalDetails">Clinical Details:</label>
        <textarea
          style={styles.textarea}
          id="clinicalDetails"
          name="clinicalDetails"
          rows={3}
          value={form.clinicalDetails}
          onChange={onChange}
          placeholder="Enter clinical details"
        />

        <label style={styles.label} htmlFor="detailsForm">Details Form:</label>
        <textarea
          style={styles.textarea}
          id="detailsForm"
          name="detailsForm"
          rows={3}
          value={form.detailsForm}
          onChange={onChange}
          placeholder="Enter additional details"
        />

        <label style={styles.checkbox}>
          <input
            type="checkbox"
            name="addEntry"
            checked={form.addEntry}
            onChange={onChange}
          />
          Add Entry
        </label>

        <label style={styles.label} htmlFor="dueDate">Due Date:</label>
        <input
          style={styles.input}
          type="date"
          id="dueDate"
          name="dueDate"
          value={form.dueDate}
          onChange={onChange}
        />

        <div style={styles.buttonContainer}>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"}
          >
            Submit Radiology Request
          </button>
        </div>
      </form>
    </div>
  );
}


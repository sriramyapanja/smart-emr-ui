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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Patient form submitted! (not yet connected to backend)");
  };

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
    select: {
      width: "100%", padding: 10, fontSize: 14, border: "1px solid #ccc",
      borderRadius: 5, marginTop: 5, backgroundColor: "white"
    },
    buttonContainer: { textAlign: "center", marginTop: 20 },
    button: {
      padding: "10px 20px", fontSize: 16, color: "#fff", background: "#007BFF",
      border: "none", borderRadius: 5, cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
        <h1 style={styles.h1}>Register New Patient</h1>
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

import { useState, useEffect } from "react";

export default function Appointment() {
  // Predefined list of doctors
  const doctors = [
    "Dr. Eshwar Madas, General Practitioner",
    "Dr. Geeta Krishna Tadimalla, Female General Practitioner",
    "Dr. Sheela Kachwaha, Female General Practitioner",
    "Dr. Bhadresh Patel, Male General Practitioner",
    "Dr. Paul Singh, Male General Practitioner",
    "Dr. Alagendran Kanapathippillai, Male General Practitioner"
  ];

  const [form, setForm] = useState({
    patient_name: "",
    patient_email: "",
    doctor_name: "",
    appointment_date: "",
    appointment_time: ""
  });

  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    // Generate time slots when component mounts
    const times = generateTimeSlots();
    setAvailableTimes(times);
  }, []);

  const generateTimeSlots = () => {
    const times = [];
    let startTime = 9 * 60; // 9:00 AM in minutes
    let endTime = 17 * 60; // 5:00 PM in minutes

    for (let time = startTime; time < endTime; time += 15) {
      let hours = Math.floor(time / 60);
      let minutes = time % 60;
      let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      times.push(formattedTime);
    }
    return times;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    
    // Check availability when doctor or date changes
    if (name === "doctor_name" || name === "appointment_date") {
      checkAvailability(name === "doctor_name" ? value : form.doctor_name, 
                        name === "appointment_date" ? value : form.appointment_date);
    }
  };

  const checkAvailability = (doctor, date) => {
    if (!doctor || !date) return;
    
    // For now, just keep all time slots available
    // Later, you'll fetch from your backend:
    // fetch(`/checkAvailability?doctor=${doctor}&date=${date}`)
    //   .then(response => response.json())
    //   .then(data => setAvailableTimes(filtered times));
    
    console.log("Checking availability for:", doctor, date);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment form:", form);
    alert("Appointment booking submitted! (Backend wiring comes next)");
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
    select: {
      width: "100%",
      padding: 10,
      fontSize: 14,
      border: "1px solid #ccc",
      borderRadius: 5,
      marginTop: 5,
      backgroundColor: "white"
    },
    buttonContainer: { textAlign: "center", marginTop: 20 },
    button: {
      width: "100%",
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
      <h1 style={styles.h1}>Appointment Booking</h1>
      <form onSubmit={onSubmit}>
        <label style={styles.label} htmlFor="patient_name">Patient Name:</label>
        <input
          style={styles.input}
          type="text"
          id="patient_name"
          name="patient_name"
          value={form.patient_name}
          onChange={onChange}
          required
          placeholder="Enter Patient Name"
        />

        <label style={styles.label} htmlFor="patient_email">Patient Email:</label>
        <input
          style={styles.input}
          type="email"
          id="patient_email"
          name="patient_email"
          value={form.patient_email}
          onChange={onChange}
          required
          placeholder="Enter Patient Email"
        />

        <label style={styles.label} htmlFor="doctor_name">Doctor Name:</label>
        <select
          style={styles.select}
          id="doctor_name"
          name="doctor_name"
          value={form.doctor_name}
          onChange={onChange}
          required
        >
          <option value="">Select a Doctor</option>
          {doctors.map((doctor, index) => (
            <option key={index} value={doctor}>
              {doctor}
            </option>
          ))}
        </select>

        <label style={styles.label} htmlFor="appointment_date">Appointment Date:</label>
        <input
          style={styles.input}
          type="date"
          id="appointment_date"
          name="appointment_date"
          value={form.appointment_date}
          onChange={onChange}
          required
        />

        <label style={styles.label} htmlFor="appointment_time">Appointment Time:</label>
        <select
          style={styles.select}
          id="appointment_time"
          name="appointment_time"
          value={form.appointment_time}
          onChange={onChange}
          required
        >
          <option value="">Select a time</option>
          {availableTimes.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>

        <div style={styles.buttonContainer}>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"}
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
}



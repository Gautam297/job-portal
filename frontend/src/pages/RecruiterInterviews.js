import React, { useEffect, useState } from "react";
import axios from "axios";

const RecruiterInterviews = () => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/interviews",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInterviews(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        Recruiter Interview Dashboard
      </h2>

      {interviews.length === 0 ? (
        <div style={styles.emptyBox}>
          No interviews scheduled.
        </div>
      ) : (
        <div style={styles.grid}>
          {interviews.map((interview) => (
            <div
              key={interview._id}
              style={styles.card}
            >
              <h3 style={styles.name}>
                👤 {interview.candidate?.name}
              </h3>

              <p style={styles.info}>
                📧 {interview.candidate?.email}
              </p>

              <p style={styles.info}>
                📅 {interview.date}
              </p>

              <p style={styles.info}>
                ⏰ {interview.time}
              </p>

              <span
                style={{
                  ...styles.status,
                  backgroundColor:
                    interview.status === "Scheduled"
                      ? "#e3f2fd"
                      : interview.status === "Completed"
                      ? "#e8f5e9"
                      : "#ffebee",
                  color:
                    interview.status === "Scheduled"
                      ? "#1976d2"
                      : interview.status === "Completed"
                      ? "#2e7d32"
                      : "#d32f2f",
                }}
              >
                {interview.status}
              </span>

              <a
                href={interview.meetingLink}
                target="_blank"
                rel="noreferrer"
                style={styles.button}
              >
                Open Meeting
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    minHeight: "100vh",
    background: "#f4f6f9",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "#fff",
    borderRadius: "15px",
    padding: "25px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",
    transition: "0.3s",
  },

  name: {
    marginBottom: "15px",
    color: "#222",
  },

  info: {
    margin: "10px 0",
    color: "#555",
  },

  status: {
    display: "inline-block",
    padding: "8px 15px",
    borderRadius: "20px",
    fontWeight: "600",
    marginTop: "10px",
  },

  button: {
    display: "block",
    textAlign: "center",
    marginTop: "20px",
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "600",
  },

  emptyBox: {
    textAlign: "center",
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",
  },
};

export default RecruiterInterviews;
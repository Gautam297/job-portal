import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const MyInterviews = () => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `${API_URL}/api/interviews/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInterviews(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h2
        style={{
          marginBottom: "25px",
          color: "#333",
          textAlign: "center",
        }}
      >
        My Interviews
      </h2>

      {interviews.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "30px",
            background: "#f5f5f5",
            borderRadius: "10px",
          }}
        >
          No interviews scheduled yet.
        </div>
      ) : (
        <div
          style={{
            overflowX: "auto",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "12px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#0d6efd",
                  color: "white",
                }}
              >
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Time</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Meeting</th>
              </tr>
            </thead>

            <tbody>
              {interviews.map((interview) => (
                <tr
                  key={interview._id}
                  style={{
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <td style={tdStyle}>{interview.date}</td>

                  <td style={tdStyle}>{interview.time}</td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        background: "#198754",
                        color: "#fff",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "14px",
                      }}
                    >
                      {interview.status}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <a
                      href={interview.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        textDecoration: "none",
                        background: "#0d6efd",
                        color: "#fff",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        fontWeight: "500",
                      }}
                    >
                      Join Meeting
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const thStyle = {
  padding: "16px",
  textAlign: "left",
};

const tdStyle = {
  padding: "18px",
};

export default MyInterviews;
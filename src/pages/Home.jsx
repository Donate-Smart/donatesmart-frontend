import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
const [cases, setCases] = useState([]);

useEffect(() => {
  const fetchCases = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cases");
      setCases(res.data);
    } catch (err) {
      console.error("Error fetching cases:", err.response?.data || err.message);
    }
  };

  fetchCases();
}, []);



  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Available Donation Cases</h1>

      <div style={styles.grid}>
        {cases.map((item) => (
          <div key={item._id} style={styles.card}>
            <h2 style={styles.cardTitle}>{item.title}</h2>

            <p style={styles.category}>Category: {item.category}</p>

            <p style={styles.summary}>{item.summary}</p>

            <p style={styles.donations}>
              Donations: <span style={{ fontWeight: "bold" }}>{item.donations}</span>
            </p>

            <button
              style={styles.button}
              onClick={() => navigate(`/case/${item._id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "26px",
    fontWeight: "bold",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "25px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "15px",
    padding: "20px",
    background: "#fff",
    boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    marginBottom: "10px",
    color: "#222",
  },
  category: {
    color: "#3498db",
    marginBottom: "6px",
    fontWeight: 500,
  },
  summary: {
    margin: "10px 0",
    color: "#444",
  },
  donations: {
    marginBottom: "15px",
    color: "#555",
  },
  button: {
    padding: "10px 15px",
    background: "#34a6db",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold",
  },
};

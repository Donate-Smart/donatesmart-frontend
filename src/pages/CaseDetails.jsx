import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CaseDetails() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await axios.get(`/api/cases/${id}`);
        setCaseData(res.data);
      } catch (err) {
        console.error(
          "Error fetching case:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [id]);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Loading case details...
      </h2>
    );
  }

  if (!caseData) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Case not found.
      </h2>
    );
  }
  console.log("Image name:", caseData.image);

  return (
    <div style={styles.container}>
      <img
        src={
          caseData.image
            ? `http://localhost:5000/uploads/${caseData.image}`
            : "https://via.placeholder.com/900x300?text=No+Image"
        }
        alt="Case"
        style={styles.image}
      />

      <h1 style={styles.title}>{caseData.title}</h1>

      <p style={styles.category}>Category: {caseData.category}</p>

      <p style={styles.summary}>{caseData.summary}</p>

      <div style={styles.infoBox}>
        <p>
          <strong>Target:</strong> ${caseData.target}
        </p>
        <p>
          <strong>Donations so far:</strong> ${caseData.donations}
        </p>
        <p>
          <strong>Status:</strong> {caseData.status}
        </p>
      </div>

      <button style={styles.button}>Donate Now</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  category: {
    color: "#3498db",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  summary: {
    fontSize: "16px",
    color: "#444",
    lineHeight: "1.5",
    marginBottom: "30px",
  },
  infoBox: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#f9f9f9",
    marginBottom: "30px",
  },
  button: {
    padding: "12px 25px",
    background: "#34a6db",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

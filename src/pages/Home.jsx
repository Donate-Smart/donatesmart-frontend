import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // --- Mock Data (لحد ما يجهز الباك) ---
  const cases = [
    {
      id: 1,
      title: "Help a Family Affected by Fire",
      summary: "A family lost their home due to a fire and needs immediate support.",
      category: "Emergency",
      donations: 12,
    },
    {
      id: 2,
      title: "Support an Orphan's Education",
      summary: "Help a young student cover school fees and continue their education.",
      category: "Education",
      donations: 5,
    },
    {
      id: 3,
      title: "Medical Aid for Elderly Woman",
      summary: "An elderly woman needs help buying medications and covering treatment costs.",
      category: "Medical",
      donations: 7,
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Available Donation Cases</h1>

      <div style={styles.grid}>
        {cases.map((item) => (
          <div key={item.id} style={styles.card}>
            <h2 style={styles.cardTitle}>{item.title}</h2>

            <p style={styles.category}>Category: {item.category}</p>

            <p style={styles.summary}>{item.summary}</p>

            <p style={styles.donations}>
              Donations: <span style={{ fontWeight: "bold" }}>{item.donations}</span>
            </p>

            <button
              style={styles.button}
              onClick={() => navigate(`/case/${item.id}`)}
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

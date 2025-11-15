import { useParams } from "react-router-dom";

export default function CaseDetails() {
  const { id } = useParams();

  // --- Mock Data (نفس القضايا من Home) ---
  const cases = [
    {
      id: 1,
      title: "Help a Family Affected by Fire",
      summary:
        "A family lost their home due to a sudden fire accident. They need urgent support for temporary housing, food supplies, and basic necessities.",
      category: "Emergency",
      target: 2000,
      donations: 950
    },
    {
      id: 2,
      title: "Support an Orphan's Education",
      summary:
        "This young student is in danger of losing access to school due to financial difficulties. Donations will go towards school fees and educational materials.",
      category: "Education",
      target: 1200,
      donations: 300
    },
    {
      id: 3,
      title: "Medical Aid for Elderly Woman",
      summary:
        "An elderly woman requires continuous medical care and medication. Donations will help cover treatment costs and essential medical supplies.",
      category: "Medical",
      target: 1500,
      donations: 700
    }
  ];

  const caseData = cases.find((item) => item.id === Number(id));

  if (!caseData) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Case not found.</h2>;
  }

  return (
    <div style={styles.container}>
      {/* صورة افتراضية */}
      <img
        src="https://via.placeholder.com/900x300?text=Case+Image"
        alt="Case"
        style={styles.image}
      />

      <h1 style={styles.title}>{caseData.title}</h1>

      <p style={styles.category}>Category: {caseData.category}</p>

      <p style={styles.summary}>{caseData.summary}</p>

      <div style={styles.infoBox}>
        <p><strong>Target:</strong> ${caseData.target}</p>
        <p><strong>Donations so far:</strong> ${caseData.donations}</p>
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

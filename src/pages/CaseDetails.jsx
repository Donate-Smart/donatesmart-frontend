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

  const imageSrc = caseData.image
    ? `http://localhost:5000/uploads/${caseData.image}`
    : "https://via.placeholder.com/900x300?text=No+Image";

  const goal = Number(caseData.target) || 0;
  const raised = Number(caseData.donations) || 0;
  const progress =
    goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

  const description = caseData.description || caseData.summary || "";

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* LEFT SIDE: Image + Text */}
          <div style={styles.leftColumn}>
            {/* Image card */}
            <div style={styles.card}>
              <img src={imageSrc} alt={caseData.title} style={styles.image} />
            </div>

            {/* Title + short info */}
            <div style={styles.card}>
              <div style={styles.titleRow}>
                <h1 style={styles.title}>{caseData.title}</h1>
                {caseData.category && (
                  <span style={styles.badge}>{caseData.category}</span>
                )}
              </div>
              {caseData.summary && (
                <p style={styles.shortDescription}>{caseData.summary}</p>
              )}
            </div>

            {/* Full Story / Description */}
            {description && (
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>Full Story</h3>
                <p style={styles.fullStory}>{description}</p>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Progress + Donate */}
          <div style={styles.rightColumn}>
            {/* Progress / Donation box */}
            <div style={styles.card}>
              <div style={styles.progressTop}>
                <div>
                  <div style={styles.raisedText}>
                    ${raised.toLocaleString()}
                  </div>
                  <div style={styles.goalText}>
                    raised of ${goal.toLocaleString()} goal
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={styles.progressWrapper}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${progress}%`,
                  }}
                />
              </div>

              <div style={styles.progressLabelRow}>
                <span style={styles.progressPercent}>{progress}% funded</span>
              </div>

              {/* Donate button */}
              <button style={styles.donateButton}>Donate Now</button>
            </div>

            {/* Info box (اختياري، بسيط) */}
            <div style={styles.card}>
              <h3 style={styles.sectionTitle}>Case Information</h3>
              <p style={styles.infoText}>
                <strong>Goal:</strong> ${goal.toLocaleString()}
              </p>
              <p style={styles.infoText}>
                <strong>Donations so far:</strong> ${raised.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F5F7FA",
    padding: "30px 16px",
    marginTop: "90px"
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  grid: {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  leftColumn: {
    flex: 2,
    minWidth: "280px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  rightColumn: {
    flex: 1,
    minWidth: "260px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  card: {
    background: "#FFFFFF",
    borderRadius: "24px",
    padding: "20px",
    boxShadow:
      "12px 12px 24px rgba(0,0,0,0.08), -12px -12px 24px rgba(255,255,255,0.9)",
  },
  image: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
    borderRadius: "20px",
  },
  titleRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#2D3748",
    flex: 1,
  },
  badge: {
    background: "#7FDB34",
    color: "#FFFFFF",
    borderRadius: "999px",
    padding: "6px 14px",
    fontSize: "13px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  shortDescription: {
    fontSize: "14px",
    color: "#718096",
    lineHeight: 1.6,
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: "10px",
  },
  fullStory: {
    fontSize: "14px",
    color: "#718096",
    lineHeight: 1.7,
    whiteSpace: "pre-line",
  },

  // Progress / Donation
  progressTop: {
    marginBottom: "16px",
  },
  raisedText: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#7FDB34",
    marginBottom: "4px",
  },
  goalText: {
    fontSize: "14px",
    color: "#718096",
  },
  progressWrapper: {
    width: "100%",
    height: "14px",
    borderRadius: "999px",
    background: "#E2E8F0",
    overflow: "hidden",
    marginTop: "8px",
  },
  progressFill: {
    height: "100%",
    background:
      "linear-gradient(90deg, #7FDB34 0%, #6BC428 100%)",
    transition: "width 0.4s ease",
  },
  progressLabelRow: {
    marginTop: "8px",
    display: "flex",
    justifyContent: "flex-end",
  },
  progressPercent: {
    fontSize: "13px",
    color: "#718096",
  },
  donateButton: {
    marginTop: "18px",
    width: "100%",
    padding: "14px",
    borderRadius: "18px",
    border: "none",
    background:
      "linear-gradient(90deg, #7FDB34 0%, #6BC428 100%)",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(127,219,52,0.35)",
  },
  infoText: {
    fontSize: "14px",
    color: "#4A5568",
    marginBottom: "6px",
  },
};

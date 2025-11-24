import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const navigate = useNavigate();
  
  const currentUser = useSelector((state) => state.user.currentUser);

  const [myCases, setMyCases] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }

    // ❗ لا نحمل الحالات إذا كان Admin
    if (currentUser.role === "admin") return;

    const fetchCases = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/cases/my-cases", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMyCases(res.data);
      } catch (err) {
        console.error("Error fetching cases:", err.response?.data || err.message);
      }
    };

    fetchCases();
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Profile</h2>

      <div style={styles.card}>
        <p>
          <strong>Name:</strong> {currentUser.name}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>

        <div style={styles.buttons}>
          <button style={styles.editBtn} onClick={() => {
            navigate("/profile-edit");
          }}>Edit Profile</button>
        </div>
      </div>

      {/* 🔥 My Cases — يظهر فقط إذا كان المستخدم NOT admin */}
      {currentUser.role !== "admin" && (
        <>
          <h3 style={styles.sectionTitle}>My Cases</h3>

          <div style={styles.casesList}>
            {myCases.length === 0 ? (
              <p style={styles.noCases}>You haven't added any cases yet.</p>
            ) : (
              myCases.map((c) => (
                <div key={c._id} style={styles.caseCard}>
                  <h4 style={styles.caseTitle}>{c.title}</h4>
                  <p>
                    <strong>Category:</strong> {c.category}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        color: c.status === "Approved" ? "green" : "#e67e22",
                        fontWeight: "bold",
                      }}
                    >
                      {c.status}
                    </span>
                  </p>

                  <button
                    style={styles.viewBtn}
                    onClick={() => navigate(`/case/${c._id}`)}
                  >
                    View Case
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: "bold",
  },
  sectionTitle: {
    marginTop: "35px",
    marginBottom: "15px",
    fontSize: "22px",
    fontWeight: "bold",
  },
  card: {
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    background: "#fafafa",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    fontSize: "17px",
  },
  buttons: {
    marginTop: "25px",
    display: "flex",
    gap: "10px",
  },
  editBtn: {
    flex: 1,
    padding: "12px",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  logoutBtn: {
    flex: 1,
    padding: "12px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  casesList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  caseCard: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    background: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
  },
  caseTitle: {
    fontSize: "20px",
    marginBottom: "8px",
    fontWeight: "bold",
  },
  viewBtn: {
    marginTop: "10px",
    padding: "10px",
    background: "#34a6db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  noCases: {
    fontStyle: "italic",
    color: "#777",
  },
};

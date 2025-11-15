import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";
import { useEffect } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  // حالات مؤقتة لعرض My Cases لحين ربط الـ Backend
  const myCases = [
    {
      id: 1,
      title: "Emergency Treatment for Child",
      category: "Medical",
      status: "Approved",
    },
    {
      id: 2,
      title: "Help a Family Rebuild Their Home",
      category: "Emergency",
      status: "Pending",
    },
  ];

  // لو المستخدم مش مسجل → نرجعه للـ Login
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

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
          <button style={styles.editBtn}>Edit Profile</button>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* My Cases */}
      <h3 style={styles.sectionTitle}>My Cases</h3>

      <div style={styles.casesList}>
        {myCases.length === 0 ? (
          <p style={styles.noCases}>You haven't added any cases yet.</p>
        ) : (
          myCases.map((c) => (
            <div key={c.id} style={styles.caseCard}>
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
                onClick={() => navigate(`/case/${c.id}`)}
              >
                View Case
              </button>
            </div>
          ))
        )}
      </div>
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

  /** MY CASES */
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

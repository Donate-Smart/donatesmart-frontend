import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminPanel() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  // 🔐 حماية الصفحة
  useEffect(() => {
    if (!currentUser) {
      navigate("/login"); // لو مش مسجل دخول
    } else if (currentUser.role !== "admin") {
      navigate("/"); // لو مش Admin
    }
  }, [currentUser, navigate]);

  // Dummy cases
  const [cases, setCases] = useState([
    {
      id: 1,
      title: "Child Needs Surgery",
      category: "Medical",
      status: "Pending",
    },
    {
      id: 2,
      title: "Help Rebuild Home",
      category: "Emergency",
      status: "Pending",
    },
    {
      id: 3,
      title: "Support Education for 3 Kids",
      category: "Education",
      status: "Approved",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const deleteCase = (id) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Panel</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Case Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {cases.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.title}</td>
              <td>{c.category}</td>
              <td>
                <strong
                  style={{
                    color:
                      c.status === "Approved"
                        ? "green"
                        : c.status === "Rejected"
                        ? "red"
                        : "#e67e22",
                  }}
                >
                  {c.status}
                </strong>
              </td>
              <td>
                <button
                  style={styles.approve}
                  onClick={() => updateStatus(c.id, "Approved")}
                >
                  Approve
                </button>

                <button
                  style={styles.reject}
                  onClick={() => updateStatus(c.id, "Rejected")}
                >
                  Reject
                </button>

                <button
                  style={styles.delete}
                  onClick={() => deleteCase(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  approve: {
    background: "green",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "6px",
    marginRight: "5px",
    cursor: "pointer",
  },
  reject: {
    background: "#e67e22",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "6px",
    marginRight: "5px",
    cursor: "pointer",
  },
  delete: {
    background: "#e74c3c",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

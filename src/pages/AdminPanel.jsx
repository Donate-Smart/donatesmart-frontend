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
  navigate("/");
}
  }, [currentUser, navigate]);

  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/pending-cases", {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        const data = await res.json();
        setCases(data);
      } catch (err) {
        console.error("Error fetching cases:", err);
      }
    };

   if (currentUser?.role === "admin") {
  fetchCases();
}

  }, [currentUser]);

  const updateStatus = async (id, newStatus) => {
    try {
      const endpoint =
        newStatus === "approved"
          ? `http://localhost:5000/api/admin/approve-case/${id}`
          : `http://localhost:5000/api/admin/reject-case/${id}`;

      await fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      setCases((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const deleteCase = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/admin/delete-case/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setCases((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting case:", err);
    }
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
            <tr key={c._id}>
              <td>{c._id}</td>
              <td>{c.title}</td>
              <td>{c.category}</td>
              <td>
                <strong
                  style={{
                    color:
                      c.status === "approved"
                        ? "green"
                        : c.status === "rejected"
                        ? "red"
                        : "#e67e22",
                  }}
                >
                  {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                </strong>
              </td>
              <td>
                <button
                  style={styles.approve}
                  onClick={() => updateStatus(c._id, "approved")}
                >
                  Approve
                </button>

                <button
                  style={styles.reject}
                  onClick={() => updateStatus(c._id, "rejected")}
                >
                  Reject
                </button>

                <button style={styles.delete} onClick={() => deleteCase(c._id)}>
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

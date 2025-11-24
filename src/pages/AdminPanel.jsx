import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("dashboard");

  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [cases, setCases] = useState([]);

  // حماية الأدمن
  useEffect(() => {
    if (!currentUser) navigate("/");
    else if (currentUser.role !== "admin") navigate("/home");
  }, [currentUser, navigate]);

  // جلب الإحصائيات (Dashboard)
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(
          "/api/admin/analytics",
          { headers: { Authorization: `Bearer ${token}` },}
        );
        console.log("analatycs:");
        console.log(res.data);
        setAnalytics(res.data || []);
      } catch (err) {
        console.log("Analytics error:", err);
      }
    };
    if (currentUser?.role === "admin") fetchAnalytics();
  }, [currentUser]);

  // جلب المستخدمين
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "/api/admin/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("users:");
        console.log(res.data);
        setUsers(res.data || []);
      } catch (err) {
        console.log("Users error:", err);
      }
    };

    if (currentUser?.role === "admin") fetchUsers();
  }, [currentUser]);

  // جلب الحالات
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get(
          "api/admin/pending-cases",
          { headers: { Authorization: `Bearer ${token}` },}
        );
        console.log("cases");
        console.log(res.data);
        setCases(res.data || {});
      } catch (err) {
        console.error("Cases error:", err);
      }
    };

    if (currentUser?.role === "admin") fetchCases();
  }, [currentUser]);

  // تحديث الحالة (Approve / Reject)
  const updateStatus = async (id, newStatus) => {
    try {
      const endpoint =
        newStatus === "approved"
          ? `api/admin/approve-case/${id}`
          : `api/admin/reject-case/${id}`;

      await axios.put(
        endpoint,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCases(prev =>
        prev.map(c =>
          c._id === id ? { ...c, status: newStatus } : c
        )
      );
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  // حذف الحالة
  const deleteCase = async (id) => {
    try {
      await axios.delete(
        `/api/admin/delete-case/${id}`,
        { headers: { Authorization: `Bearer ${token}` }, }
      );

      setCases(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Panel</h2>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          onClick={() => setActiveTab("dashboard")}
          style={activeTab === "dashboard" ? styles.activeTab : styles.tab}
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab("users")}
          style={activeTab === "users" ? styles.activeTab : styles.tab}
        >
          Users
        </button>

        <button
          onClick={() => setActiveTab("cases")}
          style={activeTab === "cases" ? styles.activeTab : styles.tab}
        >
          Cases
        </button>
      </div>

      {/* Dashboard */}
      {activeTab === "dashboard" && (
        <div style={styles.analyticsCards}>
          {analytics ? (
            <>
              <div style={styles.card}>
                <h3>Total Users</h3>
                <p>{analytics.totalUsers}</p>
              </div>

              <div style={styles.card}>
                <h3>Total Cases</h3>
                <p>{analytics.totalCases}</p>
              </div>

              <div style={styles.card}>
                <h3>Total Donations</h3>
                <p>${analytics.totalDonations}</p>
              </div>
            </>
          ) : (
            <p>Loading analytics...</p>
          )}
        </div>
      )}

      {/* USERS TABLE */}
      {activeTab === "users" && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} style={styles.tr}>
                <td style={styles.td}>{u._id}</td>
                <td style={styles.td}>{u.name}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* CASES TABLE */}
      {activeTab === "cases" && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Case Title</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {cases?.length && cases.map((c) => (
              <tr key={c._id} style={styles.tr}>
                <td style={styles.td}>{c._id}</td>
                <td style={styles.td}>{c.title}</td>
                <td style={styles.td}>{c.category}</td>
                <td style={styles.td}>{c.status}</td>

                <td style={styles.td}>
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

                  <button
                    style={styles.delete}
                    onClick={() => deleteCase(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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

  /* TABS */
  tabs: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  tab: {
    padding: "8px 14px",
    background: "#ddd",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  activeTab: {
    padding: "8px 14px",
    background: "#7fdb34",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },

  /* DASHBOARD CARDS */
  analyticsCards: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    flex: 1,
    background: "#f2f2f2",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "6px 10px rgba(0,0,0,0.1)", 
    border: "1px solid gray",
  },

  /* TABLES */
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
    borderRadius: "9px",
  },
  th: {
    padding: "10px",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "15px",
    border: "1px solid #000000ff",
  },
  td: {
    padding: "12px",
    fontSize: "14px",
    color: "#000000ff",
    border: "1px solid #000000ff",
  },

  /* BUTTONS */
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
    background: "orange",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "6px",
    marginRight: "5px",
    cursor: "pointer",
  },
  delete: {
    background: "red",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

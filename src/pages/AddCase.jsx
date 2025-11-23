import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function AddCase() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  // 🔐 حماية الصفحة
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("summary", summary);
    formData.append("image", image); // actual file
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cases",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Submitted case:", res.data);
      alert("Case submitted successfully!");
      navigate("/profile"); // go to home page
    } catch (err) {
      console.error(
        "Error submitting case:",
        err.response?.data || err.message
      );
      alert("Failed to submit case.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add a New Case</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Case Title"
          style={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Case Description"
          style={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <select
          style={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Education">Education</option>
          <option value="Medical">Medical</option>
          <option value="Emergency">Emergency</option>
          <option value="Food">Food</option>
          <option value="Housing">Housing</option>
        </select>

        <input
          type="file"
          style={styles.file}
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          type="button"
          style={styles.aiButton}
          onClick={() => setSummary("AI summary will appear here…")}
        >
          Generate Summary with AI
        </button>

        {summary && (
          <div style={styles.summaryBox}>
            <h3>AI Summary:</h3>
            <p>{summary}</p>
          </div>
        )}

        <button type="submit" style={styles.submitButton}>
          Submit Case
        </button>
        
      </form>
    </div>
    
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "14px",
    border: "1px solid #ccc",
    borderRadius: "10px",
  },
  textarea: {
    padding: "14px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    height: "120px",
  },
  select: {
    padding: "14px",
    border: "1px solid #ccc",
    borderRadius: "10px",
  },
  file: {
    padding: "10px",
  },
  aiButton: {
    padding: "12px",
    background: "#33b921",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  summaryBox: {
    padding: "15px",
    borderRadius: "10px",
    background: "#f3f3f3",
  },
  submitButton: {
    padding: "14px",
    background: "#34a6db",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

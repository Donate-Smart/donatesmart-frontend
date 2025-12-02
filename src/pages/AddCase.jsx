import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddCase() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [goal, setGoal] = useState(1000);
  const [image, setImage] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);

  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  // حماية الصفحة
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleGenerateAI = () => {
    if (!title) return;
    setIsGenerating(true);

    setTimeout(() => {
      setSummary(
        `This case aims to ${title.toLowerCase() || "support a charitable cause"}. The initiative focuses on providing essential resources and support to those in need. With your contribution, we can make a meaningful difference in the lives of people who need it most. Every donation helps us get closer to our goal and creates a lasting positive impact in the community.`
      );
      setIsGenerating(false);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("goal", goal);
    formData.append("category", category);
    formData.append("summary", summary);
    if (image) formData.append("image", image);
    try {
      const res = await axios.post("/api/cases", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Submitted case:", res.data);
      toast.success("Case submitted successfully!");
      navigate("/profile");
    } catch (err) {
      console.error(
        "Error submitting case:",
        err.response?.data || err.message
      );
      alert("Failed to submit case.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Page Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Start a New Case</h1>
          <p style={styles.subtitle}>
            Create a fundraising campaign to support a cause that matters to you.
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} style={styles.formCard}>
          {/* Title */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Case Title *</label>
            <input
              type="text"
              placeholder="Enter a compelling title for your case"
              style={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Category with custom arrow */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Category *</label>
            <div style={styles.selectWrapper}>
              <select
                style={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                <option value="Education">Education</option>
                <option value="Medical">Medical</option>
                <option value="Emergency">Emergency</option>
                <option value="Food">Food</option>
                <option value="Housing">Housing</option>
              </select>
              <span style={styles.arrow}>⌄</span>
            </div>
          </div>

          {/* Funding Goal */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Funding Goal ($) *</label>
            <input
              type="number"
              placeholder="10000"
              style={styles.input}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Full Description *</label>
            <textarea
              placeholder="Describe your case in detail. Explain why this cause is important, how the funds will be used, and the impact it will have."
              style={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Case Image</label>
            <div style={styles.uploadBox}>
              <input
                type="file"
                style={styles.fileInput}
                onChange={(e) => setImage(e.target.files[0])}
              />
              <p style={styles.uploadHint}>
                Click to upload or drag and drop. PNG, JPG up to 10MB.
              </p>
            </div>
          </div>

          {/* AI Summary section */}
          <div style={styles.aiSection}>
            <div style={styles.aiHeader}>
              <span style={styles.label}>AI-Generated Summary</span>
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isGenerating || !title}
                style={{
                  ...styles.aiButton,
                  opacity: isGenerating || !title ? 0.7 : 1,
                  cursor: isGenerating || !title ? "not-allowed" : "pointer",
                }}
              >
                {isGenerating ? "Generating..." : "Generate with AI"}
              </button>
            </div>

            {summary && (
              <div style={styles.summaryBox}>
                <p style={styles.summaryText}>{summary}</p>
              </div>
            )}
          </div>

          {/* Submit */}
          <button type="submit" style={styles.submitButton}>
            Submit Case for Review
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F5F7FA",
    padding: "30px 16px",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#718096",
  },
  formCard: {
    background: "#FFFFFF",
    borderRadius: "24px",
    padding: "28px 24px 32px",
    boxShadow:
      "12px 12px 24px rgba(0,0,0,0.08), -12px -12px 24px rgba(255,255,255,0.9)",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#2D3748",
  },
  input: {
    padding: "12px 14px",
    borderRadius: "16px",
    border: "2px solid #E2E8F0",
    fontSize: "14px",
    outline: "none",
  },
  textarea: {
    padding: "12px 14px",
    borderRadius: "16px",
    border: "2px solid #E2E8F0",
    fontSize: "14px",
    outline: "none",
    minHeight: "180px",
    resize: "vertical",
  },

  selectWrapper: {
    position: "relative",
    width: "100%",
  },
  select: {
    width: "100%",
    padding: "12px 14px",
    paddingRight: "40px",
    borderRadius: "16px",
    border: "2px solid #E2E8F0",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "white",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    cursor: "pointer",
  },
  arrow: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "18px",
    color: "#666",
    pointerEvents: "none",
  },

  uploadBox: {
    border: "2px dashed #CBD5E0",
    borderRadius: "18px",
    padding: "16px",
    background: "#FFFFFF",
  },
  fileInput: {
    width: "100%",
    marginBottom: "6px",
  },
  uploadHint: {
    fontSize: "12px",
    color: "#718096",
  },
  aiSection: {
    background:
      "linear-gradient(135deg, rgba(127,219,52,0.12), rgba(107,196,40,0.12))",
    borderRadius: "18px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  aiHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  aiButton: {
    padding: "10px 16px",
    borderRadius: "14px",
    border: "none",
    background:
      "linear-gradient(90deg, #7FDB34 0%, #6BC428 100%)",
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
  },
  summaryBox: {
    background: "#FFFFFF",
    borderRadius: "12px",
    border: "2px solid rgba(127,219,52,0.35)",
    padding: "12px",
  },
  summaryText: {
    fontSize: "13px",
    color: "#4A5568",
    margin: 0,
    lineHeight: 1.5,
  },
  submitButton: {
    marginTop: "10px",
    width: "100%",
    padding: "16px",
    borderRadius: "20px",
    border: "none",
    background:
      "linear-gradient(90deg, #7FDB34 0%, #6BC428 100%)",
    color: "white",
    fontWeight: "600",
    fontSize: "16px",
    boxShadow: "0 10px 24px rgba(127,219,52,0.35)",
    cursor: "pointer",
  },
};

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { imageData, analysis, error } = state || {};

  const handleRetry = () => {
    navigate("/ai");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Face Shape Results</h2>

      <p style={styles.subtitle}>
        Based on your facial features, here's what we found:
      </p>

      <div style={styles.card}>
        {/* Image */}
        {imageData && (
          <img src={imageData} alt="Your face" style={styles.image} />
        )}

        {/* Info */}
        <div style={styles.details}>
          {analysis?.["face shape"] && (
            <div style={styles.block}>
              <h3 style={styles.label}>Face Shape</h3>
              <p style={styles.resultText}>{analysis["face shape"]}</p>
            </div>
          )}

          {Array.isArray(analysis?.["facial features"]) && (
            <div style={styles.block}>
              <h3 style={styles.label}>Facial Features</h3>
              <ul style={styles.list}>
                {analysis["facial features"].map((f, i) => (
                  <li key={i} style={styles.listItem}>{f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Reasoning */}
      {analysis?.reasoning && (
        <div style={styles.reasoningBox}>
          <em>{analysis.reasoning}</em>
        </div>
      )}

      {/* Error */}
      {error && <p style={styles.error}>❌ {error}</p>}

      <button onClick={handleRetry} style={styles.button}>🔁 Try Another Photo</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "430px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "1.5rem",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
  },
  image: {
    width: "220px",
    height: "220px",
    borderRadius: "12px",
    objectFit: "cover",
    border: "2px solid #eee",
  },
  details: {
    textAlign: "left",
    width: "100%",
  },
  block: {
    marginBottom: "1rem",
  },
  label: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "0.3rem",
    color: "#333",
  },
  resultText: {
    backgroundColor: "#f5f5ff",
    padding: "0.7rem 1rem",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    color: "#5b4bff",
  },
  list: {
    listStyleType: "none",
    paddingLeft: 0,
    margin: 0,
  },
  listItem: {
    backgroundColor: "#f5f5ff",
    padding: "0.7rem 1rem",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    color: "#5b4bff",
    marginBottom: "0.5rem",
  },
  reasoningBox: {
    marginTop: "2rem",
    backgroundColor: "#f0f0ff",
    borderLeft: "4px solid #5b4bff",
    padding: "1rem",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#333",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    marginTop: "1rem",
  },
  button: {
    marginTop: "2rem",
    padding: "0.75rem 1.5rem",
    fontSize: "16px",
    backgroundColor: "#5b4bff",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(91,75,255,0.3)",
  },
};

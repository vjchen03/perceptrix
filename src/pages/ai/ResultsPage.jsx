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
      <h2>AI Face Shape Results</h2>

      <div style={styles.topSection}>
        {/* Left: Picture */}
        {imageData && (
          <img
            src={imageData}
            alt="Uploaded face"
            style={styles.image}
          />
        )}

        {/* Right: Face shape + features */}
        <div style={styles.infoBox}>
          {analysis?.["face shape"] && (
            <div style={styles.labelBox}>
              <label style={styles.label}>Face Shape</label>
              <div style={styles.labelText}>{analysis["face shape"]}</div>
            </div>
          )}

          {Array.isArray(analysis?.["facial features"]) && (
            <div style={styles.featuresBox}>
              <label style={styles.label}>Facial Features</label>
              <ul style={styles.featureList}>
                {analysis["facial features"].map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Explanation */}
      {analysis?.reasoning && (
        <div style={styles.explanation}>
          <em>{analysis.reasoning}</em>
        </div>
      )}

      {/* Error */}
      {error && <p style={styles.error}>❌ {error}</p>}

      {/* Button */}
      <button onClick={handleRetry} style={styles.button}>
        🔁 Try Again
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem 1rem",
    fontFamily: "sans-serif",
    maxWidth: "700px",
    margin: "0 auto",
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "nowrap", // 👈 prevent vertical stacking
    gap: "2rem",
    marginTop: "1.5rem",
  },
  image: {
    width: "240px",
    borderRadius: "12px",
    border: "2px solid #ccc",
    flexShrink: 0, // 👈 don't shrink image on small screens
  },
  infoBox: {
    textAlign: "left",
    minWidth: "200px",
    maxWidth: "300px",
    flexGrow: 1,
  },
  labelBox: {
    marginBottom: "1rem",
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "0.3rem",
    fontSize: "1rem",
  },
  labelText: {
    padding: "0.6rem 1rem",
    backgroundColor: "#f0f0f0",
    borderRadius: "6px",
    fontSize: "1.1rem",
  },
  featuresBox: {
    marginBottom: "1rem",
  },
  featureList: {
    backgroundColor: "#f0f0f0",
    borderRadius: "6px",
    padding: "0.8rem 1rem",
    listStyleType: "disc",
    paddingLeft: "1.5rem",
    margin: 0,
  },
  explanation: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#f8f8f8",
    borderRadius: "8px",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: "1rem",
    color: "#333",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
  button: {
    marginTop: "2rem",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#5b4bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

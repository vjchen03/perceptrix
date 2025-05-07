import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { imageUri, landmarks, error, faceRectangle } = state || {};
  const shape = landmarks ? classifyFaceShape(landmarks) : "Unknown";
  
  // Get recommendations from faceData
  const recommendations = shape && faceData[shape.toLowerCase()] 
    ? faceData[shape.toLowerCase()].recommendedGlasses 
    : [];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Face Analysis Results</h2>
      </div>
      
      <div style={styles.resultCard}>
        {imageUri && (
          <div style={styles.imageContainer}>
            <img src={imageUri} alt="Your face" style={styles.faceImage} />
          </div>
        )}
        
        {error ? (
          <div style={styles.errorContainer}>
            <div style={styles.errorIcon}>❌</div>
            <p style={styles.errorText}>{error}</p>
            <button 
              onClick={() => navigate("/ai")} 
              style={styles.tryAgainButton}
            >
              Try Again
            </button>
          </div>
        ) : (
          <div style={styles.resultsContainer}>
            <div style={styles.resultItem}>
              <span style={styles.resultLabel}>Face Shape:</span>
              <span style={styles.resultValue}>{shape}</span>
            </div>
            
            {shape !== "Unknown" && (
              <>
                <div style={styles.divider}></div>
                
                <div style={styles.recommendationsSection}>
                  <h3 style={styles.recommendationsTitle}>Recommended Frames</h3>
                  <div style={styles.recommendationsList}>
                    {recommendations.map((style, index) => (
                      <div key={index} style={styles.recommendationItem}>
                        {style}
                      </div>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate("/photo-selection")} 
                  style={styles.tryOnButton}
                >
                  Try On Glasses
                </button>
              </>
            )}
          </div>
        )}
      </div>
      
      <button 
        onClick={() => navigate("/ai")} 
        style={styles.backButton}
      >
        ← Back to Camera
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "430px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    textAlign: "center",
    marginBottom: "1.5rem",
    width: "100%",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
    margin: 0,
  },
  resultCard: {
    width: "100%",
    backgroundColor: "white",
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "300px",
    position: "relative",
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    borderRadius: "18px",
  },
  faceImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  faceOverlay: {
    position: "absolute",
    border: "2px solid #5b4bff",
    borderRadius: "8px",
    boxShadow: "0 0 0 2000px rgba(0,0,0,0.15)",
    pointerEvents: "none",
  },
  resultsContainer: {
    padding: "1.5rem 0rem",
  },
  resultItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  resultLabel: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#555",
  },
  resultValue: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#5b4bff",
    backgroundColor: "rgba(91,75,255,0.1)",
    padding: "0.25rem 0.75rem",
    borderRadius: "20px",
  },
  divider: {
    height: "1px",
    backgroundColor: "#eee",
    margin: "1.5rem 0",
  },
  recommendationsSection: {
    marginBottom: "1.5rem",
  },
  recommendationsTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "1rem",
  },
  recommendationsList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  recommendationItem: {
    backgroundColor: "#f5f5ff",
    color: "#5b4bff",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500",
    border: "1px solid #e0e0ff",
  },
  tryOnButton: {
    backgroundColor: "#5b4bff",
    color: "white",
    border: "none",
    borderRadius: "25px",
    padding: "0.75rem",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
    marginTop: "1rem",
  },
  errorContainer: {
    padding: "2rem 1.5rem",
    textAlign: "center",
  },
  errorIcon: {
    fontSize: "40px",
    marginBottom: "1rem",
  },
  errorText: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#ff4d4d",
    marginBottom: "1.5rem",
  },
  tryAgainButton: {
    backgroundColor: "#5b4bff",
    color: "white",
    border: "none",
    borderRadius: "25px",
    padding: "0.75rem 1.5rem",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  backButton: {
    backgroundColor: "#f0f0f0",
    color: "#333",
    border: "none",
    borderRadius: "25px",
    padding: "0.75rem 1.5rem",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
  },
};

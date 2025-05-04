import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { faceData } from "./facedata";

const FaceDetailPage = () => {
  const navigate = useNavigate();
  const { shape } = useParams();
  const data = faceData[shape];

  if (!data) {
    return (
      <div style={styles.wrapper}>
        <p>Face shape not found.</p>
        <button onClick={() => navigate("/info")} style={styles.backButton}>
          ← Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <button onClick={() => navigate("/info")} style={styles.backButton}>
        ← Back
      </button>

      <div style={styles.imageWrapper}>
        <img src={data.image} alt={data.title} style={styles.image} />
        <div style={styles.imageOverlay}>
          <h1 style={styles.overlayTitle}>{data.title}</h1>
        </div>
      </div>

      <div style={styles.card}>
        <p>{data.description}</p>
      </div>

      <div style={styles.card}>
        <p style={styles.subLabel}>Population Distribution</p>
        <p>{data.percentage}</p>
      </div>

      <div style={styles.card}>
        <p style={styles.subLabel}>Recommended Glasses Styles</p>
        <ul style={styles.list}>
          {data.recommendedGlasses.map((style) => (
            <li key={style}>{style}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FaceDetailPage;

const styles = {
  wrapper: {
    maxWidth: "430px",
    margin: "0 auto",
    minHeight: "100vh",
    padding : "0.5rem 1.5rem",
    fontFamily: "sans-serif",
    backgroundColor: "#fff",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: "1rem",
    backgroundColor: "#eee",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
  },
  imageWrapper: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    marginBottom: "1.5rem",
  },
  image: {
    width: "100%",
    
    objectFit: "cover",
    borderRadius: "12px",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: "1rem",
    background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
  },
  overlayTitle: {
    color: "#333",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "0.5rem",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    marginBottom: "1rem",
  },
  subLabel: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#555",
    marginBottom: "0.5rem",
  },
  list: {
    paddingLeft: "1.25rem",
    margin: 0,
  },
};
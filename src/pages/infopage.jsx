import React from "react";
import { useNavigate } from "react-router-dom";

const faceShapes = [
  { label: "Oval Face", img: "/face-shapes/oval.jpg" },
  { label: "Heart Face", img: "/face-shapes/heart.jpg" },
  { label: "Rectangle Face", img: "/face-shapes/rectangle.jpg" },
  { label: "Round Face", img: "/face-shapes/round.jpg" },
  { label: "Square Face", img: "/face-shapes/square.jpg" },
  { label: "Diamond Face", img: "/face-shapes/diamond.jpg" },
];


const InfoPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Face Gallery</h1>
      <p style={styles.subheading}>Select your face shape to find the perfect glasses</p>

      <div style={styles.grid}>
        {faceShapes.map((shape) => (
          <div
            key={shape.label}
            style={styles.card}
            onClick={() => {
              const routeKey = shape.label.split(" ")[0].toLowerCase(); // e.g., "Oval Face" → "oval"
              navigate(`/face/${routeKey}`);
            }}
          >
            <div style={styles.imageContainer}>
              <img src={shape.img} alt={shape.label} style={styles.image} />
            </div>
            <div style={styles.overlay}>
              <span style={styles.overlayText}>{shape.label}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div style={styles.infoSection}>
        <h2 style={styles.infoHeading}>How to Use</h2>
        <p style={styles.infoText}>
          Select your face shape from the gallery above to see recommended glasses styles. 
          Not sure about your face shape? Try our AI feature to analyze your face.
        </p>
      </div>
    </div>
  );
};

export default InfoPage;


const styles = {
  container: {
    padding: "1rem 0.5rem 2rem",
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "left",
    marginBottom: "0.5rem",
    color: "#000",
    paddingLeft: "0.25rem",
  },
  subheading: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "1.5rem",
    paddingLeft: "0.25rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginBottom: "2rem",
  },
  card: {
    position: "relative",
    borderRadius: "16px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    height: "200px",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
    },
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f8f8f8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "40px",
    backgroundColor: "rgba(45, 43, 67, 0.8)",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },
  infoSection: {
    backgroundColor: "#f8f8f8",
    borderRadius: "12px",
    padding: "1.25rem",
    marginTop: "0.5rem",
  },
  infoHeading: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "0.75rem",
    color: "#333",
  },
  infoText: {
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#555",
  }
};

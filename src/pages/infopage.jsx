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
    <>
      <h1 style={styles.heading}>Face Gallery</h1>

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
            <img src={shape.img} alt={shape.label} style={styles.image} />
            <div style={styles.overlay}>
              <span style={styles.overlayText}>{shape.label}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default InfoPage;


const styles = {
  heading: {
    fontSize: "35px",
    fontWeight: "700",
    textAlign: "left",
    marginBottom: "1.25rem",
    color: "#000",
    paddingLeft: "0.25rem",
    paddingBottom: "0.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  card: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "36px",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    color: "#fff",
    fontSize: "13px",
    fontWeight: "500",
  },
};

import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const faceData = {
  oval: {
    title: "Oval Face",
    description: "Oval faces are balanced and work with many hairstyles.",
    image: "/face-shapes/oval.jpg",
  },
  heart: {
    title: "Heart Face",
    description: "Heart-shaped faces are wider at the forehead and narrow at the chin.",
    image: "/face-shapes/heart.jpg",
  },
  rectangle: {
    title: "Rectangle Face",
    description: "Rectangle faces are long and angular, often with a high forehead.",
    image: "/face-shapes/rectangle.jpg",
  },
  round: {
    title: "Round Face",
    description: "Round faces have soft curves with similar width and height.",
    image: "/face-shapes/round.jpg",
  },
  square: {
    title: "Square Face",
    description: "Square faces have a strong jawline and broad forehead.",
    image: "/face-shapes/square.jpg",
  },
  diamond: {
    title: "Diamond Face",
    description: "Diamond faces are narrow at the forehead and chin with broad cheekbones.",
    image: "/face-shapes/diamond.jpg",
  },
};

const FaceDetailPage = () => {
  const { shape } = useParams();
  const navigate = useNavigate();
  const data = faceData[shape];

  if (!data) {
    return (
      <div style={styles.wrapper}>
        <h2>Face shape not found.</h2>
        <button onClick={() => navigate("/info")} style={styles.backButton}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <button onClick={() => navigate("/info")} style={styles.backButton}>← Back</button>
      <h1 style={styles.title}>{data.title}</h1>
      <img src={data.image} alt={data.title} style={styles.image} />
      <p style={styles.description}>{data.description}</p>
    </div>
  );
};

export default FaceDetailPage;

const styles = {
  wrapper: {
    maxWidth: "430px",         // iPhone width
    margin: "0 auto",
    minHeight: "100vh",
    padding: "2rem 1.5rem",
    fontFamily: "sans-serif",
    backgroundColor: "#fff",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "#333",
  },
  image: {
    width: "100%",
    maxWidth: "300px",
    borderRadius: "12px",
    marginBottom: "1.5rem",
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#555",
  },
};

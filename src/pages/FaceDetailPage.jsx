import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { faceData } from "./facedata";
import { IoMdInformationCircle } from "react-icons/io";
import { GrRobot } from "react-icons/gr";
import { RiGlassesFill } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";

const FaceDetailPage = () => {
  const navigate = useNavigate();
  const { shape } = useParams();
  const data = faceData[shape.toLowerCase()];

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
    padding: "1.5rem 1rem 100px",
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
  imageWrapper: {
    width: "100%",
    maxWidth: "250px",   // was likely 300px before
    marginBottom: "1rem",
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "12px",
  },
  card: {
    width: "100%",
    maxWidth: "350px",
    padding: "0.7rem",
    backgroundColor: "#fdfdfd",
    borderRadius: "12px",
    marginBottom: "1rem",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
    textAlign: "left",
    fontSize: "14px",
    lineHeight: "1.6",
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
  navbar: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "430px",
    backgroundColor: "#fff",
    borderTop: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-around",
    padding: "0.5rem 0 0.3rem",
    boxShadow: "0 -1px 6px rgba(0, 0, 0, 0.08)",
  },
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "12px",
    cursor: "pointer",
    gap: "2px",
  },
};
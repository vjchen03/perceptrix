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
      <div style={styles.navbar}>
        <TabButton
            icon={<IoMdInformationCircle size={24} />}
            label="Info"
            active={location.pathname === "/info"}
            onClick={() => navigate("/info")}
            />
        <TabButton
          icon={<GrRobot size={24} />}
          label="AI"
          active={location.pathname === "/ai"}
          onClick={() => navigate("/ai")}
        />
        <TabButton
          icon={<RiGlassesFill size={24} />}
          label="Try On"
          active={location.pathname === "/tryon"}
          onClick={() => navigate("/tryon")}
        />
        <TabButton
          icon={<AiOutlineUser size={24} />}
          label="Profile"
          active={location.pathname === "/profile"}
          onClick={() => navigate("/profile")}
        />
        </div>
    </div>
  );
};

export default FaceDetailPage;

const TabButton = ({ icon, label, active, onClick }) => (
    <div
      onClick={onClick}
      style={{
        ...styles.navItem,
        color: active ? "#5b4bff" : "#666",
        fontWeight: active ? "600" : "400",
      }}
    >
      <div style={{ fontSize: "20px" }}>{icon}</div>
      <div style={{ fontSize: "12px", marginTop: "4px" }}>{label}</div>
    </div>
  );  

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
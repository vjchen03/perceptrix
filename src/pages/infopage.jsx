import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdInformationCircle } from "react-icons/io"; //info icon
import { GrRobot } from "react-icons/gr"; // ai icon
import { RiGlassesFill } from "react-icons/ri"; // tryon icon
import { AiOutlineUser } from "react-icons/ai"; // profile icon

const faceShapes = [
  { label: "Oval Face", img: "/face-shapes/oval.jpg" },
  { label: "Heart Face", img: "/face-shapes/heart.jpg" },
  { label: "Rectangle Face", img: "/face-shapes/rectangle.jpg" },
  { label: "Round Face", img: "/face-shapes/round.jpg" },
  { label: "Square Face", img: "/face-shapes/square.jpg" },
  { label: "Diamond Face", img: "/face-shapes/diamond.jpg" },
];


const InfoPage = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem("selectedFaceShape");
    if (saved) setSelected(saved);
  }, []);

  const handleSelect = (label) => {
    setSelected(label);
    localStorage.setItem("selectedFaceShape", label);
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Face Gallery</h1>

      <div style={styles.grid}>
        {faceShapes.map((shape) => (
          <div
            key={shape.label}
            style={{
              ...styles.card,
              border: selected === shape.label ? "2px solid #5b4bff" : "none",
            }}
            onClick={() => {
              setSelected(shape.label);
              localStorage.setItem("selectedFaceShape", shape.label);
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

export default InfoPage;

const TabButton = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      ...styles.navItem,
      color: active ? "#5b4bff" : "#666",
      fontWeight: active ? "600" : "400",
    }}
  >
    {icon}
    <div style={{ fontSize: "12px", marginTop: "4px" }}>{label}</div>
  </div>
);

const styles = {
  wrapper: {
    maxWidth: "430px",
    margin: "0 auto",
    padding : "0 1.5rem",
    fontFamily: "sans-serif",
    backgroundColor: "#fff",
    minHeight: "100vh",
    paddingBottom: "80px",
    position: "relative",
  },
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

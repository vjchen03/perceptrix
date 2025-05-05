// src/pages/ai/LoadingPage.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoadingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const imageData = state?.imageData;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/ai/results", { state: { imageData } });
    }, 5000);

    return () => clearTimeout(timer);
  }, [imageData, navigate]);

  return (
    <div style={styles.container}>
      <div className="spinner" />
      <p style={{ marginTop: 16 }}>Analyzing your face shape...</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "sans-serif",
  },
  spinner: {
    width: 50,
    height: 50,
    border: "5px solid #ccc",
    borderTop: "5px solid #5b4bff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

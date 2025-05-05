// src/pages/ai/ResultsPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";

export default function ResultsPage() {
  const { state } = useLocation();
  const imageUri = state?.imageData;

  return (
    <div style={styles.container}>
      <h2>Results</h2>
      {imageUri ? (
        <img src={imageUri} alt="Result" style={styles.image} />
      ) : (
        <p>No image available.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    paddingTop: "2rem",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  image: {
    marginTop: "1rem",
    maxWidth: "90%",
    borderRadius: "12px",
    border: "2px solid #ccc",
  },
};

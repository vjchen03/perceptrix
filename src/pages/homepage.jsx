import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard"); // or your real route
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  return (
    <div style={styles.container}>
      <img
        src="/home/homepage-icon.jpg"
        alt="Virtual glasses illustration"
        style={styles.illustration}
      />

      <h1 style={styles.title}>Perceptrix</h1>
      <p style={styles.subtitle}>Try on virtual glasses effortlessly</p>

      <button style={styles.filledButton} onClick={() => navigate("/login")}>
        Login
      </button>

      <button style={styles.outlinedButton} onClick={() => navigate("/register")}>
        Create an account
      </button>
    </div>
  );
};

export default HomePage;

// css styles for the home page
const styles = {
  container: {
    maxWidth: "430px",
    width: "100%",
    margin: "0 auto",
    padding: "2rem",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
    backgroundColor: "white",
    textAlign: "center",
  },
  illustration: {
    width: "180px",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "0.5rem",
    color: "#000000",
  },
  subtitle: {
    fontSize: "14px",
    color: "#333333",
    marginBottom: "2rem",
  },
  filledButton: {
    backgroundColor: "#5b4bff",
    color: "white",
    border: "none",
    borderRadius: "25px",
    padding: "0.75rem 2rem",
    fontSize: "16px",
    marginBottom: "1rem",
    cursor: "pointer",
    width: "80%",
  },
  outlinedButton: {
    backgroundColor: "white",
    color: "#5b4bff",
    border: "2px solid #5b4bff",
    borderRadius: "25px",
    padding: "0.75rem 2rem",
    fontSize: "16px",
    cursor: "pointer",
    width: "80%",
  },
};

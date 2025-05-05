import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

const HomePage = () => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/info");
      } else {
        setCheckingAuth(false);
      }
    });
    return unsubscribe;
  }, [navigate]);

  if (checkingAuth) return null; 

  return (
    <div style={styles.wrapper}>
      <div style={styles.content}>
        <img
          src="/home/homepage-icon.jpg"
          alt="Virtual glasses illustration"
          style={styles.image}
        />

        <h1 style={styles.title}>Perceptrix</h1>
        <p style={styles.subtitle}>Try on virtual glasses effortlessly</p>

        <div style={styles.buttonGroup}>
          <button style={styles.filledButton} onClick={() => navigate("/login")}>
            Sign In
          </button>

          <button
            style={styles.outlinedButton}
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// css styles for home page
const styles = {
  wrapper: {
    width: "100%",
    maxWidth: "430px",
    height: "100%",
    margin: "0 auto",
    backgroundColor: "#fff",
    fontFamily: "sans-serif",
    display: "flex",
    justifyContent: "center",        
    alignItems: "center",
    padding: "2rem",
    boxSizing: "border-box",
    overflow: "auto", // Add overflow handling
    paddingTop: "4.5rem",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    maxHeight: "100%", // Ensure content doesn't exceed container
  },
  image: {
    width: "100%", // Make image responsive
    maxWidth: "400px",
    height: "auto", // Allow height to adjust proportionally
    objectFit: "contain",
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "35px",
    fontWeight: "700",
    color: "#000",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "15px",
    color: "#555",
    marginBottom: "2rem",
  },
  buttonGroup: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  filledButton: {
    backgroundColor: "#5b4bff",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    padding: "0.75rem",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
  },
  outlinedButton: {
    backgroundColor: "white",
    color: "#5b4bff",
    border: "2px solid #5b4bff",
    borderRadius: "25px",
    padding: "0.75rem",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
  },
};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) return alert("All fields required.");
    if (password !== confirmPassword) return alert("Passwords must match.");
    if (password.length < 6) return alert("Password must be 6+ characters.");

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created!");
      navigate("/info");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.topBar}>
        <button onClick={() => navigate("/")} style={styles.backButton}>
          ← Back
        </button>
      </div>

      <img
        src="/home/login-register-icon.jpg"
        alt="Register visual"
        style={styles.banner}
      />

      <div style={styles.card}>
        <h1 style={styles.title}>Register</h1>

        <form style={styles.form} onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            style={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" style={styles.filledButton} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <button onClick={() => navigate("/login")} style={styles.linkButton}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;

// css styles for register page
const styles = {
  wrapper: {
    width: "100%",
    maxWidth: "430px",
    margin: "0 auto",
    height: "100%",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "sans-serif",
    paddingTop: "1.5rem"
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.5rem 0rem 0.5rem",
    fontSize: "16px",
    fontWeight: "500",
    color: "#000",
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
  topTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    fontSize: "16px",
    marginRight: "2rem",
  },
  banner: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    padding: "2rem 1.5rem 2rem",
    boxSizing: "border-box",
    marginTop: "-10px",
    boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#000",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
  },
  input: {
    padding: "0.75rem 1rem",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "16px",
    backgroundColor: "#f9f9f9",
  },
  filledButton: {
    backgroundColor: "#5b4bff",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    padding: "0.75rem",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#007AFF",
    fontSize: "14px",
    marginTop: "1rem",
    cursor: "pointer",
  },
};

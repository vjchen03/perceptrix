import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../context/authContext";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Use useEffect for navigation instead of doing it during render
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Don't render anything if user is not authenticated
  if (!user) {
    return null; // Return null while the effect handles the redirect
  }

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Profile</h1>

      <div style={styles.card}>
        <div style={styles.profileHeader}>
          <div style={styles.avatar}>
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" style={styles.avatarImage} />
            ) : (
              <div style={styles.avatarPlaceholder}>
                {user.email ? user.email.charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </div>
          <div style={styles.userInfo}>
            <h2 style={styles.userName}>{user.displayName || "User"}</h2>
            <p style={styles.userEmail}>{user.email}</p>
          </div>
        </div>

        <div style={styles.infoSection}>
          <h3 style={styles.sectionTitle}>Account Information</h3>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Email:</span>
            <span style={styles.infoValue}>{user.email}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Account created:</span>
            <span style={styles.infoValue}>
              {user.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>

        <button onClick={handleLogout} style={styles.logoutButton}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

const styles = {
  wrapper: {
    maxWidth: "430px",
    margin: "0 auto",
    padding: "1.5rem 1rem",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    overflow: "hidden",
    marginRight: "1rem",
    backgroundColor: "#f0f0f0",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5b4bff",
    color: "white",
    fontSize: "32px",
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: "20px",
    fontWeight: "600",
    margin: 0,
    marginBottom: "0.25rem",
  },
  userEmail: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
  },
  infoSection: {
    marginBottom: "1.5rem",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "0.75rem",
    color: "#333",
  },
  infoItem: {
    display: "flex",
    marginBottom: "0.5rem",
  },
  infoLabel: {
    width: "40%",
    fontSize: "14px",
    color: "#666",
  },
  infoValue: {
    flex: 1,
    fontSize: "14px",
    fontWeight: "500",
  },
  logoutButton: {
    width: "100%",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "25px",
    padding: "0.75rem",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "1rem",
  },
};
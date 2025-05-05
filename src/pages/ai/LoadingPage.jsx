import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { analyzeFace } from "../../utils/azureFace";

export default function LoadingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const runAI = async () => {
      const imageUri = state?.imageUri;
      if (!imageUri) return;

      const results = await analyzeFace(imageUri);
      if (results?.length > 0) {
        navigate("/aicamera/results", {
          state: {
            imageUri,
            landmarks: results[0].faceLandmarks,
            faceRectangle: results[0].faceRectangle,
          },
        });
      } else {
        navigate("/aicamera/results", {
          state: {
            imageUri,
            error: "No face detected.",
          },
        });
      }
    };

    runAI();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.loadingCard}>
        <div style={styles.spinnerContainer}>
          <div style={styles.spinner}></div>
        </div>
        <h2 style={styles.title}>Analyzing Your Face</h2>
        <p style={styles.description}>
          Our AI is examining your facial features to determine your face shape...
        </p>
        <div style={styles.progressBar}>
          <div style={styles.progressFill}></div>
        </div>
        <p style={styles.tip}>
          This will help us recommend the perfect glasses for you
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    padding: "2rem",
  },
  loadingCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
  spinner: {
    width: "60px",
    height: "60px",
    border: "4px solid rgba(91,75,255,0.1)",
    borderRadius: "50%",
    borderTop: "4px solid #5b4bff",
    animation: "spin 1s linear infinite",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#333",
    margin: "0 0 1rem 0",
  },
  description: {
    fontSize: "16px",
    color: "#666",
    margin: "0 0 2rem 0",
    lineHeight: "1.5",
  },
  progressBar: {
    height: "8px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    overflow: "hidden",
    margin: "0 0 1.5rem 0",
  },
  progressFill: {
    height: "100%",
    width: "70%",
    backgroundColor: "#5b4bff",
    borderRadius: "4px",
    animation: "progress 2s ease-in-out infinite",
  },
  tip: {
    fontSize: "14px",
    color: "#888",
    margin: 0,
    fontStyle: "italic",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  "@keyframes progress": {
    "0%": { width: "10%" },
    "50%": { width: "70%" },
    "100%": { width: "90%" },
  },
};
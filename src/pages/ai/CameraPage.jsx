import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CameraPage() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const handleAnalyze = () => {
    navigate("/aicamera/loading", { state: { imageUri: image } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Face Shape Analysis</h2>
        <p style={styles.subtitle}>Discover the perfect glasses for your face shape</p>
      </div>

      <div style={styles.uploadSection}>
        {image ? (
          <div style={styles.previewContainer}>
            <img src={image} alt="preview" style={styles.previewImage} />
            <button onClick={() => setImage(null)} style={styles.changeButton}>
              Change Photo
            </button>
          </div>
        ) : (
          <div style={styles.dropzone}>
            <div style={styles.iconPlaceholder}>
              <span style={styles.cameraIcon}>📷</span>
            </div>
            <p style={styles.dropzoneText}>Upload a clear photo of your face</p>
            <label htmlFor="file-upload" style={styles.uploadButton}>
              Select Image
            </label>
          </div>
        )}
        
        <input 
          id="file-upload"
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          style={styles.fileInput} 
        />
      </div>

      {image && (
        <button onClick={handleAnalyze} style={styles.analyzeButton}>
          Analyze Face Shape
        </button>
      )}

      <div style={styles.infoBox}>
        <h3 style={styles.infoTitle}>How it works</h3>
        <p style={styles.infoText}>
          Our AI analyzes your facial features to determine your face shape and recommend the most flattering glasses styles.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "430px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
    width: "100%",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
    margin: "0 0 0.5rem 0",
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
    margin: 0,
  },
  uploadSection: {
    width: "100%",
    marginBottom: "1.5rem",
  },
  dropzone: {
    border: "2px dashed #ddd",
    borderRadius: "12px",
    padding: "2rem 1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
  },
  iconPlaceholder: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  cameraIcon: {
    fontSize: "30px",
  },
  dropzoneText: {
    margin: "0 0 1rem 0",
    color: "#666",
    textAlign: "center",
  },
  fileInput: {
    display: "none",
  },
  uploadButton: {
    backgroundColor: "#5b4bff",
    color: "white",
    border: "none",
    borderRadius: "25px",
    padding: "0.75rem 1.5rem",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    display: "inline-block",
    textAlign: "center",
  },
  previewContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    maxWidth: "300px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "1rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  changeButton: {
    backgroundColor: "transparent",
    color: "#5b4bff",
    border: "1px solid #5b4bff",
    borderRadius: "25px",
    padding: "0.5rem 1rem",
    fontSize: "14px",
    cursor: "pointer",
  },
  analyzeButton: {
    backgroundColor: "#5b4bff",
    color: "white",
    border: "none",
    borderRadius: "25px",
    padding: "0.75rem 2rem",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "1rem",
    width: "100%",
    maxWidth: "300px",
    boxShadow: "0 4px 8px rgba(91,75,255,0.3)",
  },
  infoBox: {
    backgroundColor: "#f5f5ff",
    borderRadius: "12px",
    padding: "1.25rem",
    marginTop: "2rem",
    width: "100%",
    border: "1px solid #e0e0ff",
  },
  infoTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    margin: "0 0 0.5rem 0",
  },
  infoText: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
    lineHeight: "1.5",
  }
};
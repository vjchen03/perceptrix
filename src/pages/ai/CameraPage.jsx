// src/pages/ai/CameraPage.jsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CameraPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [webcamActive, setWebcamActive] = useState(false);
  const [imageData, setImageData] = useState(null);

  const startWebcam = async () => {
    setWebcamActive(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const dataURL = canvas.toDataURL("image/jpeg");
    setImageData(dataURL);
    stopWebcam();
    navigate("/ai/loading", { state: { imageData: dataURL } });
  };

  const stopWebcam = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setWebcamActive(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataURL = reader.result;
      navigate("/ai/loading", { state: { imageData: dataURL } });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={styles.container}>
      <h2>Choose Input Method</h2>

      {!webcamActive && (
        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={startWebcam}>Use Webcam</button>
          <label style={{ ...styles.button, cursor: 'pointer' }}>
            Upload Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>
      )}

      {webcamActive && (
        <div style={styles.previewContainer}>
          <video ref={videoRef} style={styles.video} />
          <button style={styles.captureButton} onClick={takePhoto}>Take Photo</button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
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

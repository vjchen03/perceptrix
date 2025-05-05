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
    paddingTop: "2rem",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
    marginTop: "2rem",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#5b4bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    minWidth: "200px",
  },
  previewContainer: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  video: {
    width: "100%",
    maxWidth: "400px",
    borderRadius: "12px",
    border: "2px solid #ccc",
  },
  captureButton: {
    marginTop: "1rem",
    padding: "10px 18px",
    fontSize: "16px",
    backgroundColor: "#0d9488",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

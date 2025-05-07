import React, { useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

export default function PhotoSelectionPage() {
  const [photo, setPhoto] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: 'user',
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = (e) => {
      setPhoto(e.target.result);
      setCameraActive(false);
    };
    reader.readAsDataURL(file);
  };

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
    if (cameraActive) setPhoto(null);
  };

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setPhoto(imageSrc);
      setCameraActive(false);
    }
  }, []);

  const proceedToTryOn = () => {
    if (photo) {
      sessionStorage.setItem('tryOnPhoto', photo);
      navigate('/tryon');
    } else {
      alert('Please select or take a photo first');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Choose Your Photo</h2>
        <p style={styles.subtitle}>
          Find the perfect pair of glasses by trying them on virtually!
        </p>
      </div>

      <div style={styles.uploadSection}>
        {!cameraActive && !photo && (
          <>
            <div style={styles.dropzone}>
              <div style={styles.iconPlaceholder}>
                <span style={styles.cameraIcon}>📷</span>
              </div>
              <p style={styles.dropzoneText}>
                Upload a clear photo of your face or use your webcam
              </p>
            </div>

            <div style={styles.buttonGroup}>
              <label htmlFor="photo-upload" style={styles.uploadButton}>
                Select Image
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={styles.fileInput}
              />
              <button style={styles.uploadButton} onClick={toggleCamera}>
                Use Webcam
              </button>
            </div>
          </>
        )}

        {cameraActive && (
          <div style={styles.previewContainer}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              mirrored
              style={styles.previewImage}
            />
            <button onClick={capturePhoto} style={styles.analyzeButton}>
              Take Photo
            </button>
            <button onClick={toggleCamera} style={styles.changeButton}>
              Cancel
            </button>
          </div>
        )}

        {photo && (
          <div style={styles.previewContainer}>
            <img src={photo} alt="Uploaded" style={styles.previewImage} />
            <button onClick={proceedToTryOn} style={styles.analyzeButton}>
              Try On Frames →
            </button>
            <button onClick={() => setPhoto(null)} style={styles.changeButton}>
              Change Photo
            </button>
          </div>
        )}
      </div>
      <div style={styles.infoBox}>
        <h3 style={styles.infoTitle}>How it works</h3>
        <p style={styles.infoText}>
        Position your face perpendicular to the camera, about 3 feet away.
        Ensure good lighting and look directly at the camera.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '430px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
    width: '100%',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    margin: 0,
  },
  uploadSection: {
    width: '100%',
    marginBottom: '1.5rem',
  },
  dropzone: {
    border: '2px dashed #ddd',
    borderRadius: '12px',
    padding: '3.5rem 1rem',
    minHeight: '220px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  iconPlaceholder: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  cameraIcon: {
    fontSize: '30px',
  },
  dropzoneText: {
    margin: '0 0 1rem 0',
    color: '#666',
    textAlign: 'center',
  },
  fileInput: {
    display: 'none',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1.5rem',
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#5b4bff',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '0.75rem 1.5rem',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'inline-block',
    textAlign: 'center',
  },
  previewContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    maxWidth: '300px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '1rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  changeButton: {
    backgroundColor: 'transparent',
    color: '#5b4bff',
    border: '1px solid #5b4bff',
    borderRadius: '25px',
    padding: '0.5rem 1rem',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  analyzeButton: {
    backgroundColor: '#5b4bff',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '0.75rem 2rem',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '1rem',
    width: '100%',
    maxWidth: '300px',
    boxShadow: '0 4px 8px rgba(91,75,255,0.3)',
  },
  blurb: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center',
    marginTop: '0.5rem',
    padding: '0 1rem',
  },
  infoBox: {
    backgroundColor: '#f5f5ff',
    borderRadius: '12px',
    padding: '1.25rem',
    marginTop: '2rem',
    width: '100%',
    border: '1px solid #e0e0ff',
  },
  infoTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 0.5rem 0',
  },
  infoText: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
    lineHeight: '1.5',
  },
};
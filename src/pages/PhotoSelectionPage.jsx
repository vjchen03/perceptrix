import React, { useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

function PhotoSelectionPage() {
  const [photo, setPhoto] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  
  // Video constraints for the webcam
  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user"
  };
  
  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
        setCameraActive(false);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Toggle camera on/off
  const toggleCamera = () => {
    setCameraActive(!cameraActive);
    if (cameraActive) {
      setPhoto(null);
    }
  };
  
  // Capture photo from webcam
  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log("Photo captured:", imageSrc ? imageSrc.substring(0, 50) + "..." : "failed");
      setPhoto(imageSrc);
      setCameraActive(false);
    }
  }, [webcamRef]);
  
  // Proceed to try-on with the selected photo
  const proceedToTryOn = () => {
    if (photo) {
      // Store the photo in sessionStorage to pass it to the next page
      sessionStorage.setItem('tryOnPhoto', photo);
      navigate('/tryon');
    } else {
      alert('Please select or take a photo first');
    }
  };
  
  return (
    <div style={styles.photoSelectionContainer}>
      <h1 style={styles.title}>Choose Your Photo</h1>
      
      <div style={styles.photoPreviewContainer}>
        {cameraActive ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={styles.previewMedia}
            mirrored={true}
          />
        ) : photo ? (
          <img 
            src={photo} 
            alt="Selected" 
            style={styles.previewMedia} 
          />
        ) : (
          <div style={styles.placeholderBox}>
            <p>No photo selected</p>
          </div>
        )}
      </div>
      
      <div style={styles.actionButtonsContainer}>
        <input
          type="file"
          accept="image/*"
          id="photo-upload"
          onChange={handleFileUpload}
          style={styles.fileInput}
        />
        <label htmlFor="photo-upload" style={styles.actionButton}>
          Upload Photo
        </label>
        
        <button 
          onClick={toggleCamera} 
          style={{
            ...styles.actionButton,
            backgroundColor: cameraActive ? '#ff4d4d' : '#4285f4'
          }}
        >
          {cameraActive ? 'Turn Off Camera' : 'Take Photo'}
        </button>
        
        {cameraActive && (
          <button 
            onClick={capturePhoto} 
            style={styles.actionButton}
          >
            Capture
          </button>
        )}
      </div>

      {!photo && <p style={{ textAlign: 'center', color: '#666' }}>
        Position your face perpendicular to the camera, about 3 feet away. Ensure good lighting and look directly at the camera.
      </p>}
      
      {photo && (
        <div style={styles.proceedContainer}>
          <button 
            onClick={proceedToTryOn} 
            style={styles.proceedButton}
          >
            Try On Frames →
          </button>
          <button 
            onClick={() => setPhoto(null)} 
            style={styles.resetButton}
          >
            Change Photo
          </button>
        </div>
      )}
    </div>
  );
}

// Add the styles needed for this component
const styles = {
  photoSelectionContainer: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '430px',
    margin: '0 auto',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#000',
  },
  photoPreviewContainer: {
    width: '100%',
    height: '300px',
    marginBottom: '1.5rem',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewMedia: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  placeholderBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    color: '#666',
  },
  actionButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    width: '100%',
  },
  fileInput: {
    display: 'none',
  },
  actionButton: {
    backgroundColor: '#4285f4',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '0.75rem 1.25rem',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'inline-block',
    textAlign: 'center',
  },
  proceedContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
  },
  proceedButton: {
    backgroundColor: '#5b4bff',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '0.75rem',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
  },
  resetButton: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: 'none',
    borderRadius: '25px',
    padding: '0.75rem',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default PhotoSelectionPage;
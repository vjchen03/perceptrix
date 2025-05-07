import React, { useEffect, useRef, useState } from 'react';
import { getAuth } from 'firebase/auth';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-backend-webgl';
import { useNavigate, useParams } from 'react-router-dom';
import { FRAMES } from './Frames';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';

export function TryOnFramesGrid() {
  const navigate = useNavigate();
  const [userPhoto, setUserPhoto] = useState(null);
  
  useEffect(() => {
    // Get the photo from sessionStorage
    const photo = sessionStorage.getItem('tryOnPhoto');
    if (!photo) {
      // If no photo is found, redirect to photo selection page
      navigate('/photo-selection');
    } else {
      setUserPhoto(photo);
    }
  }, [navigate]);

  return (
    <div>
      <h1 style={styles.title}>Glasses Try On</h1>
      <div style={styles.grid}>
        {FRAMES.map((frame) => (
          <div
            key={frame.name}
            style={styles.card}
            onClick={() => navigate('/tryon/' + frame.name.toLowerCase())} // Navigate to the tryon page with the frame name
          >
            <img
              src={frame.image}
              alt={frame.name}
              style={styles.image}
            />
            <div style={styles.overlay}>
              <p style={styles.glassesName}>{frame.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TryOnFrame() {
  const [isSaved, setIsSaved] = React.useState(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const frame = useParams().frame;
  const frameObject = FRAMES.find((f) => f.name.toLowerCase() === frame.toLowerCase());
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    // Get the photo from sessionStorage
    const photo = sessionStorage.getItem('tryOnPhoto');
    if (!photo) {
      // If no photo is found, redirect to photo selection page
      navigate('/photo-selection');
    } else {
      setUserPhoto(photo);
    }
  }, [navigate]);

  useEffect(() => {
    // if isSaved is true store image in firebase, with the frame name as the ID, to be displayed on profile section. otherwise delete it from firebase
    const saveImage = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.error('User not authenticated');
        return;
      }
      if (isSaved) {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL('image/jpeg');
        const blob = await (await fetch(dataUrl)).blob();
        const userPath = `users/${user.uid}/images/${frameObject.name}.jpg`;
        const storage = getStorage();
        const storageRef = ref(storage, userPath);
        
        uploadBytes(storageRef, blob).then(() => {
          console.log('Image saved successfully!');
        }).catch((error) => {
          console.error('Error saving image:', error);
        });
      } else if (isSaved === false) {
        const storage = getStorage();
        const storageRef = ref(storage, `users/${user.uid}/images/${frameObject.name}.jpg`);

        deleteObject(storageRef).then(() => {
          console.log('Image deleted successfully!');
        }).catch((error) => {
          console.error('Error deleting image:', error);
        });
      }
    }
    saveImage();
  }, [isSaved]);

  useEffect(() => {
    if (!userPhoto || !frameObject) return;
    
    const drawGlassesOnCanvas = async () => {
      setIsProcessing(true);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const faceImage = new Image();
      faceImage.src = userPhoto;

      const glassesImage = new Image();
      glassesImage.src = frameObject.image;

      await Promise.all([
        new Promise((resolve) => (faceImage.onload = resolve)),
        new Promise((resolve) => (glassesImage.onload = resolve)),
      ]);

      canvas.width = faceImage.width;
      canvas.height = faceImage.height;
      ctx.drawImage(faceImage, 0, 0, canvas.width, canvas.height);

      const detector = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        { runtime: 'tfjs', solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh' }
      );

      const predictions = await detector.estimateFaces(faceImage);

      if (predictions.length > 0) {
        const keypoints = predictions[0].keypoints;

        // Use the left and right temple keypoints for head width
        const leftTemple = keypoints[234];
        const rightTemple = keypoints[454];

        // Calculate the head width (distance between temples)
        const headWidth = Math.hypot(
          rightTemple.x - leftTemple.x,
          rightTemple.y - leftTemple.y
        );

        // Calculate the center of the nose bridge
        const centerX = (rightTemple.x + leftTemple.x) / 2;
        const centerY = (rightTemple.y + leftTemple.y) / 2;

        // Calculate the angle of the head (line between temples)
        const angle = Math.atan2(
          rightTemple.y - leftTemple.y,
          rightTemple.x - leftTemple.x
        );

        // Scale the glasses based on the head width
        const glassesWidth = headWidth * frameObject.scale;
        const glassesHeight = glassesWidth * (glassesImage.height / glassesImage.width);

        // Draw the glasses centered on the nose bridge
        ctx.drawImage(faceImage, 0, 0, canvas.width, canvas.height);

        // Draw the glasses centered on the nose bridge
        ctx.save();
        // calculate perpendicular offset
        const offset = headWidth * frameObject.offset;
        const offsetX = offset * Math.cos(angle + Math.PI / 2);
        const offsetY = offset * Math.sin(angle + Math.PI / 2);
        ctx.translate(centerX + offsetX, centerY + offsetY);
        ctx.rotate(angle);
        ctx.drawImage(glassesImage, -glassesWidth / 2, -glassesHeight / 2, glassesWidth, glassesHeight);
        ctx.restore();
      }
      // Set processing to false when done
      setIsProcessing(false);
    };

    drawGlassesOnCanvas();
  }, [frameObject, userPhoto]);

  return <>
   <div style={styles.topBar}>
    <button onClick={() => navigate("/tryon")} style={styles.backButton}>
      ← Back
    </button>

    <button
      onClick={() => setIsSaved(!isSaved)}
      style={{
        ...styles.saveButton,
        backgroundColor: isSaved ? '#4caf50' : '#f0f0f0',
        color: isSaved ? '#fff' : '#000',
      }}
    >
      {isSaved ? '✔ Saved' : 'Save'}
    </button>
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '60px' }}>
    {isProcessing && (
      <div style={styles.processingOverlay}>
        <div style={styles.processingSpinner}></div>
        <p style={styles.processingText}>Generating your try-on...</p>
      </div>
    )}

    <canvas ref={canvasRef} style={styles.canvas} />
    <h1 style={styles.canvasTitle}>{frameObject?.name}</h1>

    <div style={styles.changePhotoContainer}>
      <button 
        onClick={() => navigate('/photo-selection')} 
        style={styles.changePhotoButton}
      >
        Change Photo
      </button>
    </div>
  </div>
</>
}

// Add these new styles to your existing styles object
const styles = {
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    marginTop: '60px',
    paddingTop: '20px',
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  card: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'contain',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '10px',
  },
  glassesName: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '600',
    textAlign: 'center',
    margin: 0,
  },
  canvas: {
    width: '100%',
    height: 'auto',
    maxWidth: '400px',
    maxHeight: '400px',
    borderRadius: '12px',
    marginTop: '20px',
  },
  canvasTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '20px',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    width: '100%',
    boxSizing: 'border-box',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  backButton: {
    padding: '10px 16px',
    fontSize: '16px',
    borderRadius: '8px',
    backgroundColor: '#f0f0f0',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '10px 16px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  uploadContainer: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  uploadButton: {
    padding: '10px 16px',
    fontSize: '16px',
    borderRadius: '8px',
    backgroundColor: '#4285f4',
    color: '#fff',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'center',
  },
  fileInput: {
    display: 'none',
  },
  uploadSuccess: {
    color: '#4caf50',
    marginTop: '8px',
    fontWeight: '600',
  },
  changePhotoContainer: {
    padding: '20px',
    marginBottom: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  changePhotoButton: {
    backgroundColor: '#5b4bff',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '0.75rem 0.5rem',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '300px',
    textAlign: 'center',
  },  
  processingOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 10,
  },
  processingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(91, 75, 255, 0.1)',
    borderRadius: '50%',
    borderTop: '4px solid #5b4bff',
    animation: 'spin 1s linear infinite',
    marginBottom: '12px',
  },
  processingText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FRAMES } from './Frames';

export default function FramesScreen() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={styles.title}>Glasses Try On</h1>
      <div style={styles.grid}>
        {FRAMES.map((frame) => (
          <div
            key={frame.name}
            style={{ ...styles.card }}
            onClick={() => navigate('/cameraStuff/tryOnCam')}
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: '#FFFFFF',
  },
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
};
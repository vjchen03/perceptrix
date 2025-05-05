import React, { useState } from 'react';

export default function TryOnCamScreen() {
  const [imageUri, setImageUri] = useState(null);

  const handleTakePhoto = () => {
    alert('Camera functionality is not supported in web. Use a file upload input instead.');
  };

  const handlePickImage = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const uri = URL.createObjectURL(file);
      setImageUri(uri);
      console.log('Image picked:', uri);
    }
  };

  return (
    <div style={styles.grid}>
      <h1 style={styles.title}>Upload or Take a Photo</h1>

      <button style={styles.button} onClick={handleTakePhoto}>
        <span style={styles.icon}>📷</span>
        <span style={styles.buttonText}>Take a Photo</span>
      </button>

      <label style={styles.button}>
        <span style={styles.icon}>🖼️</span>
        <span style={styles.buttonText}>Upload from Gallery</span>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handlePickImage}
        />
      </label>

      {imageUri && (
        <img src={imageUri} alt="Preview" style={styles.preview} />
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    height: '100vh',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '40px',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 20px',
    backgroundColor: '#D9D9D9',
    borderRadius: '12px',
    border: '2px solid black',
    marginBottom: '20px',
    width: '260px',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  buttonText: {
    fontSize: '16px',
    fontWeight: '600',
  },
  icon: {
    fontSize: '24px',
  },
  preview: {
    marginTop: '30px',
    width: '240px',
    height: '240px',
    borderRadius: '12px',
    border: '2px solid #ccc',
    objectFit: 'contain',
  },
};
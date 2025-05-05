import { useLocation } from "react-router-dom";

function classifyFaceShape(landmarks) {
  // Same logic as before...
  // Copy from your existing function
  return "Oval"; // placeholder
}

export default function ResultsPage() {
  const { state } = useLocation();
  const { imageUri, landmarks, error } = state || {};
  const shape = landmarks ? classifyFaceShape(landmarks) : "Unknown";

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>AI Face Analysis</h2>
      {imageUri && <img src={imageUri} alt="result" style={{ width: 240, height: 240 }} />}
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <p>Face Shape: {shape}</p>
          <h4>Facial Landmarks (sample):</h4>
          <ul>
            {landmarks &&
              Object.entries(landmarks)
                .slice(0, 5)
                .map(([key, val]) => (
                  <li key={key}>
                    {key}: x={val.x.toFixed(1)}, y={val.y.toFixed(1)}
                  </li>
                ))}
          </ul>
        </>
      )}
    </div>
  );
}

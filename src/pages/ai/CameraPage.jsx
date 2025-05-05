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
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>How does your face shape work with glasses?</h2>
      <p>Find out now!</p>

      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <>
          <img src={image} alt="preview" style={{ width: 240, height: 240, marginTop: 20 }} />
          <br />
          <button onClick={handleAnalyze} style={{ marginTop: 20 }}>Analyze with AI</button>
        </>
      )}
    </div>
  );
}

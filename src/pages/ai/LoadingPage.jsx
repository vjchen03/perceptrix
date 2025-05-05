import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { analyzeFace } from "../../utils/azureFace";

export default function LoadingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const runAI = async () => {
      const imageUri = state?.imageUri;
      if (!imageUri) return;

      const results = await analyzeFace(imageUri);
      if (results?.length > 0) {
        navigate("/aicamera/results", {
          state: {
            imageUri,
            landmarks: results[0].faceLandmarks,
            faceRectangle: results[0].faceRectangle,
          },
        });
      } else {
        navigate("/aicamera/results", {
          state: {
            imageUri,
            error: "No face detected.",
          },
        });
      }
    };

    runAI();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <div className="spinner" /> {/* Optional CSS spinner */}
      <p>Analyzing your face shape with AI...</p>
    </div>
  );
}

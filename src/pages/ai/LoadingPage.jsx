// src/pages/ai/LoadingPage.jsx
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { compressImage } from "../../utils/compressImage";

export default function LoadingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const imageData = state?.imageData;
  const hasRun = useRef(false); // 👈 prevents duplicate calls

  useEffect(() => {
    if (!imageData || hasRun.current) return;

    hasRun.current = true;

    const analyzeFace = async () => {
      try {
        const compressed = await compressImage(imageData);

        const response = await fetch("https://noggin.rea.gent/free-scorpion-1309", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer rg_v1_8h2li8b7yzvj05toqcwslt8z8gxeo7gjff48_ngk",
          },
          body: JSON.stringify({ face: compressed }),
        });

        const resultText = await response.text();

        let result;
        try {
          result = JSON.parse(resultText);
        } catch {
          throw new Error("API response was not valid JSON");
        }

        navigate("/ai/results", {
          state: {
            imageData,
            analysis: result,
          },
        });
      } catch (err) {
        console.error("Error analyzing face:", err);
        navigate("/ai/results", {
          state: {
            imageData,
            error: "Something went wrong analyzing your face.",
          },
        });
      }
    };

    analyzeFace();
  }, [imageData, navigate]);

  return (
    <div style={{ textAlign: "center", paddingTop: "3rem" }}>
      <p>Analyzing your face shape with AI...</p>
      <div style={{
        margin: "2rem auto",
        width: "40px",
        height: "40px",
        border: "5px solid #ccc",
        borderTop: "5px solid #5b4bff",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }} />
      <style>
        {`@keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }`}
      </style>
    </div>
  );
}

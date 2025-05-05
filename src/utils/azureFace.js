// src/utils/azureFace.js
import axios from 'axios';

const AZURE_ENDPOINT = import.meta.env.VITE_AZURE_ENDPOINT;
const AZURE_KEY = import.meta.env.VITE_AZURE_KEY;

export async function analyzeFace(imageUri) {
  try {
    console.log("ENV:", AZURE_ENDPOINT, AZURE_KEY);
    if (!AZURE_ENDPOINT || !AZURE_KEY) {
      throw new Error('Missing Azure API config');
    }

    // Fetch the image as blob
    const imageResponse = await fetch(imageUri);
    const imageBlob = await imageResponse.blob();

    const result = await axios.post(
      `${AZURE_ENDPOINT}/face/v1.0/detect?returnFaceLandmarks=true&returnFaceAttributes=glasses,headPose`,
      imageBlob,
      {
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_KEY,
          'Content-Type': 'application/octet-stream',
        },
      }
    );

    return result.data;
  } catch (error) {
    console.error('❌ Azure Face API error:', error.response?.data || error.message);
    return null;
  }
}

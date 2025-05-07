export async function compressImage(dataUrl, maxWidth = 512, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Resize image proportionally
      const scale = maxWidth / img.width;
      const width = maxWidth;
      const height = img.height * scale;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(compressedDataUrl);
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}
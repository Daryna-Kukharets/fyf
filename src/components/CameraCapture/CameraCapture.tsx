import React, { useRef } from "react";
import Webcam from "react-webcam";

type Props = {
  onCapture: (imageData: string) => void;
  onClose: () => void;
};

export const CameraCapture: React.FC<Props> = ({ onCapture, onClose }) => {
  const webcamRef = useRef<Webcam>(null);

 const handleCapture = () => {
  const imageSrc = webcamRef.current?.getScreenshot();

  if (!imageSrc) return;

  const img = new Image();
  img.src = imageSrc;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 🔁 Відзеркалення
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(img, 0, 0);

    const mirroredDataUrl = canvas.toDataURL("image/jpeg");
    onCapture(mirroredDataUrl);
    onClose();
  };
};

  return (
    <div className="camera-capture">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "user" }}
        className="camera-capture__video camera-capture__mirrored"
      />
      <div className="camera-capture__controls">
        <button onClick={handleCapture} className="camera-capture__button">
          📸 Зробити фото
        </button>
        <button onClick={onClose} className="camera-capture__button camera-capture__button--close">
          ❌ Закрити
        </button>
      </div>
    </div>
  );
};

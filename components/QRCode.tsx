import React, { useEffect, useRef } from 'react';

// Declare the global QRious variable from the script tag
declare var QRious: any;

interface QRCodeProps {
  url: string;
  size?: number;
}

const QRCode: React.FC<QRCodeProps> = ({ url, size = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      try {
        // Use the local library to draw the QR code to the canvas
        // This handles long URLs much better than GET requests to image APIs
        new QRious({
          element: canvasRef.current,
          value: url,
          size: size,
          level: 'L', // Low error correction allows for more data density
          background: 'white',
          foreground: 'black'
        });
      } catch (e) {
        console.error("Error generating QR code:", e);
      }
    }
  }, [url, size]);

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <canvas ref={canvasRef} />
      <div className="text-center">
        <p className="font-bold text-lg text-gray-800">SCAN ME</p>
        <p className="text-xs text-gray-500">View the menu on your phone</p>
      </div>
    </div>
  );
};

export default QRCode;
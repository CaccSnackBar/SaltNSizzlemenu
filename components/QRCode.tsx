
import React from 'react';

interface QRCodeProps {
  url: string;
  size?: number;
  bgColor?: string;
}

const QRCode: React.FC<QRCodeProps> = ({ url, size = 128, bgColor = 'e0e8e2' }) => {
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&bgcolor=${bgColor}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={qrApiUrl}
        alt="QR Code for menu"
        width={size}
        height={size}
        className="rounded-lg shadow-md"
      />
      <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
        Scan for menu
      </p>
    </div>
  );
};

export default QRCode;

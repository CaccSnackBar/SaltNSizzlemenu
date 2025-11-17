import React from 'react';

interface MarqueeProps {
  text: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text }) => {
  const marqueeText = new Array(5).fill(text).join(' • ');

  return (
    <>
      <style>
        {`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-content {
          display: inline-block;
          animation: marquee-animation 30s linear infinite;
        }
        @keyframes marquee-animation {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        `}
      </style>
      <div className="marquee-container" aria-label="Promotional message">
        <p className="marquee-content">{marqueeText}</p>
      </div>
    </>
  );
};

export default Marquee;

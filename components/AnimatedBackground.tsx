import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  effect?: 'cosmic' | 'retro';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ effect }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (effect !== 'cosmic' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; z: number }[];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const starCount = Math.floor((canvas.width * canvas.height) / 1000);
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * canvas.width,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      
      stars.forEach(star => {
        star.z -= 1;
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }

        const k = 128 / star.z;
        const px = star.x * k + canvas.width / 2;
        const py = star.y * k + canvas.height / 2;
        
        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = (1 - star.z / canvas.width) * 3;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [effect]);

  if (!effect) return null;

  if (effect === 'cosmic') {
    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
  }

  if (effect === 'retro') {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
            <style>
                {`
                @keyframes scrollGrid {
                    0% { background-position: 0 0; }
                    100% { background-position: 0 -100px; }
                }
                .retro-grid {
                    width: 100%;
                    height: 100%;
                    background-color: #0d0221;
                    background-image: 
                        linear-gradient(to right, rgba(155, 93, 229, 0.4) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(155, 93, 229, 0.4) 1px, transparent 1px);
                    background-size: 50px 50px;
                    animation: scrollGrid 4s linear infinite;
                }
                `}
            </style>
            <div className="retro-grid" />
        </div>
    );
  }

  return null;
};

export default AnimatedBackground;

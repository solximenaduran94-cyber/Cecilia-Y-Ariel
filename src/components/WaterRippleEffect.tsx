import React, { useEffect, useRef } from 'react';

interface RippleRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  alpha: number;
  decay: number;
  lineWidth: number;
  colorType: 'white' | 'gold' | 'silver' | 'sage';
}

interface DropletSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  color: string;
}

export const WaterRippleEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    const ripples: RippleRing[] = [];
    const droplets: DropletSpark[] = [];
    let lastMoveTime = 0;

    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Spawn concentric water wave ripples (like a drop falling in calm water)
    const spawnWaterDropRipples = (x: number, y: number, intensity = 1) => {
      const ringCount = 3;
      const colors: ('white' | 'gold' | 'silver' | 'sage')[] = ['white', 'gold', 'silver'];

      for (let i = 0; i < ringCount; i++) {
        ripples.push({
          x,
          y,
          radius: 2 + i * 7,
          maxRadius: (70 + i * 32) * intensity,
          speed: (2.2 - i * 0.35) * intensity,
          alpha: (0.75 - i * 0.15) * intensity,
          decay: 0.016 + i * 0.003,
          lineWidth: 2.2 - i * 0.4,
          colorType: colors[i % colors.length],
        });
      }

      // Small splash droplets bouncing outward gently
      const dropCount = Math.floor(7 * intensity);
      for (let i = 0; i < dropCount; i++) {
        const angle = (Math.PI * 2 * i) / dropCount + (Math.random() - 0.5) * 0.5;
        const speed = 1.2 + Math.random() * 2.8;
        droplets.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          radius: 1.5 + Math.random() * 2,
          alpha: 0.9,
          decay: 0.02 + Math.random() * 0.015,
          color: i % 2 === 0 ? '#FAF8F3' : '#B89A58',
        });
      }

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    const renderLoop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Render expanding water ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha -= r.decay;

        if (r.alpha <= 0.005 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);

        let strokeColor = '';
        if (r.colorType === 'white') {
          strokeColor = `rgba(250, 248, 243, ${r.alpha * 0.85})`;
        } else if (r.colorType === 'gold') {
          strokeColor = `rgba(184, 154, 88, ${r.alpha * 0.75})`;
        } else if (r.colorType === 'silver') {
          strokeColor = `rgba(209, 202, 195, ${r.alpha * 0.7})`;
        } else {
          strokeColor = `rgba(137, 150, 140, ${r.alpha * 0.65})`;
        }

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = Math.max(0.5, r.lineWidth * (1 - r.radius / r.maxRadius));
        ctx.shadowColor = 'rgba(184, 154, 88, 0.4)';
        ctx.shadowBlur = 6;
        ctx.stroke();

        // Inner refraction glow ring
        if (r.radius > 8) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.92, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(243, 238, 229, ${r.alpha * 0.25})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        ctx.restore();
      }

      // Render droplets & fine aquatic sparks
      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.94;
        d.vy = d.vy * 0.94 + 0.04;
        d.alpha -= d.decay;

        if (d.alpha <= 0.01) {
          droplets.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = d.alpha;
        ctx.fillStyle = d.color;
        ctx.shadowColor = d.color;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (ripples.length > 0 || droplets.length > 0) {
        animationFrameId = requestAnimationFrame(renderLoop);
      } else {
        animationFrameId = null;
      }
    };

    // Trigger on pointer down (tap / click)
    const handlePointerDown = (e: PointerEvent) => {
      spawnWaterDropRipples(e.clientX, e.clientY, 1.1);
    };

    // Trigger gentle liquid wake on pointer move (drag / swipe across the card)
    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      // Throttle to 75ms for smooth performance without overhead
      if (now - lastMoveTime < 75) return;
      lastMoveTime = now;

      // Soft water ripple trail as user scrolls or passes finger
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 3,
        maxRadius: 38,
        speed: 1.4,
        alpha: 0.45,
        decay: 0.025,
        lineWidth: 1.2,
        colorType: Math.random() > 0.5 ? 'silver' : 'gold',
      });

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 select-none"
    />
  );
};

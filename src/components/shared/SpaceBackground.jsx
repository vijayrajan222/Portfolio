'use client';

import { useEffect, useRef } from 'react';
import styles from './SpaceBackground.module.css';

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates tracking with lerp
    let mouse = { x: width / 2, y: height / 2 };
    let targetMouse = { x: width / 2, y: height / 2 };
    const lerpSpeed = 0.04;

    // Define stars (small, twinkling particles)
    const starCount = prefersReducedMotion ? 60 : 150;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.5 + Math.random() * 1.5,
        opacity: Math.random(),
        twinkleSpeed: 0.005 + Math.random() * 0.012,
        twinklePhase: Math.random() * Math.PI * 2,
        parallaxFactor: 0.01 + Math.random() * 0.02, // Nearer stars shift more
      });
    }

    // Define floating particles (larger, slow-drifting bokeh circles)
    const particleCount = prefersReducedMotion ? 8 : 22;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 4 + Math.random() * 24,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        opacity: 0.02 + Math.random() * 0.05,
        color: Math.random() > 0.45 ? '255, 138, 61' : '79, 184, 255', // Ember orange or Glow blue
        parallaxFactor: 0.05 + Math.random() * 0.08,
      });
    }

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Handle pointer movement
    const handlePointerMove = (e) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };
    if (!prefersReducedMotion) {
      window.addEventListener('pointermove', handlePointerMove);
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw solid dark background
      ctx.fillStyle = '#08070a';
      ctx.fillRect(0, 0, width, height);

      // Interpolate mouse coordinates (lerp)
      if (!prefersReducedMotion) {
        mouse.x += (targetMouse.x - mouse.x) * lerpSpeed;
        mouse.y += (targetMouse.y - mouse.y) * lerpSpeed;
      }

      // 2. Draw Nebula-like glow centered around mouse position
      const mouseOffsetX = (mouse.x - width / 2);
      const mouseOffsetY = (mouse.y - height / 2);

      const glowX = width / 2 + mouseOffsetX * 0.15;
      const glowY = height / 2 + mouseOffsetY * 0.15;

      const nebulaGrad = ctx.createRadialGradient(
        glowX,
        glowY,
        10,
        glowX,
        glowY,
        Math.max(width, height) * 0.6
      );
      nebulaGrad.addColorStop(0, 'rgba(255, 138, 61, 0.05)'); // subtle orange
      nebulaGrad.addColorStop(0.35, 'rgba(79, 184, 255, 0.02)'); // subtle blue
      nebulaGrad.addColorStop(0.75, 'rgba(12, 10, 15, 0.0)');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Draw & update stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Star twinkle
        if (!prefersReducedMotion) {
          star.twinklePhase += star.twinkleSpeed;
          star.opacity = 0.2 + Math.abs(Math.sin(star.twinklePhase)) * 0.8;
        }

        // Mouse Parallax displacement
        const dx = mouseOffsetX * star.parallaxFactor;
        const dy = mouseOffsetY * star.parallaxFactor;

        // Wrap around boundaries
        let drawX = star.x - dx;
        let drawY = star.y - dy;
        if (drawX < 0) drawX += width;
        if (drawX > width) drawX -= width;
        if (drawY < 0) drawY += height;
        if (drawY > height) drawY -= height;

        ctx.fillStyle = `rgba(246, 241, 234, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Draw & update drifting particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift movement
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap boundaries
          if (p.x < -p.radius) p.x = width + p.radius;
          if (p.x > width + p.radius) p.x = -p.radius;
          if (p.y < -p.radius) p.y = height + p.radius;
          if (p.y > height + p.radius) p.y = -p.radius;
        }

        // Parallax displacement
        const dx = mouseOffsetX * p.parallaxFactor;
        const dy = mouseOffsetY * p.parallaxFactor;

        let drawX = p.x - dx;
        let drawY = p.y - dy;

        // Radial gradient for each soft bokeh particle
        const particleGrad = ctx.createRadialGradient(
          drawX,
          drawY,
          0,
          drawX,
          drawY,
          p.radius
        );
        particleGrad.addColorStop(0, `rgba(${p.color}, ${p.opacity})`);
        particleGrad.addColorStop(0.5, `rgba(${p.color}, ${p.opacity * 0.4})`);
        particleGrad.addColorStop(1, `rgba(${p.color}, 0)`);

        ctx.fillStyle = particleGrad;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (!prefersReducedMotion) {
        window.removeEventListener('pointermove', handlePointerMove);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}

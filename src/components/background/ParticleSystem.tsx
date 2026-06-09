"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

const COLORS = [
  "139, 92, 246",
  "59, 130, 246",
  "6, 182, 212",
  "236, 72, 153",
  "16, 185, 129",
];

export const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => {
      const maxLife = Math.random() * 200 + 100;
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: Math.random() * 2 + 0.5,
        speedY: Math.random() * 0.8 + 0.2,
        opacity: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0,
        maxLife,
      };
    };

    const updateParticles = () => {
      // Add new particles
      if (particlesRef.current.length < 80) {
        particlesRef.current.push(createParticle());
      }

      // Update existing
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        p.y -= p.speedY;
        p.x += Math.sin(p.life * 0.02) * 0.5;

        // Fade in
        if (p.life < 30) {
          p.opacity = p.life / 30;
        }
        // Fade out
        else if (p.life > p.maxLife - 30) {
          p.opacity = (p.maxLife - p.life) / 30;
        } else {
          p.opacity = 0.6;
        }

        return p.life < p.maxLife;
      });
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        // Glow effect
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 3
        );
        gradient.addColorStop(
          0,
          `rgba(${p.color}, ${p.opacity})`
        );
        gradient.addColorStop(
          1,
          `rgba(${p.color}, 0)`
        );

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();
      });

      updateParticles();
      animationRef.current = requestAnimationFrame(drawParticles);
    };

    window.addEventListener("resize", resize);
    resize();
    drawParticles();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
};

export default ParticleSystem;
"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

const NODE_COLORS = [
  "16, 185, 129",
  "245, 158, 11",
  "239, 68, 68",
];

export const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      // More nodes for better visibility
      const count = Math.floor(
        (canvas.width * canvas.height) / 8000
      );
      nodesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.6 + 0.3,
        color:
          NODE_COLORS[
            Math.floor(Math.random() * NODE_COLORS.length)
          ],
      }));
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const connectionDistance = 180;
      const mouseDistance = 200;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseDistance && dist > 0) {
          const force = (mouseDistance - dist) / mouseDistance;
          node.vx -= (dx / dist) * force * 0.01;
          node.vy -= (dy / dist) * force * 0.01;
        }

        const speed = Math.sqrt(
          node.vx * node.vx + node.vy * node.vy
        );
        if (speed > 1.2) {
          node.vx = (node.vx / speed) * 1.2;
          node.vy = (node.vy / speed) * 1.2;
        }
      });

      // Draw connections — more visible
      nodes.forEach((nodeA, i) => {
        nodes.slice(i + 1).forEach((nodeB) => {
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity =
              (1 - dist / connectionDistance) * 0.35;

            // Gradient line
            const gradient = ctx.createLinearGradient(
              nodeA.x, nodeA.y,
              nodeB.x, nodeB.y
            );
            gradient.addColorStop(
              0,
              `rgba(${nodeA.color}, ${opacity})`
            );
            gradient.addColorStop(
              1,
              `rgba(${nodeB.color}, ${opacity})`
            );

            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      // Draw nodes with glow
      nodes.forEach((node) => {
        // Outer glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 4
        );
        gradient.addColorStop(
          0,
          `rgba(${node.color}, ${node.opacity})`
        );
        gradient.addColorStop(
          1,
          `rgba(${node.color}, 0)`
        );

        ctx.beginPath();
        ctx.arc(
          node.x, node.y,
          node.radius * 4,
          0, Math.PI * 2
        );
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(
          node.x, node.y,
          node.radius,
          0, Math.PI * 2
        );
        ctx.fillStyle = `rgba(${node.color}, ${node.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
      style={{ opacity: 1 }}
    />
  );
};

export default NeuralNetwork;
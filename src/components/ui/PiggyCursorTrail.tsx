'use client';

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  size: number;
  color: string;
}

export default function PiggyCursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Solo activar en pantallas con puntero (no en táctil móvil para no degradar rendimiento)
    if (window.matchMedia('(pointer: fine)').matches) {
      setEnabled(true);
    }

    let counter = 0;
    const symbols = ['🪙', '✨', '🐷', '⭐', '💵'];
    const colors = ['#FACC15', '#F472B6', '#10B981', '#F59E0B', '#FDF2F8'];

    const handleClick = (e: MouseEvent) => {
      // Al hacer click, soltar un estallido de 4 partículas alegres
      const newBurst: Particle[] = Array.from({ length: 4 }).map((_, i) => ({
        id: ++counter,
        x: e.clientX + (Math.random() * 30 - 15),
        y: e.clientY + (Math.random() * 30 - 15),
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        size: Math.floor(Math.random() * 6) + 14,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      setParticles((prev) => [...prev.slice(-15), ...newBurst]);
    };

    let lastMove = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      // Limitar a una partícula cada 90ms para máxima suavidad sin saturar el DOM
      if (now - lastMove < 90) return;
      lastMove = now;

      const newParticle: Particle = {
        id: ++counter,
        x: e.clientX,
        y: e.clientY,
        symbol: Math.random() > 0.4 ? '✨' : '🪙',
        size: Math.floor(Math.random() * 5) + 12,
        color: '#FACC15',
      };

      setParticles((prev) => [...prev.slice(-12), newParticle]);
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMouseMove);

    // Limpieza periódica de partículas viejas
    const interval = setInterval(() => {
      setParticles((prev) => (prev.length > 0 ? prev.slice(1) : prev));
    }, 120);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-float-fade font-bold"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            textShadow: '0 0 10px rgba(250, 204, 21, 0.6)',
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}

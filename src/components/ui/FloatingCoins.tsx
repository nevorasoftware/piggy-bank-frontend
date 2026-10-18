'use client';

import React, { useEffect, useState } from 'react';

export default function FloatingCoins() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // 12 elementos flotantes distribuidos en el fondo
  const coins = [
    { left: '5%', delay: '0s', duration: '14s', size: 'text-2xl', symbol: '🪙' },
    { left: '15%', delay: '3s', duration: '18s', size: 'text-xl', symbol: '✨' },
    { left: '25%', delay: '7s', duration: '12s', size: 'text-3xl', symbol: '🐷' },
    { left: '38%', delay: '2s', duration: '16s', size: 'text-lg', symbol: '🪙' },
    { left: '50%', delay: '5s', duration: '15s', size: 'text-2xl', symbol: '🎁' },
    { left: '62%', delay: '1s', duration: '19s', size: 'text-xl', symbol: '✨' },
    { left: '72%', delay: '8s', duration: '13s', size: 'text-3xl', symbol: '🪙' },
    { left: '85%', delay: '4s', duration: '17s', size: 'text-2xl', symbol: '🐷' },
    { left: '94%', delay: '6s', duration: '14s', size: 'text-xl', symbol: '⭐' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 select-none">
      {coins.map((c, idx) => (
        <span
          key={idx}
          className={`absolute bottom-[-50px] ${c.size} animate-floating-bg filter drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]`}
          style={{
            left: c.left,
            animationDelay: c.delay,
            animationDuration: c.duration,
          }}
        >
          {c.symbol}
        </span>
      ))}
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';

export default function FloatingCoins() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Cerditos animados y monedas flotando en el fondo en todo el sitio
  const floatingItems = [
    { left: '4%', delay: '0s', duration: '14s', size: 'text-3xl', symbol: '🐷' },
    { left: '12%', delay: '3s', duration: '18s', size: 'text-xl', symbol: '🪙' },
    { left: '22%', delay: '6s', duration: '12s', size: 'text-4xl', symbol: '🐷' },
    { left: '32%', delay: '1s', duration: '16s', size: 'text-2xl', symbol: '✨' },
    { left: '45%', delay: '8s', duration: '15s', size: 'text-3xl', symbol: '🐷' },
    { left: '58%', delay: '2s', duration: '19s', size: 'text-xl', symbol: '🪙' },
    { left: '68%', delay: '7s', duration: '13s', size: 'text-4xl', symbol: '🐷' },
    { left: '80%', delay: '4s', duration: '17s', size: 'text-2xl', symbol: '✨' },
    { left: '92%', delay: '5s', duration: '14s', size: 'text-3xl', symbol: '🐷' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40 select-none">
      {floatingItems.map((item, idx) => (
        <span
          key={idx}
          className={`absolute bottom-[-60px] ${item.size} animate-floating-bg filter drop-shadow-[0_0_12px_rgba(244,114,182,0.6)] transform hover:scale-125 transition-transform`}
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PiggyMascotProps {
  size?: 'sm' | 'md' | 'lg';
  showCoins?: boolean;
  className?: string;
}

export default function PiggyMascot({
  size = 'md',
  showCoins = true,
  className = '',
}: PiggyMascotProps) {
  const dimensions = {
    sm: { width: 44, height: 40, coinSize: 'w-3.5 h-3.5 text-[8px]' },
    md: { width: 90, height: 80, coinSize: 'w-5 h-5 text-[10px]' },
    lg: { width: 140, height: 120, coinSize: 'w-6 h-6 text-xs' },
  }[size];

  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}>
      {/* Moneditas de oro cayendo en loop */}
      {showCoins && (
        <div className="absolute -top-6 w-24 h-12 pointer-events-none overflow-hidden z-20 flex justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ y: -10, opacity: 0, scale: 0.6 }}
              animate={{
                y: [0, 35],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
              className={`absolute rounded-full bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-600 border border-yellow-200 shadow-md shadow-yellow-500/50 flex items-center justify-center font-black text-amber-950 ${dimensions.coinSize}`}
            >
              $
            </motion.div>
          ))}
        </div>
      )}

      {/* Cerdito Ilustrado Animado */}
      <motion.div
        animate={{
          y: [0, -5, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.4,
          ease: 'easeInOut',
        }}
        className="relative z-10"
      >
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox="0 0 100 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sombra */}
          <ellipse cx="50" cy="84" rx="34" ry="6" fill="rgba(0,0,0,0.25)" />

          {/* Patitas */}
          <rect x="24" y="68" width="12" height="14" rx="5" fill="#F472B6" />
          <rect x="64" y="68" width="12" height="14" rx="5" fill="#F472B6" />

          {/* Cuerpo del cerdito */}
          <ellipse cx="50" cy="52" rx="38" ry="28" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />

          {/* Brillo 3D */}
          <ellipse cx="40" cy="40" rx="22" ry="14" fill="#FDF2F8" opacity="0.35" />

          {/* Ranura para monedas */}
          <rect x="42" y="24" width="16" height="4" rx="2" fill="#0F172A" />
          <rect x="43" y="25" width="14" height="2" rx="1" fill="#FACC15" />

          {/* Orejitas que rebotan */}
          <motion.path
            d="M22 36C20 22 28 26 34 30C28 35 24 38 22 36Z"
            fill="#F472B6"
            stroke="#BE185D"
            strokeWidth="2"
            animate={{ rotate: [-2, 3, -2] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          />
          <path d="M24 34C23 27 28 28 31 31" fill="#FBCFE8" />

          <motion.path
            d="M66 30C72 26 80 22 78 36C76 38 72 35 66 30Z"
            fill="#F472B6"
            stroke="#BE185D"
            strokeWidth="2"
            animate={{ rotate: [2, -3, 2] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          />
          <path d="M69 31C72 28 77 27 76 34" fill="#FBCFE8" />

          {/* Ojitos brillantes felices */}
          <circle cx="34" cy="46" r="4.2" fill="#0F172A" />
          <circle cx="35.5" cy="44.5" r="1.5" fill="white" />

          <circle cx="66" cy="46" r="4.2" fill="#0F172A" />
          <circle cx="67.5" cy="44.5" r="1.5" fill="white" />

          {/* Rubor en mejillas */}
          <circle cx="26" cy="54" r="4" fill="#FB7185" opacity="0.6" />
          <circle cx="74" cy="54" r="4" fill="#FB7185" opacity="0.6" />

          {/* Trompita rosada */}
          <rect x="39" y="47" width="22" height="15" rx="7.5" fill="#FDA4AF" stroke="#BE185D" strokeWidth="2" />
          <ellipse cx="46" cy="54.5" rx="2" ry="2.8" fill="#881337" />
          <ellipse cx="54" cy="54.5" rx="2" ry="2.8" fill="#881337" />

          {/* Coronita dorada brillante */}
          <path d="M42 22L45 16L50 20L55 16L58 22H42Z" fill="#FACC15" stroke="#B45309" strokeWidth="1.2" />
          <circle cx="50" cy="19" r="1.2" fill="#EF4444" />
        </svg>
      </motion.div>
    </div>
  );
}

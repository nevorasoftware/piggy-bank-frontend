'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PiggyMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCoins?: boolean;
  className?: string;
  glow?: boolean;
}

export default function PiggyMascot({
  size = 'md',
  showCoins = true,
  className = '',
  glow = true,
}: PiggyMascotProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-20 h-20',
    lg: 'w-32 h-32 sm:w-36 sm:h-36',
    xl: 'w-44 h-44 sm:w-52 sm:h-52',
  }[size];

  const coinSizes = {
    sm: 'w-3.5 h-3.5 text-[8px]',
    md: 'w-5 h-5 text-[10px]',
    lg: 'w-6 h-6 text-xs',
    xl: 'w-7 h-7 text-xs',
  }[size];

  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}>
      {/* Moneditas de oro cayendo en loop */}
      {showCoins && (
        <div className="absolute -top-7 w-28 h-14 pointer-events-none overflow-hidden z-20 flex justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ y: -10, opacity: 0, scale: 0.6 }}
              animate={{
                y: [0, 42],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: i * 0.45,
                ease: 'easeInOut',
              }}
              className={`absolute rounded-full bg-gradient-to-tr from-yellow-300 via-amber-400 to-yellow-600 border border-yellow-200 shadow-lg shadow-yellow-500/60 flex items-center justify-center font-black text-amber-950 ${coinSizes}`}
            >
              $
            </motion.div>
          ))}
        </div>
      )}

      {/* Cerdito Rey Oficial con Borde Neón y Animación Gaming */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          scale: [1, 1.025, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.6,
          ease: 'easeInOut',
        }}
        className="relative z-10 group"
      >
        <div
          className={`relative rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-amber-400 via-purple-500 to-yellow-300 ${sizeClasses} ${
            glow ? 'shadow-[0_0_25px_rgba(250,204,21,0.45)]' : ''
          }`}
        >
          {/* Imagen Oficial del Cerdito Rey */}
          <img
            src="/images/piggy-logo.jpg"
            alt="PiggyBank Oficial"
            className="w-full h-full object-cover rounded-full select-none pointer-events-none group-hover:scale-110 transition-transform duration-500"
            loading="eager"
          />

          {/* Resplandor interno sutil */}
          <div className="absolute inset-0 rounded-full border border-yellow-300/40 pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RoomStatus } from '@/types';

interface PiggyBankAnimationProps {
  status: RoomStatus;
  ticketsSold: number;
  capacidadMax: number;
}

export default function PiggyBankAnimation({
  status,
  ticketsSold,
  capacidadMax,
}: PiggyBankAnimationProps) {
  const percentage = Math.min(100, Math.round((ticketsSold / capacidadMax) * 100));
  const isFull = status === 'LLENA' || ticketsSold >= capacidadMax;
  const isDrawing = status === 'SORTEANDO';
  const isClosed = status === 'CERRADA';

  // Determinación de colores según estado
  const skinColor = isFull || isClosed
    ? '#EF4444' // Rojo si se llena o expira
    : isDrawing
    ? '#EAB308' // Dorado si está sorteando
    : '#10B981'; // Verde si está activa y abierta

  const glowColor = isFull || isClosed
    ? 'rgba(239, 68, 68, 0.4)'
    : isDrawing
    ? 'rgba(234, 179, 8, 0.5)'
    : 'rgba(16, 185, 129, 0.4)';

  return (
    <div className="relative flex flex-col items-center justify-center p-6 select-none">
      {/* Monedas de oro cayendo en animación continua si la sala está abierta */}
      {status === 'ABIERTA' && !isFull && (
        <div className="absolute top-2 w-32 h-16 pointer-events-none overflow-hidden">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ y: -20, opacity: 0, scale: 0.8 }}
              animate={{
                y: [ -10, 45 ],
                opacity: [ 0, 1, 0 ],
                rotate: [ 0, 180, 360 ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.45,
                ease: 'easeInOut',
              }}
              className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-500 via-yellow-300 to-amber-600 border border-yellow-200 shadow-md shadow-yellow-500/50 flex items-center justify-center text-[10px] font-black text-amber-950"
            >
              $
            </motion.div>
          ))}
        </div>
      )}

      {/* Cerdito Alcancía Ilustrado con Framer Motion */}
      <motion.div
        animate={{
          scale: isDrawing ? [1, 1.06, 1] : [1, 1.02, 1],
          y: isDrawing ? [-2, 2, -2] : [0, -4, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: isDrawing ? 0.6 : 3,
          ease: 'easeInOut',
        }}
        className="relative z-10"
        style={{ filter: `drop-shadow(0 15px 30px ${glowColor})` }}
      >
        <svg
          width="200"
          height="160"
          viewBox="0 0 200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Patitas traseras */}
          <rect x="52" y="125" width="22" height="26" rx="10" fill={skinColor} opacity="0.8" />
          <rect x="126" y="125" width="22" height="26" rx="10" fill={skinColor} opacity="0.8" />

          {/* Patitas delanteras */}
          <rect x="42" y="128" width="24" height="24" rx="8" fill={skinColor} />
          <rect x="134" y="128" width="24" height="24" rx="8" fill={skinColor} />

          {/* Cuerpo principal del cerdito */}
          <ellipse cx="100" cy="95" rx="72" ry="52" fill={skinColor} />

          {/* Brillo 3D del cuerpo */}
          <ellipse cx="80" cy="75" rx="45" ry="30" fill="white" opacity="0.15" />

          {/* Ranura para monedas */}
          <rect x="85" y="44" width="30" height="7" rx="3.5" fill="#0B0F19" />
          <rect x="86" y="45" width="28" height="3" rx="1.5" fill="#FACC15" opacity={isFull ? '0' : '0.8'} />

          {/* Orejita izquierda */}
          <path d="M48 65C45 42 62 48 70 56C62 65 52 72 48 65Z" fill={skinColor} stroke="#070A12" strokeWidth="2" />
          <path d="M52 62C50 48 62 52 66 57C60 63 54 68 52 62Z" fill="#FBCFE8" opacity="0.6" />

          {/* Orejita derecha */}
          <path d="M125 56C133 48 150 42 147 65C143 72 133 65 125 56Z" fill={skinColor} stroke="#070A12" strokeWidth="2" />
          <path d="M129 57C133 52 145 48 143 62C141 68 135 63 129 57Z" fill="#FBCFE8" opacity="0.6" />

          {/* Ojito izquierdo */}
          <circle cx="68" cy="85" r="7" fill="#070A12" />
          <circle cx="66" cy="83" r="2.5" fill="white" />

          {/* Ojito derecho */}
          <circle cx="112" cy="85" r="7" fill="#070A12" />
          <circle cx="110" cy="83" r="2.5" fill="white" />

          {/* Trompa del cerdito */}
          <ellipse cx="90" cy="104" rx="20" ry="14" fill="#F472B6" />
          <ellipse cx="84" cy="104" rx="3.5" ry="5.5" fill="#831843" />
          <ellipse cx="96" cy="104" rx="3.5" ry="5.5" fill="#831843" />

          {/* Rubor en mejillas */}
          <circle cx="52" cy="98" r="6" fill="#F43F5E" opacity="0.4" />
          <circle cx="128" cy="98" r="6" fill="#F43F5E" opacity="0.4" />

          {/* Colita enroscada */}
          <path
            d="M165 92C175 88 178 96 172 100C168 103 174 108 176 104"
            stroke={skinColor}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>

        {/* Insignia de estado flotante */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
          {isFull ? (
            <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase bg-rose-500 text-white shadow-lg shadow-rose-500/50 border border-rose-300">
              🔴 LLENA - CUPOS LLENOS
            </span>
          ) : isDrawing ? (
            <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase bg-yellow-400 text-slate-950 shadow-lg shadow-yellow-400/50 border border-yellow-200 animate-pulse">
              🎰 SORTEANDO EN VIVO
            </span>
          ) : isClosed ? (
            <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase bg-slate-800 text-slate-300 border border-slate-600">
              CERRADA
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/40 border border-emerald-300">
              🟢 SALA ACTIVA
            </span>
          )}
        </div>
      </motion.div>

      {/* Barra de progreso de llenado de alcancía */}
      <div className="w-full max-w-xs mt-6 space-y-1.5 text-center">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300 px-1">
          <span>Ocupación de la Alcancía:</span>
          <span className={isFull ? 'text-rose-400 font-extrabold' : 'text-amber-400'}>
            {ticketsSold} / {capacidadMax} ({percentage}%)
          </span>
        </div>
        <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-white/10 p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full rounded-full ${
              isFull
                ? 'bg-gradient-to-r from-rose-500 to-red-600'
                : 'bg-gradient-to-r from-emerald-400 via-amber-400 to-yellow-400'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

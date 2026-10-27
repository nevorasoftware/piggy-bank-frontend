'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RoomStatus } from '@/types';
import { Trophy, Sparkles } from 'lucide-react';

interface PiggyBankAnimationProps {
  status: RoomStatus;
  ticketsSold: number;
  capacidadMax: number;
  premio?: number;
}

export default function PiggyBankAnimation({
  status,
  ticketsSold,
  capacidadMax,
  premio,
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
    <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 select-none w-full max-w-lg">
      {/* Monedas de oro cayendo en animación continua si la sala está abierta */}
      {status === 'ABIERTA' && !isFull && (
        <div className="absolute -top-4 w-40 h-20 pointer-events-none overflow-hidden z-20">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ y: -20, opacity: 0, scale: 0.8 }}
              animate={{
                y: [-10, 55],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.35,
                ease: 'easeInOut',
              }}
              className="absolute left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-500 via-yellow-300 to-amber-600 border border-yellow-200 shadow-lg shadow-yellow-500/50 flex items-center justify-center text-xs font-black text-amber-950"
            >
              $
            </motion.div>
          ))}
        </div>
      )}

      {/* Cerdito Alcancía: Rey Piggy Oficial de Casino */}
      <motion.div
        animate={{
          scale: isDrawing ? [1, 1.08, 1] : [1, 1.03, 1],
          y: isDrawing ? [-4, 4, -4] : [0, -6, 0],
          rotate: isDrawing ? [-2, 2, -2] : [0, 0, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: isDrawing ? 0.35 : 2.5,
          ease: 'easeInOut',
        }}
        className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-full p-2 bg-gradient-to-tr from-amber-400 via-purple-600 to-yellow-300 shadow-2xl"
        style={{
          boxShadow: isDrawing
            ? '0 0 45px rgba(250, 204, 21, 0.8), 0 0 80px rgba(168, 85, 247, 0.5)'
            : '0 0 35px rgba(250, 204, 21, 0.5), 0 0 60px rgba(168, 85, 247, 0.35)',
        }}
      >
        <img
          src="/images/piggy-logo.jpg"
          alt="Rey Piggy Casino"
          className="w-full h-full object-cover rounded-full select-none"
        />

        {/* Moneda flotante con destello */}
        <div className="absolute -bottom-1 -right-1 w-11 h-11 rounded-full bg-gradient-to-tr from-yellow-300 to-amber-500 border-2 border-white shadow-xl flex items-center justify-center font-black text-slate-950 text-lg font-mono">
          $
        </div>
      </motion.div>

      {/* GRAN CAJA DE REGALO CON PREMIO AL CENTRO */}
      <div className="relative w-full -mt-4 z-10 rounded-3xl bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-900/95 border-2 border-amber-400/50 p-6 shadow-2xl backdrop-blur-md overflow-hidden text-center">
        {/* Cintas decorativas del regalo */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 opacity-25 pointer-events-none" />
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-b from-yellow-400 via-amber-300 to-yellow-500 opacity-20 pointer-events-none" />

        {/* Medallón Central del Premio */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-[11px] font-black uppercase tracking-wider text-amber-300 mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            Premio Acumulado en el Regalo
          </div>

          {premio !== undefined && (
            <div className="my-1">
              <span className="text-4xl sm:text-5xl font-black text-gold-gradient font-mono tracking-tight filter drop-shadow-[0_2px_12px_rgba(250,204,21,0.6)]">
                ${premio.toFixed(2)}
              </span>
              <span className="text-xs font-black uppercase text-slate-300 tracking-widest block mt-0.5">
                USD Directo a tu Cuenta
              </span>
            </div>
          )}

          {/* Insignia de estado animada */}
          <div className="mt-3 inline-block">
            {isFull ? (
              <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-lg">
                🔒 Alcancía Llena
              </span>
            ) : isDrawing ? (
              <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-yellow-400/20 text-yellow-300 border border-yellow-400/60 shadow-lg animate-pulse flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                ¡Sorteando Ganador en Vivo!
              </span>
            ) : isClosed ? (
              <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-slate-800 text-slate-400 border border-slate-700">
                Sala Cerrada
              </span>
            ) : (
              <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Sorteo Activo
              </span>
            )}
          </div>
        </div>

        {/* Barra de progreso de boletos vendidos */}
        <div className="relative z-10 w-full mt-5 pt-4 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 px-1">
            <span>Boletos vendidos:</span>
            <span className={isFull ? 'text-rose-400 font-extrabold' : 'text-amber-400 font-mono'}>
              {ticketsSold} / {capacidadMax} ({percentage}%)
            </span>
          </div>

          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-white/10 p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                isFull
                  ? 'bg-gradient-to-r from-rose-500 to-red-600'
                  : 'bg-gradient-to-r from-emerald-400 via-yellow-400 to-amber-400'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

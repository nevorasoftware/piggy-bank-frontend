'use client';

import React from 'react';
import Link from 'next/link';
import { Room } from '@/types';
import { Clock, Users, Sparkles, Trophy, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface GiftRoomCardProps {
  room: Room;
}

export default function GiftRoomCard({ room }: GiftRoomCardProps) {
  const isFull = room.estado === 'LLENA' || room.ticketsSold >= room.capacidadMax;
  const isDrawing = room.estado === 'SORTEANDO';
  const percentage = Math.min(100, Math.round((room.ticketsSold / room.capacidadMax) * 100));
  const premioNum = Number(room.premio);

  // Paleta de colores temáticos según el monto del premio
  const getTheme = () => {
    if (premioNum >= 1000) {
      return {
        boxBg: 'from-purple-950/90 via-slate-950 to-indigo-950/90',
        borderColor: 'border-purple-500/40 hover:border-amber-400',
        ribbonV: 'from-amber-400 via-yellow-300 to-amber-500',
        badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        titleColor: 'text-purple-300',
        glow: 'rgba(168, 85, 247, 0.4)',
      };
    }
    if (premioNum >= 200) {
      return {
        boxBg: 'from-rose-950/90 via-slate-950 to-pink-950/90',
        borderColor: 'border-rose-500/40 hover:border-amber-400',
        ribbonV: 'from-yellow-400 via-amber-300 to-yellow-500',
        badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        titleColor: 'text-rose-300',
        glow: 'rgba(244, 63, 94, 0.4)',
      };
    }
    return {
      boxBg: 'from-emerald-950/90 via-slate-950 to-teal-950/90',
      borderColor: 'border-emerald-500/40 hover:border-amber-400',
      ribbonV: 'from-yellow-400 via-amber-300 to-yellow-500',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      titleColor: 'text-emerald-300',
      glow: 'rgba(16, 185, 129, 0.4)',
    };
  };

  const theme = getTheme();

  return (
    <div
      className={`group relative rounded-3xl bg-gradient-to-b ${theme.boxBg} border-2 ${theme.borderColor} p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden flex flex-col justify-between`}
      style={{
        boxShadow: `0 10px 40px -10px ${theme.glow}`,
      }}
    >
      {/* Cintas decorativas del regalo que cruzan la caja */}
      {/* Cinta Vertical */}
      <div className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 sm:w-14 bg-gradient-to-r ${theme.ribbonV} opacity-25 group-hover:opacity-40 transition-opacity pointer-events-none shadow-lg`} />
      
      {/* Cinta Horizontal */}
      <div className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-10 sm:h-12 bg-gradient-to-b ${theme.ribbonV} opacity-20 group-hover:opacity-35 transition-opacity pointer-events-none shadow-lg`} />

      {/* Partículas de destello en esquinas */}
      <div className="absolute top-3 right-3 text-amber-300/60 group-hover:text-amber-300 group-hover:scale-125 transition-all duration-300 pointer-events-none">
        ✨
      </div>
      <div className="absolute bottom-3 left-3 text-amber-300/60 group-hover:text-amber-300 group-hover:scale-125 transition-all duration-300 pointer-events-none">
        🪙
      </div>

      {/* CABECERA DEL REGALO: Moño 3D y Estado */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        {/* Hora del sorteo */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-xs font-mono font-bold text-slate-300">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          {new Date(room.horaSorteo).toLocaleTimeString('es-SV', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>

        {/* Estado */}
        {isFull ? (
          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
            🔒 Llena
          </span>
        ) : isDrawing ? (
          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-yellow-400/20 text-yellow-300 border border-yellow-400/50 animate-pulse flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            Sorteando
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            Abierta
          </span>
        )}
      </div>

      {/* MOÑO GIGANTE DE REGALO */}
      <div className="relative z-10 text-center -mt-2 mb-2">
        <div className="inline-block transform group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
          <div className="relative text-5xl sm:text-6xl select-none filter drop-shadow-[0_8px_16px_rgba(250,204,21,0.5)]">
            🎁
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors mt-1">
          {room.nombre}
        </h3>
      </div>

      {/* CENTRO DEL REGALO: MEDALLÓN DORADO CON VALOR DEL PREMIO Y BOTÓN AL CENTRO */}
      <div className="relative z-10 my-4 py-6 px-4 rounded-3xl bg-slate-900/90 border-2 border-amber-400/50 shadow-2xl backdrop-blur-md flex flex-col items-center justify-center text-center group-hover:border-amber-300 group-hover:shadow-[0_0_35px_rgba(250,204,21,0.35)] transition-all">
        
        {/* Etiqueta Superior del Premio */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-[11px] font-black uppercase tracking-wider text-amber-300 mb-2">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          Premio en Efectivo
        </div>

        {/* VALOR DEL PREMIO EN GRANDE AL CENTRO */}
        <div className="my-1">
          <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-gold-gradient font-mono tracking-tight filter drop-shadow-[0_2px_10px_rgba(250,204,21,0.6)]">
            ${premioNum.toFixed(2)}
          </div>
          <span className="text-xs uppercase font-extrabold text-slate-300 tracking-widest block mt-1">
            Dólares USD Reales
          </span>
        </div>

        {/* BOTÓN AL CENTRO DE INGRESAR A SALA */}
        <div className="w-full mt-4 pt-3 border-t border-white/10 flex justify-center">
          <Link
            href={`/rooms/${room.id}`}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 font-black text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-amber-500/30 hover:shadow-amber-400/60 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
          >
            <span>🎁 Ingresar a la Sala</span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* PIE DEL REGALO: PROGRESO Y COSTO DEL PASE */}
      <div className="relative z-10 space-y-3 mt-2">
        {/* Progreso de boletos */}
        <div>
          <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1.5">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" /> Boletos vendidos:
            </span>
            <span className="text-amber-400 font-bold font-mono">
              {room.ticketsSold} / {room.capacidadMax} ({percentage}%)
            </span>
          </div>

          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div
              style={{ width: `${percentage}%` }}
              className={`h-full rounded-full transition-all duration-500 ${
                isFull
                  ? 'bg-rose-500 shadow-md shadow-rose-500/50'
                  : 'bg-gradient-to-r from-emerald-400 via-yellow-400 to-amber-400 shadow-md shadow-amber-500/50'
              }`}
            />
          </div>
        </div>

        {/* Costo del pase */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-300">
          <span className="font-semibold text-slate-400">Pase de entrada:</span>
          <span className="text-base font-black text-white font-mono bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/10">
            ${Number(room.costoPase).toFixed(2)} USD
          </span>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { Crown, Sparkles } from 'lucide-react';

interface JackpotHeaderProps {
  grandAmount?: number;
  majorAmount?: number;
  minorAmount?: number;
}

export default function JackpotHeader({
  grandAmount = 17589.77,
  majorAmount = 7819.84,
  minorAmount = 906.55,
}: JackpotHeaderProps) {
  // Sutil incremento visual en tiempo real para dar vida estilo máquina de casino
  const [grand, setGrand] = useState(grandAmount);
  const [major, setMajor] = useState(majorAmount);
  const [minor, setMinor] = useState(minorAmount);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrand((prev) => prev + (Math.random() * 0.05 + 0.01));
      setMajor((prev) => prev + (Math.random() * 0.02 + 0.01));
      setMinor((prev) => prev + (Math.random() * 0.01 + 0.005));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-3 select-none">
      <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end">
        {/* ======================================================== */}
        {/* 1. MAJOR JACKPOT (AZUL / CYAN) */}
        {/* ======================================================== */}
        <div className="flex flex-col items-center">
          <span className="px-3 py-0.5 rounded-t-lg bg-sky-500/20 border-t border-x border-sky-400/50 text-sky-300 text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-sm">
            MAJOR
          </span>
          <div className="w-full py-2 px-1 sm:px-3 rounded-2xl bg-gradient-to-b from-sky-950/80 via-slate-900 to-slate-950 border-2 border-sky-400/50 text-center shadow-lg shadow-sky-500/20 backdrop-blur-md">
            <span className="text-sm sm:text-lg lg:text-xl font-black font-mono text-white tracking-tight">
              {major.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="block text-[8px] sm:text-[10px] uppercase font-bold text-sky-400/80 tracking-widest mt-0.5">
              USD
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. GRAND JACKPOT (DORADO / 3D CENTRAL GIGANTE) */}
        {/* ======================================================== */}
        <div className="flex flex-col items-center relative -mt-3">
          {/* Corona y Destellos Decorativos */}
          <div className="relative z-10 flex items-center gap-1 -mb-1 animate-bounce-soft">
            <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 drop-shadow-[0_2px_8px_rgba(250,204,21,0.7)]" />
            <span className="text-xs sm:text-sm font-black text-gold-gradient tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(250,204,21,0.8)]">
              GRAND
            </span>
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
          </div>

          <div className="w-full py-2.5 sm:py-3 px-2 sm:px-4 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-amber-400/20 via-slate-900/90 to-slate-950 border-2 border-amber-400 shadow-xl shadow-amber-500/30 text-center backdrop-blur-md relative overflow-hidden group">
            {/* Brillo dinámico de cinta */}
            <div className="absolute inset-0 ribbon-shine pointer-events-none opacity-40" />

            <span className="text-base sm:text-2xl lg:text-3xl font-black font-mono text-gold-gradient tracking-tight drop-shadow-[0_2px_12px_rgba(250,204,21,0.6)]">
              {grand.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="block text-[9px] sm:text-[11px] uppercase font-black text-amber-300 tracking-widest mt-0.5">
              USD • GRAN BÓVEDA
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. MINOR JACKPOT (MAGENTA / ROSA) */}
        {/* ======================================================== */}
        <div className="flex flex-col items-center">
          <span className="px-3 py-0.5 rounded-t-lg bg-pink-500/20 border-t border-x border-pink-400/50 text-pink-300 text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-sm">
            MINOR
          </span>
          <div className="w-full py-2 px-1 sm:px-3 rounded-2xl bg-gradient-to-b from-pink-950/80 via-slate-900 to-slate-950 border-2 border-pink-400/50 text-center shadow-lg shadow-pink-500/20 backdrop-blur-md">
            <span className="text-sm sm:text-lg lg:text-xl font-black font-mono text-white tracking-tight">
              {minor.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="block text-[8px] sm:text-[10px] uppercase font-bold text-pink-400/80 tracking-widest mt-0.5">
              USD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

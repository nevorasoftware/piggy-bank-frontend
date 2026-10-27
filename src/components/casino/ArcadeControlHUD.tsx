'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, Menu, RotateCw, MessageCircle, Plus, Minus } from 'lucide-react';
import { isSoundEnabled, toggleSound, playClickSound, playCoinSound } from '@/lib/sound';
import HowToPlayModal from './HowToPlayModal';

interface ArcadeControlHUDProps {
  balance?: number;
  lastWin?: number | null;
  ticketValue?: number;
  onBetChange?: (newValue: number) => void;
  onPlayClick?: () => void;
  playButtonText?: string;
}

export default function ArcadeControlHUD({
  balance = 0.00,
  lastWin = null,
  ticketValue = 1.00,
  onBetChange,
  onPlayClick,
  playButtonText = '¡JUGAR!',
}: ArcadeControlHUDProps) {
  const [bet, setBet] = useState(ticketValue);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [helpOpen, setHelpOpen] = useState(false);

  const handleDecrease = () => {
    playClickSound();
    const next = Math.max(0.5, Number((bet - 0.5).toFixed(2)));
    setBet(next);
    if (onBetChange) onBetChange(next);
  };

  const handleIncrease = () => {
    playClickSound();
    const next = Number((bet + 0.5).toFixed(2));
    setBet(next);
    if (onBetChange) onBetChange(next);
  };

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const handleMainAction = () => {
    playCoinSound();
    if (onPlayClick) {
      onPlayClick();
    } else {
      const salasEl = document.getElementById('salas');
      if (salasEl) {
        salasEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-3 select-none">
        {/* ======================================================== */}
        {/* FILA SUPERIOR: LOS 3 PANELES REDONDEADOS CYAN / AZUL */}
        {/* ======================================================== */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
          {/* 1. SALDO USD */}
          <div className="rounded-2xl bg-gradient-to-b from-[#0EA5E9] via-[#0284C7] to-[#0369A1] p-2 sm:p-2.5 text-center text-white shadow-lg shadow-sky-600/30 border-t-2 border-sky-300">
            <span className="block text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-sky-100">
              SALDO USD
            </span>
            <span className="block text-sm sm:text-base lg:text-lg font-black font-mono mt-0.5 drop-shadow-sm">
              ${balance.toFixed(2)}
            </span>
          </div>

          {/* 2. ÚLTIMA GANANCIA USD */}
          <div className="rounded-2xl bg-gradient-to-b from-[#0EA5E9] via-[#0284C7] to-[#0369A1] p-2 sm:p-2.5 text-center text-white shadow-lg shadow-sky-600/30 border-t-2 border-sky-300">
            <span className="block text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-sky-100">
              ÚLTIMA GANANCIA
            </span>
            <span className="block text-sm sm:text-base lg:text-lg font-black font-mono mt-0.5 text-yellow-300 drop-shadow-sm">
              {lastWin !== null && lastWin > 0 ? `$${lastWin.toFixed(2)}` : '0.00'}
            </span>
          </div>

          {/* 3. VALOR APUESTA / PASE USD */}
          <div className="rounded-2xl bg-gradient-to-b from-[#0EA5E9] via-[#0284C7] to-[#0369A1] p-1.5 sm:p-2 text-center text-white shadow-lg shadow-sky-600/30 border-t-2 border-sky-300 relative">
            <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-black uppercase text-sky-100 px-1">
              <span>PASE USD</span>
              <span className="text-lime-300 font-extrabold">∞ LIBRE</span>
            </div>
            <div className="flex items-center justify-between mt-1 px-0.5">
              <button
                onClick={handleDecrease}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-white/20 hover:bg-white/30 active:scale-90 text-white font-black flex items-center justify-center transition-all shadow-inner"
              >
                <Minus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
              <span className="font-mono font-black text-xs sm:text-base drop-shadow-sm">
                ${bet.toFixed(2)}
              </span>
              <button
                onClick={handleIncrease}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-white/20 hover:bg-white/30 active:scale-90 text-white font-black flex items-center justify-center transition-all shadow-inner"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* FILA INFERIOR: BOTONES ARCADE 3D CHUNKY */}
        {/* ======================================================== */}
        <div className="flex items-center justify-between gap-2 sm:gap-3 bg-slate-950/70 p-2 sm:p-3 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
          {/* Botón Menú / Salas (Azul Brillante) */}
          <a
            href="#salas"
            onClick={playClickSound}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-b from-[#38BDF8] to-[#0284C7] border-b-4 border-[#0369A1] hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center text-white shadow-lg shadow-sky-500/20"
            title="Lobby de Salas"
          >
            <Menu className="w-6 h-6 stroke-[2.5]" />
          </a>

          {/* Botón Sonido (Rojo / Coral) */}
          <button
            onClick={handleSoundToggle}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl transition-all flex items-center justify-center text-white shadow-lg ${
              soundOn
                ? 'bg-gradient-to-b from-[#FB7185] to-[#E11D48] border-b-4 border-[#9F1239] shadow-rose-500/30'
                : 'bg-gradient-to-b from-slate-700 to-slate-800 border-b-4 border-slate-900 opacity-70'
            } active:border-b-0 active:translate-y-1`}
            title={soundOn ? 'Sonido Activado' : 'Sonido Desactivado'}
          >
            {soundOn ? (
              <Volume2 className="w-6 h-6 stroke-[2.5]" />
            ) : (
              <VolumeX className="w-6 h-6 stroke-[2.5]" />
            )}
          </button>

          {/* BOTÓN CENTRAL GIGANTE: GIRAR / PARTICIPAR (VERDE / CYAN ARCADE) */}
          <button
            onClick={handleMainAction}
            className="flex-1 h-14 sm:h-16 px-4 rounded-3xl bg-gradient-to-b from-[#4ADE80] via-[#22C55E] to-[#15803D] border-b-4 border-[#166534] hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 sm:gap-3 text-slate-950 font-black shadow-xl shadow-green-500/40 relative overflow-hidden group"
          >
            {/* Anillo de giro girando suave */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/30 flex items-center justify-center shadow-inner group-hover:rotate-180 transition-transform duration-500">
              <RotateCw className="w-5 h-5 text-slate-950 stroke-[3]" />
            </div>
            <span className="text-sm sm:text-lg font-black tracking-wider uppercase text-slate-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
              {playButtonText}
            </span>
          </button>

          {/* Botón Modo Rápido / Reglas (Magenta) */}
          <button
            onClick={() => {
              playClickSound();
              setHelpOpen(true);
            }}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-b from-[#F472B6] to-[#DB2777] border-b-4 border-[#9D174D] hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center text-white shadow-lg shadow-pink-500/20"
            title="Guía y Reglas de Juego"
          >
            <span className="font-mono font-black text-base">?</span>
          </button>

          {/* Botón Chat / Ayuda (Morado Redondo) */}
          <Link
            href="/terms"
            onClick={playClickSound}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#A855F7] to-[#7E22CE] border-b-4 border-[#581C87] hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center text-white shadow-lg shadow-purple-500/30"
            title="Soporte y Términos"
          >
            <MessageCircle className="w-6 h-6 stroke-[2.5]" />
          </Link>
        </div>
      </div>

      {/* Modal ¿Cómo se juega? */}
      <HowToPlayModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}

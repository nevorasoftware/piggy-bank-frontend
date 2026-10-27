'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Volume2, VolumeX, HelpCircle } from 'lucide-react';
import { isSoundEnabled, toggleSound, playClickSound } from '@/lib/sound';
import HowToPlayModal from './HowToPlayModal';

interface TopCasinoBarProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
}

export default function TopCasinoBar({
  title = 'Piggy Bank (Sorteos en Vivo)',
  showBack = false,
  backHref = '/',
}: TopCasinoBarProps) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [modalOpen, setModalOpen] = useState(false);

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#A3E635] via-[#BEF264] to-[#A3E635] text-slate-950 font-black text-xs py-2 px-3 sm:px-6 shadow-md border-b-2 border-lime-600/30 flex items-center justify-between select-none sticky top-0 z-50">
        {/* Izquierda: Flecha de retorno y Título */}
        <div className="flex items-center gap-2 sm:gap-3">
          {showBack ? (
            <Link
              href={backHref}
              onClick={playClickSound}
              className="p-1.5 -ml-1 rounded-lg hover:bg-black/10 active:scale-90 transition-all flex items-center justify-center text-slate-950"
              title="Volver"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3]" />
            </Link>
          ) : (
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping inline-block" />
          )}

          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xs sm:text-sm tracking-tight text-slate-950 truncate max-w-[200px] sm:max-w-none">
              {title}
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] uppercase font-black bg-slate-950 text-lime-400 shadow-sm">
              GeniusBet.sv
            </span>
          </div>
        </div>

        {/* Derecha: Botón ¿Cómo se Juega? y Sonido */}
        <div className="flex items-center gap-2">
          {/* Botón ¿CÓMO SE JUEGA? */}
          <button
            onClick={() => {
              playClickSound();
              setModalOpen(true);
            }}
            className="px-2.5 sm:px-3 py-1 rounded-full bg-[#0284C7] hover:bg-[#0369A1] active:scale-95 text-white font-extrabold text-[10px] sm:text-xs flex items-center gap-1 shadow-sm transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5 text-sky-200 stroke-[2.5]" />
            <span>¿CÓMO SE JUEGA?</span>
          </button>

          {/* Toggle de Audio */}
          <button
            onClick={handleToggleSound}
            className={`p-1.5 rounded-full transition-all active:scale-90 shadow-sm ${
              soundOn ? 'bg-slate-950 text-lime-400 hover:bg-slate-900' : 'bg-slate-900/40 text-slate-700'
            }`}
            title={soundOn ? 'Silenciar Efectos de Casino' : 'Activar Efectos de Casino'}
          >
            {soundOn ? (
              <Volume2 className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <VolumeX className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Modal ¿Cómo se juega? */}
      <HowToPlayModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

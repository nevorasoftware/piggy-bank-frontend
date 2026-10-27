'use client';

import React from 'react';
import { X, ShieldCheck, Trophy, Sparkles, HelpCircle } from 'lucide-react';
import { playClickSound } from '@/lib/sound';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-[#0c0820] border-2 border-amber-400/50 p-6 sm:p-8 shadow-2xl shadow-amber-500/20 max-h-[90vh] overflow-y-auto">
        {/* Botón Cerrar */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30">
            <HelpCircle className="w-6 h-6 font-black" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
              Guía Oficial • GeniusBet
            </span>
            <h2 className="text-2xl font-black text-white">¿Cómo se Juega?</h2>
          </div>
        </div>

        {/* Pasos de Juego */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex items-start gap-3.5">
            <span className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-md">
              1
            </span>
            <div>
              <h4 className="text-sm font-bold text-white">Selecciona tu Sala de Sorteo</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                Explora el lobby con premios desde $10 hasta jackpots mayores. Cada sala cuenta con una cuenta regresiva y capacidad establecida.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex items-start gap-3.5">
            <span className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-md">
              2
            </span>
            <div>
              <h4 className="text-sm font-bold text-white">Adquiere tu Pase Digital</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                Paga de forma 100% segura mediante tarjeta de crédito/débito Visa o Mastercard vía Wompi El Salvador. Sin límite de compras de pases por usuario.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex items-start gap-3.5">
            <span className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-md">
              3
            </span>
            <div>
              <h4 className="text-sm font-bold text-white">Sigue la Ruleta y Sorteo en Vivo</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                Al completarse la sala o llegar la hora programada, la ruleta digital certificada gira en tiempo real para todos los participantes.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 border border-amber-400/40 flex items-start gap-3.5">
            <span className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-md">
              4
            </span>
            <div>
              <h4 className="text-sm font-bold text-amber-300">Cobro Directo con DUI Registrado</h4>
              <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
                Transferencia bancaria directa a cuenta a nombre del titular del <strong className="text-amber-400">DUI registrado</strong>. Límite diario de victorias: máx. 3 premios cada 24 horas.
              </p>
            </div>
          </div>
        </div>

        {/* Restricciones Resumidas */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2 font-semibold">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> +18 Años Solamente
          </span>
          <span className="flex items-center gap-1 text-amber-300">
            <Sparkles className="w-3.5 h-3.5" /> Solo Residentes en El Salvador
          </span>
          <span className="flex items-center gap-1 text-purple-300">
            <Trophy className="w-3.5 h-3.5" /> Máx. 3 Victorias / 24h
          </span>
        </div>

        {/* Botón de Entendido */}
        <div className="mt-6">
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            ¡Entendido, a Jugar!
          </button>
        </div>
      </div>
    </div>
  );
}

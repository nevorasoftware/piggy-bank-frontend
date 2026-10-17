'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Coins } from 'lucide-react';

interface SorteoRouletteProps {
  roomName: string;
  premio: number;
  winnerTicket?: string | null;
  winnerName?: string | null;
  isSpinning: boolean;
  onSpinEnd?: () => void;
}

export default function SorteoRoulette({
  roomName,
  premio,
  winnerTicket,
  winnerName,
  isSpinning,
  onSpinEnd,
}: SorteoRouletteProps) {
  const [displayNumber, setDisplayNumber] = useState('TKT-0000');
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSpinning) {
      setRevealed(false);
      // Animación de números cambiando a alta velocidad simulando la ruleta
      interval = setInterval(() => {
        const rand = Math.floor(1000 + Math.random() * 9000);
        setDisplayNumber(`TKT-${rand}`);
      }, 70);

      // Parar ruleta tras 5 segundos y revelar al ganador
      const timer = setTimeout(() => {
        clearInterval(interval);
        if (winnerTicket) {
          setDisplayNumber(winnerTicket);
        }
        setRevealed(true);

        // Disparar fuegos artificiales / confetti
        triggerConfettiFireworks();

        if (onSpinEnd) onSpinEnd();
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    } else if (winnerTicket) {
      setDisplayNumber(winnerTicket);
      setRevealed(true);
    }
  }, [isSpinning, winnerTicket]);

  const triggerConfettiFireworks = () => {
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.7 },
        colors: ['#FACC15', '#10B981', '#F43F5E', '#FFFFFF'],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.7 },
        colors: ['#FACC15', '#10B981', '#F43F5E', '#FFFFFF'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-3xl p-8 glass-panel border border-amber-500/30 text-center overflow-hidden shadow-2xl shadow-amber-500/10">
      {/* Luces decorativas de casino superiores */}
      <div className="flex justify-center gap-2 mb-6">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              isSpinning ? 'bg-amber-400 animate-ping' : 'bg-amber-500/40'
            }`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-amber-400" />
        <span className="text-xs font-black uppercase tracking-widest text-amber-400">
          {isSpinning ? '¡Girando Ruleta de la Suerte!' : 'Sorteo Oficial'}
        </span>
      </div>

      <h2 className="text-3xl font-black text-white mb-2">{roomName}</h2>
      <p className="text-sm text-slate-400 mb-8">
        Gran Premio Acumulado:{' '}
        <span className="text-gold-gradient font-black text-xl">${Number(premio).toFixed(2)} USD</span>
      </p>

      {/* Visor de la Ruleta Digital de Boletos */}
      <div className="relative py-8 px-6 rounded-2xl bg-slate-950 border-2 border-amber-500/50 shadow-inner mb-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider">
          Boleto Seleccionado
        </div>

        <motion.div
          animate={isSpinning ? { scale: [0.95, 1.05, 0.95] } : { scale: 1 }}
          transition={{ repeat: Infinity, duration: 0.2 }}
          className="text-4xl sm:text-6xl font-black font-mono tracking-widest text-white"
        >
          {displayNumber}
        </motion.div>
      </div>

      {/* Proclamación del Ganador y Cerdito Lanzando Dinero */}
      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-yellow-400 text-slate-950 font-black text-lg shadow-xl shadow-yellow-400/30">
            <Trophy className="w-6 h-6 text-slate-950" />
            ¡TENEMOS UN GANADOR!
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-slate-900 to-emerald-500/20 border border-amber-400/30">
            <div className="text-5xl mb-2 animate-bounce">🐷💸</div>
            <p className="text-xs uppercase font-bold text-slate-400">Premio Adjudicado a:</p>
            <h3 className="text-2xl font-black text-white">{winnerName || 'Ganador Confirmado'}</h3>
            <p className="text-xs text-emerald-400 font-semibold mt-1">
              Boleto Premiado: {displayNumber} • Transferencia de ${Number(premio).toFixed(2)} USD en proceso
            </p>
          </div>
        </motion.div>
      )}

      {/* Indicador de giro si aún está en marcha */}
      {isSpinning && !revealed && (
        <div className="flex items-center justify-center gap-2 text-sm text-amber-300 font-semibold">
          <Coins className="w-4 h-4 animate-spin" />
          El cerdito está eligiendo el boleto de la suerte...
        </div>
      )}
    </div>
  );
}

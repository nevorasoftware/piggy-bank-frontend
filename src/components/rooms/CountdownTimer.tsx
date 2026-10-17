'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
  onFinish?: () => void;
}

export default function CountdownTimer({ targetDate, onFinish }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    isFinished: boolean;
  }>({ hours: 0, minutes: 0, seconds: 0, isFinished: false });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isFinished: true });
        if (onFinish) onFinish();
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds, isFinished: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isFinished) {
    return (
      <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold animate-pulse">
        <Clock className="w-5 h-5 text-amber-400" />
        <span>¡Hora del Sorteo Alcanzada! Girando ruleta...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
        <Clock className="w-3.5 h-3.5 text-amber-400" />
        Tiempo para el Sorteo
      </div>

      <div className="flex items-center gap-2 font-mono">
        {/* Horas */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-2xl font-black text-white border border-white/10 shadow-lg">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Horas</span>
        </div>

        <span className="text-xl font-bold text-amber-400 -mt-4">:</span>

        {/* Minutos */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-2xl font-black text-amber-400 border border-amber-500/30 shadow-lg">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Mins</span>
        </div>

        <span className="text-xl font-bold text-amber-400 -mt-4">:</span>

        {/* Segundos */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-2xl font-black text-emerald-400 border border-emerald-500/30 shadow-lg">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Segs</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Ticket } from '@/types';
import { Sparkles, QrCode, CheckCircle, ShieldCheck, Trophy, Clock, XCircle } from 'lucide-react';

interface DigitalPassProps {
  ticket: Ticket;
  userName: string;
  userDui?: string;
  roomName: string;
}

export default function DigitalPass({
  ticket,
  userName,
  userDui,
  roomName,
}: DigitalPassProps) {
  const isWinner = ticket.estado === 'GANADOR';
  const isRoomFinished = ticket.room?.estado === 'FINALIZADA';
  const isPaid = ticket.room?.sorteo?.estadoPago === 'PAGADO';
  const isLoser = ticket.estado === 'NO_GANADOR' || (isRoomFinished && !isWinner);

  // Determinar estilos dinámicos de marco, borde y animaciones según los requisitos
  let containerGradient = 'from-amber-400 via-yellow-200 to-amber-600 shadow-2xl shadow-amber-500/20';
  let containerAnimation = '';
  let iconBadge = '🎟️';
  let iconBorder = 'border-amber-500/30 bg-amber-500/20';

  if (isWinner && isPaid) {
    // 1. Ganador y ya pagado: Marco VERDE con animación
    containerGradient = 'from-emerald-400 via-green-300 to-teal-500 animate-glow-green border-2 border-emerald-400 shadow-2xl shadow-emerald-500/50';
    containerAnimation = 'scale-[1.01]';
    iconBadge = '🏆';
    iconBorder = 'border-emerald-500/50 bg-emerald-500/20 shadow-lg shadow-emerald-500/30';
  } else if (isWinner && !isPaid) {
    // 2. Ganador pero aún no pagado: Marco AMARILLO con animación
    containerGradient = 'from-yellow-300 via-amber-400 to-yellow-500 animate-glow-yellow border-2 border-amber-400 shadow-2xl shadow-yellow-500/50';
    containerAnimation = 'scale-[1.01]';
    iconBadge = '🌟';
    iconBorder = 'border-amber-500/50 bg-amber-500/20 shadow-lg shadow-yellow-500/30';
  } else if (isLoser) {
    // 3. Perdedor: Marco ROJO y estado cambiado de confirmado a finalizado
    containerGradient = 'from-rose-600 via-red-500 to-rose-700 border-2 border-rose-500/80 shadow-xl shadow-rose-500/20';
    iconBadge = '🎟️';
    iconBorder = 'border-rose-500/40 bg-rose-500/10';
  }

  return (
    <div className={`relative w-full max-w-md mx-auto rounded-3xl p-0.5 bg-gradient-to-br ${containerGradient} ${containerAnimation} transition-all duration-300 overflow-hidden`}>
      {/* Tarjeta interior oscura con textura de casino */}
      <div className="relative rounded-[22px] bg-slate-950 p-6 overflow-hidden">
        {/* Fondo decorativo con marca de agua */}
        <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none select-none text-[160px]">
          🐷
        </div>

        {/* Encabezado del Pase */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className={`w-11 h-11 rounded-xl ${iconBorder} flex items-center justify-center text-2xl transition-transform hover:scale-110`}>
              {iconBadge}
            </div>
            <div>
              <span className={`text-[10px] font-bold tracking-widest uppercase block ${
                isWinner && isPaid
                  ? 'text-emerald-400'
                  : isWinner
                  ? 'text-amber-400'
                  : isLoser
                  ? 'text-rose-400'
                  : 'text-amber-400'
              }`}>
                Pase Oficial de Sorteo
              </span>
              <h3 className="text-lg font-black text-white truncate max-w-[190px] sm:max-w-xs">{roomName}</h3>
            </div>
          </div>

          <div>
            {isWinner && isPaid ? (
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 flex items-center gap-1.5 shadow-lg shadow-emerald-500/40 animate-bounce">
                <Trophy className="w-3.5 h-3.5 text-slate-950" /> ¡PAGADO! 🏆
              </span>
            ) : isWinner && !isPaid ? (
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 flex items-center gap-1.5 shadow-lg shadow-yellow-400/40 animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-slate-950" /> ¡GANADOR! 🌟
              </span>
            ) : isLoser ? (
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1 shadow-sm">
                <XCircle className="w-3.5 h-3.5 text-rose-400" /> FINALIZADO
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> CONFIRMADO
              </span>
            )}
          </div>
        </div>

        {/* Detalles del Jugador */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Titular del Pase</span>
            <p className="text-sm font-bold text-white truncate">{userName}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">DUI Verificado</span>
            <p className="text-sm font-mono font-bold text-amber-400">{userDui || '00000000-0'}</p>
          </div>
        </div>

        {/* Número de Boleto Destacado */}
        <div className={`p-4 rounded-2xl bg-slate-900 border flex items-center justify-between mb-4 ${
          isWinner && isPaid
            ? 'border-emerald-500/50 bg-emerald-950/20'
            : isWinner
            ? 'border-amber-500/50 bg-amber-950/20'
            : isLoser
            ? 'border-rose-500/30 bg-rose-950/10'
            : 'border-white/10'
        }`}>
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block ${
              isWinner && isPaid
                ? 'text-emerald-400'
                : isWinner
                ? 'text-amber-400'
                : isLoser
                ? 'text-rose-400'
                : 'text-slate-400'
            }`}>
              {isWinner ? 'Boleto Ganador de Sorteo' : 'Número de Boleto Único'}
            </span>
            <p className={`text-2xl font-black font-mono tracking-widest ${
              isWinner && isPaid
                ? 'text-emerald-300'
                : isWinner
                ? 'text-yellow-300'
                : 'text-white'
            }`}>
              {ticket.ticketNumber}
            </p>
          </div>
          <div className={`p-2.5 rounded-xl border ${
            isWinner && isPaid
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : isWinner
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              : isLoser
              ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
              : 'bg-white/5 border-white/10 text-amber-400'
          }`}>
            <QrCode className="w-8 h-8" />
          </div>
        </div>

        {/* Banners Informativos de Estado */}
        {isWinner && isPaid ? (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3 shadow-lg shadow-emerald-500/10">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 animate-bounce" />
            <div>
              <strong className="text-white block font-black">¡Premio Pagado con Éxito!</strong>
              <p className="text-[11px] text-emerald-200 mt-0.5 leading-snug">
                La transferencia de tu premio fue realizada y confirmada a tu cuenta bancaria.
              </p>
            </div>
          </div>
        ) : isWinner && !isPaid ? (
          <div className="mb-4 p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-3 animate-pulse">
            <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 animate-spin" />
            <div>
              <strong className="text-amber-300 block font-black">Transferencia en Proceso</strong>
              <p className="text-[11px] text-amber-100 mt-0.5 leading-snug">
                Tu premio está registrado y en proceso de pago por administración.
              </p>
            </div>
          </div>
        ) : isLoser ? (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5">
            <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span className="text-[11px] leading-snug">
              Este sorteo ha finalizado. ¡Gracias por participar y suerte en la próxima sala!
            </span>
          </div>
        ) : null}

        {/* Pie de Boleto con sellos de seguridad */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className={`w-3.5 h-3.5 ${
              isWinner ? 'text-emerald-400' : isLoser ? 'text-slate-500' : 'text-emerald-400'
            }`} />
            Pago Seguro 3DS / PCI DSS
          </span>
          <span className="font-mono text-[10px] text-slate-500">
            EMITIDO: {new Date(ticket.createdAt).toLocaleDateString('es-SV')}
          </span>
        </div>
      </div>
    </div>
  );
}

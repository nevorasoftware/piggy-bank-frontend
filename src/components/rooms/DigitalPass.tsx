'use client';

import React from 'react';
import { Ticket } from '@/types';
import { Sparkles, QrCode, CheckCircle, ShieldCheck } from 'lucide-react';

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

  return (
    <div className="relative w-full max-w-md mx-auto rounded-3xl p-0.5 bg-gradient-to-br from-amber-400 via-yellow-200 to-amber-600 shadow-2xl shadow-amber-500/20 overflow-hidden">
      {/* Tarjeta holográfica interior */}
      <div className="relative rounded-[22px] bg-slate-950 p-6 overflow-hidden">
        {/* Fondo decorativo con marca de agua */}
        <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none select-none text-[160px]">
          🐷
        </div>

        {/* Encabezado del Pase */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xl">
              🎟️
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                Pase Oficial de Sorteo
              </span>
              <h3 className="text-lg font-black text-white">{roomName}</h3>
            </div>
          </div>

          <div>
            {isWinner ? (
              <span className="px-3 py-1 rounded-full text-xs font-black bg-yellow-400 text-slate-950 flex items-center gap-1 shadow-lg shadow-yellow-400/30">
                <Sparkles className="w-3.5 h-3.5" /> GANADOR
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> CONFIRMADO
              </span>
            )}
          </div>
        </div>

        {/* Detalles del Jugador */}
        <div className="grid grid-cols-2 gap-4 mb-6">
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
        <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Número de Boleto Único
            </span>
            <p className="text-2xl font-black font-mono tracking-widest text-white">
              {ticket.ticketNumber}
            </p>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-amber-400">
            <QrCode className="w-8 h-8" />
          </div>
        </div>

        {/* Pie de Boleto con código de barras simulado y sellos de seguridad */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
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

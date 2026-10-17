'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Room } from '@/types';
import { apiRequest } from '@/lib/api';
import { useSocket } from '@/context/SocketContext';
import { Sparkles, Trophy, Users, Clock, ShieldCheck, ArrowRight, Zap, Coins } from 'lucide-react';

export default function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket();

  const fetchRooms = async () => {
    try {
      const res = await apiRequest('/api/rooms');
      if (res.success && res.rooms) {
        setRooms(res.rooms);
      }
    } catch (err) {
      console.error('Error al cargar salas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();

    if (socket) {
      socket.on('rooms:list_update', () => {
        fetchRooms();
      });
      socket.on('room:update', () => {
        fetchRooms();
      });
    }

    return () => {
      if (socket) {
        socket.off('rooms:list_update');
        socket.off('room:update');
      }
    };
  }, [socket]);

  return (
    <div className="flex-1 flex flex-col">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-white/5">
        {/* Luces y gradientes de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-amber-500/15 via-rose-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/30 text-amber-300 text-xs font-bold mb-8 animate-bounce-soft">
            <Sparkles className="w-4 h-4 text-amber-400" />
            ¡Salas de Sorteo con Premios Instantáneos en El Salvador!
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6">
            Llena la Alcancía, <br />
            <span className="text-gold-gradient">Gana Dinero en Efectivo</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 mb-10 leading-relaxed">
            Compra tu pase con Wompi, sigue la cuenta regresiva en vivo y si el cerdito te elige, recibe tu premio directo en tu cuenta bancaria salvadoreña.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#salas"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 text-slate-950 font-black text-base shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Coins className="w-5 h-5 text-slate-950" />
              Ver Salas Disponibles
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/auth/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 text-white font-bold text-base transition-colors flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              Crear Cuenta con DUI
            </Link>
          </div>

          {/* Estadísticas en vivo */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-10 border-t border-white/5">
            <div className="glass-panel p-4 rounded-2xl border border-white/5">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">$15,400+</span>
              <p className="text-xs text-slate-400 mt-1">Premios Entregados</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/5">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">100%</span>
              <p className="text-xs text-slate-400 mt-1">Pagos con Wompi SV</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/5">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">10 Min</span>
              <p className="text-xs text-slate-400 mt-1">Avisos por WhatsApp</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/5">
              <span className="text-2xl sm:text-3xl font-black text-rose-400 font-mono">6 / 3</span>
              <p className="text-xs text-slate-400 mt-1">Límite Diario Responsable</p>
            </div>
          </div>
        </div>
      </section>

      {/* SALAS EN JUEGO */}
      <section id="salas" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
              <Trophy className="w-4 h-4" /> Salas Activas
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Elige tu Sorteo de Hoy</h2>
          </div>
          <p className="text-sm text-slate-400 mt-2 md:mt-0">
            Los boletos se asignan al instante tras validar tu pago.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-3xl glass-panel animate-pulse" />
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-3xl border border-white/10 p-8">
            <span className="text-5xl mb-4 block">🐷</span>
            <h3 className="text-xl font-bold text-white mb-2">No hay salas abiertas en este momento</h3>
            <p className="text-slate-400 text-sm">Pronto abriremos nuevas alcancías con premios en efectivo.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => {
              const isFull = room.estado === 'LLENA' || room.ticketsSold >= room.capacidadMax;
              const isDrawing = room.estado === 'SORTEANDO';
              const percentage = Math.min(100, Math.round((room.ticketsSold / room.capacidadMax) * 100));

              return (
                <div
                  key={room.id}
                  className="group relative rounded-3xl glass-panel border border-white/10 p-6 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Etiqueta de Estado */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {new Date(room.horaSorteo).toLocaleTimeString('es-SV', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>

                    {isFull ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        Alcancía Llena
                      </span>
                    ) : isDrawing ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 animate-pulse">
                        Sorteando
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Abierta
                      </span>
                    )}
                  </div>

                  {/* Título de Sala y Premio */}
                  <div className="mb-6">
                    <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors mb-2">
                      {room.nombre}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-gold-gradient font-mono">
                        ${Number(room.premio).toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">USD en Efectivo</span>
                    </div>
                  </div>

                  {/* Barra de progreso de cupos */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs text-slate-300 font-semibold">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" /> Boletos vendidos:
                      </span>
                      <span className="text-amber-400 font-bold">
                        {room.ticketsSold} / {room.capacidadMax}
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                      <div
                        style={{ width: `${percentage}%` }}
                        className={`h-full rounded-full transition-all duration-500 ${
                          isFull
                            ? 'bg-rose-500'
                            : 'bg-gradient-to-r from-emerald-400 to-amber-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Costo del Pase y Botón de Entrada */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Costo del Pase</span>
                      <span className="text-lg font-black text-white font-mono">
                        ${Number(room.costoPase).toFixed(2)} <span className="text-xs text-slate-400">USD</span>
                      </span>
                    </div>

                    <Link
                      href={`/rooms/${room.id}`}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-md shadow-amber-500/10 flex items-center gap-1.5"
                    >
                      Entrar a Sala
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-20 border-t border-white/5 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-white mb-4">¿Cómo Funciona PiggyBank?</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-16">
            Participar es rápido, seguro y cumple con todos los estándares salvadoreños.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-2xl font-black mx-auto mb-6">
                1
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Regístrate y Elige tu Sala</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ingresa con tu DUI salvadoreño. Cada sala indica el monto del premio acumulado y el costo de su pase digital.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-2xl font-black mx-auto mb-6">
                2
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Compra tu Pase con Wompi</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Paga de forma encriptada con tus tarjetas bancarias. Recibirás tu boleto al instante en la sala y un recordatorio 10 min antes en WhatsApp.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-2xl font-black mx-auto mb-6">
                3
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Vive el Sorteo & Cobra</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mira la ruleta girar en vivo. Si resultas ganador, el equipo transfiere tu dinero directamente a tu cuenta bancaria registrada.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

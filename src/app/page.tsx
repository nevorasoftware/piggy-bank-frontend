'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Room } from '@/types';
import { apiRequest } from '@/lib/api';
import { useSocket } from '@/context/SocketContext';
import GiftRoomCard from '@/components/rooms/GiftRoomCard';
import PiggyMascot from '@/components/ui/PiggyMascot';
import { Sparkles, Trophy, Users, Clock, ShieldCheck, ArrowRight, Zap, Coins, Gift } from 'lucide-react';

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
      {/* HERO SECTION CON ANIMACIONES Y CERDITO */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-white/5">
        {/* Luces y gradientes de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-radial from-amber-500/20 via-pink-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Cerdito Mascota Animado en Grande con Lluvia de Monedas */}
          <div className="mb-4 flex justify-center">
            <PiggyMascot size="lg" showCoins={true} />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-amber-400/40 text-amber-300 text-xs font-bold mb-6 animate-bounce-soft shadow-lg shadow-amber-500/20">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>¡Salas de Sorteo con Premios Instantáneos en El Salvador!</span>
            <span className="text-base">🎁</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6">
            Abre tu Regalo, <br />
            <span className="text-gold-gradient drop-shadow-[0_4px_16px_rgba(250,204,21,0.5)]">
              Gana Dinero en Efectivo
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 mb-10 leading-relaxed font-medium">
            Entra a tu sala de regalo favorita, consigue tu pase pagando con tu tarjeta de crédito o débito (Visa o Mastercard) y sigue la cuenta regresiva en vivo. Si el cerdito de la suerte te elige, el premio va directo a tu cuenta bancaria.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#salas"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 hover:shadow-amber-400/60 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <Gift className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
              Ver Salas de Regalo
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/auth/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/50 text-white font-bold text-base hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              Crear Cuenta con DUI
            </Link>
          </div>

          {/* Estadísticas en vivo */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-10 border-t border-white/10">
            <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-amber-400/30 transition-colors">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">$15,400+</span>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Premios Entregados</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-amber-400/30 transition-colors">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">100%</span>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Tarjeta Crédito / Débito</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-amber-400/30 transition-colors">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">10 Min</span>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Avisos por WhatsApp</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-amber-400/30 transition-colors">
              <span className="text-2xl sm:text-3xl font-black text-rose-400 font-mono">6 / 3</span>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Límite Diario Seguro</p>
            </div>
          </div>
        </div>
      </section>

      {/* SALAS EN JUEGO - CAJAS DE REGALO GIGANTES */}
      <section id="salas" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-widest mb-2">
              <Gift className="w-4 h-4 text-amber-400 animate-bounce" /> Salas de Regalo Activas
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Abre tu Regalo y Participa
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-2 md:mt-0 font-medium">
            Paga tu pase con tarjeta de crédito o débito Visa o Mastercard de forma 100% segura.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 rounded-3xl glass-panel animate-pulse border border-white/10" />
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-3xl border border-white/10 p-8 shadow-2xl">
            <span className="text-6xl mb-4 block animate-bounce">🎁</span>
            <h3 className="text-2xl font-black text-white mb-2">No hay regalos disponibles en este momento</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Estamos preparando nuevas alcancías y cajas de regalo con premios en efectivo para ti.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <GiftRoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-20 border-t border-white/5 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">¿Cómo Funciona PiggyBank?</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-16">
            Participar es rápido, seguro y cumple con todos los estándares salvadoreños.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 text-left hover:border-amber-400/40 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl mb-6">
                🎁
              </div>
              <h3 className="text-xl font-black text-white mb-2">1. Elige tu Regalo</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Selecciona la sala con el premio que deseas ($50, $250 o hasta $1,000 en efectivo) y el horario que más te convenga.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-white/10 text-left hover:border-amber-400/40 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl mb-6">
                💳
              </div>
              <h3 className="text-xl font-black text-white mb-2">2. Asegura tu Boleto</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Paga tu pase al instante con cualquier tarjeta de crédito o débito Visa o Mastercard, protegido por 3D Secure y estándares PCI DSS.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-white/10 text-left hover:border-amber-400/40 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-3xl mb-6">
                🏆
              </div>
              <h3 className="text-xl font-black text-white mb-2">3. Sorteo y Pago Directo</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Al llegar la hora, la ruleta digital selecciona al azar el boleto ganador. Si eres el afortunado, recibes tu dinero por transferencia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Room } from '@/types';
import { apiRequest } from '@/lib/api';
import { useSocket } from '@/context/SocketContext';
import { useAuth } from '@/context/AuthContext';
import GiftRoomCard from '@/components/rooms/GiftRoomCard';
import TopCasinoBar from '@/components/casino/TopCasinoBar';
import CasinoStageHero from '@/components/casino/CasinoStageHero';
import { Gift, Crown, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket();
  const { user } = useAuth();

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
    <div className="flex-1 flex flex-col bg-[#070A12] text-slate-100">
      {/* ======================================================== */}
      {/* 1. BARRA SUPERIOR DE CASINO MÓVIL (ESTILO GENIUSBET PIGGY TAP) */}
      {/* ======================================================== */}
      <TopCasinoBar title="Piggy Bank (Sorteos en Vivo)" />

      {/* ======================================================== */}
      {/* 2. ESCENARIO CENTRAL GAMING: 3 JACKPOTS, MONTAÑA DE ORO Y HUD */}
      {/* ======================================================== */}
      <CasinoStageHero userBalance={0} />

      {/* ======================================================== */}
      {/* 3. LOBBY DE SALAS DE REGALO ACTIVAS */}
      {/* ======================================================== */}
      <section id="salas" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-widest mb-2 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
              <Gift className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>Salas de Sorteo Activas</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Abre tu Regalo y Participa
            </h2>
          </div>
          <p className="text-sm text-slate-300 mt-2 md:mt-0 font-medium max-w-md">
            Elige la sala con el premio que deseas. Paga seguro con tarjeta y sigue la cuenta regresiva en vivo.
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

      {/* ======================================================== */}
      {/* 4. SHOWCASE DE PERSONAJES OFICIALES DE PIGGYBANK */}
      {/* ======================================================== */}
      <section className="py-20 border-t border-white/10 bg-gradient-to-b from-slate-950 via-[#0d091f] to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black uppercase tracking-wider mb-3 border border-purple-500/30">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Conoce a los Anfitriones</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Los Personajes de PiggyBank
            </h2>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              Cada personaje cumple un rol fundamental para garantizar diversión, sorteos justos y acreditación directa de premios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Personaje 1: El Rey Cerdito */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-slate-900 to-slate-950 text-center flex flex-col items-center hover:-translate-y-2 transition-all duration-300 shadow-xl group">
              <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-purple-500 to-yellow-300 shadow-xl shadow-amber-500/30 mb-6 group-hover:scale-105 transition-transform">
                <img
                  src="/images/piggy-logo.jpg"
                  alt="Rey Piggy Oficial"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md mb-2">
                LA MASCOTA OFICIAL
              </span>
              <h3 className="text-2xl font-black text-white mb-2">El Rey Piggy</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                El guardián de la alcancía dorada. Representa la suerte, la abundancia y el acumulado de cada sala comunitaria.
              </p>
            </div>

            {/* Personaje 2: El Banquero */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-500/10 via-slate-900 to-slate-950 text-center flex flex-col items-center hover:-translate-y-2 transition-all duration-300 shadow-xl group">
              <div className="relative w-36 h-36 rounded-3xl overflow-hidden ring-4 ring-purple-400/50 shadow-xl shadow-purple-500/30 mb-6 group-hover:scale-105 transition-transform">
                <img
                  src="/images/banquero.jpg"
                  alt="El Banquero"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-400 text-slate-950 shadow-md mb-2">
                SEGURIDAD Y PAGOS
              </span>
              <h3 className="text-2xl font-black text-white mb-2">El Banquero</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Supervisa la mesa de juego, valida las compras vía Wompi y coordina las transferencias directas a cuentas con DUI verificado.
              </p>
            </div>

            {/* Personaje 3: La Presentadora */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-pink-500/30 bg-gradient-to-b from-pink-500/10 via-slate-900 to-slate-950 text-center flex flex-col items-center hover:-translate-y-2 transition-all duration-300 shadow-xl group">
              <div className="relative w-36 h-36 rounded-3xl overflow-hidden ring-4 ring-pink-400/50 shadow-xl shadow-pink-500/30 mb-6 group-hover:scale-105 transition-transform">
                <img
                  src="/images/premios-host.jpg"
                  alt="Anfitriona de Premios"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-pink-400 text-slate-950 shadow-md mb-2">
                SORTEOS EN VIVO
              </span>
              <h3 className="text-2xl font-black text-white mb-2">Premios y Sorteos</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Conduce los sorteos de la ruleta, anuncia el boleto ganador en tiempo real y celebra la victoria de los afortunados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. CÓMO FUNCIONA EN 3 PASOS */}
      {/* ======================================================== */}
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

      {/* ======================================================== */}
      {/* 6. BANNER LEGAL Y JUEGO RESPONSABLE (+18) */}
      {/* ======================================================== */}
      <section className="py-12 border-t border-white/5 bg-gradient-to-b from-slate-950/60 to-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900/90 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                <span>⚖️ Marco Legal y Transparencia • El Salvador</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Sorteos Seguros, Verificables y Confiables
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Medio de Entrega: Transferencia bancaria directa a cuenta a nombre del titular del DUI registrado. Máximo 3 premios ganados por usuario cada 24 horas. Exclusivo mayores de 18 años.
              </p>
            </div>
            <Link
              href="/terms"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20 shrink-0 flex items-center gap-2"
            >
              <span>Leer Términos y Condiciones</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

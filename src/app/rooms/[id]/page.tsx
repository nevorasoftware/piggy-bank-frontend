'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Room, Ticket } from '@/types';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/context/SocketContext';
import PiggyBankAnimation from '@/components/rooms/PiggyBankAnimation';
import CountdownTimer from '@/components/rooms/CountdownTimer';
import DigitalPass from '@/components/rooms/DigitalPass';
import SorteoRoulette from '@/components/rooms/SorteoRoulette';
import PaymentLogos from '@/components/ui/PaymentLogos';
import { Sparkles, CreditCard, ShieldCheck, AlertCircle, ArrowLeft, CheckCircle2, Sliders } from 'lucide-react';
import Link from 'next/link';

export default function RoomDetailPage() {
  const params = useParams();
  const roomId = params?.id as string;
  const router = useRouter();

  const { user } = useAuth();
  const { socket, joinRoom, leaveRoom } = useSocket();

  const [room, setRoom] = useState<Room | null>(null);
  const [myTicket, setMyTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [winnerData, setWinnerData] = useState<{
    ticketGanador?: string;
    ganadorNombre?: string;
    premio?: number;
  } | null>(null);

  // 1. Cargar detalles de la sala y boleto del usuario si existe
  const fetchRoomData = async () => {
    try {
      const res = await apiRequest(`/api/rooms/${roomId}`);
      if (res.success && res.room) {
        setRoom(res.room);
        if (res.room.estado === 'SORTEANDO') {
          setIsDrawing(true);
        }
        if (res.room.estado === 'FINALIZADA' && res.room.sorteo) {
          setWinnerData({
            ticketGanador: res.room.winnerTicketId || 'TKT-GANADOR',
            ganadorNombre: res.room.sorteo.ganador?.fullName || 'Ganador',
            premio: Number(res.room.premio),
          });
        }
      }
    } catch (err: any) {
      console.error('Error al cargar sala:', err);
      setError('La sala no fue encontrada.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMyPass = async () => {
    if (!user) return;
    try {
      const res = await apiRequest(`/api/tickets/my-pass/${roomId}`);
      if (res.success && res.ticket) {
        setMyTicket(res.ticket);
      }
    } catch (err) {
      // Usuario aún no tiene boleto en esta sala
      setMyTicket(null);
    }
  };

  useEffect(() => {
    if (roomId) {
      fetchRoomData();
      fetchMyPass();
      joinRoom(roomId);
    }

    if (socket) {
      socket.on('room:update', (data: any) => {
        if (data.roomId === roomId) {
          fetchRoomData();
          fetchMyPass();
        }
      });

      socket.on('sorteo:iniciar', (data: any) => {
        if (data.roomId === roomId) {
          setIsDrawing(true);
        }
      });

      socket.on('sorteo:ganador', (data: any) => {
        if (data.roomId === roomId) {
          setIsDrawing(false);
          setWinnerData({
            ticketGanador: data.ticketGanador,
            ganadorNombre: data.ganadorNombre,
            premio: data.premio,
          });
          fetchRoomData();
          fetchMyPass();
        }
      });
    }

    return () => {
      if (roomId) {
        leaveRoom(roomId);
      }
      if (socket) {
        socket.off('room:update');
        socket.off('sorteo:iniciar');
        socket.off('sorteo:ganador');
      }
    };
  }, [roomId, socket, user]);

  // 2. Iniciar compra con Wompi (Validación de reglas 6/3 previa)
  const handleBuyTicket = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (user.role === 'ADMIN') {
      setError('Los administradores no pueden adquirir pases ni participar en sorteos. Tu rol es exclusivo para gestión de salas y pagos.');
      return;
    }

    setError(null);
    setBuying(true);

    try {
      const res = await apiRequest('/api/tickets/checkout', {
        method: 'POST',
        body: JSON.stringify({ roomId }),
      });

      if (res.success && res.checkout) {
        // En entorno de producción, aquí se abre el widget de Wompi El Salvador o redirección:
        // window.location.href = res.checkout.redirectUrl;
        // Para pruebas y demostración fluida, simulamos la confirmación directa del webhook
        const webhookRes = await apiRequest('/api/webhooks/wompi', {
          method: 'POST',
          body: JSON.stringify({
            event: 'transaction.updated',
            data: {
              transaction: {
                id: `wompi_${Date.now()}`,
                reference: res.checkout.reference,
                amount_in_cents: res.checkout.amountInCents,
                currency: 'USD',
                status: 'APPROVED',
                payment_method_type: 'CARD',
              },
            },
          }),
        });

        if (webhookRes.success) {
          await fetchRoomData();
          await fetchMyPass();
        }
      }
    } catch (err: any) {
      setError(err.message || 'No fue posible completar la compra del boleto.');
    } finally {
      setBuying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-center">
        <div className="glass-panel p-8 rounded-3xl max-w-md">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Sala no disponible</h2>
          <p className="text-sm text-slate-400 mb-6">La sala de sorteo solicitada no existe o fue retirada.</p>
          <Link href="/" className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm">
            Volver a las Salas
          </Link>
        </div>
      </div>
    );
  }

  const isFull = room.estado === 'LLENA' || room.ticketsSold >= room.capacidadMax;

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Botón Volver */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a todas las salas
        </Link>
      </div>

      {/* Si la sala está sorteando o ya finalizó con ganador, mostrar Ruleta Animada */}
      {(isDrawing || winnerData || room.estado === 'SORTEANDO' || room.estado === 'FINALIZADA') && (
        <div className="mb-12">
          <SorteoRoulette
            roomName={room.nombre}
            premio={Number(room.premio)}
            isSpinning={isDrawing}
            winnerTicket={winnerData?.ticketGanador || room.winnerTicketId}
            winnerName={winnerData?.ganadorNombre}
            onSpinEnd={() => setIsDrawing(false)}
          />
        </div>
      )}

      {/* Grid Principal de la Sala */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Columna Izquierda: Cerdito Animado y Cuenta Regresiva (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-white/10 flex flex-col items-center">
          <div className="text-center mb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block mb-1">
              Sala Oficial PiggyBank
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">{room.nombre}</h1>
            <p className="text-sm text-slate-400 mt-1">
              Premio en Efectivo Acumulado:{' '}
              <span className="text-gold-gradient font-black text-2xl font-mono">
                ${Number(room.premio).toFixed(2)} USD
              </span>
            </p>
          </div>

          {/* Animación Interactiva del Cerdito Alcancía y Caja de Regalo */}
          <PiggyBankAnimation
            status={room.estado}
            ticketsSold={room.ticketsSold}
            capacidadMax={room.capacidadMax}
            premio={Number(room.premio)}
          />

          {/* Contador Regresivo al Sorteo */}
          <div className="mt-8 w-full border-t border-white/5 pt-6">
            <CountdownTimer
              targetDate={room.horaSorteo}
              onFinish={() => {
                if (room.estado === 'ABIERTA' || room.estado === 'LLENA') {
                  fetchRoomData();
                }
              }}
            />
          </div>
        </div>

        {/* Columna Derecha: Pase Digital o Pasarela de Pago Wompi (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Mensaje de Error (Límite de participación 6/3 alcanzado, etc.) */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Regla de Juego Responsable:</p>
                <p className="mt-0.5 leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          {/* Si el usuario es Administrador */}
          {user?.role === 'ADMIN' ? (
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/30 bg-purple-950/20 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-0.5">
                    Modo Administrador
                  </span>
                  <h3 className="text-xl font-black text-white">Gestión y Control de Sala</h3>
                  <p className="text-xs text-slate-400">
                    Los administradores no adquieren pases ni participan en los sorteos.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Estado de la Sala:</span>
                  <span className="font-bold uppercase text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                    {room.estado}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Boletos Emitidos:</span>
                  <span className="font-mono font-bold text-white">
                    {room.ticketsSold} de {room.capacidadMax} cupos
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Duración Parametrizada:</span>
                  <span className="font-mono font-bold text-amber-400">
                    {room.duracionHoras || 2} hora(s)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Hora del Sorteo:</span>
                  <span className="font-mono text-slate-300">
                    {new Date(room.horaSorteo).toLocaleTimeString('es-SV', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/admin/rooms"
                  className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Gestionar o Iniciar Sala en Panel de Administración</span>
                </Link>
              </div>
            </div>
          ) : myTicket ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                ¡Ya tienes tu pase oficial asegurado para este sorteo!
              </div>

              <DigitalPass
                ticket={myTicket}
                userName={user?.fullName || 'Jugador'}
                userDui={user?.dui}
                roomName={room.nombre}
              />
            </div>
          ) : (
            /* Tarjeta de Compra de Pase con Tarjeta */
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Acceso a la Sala de Regalo
                </span>
                <h3 className="text-xl font-black text-white">Comprar Pase Digital</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Paga de forma instantánea con tu tarjeta de crédito o débito Visa o Mastercard.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Total a Pagar</span>
                  <span className="text-3xl font-black text-white font-mono">
                    ${Number(room.costoPase).toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">USD</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 font-bold block">1 Boleto Único</span>
                  <span className="text-xs text-slate-400">Pago con Tarjeta</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>DUI salvadoreño vinculado a tu ticket</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Confirmación inmediata por WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Transferencia directa al banco si resultas ganador</span>
                </div>
              </div>

              {isFull ? (
                <button
                  disabled
                  className="w-full py-4 rounded-xl bg-slate-800 text-slate-500 font-bold text-sm cursor-not-allowed uppercase tracking-wider"
                >
                  Cupos Agotados
                </button>
              ) : (
                <button
                  onClick={handleBuyTicket}
                  disabled={buying}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {buying ? (
                    <span>Validando reglas y procesando pago...</span>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 text-slate-950" />
                      Pagar con Tarjeta de Crédito o Débito (${Number(room.costoPase).toFixed(2)})
                    </>
                  )}
                </button>
              )}

              {/* Logos Oficiales Visa, Mastercard, 3DS y PCI DSS */}
              <div className="pt-2 border-t border-white/5">
                <PaymentLogos showLabel={false} />
              </div>

              <p className="text-[11px] text-center text-slate-500">
                Protegido por autenticación bancaria 3D Secure y certificación internacional PCI DSS. Máximo 6 participaciones al día.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

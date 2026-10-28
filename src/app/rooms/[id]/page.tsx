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
import TopCasinoBar from '@/components/casino/TopCasinoBar';
import JackpotHeader from '@/components/casino/JackpotHeader';
import { Sparkles, CreditCard, ShieldCheck, AlertCircle, ArrowLeft, CheckCircle2, Sliders, Clock, Trophy, XCircle } from 'lucide-react';
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
  const [resultModal, setResultModal] = useState<'WINNER' | 'LOSER' | 'SPECTATOR' | null>(null);
  const [winnerData, setWinnerData] = useState<{
    ticketGanador?: string;
    ganadorNombre?: string;
    premio?: number;
    winnerUserId?: string;
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
            winnerUserId: res.room.winnerUserId || res.room.sorteo.ganadorUserId,
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

  const handleSpinEnd = () => {
    setIsDrawing(false);
    fetchRoomData();
    fetchMyPass();

    if (winnerData) {
      const isWinner =
        (myTicket && myTicket.ticketNumber === winnerData.ticketGanador) ||
        (user && user.id === winnerData.winnerUserId);

      if (isWinner) {
        setResultModal('WINNER');
      } else if (myTicket) {
        setResultModal('LOSER');
      } else {
        setResultModal('SPECTATOR');
      }
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
          setResultModal(null);
        }
      });

      socket.on('sorteo:ganador', (data: any) => {
        if (data.roomId === roomId) {
          setWinnerData({
            ticketGanador: data.ticketGanador,
            ganadorNombre: data.ganadorNombre,
            premio: data.premio,
            winnerUserId: data.winnerUserId,
          });
          // Mantener isDrawing en true para permitir que la ruleta gire los 5 segundos completos
          setIsDrawing(true);
        }
      });

      const handlePayoutApplied = (data: any) => {
        if (data.roomId === roomId) {
          console.log('⚡ [Room] Evento de pago aplicado recibido en tiempo real:', data);
          // Actualización optimista inmediata en memoria para cambiar el ticket a verde al instante
          setMyTicket((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              room: prev.room
                ? {
                    ...prev.room,
                    sorteo: {
                      ...(prev.room.sorteo || {
                        id: data.sorteoId || '',
                        roomId: data.roomId,
                        ganadorUserId: data.ganadorUserId,
                        ticketGanadorId: prev.id,
                        montoPremio: data.montoPremio || 0,
                        fechaSorteo: new Date().toISOString(),
                      }),
                      estadoPago: 'PAGADO',
                      fechaPago: data.fechaPago ? String(data.fechaPago) : new Date().toISOString(),
                      notasPago: data.notasPago || prev.room.sorteo?.notasPago,
                    },
                  }
                : prev.room,
            } as Ticket;
          });

          setRoom((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              sorteo: prev.sorteo
                ? {
                    ...prev.sorteo,
                    estadoPago: 'PAGADO',
                    fechaPago: data.fechaPago || new Date().toISOString(),
                    notasPago: data.notasPago || prev.sorteo.notasPago,
                  }
                : prev.sorteo,
            };
          });

          fetchRoomData();
          fetchMyPass();
        }
      };

      socket.on('payout:applied', handlePayoutApplied);
      socket.on('global:payout_applied', handlePayoutApplied);
    }

    return () => {
      if (roomId) {
        leaveRoom(roomId);
      }
      if (socket) {
        socket.off('room:update');
        socket.off('sorteo:iniciar');
        socket.off('sorteo:ganador');
        socket.off('payout:applied');
        socket.off('global:payout_applied');
      }
    };
  }, [roomId, socket, user, myTicket]);

  // Detectar si el usuario retorna desde la pasarela de Wompi con ?status=success&ref=...
  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get('ref');
      if (ref) {
        const confirmPaymentReturn = async () => {
          try {
            setBuying(true);
            const confirmRes = await apiRequest('/api/tickets/confirm', {
              method: 'POST',
              body: JSON.stringify({ reference: ref }),
            });
            if (confirmRes.success) {
              await fetchRoomData();
              await fetchMyPass();
              // Limpiar query params de la URL limpiamente sin recargar
              window.history.replaceState({}, document.title, window.location.pathname);
            }
          } catch (err: any) {
            console.error('Error al confirmar retorno de Wompi:', err);
          } finally {
            setBuying(false);
          }
        };
        confirmPaymentReturn();
      }
    }
  }, [user]);

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
        // Si Wompi generó el enlace oficial de pago (https://s.wompi.sv/...)
        if (res.checkout.paymentUrl) {
          window.location.href = res.checkout.paymentUrl;
          return;
        }

        // Si no hay enlace remoto o es flujo directo/pruebas:
        const confirmRes = await apiRequest('/api/tickets/confirm', {
          method: 'POST',
          body: JSON.stringify({ reference: res.checkout.reference }),
        });

        if (confirmRes.success) {
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
    <div className="flex-1 flex flex-col w-full">
      {/* Barra Superior Móvil Oficial de Casino */}
      <TopCasinoBar
        title={`${room.nombre} • Sorteo en Vivo`}
        showBack={true}
        backHref="/"
      />

      {/* Contenedor Principal */}
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Cabecera de Jackpots de Casino */}
        <div className="mb-6">
          <JackpotHeader
            grandAmount={Number(room.premio)}
            majorAmount={Number(room.premio) * 0.45}
            minorAmount={Number(room.premio) * 0.12}
          />
        </div>

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
            onSpinEnd={handleSpinEnd}
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
              onFinish={async () => {
                if (room.estado === 'ABIERTA' || room.estado === 'LLENA') {
                  try {
                    await apiRequest(`/api/rooms/${roomId}/draw-if-ready`, {
                      method: 'POST',
                    });
                  } catch (e) {
                    console.error('Error auto-iniciando sorteo:', e);
                  }
                  fetchRoomData();
                  fetchMyPass();
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
                ticket={{
                  ...myTicket,
                  room: {
                    ...(myTicket.room || {}),
                    ...(room || {}),
                    sorteo: room?.sorteo || myTicket.room?.sorteo,
                  } as any,
                }}
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

              <p className="text-[11px] text-center text-slate-400">
                Transferencia bancaria directa a cuenta a nombre del titular del DUI registrado. Protegido por Wompi 3D Secure y PCI DSS. Máx. 3 victorias por 24 horas.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Resultado de Sorteo (Ganador o Perdedor) */}
      {resultModal && winnerData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className={`relative w-full max-w-lg rounded-3xl p-8 border text-center shadow-2xl overflow-hidden ${
            resultModal === 'WINNER'
              ? 'bg-gradient-to-b from-slate-900 via-amber-950/40 to-slate-950 border-amber-400 shadow-amber-500/30'
              : 'bg-gradient-to-b from-slate-900 via-rose-950/30 to-slate-950 border-rose-500/40 shadow-rose-500/20'
          }`}>
            {resultModal === 'WINNER' ? (
              <div className="space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-tr from-amber-400 via-pink-500 to-yellow-300 shadow-2xl shadow-yellow-400/40 animate-bounce">
                  <img
                    src="/images/premios-host.jpg"
                    alt="¡Ganador Oficial!"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 uppercase tracking-widest inline-block shadow-lg">
                  ¡TENEMOS UN GANADOR!
                </span>
                <h2 className="text-3xl font-black text-white">¡Felicidades, Eres el Ganador!</h2>
                <p className="text-sm text-slate-300">
                  Tu boleto <strong className="text-amber-400 font-mono text-base">#{winnerData.ticketGanador}</strong> resultó premiado en <strong className="text-white">{room.nombre}</strong>.
                </p>

                <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 my-4">
                  <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block">Premio Acumulado</span>
                  <span className="text-4xl font-black text-gold-gradient font-mono">
                    ${Number(winnerData.premio || room.premio).toFixed(2)} USD
                  </span>
                  <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-amber-300 font-semibold bg-amber-500/10 py-1.5 px-3 rounded-full border border-amber-500/20">
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    Transferencia directa a cuenta a nombre de tu DUI registrado
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/profile"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20"
                  >
                    Ver mi Pase en el Perfil
                  </Link>
                  <button
                    onClick={() => setResultModal(null)}
                    className="px-6 py-3.5 rounded-xl glass-panel border border-white/10 text-white font-bold text-xs hover:bg-white/5 transition-all"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            ) : resultModal === 'LOSER' ? (
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden ring-2 ring-purple-500/40 shadow-xl shadow-purple-500/20">
                  <img
                    src="/images/banquero.jpg"
                    alt="El Banquero"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase tracking-widest inline-block">
                  Sorteo Finalizado
                </span>
                <h2 className="text-2xl font-black text-white">¡Gracias por Participar!</h2>
                <p className="text-sm text-slate-300">
                  El sorteo de <strong className="text-white">{room.nombre}</strong> ha concluido.
                </p>

                <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 my-4 text-xs space-y-2 text-slate-300">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-slate-400">Boleto Ganador:</span>
                    <span className="font-mono font-bold text-amber-400">#{winnerData.ticketGanador}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-slate-400">Ganador Adjudicado:</span>
                    <span className="font-bold text-white">{winnerData.ganadorNombre || 'Jugador'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Tu Boleto:</span>
                    <span className="font-mono text-rose-400">#{myTicket?.ticketNumber} (Finalizado)</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400">
                  ¡No te rindas! El Banquero y la suerte te esperan en las próximas salas activas.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-lg"
                  >
                    Explorar Nuevas Salas
                  </Link>
                  <button
                    onClick={() => setResultModal(null)}
                    className="px-6 py-3.5 rounded-xl glass-panel border border-white/10 text-white font-bold text-xs hover:bg-white/5 transition-all"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-tr from-amber-400 to-purple-500 shadow-xl shadow-amber-500/30">
                  <img
                    src="/images/piggy-logo.jpg"
                    alt="Rey Piggy"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-widest inline-block">
                  Sorteo Concluido
                </span>
                <h2 className="text-2xl font-black text-white">¡Tenemos un Ganador!</h2>
                <p className="text-xs text-slate-300">
                  El boleto <strong className="text-amber-400 font-mono">#{winnerData?.ticketGanador || room.winnerTicketId || '---'}</strong> perteneciente a <strong className="text-white">{winnerData?.ganadorNombre || 'Jugador'}</strong> ha ganado el premio de ${Number(winnerData?.premio || room.premio).toFixed(2)} USD.
                </p>

                <div className="pt-2 flex justify-center">
                  <button
                    onClick={() => setResultModal(null)}
                    className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

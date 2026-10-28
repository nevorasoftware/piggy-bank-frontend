'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/context/SocketContext';
import { apiRequest } from '@/lib/api';
import { Ticket, AccountType } from '@/types';
import DigitalPass from '@/components/rooms/DigitalPass';
import { formatPhoneDisplay } from '@/lib/phone';
import { playCoinSound } from '@/lib/sound';
import { Building2, CreditCard, Shield, Clock, Ticket as TicketIcon, CheckCircle2, AlertCircle, Save } from 'lucide-react';

const SALVADORAN_BANKS = [
  'Banco Agrícola El Salvador',
  'Banco Cuscatlán',
  'BAC Credomatic El Salvador',
  'Banco Davivienda El Salvador',
  'Banco Promerica El Salvador',
  'Banco Azul',
  'Banco Industrial El Salvador',
  'Banco Hipotecario',
  'Banco de Fomento Agropecuario',
  'Fedecrédito',
];

export default function ProfilePage() {
  const { user, refreshMe } = useAuth();
  const { socket, joinUser, leaveUser } = useSocket();

  const [bankName, setBankName] = useState('');
  const [accountType, setAccountType] = useState<AccountType>('AHORRO');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  const [savingBank, setSavingBank] = useState(false);
  const [bankSuccess, setBankSuccess] = useState(false);
  const [bankError, setBankError] = useState<string | null>(null);

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [participationStats, setParticipationStats] = useState<{
    participaciones: number;
    victorias: number;
    maxParticipaciones: number;
    maxVictorias: number;
    fecha: string;
  } | null>(null);

  useEffect(() => {
    if (user?.bankAccount) {
      setBankName(user.bankAccount.bankName || '');
      setAccountType(user.bankAccount.accountType || 'AHORRO');
      setAccountNumber(user.bankAccount.accountNumber || '');
      setAccountHolder(user.bankAccount.accountHolder || user.fullName);
    } else if (user) {
      setAccountHolder(user.fullName);
    }

    loadParticipationStatus();
    loadTickets();

    if (user?.id) {
      joinUser(user.id);
    }

    return () => {
      if (user?.id) {
        leaveUser(user.id);
      }
    };
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    const handlePayoutApplied = (data: any) => {
      console.log('⚡ [Profile] Pago aplicado recibido en tiempo real:', data);
      // 1. Actualización optimista inmediata en memoria para cambiar el ticket de amarillo a verde al instante sin F5
      setTickets((prev) =>
        prev.map((t) => {
          const matches =
            t.room?.id === data.roomId ||
            t.room?.sorteo?.id === data.sorteoId ||
            (data.sorteoId && t.room?.sorteo?.id === data.sorteoId);

          if (matches && t.room) {
            return {
              ...t,
              room: {
                ...t.room,
                sorteo: {
                  ...(t.room.sorteo || {
                    id: data.sorteoId || '',
                    roomId: t.roomId,
                    ganadorUserId: data.ganadorUserId,
                    ticketGanadorId: t.id,
                    montoPremio: data.montoPremio || 0,
                    fechaSorteo: new Date().toISOString(),
                  }),
                  estadoPago: 'PAGADO',
                  fechaPago: data.fechaPago ? String(data.fechaPago) : new Date().toISOString(),
                  notasPago: data.notasPago || t.room.sorteo?.notasPago,
                },
              },
            } as Ticket;
          }
          return t;
        })
      );

      // Si el ganador es el usuario actual, emitir sonido de confirmación
      if (user && data.ganadorUserId === user.id) {
        playCoinSound();
      }

      // 2. Re-consulta al backend para sincronizar todos los datos
      loadTickets();
      loadParticipationStatus();
    };

    socket.on('global:sorteo_winner', () => {
      loadTickets();
      loadParticipationStatus();
    });

    socket.on('rooms:list_update', () => {
      loadTickets();
      loadParticipationStatus();
    });

    // Escuchar eventos de pago aplicado en tiempo real
    socket.on('payout:applied', handlePayoutApplied);
    socket.on('global:payout_applied', handlePayoutApplied);
    socket.on('user:payout_applied', handlePayoutApplied);

    return () => {
      socket.off('global:sorteo_winner');
      socket.off('rooms:list_update');
      socket.off('payout:applied', handlePayoutApplied);
      socket.off('global:payout_applied', handlePayoutApplied);
      socket.off('user:payout_applied', handlePayoutApplied);
    };
  }, [socket, user]);

  const loadParticipationStatus = async () => {
    try {
      const res = await apiRequest('/api/users/participation-status');
      if (res.success && res.stats) {
        setParticipationStats(res.stats);
      }
    } catch (err) {
      console.error('Error al cargar status de participación:', err);
    }
  };

  const loadTickets = async () => {
    try {
      const res = await apiRequest('/api/users/my-tickets');
      if (res.success && res.tickets) {
        setTickets(res.tickets);
      }
    } catch (err) {
      console.error('Error al cargar boletos:', err);
    }
  };

  const handleSaveBank = async (e: React.FormEvent) => {
    e.preventDefault();
    setBankError(null);
    setBankSuccess(false);
    setSavingBank(true);

    try {
      const res = await apiRequest('/api/users/bank-account', {
        method: 'PUT',
        body: JSON.stringify({
          bankName,
          accountType,
          accountNumber,
          accountHolder,
        }),
      });

      if (res.success) {
        setBankSuccess(true);
        await refreshMe();
        setTimeout(() => setBankSuccess(false), 3000);
      } else {
        setBankError(res.message || 'Error al guardar datos bancarios.');
      }
    } catch (err: any) {
      setBankError(err.message || 'Error en la conexión.');
    } finally {
      setSavingBank(false);
    }
  };

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-slate-400 text-sm">Por favor inicia sesión para ver tu perfil.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
      {/* Encabezado del Perfil */}
      <div className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-amber-500/20">
            {user.fullName.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">{user.fullName}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                DUI: {user.dui}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-slate-400 bg-slate-900 border border-white/5">
                {formatPhoneDisplay(user.phone)}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 block font-semibold">Estado de Identidad</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> DUI & Teléfono Verificados
          </span>
        </div>
      </div>

      {/* Reglas de Participación Diaria (6/3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <TicketIcon className="w-4 h-4 text-amber-400" />
              Participaciones Diarias
            </span>
            <span className="text-xs font-mono font-bold text-amber-400">
              {participationStats?.participaciones ?? 0} / {participationStats?.maxParticipaciones ?? 6}
            </span>
          </div>

          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-white/10">
            <div
              style={{
                width: `${Math.min(
                  100,
                  (((participationStats?.participaciones ?? 0) /
                    (participationStats?.maxParticipaciones ?? 6)) *
                    100)
                )}%`,
              }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400"
            />
          </div>

          <p className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>Regla: Máximo 6 tickets por día</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" /> Reseteo: 00:00 (El Salvador)
            </span>
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              Victorias Diarias
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {participationStats?.victorias ?? 0} / {participationStats?.maxVictorias ?? 3}
            </span>
          </div>

          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-white/10">
            <div
              style={{
                width: `${Math.min(
                  100,
                  (((participationStats?.victorias ?? 0) /
                    (participationStats?.maxVictorias ?? 3)) *
                    100)
                )}%`,
              }}
              className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-emerald-400"
            />
          </div>

          <p className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>Regla: Máximo 3 premios ganados por día</span>
            <span>Juego Responsable Activo</span>
          </p>
        </div>
      </div>

      {/* Formulario de Cuenta Bancaria */}
      <div className="glass-panel rounded-3xl p-8 border border-white/10">
        <div className="max-w-xl mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Building2 className="w-4 h-4" /> Cobro de Premios en Efectivo
          </span>
          <h2 className="text-xl font-black text-white mt-1">Datos Bancarios Oficiales</h2>
          <p className="text-xs text-slate-400 mt-1">
            Si resultas ganador de un sorteo, nuestro departamento administrativo realizará la transferencia de inmediato a esta cuenta.
          </p>
        </div>

        {bankSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>Cuenta bancaria actualizada con éxito.</span>
          </div>
        )}

        {bankError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{bankError}</span>
          </div>
        )}

        <form onSubmit={handleSaveBank} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {/* Banco */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Banco Nacional
            </label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
            >
              <option value="" disabled>Selecciona tu banco</option>
              {SALVADORAN_BANKS.map((bank) => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>

          {/* Tipo de Cuenta */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Tipo de Cuenta
            </label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as AccountType)}
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
            >
              <option value="AHORRO">Cuenta de Ahorro</option>
              <option value="CORRIENTE">Cuenta Corriente</option>
            </select>
          </div>

          {/* Número de Cuenta */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Número de Cuenta
            </label>
            <input
              type="text"
              required
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="000-000000-0"
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Titular de la Cuenta */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Nombre del Titular
            </label>
            <input
              type="text"
              required
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="Debe coincidir con tu DUI registrado"
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={savingBank}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-slate-950" />
              {savingBank ? 'Guardando...' : 'Guardar Cuenta Bancaria'}
            </button>
          </div>
        </form>
      </div>

      {/* Historial de Pases Digitales */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-black text-white">Mis Pases Digitales de Sorteo</h2>
          <p className="text-xs text-slate-400 mt-1">Historial de boletos adquiridos en PiggyBank</p>
        </div>

        {tickets.length === 0 ? (
          <div className="glass-panel p-8 rounded-3xl text-center border border-white/5">
            <p className="text-slate-400 text-sm">Aún no has comprado ningún pase en las salas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((t) => (
              <DigitalPass
                key={t.id}
                ticket={t}
                userName={user.fullName}
                userDui={user.dui}
                roomName={t.room?.nombre || 'Sala de Sorteo'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

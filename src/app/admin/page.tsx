'use client';

import React, { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { DashboardMetrics } from '@/types';
import { Ticket, DollarSign, Users, Trophy, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const res = await apiRequest('/api/admin/metrics');
      if (res.success && res.metrics) {
        setMetrics(res.metrics);
      }
    } catch (err) {
      console.error('Error al cargar métricas:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
          Resumen General
        </span>
        <h1 className="text-3xl font-black text-white">Dashboard de Operaciones</h1>
        <p className="text-xs text-slate-400 mt-1">
          Métricas en tiempo real sincronizadas con la pasarela de pagos con tarjeta y base de datos PostgreSQL en Railway
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 glass-panel rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Ingresos Totales */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400">Recaudación Total</span>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black font-mono text-white">
              ${metrics?.totalRevenue ? Number(metrics.totalRevenue).toFixed(2) : '0.00'}
            </p>
            <span className="text-[11px] text-emerald-400 font-semibold mt-2 block">
              Moneda: USD (El Salvador)
            </span>
          </div>

          {/* Boletos Vendidos */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400">Boletos Vendidos</span>
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                <Ticket className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black font-mono text-white">
              {metrics?.totalTicketsSold ?? 0}
            </p>
            <span className="text-[11px] text-slate-400 font-semibold mt-2 block">
              {metrics?.ticketsToday ?? 0} tickets hoy
            </span>
          </div>

          {/* Usuarios Registrados */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400">Usuarios Registrados</span>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black font-mono text-white">
              {metrics?.totalUsers ?? 0}
            </p>
            <span className="text-[11px] text-emerald-400 font-semibold mt-2 block">
              DUI Salvadoreño verificado
            </span>
          </div>

          {/* Pagos Pendientes */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400">Premios por Pagar</span>
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400">
                <Trophy className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black font-mono text-white">
              {metrics?.pendingPayoutsCount ?? 0}
            </p>
            <Link
              href="/admin/sorteos"
              className="text-[11px] text-rose-400 hover:underline font-semibold mt-2 flex items-center gap-1"
            >
              Revisar pendientes <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Accesos Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Salas y Sorteos</h3>
            <p className="text-xs text-slate-400 mt-1">Crea salas, define horarios y ejecuta ruletas en vivo.</p>
          </div>
          <Link
            href="/admin/rooms"
            className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-colors"
          >
            Administrar Salas
          </Link>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Reglas de Juego 6/3</h3>
            <p className="text-xs text-slate-400 mt-1">Ajusta los límites diarios de participación y victorias.</p>
          </div>
          <Link
            href="/admin/config"
            className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-colors"
          >
            Modificar Reglas
          </Link>
        </div>
      </div>
    </div>
  );
}

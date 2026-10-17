'use client';

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';
import { Sorteo } from '@/types';
import { Trophy, CheckCircle, Clock, Building2, Phone, Sparkles, AlertCircle, Send } from 'lucide-react';

export default function AdminSorteosPage() {
  const [sorteos, setSorteos] = useState<Sorteo[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSorteos();
  }, []);

  const loadSorteos = async () => {
    try {
      const res = await apiRequest('/api/admin/sorteos');
      if (res.success && res.sorteos) {
        setSorteos(res.sorteos);
      }
    } catch (err) {
      console.error('Error al cargar sorteos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPayout = async (sorteoId: string, winnerName: string, amount: number) => {
    const notas = prompt(
      `¿Deseas marcar como "PAGO APLICADO" el premio de $${Number(amount).toFixed(2)} USD a ${winnerName}?\nIngresa un número de referencia o nota de transferencia (opcional):`,
      'Transferencia bancaria procesada vía banca en línea'
    );

    if (notas === null) return; // Cancelado

    setPayingId(sorteoId);
    setMessage(null);

    try {
      const res = await apiRequest(`/api/admin/sorteos/${sorteoId}/payout`, {
        method: 'POST',
        body: JSON.stringify({ notas }),
      });

      if (res.success) {
        setMessage({
          type: 'success',
          text: `¡Pago de $${Number(amount).toFixed(2)} USD aplicado exitosamente! Se notificó a ${winnerName} por WhatsApp.`,
        });
        loadSorteos();
      } else {
        setMessage({ type: 'error', text: res.message || 'Error al aplicar pago.' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error en la petición de pago.' });
    } finally {
      setPayingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
          Tesorería & Pagos
        </span>
        <h1 className="text-3xl font-black text-white">Historial de Sorteos y Ganadores</h1>
        <p className="text-xs text-slate-400 mt-1">
          Supervisa los sorteos finalizados, verifica los datos bancarios y confirma las transferencias con el botón de "Pago Aplicado".
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Sala</th>
                <th className="py-4 px-4">Ganador</th>
                <th className="py-4 px-4">Premio</th>
                <th className="py-4 px-4">Cuenta Destino</th>
                <th className="py-4 px-4">Fecha Sorteo</th>
                <th className="py-4 px-4">Estado del Pago</th>
                <th className="py-4 px-6 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">
                    Cargando historial de sorteos...
                  </td>
                </tr>
              ) : sorteos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">
                    No se han registrado sorteos finalizados todavía.
                  </td>
                </tr>
              ) : (
                sorteos.map((s) => {
                  const isPaid = s.estadoPago === 'PAGADO';
                  const bank = s.ganador?.bankAccount;

                  return (
                    <tr key={s.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-bold text-white">
                        {s.room?.nombre || 'Sala'}
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-white">{s.ganador?.fullName}</p>
                        <p className="text-[10px] text-amber-400 font-mono">DUI: {s.ganador?.dui}</p>
                        <p className="text-[10px] text-slate-500">{s.ganador?.phone}</p>
                      </td>
                      <td className="py-4 px-4 font-mono font-black text-emerald-400 text-sm">
                        ${Number(s.montoPremio).toFixed(2)} USD
                      </td>
                      <td className="py-4 px-4">
                        {bank ? (
                          <div>
                            <p className="font-semibold text-white flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5 text-purple-400" />
                              {bank.bankName}
                            </p>
                            <p className="font-mono text-slate-400 text-[10px]">
                              {bank.accountType}: {bank.accountNumber}
                            </p>
                          </div>
                        ) : (
                          <span className="text-rose-400 font-semibold italic text-[11px]">
                            Pendiente de registro
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-400">
                        {new Date(s.fechaSorteo).toLocaleString('es-SV', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-4 px-4">
                        {isPaid ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <CheckCircle className="w-3 h-3" /> PAGADO
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                            <Clock className="w-3 h-3" /> PENDIENTE
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        {isPaid ? (
                          <span className="text-[10px] text-slate-500 font-mono">
                            Pagado el {new Date(s.fechaPago!).toLocaleDateString('es-SV')}
                          </span>
                        ) : (
                          <button
                            onClick={() =>
                              handleApplyPayout(
                                s.id,
                                s.ganador?.fullName || 'Ganador',
                                Number(s.montoPremio)
                              )
                            }
                            disabled={payingId === s.id}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 ml-auto disabled:opacity-50"
                          >
                            <Send className="w-3.5 h-3.5" />
                            {payingId === s.id ? 'Aplicando...' : 'Pago Aplicado'}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

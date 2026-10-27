'use client';

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';
import { User } from '@/types';
import { formatPhoneDisplay } from '@/lib/phone';
import { Users, Building2, Phone, Fingerprint, CheckCircle2 } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await apiRequest('/api/admin/users');
      if (res.success && res.users) {
        setUsers(res.users);
      }
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
          Directorio
        </span>
        <h1 className="text-3xl font-black text-white">Usuarios y Cuentas Bancarias</h1>
        <p className="text-xs text-slate-400 mt-1">
          Lista de jugadores registrados, verificación de DUI salvadoreño y datos para transferencias.
        </p>
      </div>

      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Jugador</th>
                <th className="py-4 px-4">DUI</th>
                <th className="py-4 px-4">Teléfono (WhatsApp)</th>
                <th className="py-4 px-4">Banco Registrado</th>
                <th className="py-4 px-4">No. de Cuenta</th>
                <th className="py-4 px-4">Tipo</th>
                <th className="py-4 px-4">Historial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">
                    Cargando usuarios...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">
                    No hay usuarios registrados aún.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-white">{u.fullName}</p>
                      <p className="text-[10px] text-slate-500">{u.email}</p>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-amber-400">
                      {u.dui}
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-300">
                      {formatPhoneDisplay(u.phone)}
                    </td>
                    <td className="py-4 px-4">
                      {u.bankAccount ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          {u.bankAccount.bankName}
                        </span>
                      ) : (
                        <span className="text-slate-500 italic">No registrada</span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono">
                      {u.bankAccount ? u.bankAccount.accountNumber : '-'}
                    </td>
                    <td className="py-4 px-4">
                      {u.bankAccount ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/5 border border-white/10">
                          {u.bankAccount.accountType}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-400">
                      {u._count?.tickets || 0} tickets • {u._count?.sorteosGanados || 0} ganados
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

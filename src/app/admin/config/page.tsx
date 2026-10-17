'use client';

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';
import { Sliders, ShieldCheck, CheckCircle2, AlertCircle, Save, Clock } from 'lucide-react';

export default function AdminConfigPage() {
  const [maxParticipaciones, setMaxParticipaciones] = useState(6);
  const [maxVictorias, setMaxVictorias] = useState(3);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const res = await apiRequest('/api/admin/config');
      if (res.success && res.config) {
        setMaxParticipaciones(res.config.maxParticipacionesDia);
        setMaxVictorias(res.config.maxVictoriasDia);
      }
    } catch (err) {
      console.error('Error al cargar GameConfig:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await apiRequest('/api/admin/config', {
        method: 'PUT',
        body: JSON.stringify({
          maxParticipacionesDia: Number(maxParticipaciones),
          maxVictoriasDia: Number(maxVictorias),
        }),
      });

      if (res.success) {
        setMessage({ type: 'success', text: 'Reglas de participación 6/3 actualizadas en caliente.' });
      } else {
        setMessage({ type: 'error', text: res.message || 'Error al guardar configuración.' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error en la petición.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
          Reglas del Sistema
        </span>
        <h1 className="text-3xl font-black text-white">Configuración de Juego Responsable</h1>
        <p className="text-xs text-slate-400 mt-1">
          Parámetros diarios que limitan las compras y victorias por usuario en El Salvador (TZ America/El_Salvador).
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
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          {/* MAX_PARTICIPACIONES_DIA */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Límite Máximo de Participaciones por Día</span>
              <span className="text-purple-400 font-mono">MAX_PARTICIPACIONES_DIA</span>
            </label>
            <input
              type="number"
              min={1}
              max={50}
              required
              value={maxParticipaciones}
              onChange={(e) => setMaxParticipaciones(parseInt(e.target.value, 10))}
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl text-white font-mono text-lg font-bold focus:outline-none focus:border-purple-400"
            />
            <p className="text-[11px] text-slate-500">
              Valor por defecto: 6. Si un usuario alcanza este número de pases en el día, el middleware bloqueará nuevas compras.
            </p>
          </div>

          {/* MAX_VICTORIAS_DIA */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Límite Máximo de Victorias por Día</span>
              <span className="text-purple-400 font-mono">MAX_VICTORIAS_DIA</span>
            </label>
            <input
              type="number"
              min={1}
              max={20}
              required
              value={maxVictorias}
              onChange={(e) => setMaxVictorias(parseInt(e.target.value, 10))}
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl text-white font-mono text-lg font-bold focus:outline-none focus:border-purple-400"
            />
            <p className="text-[11px] text-slate-500">
              Valor por defecto: 3. Si un usuario resulta ganador en 3 salas el mismo día, su cuenta se bloqueará hasta las 00:00 para garantizar equidad.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 text-xs text-slate-400">
            <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-white">Ciclo de Reseteo Automático</p>
              <p className="text-[11px]">
                El cron job programado en el backend ejecuta el reseteo diario a las 00:00 en punto en zona horaria America/El_Salvador.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving || loading}
            className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Guardando en Base de Datos...' : 'Guardar Parámetros de Juego'}
          </button>
        </form>
      </div>
    </div>
  );
}

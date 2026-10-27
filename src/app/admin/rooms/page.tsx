'use client';

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';
import { Room, RoomStatus } from '@/types';
import {
  Plus,
  Edit2,
  Trash2,
  Play,
  Clock,
  Users,
  DollarSign,
  X,
  CheckCircle2,
  AlertCircle,
  Zap,
  Timer,
  Sparkles,
} from 'lucide-react';

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  // Form Fields
  const [nombre, setNombre] = useState('');
  const [premio, setPremio] = useState('');
  const [costoPase, setCostoPase] = useState('');
  const [capacidadMax, setCapacidadMax] = useState('30');
  const [duracionHoras, setDuracionHoras] = useState(2);
  const [estado, setEstado] = useState<RoomStatus>('ABIERTA');

  const [saving, setSaving] = useState(false);
  const [startingRoomId, setStartingRoomId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const res = await apiRequest('/api/admin/rooms');
      if (res.success && res.rooms) {
        setRooms(res.rooms);
      }
    } catch (err) {
      console.error('Error al cargar salas admin:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingRoom(null);
    setNombre('');
    setPremio('');
    setCostoPase('');
    setCapacidadMax('30');
    setDuracionHoras(2);
    setEstado('ABIERTA');
    setIsModalOpen(true);
  };

  const openEditModal = (room: Room) => {
    setEditingRoom(room);
    setNombre(room.nombre);
    setPremio(String(room.premio));
    setCostoPase(String(room.costoPase));
    setCapacidadMax(String(room.capacidadMax));
    setDuracionHoras(room.duracionHoras || 2);
    setEstado(room.estado);
    setIsModalOpen(true);
  };

  const handleSaveRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setActionMessage(null);

    try {
      const payload = {
        nombre,
        premio: parseFloat(premio),
        costoPase: parseFloat(costoPase),
        capacidadMax: parseInt(capacidadMax, 10),
        duracionHoras: Number(duracionHoras),
        estado,
      };

      let res;
      if (editingRoom) {
        res = await apiRequest(`/api/admin/rooms/${editingRoom.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        res = await apiRequest('/api/admin/rooms', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }

      if (res.success) {
        setActionMessage({
          type: 'success',
          text: editingRoom ? 'Sala actualizada exitosamente.' : 'Sala creada exitosamente.',
        });
        setIsModalOpen(false);
        loadRooms();
      } else {
        setActionMessage({ type: 'error', text: res.message || 'Error al guardar sala' });
      }
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err.message || 'Error al procesar petición' });
    } finally {
      setSaving(false);
    }
  };

  // Iniciar / Activar Sala en tiempo real (+X horas dinámicas)
  const handleStartRoom = async (room: Room) => {
    const duracion = room.duracionHoras || 2;
    if (
      !confirm(
        `¿Deseas INICIAR la sala "${room.nombre}" en este momento?\n\nEl sorteo quedará programado para dentro de ${duracion} hora(s) a partir de este instante exacto.`
      )
    )
      return;

    setStartingRoomId(room.id);
    setActionMessage(null);

    try {
      const res = await apiRequest(`/api/admin/rooms/${room.id}/start`, {
        method: 'POST',
        body: JSON.stringify({ duracionHoras: duracion }),
      });

      if (res.success) {
        setActionMessage({
          type: 'success',
          text: res.message || `¡Sala "${room.nombre}" iniciada con éxito!`,
        });
        loadRooms();
      } else {
        setActionMessage({ type: 'error', text: res.message || 'Error al iniciar la sala' });
      }
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err.message || 'Error en la petición de inicio' });
    } finally {
      setStartingRoomId(null);
    }
  };

  const handleDeleteRoom = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta sala?')) return;
    try {
      const res = await apiRequest(`/api/admin/rooms/${id}`, { method: 'DELETE' });
      if (res.success) {
        setActionMessage({ type: 'success', text: 'Sala eliminada' });
        loadRooms();
      } else {
        setActionMessage({ type: 'error', text: res.message || 'No se pudo eliminar' });
      }
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err.message || 'Error al eliminar' });
    }
  };

  const handleTriggerDraw = async (id: string, roomName: string) => {
    if (!confirm(`¿Deseas forzar la ejecución del sorteo y girar la ruleta en vivo para "${roomName}"?`)) return;
    try {
      const res = await apiRequest(`/api/admin/rooms/${id}/draw`, { method: 'POST' });
      if (res.success) {
        setActionMessage({ type: 'success', text: `¡Sorteo iniciado con éxito en sala "${roomName}"!` });
        loadRooms();
      } else {
        setActionMessage({ type: 'error', text: res.message || 'Error al iniciar sorteo' });
      }
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err.message || 'Error al ejecutar sorteo' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
            Administración
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Salas de Sorteo</h1>
          <p className="text-xs text-slate-400 mt-1">
            Crea, programa por horas e inicia salas dinámicas con cálculo de sorteo en tiempo real.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Nueva Sala
        </button>
      </div>

      {actionMessage && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
            actionMessage.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
          }`}
        >
          {actionMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{actionMessage.text}</span>
        </div>
      )}

      {/* Tabla de Salas */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Nombre de la Sala</th>
                <th className="py-4 px-4">Premio</th>
                <th className="py-4 px-4">Costo Pase</th>
                <th className="py-4 px-4">Cupos</th>
                <th className="py-4 px-4">Duración</th>
                <th className="py-4 px-4">Hora Sorteo</th>
                <th className="py-4 px-4">Estado</th>
                <th className="py-4 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-500">
                    No hay salas registradas. Crea una con el botón superior.
                  </td>
                </tr>
              ) : (
                rooms.map((room) => {
                  const isClosed = room.estado === 'CERRADA';
                  const isOpen = room.estado === 'ABIERTA';
                  const isFull = room.estado === 'LLENA';
                  const isDrawing = room.estado === 'SORTEANDO';

                  return (
                    <tr key={room.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <span>{room.nombre}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-amber-400">
                        ${Number(room.premio).toFixed(2)}
                      </td>
                      <td className="py-4 px-4 font-mono text-white">
                        ${Number(room.costoPase).toFixed(2)}
                      </td>
                      <td className="py-4 px-4 font-mono">
                        {room.ticketsSold} / {room.capacidadMax}
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-lg border border-purple-500/20 font-bold">
                          +{room.duracionHoras || 2}h
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-400 font-mono">
                        {new Date(room.horaSorteo).toLocaleTimeString('es-SV', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        <span className="text-[10px] text-slate-500">
                          ({new Date(room.horaSorteo).toLocaleDateString('es-SV', { month: 'short', day: 'numeric' })})
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            isOpen
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : isFull
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : isDrawing
                              ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 animate-pulse'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {room.estado}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-1.5">
                        {/* Botón Iniciar Sala (Activar +X horas al momento actual) */}
                        {isClosed && (
                          <button
                            onClick={() => handleStartRoom(room)}
                            disabled={startingRoomId === room.id}
                            title={`Iniciar sala ahora (programar a +${room.duracionHoras || 2}h)`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 font-bold text-[11px] transition-all"
                          >
                            <Zap className="w-3 h-3 text-emerald-400" />
                            <span>{startingRoomId === room.id ? 'Iniciando...' : 'Iniciar Sala'}</span>
                          </button>
                        )}

                        {/* Botón Girar Ruleta / Sorteo */}
                        {(isOpen || isFull) && (
                          <button
                            onClick={() => handleTriggerDraw(room.id, room.nombre)}
                            title="Ejecutar Sorteo en Vivo"
                            className="p-2 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors"
                          >
                            <Play className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => openEditModal(room)}
                          title="Editar Sala"
                          className="p-2 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteRoom(room.id)}
                          title="Eliminar Sala"
                          className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Crear / Editar Sala */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 max-w-lg w-full space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">
                  Parametrización de Sala
                </span>
                <h3 className="text-xl font-black text-white">
                  {editingRoom ? 'Editar Sala de Sorteo' : 'Nueva Sala de Sorteo'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRoom} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Nombre de la Sala</label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Cerdito Millonario"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Premio ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={premio}
                    onChange={(e) => setPremio(e.target.value)}
                    placeholder="100.00"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Costo Pase ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.25"
                    required
                    value={costoPase}
                    onChange={(e) => setCostoPase(e.target.value)}
                    placeholder="2.50"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Capacidad Máxima</label>
                  <input
                    type="number"
                    min="2"
                    max="1000"
                    required
                    value={capacidadMax}
                    onChange={(e) => setCapacidadMax(e.target.value)}
                    placeholder="30"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Estado de Sala</label>
                  <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value as RoomStatus)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-purple-400"
                  >
                    <option value="ABIERTA">ABIERTA (Activar ahora)</option>
                    <option value="CERRADA">CERRADA (Iniciar luego)</option>
                    <option value="LLENA">LLENA</option>
                    <option value="SORTEANDO">SORTEANDO</option>
                    <option value="FINALIZADA">FINALIZADA</option>
                  </select>
                </div>
              </div>

              {/* Parametrización de Duración de la Sala en Horas */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                    <Timer className="w-4 h-4 text-purple-400" />
                    Duración del Sorteo (Horas)
                  </label>
                  <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/20">
                    +{duracionHoras} hora{duracionHoras > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Botones de selección rápida de horas */}
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                  {[1, 2, 3, 4, 6, 12, 24].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setDuracionHoras(h)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                        duracionHoras === h
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {h}h
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <span className="text-[11px] text-slate-400">O ingresa horas personalizadas:</span>
                  <input
                    type="number"
                    min="1"
                    max="168"
                    value={duracionHoras}
                    onChange={(e) => setDuracionHoras(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-20 px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-white text-xs font-mono text-center font-bold focus:outline-none focus:border-purple-400"
                  />
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed pt-1 border-t border-white/5">
                  💡 Al iniciar o activar la sala, el sorteo se programará sumándole automáticamente este número de horas al momento exacto actual.
                </p>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20"
                >
                  {saving ? 'Guardando...' : editingRoom ? 'Guardar Cambios' : 'Crear Sala'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

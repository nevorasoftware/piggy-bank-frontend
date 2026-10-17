'use client';

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';
import { Room, RoomStatus } from '@/types';
import { Plus, Edit2, Trash2, Play, Clock, Users, DollarSign, X, CheckCircle2, AlertCircle } from 'lucide-react';

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
  const [capacidadMax, setCapacidadMax] = useState('25');
  const [horaApertura, setHoraApertura] = useState('');
  const [horaSorteo, setHoraSorteo] = useState('');
  const [estado, setEstado] = useState<RoomStatus>('ABIERTA');

  const [saving, setSaving] = useState(false);
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
    // Default: apertura ahora, sorteo en 2 horas
    const now = new Date();
    const draw = new Date(now.getTime() + 120 * 60 * 1000);
    setHoraApertura(now.toISOString().slice(0, 16));
    setHoraSorteo(draw.toISOString().slice(0, 16));
    setEstado('ABIERTA');
    setIsModalOpen(true);
  };

  const openEditModal = (room: Room) => {
    setEditingRoom(room);
    setNombre(room.nombre);
    setPremio(String(room.premio));
    setCostoPase(String(room.costoPase));
    setCapacidadMax(String(room.capacidadMax));
    setHoraApertura(new Date(room.horaApertura).toISOString().slice(0, 16));
    setHoraSorteo(new Date(room.horaSorteo).toISOString().slice(0, 16));
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
        horaApertura: new Date(horaApertura).toISOString(),
        horaSorteo: new Date(horaSorteo).toISOString(),
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
        setActionMessage({ type: 'success', text: editingRoom ? 'Sala actualizada' : 'Sala creada con éxito' });
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
    if (!confirm(`¿Deseas iniciar el sorteo y girar la ruleta en vivo para la sala "${roomName}"?`)) return;
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
          <p className="text-xs text-slate-400 mt-1">Crea y edita premios, cupos y horarios de cierre.</p>
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
                <th className="py-4 px-4">Capacidad</th>
                <th className="py-4 px-4">Hora Sorteo</th>
                <th className="py-4 px-4">Estado</th>
                <th className="py-4 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">
                    No hay salas registradas. Crea una con el botón superior.
                  </td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr key={room.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-bold text-white">{room.nombre}</td>
                    <td className="py-4 px-4 font-mono font-bold text-amber-400">
                      ${Number(room.premio).toFixed(2)}
                    </td>
                    <td className="py-4 px-4 font-mono text-white">
                      ${Number(room.costoPase).toFixed(2)}
                    </td>
                    <td className="py-4 px-4 font-mono">
                      {room.ticketsSold} / {room.capacidadMax}
                    </td>
                    <td className="py-4 px-4 text-slate-400 font-mono">
                      {new Date(room.horaSorteo).toLocaleString('es-SV', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          room.estado === 'ABIERTA'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : room.estado === 'LLENA'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : room.estado === 'SORTEANDO'
                            ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 animate-pulse'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {room.estado}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      {/* Botón Girar Ruleta / Sorteo */}
                      {(room.estado === 'ABIERTA' || room.estado === 'LLENA') && (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para Crear / Editar Sala */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white mb-6">
              {editingRoom ? 'Editar Sala de Sorteo' : 'Nueva Sala de Sorteo'}
            </h3>

            <form onSubmit={handleSaveRoom} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Nombre</label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Cerdito Veloz $100"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Premio ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={premio}
                    onChange={(e) => setPremio(e.target.value)}
                    placeholder="100.00"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Costo Boleto ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={costoPase}
                    onChange={(e) => setCostoPase(e.target.value)}
                    placeholder="5.00"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Capacidad Máxima</label>
                  <input
                    type="number"
                    required
                    value={capacidadMax}
                    onChange={(e) => setCapacidadMax(e.target.value)}
                    placeholder="30"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Estado</label>
                  <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value as RoomStatus)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-purple-400"
                  >
                    <option value="ABIERTA">ABIERTA</option>
                    <option value="LLENA">LLENA</option>
                    <option value="CERRADA">CERRADA</option>
                    <option value="SORTEANDO">SORTEANDO</option>
                    <option value="FINALIZADA">FINALIZADA</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Hora de Apertura</label>
                  <input
                    type="datetime-local"
                    required
                    value={horaApertura}
                    onChange={(e) => setHoraApertura(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Hora del Sorteo</label>
                  <input
                    type="datetime-local"
                    required
                    value={horaSorteo}
                    onChange={(e) => setHoraSorteo(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-purple-400"
                  />
                </div>
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
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                >
                  {saving ? 'Guardando...' : 'Guardar Sala'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

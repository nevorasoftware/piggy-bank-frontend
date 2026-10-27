'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopCasinoBar from '@/components/casino/TopCasinoBar';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { playCoinSound, playClickSound } from '@/lib/sound';
import { Lock, User, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    playCoinSound();
    setLoading(true);

    try {
      const res = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
      });

      if (res.success && res.token && res.user) {
        login(res.token, res.user);

        if (res.user.role === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        setError(res.message || 'Credenciales incorrectas.');
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#070A12] text-slate-100 min-h-screen">
      {/* Barra Superior de Casino */}
      <TopCasinoBar
        title="Ingreso de Jugador • Piggy Bank"
        showBack={true}
        backHref="/"
      />

      <div className="relative flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Luces y resplandores neón de fondo */}
        <div className="absolute top-1/4 left-1/3 w-[450px] h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[300px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="rounded-3xl glass-panel border-2 border-amber-400/50 p-6 sm:p-8 shadow-2xl shadow-amber-500/15 bg-slate-950/90 relative overflow-hidden">
            {/* Cinta de brillo en cabecera */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />

            <div className="text-center mb-6">
              {/* Logo Oficial Rey Piggy */}
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-purple-500 to-yellow-300 shadow-xl shadow-amber-500/40 mx-auto mb-3 group hover:scale-105 transition-transform">
                <img
                  src="/images/piggy-logo.jpg"
                  alt="Rey Piggy Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md inline-block mb-1.5">
                ACCESO OFICIAL • GENIUSBET
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">Bienvenido de Vuelta</h1>
              <p className="text-xs text-slate-400 mt-1">
                Ingresa a tus salas y sigue tus boletos de sorteo en vivo
              </p>
            </div>

            {error && (
              <div className="mb-5 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  Correo, Teléfono o DUI Registrado
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="01234567-8 o tu@correo.com"
                  className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    Contraseña
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    onClick={playClickSound}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm transition-all"
                />
              </div>

              {/* Botón Arcade 3D */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-500 border-b-4 border-amber-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/30 hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Iniciando sesión...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>INGRESAR A LAS SALAS</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 text-center sm:text-left">
              <span>¿Aún no tienes cuenta?</span>
              <Link
                href="/auth/register"
                onClick={playClickSound}
                className="font-bold text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1"
              >
                <span>Regístrate aquí</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

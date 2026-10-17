'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DuiInput from '@/components/auth/DuiInput';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Phone, Mail, User, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dui, setDui] = useState('');
  const [isDuiValid, setIsDuiValid] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isDuiValid) {
      setError('Por favor ingresa un número de DUI salvadoreño válido con su dígito verificador.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      // Normalizar número telefónico si no lleva código +503
      let cleanPhone = phone.trim();
      if (!cleanPhone.startsWith('+503') && !cleanPhone.startsWith('503')) {
        cleanPhone = `+503${cleanPhone.replace(/\D/g, '')}`;
      }

      const res = await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          fullName,
          email,
          phone: cleanPhone,
          dui,
          password,
        }),
      });

      if (res.success) {
        if (res.token && res.user) {
          login(res.token, res.user);
        }
        // Guardar teléfono para verificar en la siguiente pantalla
        sessionStorage.setItem('verify_phone', cleanPhone);
        router.push('/auth/verify');
      } else {
        setError(res.message || 'Error al registrar usuario.');
      }
    } catch (err: any) {
      setError(err.message || 'Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-3xl glass-panel border border-white/10 p-8 shadow-2xl shadow-amber-500/5">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-3xl mx-auto mb-4">
            🐷
          </div>
          <h1 className="text-2xl font-black text-white">Crear Cuenta en PiggyBank</h1>
          <p className="text-xs text-slate-400 mt-1">
            Validación oficial con DUI salvadoreño y pagos seguros
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre Completo */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              Nombre Completo
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Juan Carlos Pérez Rodríguez"
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm"
            />
          </div>

          {/* DUI Salvadoreño con Validador */}
          <DuiInput
            value={dui}
            onChange={(val, isValid) => {
              setDui(val);
              setIsDuiValid(isValid);
            }}
          />

          {/* Teléfono Salvadoreño */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              Teléfono Celular (WhatsApp)
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+503 7123-4567"
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm font-mono"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Recibirás aquí tu código OTP y tus pases de sorteo
            </span>
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm"
            />
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Confirmar Contraseña
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
          >
            {loading ? (
              <span>Registrando y generando OTP...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                Registrarme en PiggyBank
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link href="/auth/login" className="font-bold text-amber-400 hover:underline">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

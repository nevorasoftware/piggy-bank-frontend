'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/lib/api';
import { Mail, KeyRound, Lock, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  // Paso 1: Enviar OTP al correo
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);
    setLoading(true);

    try {
      const res = await apiRequest('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      if (res.success) {
        setInfoMessage(res.message || `Código enviado a ${email}`);
        setStep(2);
      } else {
        setError(res.message || 'No fue posible enviar el código de recuperación.');
      }
    } catch (err: any) {
      setError(err.message || 'Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  // Reenviar código OTP
  const handleResendOtp = async () => {
    setError(null);
    setResending(true);

    try {
      const res = await apiRequest('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      if (res.success) {
        setInfoMessage('Se ha enviado un nuevo código OTP a tu correo.');
        setTimeout(() => setInfoMessage(null), 4000);
      } else {
        setError(res.message || 'Error al reenviar código.');
      }
    } catch (err: any) {
      setError(err.message || 'Error al reenviar código.');
    } finally {
      setResending(false);
    }
  };

  // Paso 2: Verificar código OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await apiRequest('/api/auth/verify-reset-otp', {
        method: 'POST',
        body: JSON.stringify({ email, code }),
      });

      if (res.success) {
        setStep(3);
      } else {
        setError(res.message || 'Código OTP inválido o expirado.');
      }
    } catch (err: any) {
      setError(err.message || 'Error al verificar el código.');
    } finally {
      setLoading(false);
    }
  };

  // Paso 3: Guardar nueva contraseña
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden. Por favor verifícalas.');
      return;
    }

    setLoading(true);

    try {
      const res = await apiRequest('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email, code, newPassword }),
      });

      if (res.success) {
        setStep(4);
      } else {
        setError(res.message || 'Error al restablecer la contraseña.');
      }
    } catch (err: any) {
      setError(err.message || 'Error al guardar la nueva contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-3xl glass-panel border border-white/10 p-8 shadow-2xl shadow-amber-500/5">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-3xl mx-auto mb-4">
            🔑
          </div>
          <h1 className="text-2xl font-black text-white">Recuperar Contraseña</h1>
          <p className="text-xs text-slate-400 mt-1">
            {step === 1 && 'Ingresa el correo electrónico de tu cuenta'}
            {step === 2 && 'Ingresa el código OTP enviado a tu correo'}
            {step === 3 && 'Define tu nueva contraseña de acceso'}
            {step === 4 && '¡Contraseña restablecida exitosamente!'}
          </p>

          {/* Indicador de pasos */}
          {step < 4 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className={`w-2.5 h-2.5 rounded-full transition-colors ${step >= 1 ? 'bg-amber-400' : 'bg-slate-700'}`} />
              <span className={`w-8 h-0.5 rounded transition-colors ${step >= 2 ? 'bg-amber-400' : 'bg-slate-700'}`} />
              <span className={`w-2.5 h-2.5 rounded-full transition-colors ${step >= 2 ? 'bg-amber-400' : 'bg-slate-700'}`} />
              <span className={`w-8 h-0.5 rounded transition-colors ${step >= 3 ? 'bg-amber-400' : 'bg-slate-700'}`} />
              <span className={`w-2.5 h-2.5 rounded-full transition-colors ${step >= 3 ? 'bg-amber-400' : 'bg-slate-700'}`} />
            </div>
          )}
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Mensaje Informativo */}
        {infoMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{infoMessage}</span>
          </div>
        )}

        {/* PASO 1: Ingreso de Correo Electrónico */}
        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
            >
              {loading ? (
                <span>Buscando cuenta y enviando código...</span>
              ) : (
                <>
                  <span>Enviar Código de Seguridad</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-4 text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Volver a Iniciar Sesión
              </Link>
            </div>
          </form>
        )}

        {/* PASO 2: Ingreso de Código OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 text-xs text-slate-300">
              Hemos enviado un código OTP de 6 dígitos a <strong className="text-amber-400">{email}</strong>.
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                Código de 6 Dígitos
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full px-4 py-3.5 bg-slate-900 border border-white/10 rounded-xl text-white text-center font-mono text-2xl font-black tracking-[8px] focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                Cambiar correo
              </button>
              <button
                type="button"
                disabled={resending}
                onClick={handleResendOtp}
                className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1 disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${resending ? 'animate-spin' : ''}`} />
                {resending ? 'Reenviando...' : 'Reenviar código'}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Validando código...</span>
              ) : (
                <>
                  <span>Verificar Código OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* PASO 3: Nueva Contraseña */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Código verificado correctamente. Define tu nueva contraseña.</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Nueva Contraseña
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Confirmar Nueva Contraseña
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu nueva contraseña"
                className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
            >
              {loading ? (
                <span>Actualizando contraseña...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>Guardar Nueva Contraseña</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* PASO 4: Éxito y Confirmación */}
        {step === 4 && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center text-3xl mx-auto shadow-xl shadow-emerald-500/30 animate-bounce">
              ✓
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-white">¡Contraseña Actualizada!</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tu contraseña ha sido restablecida exitosamente. Hemos enviado una notificación de seguridad a tu correo electrónico.
              </p>
            </div>

            <button
              onClick={() => router.push('/auth/login')}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Iniciar Sesión Ahora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

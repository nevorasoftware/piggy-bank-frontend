'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Mail, AlertCircle, CheckCircle, ArrowRight, RotateCw } from 'lucide-react';

export default function VerifyOtpPage() {
  const router = useRouter();
  const { user, refreshMe } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('verify_email');
    const savedPhone = sessionStorage.getItem('verify_phone');

    if (savedEmail) {
      setIdentifier(savedEmail);
    } else if (user?.email) {
      setIdentifier(user.email);
    } else if (savedPhone) {
      setIdentifier(savedPhone);
    } else if (user?.phone) {
      setIdentifier(user.phone);
    }
  }, [user]);

  // Temporizador para el botón de reenvío
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);
    setLoading(true);

    try {
      const res = await apiRequest('/api/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({
          identifier,
          code: code.trim(),
        }),
      });

      if (res.success) {
        setSuccess(true);
        await refreshMe();
        setTimeout(() => {
          router.push('/profile');
        }, 1500);
      } else {
        setError(res.message || 'Código OTP inválido o expirado.');
      }
    } catch (err: any) {
      setError(err.message || 'Error al validar el código OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0 || !identifier) return;
    setResending(true);
    setError(null);
    setInfoMessage(null);

    try {
      const res = await apiRequest('/api/auth/resend-otp', {
        method: 'POST',
        body: JSON.stringify({ identifier }),
      });

      if (res.success) {
        setInfoMessage(res.message || 'Nuevo código enviado exitosamente a tu correo.');
        setResendCooldown(60);
      } else {
        setError(res.message || 'Error al reenviar código.');
      }
    } catch (err: any) {
      setError(err.message || 'Error al conectar con el servidor.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-3xl glass-panel border border-white/10 p-8 shadow-2xl text-center relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-3xl mx-auto mb-4 text-amber-400 shadow-lg shadow-amber-500/10">
          <Mail className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-black text-white">Verificación por Correo</h1>
        <p className="text-xs text-slate-400 mt-2 mb-6">
          Hemos enviado un código de seguridad de 6 dígitos a tu correo registrado:
          <span className="block font-mono font-bold text-amber-400 mt-1 text-sm bg-white/5 py-1.5 px-3 rounded-xl border border-white/5 inline-block">
            {identifier || 'Tu Correo'}
          </span>
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {infoMessage && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2 text-left">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{infoMessage}</span>
          </div>
        )}

        {success ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold flex flex-col items-center gap-2">
            <CheckCircle className="w-8 h-8" />
            <span>¡Cuenta Verificada con Éxito!</span>
            <span className="text-xs text-slate-400 font-normal">Redirigiendo a tu perfil...</span>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <input
                type="text"
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                autoFocus
                className="w-full py-4 text-center bg-slate-900 border border-white/20 rounded-2xl text-white font-mono text-3xl tracking-[0.5em] focus:outline-none focus:border-amber-400 shadow-inner"
              />
              <span className="text-[11px] text-slate-500 mt-2 block">
                Código de 6 dígitos • Válido durante 10 minutos
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Validando Código...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  Verificar y Activar Cuenta
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Botón de Reenviar Código */}
            <div className="pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={resending || resendCooldown > 0}
                className="text-xs text-slate-400 hover:text-amber-400 font-medium transition-colors inline-flex items-center gap-1.5 disabled:opacity-50 disabled:hover:text-slate-400"
              >
                <RotateCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
                {resendCooldown > 0
                  ? `Reenviar nuevo código en ${resendCooldown}s`
                  : '¿No recibiste el correo? Solicitar nuevo código'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

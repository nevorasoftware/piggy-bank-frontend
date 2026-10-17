'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, MessageCircle, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

export default function VerifyOtpPage() {
  const router = useRouter();
  const { user, refreshMe } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('verify_phone');
    if (saved) {
      setIdentifier(saved);
    } else if (user?.phone) {
      setIdentifier(user.phone);
    }
  }, [user]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
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
        setError(res.message || 'Código OTP inválido.');
      }
    } catch (err: any) {
      setError(err.message || 'Error al validar OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-3xl glass-panel border border-white/10 p-8 shadow-2xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto mb-4 text-emerald-400">
          <MessageCircle className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-black text-white">Verificación por WhatsApp</h1>
        <p className="text-xs text-slate-400 mt-2 mb-6">
          Hemos enviado un código de seguridad de 6 dígitos a tu número registrado:
          <span className="block font-mono font-bold text-amber-400 mt-1">{identifier || 'Tu WhatsApp'}</span>
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold flex flex-col items-center gap-2">
            <CheckCircle className="w-8 h-8" />
            <span>¡Identidad Verificada con Éxito!</span>
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
                className="w-full py-4 text-center bg-slate-900 border border-white/20 rounded-2xl text-white font-mono text-3xl tracking-[0.5em] focus:outline-none focus:border-amber-400"
              />
              <span className="text-[11px] text-slate-500 mt-2 block">
                Código válido durante 10 minutos
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Validando...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  Verificar Código
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

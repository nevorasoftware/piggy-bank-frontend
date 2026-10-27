'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DuiInput from '@/components/auth/DuiInput';
import PhoneInput from '@/components/auth/PhoneInput';
import { toBackendPhone } from '@/lib/phone';
import TopCasinoBar from '@/components/casino/TopCasinoBar';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { playCoinSound, playClickSound } from '@/lib/sound';
import {
  Sparkles,
  Phone,
  Mail,
  User,
  Lock,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Trophy,
  Crown,
  Gift,
  CheckCircle2,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
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

    if (!isPhoneValid) {
      setError('Por favor ingresa un número de teléfono salvadoreño válido (+503 ####-####).');
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

    playCoinSound();
    setLoading(true);

    try {
      // Normalizar número telefónico limpio para el backend (+503########)
      const cleanPhone = toBackendPhone(phone);

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
        // Guardar correo y teléfono para verificar en la siguiente pantalla
        sessionStorage.setItem('verify_email', email);
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
    <div className="flex-1 flex flex-col bg-[#070A12] text-slate-100 min-h-screen">
      {/* ======================================================== */}
      {/* 1. BARRA SUPERIOR DE CASINO MÓVIL ESTILO GENIUSBET PIGGY TAP */}
      {/* ======================================================== */}
      <TopCasinoBar
        title="Registro de Jugador • Piggy Bank"
        showBack={true}
        backHref="/"
      />

      {/* Luces y resplandores neón de fondo */}
      <div className="relative flex-1 flex items-center justify-center py-10 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[350px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-5xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ======================================================== */}
            {/* COLUMNA IZQUIERDA: BIENVENIDA VIP Y PERSONAJES OFICIALES */}
            {/* ======================================================== */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-6">
              {/* Badge Oficial */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider shadow-md">
                <Crown className="w-4 h-4 text-amber-400 animate-bounce-soft" />
                <span>Registro VIP • El Salvador</span>
              </div>

              {/* Título Principal */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                ¡Entra a la Mesa y <br />
                <span className="text-gold-gradient drop-shadow-[0_2px_15px_rgba(250,204,21,0.5)]">
                  Juega por Efectivo!
                </span>
              </h1>

              <p className="text-slate-300 text-sm leading-relaxed">
                Crea tu perfil de jugador con tu DUI salvadoreño. Participa en sorteos comunitarios cada 2 horas y recibe tus pagos directamente en tu cuenta bancaria.
              </p>

              {/* Tarjeta de los Personajes Animados */}
              <div className="relative rounded-3xl overflow-hidden glass-panel border-2 border-amber-400/60 p-4 sm:p-5 bg-gradient-to-b from-purple-950/60 via-slate-900 to-slate-950 shadow-2xl shadow-purple-950/50">
                {/* Auras y luces de color */}
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-pink-500/25 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-amber-400/25 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex items-center gap-4">
                  {/* Avatar Presentadora (Modelo Animada) */}
                  <motion.div
                    animate={{ y: [-4, 4, -4], rotate: [0, 1.5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative w-18 h-24 sm:w-22 sm:h-28 rounded-2xl overflow-hidden ring-2 ring-pink-400/80 shadow-lg shadow-pink-500/40 shrink-0"
                  >
                    <img
                      src="/images/premios-host.jpg"
                      alt="Anfitriona ¡Premio!"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1 right-1 text-xs animate-pulse">✨</span>
                  </motion.div>

                  {/* Avatar Rey Piggy Animado */}
                  <motion.div
                    animate={{ y: [4, -4, 4], rotate: [-2, 2, -2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-pink-500 to-yellow-300 shadow-xl shadow-amber-500/50 shrink-0"
                  >
                    <img
                      src="/images/piggy-logo.jpg"
                      alt="Rey Piggy"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 border border-white flex items-center justify-center text-[10px] font-black text-slate-950 shadow-md">
                      $
                    </div>
                  </motion.div>

                  {/* Texto de Garantía */}
                  <div className="text-left">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 inline-block mb-1 shadow-sm">
                      ANFITRIONES OFICIALES
                    </span>
                    <h4 className="text-sm font-black text-white">Sorteos Certificados</h4>
                    <p className="text-[11px] text-amber-300/90 font-bold mt-0.5">
                      Transparencia total y entrega directa a titular registrado
                    </p>
                  </div>
                </div>

                {/* Beneficios Rápidos */}
                <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-semibold text-left">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>DUI Verificado</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <Trophy className="w-4 h-4 shrink-0" />
                    <span>Máx. 3 Victorias / 24h</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-purple-300">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>Sin Límite de Pases</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sky-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Mayores de 18 Años</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* COLUMNA DERECHA: CONSOLA ARCADE DE REGISTRO */}
            {/* ======================================================== */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl glass-panel border-2 border-amber-400/50 p-6 sm:p-8 shadow-2xl shadow-amber-500/10 bg-slate-950/90 relative overflow-hidden">
                {/* Cinta de brillo en cabecera */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />

                {/* Encabezado del Formulario */}
                <div className="text-center sm:text-left mb-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-2 justify-center sm:justify-start">
                      <span>Crear Cuenta de Jugador</span>
                      <span className="text-amber-400 text-lg">🎰</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Ingresa tus datos oficiales para acreditar tus premios
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-purple-500 shadow-lg shadow-amber-500/20 shrink-0">
                    <img
                      src="/images/piggy-logo.jpg"
                      alt="Piggy Logo"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Mensaje de Error */}
                {error && (
                  <div className="mb-5 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Verificación de Registro:</strong>
                      <span className="mt-0.5 block">{error}</span>
                    </div>
                  </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nombre Completo */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      Nombre Completo (Como aparece en tu DUI)
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Juan Carlos Pérez Rodríguez"
                      className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm transition-all"
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

                  {/* Teléfono Salvadoreño (+503 ####-####) con Formato Visual y Validador */}
                  <PhoneInput
                    value={phone}
                    onChange={(val, isValid) => {
                      setPhone(val);
                      setIsPhoneValid(isValid);
                    }}
                  />

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
                      className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm transition-all"
                    />
                  </div>

                  {/* Grid de Contraseñas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm transition-all"
                      />
                    </div>

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
                        className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* BOTÓN ARCADE 3D DE REGISTRO */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-2xl bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-500 border-b-4 border-amber-600 text-slate-950 font-black text-sm sm:text-base uppercase tracking-wider shadow-2xl shadow-amber-500/40 hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 group"
                    >
                      {loading ? (
                        <span>Registrando y generando OTP...</span>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
                          <span>¡REGISTRARME Y EMPEZAR A JUGAR!</span>
                          <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Footer del Formulario */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 text-center sm:text-left">
                  <span>¿Ya tienes una cuenta registrada?</span>
                  <Link
                    href="/auth/login"
                    onClick={playClickSound}
                    className="font-bold text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1"
                  >
                    <span>Iniciar Sesión</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

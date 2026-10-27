'use client';

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';
import {
  Sliders,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  Clock,
  Key,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
  ExternalLink,
  Activity,
  RefreshCw,
  Server,
  Mail,
  Send,
  HelpCircle,
  Info,
} from 'lucide-react';

export default function AdminConfigPage() {
  // Configuración de Juego
  const [maxParticipaciones, setMaxParticipaciones] = useState(6);
  const [maxVictorias, setMaxVictorias] = useState(3);
  const [loadingGame, setLoadingGame] = useState(true);
  const [savingGame, setSavingGame] = useState(false);
  const [gameMessage, setGameMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Configuración de Wompi El Salvador
  const [wompiAppId, setWompiAppId] = useState('ba6ddd9d-e5d4-4c73-8571-9c3fde2f31e2');
  const [wompiApiSecret, setWompiApiSecret] = useState('4dbf191f-c328-4a98-af50-c85a6722a599');
  const [isLive, setIsLive] = useState(false);
  const [wompiAuthUrl, setWompiAuthUrl] = useState('https://id.wompi.sv/connect/token');
  const [wompiApiUrl, setWompiApiUrl] = useState('https://api.wompi.sv');
  const [showSecret, setShowSecret] = useState(false);
  const [loadingWompi, setLoadingWompi] = useState(true);
  const [savingWompi, setSavingWompi] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [wompiMessage, setWompiMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; tokenPreview?: string } | null>(null);

  // Configuración de Correo Electrónico (Gmail SMTP / Verificación OTP)
  const [smtpUser, setSmtpUser] = useState('piggybanksv@gmail.com');
  const [smtpPass, setSmtpPass] = useState('');
  const [smtpHost, setSmtpHost] = useState('smtp.gmail.com');
  const [smtpPort, setSmtpPort] = useState(465);
  const [smtpSecure, setSmtpSecure] = useState(true);
  const [senderName, setSenderName] = useState('PiggyBank El Salvador');
  const [isEmailActive, setIsEmailActive] = useState(true);
  const [showEmailPass, setShowEmailPass] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(true);
  const [savingEmail, setSavingEmail] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);
  const [testRecipient, setTestRecipient] = useState('');
  const [emailMessage, setEmailMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [emailTestResult, setEmailTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    loadAllConfigs();
  }, []);

  const loadAllConfigs = async () => {
    // 1. Cargar GameConfig
    try {
      const res = await apiRequest('/api/admin/config');
      if (res.success && res.config) {
        setMaxParticipaciones(res.config.maxParticipacionesDia);
        setMaxVictorias(res.config.maxVictoriasDia);
      }
    } catch (err) {
      console.error('Error al cargar GameConfig:', err);
    } finally {
      setLoadingGame(false);
    }

    // 2. Cargar WompiConfig (con reveal=true para administradores autenticados)
    try {
      const res = await apiRequest('/api/admin/wompi-config?reveal=true');
      if (res.success && res.config) {
        if (res.config.wompiAppId) setWompiAppId(res.config.wompiAppId);
        if (res.config.wompiApiSecret) {
          setWompiApiSecret(res.config.wompiApiSecret);
        } else if (res.config.maskedSecret) {
          setWompiApiSecret(res.config.maskedSecret);
        }
        if (res.config.wompiAuthUrl) setWompiAuthUrl(res.config.wompiAuthUrl);
        if (res.config.wompiApiUrl) setWompiApiUrl(res.config.wompiApiUrl);
        setIsLive(Boolean(res.config.isLive));
      }
    } catch (err) {
      console.error('Error al cargar WompiConfig:', err);
    } finally {
      setLoadingWompi(false);
    }

    // 3. Cargar EmailConfig (con reveal=true para administradores)
    try {
      const res = await apiRequest('/api/admin/email-config?reveal=true');
      if (res.success && res.config) {
        if (res.config.smtpUser) setSmtpUser(res.config.smtpUser);
        if (res.config.smtpPass) {
          setSmtpPass(res.config.smtpPass);
        } else if (res.config.maskedPass) {
          setSmtpPass(res.config.maskedPass);
        }
        if (res.config.smtpHost) setSmtpHost(res.config.smtpHost);
        if (res.config.smtpPort) setSmtpPort(res.config.smtpPort);
        if (res.config.senderName) setSenderName(res.config.senderName);
        if (res.config.smtpSecure !== undefined) setSmtpSecure(res.config.smtpSecure);
        if (res.config.isActive !== undefined) setIsEmailActive(res.config.isActive);
      }
    } catch (err) {
      console.error('Error al cargar EmailConfig:', err);
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleSaveEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingEmail(true);
    setEmailMessage(null);

    try {
      const res = await apiRequest('/api/admin/email-config', {
        method: 'PUT',
        body: JSON.stringify({
          smtpUser: smtpUser.trim(),
          smtpPass: smtpPass.trim(),
          smtpHost: smtpHost.trim(),
          smtpPort: Number(smtpPort),
          smtpSecure,
          senderName: senderName.trim(),
          isActive: isEmailActive,
        }),
      });

      if (res.success) {
        setEmailMessage({
          type: 'success',
          text: 'Configuración de correo Gmail SMTP guardada exitosamente en la base de datos.',
        });
        if (res.config?.maskedPass && !showEmailPass) {
          setSmtpPass(res.config.maskedPass);
        }
      } else {
        setEmailMessage({ type: 'error', text: res.message || 'Error al guardar configuración de correo.' });
      }
    } catch (err: any) {
      setEmailMessage({ type: 'error', text: err.message || 'Error en la petición de guardado.' });
    } finally {
      setSavingEmail(false);
    }
  };

  const handleTestEmail = async () => {
    setTestingEmail(true);
    setEmailTestResult(null);

    try {
      const res = await apiRequest('/api/admin/email-config/test', {
        method: 'POST',
        body: JSON.stringify({
          testEmail: testRecipient.trim() || undefined,
        }),
      });

      if (res.success) {
        setEmailTestResult({
          success: true,
          message: res.message || '¡Conexión SMTP exitosa! Correo de prueba enviado.',
        });
      } else {
        setEmailTestResult({
          success: false,
          message: res.message || 'Error al conectar con Gmail SMTP.',
        });
      }
    } catch (err: any) {
      setEmailTestResult({
        success: false,
        message: err.message || 'Error de conexión con el servidor SMTP.',
      });
    } finally {
      setTestingEmail(false);
    }
  };

  const handleSaveGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingGame(true);
    setGameMessage(null);

    try {
      const res = await apiRequest('/api/admin/config', {
        method: 'PUT',
        body: JSON.stringify({
          maxParticipacionesDia: Number(maxParticipaciones),
          maxVictoriasDia: Number(maxVictorias),
        }),
      });

      if (res.success) {
        setGameMessage({ type: 'success', text: 'Reglas de participación 6/3 actualizadas en caliente.' });
      } else {
        setGameMessage({ type: 'error', text: res.message || 'Error al guardar configuración.' });
      }
    } catch (err: any) {
      setGameMessage({ type: 'error', text: err.message || 'Error en la petición.' });
    } finally {
      setSavingGame(false);
    }
  };

  const handleSaveWompi = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingWompi(true);
    setWompiMessage(null);

    try {
      const res = await apiRequest('/api/admin/wompi-config', {
        method: 'PUT',
        body: JSON.stringify({
          wompiAppId: wompiAppId.trim(),
          wompiApiSecret: wompiApiSecret.trim(),
          isLive,
          wompiAuthUrl: wompiAuthUrl.trim(),
          wompiApiUrl: wompiApiUrl.trim(),
        }),
      });

      if (res.success) {
        setWompiMessage({
          type: 'success',
          text: 'Configuración de Wompi SV guardada exitosamente en la base de datos.',
        });
        if (res.config?.maskedSecret && !showSecret) {
          setWompiApiSecret(res.config.maskedSecret);
        }
      } else {
        setWompiMessage({ type: 'error', text: res.message || 'Error al guardar configuración de Wompi.' });
      }
    } catch (err: any) {
      setWompiMessage({ type: 'error', text: err.message || 'Error en la petición de guardado.' });
    } finally {
      setSavingWompi(false);
    }
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setTestResult(null);

    try {
      const res = await apiRequest('/api/admin/wompi-config/test', {
        method: 'POST',
        body: JSON.stringify({
          wompiAppId: wompiAppId.trim(),
          wompiApiSecret: wompiApiSecret.trim(),
          wompiAuthUrl: wompiAuthUrl.trim(),
        }),
      });

      if (res.success) {
        setTestResult({
          success: true,
          message: res.message || 'Token OAuth 2.0 generado con éxito.',
          tokenPreview: res.tokenPreview,
        });
      } else {
        setTestResult({
          success: false,
          message: res.message || 'No fue posible autenticar con Wompi SV.',
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Error al conectar con Wompi SV.',
      });
    } finally {
      setTestingConnection(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Panel de Parametrización
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Acceso Exclusivo Administrador
          </span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Configuración del Sistema y Pagos
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Administra las credenciales de la pasarela de pagos Wompi El Salvador y los parámetros regulatorios del juego responsable en la base de datos PostgreSQL.
        </p>
      </div>

      {/* SECCIÓN 1: CONFIGURACIÓN DE WOMPI SV */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 relative overflow-hidden">
        {/* Fondo decorativo sutil */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">Pasarela Wompi El Salvador</h2>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isLive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {isLive ? 'Ambiente: Producción' : 'Ambiente: Sandbox / Pruebas'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                OAuth 2.0 Client Credentials Flow para procesamiento de transacciones.
              </p>
            </div>
          </div>

          <a
            href="https://docs.wompi.sv/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white transition-all self-start sm:self-auto"
          >
            <span>Docs Oficiales</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        {/* Feedback Messages */}
        {wompiMessage && (
          <div
            className={`p-4 rounded-2xl text-xs flex items-center gap-2.5 ${
              wompiMessage.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}
          >
            {wompiMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span className="font-medium">{wompiMessage.text}</span>
          </div>
        )}

        {testResult && (
          <div
            className={`p-4 rounded-2xl text-xs border space-y-1 ${
              testResult.success
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              )}
              <span>{testResult.message}</span>
            </div>
            {testResult.tokenPreview && (
              <p className="text-[11px] font-mono text-emerald-400/80 pl-6">
                Preview Token OAuth: <span className="bg-emerald-950/60 px-2 py-0.5 rounded">{testResult.tokenPreview}</span>
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleSaveWompi} className="space-y-5">
          {/* App ID (Client ID) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                App ID (Client ID)
              </span>
              <span className="text-amber-400 font-mono text-[11px]">client_id</span>
            </label>
            <input
              type="text"
              required
              value={wompiAppId}
              onChange={(e) => setWompiAppId(e.target.value)}
              placeholder="ba6ddd9d-e5d4-4c73-8571-9c3fde2f31e2"
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl text-white font-mono text-sm font-semibold focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
            />
            <p className="text-[11px] text-slate-500">
              Identificador público de la aplicación/negocio generado desde panel.wompi.sv.
            </p>
          </div>

          {/* API Secret (Client Secret) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                API Secret (Client Secret)
              </span>
              <span className="text-amber-400 font-mono text-[11px]">client_secret</span>
            </label>
            <div className="relative">
              <input
                type={showSecret ? 'text' : 'password'}
                required
                value={wompiApiSecret}
                onChange={(e) => setWompiApiSecret(e.target.value)}
                placeholder="4dbf191f-c328-4a98-af50-c85a6722a599"
                className="w-full px-4 py-3 pr-12 bg-slate-900 border border-white/10 rounded-2xl text-white font-mono text-sm font-semibold focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white transition-colors rounded-lg"
                title={showSecret ? 'Ocultar secreto' : 'Mostrar secreto'}
              >
                {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Llave privada de autenticación OAuth. Se almacena de forma segura en PostgreSQL y jamás se expone en bundles del cliente.
            </p>
          </div>

          {/* URLs de la API Wompi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-slate-400" />
                URL Token OAuth
              </label>
              <input
                type="url"
                required
                value={wompiAuthUrl}
                onChange={(e) => setWompiAuthUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-slate-300 font-mono text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-slate-400" />
                URL API Base
              </label>
              <input
                type="url"
                required
                value={wompiApiUrl}
                onChange={(e) => setWompiApiUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-slate-300 font-mono text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Selector de Ambiente (Sandbox vs Producción) */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
            <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Modo de Operación de la Pasarela
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsLive(false)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  !isLive
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-md'
                    : 'bg-slate-900/50 border-white/5 text-slate-400 hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs uppercase tracking-wider">Modo Sandbox (Pruebas)</span>
                  {!isLive && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                </div>
                <p className="text-[11px] text-slate-400">
                  Usa tarjetas simuladas para verificar flujos sin cobro monetario real.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setIsLive(true)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isLive
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-md'
                    : 'bg-slate-900/50 border-white/5 text-slate-400 hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs uppercase tracking-wider">Modo Producción (Live)</span>
                  {isLive && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <p className="text-[11px] text-slate-400">
                  Cobros reales con tarjetas bancarias Visa y Mastercard autorizadas por Wompi SV.
                </p>
              </button>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testingConnection || loadingWompi}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <Activity className={`w-4 h-4 text-amber-400 ${testingConnection ? 'animate-pulse' : ''}`} />
              {testingConnection ? 'Probando Autenticación...' : 'Probar Conexión con Wompi'}
            </button>

            <button
              type="submit"
              disabled={savingWompi || loadingWompi}
              className="w-full sm:flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {savingWompi ? 'Guardando en Base de Datos...' : 'Guardar Configuración de Wompi'}
            </button>
          </div>
        </form>
      </div>

      {/* SECCIÓN 2: CONFIGURACIÓN DE CORREO ELECTRÓNICO (GMAIL SMTP / VERIFICACIÓN OTP) */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">Verificación por Correo Electrónico</h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Gmail SMTP
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Envío de códigos OTP de 6 dígitos desde <strong className="text-amber-400">{smtpUser}</strong> a los usuarios en el registro.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEmailActive(!isEmailActive)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isEmailActive
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                  : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
              }`}
            >
              {isEmailActive ? '● Servicio Activo' : '○ Servicio En Pausa'}
            </button>
          </div>
        </div>

        {emailMessage && (
          <div
            className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
              emailMessage.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}
          >
            {emailMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{emailMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleSaveEmail} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Correo Remitente */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                Correo Electrónico Emisor (Gmail)
              </label>
              <input
                type="email"
                required
                value={smtpUser}
                onChange={(e) => setSmtpUser(e.target.value)}
                placeholder="piggybanksv@gmail.com"
                className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl text-white font-mono text-sm focus:outline-none focus:border-amber-400 shadow-inner"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Cuenta de Google utilizada para enviar los códigos de verificación.
              </p>
            </div>

            {/* Token / Contraseña de Aplicación */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  Token / Contraseña de Aplicación de Google
                </label>
                <button
                  type="button"
                  onClick={() => setShowEmailPass(!showEmailPass)}
                  className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
                >
                  {showEmailPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {showEmailPass ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showEmailPass ? 'text' : 'password'}
                  required
                  value={smtpPass}
                  onChange={(e) => setSmtpPass(e.target.value)}
                  placeholder="xxxx xxxx xxxx xxxx (16 caracteres)"
                  className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl text-white font-mono text-sm tracking-wider focus:outline-none focus:border-amber-400 shadow-inner"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Generado en tu cuenta de Google. Seguro y parametrizable en caliente.
              </p>
            </div>

            {/* Servidor SMTP Host */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-amber-400" />
                Servidor SMTP Host
              </label>
              <input
                type="text"
                required
                value={smtpHost}
                onChange={(e) => setSmtpHost(e.target.value)}
                placeholder="smtp.gmail.com"
                className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl text-white font-mono text-sm focus:outline-none focus:border-amber-400 shadow-inner"
              />
            </div>

            {/* Puerto y Seguridad */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Puerto SMTP
                </label>
                <input
                  type="number"
                  required
                  value={smtpPort}
                  onChange={(e) => setSmtpPort(parseInt(e.target.value, 10) || 465)}
                  className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl text-white font-mono text-sm focus:outline-none focus:border-amber-400 shadow-inner"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Seguridad SSL
                </label>
                <button
                  type="button"
                  onClick={() => setSmtpSecure(!smtpSecure)}
                  className={`w-full py-3 px-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    smtpSecure
                      ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                      : 'bg-slate-900 border-white/10 text-slate-400'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {smtpSecure ? 'SSL Activo (465)' : 'TLS / STARTTLS'}
                </button>
              </div>
            </div>

            {/* Nombre del Remitente */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Nombre de Remitente Visible
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="PiggyBank El Salvador"
                className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-amber-400 shadow-inner"
              />
            </div>
          </div>

          {/* Guía Paso a Paso para obtener el token de Gmail */}
          <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/15 space-y-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>¿Cómo obtener la Contraseña de Aplicación (Token de 16 letras) para {smtpUser}?</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-400 pl-1 leading-relaxed">
              <li>
                Inicia sesión en Google con la cuenta <strong className="text-white">{smtpUser}</strong> y ve a{' '}
                <a
                  href="https://myaccount.google.com/security"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 underline inline-flex items-center gap-0.5 font-mono"
                >
                  myaccount.google.com/security <ExternalLink className="w-2.5 h-2.5" />
                </a>.
              </li>
              <li>Asegúrate de tener activada la <strong>Verificación en dos pasos (2FA)</strong>.</li>
              <li>
                Entra directamente al apartado de contraseñas de aplicaciones en{' '}
                <a
                  href="https://myaccount.google.com/apppasswords"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 underline inline-flex items-center gap-0.5 font-mono"
                >
                  myaccount.google.com/apppasswords <ExternalLink className="w-2.5 h-2.5" />
                </a>.
              </li>
              <li>Escribe un nombre identificador (ej: <em>PiggyBank Web</em>) y haz clic en <strong>Crear</strong>.</li>
              <li>Copia el token de 16 caracteres generado (ej: <code className="text-amber-300 font-mono">abcd efgh ijkl mnop</code>) y pégalo en el campo superior.</li>
            </ol>
          </div>

          {/* Prueba de Envío de Correo */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5 space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex-1 w-full">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Probar Envío a este Correo:
                </label>
                <input
                  type="email"
                  value={testRecipient}
                  onChange={(e) => setTestRecipient(e.target.value)}
                  placeholder={`Por defecto: ${smtpUser}`}
                  className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="button"
                onClick={handleTestEmail}
                disabled={testingEmail || loadingEmail}
                className="w-full sm:w-auto mt-4 sm:mt-0 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/20 font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <Send className={`w-3.5 h-3.5 ${testingEmail ? 'animate-bounce' : ''}`} />
                {testingEmail ? 'Enviando Correo de Prueba...' : 'Enviar Correo de Prueba'}
              </button>
            </div>

            {emailTestResult && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  emailTestResult.success
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                }`}
              >
                {emailTestResult.success ? (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                )}
                <span>{emailTestResult.message}</span>
              </div>
            )}
          </div>

          {/* Botón de Guardar Configuración de Correo */}
          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              disabled={savingEmail || loadingEmail}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {savingEmail ? 'Guardando en Base de Datos...' : 'Guardar Configuración de Correo'}
            </button>
          </div>
        </form>
      </div>

      {/* SECCIÓN 3: CONFIGURACIÓN DE JUEGO RESPONSABLE (6/3) */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-inner">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Reglas de Juego Responsable (6/3)</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Límites diarios por usuario calculados en zona horaria America/El_Salvador.
            </p>
          </div>
        </div>

        {gameMessage && (
          <div
            className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
              gameMessage.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}
          >
            {gameMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{gameMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleSaveGame} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* MAX_PARTICIPACIONES_DIA */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Máx. Participaciones / Día</span>
                <span className="text-purple-400 font-mono text-[10px]">MAX_PARTICIPACIONES_DIA</span>
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
                Valor por defecto: 6. Bloquea la compra de nuevos pases al alcanzar el tope diario.
              </p>
            </div>

            {/* MAX_VICTORIAS_DIA */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Máx. Victorias / Día</span>
                <span className="text-purple-400 font-mono text-[10px]">MAX_VICTORIAS_DIA</span>
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
                Valor por defecto: 3. Bloquea al usuario tras 3 sorteos ganados hasta las 00:00.
              </p>
            </div>
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
            disabled={savingGame || loadingGame}
            className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {savingGame ? 'Guardando en Base de Datos...' : 'Guardar Parámetros de Juego (6/3)'}
          </button>
        </form>
      </div>
    </div>
  );
}

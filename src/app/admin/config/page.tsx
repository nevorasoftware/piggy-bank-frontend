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
  Copy,
  Check,
  Globe,
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

  // Configuración de Correo Electrónico (Gmail API OAuth2 / SMTP)
  const [emailProvider, setEmailProvider] = useState<'GMAIL_API' | 'SMTP'>('GMAIL_API');
  const [smtpUser, setSmtpUser] = useState('piggybanksv@gmail.com');
  const [smtpPass, setSmtpPass] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [showClientSecret, setShowClientSecret] = useState(false);
  const [showRefreshToken, setShowRefreshToken] = useState(false);
  const [oauthCodeInput, setOauthCodeInput] = useState('');
  const [exchangingCode, setExchangingCode] = useState(false);
  const [generatingOAuthUrl, setGeneratingOAuthUrl] = useState(false);
  const [copiedUri, setCopiedUri] = useState(false);

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
        if (res.config.provider) setEmailProvider(res.config.provider);
        if (res.config.smtpUser) setSmtpUser(res.config.smtpUser);
        if (res.config.clientId) setClientId(res.config.clientId);
        if (res.config.clientSecret) {
          setClientSecret(res.config.clientSecret);
        } else if (res.config.maskedClientSecret) {
          setClientSecret(res.config.maskedClientSecret);
        }
        if (res.config.refreshToken) {
          setRefreshToken(res.config.refreshToken);
        } else if (res.config.maskedRefreshToken) {
          setRefreshToken(res.config.maskedRefreshToken);
        }
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
          provider: emailProvider,
          smtpUser: smtpUser.trim(),
          clientId: clientId.trim(),
          clientSecret: clientSecret.trim(),
          refreshToken: refreshToken.trim(),
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
          text: 'Configuración de correo (Gmail API / SMTP) guardada exitosamente en la base de datos.',
        });
      } else {
        setEmailMessage({ type: 'error', text: res.message || 'Error al guardar configuración de correo.' });
      }
    } catch (err: any) {
      setEmailMessage({ type: 'error', text: err.message || 'Error en la petición de guardado.' });
    } finally {
      setSavingEmail(false);
    }
  };

  const handleAuthorizeGoogle = async () => {
    if (!clientId.trim()) {
      setEmailMessage({ type: 'error', text: 'Por favor ingresa primero el Client ID de Google Cloud Console.' });
      return;
    }
    setGeneratingOAuthUrl(true);
    setEmailMessage(null);
    try {
      const res = await apiRequest(
        `/api/admin/email-config/oauth/url?redirectUri=${encodeURIComponent('https://developers.google.com/oauthplayground')}`
      );
      if (res.success && res.url) {
        window.open(res.url, '_blank');
        setEmailMessage({
          type: 'success',
          text: 'Se abrió la ventana de Google para autorizar. Inicia sesión con ' + smtpUser + ', autoriza y copia el código de autorización.',
        });
      } else {
        setEmailMessage({ type: 'error', text: res.message || 'Error al generar enlace de autorización.' });
      }
    } catch (err: any) {
      setEmailMessage({ type: 'error', text: err.message || 'Error al conectar con el servidor.' });
    } finally {
      setGeneratingOAuthUrl(false);
    }
  };

  const handleExchangeCode = async () => {
    if (!oauthCodeInput.trim()) {
      setEmailMessage({ type: 'error', text: 'Pega el código de autorización devuelto por Google.' });
      return;
    }
    setExchangingCode(true);
    setEmailMessage(null);
    try {
      const res = await apiRequest('/api/admin/email-config/oauth/exchange', {
        method: 'POST',
        body: JSON.stringify({
          code: oauthCodeInput.trim(),
          redirectUri: 'https://developers.google.com/oauthplayground',
        }),
      });

      if (res.success) {
        setEmailMessage({
          type: 'success',
          text: '¡Refresh Token de Google Cloud obtenido y guardado en la base de datos exitosamente!',
        });
        setOauthCodeInput('');
        loadAllConfigs();
      } else {
        setEmailMessage({ type: 'error', text: res.message || 'Error al canjear código por tokens.' });
      }
    } catch (err: any) {
      setEmailMessage({ type: 'error', text: err.message || 'Error al canjear código.' });
    } finally {
      setExchangingCode(false);
    }
  };

  const handleCopyUri = () => {
    navigator.clipboard.writeText('https://developers.google.com/oauthplayground');
    setCopiedUri(true);
    setTimeout(() => setCopiedUri(false), 2000);
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
          message: res.message || '¡Conexión exitosa! Correo de prueba enviado.',
        });
      } else {
        setEmailTestResult({
          success: false,
          message: res.message || 'Error al conectar con Gmail API.',
        });
      }
    } catch (err: any) {
      setEmailTestResult({
        success: false,
        message: err.message || 'Error de conexión con los servidores de Google.',
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

      {/* SECCIÓN 2: CONFIGURACIÓN DE CORREO ELECTRÓNICO (GOOGLE CLOUD CONSOLE / GMAIL API) */}
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
                  {emailProvider === 'GMAIL_API' ? 'Google Cloud Gmail API' : 'Gmail SMTP'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Envío de códigos OTP de 6 dígitos desde <strong className="text-amber-400">{smtpUser}</strong> a los jugadores registrados.
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

        {/* Selector de Método de Autenticación */}
        <div className="p-1.5 bg-slate-900 border border-white/10 rounded-2xl grid grid-cols-2 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setEmailProvider('GMAIL_API')}
            className={`py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
              emailProvider === 'GMAIL_API'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            Google Cloud Console (Gmail API OAuth2)
            <span className="text-[9px] bg-slate-950/30 px-1.5 py-0.5 rounded uppercase font-mono">Oficial</span>
          </button>
          <button
            type="button"
            onClick={() => setEmailProvider('SMTP')}
            className={`py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
              emailProvider === 'SMTP'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Key className="w-4 h-4" />
            Contraseña de Aplicación (SMTP)
          </button>
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
          {/* Correo Emisor Común */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                Correo Electrónico Emisor (Google)
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
                Cuenta de Google propietaria del proyecto de Google Cloud.
              </p>
            </div>

            <div>
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
              <p className="text-[11px] text-slate-500 mt-1">
                Nombre que aparecerá como remitente en la bandeja de entrada del usuario.
              </p>
            </div>
          </div>

          {/* VISTA 1: GOOGLE CLOUD CONSOLE (GMAIL API OAUTH2) */}
          {emailProvider === 'GMAIL_API' && (
            <div className="space-y-5 p-5 rounded-3xl bg-slate-900/60 border border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Globe className="w-4 h-4" />
                Credenciales OAuth 2.0 de Google Cloud Console
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Client ID */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Client ID de Google Cloud (ID de Cliente OAuth 2.0)
                  </label>
                  <input
                    type="text"
                    required={emailProvider === 'GMAIL_API'}
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    placeholder="ej: 1234567890-abcdefg.apps.googleusercontent.com"
                    className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-2xl text-white font-mono text-xs focus:outline-none focus:border-amber-400 shadow-inner"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Obtenido en: Google Cloud Console &gt; APIs y Servicios &gt; Credenciales.
                  </p>
                </div>

                {/* Client Secret */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Client Secret (Secreto de Cliente)
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowClientSecret(!showClientSecret)}
                      className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
                    >
                      {showClientSecret ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {showClientSecret ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>
                  <input
                    type={showClientSecret ? 'text' : 'password'}
                    required={emailProvider === 'GMAIL_API'}
                    value={clientSecret}
                    onChange={(e) => setClientSecret(e.target.value)}
                    placeholder="GOCSPX-xxxxxxxxxxxxxxxxxxxx"
                    className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-2xl text-white font-mono text-xs focus:outline-none focus:border-amber-400 shadow-inner"
                  />
                </div>

                {/* Refresh Token */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Refresh Token de Google OAuth2
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowRefreshToken(!showRefreshToken)}
                      className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
                    >
                      {showRefreshToken ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {showRefreshToken ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>
                  <input
                    type={showRefreshToken ? 'text' : 'password'}
                    value={refreshToken}
                    onChange={(e) => setRefreshToken(e.target.value)}
                    placeholder="1//04xxxxxxxxxxxxxxxxxxxxxxxx (Generado automáticamente)"
                    className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-2xl text-white font-mono text-xs focus:outline-none focus:border-amber-400 shadow-inner"
                  />
                </div>
              </div>

              {/* Asistente Rápido de Autorización y Generación de Refresh Token */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xs font-black text-amber-300 flex items-center gap-1.5 uppercase tracking-wide">
                      <Key className="w-4 h-4 text-amber-400" />
                      Asistente de Autorización Google OAuth2
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Autoriza tu cuenta <strong className="text-white">{smtpUser}</strong> para generar el Refresh Token permanente.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAuthorizeGoogle}
                    disabled={generatingOAuthUrl || !clientId.trim()}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {generatingOAuthUrl ? 'Cargando...' : '1. Abrir Autorización de Google'}
                  </button>
                </div>

                <div className="pt-2 border-t border-amber-500/15 flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="text"
                    value={oauthCodeInput}
                    onChange={(e) => setOauthCodeInput(e.target.value)}
                    placeholder="Pega aquí el código 'code=4/0A...' devuelto por Google"
                    className="w-full sm:flex-1 px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={handleExchangeCode}
                    disabled={exchangingCode || !oauthCodeInput.trim()}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-bold text-xs transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${exchangingCode ? 'animate-spin' : ''}`} />
                    {exchangingCode ? 'Canjeando...' : '2. Canjear por Refresh Token'}
                  </button>
                </div>
              </div>

              {/* Guía Paso a Paso para la Consola de Google Cloud */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <HelpCircle className="w-4 h-4" />
                  <span>Paso a Paso en Google Cloud Console para {smtpUser}:</span>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-[11px] text-slate-400 pl-1 leading-relaxed">
                  <li>
                    Entra a{' '}
                    <a
                      href="https://console.cloud.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 underline inline-flex items-center gap-0.5 font-mono"
                    >
                      console.cloud.google.com <ExternalLink className="w-2.5 h-2.5" />
                    </a>{' '}
                    con tu cuenta <strong className="text-white">{smtpUser}</strong> y crea un nuevo proyecto (ej: <strong>PiggyBank</strong>).
                  </li>
                  <li>
                    Ve a <strong>APIs y Servicios &gt; Biblioteca</strong>, busca <strong>Gmail API</strong> y haz clic en <strong>Habilitar</strong>.
                  </li>
                  <li>
                    Ve a <strong>Pantalla de consentimiento de OAuth</strong>:
                    <ul className="list-disc list-inside pl-4 mt-1 space-y-1 text-slate-400">
                      <li>Tipo de usuario: <strong>Externo</strong>.</li>
                      <li>Nombre de la app: <strong>PiggyBank</strong>, correo de soporte: <strong className="text-white">{smtpUser}</strong>.</li>
                      <li>En <strong>Usuarios de prueba</strong> (Test users), añade <strong className="text-white">{smtpUser}</strong>.</li>
                    </ul>
                  </li>
                  <li>
                    Ve a <strong>Credenciales &gt; Crear credenciales &gt; ID de cliente de OAuth</strong>:
                    <ul className="list-disc list-inside pl-4 mt-1 space-y-1 text-slate-400">
                      <li>Tipo de aplicación: <strong>Aplicación web</strong>.</li>
                      <li>
                        En <strong>URIs de redireccionamiento autorizados</strong>, agrega:
                        <div className="mt-1 flex items-center gap-2 bg-slate-950 p-2 rounded-lg font-mono text-[10px] text-amber-300 border border-white/5">
                          <span>https://developers.google.com/oauthplayground</span>
                          <button
                            type="button"
                            onClick={handleCopyUri}
                            className="text-slate-400 hover:text-white ml-auto"
                            title="Copiar URI"
                          >
                            {copiedUri ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>Copia el <strong>Client ID</strong> y <strong>Client Secret</strong> y pégalos arriba.</li>
                  <li>Usa el botón <strong>"1. Abrir Autorización de Google"</strong> y pega el código devuelto para obtener el Refresh Token.</li>
                </ol>
              </div>
            </div>
          )}

          {/* VISTA 2: CONTRASEÑA DE APLICACIÓN (SMTP) */}
          {emailProvider === 'SMTP' && (
            <div className="space-y-5 p-5 rounded-3xl bg-slate-900/60 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Token / Contraseña de Aplicación */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-amber-400" />
                      Contraseña de Aplicación de Google (16 letras)
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
                  <input
                    type={showEmailPass ? 'text' : 'password'}
                    required={emailProvider === 'SMTP'}
                    value={smtpPass}
                    onChange={(e) => setSmtpPass(e.target.value)}
                    placeholder="xxxx xxxx xxxx xxxx"
                    className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-2xl text-white font-mono text-sm tracking-wider focus:outline-none focus:border-amber-400 shadow-inner"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Generado en myaccount.google.com/apppasswords para {smtpUser}.
                  </p>
                </div>

                {/* Servidor Host */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-amber-400" />
                    Servidor SMTP Host
                  </label>
                  <input
                    type="text"
                    required={emailProvider === 'SMTP'}
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                    placeholder="smtp.gmail.com"
                    className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-2xl text-white font-mono text-sm focus:outline-none focus:border-amber-400 shadow-inner"
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
                      className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-2xl text-white font-mono text-sm focus:outline-none focus:border-amber-400 shadow-inner"
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
                          : 'bg-slate-950 border-white/10 text-slate-400'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {smtpSecure ? 'SSL Activo (465)' : 'TLS / STARTTLS'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Prueba de Envío en Tiempo Real */}
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

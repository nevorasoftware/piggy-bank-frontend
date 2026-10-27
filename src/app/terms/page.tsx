import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Scale,
  CreditCard,
  Trophy,
  AlertTriangle,
  HeartHandshake,
  Lock,
  Mail,
  ChevronRight,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';

export const metadata = {
  title: 'Términos y Condiciones | PiggyBank El Salvador',
  description:
    'Reglamento oficial, términos legales, medio de entrega de premios, límites diarios y políticas de juego responsable de PiggyBank El Salvador.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Botón Volver */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors glass-panel px-4 py-2 rounded-xl border border-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la Página Principal
        </Link>
      </div>

      {/* Cabecera Principal con Personaje El Banquero */}
      <div className="relative glass-panel rounded-3xl p-8 sm:p-12 border border-amber-500/30 overflow-hidden mb-12 shadow-2xl bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          {/* Avatar Banquero */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden ring-4 ring-amber-400/50 shadow-2xl shadow-amber-500/30 p-1 bg-gradient-to-tr from-amber-400 via-purple-500 to-yellow-300">
              <img
                src="/images/banquero.jpg"
                alt="El Banquero PiggyBank"
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>
            <span className="absolute -bottom-2 -right-2 px-2.5 py-1 text-[10px] font-black bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 rounded-lg shadow-md uppercase tracking-wider">
              El Banquero
            </span>
          </div>

          {/* Títulos */}
          <div className="text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-500/30 text-amber-300 text-xs font-bold mb-3 shadow-lg shadow-amber-500/10">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>Marco Legal y Normativa de Operación • El Salvador</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
              Términos y Condiciones <br />
              <span className="text-gold-gradient">del Servicio PiggyBank</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Consulta las reglas oficiales, medio de entrega de premios, requisitos de mayoría de edad (+18), límites diarios y compromisos de transparencia que rigen los sorteos comunitarios en El Salvador.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-slate-400 mt-4">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Última actualización reglamentaria: 27 de Octubre de 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas Destacadas de Requisitos Críticos (+18, DUI y Entrega) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="glass-panel p-6 rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-slate-900/60 to-slate-950 flex flex-col justify-between shadow-xl">
          <div className="flex items-start gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-white font-black text-sm">Mayoría de Edad (+18)</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Promoción y salas válidas únicamente para personas mayores de 18 años con cuenta activa y completamente verificada.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-slate-900/60 to-slate-950 flex flex-col justify-between shadow-xl">
          <div className="flex items-start gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-white font-black text-sm">Solo DUI Registrado</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            El participante debe residir en El Salvador y contar con DUI oficial auténtico. No se admiten documentos ajenos ni duplicados.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900/60 to-slate-950 flex flex-col justify-between shadow-xl">
          <div className="flex items-start gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-white font-black text-sm">Transferencia Directa</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Medio de Entrega: Transferencia bancaria a cuenta a nombre del titular del DUI registrado o entrega coordinada verificada.
          </p>
        </div>
      </div>

      {/* Contenido Legal Completo */}
      <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
        {/* Sección 1: Medio de Entrega y Verificación de Titularidad */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-slate-900 to-slate-950 shadow-xl">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30">
              1
            </span>
            Medio de Entrega y Titularidad de Cuenta
          </h2>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-4">
            <p className="text-amber-200 text-xs sm:text-sm font-bold leading-relaxed">
              <strong>Medio de Entrega Oficial:</strong> Transferencia bancaria directa a cuenta a nombre del titular del DUI registrado o entrega coordinada bajo verificación estricta de identidad.
            </p>
          </div>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Solo DUI Registrado:</strong> Por normativas bancarias y prevención de fraude en El Salvador, los fondos adjudicados se transferirán única y exclusivamente a cuentas bancarias cuyo titular coincida exactamente con el DUI registrado en la plataforma.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Verificación Previa:</strong> La cuenta del usuario deberá estar activa y completamente verificada antes de cursar cualquier desembolso o transferencia.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Comprobante Electrónico:</strong> Cada pago efectuado genera un recibo digital transaccional enviado al correo electrónico oficial del usuario y visible en su perfil de jugador.</span>
            </li>
          </ul>
        </section>

        {/* Sección 2: Límites Diarios (Participación y Victorias) */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30">
              2
            </span>
            Límites Diarios de Juego y Protección
          </h2>
          <p className="mb-4 text-xs sm:text-sm text-slate-300">
            En concordancia con los principios de equidad comunitaria y juego transparente, aplican las siguientes reglas por periodo de 24 horas (horario oficial de El Salvador):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Participación */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  PARTICIPACIÓN
                </span>
                <span className="text-xs font-bold text-white">Sin Límite Numérico</span>
              </div>
              <p className="text-xs text-slate-300">
                <strong>Participación:</strong> Los usuarios pueden adquirir pases y participar libremente en las diferentes salas activas disponibles, sin bloqueo por cantidad de salas simultáneas.
              </p>
            </div>

            {/* Victorias */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  LÍMITE DE VICTORIAS: SÍ
                </span>
                <span className="text-xs font-bold text-amber-300">Máx. 3 Premios / 24h</span>
              </div>
              <p className="text-xs text-slate-300">
                <strong>Límite Diario de Victorias:</strong> Máximo <strong>3 premios ganados</strong> por usuario cada 24 horas. Al alcanzar 3 premios en un mismo día, la cuenta no podrá acumular victorias adicionales hasta el reinicio diario (00:00 hora de El Salvador).
              </p>
            </div>
          </div>
        </section>

        {/* Sección 3: Restricciones Generales y Elegibilidad */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30">
              3
            </span>
            Restricciones Generales y Reglas por Cliente
          </h2>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Mayoría de edad (+18):</strong> Promoción válida únicamente para usuarios mayores de 18 años con plena capacidad civil en la República de El Salvador.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Cuenta activa y verificada:</strong> La cuenta del usuario deberá estar activa y debidamente verificada mediante código de confirmación y datos fidedignos.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Una cuenta por cliente / IP:</strong> Solo se permite una participación bajo esta modalidad por cliente, cuenta, familia, dirección residencial, ordenador compartido o dirección IP compartida.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Territorio:</strong> La promoción y participación aplica única y exclusivamente para usuarios que residan legalmente en el territorio de El Salvador.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Autoexclusión:</strong> El usuario no deberá estar inscrito en el Registro Corporativo de Autoexclusión ni presentar inhabilitación previa.</span>
            </li>
          </ul>
        </section>

        {/* Sección 4: Modificación, Suspensión y Anulación */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30">
              4
            </span>
            Modificación, Suspensión y Prevención de Abusos
          </h2>
          <p className="mb-3">
            PiggyBank se reserva el derecho de modificar, suspender o cancelar cualquier promoción o sala, así como sus términos y condiciones, en cualquier momento y por razones fundadas de seguridad o detección de abuso:
          </p>
          <ul className="space-y-3 pl-2 mb-4">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Protección a participantes activos:</strong> Las modificaciones no afectarán a los usuarios que ya hayan comenzado a participar en una sala antes de la fecha de actualización, salvo que el cambio sea exigido por motivos regulatorios o legales.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Revisión periódica:</strong> Es responsabilidad del usuario revisar periódicamente los Términos y Condiciones para mantenerse informado sobre posibles actualizaciones.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Detección de manipulación o juego irregular:</strong> En caso de sospecha fundada de manipulación, uso de scripts no autorizados, colusión o juego irregular, la entrega de fondos podrá quedar sujeta a control previo y auditoría.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Facultad de retención:</strong> PiggyBank se reserva el derecho de retener o anular cualquier acreditación derivada de prácticas fraudulentas o contrarias a este reglamento.</span>
            </li>
          </ul>
        </section>

        {/* Sección 5: Transparencia Algorítmica y Pagos Bancarios */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30">
              5
            </span>
            Seguridad Bancaria y Pasarela Wompi
          </h2>
          <p className="mb-3">
            Todas las compras de pases se procesan mediante la pasarela bancaria autorizada <strong>Wompi El Salvador</strong> (Banco Agrícola / Bancolombia), bajo protocolos 3D Secure, Visa Secure, Mastercard Identity Check y estándares internacionales PCI DSS.
          </p>
          <p className="text-xs text-slate-400">
            PiggyBank nunca almacena información confidencial de tarjetas de crédito o débito (números completos ni códigos CVV).
          </p>
        </section>

        {/* Sección 6: Atención y Soporte */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30">
              6
            </span>
            Atención al Cliente y Soporte Oficial
          </h2>
          <p className="mb-4">
            Para dudas sobre acreditación bancaria, verificación de DUI o aclaración de sorteos:
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:piggybanksv@gmail.com"
              className="inline-flex items-center gap-2 p-3.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-bold text-slate-200 hover:border-amber-400/50 hover:text-amber-400 transition-all"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              piggybanksv@gmail.com
            </a>
            <div className="inline-flex items-center gap-2 p-3.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-bold text-slate-300">
              <span>📍 San Salvador, República de El Salvador</span>
            </div>
          </div>
        </section>
      </div>

      {/* Botón Inferior de Volver */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-105 transition-all"
        >
          Entendido, Volver al Lobby de Juegos
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

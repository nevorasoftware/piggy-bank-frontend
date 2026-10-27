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
} from 'lucide-react';

export const metadata = {
  title: 'Términos y Condiciones | PiggyBank El Salvador',
  description:
    'Reglamento oficial, términos legales, políticas de juego responsable y condiciones de participación para salas de sorteos en línea de PiggyBank El Salvador.',
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

      {/* Cabecera Principal */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-500/30 text-amber-300 text-xs font-bold mb-4 shadow-lg shadow-amber-500/10">
          <Scale className="w-4 h-4 text-amber-400" />
          <span>Marco Legal y Normativa de Operación • El Salvador</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Términos y Condiciones <br />
          <span className="text-gold-gradient">del Servicio PiggyBank</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Lee detenidamente las condiciones de uso, reglas de sorteos, transparencia de premios y compromisos de juego responsable que rigen nuestra plataforma digital en la República de El Salvador.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-4">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Última actualización: 27 de Octubre de 2026</span>
        </div>
      </div>

      {/* Tarjeta Destacada de Requisitos Críticos (+18 y DUI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900/60 to-slate-950 flex items-start gap-4 shadow-xl">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white font-black text-base mb-1">Mayoría de Edad Obligatoria (+18)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              El acceso y la compra de boletos están estrictamente reservados para personas mayores de dieciocho (18) años con plena capacidad jurídica en El Salvador.
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-slate-900/60 to-slate-950 flex items-start gap-4 shadow-xl">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white font-black text-base mb-1">Identidad Verificada con DUI</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Todo usuario debe registrar un Documento Único de Identidad (DUI) auténtico para participar y para la acreditación bancaria directa de cualquier premio en efectivo.
            </p>
          </div>
        </div>
      </div>

      {/* Contenido Legal Completo */}
      <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
        {/* Sección 1 */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30">
              1
            </span>
            Aceptación de los Términos y Titularidad
          </h2>
          <p className="mb-3">
            Al registrarse, navegar o participar en cualquier sala de sorteos en <strong>PiggyBank El Salvador</strong> (en adelante, «la Plataforma»), el usuario declara haber leído, comprendido y aceptado en su totalidad los presentes Términos y Condiciones.
          </p>
          <p>
            Si el usuario no está de acuerdo con cualquiera de estas disposiciones, deberá abstenerse de utilizar los servicios, comprar pases o realizar transacciones en la plataforma.
          </p>
        </section>

        {/* Sección 2 */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30">
              2
            </span>
            Elegibilidad, Registro y Seguridad de la Cuenta
          </h2>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Exclusividad de edad:</strong> Prohibida terminantemente la participación de menores de edad. Cualquier cuenta creada por un menor será clausurada de inmediato sin derecho a reclamo de premios.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Cuenta única por persona:</strong> Cada usuario solo podrá registrar una (1) cuenta asociada a su número de DUI y correo electrónico. Se prohíben cuentas duplicadas, falsas o de terceros.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Seguridad de credenciales:</strong> El usuario es el único responsable de la custodia de su contraseña. La plataforma incluye recuperación segura mediante código OTP enviado al correo verificado.</span>
            </li>
          </ul>
        </section>

        {/* Sección 3 */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30">
              3
            </span>
            Mecánica de las Salas de Sorteo y Asignación de Pases
          </h2>
          <p className="mb-3">
            Las salas de sorteo representan eventos independientes con parámetros predefinidos y transparentes:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
              <p className="text-xs font-bold text-amber-400 mb-1">Precio del Pase</p>
              <p className="text-xs text-slate-300">Expresado en Dólares de los Estados Unidos de América (USD), moneda de curso legal en El Salvador.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
              <p className="text-xs font-bold text-amber-400 mb-1">Número de Boleto Único</p>
              <p className="text-xs text-slate-300">Cada compra confirmada genera un número correlativo o asignado que identifica el pase del jugador.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
              <p className="text-xs font-bold text-amber-400 mb-1">Capacidad Máxima de la Sala</p>
              <p className="text-xs text-slate-300">Cada sala tiene un límite de participantes especificado previamente en su tarjeta de presentación.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
              <p className="text-xs font-bold text-amber-400 mb-1">Temporizador de Sorteo</p>
              <p className="text-xs text-slate-300">El sorteo se ejecuta en vivo al finalizar la cuenta regresiva o completarse los cupos establecidos.</p>
            </div>
          </div>
        </section>

        {/* Sección 4 */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30">
              4
            </span>
            Transparencia Algorítmica y Selección de Ganadores
          </h2>
          <p className="mb-3">
            La determinación del boleto ganador se ejecuta mediante un generador pseudoaleatorio criptográfico (CSPRNG) que garantiza imparcialidad absoluta y descarta cualquier intervención humana:
          </p>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2.5">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Todos los boletos debidamente confirmados y pagados tienen exactamente la misma probabilidad matemática de resultar premiados.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>El resultado se transmite en tiempo real vía WebSockets a todos los dispositivos conectados simultáneamente en la sala.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>El usuario ganador recibe una notificación inmediata en pantalla y un correo electrónico formal certificando su victoria.</span>
            </li>
          </ul>
        </section>

        {/* Sección 5 */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30">
              5
            </span>
            Transacciones, Métodos de Pago y Seguridad Bancaria
          </h2>
          <p className="mb-3">
            Las compras se efectúan mediante la pasarela de pagos autorizada <strong>Wompi El Salvador</strong> (Banco Agrícola / Bancolombia):
          </p>
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/20 mb-3 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Lock className="w-4 h-4" />
              <span>Estándar Internacional PCI-DSS y 3D Secure</span>
            </div>
            <p className="text-xs text-slate-300">
              PiggyBank <strong>nunca almacena números completos de tarjeta de crédito, débito ni códigos CVV</strong>. Todas las transacciones se autentican con los protocolos de seguridad de tu banco emisor (Visa Secure y Mastercard Identity Check).
            </p>
          </div>
          <p className="text-xs text-slate-400">
            <strong>Política de Reembolsos:</strong> La compra de un pase es definitiva una vez procesada la transacción bancaria y asignado el boleto. En caso de suspensión o cancelación técnica de una sala antes de su ejecución, los fondos serán restituidos al participante.
          </p>
        </section>

        {/* Sección 6 */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30">
              6
            </span>
            Acreditación y Entrega de Premios en Efectivo
          </h2>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Monto del Premio:</strong> Corresponde al valor neto en USD estipulado en la sala correspondiente.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Medio de Entrega:</strong> Transferencia bancaria directa a cuenta a nombre del titular del DUI registrado o entrega coordinada bajo verificación de identidad.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Comprobante de Pago:</strong> Tras realizar la transferencia bancaria, el estado del boleto pasa a «Pagado» y se remite al ganador el respectivo correo de confirmación de pago.</span>
            </li>
          </ul>
        </section>

        {/* Sección 7 */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-amber-500/5">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <HeartHandshake className="w-6 h-6 text-amber-400" />
            Política de Juego Responsable y Protección al Consumidor
          </h2>
          <p className="mb-3">
            PiggyBank promueve el juego como una actividad recreativa y de entretenimiento sano. Para prevenir hábitos de juego excesivo, el sistema impone reglas automáticas inviolables:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/20">
              <p className="text-xs font-black text-amber-400 uppercase tracking-wider mb-1">Límite Diario de Participación</p>
              <p className="text-xs text-slate-300">Máximo <strong>6 participaciones</strong> por usuario cada 24 horas.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/20">
              <p className="text-xs font-black text-amber-400 uppercase tracking-wider mb-1">Límite Diario de Victorias</p>
              <p className="text-xs text-slate-300">Máximo <strong>3 premios ganados</strong> por usuario cada 24 horas.</p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Si sientes que el juego está afectando tu bienestar o el de tu familia, puedes solicitar la autoexclusión temporal o definitiva de tu cuenta comunicándote con nuestro equipo de soporte.
          </p>
        </section>

        {/* Sección 8 */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30">
              8
            </span>
            Protección de Datos y Confidencialidad
          </h2>
          <p className="mb-2">
            La información suministrada por los usuarios (nombres, correo electrónico, teléfono, DUI) será utilizada únicamente para:
          </p>
          <ul className="list-disc list-inside text-xs space-y-1 text-slate-400 pl-2 mb-3">
            <li>La verificación de identidad obligatoria.</li>
            <li>El procesamiento de pases y confirmación de transacciones.</li>
            <li>La acreditación y pago de premios al ganador legítimo.</li>
            <li>El envío de avisos de seguridad y recuperación de contraseña.</li>
          </ul>
          <p className="text-xs text-slate-400">
            PiggyBank no comercializa ni comparte la información privada de sus clientes con terceros sin previo consentimiento expreso.
          </p>
        </section>

        {/* Sección 9 */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30">
              9
            </span>
            Atención al Cliente, Soporte y Contacto Oficial
          </h2>
          <p className="mb-4">
            Para cualquier duda, aclaración, validación de sorteos o solicitud de asistencia técnica, nuestro equipo de soporte oficial está disponible en:
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
          Entendido, Volver al Inicio
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

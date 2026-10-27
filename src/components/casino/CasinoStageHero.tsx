'use client';

import { Sparkles, Zap, Trophy, ShieldCheck, ArrowRight } from 'lucide-react';
import JackpotHeader from './JackpotHeader';
import ArcadeControlHUD from './ArcadeControlHUD';
import { playCoinSound } from '@/lib/sound';

interface CasinoStageHeroProps {
  userBalance?: number;
}

export default function CasinoStageHero({ userBalance = 0 }: CasinoStageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-4 pb-12 bg-gradient-to-b from-[#13072e] via-[#090b1c] to-[#070A12] border-b border-white/10 select-none">
      {/* Luces y resplandores neón de fondo */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[350px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-[450px] h-[350px] bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* ======================================================== */}
        {/* 1. BARRA DE LOS 3 JACKPOTS (MAJOR, GRAND, MINOR) */}
        {/* ======================================================== */}
        <JackpotHeader
          grandAmount={17589.77}
          majorAmount={7819.84}
          minorAmount={906.55}
        />

        {/* ======================================================== */}
        {/* 2. ESCENARIO CENTRAL DEL CASINO: EL REY PIGGY EN LA MONTAÑA DE ORO */}
        {/* ======================================================== */}
        <div className="relative mt-4 mb-6 flex flex-col items-center justify-center">
          {/* Fila de Personajes y Altar de Oro */}
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-center">
            
            {/* Personaje Izquierdo: EL BANQUERO */}
            <div className="hidden md:flex md:col-span-3 flex-col items-center text-center">
              <div className="relative w-36 h-48 lg:w-44 lg:h-56 rounded-3xl overflow-hidden border-2 border-amber-400/50 shadow-xl shadow-purple-950/60 bg-slate-950 group hover:scale-105 transition-transform">
                <img
                  src="/images/banquero.jpg"
                  alt="El Banquero PiggyBank"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                    🎩 El Banquero
                  </span>
                  <p className="text-[9px] text-slate-300 leading-tight">Garantía de Pagos</p>
                </div>
              </div>
            </div>

            {/* CENTRO: REY PIGGY EN SU MONTAÑA DE MONEDAS DE ORO */}
            <div className="md:col-span-6 flex flex-col items-center text-center relative">
              {/* Badges Flotantes de Jugadores / Apuestas alrededor del Cerdito */}
              <div className="absolute -top-3 left-4 sm:left-12 z-20 px-3 py-1 rounded-full bg-emerald-500/90 text-slate-950 font-black text-[11px] border-2 border-emerald-300 shadow-lg shadow-emerald-500/30 animate-bounce-soft flex items-center gap-1">
                <span>🟢</span> +$1.50 USD
              </div>
              <div className="absolute top-8 right-2 sm:right-10 z-20 px-3 py-1 rounded-full bg-amber-400/95 text-slate-950 font-black text-[11px] border-2 border-yellow-200 shadow-lg shadow-amber-500/40 animate-pulse flex items-center gap-1">
                <span>🔥</span> ¡Sorteo Activo!
              </div>

              {/* Contenedor del Cerdito con Montaña de Monedas */}
              <div className="relative w-64 sm:w-72 lg:w-80 h-64 sm:h-72 lg:h-80 flex items-center justify-center">
                {/* Aura giratoria */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/30 via-purple-500/30 to-pink-500/20 blur-2xl animate-pulse" />

                {/* El Rey Piggy Logo Oficial */}
                <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full p-2 bg-gradient-to-tr from-amber-400 via-purple-600 to-yellow-300 shadow-2xl shadow-amber-500/50 hover:scale-105 transition-transform duration-500 group">
                  <img
                    src="/images/piggy-logo.jpg"
                    alt="Rey Piggy Casino"
                    className="w-full h-full object-cover rounded-full group-hover:rotate-3 transition-transform"
                  />
                  {/* Destellos de moneda */}
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-300 to-amber-500 border-2 border-white shadow-lg flex items-center justify-center font-black text-slate-950 text-xl font-mono animate-bounce">
                    $
                  </div>
                </div>
              </div>

              {/* Botón Central de Giros / Sorteos Activos (Estilo Piggy Tap con Rayo) */}
              <div className="relative z-20 -mt-6 sm:-mt-8 flex flex-col items-center">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-300 bg-slate-950/80 px-4 py-1 rounded-full border border-amber-400/40 shadow-md mb-2">
                  ⚡ GIROS GRATIS Y SORTEOS EN VIVO ⚡
                </span>

                <a
                  href="#salas"
                  onClick={playCoinSound}
                  className="relative group px-6 sm:px-8 py-3.5 sm:py-4 rounded-3xl bg-gradient-to-b from-[#A855F7] via-[#9333EA] to-[#7E22CE] border-b-4 border-[#581C87] text-white font-black text-sm sm:text-base tracking-wider uppercase shadow-2xl shadow-purple-600/50 hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-3"
                >
                  {/* Etiqueta lateral COMPRAR */}
                  <span className="absolute -top-3 -right-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md transform rotate-6">
                    COMPRAR
                  </span>

                  <div className="w-8 h-8 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner">
                    <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                  </div>
                  <span>Entrar al Lobby de Salas</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Personaje Derecho: LA ANFITRIONA ¡PREMIO! */}
            <div className="hidden md:flex md:col-span-3 flex-col items-center text-center">
              <div className="relative w-36 h-48 lg:w-44 lg:h-56 rounded-3xl overflow-hidden border-2 border-amber-400/50 shadow-xl shadow-purple-950/60 bg-slate-950 group hover:scale-105 transition-transform">
                <img
                  src="/images/premios-host.jpg"
                  alt="Anfitriona Oficial de Premios"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                    🎟️ ¡Premio!
                  </span>
                  <p className="text-[9px] text-slate-300 leading-tight">Hostess Oficial</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. CONSOLA ARCADE DE CONTROLES INFERIOR (HUD PIGGY TAP) */}
        {/* ======================================================== */}
        <ArcadeControlHUD
          balance={userBalance}
          lastWin={150.00}
          ticketValue={1.00}
          playButtonText="¡JUGAR AHORA!"
        />

        {/* Banner de Garantía y Reglas Clave */}
        <div className="mt-4 pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-300 font-semibold border-t border-white/5">
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" /> Transferencia a Cuenta con DUI
          </span>
          <span className="inline-flex items-center gap-1.5 text-amber-300">
            <Trophy className="w-4 h-4" /> Límite de Victoria: Máx. 3 / 24h
          </span>
          <span className="inline-flex items-center gap-1.5 text-purple-300">
            <Sparkles className="w-4 h-4" /> Pasarela Wompi Visa / Mastercard
          </span>
          <span className="inline-flex items-center gap-1.5 text-sky-300">
            🔞 Solo Mayores de 18 Años (El Salvador)
          </span>
        </div>
      </div>
    </section>
  );
}

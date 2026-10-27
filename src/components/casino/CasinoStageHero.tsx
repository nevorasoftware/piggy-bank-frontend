'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Trophy, ShieldCheck, ArrowRight, Flame } from 'lucide-react';
import JackpotHeader from './JackpotHeader';
import ArcadeControlHUD from './ArcadeControlHUD';
import { playCoinSound, playClickSound, playWinSound } from '@/lib/sound';

interface CasinoStageHeroProps {
  userBalance?: number;
}

export default function CasinoStageHero({ userBalance = 0 }: CasinoStageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-4 pb-14 bg-gradient-to-b from-[#1e073c] via-[#0b0c26] to-[#070A12] border-b border-white/10 select-none">
      {/* ======================================================== */}
      {/* 1. LUCES DE AMBIENTE VIBRANTES Y ULTRA COLORIDAS (CASINO FIESTA) */}
      {/* ======================================================== */}
      <div className="absolute -top-10 left-10 w-[600px] h-[450px] bg-gradient-to-tr from-pink-600/40 via-purple-600/35 to-indigo-600/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[550px] h-[450px] bg-gradient-to-bl from-yellow-400/40 via-amber-500/30 to-rose-500/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-r from-cyan-400/25 via-fuchsia-600/30 to-lime-400/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-amber-500/15 via-purple-600/10 to-transparent pointer-events-none" />

      {/* Partículas decorativas flotantes en el fondo (Gemas, Monedas, Confeti) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute top-12 left-[8%] text-3xl opacity-70 animate-bounce-soft" style={{ animationDelay: '0.1s' }}>💎</span>
        <span className="absolute top-24 right-[10%] text-3xl opacity-70 animate-bounce-soft" style={{ animationDelay: '1.2s' }}>🍀</span>
        <span className="absolute bottom-32 left-[12%] text-2xl opacity-60 animate-bounce-soft" style={{ animationDelay: '2.1s' }}>⭐</span>
        <span className="absolute bottom-40 right-[15%] text-2xl opacity-60 animate-bounce-soft" style={{ animationDelay: '0.8s' }}>🪙</span>
        <span className="absolute top-40 left-[3%] text-2xl opacity-50 animate-pulse">👑</span>
        <span className="absolute top-32 right-[4%] text-2xl opacity-50 animate-pulse">🎉</span>
        <span className="absolute bottom-20 left-[25%] text-xl opacity-40 animate-bounce-soft" style={{ animationDelay: '1.5s' }}>🍒</span>
        <span className="absolute bottom-24 right-[28%] text-xl opacity-40 animate-bounce-soft" style={{ animationDelay: '0.4s' }}>💰</span>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        {/* ======================================================== */}
        {/* 2. BARRA DE LOS 3 JACKPOTS EN VIVO CON MÁS COLOR */}
        {/* ======================================================== */}
        <JackpotHeader
          grandAmount={17589.77}
          majorAmount={7819.84}
          minorAmount={906.55}
        />

        {/* ======================================================== */}
        {/* 3. ESCENARIO CENTRAL GAMING: BANQUERO + REY PIGGY + LA MODELO */}
        {/* ======================================================== */}
        <div className="relative mt-2 mb-6 flex flex-col items-center justify-center">
          
          <div className="w-full max-w-5xl grid grid-cols-12 gap-1.5 sm:gap-4 lg:gap-8 items-center justify-items-center">
            
            {/* ======================================================== */}
            {/* PERSONAJE IZQUIERDO: EL BANQUERO (ANIMADO, VISIBLE EN MÓVIL Y DESKTOP) */}
            {/* ======================================================== */}
            <div className="col-span-3 sm:col-span-3 flex flex-col items-center text-center">
              <motion.div
                animate={{
                  y: [-6, 6, -6],
                  rotate: [0, -1.5, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="relative group cursor-pointer"
                onClick={() => {
                  playCoinSound();
                }}
              >
                {/* Resplandor Neón Púrpura y Oro */}
                <div className="absolute -inset-1 sm:-inset-2 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-amber-400 opacity-80 blur-md sm:blur-lg group-hover:opacity-100 transition-opacity" />

                {/* Tarjeta del Banquero */}
                <div className="relative w-20 h-28 sm:w-36 sm:h-48 lg:w-48 lg:h-64 rounded-2xl sm:rounded-3xl overflow-hidden border sm:border-2 border-purple-400 shadow-2xl bg-slate-950">
                  <img
                    src="/images/banquero.jpg"
                    alt="El Banquero PiggyBank"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Billetes flotando alrededor del banquero */}
                  <div className="absolute top-1 left-1 sm:top-2 sm:left-2 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/90 text-slate-950 text-[8px] sm:text-[10px] font-black shadow-md flex items-center gap-0.5 sm:gap-1">
                    <span>💵</span>
                    <span className="hidden sm:inline">$100s</span>
                  </div>

                  {/* Overlay Inferior */}
                  <div className="absolute bottom-0 inset-x-0 p-1.5 sm:p-3 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent">
                    <span className="px-1 sm:px-2 py-0.5 rounded text-[7px] sm:text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-purple-400 to-indigo-400 text-slate-950 inline-block mb-0.5 shadow-sm">
                      🎩 BANQUERO
                    </span>
                    <h4 className="text-[9px] sm:text-xs font-black text-white hidden sm:block">Garantía Bancaria</h4>
                    <p className="text-[8px] sm:text-[10px] text-amber-300 font-bold hidden sm:block">Transferencias DUI</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ======================================================== */}
            {/* CENTRO: EL REY PIGGY ANIMADO (CASCADA DE MONEDAS Y ANILLO NEÓN) */}
            {/* ======================================================== */}
            <div className="col-span-6 sm:col-span-6 flex flex-col items-center text-center relative">
              
              {/* Badges Flotantes de Jugadores / Apuestas alrededor del Cerdito */}
              <motion.div
                animate={{ y: [-4, 4, -4], x: [-2, 2, -2] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 left-1 sm:left-6 z-30 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 font-black text-[9px] sm:text-[11px] border sm:border-2 border-white shadow-xl shadow-emerald-500/40 flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>+$1.50</span>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4], x: [2, -2, 2] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-6 right-1 sm:right-6 z-30 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-[9px] sm:text-[11px] border sm:border-2 border-white shadow-xl shadow-amber-500/50 flex items-center gap-1"
              >
                <span>🔥</span>
                <span className="hidden sm:inline">¡Sorteo Activo!</span>
                <span className="sm:hidden">En Vivo</span>
              </motion.div>

              {/* Cascada de Monedas de Oro cayendo en animación continua */}
              <div className="absolute -top-6 sm:-top-8 w-40 sm:w-48 h-32 sm:h-36 pointer-events-none overflow-hidden z-25">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -20, opacity: 0, scale: 0.6 }}
                    animate={{
                      y: [-10, 110],
                      x: [(i - 2.5) * 14, (i - 2.5) * 22 + (i % 2 === 0 ? 10 : -10)],
                      opacity: [0, 1, 1, 0],
                      rotateZ: [0, 180, 360],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.25,
                      ease: 'easeInOut',
                    }}
                    className="absolute left-1/2 -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-600 border border-yellow-100 shadow-lg shadow-amber-500/60 flex items-center justify-center text-[9px] sm:text-[10px] font-black text-amber-950"
                  >
                    $
                  </motion.div>
                ))}
              </div>

              {/* Contenedor del Cerdito con Montaña de Monedas y Anillo Neón 360° */}
              <div className="relative w-40 h-40 sm:w-72 sm:h-72 lg:w-92 lg:h-92 flex items-center justify-center">
                {/* Aura Neón Multicolor Giratoria Continua */}
                <div className="absolute w-36 h-36 sm:w-60 sm:h-60 lg:w-76 lg:h-76 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 via-purple-600 to-cyan-400 opacity-80 blur-xl sm:blur-2xl animate-spin-slow pointer-events-none" />

                {/* El Rey Piggy con Animación de Flotación Suave (Framer Motion) */}
                <motion.div
                  animate={{
                    y: [-7, 7, -7],
                    rotate: [-1.5, 1.5, -1.5],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => playCoinSound()}
                  className="relative z-20 w-36 h-36 sm:w-56 sm:h-56 lg:w-68 lg:h-68 rounded-full p-2 sm:p-2.5 bg-gradient-to-tr from-amber-300 via-yellow-400 via-pink-500 to-purple-600 shadow-2xl shadow-amber-500/70 cursor-pointer group"
                  style={{
                    boxShadow: '0 0 50px rgba(250, 204, 21, 0.75), 0 0 90px rgba(236, 72, 153, 0.45)',
                  }}
                >
                  <img
                    src="/images/piggy-logo.jpg"
                    alt="Rey Piggy Casino"
                    className="w-full h-full object-cover rounded-full select-none group-hover:rotate-2 transition-transform duration-300"
                  />

                  {/* Moneda Gigante de Oro con Destello y Rebote */}
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-9 h-9 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-yellow-300 via-amber-400 to-amber-600 border sm:border-2 border-white shadow-2xl flex items-center justify-center font-black text-slate-950 text-base sm:text-2xl font-mono"
                  >
                    $
                  </motion.div>
                </motion.div>
              </div>

              {/* Botón Central Neón de Giros / Sorteos Activos (Piggy Tap Style) */}
              <div className="relative z-30 -mt-3 sm:-mt-8 flex flex-col items-center">
                <span className="text-[8px] sm:text-xs font-black uppercase tracking-widest text-yellow-300 bg-slate-950/90 px-2.5 sm:px-4 py-0.5 sm:py-1 rounded-full border border-amber-400 shadow-lg mb-1.5 sm:mb-2 flex items-center gap-1 sm:gap-1.5">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>⚡ GIROS GRATIS Y SORTEOS ⚡</span>
                </span>

                <a
                  href="#salas"
                  onClick={playCoinSound}
                  className="relative group px-5 sm:px-10 py-2.5 sm:py-4 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#C084FC] via-[#A855F7] to-[#7E22CE] border-b-2 sm:border-b-4 border-[#581C87] text-white font-black text-xs sm:text-base tracking-wider uppercase shadow-2xl shadow-purple-600/60 hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2 sm:gap-3"
                >
                  {/* Etiqueta COMPRAR con destello */}
                  <span className="absolute -top-2.5 -right-1 sm:-top-3 sm:-right-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 text-slate-950 text-[8px] sm:text-[10px] font-black uppercase tracking-wider shadow-lg transform rotate-6 border border-white">
                    COMPRAR
                  </span>

                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
                    <Zap className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-yellow-300 fill-yellow-300" />
                  </div>
                  <span className="hidden sm:inline">Entrar al Lobby de Salas</span>
                  <span className="sm:hidden">Entrar a Salas</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:translate-x-1.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* ======================================================== */}
            {/* PERSONAJE DERECHO: LA MODELO (ANFITRIONA ¡PREMIO! ANIMADA) */}
            {/* ======================================================== */}
            <div className="col-span-3 sm:col-span-3 flex flex-col items-center text-center">
              <motion.div
                animate={{
                  y: [-7, 7, -7],
                  rotate: [0, 1.8, 0],
                }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="relative group cursor-pointer"
                onClick={() => {
                  playWinSound();
                }}
              >
                {/* Resplandor Neón Rosa y Dorado Shifting */}
                <div className="absolute -inset-1 sm:-inset-2 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 opacity-80 blur-md sm:blur-lg group-hover:opacity-100 transition-opacity animate-neon-shift" />

                {/* Destellos flotantes de fuegos artificiales y confeti alrededor de la modelo */}
                <motion.span
                  animate={{ y: [-5, -35], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  className="absolute -top-3 right-0 sm:-top-4 sm:right-1 text-sm sm:text-xl z-20 pointer-events-none"
                >
                  ✨
                </motion.span>
                <motion.span
                  animate={{ y: [-5, -40], opacity: [0, 1, 0], scale: [0.8, 1.3, 0.4] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: 1 }}
                  className="absolute top-6 -left-2 sm:top-10 sm:-left-3 text-sm sm:text-xl z-20 pointer-events-none"
                >
                  🎉
                </motion.span>
                <motion.span
                  animate={{ y: [-5, -30], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 1.5 }}
                  className="absolute bottom-10 -right-2 sm:bottom-16 sm:-right-2 text-sm sm:text-xl z-20 pointer-events-none"
                >
                  🎟️
                </motion.span>

                {/* Tarjeta de la Modelo */}
                <div className="relative w-20 h-28 sm:w-36 sm:h-48 lg:w-48 lg:h-64 rounded-2xl sm:rounded-3xl overflow-hidden border sm:border-2 border-pink-400 shadow-2xl bg-slate-950">
                  <img
                    src="/images/premios-host.jpg"
                    alt="Anfitriona Oficial de Premios"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge animado de la presentadora */}
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 px-1.5 sm:px-2 py-0.5 rounded-full bg-pink-500/90 text-white text-[8px] sm:text-[10px] font-black shadow-md flex items-center gap-0.5 sm:gap-1">
                    <span>👑</span>
                    <span className="hidden sm:inline">¡PREMIO!</span>
                  </div>

                  {/* Overlay Inferior */}
                  <div className="absolute bottom-0 inset-x-0 p-1.5 sm:p-3 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent">
                    <span className="px-1 sm:px-2 py-0.5 rounded text-[7px] sm:text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 text-slate-950 inline-block mb-0.5 shadow-sm">
                      🎟️ LA MODELO
                    </span>
                    <h4 className="text-[9px] sm:text-xs font-black text-white hidden sm:block">Anfitriona Oficial</h4>
                    <p className="text-[8px] sm:text-[10px] text-pink-300 font-bold hidden sm:block">Ruleta y Sorteos</p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. CONSOLA ARCADE DE CONTROLES INFERIOR (HUD PIGGY TAP) */}
        {/* ======================================================== */}
        <ArcadeControlHUD
          balance={userBalance}
          lastWin={150.00}
          ticketValue={1.00}
          playButtonText="¡JUGAR AHORA!"
        />

        {/* ======================================================== */}
        {/* 5. BANNER DE GARANTÍA Y REGLAS CON MÁS COLOR */}
        {/* ======================================================== */}
        <div className="mt-4 pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-200 font-bold border-t border-white/10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Transferencia a Cuenta con DUI
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm">
            <Trophy className="w-4 h-4 text-amber-400" /> Límite de Victoria: Máx. 3 / 24h
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-400" /> Pasarela Wompi Visa / Mastercard
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm">
            🔞 Solo Mayores de 18 Años (El Salvador)
          </span>
        </div>
      </div>
    </section>
  );
}

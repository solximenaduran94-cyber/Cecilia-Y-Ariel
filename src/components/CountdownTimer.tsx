import React, { useState, useEffect } from 'react';
import { OliveBranch, BotanicalCorner } from './BotanicalDecorations';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      // Target: 20 November 2026 at 20:00:00 (ceremony start)
      const targetDate = new Date(2026, 10, 20, 20, 0, 0);

      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'DÍAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MINUTOS', value: timeLeft.minutes },
    { label: 'SEGUNDOS', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-xl mx-auto my-8 px-4" id="cuenta-regresiva">
      <div className="relative p-6 sm:p-8 rounded-3xl eucalyptus-card overflow-hidden">
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="bottom-right" />

        {/* Luminous warm accents in #293725 and #B89A58 */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#293725]/35 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#B89A58]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <OliveBranch size={18} glow />
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-[#B89A58] uppercase font-semibold">
              Cuenta Regresiva
            </p>
            <div className="scale-x-[-1]">
              <OliveBranch size={18} glow />
            </div>
          </div>

          <h3 className="font-cinzel text-xl sm:text-2xl text-[#FAF8F3] font-bold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Cada segundo nos acerca a nuestro sueño
          </h3>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {timeBlocks.map((block) => (
              <div
                key={block.label}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#182317]/55 backdrop-blur-md border border-[#6F7A69]/35 shadow-inner group hover:border-[#B89A58]/60 transition-all duration-300"
              >
                <span className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-black text-[#FAF8F3] tabular-nums leading-none tracking-tight">
                  {String(block.value).padStart(2, '0')}
                </span>
                <span className="mt-2 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#D1CAC3] font-cinzel">
                  {block.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs sm:text-sm text-[#F3EEE5] font-body italic font-medium">
            {timeLeft.isPast
              ? '¡El gran día ha llegado! ¡Gracias por acompañarnos!'
              : 'Viernes 20 de Noviembre de 2026 · 20:00 hs'}
          </p>
        </div>
      </div>
    </div>
  );
};

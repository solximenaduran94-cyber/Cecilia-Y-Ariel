import React from 'react';
import { Church, GlassWater, Sparkles, Clock } from 'lucide-react';
import {
  BotanicalCorner,
  OliveBranch,
  WeddingRingsIcon,
} from './BotanicalDecorations';

export const WeddingScheduleCard: React.FC = () => {
  const timelineEvents = [
    {
      time: '20:00 hs',
      title: 'Ceremonia Religiosa',
      description: 'Testigos de nuestro amor ante Dios y de nuestra unión en sagrado matrimonio.',
      icon: <Church className="w-5 h-5 text-[#B89A58]" />,
    },
    {
      time: '21:00 hs',
      title: 'Recepción',
      description: 'Brindis de bienvenida, exquisitos aperitivos y abrazos de felicitación.',
      icon: <GlassWater className="w-5 h-5 text-[#B89A58]" />,
    },
    {
      time: 'Luego',
      title: 'Comienzo de Fiesta',
      description: 'Cena, música inolvidable y una noche de pura alegría celebrando juntos.',
      icon: <Sparkles className="w-5 h-5 text-[#B89A58]" />,
    },
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto my-10 px-4" id="detalles-boda">
      <div className="relative p-6 sm:p-9 rounded-3xl eucalyptus-card overflow-hidden">
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="bottom-right" />

        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#182317]/65 backdrop-blur-sm border border-[#B89A58]/45 text-[#B89A58] shadow-[0_0_20px_rgba(184,154,88,0.2)] mb-3">
            <Clock className="w-7 h-7 text-[#B89A58]" />
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-cinzel uppercase tracking-[0.35em] text-[#B89A58] font-semibold">
            <OliveBranch size={16} />
            <span>Itinerario del Evento</span>
            <div className="scale-x-[-1]">
              <OliveBranch size={16} />
            </div>
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl text-[#FAF8F3] font-bold tracking-wide mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Detalles de la Boda
          </h3>

          <div className="eucalyptus-divider max-w-xs mx-auto my-3" />

          <p className="text-sm text-[#F3EEE5] font-body font-medium max-w-md mx-auto">
            Te compartimos el cronograma para disfrutar juntos cada instante de esta noche única.
          </p>
        </div>

        {/* Timeline list */}
        <div className="relative space-y-4 sm:space-y-5">
          {/* Vertical connecting line in champagne gold & sage */}
          <div className="absolute left-[27px] sm:left-[31px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#B89A58]/60 via-[#6F7A69] to-[#B89A58]/60 hidden sm:block pointer-events-none" />

          {timelineEvents.map((item) => (
            <div
              key={item.title}
              className="relative flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-5 rounded-2xl bg-[#182317]/55 backdrop-blur-md border border-[#6F7A69]/35 shadow-lg hover:border-[#B89A58]/55 transition-all duration-300"
            >
              {/* Icon circle */}
              <div className="relative z-10 w-11 h-11 rounded-xl bg-[#293725]/80 border border-[#B89A58]/45 flex items-center justify-center shrink-0 shadow-md">
                {item.icon}
              </div>

              {/* Text content */}
              <div className="flex-1 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h4 className="font-cinzel text-lg sm:text-xl font-bold text-[#FAF8F3] tracking-wide">
                    {item.title}
                  </h4>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#293725]/80 border border-[#6F7A69]/60 text-[#FAF8F3] text-xs font-cinzel font-semibold">
                    <Clock className="w-3 h-3 text-[#B89A58]" />
                    {item.time}
                  </span>
                </div>

                <p className="text-sm text-[#D1CAC3] font-body leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom touch */}
        <div className="mt-6 pt-4 border-t border-[#D1CAC3]/20 flex items-center justify-center gap-2 text-xs font-cinzel text-[#B89A58]">
          <WeddingRingsIcon size={20} />
          <span className="text-[#F3EEE5]">¡Te esperamos para celebrar este momento inolvidable!</span>
        </div>
      </div>
    </div>
  );
};

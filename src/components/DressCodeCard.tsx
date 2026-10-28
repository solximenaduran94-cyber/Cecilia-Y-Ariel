import React from 'react';
import { Shirt } from 'lucide-react';
import { BotanicalCorner, OliveBranch } from './BotanicalDecorations';

export const DressCodeCard: React.FC = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto my-8 px-4" id="dress-code">
      <div className="relative p-6 sm:p-8 rounded-3xl eucalyptus-card overflow-hidden text-center">
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="bottom-right" />

        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#182317] border border-[#B89A58]/45 text-[#B89A58] shadow-[0_0_20px_rgba(184,154,88,0.2)] mb-3">
          <Shirt className="w-7 h-7 text-[#B89A58]" />
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-cinzel uppercase tracking-[0.35em] text-[#B89A58] font-semibold">
          <OliveBranch size={16} />
          <span>Sugerencia de Atuendo</span>
          <div className="scale-x-[-1]">
            <OliveBranch size={16} />
          </div>
        </div>

        <h3 className="font-cinzel text-2xl sm:text-3xl text-[#FAF8F3] font-bold tracking-wide mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Elegante Sport
        </h3>

        <div className="eucalyptus-divider max-w-xs mx-auto my-3" />

        <p className="text-sm sm:text-base text-[#F3EEE5] font-body font-medium max-w-md mx-auto leading-relaxed">
          Queremos que te sientas elegante, radiante y cómodo para compartir una noche mágica con nosotros.
        </p>
      </div>
    </div>
  );
};

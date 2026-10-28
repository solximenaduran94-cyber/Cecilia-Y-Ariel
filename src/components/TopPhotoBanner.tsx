import React from 'react';
import coupleHeroPhoto from '../assets/images/casamiento2.jpeg';
import {
  OliveBranch,
  WeddingRingsIcon,
} from './BotanicalDecorations';

interface TopPhotoBannerProps {
  onShowToast?: (msg: string) => void;
}

export const TopPhotoBanner: React.FC<TopPhotoBannerProps> = () => {
  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Edge-to-edge photo of Cecilia & Ariel spanning 100% full width with no frame/recuadro */}
      <div className="relative w-full bg-[#141C12] overflow-hidden">
        <img
          src={coupleHeroPhoto}
          alt="Cecilia & Ariel - Boda 20 de Noviembre de 2026"
          className="w-full h-[60vh] sm:h-[75vh] md:h-[85vh] max-h-[920px] object-cover object-[center_20%] block filter brightness-100 contrast-[1.02]"
        />
        {/* Subtle romantic bottom gradient blend into the invitation background */}
        <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-[#141C12] via-[#141C12]/60 to-transparent pointer-events-none" />
      </div>

      {/* Decorative Botanical Transition beneath the photo */}
      <div className="relative my-4 sm:my-5 flex items-center justify-center gap-3 z-10 pointer-events-none">
        <div className="h-px w-20 sm:w-36 bg-gradient-to-r from-transparent via-[#B89A58]/50 to-[#B89A58]" />
        <div className="-scale-x-100 transform">
          <OliveBranch size={22} glow />
        </div>
        <div className="px-1 transform hover:scale-105 transition-transform">
          <WeddingRingsIcon size={26} />
        </div>
        <OliveBranch size={22} glow />
        <div className="h-px w-20 sm:w-36 bg-gradient-to-l from-transparent via-[#B89A58]/50 to-[#B89A58]" />
      </div>
    </div>
  );
};

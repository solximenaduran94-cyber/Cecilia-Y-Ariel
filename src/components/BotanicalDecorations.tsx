import React from 'react';

/**
 * Botanical Eucalyptus Branch SVG in exact grayish sage (#89968C) and olive sage (#6F7A69) with champagne gold (#B89A58) stems
 */
export const EucalyptusBranch: React.FC<{
  className?: string;
  size?: number;
  glow?: boolean;
}> = ({ className = '', size = 36, glow = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${glow ? 'filter drop-shadow-[0_0_10px_rgba(137,150,140,0.45)]' : ''} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="eucLeafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D1CAC3" />
          <stop offset="45%" stopColor="#89968C" />
          <stop offset="100%" stopColor="#6F7A69" />
        </linearGradient>
        <linearGradient id="eucLeafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F3EEE5" />
          <stop offset="40%" stopColor="#89968C" />
          <stop offset="100%" stopColor="#293725" />
        </linearGradient>
        <linearGradient id="stemGoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F3EEE5" />
          <stop offset="40%" stopColor="#B89A58" />
          <stop offset="100%" stopColor="#6F7A69" />
        </linearGradient>
      </defs>

      {/* Main Curved Stem in Champagne Gold */}
      <path
        d="M20 90 C 35 70, 48 45, 78 14"
        stroke="url(#stemGoldGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Eucalyptus Round Leaves along the stem */}
      {/* Leaf 1 - Lower Left */}
      <ellipse
        cx="32"
        cy="76"
        rx="11"
        ry="8"
        transform="rotate(-28 32 76)"
        fill="url(#eucLeafGrad1)"
        stroke="#FAF8F3"
        strokeWidth="0.6"
        opacity="0.95"
      />
      <path d="M26 80 C 32 76, 36 74, 40 73" stroke="rgba(243,238,229,0.35)" strokeWidth="0.8" />

      {/* Leaf 2 - Lower Right */}
      <ellipse
        cx="44"
        cy="66"
        rx="12"
        ry="9"
        transform="rotate(22 44 66)"
        fill="url(#eucLeafGrad2)"
        stroke="#FAF8F3"
        strokeWidth="0.6"
        opacity="0.95"
      />
      <path d="M38 70 C 43 66, 47 64, 52 63" stroke="rgba(243,238,229,0.35)" strokeWidth="0.8" />

      {/* Leaf 3 - Mid Left */}
      <ellipse
        cx="42"
        cy="50"
        rx="13"
        ry="9.5"
        transform="rotate(-35 42 50)"
        fill="url(#eucLeafGrad1)"
        stroke="#FAF8F3"
        strokeWidth="0.6"
        opacity="0.95"
      />
      <path d="M34 54 C 41 50, 46 48, 51 47" stroke="rgba(243,238,229,0.35)" strokeWidth="0.8" />

      {/* Leaf 4 - Mid Right */}
      <ellipse
        cx="58"
        cy="42"
        rx="12"
        ry="8.5"
        transform="rotate(30 58 42)"
        fill="url(#eucLeafGrad2)"
        stroke="#FAF8F3"
        strokeWidth="0.6"
        opacity="0.95"
      />
      <path d="M52 46 C 57 42, 62 40, 66 38" stroke="rgba(243,238,229,0.35)" strokeWidth="0.8" />

      {/* Leaf 5 - Upper Left */}
      <ellipse
        cx="58"
        cy="28"
        rx="10"
        ry="7"
        transform="rotate(-25 58 28)"
        fill="url(#eucLeafGrad1)"
        stroke="#FAF8F3"
        strokeWidth="0.6"
        opacity="0.95"
      />

      {/* Leaf 6 - Tip */}
      <ellipse
        cx="74"
        cy="18"
        rx="9"
        ry="6"
        transform="rotate(38 74 18)"
        fill="url(#eucLeafGrad2)"
        stroke="#FAF8F3"
        strokeWidth="0.6"
        opacity="0.95"
      />

      {/* Subtle seed buds in champagne gold #B89A58 */}
      <circle cx="28" cy="85" r="2" fill="#B89A58" />
      <circle cx="36" cy="62" r="1.8" fill="#D1CAC3" />
      <circle cx="52" cy="35" r="1.8" fill="#B89A58" />
      <circle cx="68" cy="24" r="1.6" fill="#F3EEE5" />
    </svg>
  );
};

/**
 * Detailed Olive Branch with slender lanceolate olive leaves in #6F7A69 and subtle champagne fruit
 */
export const OliveBranch: React.FC<{
  className?: string;
  size?: number;
  glow?: boolean;
}> = ({ className = '', size = 32, glow = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${glow ? 'filter drop-shadow-[0_0_8px_rgba(184,154,88,0.4)]' : ''} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="oliveLeafGradRef" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#89968C" />
          <stop offset="50%" stopColor="#6F7A69" />
          <stop offset="100%" stopColor="#293725" />
        </linearGradient>
        <linearGradient id="oliveFruitGradRef" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F3EEE5" />
          <stop offset="50%" stopColor="#B89A58" />
          <stop offset="100%" stopColor="#6F7A69" />
        </linearGradient>
      </defs>

      {/* Main Olive stem in taupe beige #B2A699 */}
      <path d="M15 85 Q 45 65, 85 20" stroke="#B2A699" strokeWidth="1.8" strokeLinecap="round" />

      {/* Slender Olive Leaves */}
      <path d="M28 72 C 16 68, 12 55, 24 50 C 34 56, 34 68, 28 72 Z" fill="url(#oliveLeafGradRef)" />
      <path d="M42 60 C 38 46, 42 36, 52 40 C 56 50, 50 58, 42 60 Z" fill="url(#oliveLeafGradRef)" />
      <path d="M56 46 C 45 36, 48 24, 60 26 C 66 34, 62 43, 56 46 Z" fill="url(#oliveLeafGradRef)" />
      <path d="M68 34 C 62 20, 72 14, 80 18 C 82 28, 76 34, 68 34 Z" fill="url(#oliveLeafGradRef)" />
      <path d="M78 24 C 84 12, 94 14, 92 24 C 88 28, 82 28, 78 24 Z" fill="url(#oliveLeafGradRef)" />

      {/* Subtle olives in champagne gold */}
      <ellipse cx="36" cy="67" rx="3.5" ry="5" transform="rotate(25 36 67)" fill="url(#oliveFruitGradRef)" />
      <ellipse cx="62" cy="42" rx="3.5" ry="5" transform="rotate(-30 62 42)" fill="url(#oliveFruitGradRef)" />
    </svg>
  );
};

/**
 * Interlocked Wedding Rings in soft champagne gold #B89A58 with ivory diamond accent #FAF8F3
 */
export const WeddingRingsIcon: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 28 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block filter drop-shadow-[0_2px_6px_rgba(184,154,88,0.35)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldRingGradRef1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAF8F3" />
          <stop offset="35%" stopColor="#F3EEE5" />
          <stop offset="65%" stopColor="#B89A58" />
          <stop offset="100%" stopColor="#9A7F42" />
        </linearGradient>
        <linearGradient id="goldRingGradRef2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FAF8F3" />
          <stop offset="35%" stopColor="#D1CAC3" />
          <stop offset="75%" stopColor="#B89A58" />
          <stop offset="100%" stopColor="#8A6E35" />
        </linearGradient>
      </defs>

      {/* Left Ring */}
      <circle
        cx="40"
        cy="52"
        r="24"
        stroke="url(#goldRingGradRef1)"
        strokeWidth="5"
      />

      {/* Right Interlocked Ring */}
      <circle
        cx="60"
        cy="48"
        r="24"
        stroke="url(#goldRingGradRef2)"
        strokeWidth="5"
      />

      {/* Solitaire diamond in warm white */}
      <polygon
        points="40,21 44,27 40,33 36,27"
        fill="#FAF8F3"
        stroke="#D1CAC3"
        strokeWidth="0.8"
      />
      <circle cx="40" cy="27" r="2.2" fill="#FAF8F3" />
      <circle cx="40" cy="27" r="4" fill="#B89A58" opacity="0.25" />
    </svg>
  );
};

/**
 * Botanical Eucalyptus & Olive Wreath Medallion with exact palette:
 * foliage #89968C & #6F7A69, geometric rings in #B89A58, deep forest chamber #293725
 */
export const BotanicalWreathMedallion: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className = '', children }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Ambient serene glow in #293725 and #B89A58 */}
      <div className="absolute inset-0 bg-[#293725]/30 rounded-full blur-2xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute inset-4 bg-[#B89A58]/10 rounded-full blur-xl pointer-events-none" />

      {/* Main circular frame */}
      <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full flex items-center justify-center">
        {/* Outer Botanical Ring SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldCircleRef" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF8F3" />
              <stop offset="40%" stopColor="#B89A58" />
              <stop offset="70%" stopColor="#8A6E35" />
              <stop offset="100%" stopColor="#D1CAC3" />
            </linearGradient>
            <linearGradient id="eucWreathLeafRef" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D1CAC3" />
              <stop offset="50%" stopColor="#89968C" />
              <stop offset="100%" stopColor="#6F7A69" />
            </linearGradient>
          </defs>

          {/* Double Champagne Gold Geometric Rings */}
          <circle
            cx="130"
            cy="130"
            r="120"
            stroke="url(#goldCircleRef)"
            strokeWidth="1.2"
            strokeDasharray="5 7"
            opacity="0.8"
          />
          <circle
            cx="130"
            cy="130"
            r="112"
            stroke="url(#goldCircleRef)"
            strokeWidth="1.6"
          />
          <circle
            cx="130"
            cy="130"
            r="104"
            stroke="rgba(137, 150, 140, 0.4)"
            strokeWidth="1"
          />

          {/* Symmetrical Foliage in #89968C & #6F7A69 */}
          <g transform="translate(130, 10)">
            <ellipse cx="-16" cy="4" rx="10" ry="6" transform="rotate(-30)" fill="url(#eucWreathLeafRef)" />
            <ellipse cx="16" cy="4" rx="10" ry="6" transform="rotate(30)" fill="url(#eucWreathLeafRef)" />
            <circle cx="0" cy="0" r="3" fill="#B89A58" />
          </g>

          <g transform="translate(130, 250)">
            <ellipse cx="-16" cy="-4" rx="10" ry="6" transform="rotate(30)" fill="url(#eucWreathLeafRef)" />
            <ellipse cx="16" cy="-4" rx="10" ry="6" transform="rotate(-30)" fill="url(#eucWreathLeafRef)" />
            <circle cx="0" cy="0" r="3" fill="#B89A58" />
          </g>

          <g transform="translate(10, 130)">
            <ellipse cx="4" cy="-16" rx="6" ry="10" transform="rotate(-20)" fill="url(#eucWreathLeafRef)" />
            <ellipse cx="4" cy="16" rx="6" ry="10" transform="rotate(20)" fill="url(#eucWreathLeafRef)" />
            <circle cx="0" cy="0" r="3" fill="#B89A58" />
          </g>

          <g transform="translate(250, 130)">
            <ellipse cx="-4" cy="-16" rx="6" ry="10" transform="rotate(20)" fill="url(#eucWreathLeafRef)" />
            <ellipse cx="-4" cy="16" rx="6" ry="10" transform="rotate(-20)" fill="url(#eucWreathLeafRef)" />
            <circle cx="0" cy="0" r="3" fill="#B89A58" />
          </g>
        </svg>

        {/* Flanking branches perched on outer ring */}
        <div className="absolute top-2 -left-4 sm:top-4 sm:-left-6 -rotate-45 transition-transform hover:scale-105">
          <EucalyptusBranch size={46} glow />
        </div>
        <div className="absolute top-2 -right-4 sm:top-4 sm:-right-6 rotate-45 scale-x-[-1] transition-transform hover:scale-105">
          <EucalyptusBranch size={46} glow />
        </div>
        <div className="absolute -bottom-2 -left-3 rotate-15 scale-90">
          <OliveBranch size={38} glow />
        </div>
        <div className="absolute -bottom-2 -right-3 -rotate-15 scale-x-[-1] scale-90">
          <OliveBranch size={38} glow />
        </div>

        {/* Central luxury deep forest green chamber with translucent glassmorphic backdrop */}
        <div className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-[#182317]/75 backdrop-blur-md border-2 border-[#B89A58]/55 shadow-[0_0_35px_rgba(20,28,18,0.85)] flex flex-col items-center justify-center text-center p-3">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Botanical Corner Frame with Eucalyptus & Olive sprigs in exact palette
 */
export const BotanicalCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = '' }) => {
  const transformClasses = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2 scale-x-[-1]',
    'bottom-left': 'bottom-2 left-2 scale-y-[-1]',
    'bottom-right': 'bottom-2 right-2 scale-[-1]',
  };

  return (
    <div
      className={`absolute pointer-events-none z-10 ${transformClasses[position]} ${className}`}
      aria-hidden="true"
    >
      <svg
        width="76"
        height="76"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="cornerGoldRef" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF8F3" />
            <stop offset="50%" stopColor="#B89A58" />
            <stop offset="100%" stopColor="#8A6E35" />
          </linearGradient>
          <linearGradient id="cornerLeafRef" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D1CAC3" />
            <stop offset="60%" stopColor="#89968C" />
            <stop offset="100%" stopColor="#6F7A69" />
          </linearGradient>
        </defs>

        {/* Framing lines in champagne gold & stone beige */}
        <path
          d="M6 38 L6 14 C6 9.5 9.5 6 14 6 L38 6"
          stroke="url(#cornerGoldRef)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M11 30 L11 15 C11 12.8 12.8 11 15 11 L30 11"
          stroke="rgba(137, 150, 140, 0.5)"
          strokeWidth="0.9"
          strokeLinecap="round"
        />

        {/* Corner rosette dot in #B89A58 */}
        <circle cx="6" cy="6" r="2.8" fill="#B89A58" />

        {/* Foliage leaves in #89968C & #6F7A69 */}
        <path
          d="M16 28 C 12 20, 18 14, 25 18 C 24 24, 20 28, 16 28 Z"
          fill="url(#cornerLeafRef)"
          stroke="#FAF8F3"
          strokeWidth="0.4"
        />
        <path
          d="M28 16 C 36 12, 42 18, 38 25 C 32 24, 28 20, 28 16 Z"
          fill="url(#cornerLeafRef)"
          stroke="#FAF8F3"
          strokeWidth="0.4"
        />
        <ellipse cx="32" cy="32" rx="6.5" ry="4.5" transform="rotate(-40 32 32)" fill="url(#cornerLeafRef)" />
        <circle cx="24" cy="24" r="1.8" fill="#B89A58" />
      </svg>
    </div>
  );
};

/**
 * Elegant Botanical Divider in champagne gold #B89A58 and grayish sage #89968C
 */
export const BotanicalDivider: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <div
      className={`flex items-center justify-center gap-3 my-6 ${className}`}
      aria-hidden="true"
    >
      <div className="h-px w-14 sm:w-28 bg-gradient-to-r from-transparent via-[#B89A58]/50 to-[#B89A58]" />
      
      {/* Left eucalyptus leaf */}
      <div className="-scale-x-100 transform -rotate-12">
        <EucalyptusBranch size={22} />
      </div>

      {/* Central Intertwined Rings */}
      <div className="relative px-1 -my-1 transform hover:scale-105 transition-transform">
        <WeddingRingsIcon size={26} />
      </div>

      {/* Right eucalyptus leaf */}
      <div className="transform rotate-12">
        <EucalyptusBranch size={22} />
      </div>

      <div className="h-px w-14 sm:w-28 bg-gradient-to-l from-transparent via-[#B89A58]/50 to-[#B89A58]" />
    </div>
  );
};

/**
 * Ambient floating eucalyptus leaves and subtle stone/champagne flecks
 */
export const FloatingBotanicalLeaves: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[4] overflow-hidden select-none">
      {/* Subtle corner branch accent - Top Left */}
      <div className="absolute top-[8%] -left-3 sm:left-[2%] opacity-40 animate-float-slow pointer-events-none scale-90">
        <EucalyptusBranch size={40} glow />
      </div>

      {/* Subtle edge branch accent - Mid/Lower Right */}
      <div className="absolute top-[68%] -right-3 sm:right-[2%] opacity-40 scale-x-[-1] animate-float-medium pointer-events-none scale-90">
        <OliveBranch size={38} glow />
      </div>

      {/* Very faint, gentle warm champagne shimmer points */}
      <div className="absolute top-[24%] right-[12%] w-1.5 h-1.5 rounded-full bg-[#FAF8F3] opacity-50 animate-pulse pointer-events-none" />
      <div className="absolute top-[78%] left-[10%] w-1.5 h-1.5 rounded-full bg-[#B89A58] opacity-45 animate-pulse pointer-events-none" style={{ animationDelay: '1.8s' }} />
    </div>
  );
};

/**
 * Luxury Biblical Verse Card with Olive/Eucalyptus Botanical Framing in exact palette
 */
export const BibleVerseCard: React.FC<{
  reference: string;
  verse: string;
  className?: string;
}> = ({ reference, verse, className = '' }) => {
  return (
    <div className={`relative p-6 sm:p-7 rounded-3xl eucalyptus-card text-center my-6 overflow-hidden ${className}`}>
      <BotanicalCorner position="top-left" />
      <BotanicalCorner position="bottom-right" />

      {/* Reference Header in champagne gold #B89A58 */}
      <div className="inline-flex items-center justify-center gap-2 mb-2 text-[#B89A58]">
        <OliveBranch size={20} />
        <span className="font-cinzel text-xs uppercase tracking-[0.3em] font-bold text-[#B89A58]">
          {reference}
        </span>
        <div className="scale-x-[-1]">
          <OliveBranch size={20} />
        </div>
      </div>

      {/* Verse quotation in warm white #FAF8F3 */}
      <blockquote className="font-serif-luxury italic text-lg sm:text-2xl text-[#FAF8F3] font-normal leading-relaxed max-w-xl mx-auto my-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
        “{verse}”
      </blockquote>

      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#B89A58] to-transparent mx-auto mt-3" />
    </div>
  );
};

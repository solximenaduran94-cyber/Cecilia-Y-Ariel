import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { BotanicalCorner, OliveBranch, WeddingRingsIcon } from './BotanicalDecorations';

import photo1 from '../assets/images/casamiento1.jpeg';
import photo2 from '../assets/images/casamiento2.jpeg';
import photo3 from '../assets/images/casamiento3.jpeg';
import photo4 from '../assets/images/casamiento4.jpeg';

interface PhotoItem {
  id: string;
  src: string;
  caption: string;
  tag: string;
  objectPosition: string;
}

const WEDDING_PHOTOS: PhotoItem[] = [
  {
    id: 'hero',
    src: photo2,
    caption: '“Juntos comenzamos este hermoso camino, con el corazón lleno de amor y bendición.”',
    tag: 'Cecilia & Ariel',
    objectPosition: 'object-[center_20%]',
  },
  {
    id: 'portrait',
    src: photo1,
    caption: '“El amor todo lo sufre, todo lo cree, todo lo espera, todo lo soporta.” — 1 Corintios 13:7',
    tag: 'Nuestro Amor',
    objectPosition: 'object-[center_25%]',
  },
  {
    id: 'engagement',
    src: photo3,
    caption: 'El momento en que dijimos “Sí, para siempre” y sellamos nuestra promesa ante Dios.',
    tag: 'El Compromiso 💍',
    objectPosition: 'object-[center_32%]',
  },
  {
    id: 'embrace',
    src: photo4,
    caption: '“Cordón de tres dobleces no se rompe pronto.” — Eclesiastés 4:12',
    tag: 'Un Solo Corazón',
    objectPosition: 'object-[center_25%]',
  },
];

export const PhotoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoItem | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused || lightboxPhoto !== null) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % WEDDING_PHOTOS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, lightboxPhoto]);

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + WEDDING_PHOTOS.length) % WEDDING_PHOTOS.length);
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % WEDDING_PHOTOS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      nextPhoto();
    } else if (diff < -40) {
      prevPhoto();
    }
    touchStartXRef.current = null;
  };

  const current = WEDDING_PHOTOS[currentIndex];

  return (
    <div className="relative w-full max-w-xl mx-auto my-10 px-4" id="galeria">
      <div
        className="relative p-5 sm:p-8 rounded-3xl eucalyptus-card overflow-hidden text-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="bottom-right" />

        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center justify-center gap-2 text-xs font-cinzel uppercase tracking-[0.35em] text-[#B89A58] font-semibold">
            <OliveBranch size={16} glow />
            <span>Nuestra Historia</span>
            <div className="scale-x-[-1]">
              <OliveBranch size={16} glow />
            </div>
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl text-[#FAF8F3] font-bold tracking-wide mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Momentos Inolvidables
          </h3>

          <div className="eucalyptus-divider max-w-xs mx-auto my-3" />
        </div>

        {/* Carousel Frame - aspect ratio optimized for vertical portrait photos */}
        <div
          className="relative aspect-[3/4] sm:aspect-[4/5] max-h-[560px] w-full rounded-2xl overflow-hidden bg-[#0e160d] border border-[#6F7A69]/40 shadow-2xl group select-none cursor-pointer"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => setLightboxPhoto(current)}
          title="Toca para ampliar foto"
        >
          {/* Images */}
          {WEDDING_PHOTOS.map((photo, idx) => (
            <div
              key={photo.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className={`w-full h-full object-cover ${photo.objectPosition} filter brightness-[0.98] contrast-105`}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              {/* Subtle gradient at bottom for legibility */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#141C12] via-[#141C12]/60 to-transparent pointer-events-none" />
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevPhoto}
            aria-label="Foto anterior"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#141C12]/80 hover:bg-[#141C12] border border-[#6F7A69]/60 text-[#FAF8F3] flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 text-[#B89A58]" />
          </button>

          <button
            type="button"
            onClick={nextPhoto}
            aria-label="Siguiente foto"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#141C12]/80 hover:bg-[#141C12] border border-[#6F7A69]/60 text-[#FAF8F3] flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 text-[#B89A58]" />
          </button>

          {/* Tag on Image */}
          <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182317]/90 border border-[#B89A58]/45 text-[10px] font-cinzel text-[#FAF8F3] font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
            <WeddingRingsIcon size={12} />
            <span>{current.tag}</span>
          </div>

          {/* Expand button */}
          <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[#182317]/80 hover:bg-[#182317] border border-[#B89A58]/40 flex items-center justify-center text-[#B89A58] backdrop-blur-md shadow-md">
            <Maximize2 size={14} />
          </div>

          {/* Indicator Dots */}
          <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center gap-2 pointer-events-none">
            {WEDDING_PHOTOS.map((_, i) => (
              <span
                key={i}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  i === currentIndex ? 'w-7 bg-[#B89A58]' : 'w-1.5 bg-[#D1CAC3]/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Selector Row */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 px-1">
          {WEDDING_PHOTOS.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`relative w-14 h-16 sm:w-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shadow-md ${
                i === currentIndex
                  ? 'border-[#B89A58] ring-2 ring-[#B89A58]/50 scale-105'
                  : 'border-[#6F7A69]/30 opacity-60 hover:opacity-100 hover:border-[#6F7A69]'
              }`}
              title={`Ver foto ${i + 1}`}
            >
              <img
                src={photo.src}
                alt={`Miniatura ${i + 1}`}
                className={`w-full h-full object-cover ${photo.objectPosition}`}
              />
            </button>
          ))}
        </div>

        {/* Dynamic Caption */}
        <div className="mt-4 px-2 min-h-[52px] flex items-center justify-center">
          <p className="font-serif-luxury italic text-base sm:text-lg text-[#F3EEE5] leading-snug drop-shadow-sm transition-all duration-300">
            {current.caption}
          </p>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxPhoto(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxPhoto(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[#141C12]/80 hover:bg-[#141C12] border border-[#B89A58]/50 text-[#FAF8F3] flex items-center justify-center cursor-pointer shadow-xl transition-transform hover:scale-110 z-50"
            aria-label="Cerrar foto ampliada"
          >
            <X className="w-6 h-6 text-[#B89A58]" />
          </button>

          <div
            className="relative max-w-lg w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxPhoto.src}
              alt={lightboxPhoto.caption}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain border border-[#B89A58]/40 shadow-2xl"
            />
            <p className="mt-4 text-center font-serif-luxury italic text-sm sm:text-base text-[#FAF8F3] px-4">
              {lightboxPhoto.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

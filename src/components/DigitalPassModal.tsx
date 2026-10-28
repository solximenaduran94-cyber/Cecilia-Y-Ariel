import React, { useState } from 'react';
import { X, QrCode, Download, Share2, Sparkles, MapPin, Calendar, Clock, Ticket } from 'lucide-react';
import {
  BotanicalCorner,
  OliveBranch,
  EucalyptusBranch,
  WeddingRingsIcon,
} from './BotanicalDecorations';
import ringsDetail from '../assets/images/wedding_eucalyptus_detail_1792701737708.jpg';

interface DigitalPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [guestName, setGuestName] = useState('Invitado Especial');
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Pase de Invitado - Boda Cecilia & Ariel 🌿💍',
          text: `¡Tengo mi pase para el casamiento de Cecilia y Ariel! Viernes 20 de Noviembre a las 20:00 hs en Padre Stoppler 728, Grand Bourg.`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      onShowToast('¡Enlace del pase copiado!');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pass-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl eucalyptus-card border-2 border-[#B89A58]/50 shadow-2xl p-6 sm:p-7 text-center overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="top-right" />
        <BotanicalCorner position="bottom-left" />
        <BotanicalCorner position="bottom-right" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#141C12] text-[#89968C] hover:text-[#FAF8F3] border border-[#6F7A69]/40 transition-colors cursor-pointer z-20"
          aria-label="Cerrar pase"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#293725] border border-[#B89A58]/45 text-[#B89A58] text-[10px] font-cinzel font-bold tracking-widest uppercase mb-3">
          <WeddingRingsIcon size={14} />
          <span>Pase Digital de Boda</span>
        </div>

        {/* Title */}
        <h3 id="pass-title" className="font-cinzel text-xl sm:text-2xl font-black text-[#FAF8F3] uppercase tracking-wider mb-0.5">
          CECILIA <span className="text-[#B89A58]">&</span> ARIEL
        </h3>
        <p className="font-cinzel text-xs text-[#B89A58] tracking-[0.25em] uppercase font-semibold">
          Nuestra Boda 🌿
        </p>

        {/* Rings image circular avatar */}
        <div className="w-20 h-20 mx-auto my-3 rounded-full border-2 border-[#B89A58] overflow-hidden shadow-lg">
          <img src={ringsDetail} alt="Alianzas y follaje de eucalipto" className="w-full h-full object-cover" />
        </div>

        {/* Guest name badge */}
        <div className="my-2 p-2 rounded-xl bg-[#141C12] border border-[#6F7A69]/40">
          <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#89968C] block font-semibold">
            Invitado / Familia
          </span>
          {isEditing ? (
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              onBlur={() => setIsEditing(false)}
              autoFocus
              className="w-full text-center font-cinzel text-sm font-bold text-[#FAF8F3] bg-transparent border-b border-[#B89A58] focus:outline-none"
            />
          ) : (
            <p
              onClick={() => setIsEditing(true)}
              className="font-cinzel text-sm sm:text-base font-bold text-[#FAF8F3] hover:text-[#B89A58] cursor-pointer transition-colors"
              title="Haz clic para personalizar tu nombre"
            >
              {guestName} ✎
            </p>
          )}
        </div>

        {/* Details list */}
        <div className="space-y-1.5 my-3 text-left text-xs font-cinzel text-[#D1CAC3] bg-[#141C12] p-3 rounded-xl border border-[#6F7A69]/30">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#B89A58]" />
            <span>Viernes 20 de Noviembre de 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#B89A58]" />
            <span>Ceremonia: 20:00 hs · Recepción: 21:00 hs</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#B89A58]" />
            <span>Padre Stoppler 728, Grand Bourg</span>
          </div>
          <div className="flex items-center gap-2 text-[#B89A58]">
            <Ticket className="w-3.5 h-3.5" />
            <span>Código de Vestimenta: Elegante Sport</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-[#293725] to-[#354730] hover:from-[#354730] hover:to-[#41553c] text-[#FAF8F3] font-cinzel text-xs font-bold tracking-wider cursor-pointer border border-[#B89A58]/50 shadow-md"
          >
            <Share2 className="w-3.5 h-3.5 text-[#B89A58]" />
            <span>Compartir Pase</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-[#141C12] border border-[#6F7A69]/40 text-[#D1CAC3] hover:text-[#FAF8F3] font-cinzel text-xs cursor-pointer transition-colors"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Copy, Check, ExternalLink, CalendarPlus } from 'lucide-react';
import { BotanicalCorner, OliveBranch } from './BotanicalDecorations';

interface LocationCardProps {
  onShowToast: (message: string) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({ onShowToast }) => {
  const [copied, setCopied] = useState(false);

  const address = 'Padre Stoppler 728';
  const city = 'Grand Bourg, Buenos Aires';
  const fullAddress = `${address}, ${city}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Padre Stoppler 728, Grand Bourg')}`;
  const embedMapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent('Padre Stoppler 728, Grand Bourg')}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${fullAddress} - Google Maps: ${mapsUrl}`);
    setCopied(true);
    onShowToast('¡Dirección copiada al portapapeles!');
    setTimeout(() => setCopied(false), 2500);
  };

  // 20 November 2026 from 20:00 to 21 November 05:00
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Boda de Cecilia y Ariel 🌿'
  )}&dates=20261120T200000/20261121T050000&details=${encodeURIComponent(
    `Celebración del casamiento de Cecilia y Ariel. ¡Bienvenidos a nuestro gran día!\nCeremonia: 20:00 hs · Recepción: 21:00 hs · Padre Stoppler 728, Grand Bourg.\nMapa: ${mapsUrl}`
  )}&location=${encodeURIComponent(fullAddress)}`;

  return (
    <div className="relative w-full max-w-xl mx-auto my-10 px-4" id="ubicacion">
      <div className="relative p-6 sm:p-9 rounded-3xl eucalyptus-card overflow-hidden">
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="bottom-right" />

        {/* Card Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#182317]/65 backdrop-blur-sm border border-[#B89A58]/45 text-[#B89A58] shadow-[0_0_20px_rgba(184,154,88,0.2)] mb-3">
            <MapPin className="w-7 h-7 text-[#B89A58]" />
          </div>
          <span className="block text-xs font-cinzel uppercase tracking-[0.35em] text-[#B89A58] font-semibold">
            ¿Cuándo y Dónde?
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl text-[#FAF8F3] font-bold tracking-wide mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Ubicación del Salón
          </h3>
          <div className="eucalyptus-divider max-w-xs mx-auto my-3" />
        </div>

        {/* Date & Time Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {/* Day block */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#182317]/55 backdrop-blur-md border border-[#6F7A69]/30">
            <div className="w-11 h-11 rounded-xl bg-[#293725]/80 border border-[#B89A58]/40 flex items-center justify-center text-[#B89A58] shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#D1CAC3] block">
                Día del Evento
              </span>
              <span className="text-base sm:text-lg font-bold text-[#FAF8F3] font-cinzel block">
                20 de Noviembre
              </span>
              <span className="text-xs text-[#B89A58] font-semibold font-body block">
                Viernes · 2026
              </span>
            </div>
          </div>

          {/* Time block */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#182317]/55 backdrop-blur-md border border-[#6F7A69]/30">
            <div className="w-11 h-11 rounded-xl bg-[#293725]/80 border border-[#B89A58]/40 flex items-center justify-center text-[#B89A58] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#D1CAC3] block">
                Horario Ceremonia
              </span>
              <span className="text-base sm:text-lg font-bold text-[#FAF8F3] font-cinzel block">
                20:00 hs
              </span>
              <span className="text-xs text-[#B89A58] font-medium font-body block">
                Recepción 21:00 hs
              </span>
            </div>
          </div>
        </div>

        {/* Venue Information */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#182317]/55 backdrop-blur-md border border-[#6F7A69]/35 text-center mb-6 shadow-inner">
          <div className="inline-flex items-center gap-2 text-[#B89A58] mb-2">
            <OliveBranch size={16} />
            <span className="text-xs uppercase font-cinzel tracking-[0.25em] font-semibold text-[#F3EEE5]">
              Dirección
            </span>
            <div className="scale-x-[-1]">
              <OliveBranch size={16} />
            </div>
          </div>

          <h4 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#FAF8F3] tracking-wide uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {address}
          </h4>

          <p className="font-body text-base sm:text-lg text-[#D1CAC3] font-medium mt-1 leading-relaxed">
            {city}
          </p>

          {/* Embedded Google Maps Preview */}
          <div className="mt-4 rounded-xl overflow-hidden border border-[#6F7A69]/35 shadow-lg bg-[#141C12]">
            <iframe
              title="Ubicación en Google Maps - Padre Stoppler 728, Grand Bourg"
              src={embedMapsUrl}
              className="w-full h-48 sm:h-56 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Copy Address Button */}
          <button
            type="button"
            onClick={handleCopyAddress}
            className="mt-4 inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-[#293725] hover:bg-[#354730] border border-[#6F7A69]/40 text-[#F3EEE5] text-xs font-cinzel tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:border-[#B89A58]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 font-semibold">¡Dirección Copiada!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#B89A58]" />
                <span>Copiar Dirección</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons: Google Maps & Add to Calendar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl bg-gradient-to-r from-[#293725] via-[#354730] to-[#293725] hover:from-[#354730] hover:to-[#3E5139] border border-[#B89A58]/55 text-[#FAF8F3] font-cinzel text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(41,55,37,0.4)] cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#B89A58]" />
            <span>Cómo Llegar (Google Maps)</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <a
            href={gcalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#182317] hover:bg-[#293725] border border-[#D1CAC3]/30 text-[#F3EEE5] font-cinzel text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:border-[#B89A58]"
          >
            <CalendarPlus className="w-4 h-4 text-[#B89A58]" />
            <span>Agendar en Google Calendar</span>
          </a>
        </div>
      </div>
    </div>
  );
};

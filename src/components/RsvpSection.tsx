import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Users, MessageSquare } from 'lucide-react';
import { BotanicalCorner, OliveBranch, EucalyptusBranch, WeddingRingsIcon } from './BotanicalDecorations';
import { saveGuestMessageToPage } from './GuestMessagesWall';

interface RsvpSectionProps {
  onShowToast: (message: string) => void;
}

interface SavedRsvp {
  name: string;
  attending: boolean;
  guests: number;
  song?: string;
  message: string;
  date: string;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ onShowToast }) => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guests, setGuests] = useState('1');
  const [message, setMessage] = useState('');
  const [savedRsvp, setSavedRsvp] = useState<SavedRsvp | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cecilia_ariel_boda_rsvp');
      if (stored) {
        setSavedRsvp(JSON.parse(stored));
      }
    } catch {
      // ignore storage error
    }
  }, []);

  const WHATSAPP_PHONE = '5491130624383';
  const WHATSAPP_DISPLAY = '+54 9 11 3062-4383';

  const buildWhatsAppUrl = (data: SavedRsvp) => {
    const attendingText = data.attending
      ? '¡Sí, confirmo con alegría mi asistencia! 🌿💍'
      : 'Lamentablemente no podré asistir, les deseo lo mejor 🤍';

    let waText = `🌿 *CONFIRMACIÓN DE ASISTENCIA - BODA CECILIA & ARIEL* 💍\n\n`;
    waText += `👤 *Nombre:* ${data.name}\n`;
    waText += `💌 *Asistencia:* ${attendingText}\n`;
    if (data.attending) {
      waText += `👥 *Personas / Acompañantes:* ${data.guests}\n`;
    }
    if (data.song) {
      waText += `🎵 *Canción para la fiesta:* ${data.song}\n`;
    }
    if (data.message) {
      waText += `💬 *Dedicatoria:* "${data.message}"\n`;
    }
    waText += `\n📅 *Boda:* Viernes 20 de Noviembre de 2026 - 20:00 hs\n📍 *Lugar:* Padre Stoppler 728 (Grand Bourg)`;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waText)}`;
  };

  const openWhatsAppLink = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      onShowToast('Por favor escribe tu nombre y apellido');
      return;
    }

    const rsvpData: SavedRsvp = {
      name: name.trim(),
      attending: attending === 'yes',
      guests: attending === 'yes' ? parseInt(guests, 10) || 1 : 0,
      message: message.trim(),
      date: new Date().toLocaleDateString('es-AR'),
    };

    if (rsvpData.message) {
      saveGuestMessageToPage(rsvpData.name, rsvpData.message).catch(() => {});
    }

    localStorage.setItem('cecilia_ariel_boda_rsvp', JSON.stringify(rsvpData));
    setSavedRsvp(rsvpData);
    onShowToast('¡Confirmación guardada y abriendo WhatsApp!');

    const waUrl = buildWhatsAppUrl(rsvpData);
    openWhatsAppLink(waUrl);
  };

  const handleReset = () => {
    localStorage.removeItem('cecilia_ariel_boda_rsvp');
    setSavedRsvp(null);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto my-10 px-4" id="rsvp">
      <div className="relative p-6 sm:p-9 rounded-3xl eucalyptus-card overflow-hidden">
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="bottom-right" />

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#182317] border border-[#B89A58]/50 text-[#B89A58] shadow-[0_0_20px_rgba(184,154,88,0.25)] mb-3">
            <WeddingRingsIcon size={28} />
          </div>

          <span className="block text-xs font-cinzel uppercase tracking-[0.35em] text-[#B89A58] font-semibold">
            Acompañanos en Nuestro Gran Día
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl text-[#FAF8F3] font-bold tracking-wide mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Confirmar Asistencia
          </h3>
          <div className="eucalyptus-divider max-w-xs mx-auto my-3" />
          <p className="text-sm text-[#D1CAC3] font-body font-medium">
            Por favor, confirmá tu presencia antes del <strong className="text-[#FAF8F3]">5 de Noviembre</strong>.
          </p>
        </div>

        {savedRsvp ? (
          <div className="p-6 rounded-2xl bg-[#182317]/55 backdrop-blur-md border border-[#6F7A69]/40 text-center animate-fadeIn shadow-xl">
            <div className="w-14 h-14 rounded-full bg-[#293725]/80 border border-[#B89A58]/50 text-[#B89A58] mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-cinzel text-xl text-[#FAF8F3] font-bold mb-1">
              ¡Muchas gracias, {savedRsvp.name}!
            </h4>
            <p className="text-sm text-[#D1CAC3] font-body mb-5">
              {savedRsvp.attending
                ? 'Confirmaste tu asistencia a la boda. ¡Estamos muy felices de compartir este día con vos!'
                : 'Lamentamos que no puedas acompañarnos físicamente, ¡gracias de corazón por avisarnos!'}
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              <a
                href={buildWhatsAppUrl(savedRsvp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#293725] to-[#354730] hover:from-[#354730] hover:to-[#41553c] text-[#FAF8F3] font-cinzel text-xs font-bold tracking-wider cursor-pointer shadow-md border border-[#B89A58]/50"
              >
                <Send className="w-4 h-4 text-[#B89A58]" />
                <span>Enviar por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#141C12]/60 backdrop-blur-sm border border-[#6F7A69]/35 text-[#D1CAC3] hover:text-[#FAF8F3] font-cinzel text-xs tracking-wider cursor-pointer transition-colors"
              >
                <span>Modificar Respuesta</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Full Name */}
            <div>
              <label
                htmlFor="rsvp-name"
                className="block text-xs font-cinzel tracking-wider uppercase text-[#B89A58] font-bold mb-1.5"
              >
                Nombre y Apellido *
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Marcelo Fernández y Familia"
                className="w-full px-4 py-3 rounded-xl bg-[#182317]/55 backdrop-blur-sm border border-[#6F7A69]/40 text-[#FAF8F3] placeholder-[#89968C] text-sm focus:outline-none focus:border-[#B89A58] focus:ring-1 focus:ring-[#B89A58] transition-colors"
              />
            </div>

            {/* Attendance Radio Buttons */}
            <div>
              <span className="block text-xs font-cinzel tracking-wider uppercase text-[#B89A58] font-bold mb-1.5">
                ¿Vas a asistir? *
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-cinzel font-bold tracking-wider transition-all duration-200 cursor-pointer backdrop-blur-sm ${
                    attending === 'yes'
                      ? 'bg-[#293725]/85 text-[#FAF8F3] border-[#B89A58] shadow-[0_0_15px_rgba(184,154,88,0.25)]'
                      : 'bg-[#182317]/55 text-[#89968C] border-[#6F7A69]/35 hover:border-[#89968C]'
                  }`}
                >
                  ¡Sí, asisto! 🌿
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-cinzel font-bold tracking-wider transition-all duration-200 cursor-pointer backdrop-blur-sm ${
                    attending === 'no'
                      ? 'bg-[#2b3529]/85 text-[#FAF8F3] border-[#D1CAC3] shadow-md'
                      : 'bg-[#182317]/55 text-[#89968C] border-[#6F7A69]/35 hover:border-[#89968C]'
                  }`}
                >
                  No puedo ir 🤍
                </button>
              </div>
            </div>

            {attending === 'yes' && (
              <>
                {/* Number of guests */}
                <div>
                  <label
                    htmlFor="rsvp-guests"
                    className="flex items-center gap-1.5 text-xs font-cinzel tracking-wider uppercase text-[#B89A58] font-bold mb-1.5"
                  >
                    <Users className="w-3.5 h-3.5" />
                    Cantidad de Personas
                  </label>
                  <select
                    id="rsvp-guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#182317]/55 backdrop-blur-sm border border-[#6F7A69]/40 text-[#FAF8F3] text-sm focus:outline-none focus:border-[#B89A58] transition-colors"
                  >
                    <option value="1" className="bg-[#182317] text-[#FAF8F3]">1 Persona (Voy solo/a)</option>
                    <option value="2" className="bg-[#182317] text-[#FAF8F3]">2 Personas (En pareja)</option>
                    <option value="3" className="bg-[#182317] text-[#FAF8F3]">3 Personas</option>
                    <option value="4" className="bg-[#182317] text-[#FAF8F3]">4 Personas (Familia)</option>
                    <option value="5" className="bg-[#182317] text-[#FAF8F3]">5 o más personas</option>
                  </select>
                </div>
              </>
            )}

            {/* Optional message/blessing */}
            <div>
              <label
                htmlFor="rsvp-message"
                className="flex items-center gap-1.5 text-xs font-cinzel tracking-wider uppercase text-[#B89A58] font-bold mb-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Mensaje o Bendición para los Novios
              </label>
              <textarea
                id="rsvp-message"
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Dejales un mensaje de felicitaciones a Cecilia y Ariel..."
                className="w-full px-4 py-3 rounded-xl bg-[#182317]/55 backdrop-blur-sm border border-[#6F7A69]/40 text-[#FAF8F3] placeholder-[#89968C] text-sm focus:outline-none focus:border-[#B89A58] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#293725] via-[#354730] to-[#293725] hover:from-[#354730] hover:to-[#41553c] border border-[#B89A58]/55 text-[#FAF8F3] font-cinzel text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(41,55,37,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Send className="w-4 h-4 text-[#B89A58]" />
              <span>Confirmar Asistencia por WhatsApp</span>
            </button>

            <p className="text-center text-[11px] text-[#89968C] font-body mt-2.5">
              Confirmación directa al WhatsApp <span className="text-[#FAF8F3] font-medium">{WHATSAPP_DISPLAY}</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

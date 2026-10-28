import React, { useState, useEffect } from 'react';
import { BotanicalBackground } from './components/BotanicalBackground';
import {
  BotanicalWreathMedallion,
  BotanicalDivider,
  FloatingBotanicalLeaves,
  EucalyptusBranch,
  OliveBranch,
  WeddingRingsIcon,
  BibleVerseCard,
} from './components/BotanicalDecorations';
import { TopPhotoBanner } from './components/TopPhotoBanner';
import { CountdownTimer } from './components/CountdownTimer';
import { WeddingScheduleCard } from './components/WeddingScheduleCard';
import { PhotoCarousel } from './components/PhotoCarousel';
import { LocationCard } from './components/LocationCard';
import { DressCodeCard } from './components/DressCodeCard';
import { GiftAliasCard } from './components/GiftAliasCard';
import { SharedAlbumCard } from './components/SharedAlbumCard';
import { RsvpSection } from './components/RsvpSection';
import { GuestMessagesWall } from './components/GuestMessagesWall';
import { MusicPlayer } from './components/MusicPlayer';
import { WaterRippleEffect } from './components/WaterRippleEffect';
import { Toast } from './components/Toast';
import { DigitalPassModal } from './components/DigitalPassModal';
import { Calendar, Clock, MapPin, Share2, Ticket, Heart } from 'lucide-react';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Cecilia & Ariel | Nuestra Boda 🌿';
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Cecilia & Ariel | Nuestra Boda 🌿💍',
          text: '¡Bienvenidos a nuestro gran día! Te invitamos a celebrar nuestra boda. Viernes 20 de Noviembre de 2026 - 20:00 hs en Padre Stoppler 728, Grand Bourg.',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('¡Enlace de la invitación copiado al portapapeles!');
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-[#FAF8F3] font-body selection:bg-[#6F7A69]/40 selection:text-white">
      {/* Interactive Water Ripple Effect on Tap / Swipe */}
      <WaterRippleEffect />

      {/* Dynamic Botanical Foliage Canvas Background in Deep Forest Green #293725 */}
      <BotanicalBackground />

      {/* Floating Eucalyptus & Olive Foliage in Exact Reference Palette */}
      <FloatingBotanicalLeaves />

      {/* Ambient Music Player ("Hermoso Momento" - Kairo Worship) */}
      <MusicPlayer />

      {/* Action Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Digital VIP Pass Modal */}
      <DigitalPassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        onShowToast={showToast}
      />

      {/* FULL WIDTH TOP PHOTO BANNER */}
      <TopPhotoBanner onShowToast={showToast} />

      {/* Main Invitation Layout */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-2 sm:pt-6 pb-24 text-center">

        {/* HERO SECTION */}
        <header className="relative flex flex-col items-center justify-center pt-2 pb-6">
          {/* Subtle Indicator in Champagne Gold #B89A58 with translucent glass */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#182317]/65 border border-[#B89A58]/40 text-xs uppercase tracking-[0.35em] text-[#B89A58] font-cinzel font-semibold mb-3 shadow-md backdrop-blur-md">
            <OliveBranch size={16} glow />
            <span>Bienvenidos a Nuestro Gran Día</span>
            <div className="scale-x-[-1]">
              <OliveBranch size={16} glow />
            </div>
          </div>

          {/* Botanical Wreath Medallion with Monogram C & A */}
          <div className="my-2">
            <BotanicalWreathMedallion className="w-52 h-52 sm:w-64 sm:h-64">
              <div className="flex flex-col items-center justify-center select-none py-1">
                {/* Monogram initials in #FAF8F3 with champagne gold #B89A58 ampersand */}
                <div className="flex items-center justify-center gap-1.5 leading-none">
                  <span className="font-cinzel text-4xl sm:text-5xl text-[#FAF8F3] font-bold tracking-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                    C
                  </span>
                  <span className="font-script text-3xl sm:text-4xl text-[#B89A58] mx-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                    &
                  </span>
                  <span className="font-cinzel text-4xl sm:text-5xl text-[#FAF8F3] font-bold tracking-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                    A
                  </span>
                </div>
                {/* Subtle champagne gold divider */}
                <div className="w-14 h-px bg-gradient-to-r from-transparent via-[#B89A58] to-transparent my-2" />
                <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#D1CAC3] font-semibold">
                  20 · 11 · 2026
                </span>
              </div>
            </BotanicalWreathMedallion>
          </div>

          {/* Calligraphic Script Header in warm ivory #F3EEE5 */}
          <p className="font-script text-4xl sm:text-6xl text-[#F3EEE5] leading-tight mt-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            Nuestra Boda
          </p>

          {/* Bride & Groom Names in warm white #FAF8F3 */}
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black text-[#FAF8F3] tracking-[0.12em] uppercase mt-2 mb-3 drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
            CECILIA <span className="text-[#B89A58] font-serif font-light">&</span> ARIEL
          </h1>

          {/* Botanical Divider */}
          <BotanicalDivider className="my-4" />

          {/* Key Date & Place - Clean translucent glass metadata pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-2 mb-4 px-5 py-2.5 rounded-full bg-[#182317]/65 border border-[#B89A58]/35 text-xs sm:text-sm font-cinzel text-[#F3EEE5] shadow-lg backdrop-blur-md">
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#B89A58]" />
              <strong className="font-medium">Viernes 20 de Noviembre</strong>
            </span>
            <span className="text-[#89968C] hidden sm:inline" aria-hidden="true">·</span>
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#B89A58]" />
              <strong className="font-medium">20:00 hs (Ceremonia)</strong>
            </span>
            <span className="text-[#89968C] hidden sm:inline" aria-hidden="true">·</span>
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B89A58]" />
              <strong className="font-medium">Padre Stoppler 728</strong>
            </span>
          </div>

          {/* Emotional Welcome Dedication Phrase - Translucent card */}
          <div className="max-w-xl mx-auto px-4 py-3 my-2 rounded-2xl bg-[#182317]/55 border border-[#6F7A69]/30 text-center backdrop-blur-md shadow-md">
            <p className="font-serif-luxury italic text-sm sm:text-base text-[#FAF8F3] leading-relaxed">
              “Bienvenidos a nuestro gran día... El amor nos unió, la fe nos guía y la bendición de Dios sella nuestro camino. Queremos compartir con vos la inmensa alegría de celebrar este momento tan soñado.”
            </p>
          </div>

          {/* FIRST BIBLICAL VERSE: Eclesiastés 4:12 */}
          <div className="w-full">
            <BibleVerseCard
              reference="Eclesiastés 4:12"
              verse="Y si alguno prevaleciere contra uno, dos le resistirán; y cordón de tres dobleces no se rompe pronto."
            />
          </div>

          {/* Action buttons: Pass & Share */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <button
              type="button"
              onClick={() => setIsPassModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#293725]/80 hover:bg-[#354730]/90 border border-[#B89A58]/50 text-[#FAF8F3] font-cinzel text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:border-[#B89A58] backdrop-blur-sm"
            >
              <Ticket className="w-4 h-4 text-[#B89A58]" />
              <span>Ver Mi Pase Digital</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C271A]/70 hover:bg-[#293725]/85 border border-[#D1CAC3]/30 text-[#F3EEE5] font-cinzel text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:border-[#B89A58] backdrop-blur-sm"
            >
              <Share2 className="w-4 h-4 text-[#B89A58]" />
              <span>Compartir Invitación</span>
            </button>
          </div>
        </header>

        {/* 1. CUENTA REGRESIVA */}
        <section aria-label="Cuenta regresiva del casamiento">
          <CountdownTimer />
        </section>

        {/* 2. DETALLES DE LA BODA (CRONOGRAMA) */}
        <section aria-label="Detalles de la boda e itinerario">
          <WeddingScheduleCard />
        </section>

        {/* 3. GALERÍA DE RECUERDOS Y FOTOS */}
        <section aria-label="Galería fotográfica de Cecilia y Ariel">
          <PhotoCarousel />
        </section>

        {/* 4. UBICACIÓN Y CÓMO LLEGAR */}
        <section aria-label="Ubicación y cómo llegar al salón">
          <LocationCard onShowToast={showToast} />
        </section>

        {/* 5. CÓDIGO DE VESTIMENTA */}
        <section aria-label="Código de vestimenta">
          <DressCodeCard />
        </section>

        {/* 6. REGALOS Y TRANSFERENCIA PARA LUNA DE MIEL */}
        <section aria-label="Regalos y datos de transferencia bancaria">
          <GiftAliasCard onShowToast={showToast} />
        </section>

        {/* 7. COMPARTÍ TUS FOTOS EN GOOGLE DRIVE */}
        <section aria-label="Subir fotos y videos a Google Drive">
          <SharedAlbumCard onShowToast={showToast} />
        </section>

        {/* SECOND BIBLICAL VERSE: San Mateo 19:6 */}
        <section aria-label="Versículo bíblico sobre el matrimonio" className="w-full">
          <BibleVerseCard
            reference="San Mateo 19:6"
            verse="Así que no son ya más dos, sino una sola carne; por tanto lo que Dios juntó no lo separe el hombre."
          />
        </section>

        {/* 8. CONFIRMACIÓN DE ASISTENCIA (RSVP) */}
        <section aria-label="Confirmación de asistencia">
          <RsvpSection onShowToast={showToast} />
        </section>

        {/* 9. MURO DE MENSAJES Y BENDICIONES */}
        <section aria-label="Mensajes y bendiciones para los novios">
          <GuestMessagesWall onShowToast={showToast} />
        </section>

        {/* FOOTER */}
        <footer className="mt-14 pt-8 border-t border-[#D1CAC3]/20 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <OliveBranch size={22} glow />
            <WeddingRingsIcon size={24} />
            <div className="scale-x-[-1]">
              <OliveBranch size={22} glow />
            </div>
          </div>
          <p className="font-script text-3xl sm:text-4xl text-[#F3EEE5] leading-none drop-shadow-md">
            ¡Los esperamos para celebrar nuestro amor!
          </p>
          <p className="font-cinzel text-xl sm:text-2xl text-[#FAF8F3] font-extrabold tracking-widest uppercase mt-2">
            CECILIA & ARIEL
          </p>
          <p className="font-cinzel text-xs text-[#D1CAC3] uppercase tracking-[0.25em] mt-1">
            20 de Noviembre de 2026 · Grand Bourg
          </p>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs font-cinzel text-[#89968C]">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#FAF8F3] underline cursor-pointer"
            >
              Volver arriba ↑
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={handleShare}
              className="hover:text-[#FAF8F3] underline cursor-pointer"
            >
              Compartir invitación
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

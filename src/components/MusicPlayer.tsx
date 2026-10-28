import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, ExternalLink, Play, Pause, Disc, Sparkles } from 'lucide-react';
import hermosoMomentoSong from '../assets/hermoso_momento.mp3';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(hermosoMomentoSong);
    audio.loop = true;
    audio.volume = 0.75;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handlePlay = () => {
      setIsPlaying(true);
      setShowPlayPrompt(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Function to start music on first user touch / click / scroll
    const startAudioPlayback = () => {
      if (hasInteractedRef.current && !audio.paused) return;
      hasInteractedRef.current = true;
      audio.play().catch(() => {});
      cleanupInteractionListeners();
    };

    const cleanupInteractionListeners = () => {
      window.removeEventListener('click', startAudioPlayback);
      window.removeEventListener('touchstart', startAudioPlayback);
      window.removeEventListener('pointerdown', startAudioPlayback);
      window.removeEventListener('scroll', startAudioPlayback);
      window.removeEventListener('keydown', startAudioPlayback);
    };

    // Attempt direct autoplay immediately on page load
    audio
      .play()
      .then(() => {
        hasInteractedRef.current = true;
        setIsPlaying(true);
      })
      .catch(() => {
        // Browser blocked autoplay without user gesture:
        // Listen on any user interaction anywhere on the window
        window.addEventListener('click', startAudioPlayback, { once: true });
        window.addEventListener('touchstart', startAudioPlayback, { once: true, passive: true });
        window.addEventListener('pointerdown', startAudioPlayback, { once: true });
        window.addEventListener('scroll', startAudioPlayback, { once: true, passive: true });
        window.addEventListener('keydown', startAudioPlayback, { once: true });

        // Show friendly prompt after 1.5s if still paused
        const timer = setTimeout(() => {
          if (audio.paused) {
            setShowPlayPrompt(true);
          }
        }, 1200);

        return () => clearTimeout(timer);
      });

    return () => {
      cleanupInteractionListeners();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    hasInteractedRef.current = true;
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  const handlePromptClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    hasInteractedRef.current = true;
    audioRef.current?.play().catch(() => {});
    setShowPlayPrompt(false);
  };

  const SPOTIFY_URL = 'https://open.spotify.com/search/Hermoso%20Momento%20Kairo%20Worship';
  const YOUTUBE_URL = 'https://www.youtube.com/results?search_query=Hermoso+Momento+Kairo+Worship+Oficial';

  return (
    <>
      {/* Floating Ambient Music Control */}
      <div className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-end gap-2 select-none">
        {/* Subtle Play Prompt if browser blocked initial autoplay before user interaction */}
        {showPlayPrompt && !isPlaying && (
          <button
            type="button"
            onClick={handlePromptClick}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#182317]/95 border border-[#B89A58] text-[#FAF8F3] text-xs font-cinzel tracking-wider shadow-2xl backdrop-blur-md animate-bounce cursor-pointer hover:bg-[#202d1d] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B89A58]" />
            <span>Tocar para escuchar música 🎶</span>
          </button>
        )}

        {/* Expanded Info Card (if clicked) */}
        {showDetails && (
          <div className="p-4 rounded-2xl bg-[#182317]/95 border border-[#B89A58]/40 backdrop-blur-xl shadow-2xl w-72 text-left mb-1 animate-fadeIn">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#6F7A69]/30">
              <Disc className="w-5 h-5 text-[#B89A58] animate-spin" style={{ animationDuration: '6s' }} />
              <div>
                <p className="text-[10px] font-cinzel uppercase tracking-wider text-[#89968C]">
                  Música de la Boda
                </p>
                <p className="font-cinzel text-xs font-bold text-[#FAF8F3]">
                  Hermoso Momento (Live)
                </p>
              </div>
            </div>

            <p className="text-xs text-[#D1CAC3] italic font-serif-luxury mb-3 leading-relaxed">
              “En tu presencia yo quiero estar... Qué hermoso momento cuando te siento...”
            </p>
            <p className="text-[11px] font-cinzel text-[#B89A58] font-bold mb-3">
              Kairo Worship (Sesión Acústica)
            </p>

            <div className="flex gap-2">
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 px-2 rounded-lg bg-[#CC0000]/80 hover:bg-[#CC0000] text-[#FAF8F3] text-[11px] font-cinzel font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 px-2 rounded-lg bg-[#1DB954]/80 hover:bg-[#1DB954] text-[#FAF8F3] text-[11px] font-cinzel font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <span>Spotify</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <div className="flex items-center gap-1 bg-[#182317]/90 backdrop-blur-md border border-[#B89A58]/40 rounded-full p-1.5 shadow-xl hover:border-[#B89A58]/70 transition-all">
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[#F3EEE5] hover:text-[#FAF8F3] transition-all cursor-pointer"
            title="Hermoso Momento - Kairo Worship (Sesión Acústica)"
          >
            <div className="relative flex items-center justify-center">
              {isPlaying ? (
                <>
                  <span className="absolute -inset-1 rounded-full bg-[#B89A58]/25 animate-ping" />
                  <Volume2 className="w-4 h-4 text-[#B89A58] relative z-10" />
                </>
              ) : (
                <VolumeX className="w-4 h-4 text-[#89968C] relative z-10" />
              )}
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-[11px] font-cinzel tracking-wider text-[#FAF8F3] block font-bold leading-tight">
                {isPlaying ? 'Hermoso Momento' : 'Música'}
              </span>
              <span className="text-[9px] text-[#89968C] font-body block leading-tight">
                Kairo Worship (Live)
              </span>
            </div>
            {isPlaying && (
              <span className="flex items-center gap-0.5 ml-1" aria-hidden="true">
                <span className="w-0.5 h-2.5 bg-[#B89A58] rounded-full animate-bounce" />
                <span className="w-0.5 h-3.5 bg-[#FAF8F3] rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-0.5 h-2 bg-[#B89A58] rounded-full animate-bounce [animation-delay:300ms]" />
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="p-1.5 text-[#B89A58] hover:text-[#FAF8F3] rounded-full transition-colors cursor-pointer"
            title="Ver detalles de la canción"
          >
            <Music className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};

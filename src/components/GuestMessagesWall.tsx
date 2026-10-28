import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { MessageSquareHeart, Send, Music2 } from 'lucide-react';
import {
  BotanicalCorner,
  OliveBranch,
  EucalyptusBranch,
  WeddingRingsIcon,
} from './BotanicalDecorations';

export interface GuestMessageDoc {
  id: string;
  authorName: string;
  message: string;
  song?: string;
  createdAt?: Timestamp | null;
}

export async function saveGuestMessageToPage(
  rawAuthorName: string,
  rawMessage: string,
  rawSong?: string
): Promise<void> {
  const authorName = rawAuthorName.trim().slice(0, 100);
  const message = rawMessage.trim().slice(0, 1000);
  const song = rawSong ? rawSong.trim().slice(0, 200) : '';

  if (!authorName || !message) {
    return;
  }

  const payload: Record<string, unknown> = {
    authorName,
    message,
    createdAt: serverTimestamp(),
  };

  if (song) {
    payload.song = song;
  }

  try {
    await addDoc(collection(db, 'messages'), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'messages');
  }
}

interface GuestMessagesWallProps {
  onShowToast: (message: string) => void;
}

export const GuestMessagesWall: React.FC<GuestMessagesWallProps> = ({ onShowToast }) => {
  const [messages, setMessages] = useState<GuestMessageDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Listen to messages collection without strict index dependencies
    const q = query(
      collection(db, 'messages'),
      limit(100)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: GuestMessageDoc[] = snapshot.docs
          .map((docSnap) => {
            const data = docSnap.data();
            let parsedTimestamp: Timestamp | null = null;
            if (data.createdAt instanceof Timestamp) {
              parsedTimestamp = data.createdAt;
            } else if (data.createdAt && typeof data.createdAt.toDate === 'function') {
              parsedTimestamp = data.createdAt;
            } else if (typeof data.createdAt === 'string' || typeof data.createdAt === 'number') {
              parsedTimestamp = Timestamp.fromDate(new Date(data.createdAt));
            }

            return {
              id: docSnap.id,
              authorName: String(data.authorName || ''),
              message: String(data.message || ''),
              song: data.song ? String(data.song) : undefined,
              createdAt: parsedTimestamp,
            };
          })
          .filter((msg) => msg.authorName && msg.message && msg.authorName !== 'Test Node');

        // Sort descending: newest first (newly created messages without timestamp yet stay at the top)
        docs.sort((a, b) => {
          const timeA = a.createdAt ? a.createdAt.toMillis() : Date.now();
          const timeB = b.createdAt ? b.createdAt.toMillis() : Date.now();
          return timeB - timeA;
        });

        setMessages(docs);
        setLoading(false);
      },
      (error) => {
        console.error('Error reading messages:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handlePostMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      onShowToast('Por favor escribí tu nombre');
      return;
    }
    if (!messageText.trim()) {
      onShowToast('Por favor escribí tu mensaje para los novios');
      return;
    }

    setSubmitting(true);
    try {
      await saveGuestMessageToPage(authorName, messageText);
      setMessageText('');
      onShowToast('¡Tu mensaje para Cecilia y Ariel quedó publicado! 🌿💍');
    } catch {
      onShowToast('No se pudo publicar el mensaje. Intentá nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (ts?: Timestamp | null) => {
    if (!ts) return 'Recién publicado';
    try {
      return ts.toDate().toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'short',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto my-10 px-4" id="mensajes-novios">
      <div className="relative p-6 sm:p-8 rounded-3xl eucalyptus-card overflow-hidden">
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="bottom-right" />

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#182317] border border-[#B89A58]/50 text-[#B89A58] shadow-[0_0_20px_rgba(184,154,88,0.25)] mb-3">
            <MessageSquareHeart className="w-7 h-7 text-[#B89A58]" />
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-cinzel uppercase tracking-[0.35em] text-[#B89A58] font-semibold">
            <OliveBranch size={16} glow />
            <span>Libro de Bendiciones{messages.length > 0 ? ` (${messages.length})` : ''}</span>
            <div className="scale-x-[-1]">
              <OliveBranch size={16} glow />
            </div>
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl text-[#FAF8F3] font-bold tracking-wide mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Mensajes para Cecilia & Ariel 🌿
          </h3>

          <div className="eucalyptus-divider max-w-xs mx-auto my-3" />

          <p className="text-sm text-[#D1CAC3] font-body font-medium max-w-md mx-auto">
            Dejales tus bendiciones, anécdotas y buenos deseos a los novios para esta nueva etapa de sus vidas.
          </p>
        </div>

        {/* Form to write a message directly on the page */}
        <form
          onSubmit={handlePostMessage}
          className="space-y-3 text-left bg-[#182317]/55 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#6F7A69]/35 mb-7 shadow-inner"
        >
          <div>
            <label
              htmlFor="wall-author-name"
              className="block text-xs font-cinzel tracking-wider uppercase text-[#B89A58] font-bold mb-1"
            >
              Tu Nombre / Familia *
            </label>
            <input
              id="wall-author-name"
              type="text"
              required
              maxLength={100}
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Ej: Familia Morales / Tía Graciela"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141C12]/55 backdrop-blur-sm border border-[#6F7A69]/40 text-[#FAF8F3] placeholder-[#89968C] text-sm focus:outline-none focus:border-[#B89A58] transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="wall-message-text"
              className="block text-xs font-cinzel tracking-wider uppercase text-[#B89A58] font-bold mb-1"
            >
              Tu Mensaje para los Novios *
            </label>
            <textarea
              id="wall-message-text"
              rows={3}
              required
              maxLength={1000}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Que Dios bendiga su matrimonio con mucho amor, paz y felicidad..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141C12]/55 backdrop-blur-sm border border-[#6F7A69]/40 text-[#FAF8F3] placeholder-[#89968C] text-sm focus:outline-none focus:border-[#B89A58] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#293725] via-[#354730] to-[#293725] hover:from-[#354730] hover:to-[#41553c] disabled:opacity-50 text-[#FAF8F3] font-cinzel text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(41,55,37,0.35)] border border-[#B89A58]/45 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#B89A58]" />
            <span>{submitting ? 'Publicando...' : 'Publicar Mensaje en el Muro'}</span>
          </button>
        </form>

        {/* Messages Wall List */}
        <div className="space-y-3.5 text-left max-h-[420px] overflow-y-auto pr-1">
          {loading ? (
            <div className="text-center py-8 text-[#89968C] text-sm font-body">
              Cargando mensajes y bendiciones...
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-2xl bg-[#182317]/55 backdrop-blur-md border border-[#6F7A69]/25">
              <div className="flex justify-center mb-2">
                <WeddingRingsIcon size={24} />
              </div>
              <p className="text-sm text-[#D1CAC3] font-body">
                ¡Sé la primera persona en dejarle una bendición a Cecilia y Ariel! 🌿💍
              </p>
            </div>
          ) : (
            messages.map((item) => (
              <div
                key={item.id}
                className="relative p-4 rounded-2xl bg-[#182317]/55 backdrop-blur-md border border-[#6F7A69]/40 shadow-[0_4px_20px_rgba(20,28,18,0.75)] transition-all hover:border-[#B89A58]/50"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#293725]/80 border border-[#B89A58]/45 text-[#B89A58] text-xs font-cinzel font-bold">
                      {item.authorName.charAt(0).toUpperCase()}
                    </span>
                    <span className="font-cinzel text-sm font-bold text-[#FAF8F3] tracking-wide">
                      {item.authorName}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#89968C] font-body">
                    {formatDate(item.createdAt)}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#FAF8F3] font-body leading-relaxed pl-9 font-medium">
                  “{item.message}”
                </p>

                {item.song && (
                  <div className="mt-2 pl-9 flex items-center gap-1.5 text-xs text-[#B89A58] font-body">
                    <Music2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Tema sugerido: {item.song}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Camera, UploadCloud, ExternalLink, QrCode } from 'lucide-react';
import { BotanicalCorner, OliveBranch } from './BotanicalDecorations';

interface SharedAlbumCardProps {
  onShowToast?: (message: string) => void;
}

export const SharedAlbumCard: React.FC<SharedAlbumCardProps> = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  // Carpeta oficial de Google Drive para subir fotos y videos de la boda de Cecilia & Ariel
  const DRIVE_URL = 'https://drive.google.com/drive/folders/14LUmGzE1yiTKsw9X_ScWnA2pGKM3ftIf';

  useEffect(() => {
    // Generate inline QR code for the card pointing directly to the wedding folder
    QRCode.toDataURL(DRIVE_URL, {
      width: 380,
      margin: 1.5,
      color: {
        dark: '#293725',
        light: '#FAF8F3',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('Error generating card QR:', err));
  }, [DRIVE_URL]);

  return (
    <div className="relative w-full max-w-xl mx-auto my-8 px-4" id="album-fotos">
      <div className="relative p-6 sm:p-8 rounded-3xl eucalyptus-card overflow-hidden text-center">
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="bottom-right" />

        {/* Header icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#182317]/65 backdrop-blur-sm border border-[#B89A58]/50 text-[#B89A58] shadow-[0_0_20px_rgba(184,154,88,0.2)] mb-3">
          <Camera className="w-7 h-7 text-[#B89A58]" />
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-cinzel uppercase tracking-[0.35em] text-[#B89A58] font-semibold">
          <OliveBranch size={16} glow />
          <span>Recuerdos Inolvidables</span>
          <div className="scale-x-[-1]">
            <OliveBranch size={16} glow />
          </div>
        </div>

        <h3 className="font-cinzel text-2xl sm:text-3xl text-[#FAF8F3] font-bold tracking-wide mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Álbum de Fotos en Google Drive
        </h3>

        <div className="eucalyptus-divider max-w-xs mx-auto my-3" />

        <p className="text-sm sm:text-base text-[#F3EEE5] font-body font-medium max-w-md mx-auto leading-relaxed mb-6">
          ¡Queremos revivir cada sonrisa! Subí todas las fotos y videos que tomes desde los preparativos, reuniones previas con familia y amigos, hasta la ceremonia y la fiesta.
        </p>

        {/* QR Code Highlight Box inside the Invitation Card */}
        <div className="my-5 p-5 rounded-2xl bg-[#141C12]/55 backdrop-blur-md border border-[#6F7A69]/35 max-w-sm mx-auto shadow-inner flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#293725]/80 border border-[#B89A58]/40 text-[#B89A58] text-[10px] font-cinzel font-bold tracking-widest uppercase mb-3">
            <QrCode size={13} />
            <span>Escaneá o tocá para subir</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-[#FAF8F3] border-2 border-[#B89A58]/60 shadow-lg mb-3">
            {qrCodeUrl ? (
              <a
                href={DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir carpeta de Google Drive"
                className="block group"
              >
                <img
                  src={qrCodeUrl}
                  alt="Código QR Álbum Google Drive Cecilia y Ariel"
                  className="w-40 h-40 object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-200"
                />
              </a>
            ) : (
              <div className="w-40 h-40 flex items-center justify-center text-xs text-[#89968C]">
                Cargando QR...
              </div>
            )}
          </div>

          <p className="text-xs text-[#D1CAC3] font-body max-w-xs leading-snug">
            Apuntá con la cámara de tu teléfono o tocá el código para ingresar directamente a la carpeta de Google Drive.
          </p>
        </div>

        {/* Action Button: Open Drive */}
        <div className="flex justify-center mt-6">
          <a
            href={DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#293725] via-[#354730] to-[#293725] hover:from-[#354730] hover:to-[#41553c] text-[#FAF8F3] font-cinzel font-bold text-xs sm:text-sm uppercase tracking-[0.18em] border border-[#B89A58]/55 shadow-[0_0_20px_rgba(41,55,37,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <UploadCloud className="w-5 h-5 text-[#B89A58]" />
            <span>Abrir Google Drive</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
};

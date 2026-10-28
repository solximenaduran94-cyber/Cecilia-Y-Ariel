import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { X, Printer, Download, Camera, Heart, Sparkles, ExternalLink, Mail } from 'lucide-react';
import { OliveBranch, EucalyptusBranch, WeddingRingsIcon } from './BotanicalDecorations';

interface PrintableTableSignModalProps {
  isOpen: boolean;
  onClose: () => void;
  driveEmail: string;
  driveUrl: string;
  onShowToast?: (msg: string) => void;
}

export const PrintableTableSignModal: React.FC<PrintableTableSignModalProps> = ({
  isOpen,
  onClose,
  driveEmail,
  driveUrl,
  onShowToast,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const printAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Generate high resolution QR code for printing (width 700px)
    QRCode.toDataURL(driveUrl, {
      width: 700,
      margin: 2,
      color: {
        dark: '#293725', // Verde bosque profundo de la paleta
        light: '#FAF8F3', // Blanco cálido de fondo
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR:', err));
  }, [driveUrl]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `QR_Fotos_Mesa_Boda_Cecilia_y_Ariel.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onShowToast) {
      onShowToast('¡Código QR descargado con éxito!');
    }
  };

  return (
    <>
      {/* Print-specific style override */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-table-sign, #printable-table-sign * {
            visibility: visible !important;
          }
          #printable-table-sign {
            position: fixed !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 140mm !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 24px !important;
            background: #FAF8F3 !important;
            color: #293725 !important;
            border: 2px solid #B89A58 !important;
            box-shadow: none !important;
            border-radius: 18px !important;
            z-index: 999999 !important;
            page-break-inside: avoid !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Modal Backdrop */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="table-sign-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-lg my-auto rounded-3xl bg-[#182317] border border-[#B89A58]/50 shadow-2xl p-5 sm:p-7 text-center overflow-hidden animate-scaleUp text-[#FAF8F3]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#141C12] text-[#89968C] hover:text-[#FAF8F3] border border-[#6F7A69]/40 transition-colors cursor-pointer z-20 no-print"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header Tag */}
          <div className="no-print inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#293725] border border-[#B89A58]/45 text-[#B89A58] text-[10px] font-cinzel font-bold tracking-widest uppercase mb-3">
            <Camera size={14} />
            <span>Cartel para las Mesas · Listo para Imprimir</span>
          </div>

          <h3 id="table-sign-title" className="no-print font-cinzel text-xl sm:text-2xl font-bold text-[#FAF8F3] mb-1">
            Cartel de Mesa con Código QR
          </h3>
          <p className="no-print text-xs text-[#D1CAC3] font-body mb-4">
            Podés imprimir este diseño para colocar uno en cada mesa o soporte de fotos durante la fiesta.
          </p>

          {/* THE ACTUAL PRINTABLE CARD (Card style for preview and print) */}
          <div
            id="printable-table-sign"
            ref={printAreaRef}
            className="relative p-6 sm:p-7 rounded-2xl bg-[#FAF8F3] text-[#293725] border-2 border-[#B89A58] shadow-xl text-center select-text"
          >
            {/* Top botanical ornaments */}
            <div className="flex items-center justify-center gap-2 mb-1">
              <OliveBranch size={20} glow={false} />
              <WeddingRingsIcon size={22} />
              <div className="scale-x-[-1]">
                <OliveBranch size={20} glow={false} />
              </div>
            </div>

            <p className="font-script text-3xl sm:text-4xl text-[#293725] leading-tight">
              ¡Compartí tus fotos con nosotros!
            </p>

            <h4 className="font-cinzel text-lg sm:text-xl font-black text-[#293725] tracking-[0.18em] uppercase mt-1 mb-0.5">
              CECILIA <span className="text-[#B89A58]">&</span> ARIEL
            </h4>

            <p className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#6F7A69] font-bold mb-3">
              Viernes 20 de Noviembre de 2026
            </p>

            {/* Inner Border Frame */}
            <div className="w-16 h-px bg-[#B89A58]/60 mx-auto my-2" />

            {/* QR Code Container */}
            <div className="my-3 flex flex-col items-center justify-center">
              <div className="p-2.5 rounded-2xl bg-white border-2 border-[#B89A58]/50 shadow-md">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Código QR para subir fotos a Google Drive - Boda Cecilia y Ariel"
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center text-xs text-[#89968C]">
                    Generando código QR...
                  </div>
                )}
              </div>
            </div>

            {/* Instruction Callout */}
            <p className="font-serif-luxury italic text-xs sm:text-sm text-[#293725] max-w-xs mx-auto leading-relaxed mt-2">
              “Escaneá este código QR con la cámara de tu celular y subí todas las fotos y videos que tomes hoy para que nos queden de recuerdo para toda la vida.”
            </p>

            {/* Account pill */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EEE5] border border-[#B89A58]/40 text-[11px] font-cinzel text-[#293725]">
              <Mail className="w-3.5 h-3.5 text-[#B89A58]" />
              <span className="font-medium">Drive: {driveEmail}</span>
            </div>

            <p className="mt-2 text-[10px] font-cinzel tracking-wider text-[#6F7A69] uppercase font-semibold">
              ¡Gracias por acompañarnos y ser parte de nuestra historia! 🌿💍
            </p>
          </div>

          {/* Action Buttons (Excluded from print) */}
          <div className="no-print flex flex-col sm:flex-row gap-2.5 justify-center mt-5">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#293725] via-[#354730] to-[#293725] hover:from-[#354730] hover:to-[#41553c] text-[#FAF8F3] font-cinzel text-xs font-bold uppercase tracking-wider cursor-pointer border border-[#B89A58]/55 shadow-lg transition-transform hover:scale-[1.02]"
            >
              <Printer className="w-4 h-4 text-[#B89A58]" />
              <span>Imprimir Cartel (A4 / Mesa)</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadQr}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#141C12] hover:bg-[#293725] border border-[#6F7A69]/40 text-[#D1CAC3] hover:text-[#FAF8F3] font-cinzel text-xs tracking-wider cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4 text-[#B89A58]" />
              <span>Descargar Imagen QR</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-transparent border border-[#6F7A69]/30 text-[#89968C] hover:text-[#FAF8F3] font-cinzel text-xs cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

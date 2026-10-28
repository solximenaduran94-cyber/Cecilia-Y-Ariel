import React, { useState } from 'react';
import { Gift, Copy, Check, CreditCard } from 'lucide-react';
import { BotanicalCorner, WeddingRingsIcon } from './BotanicalDecorations';

interface GiftAliasCardProps {
  onShowToast: (message: string) => void;
}

export const GiftAliasCard: React.FC<GiftAliasCardProps> = ({ onShowToast }) => {
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [copiedCbu, setCopiedCbu] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const bankDetails = {
    alias: 'casamientoayc26',
    cbu: '4530000800010991887054',
    accountNumber: '1099188705',
    accountType: 'Caja de ahorro en pesos',
    titular: 'Cecilia Mariel Mazzuca',
    cuil: '27320232533',
    entity: 'Naranja X',
  };

  const copyToClipboard = (text: string, type: 'alias' | 'cbu' | 'all') => {
    navigator.clipboard.writeText(text);
    if (type === 'alias') {
      setCopiedAlias(true);
      onShowToast(`¡Alias "${text}" copiado al portapapeles!`);
      setTimeout(() => setCopiedAlias(false), 2500);
    } else if (type === 'cbu') {
      setCopiedCbu(true);
      onShowToast(`¡CBU "${text}" copiado al portapapeles!`);
      setTimeout(() => setCopiedCbu(false), 2500);
    } else {
      setCopiedAll(true);
      onShowToast('¡Todos los datos bancarios fueron copiados!');
      setTimeout(() => setCopiedAll(false), 2500);
    }
  };

  const handleCopyAll = () => {
    const fullText = [
      `👰 BODA CECILIA & ARIEL - LUNA DE MIEL 🌿`,
      `Entidad: ${bankDetails.entity}`,
      `Titular: ${bankDetails.titular}`,
      `CUIL: ${bankDetails.cuil}`,
      `Alias: ${bankDetails.alias}`,
      `CBU: ${bankDetails.cbu}`,
      `Caja de Ahorro: ${bankDetails.accountNumber}`,
    ].join('\n');
    copyToClipboard(fullText, 'all');
  };

  return (
    <div className="relative w-full max-w-xl mx-auto my-10 px-4" id="regalos">
      <div className="relative p-6 sm:p-9 rounded-3xl eucalyptus-card overflow-hidden">
        <BotanicalCorner position="top-right" />
        <BotanicalCorner position="bottom-left" />

        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#182317]/65 backdrop-blur-sm border border-[#B89A58]/45 text-[#B89A58] shadow-[0_0_20px_rgba(184,154,88,0.2)] mb-3">
            <Gift className="w-7 h-7 text-[#B89A58]" />
          </div>
          <span className="block text-xs font-cinzel uppercase tracking-[0.35em] text-[#B89A58] font-semibold">
            Luna de Miel & Buenos Deseos
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl text-[#FAF8F3] font-bold tracking-wide mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Regalos & Transferencia
          </h3>
          <div className="eucalyptus-divider max-w-xs mx-auto my-3" />
        </div>

        <p className="text-center text-[#F3EEE5] text-sm sm:text-base font-body max-w-md mx-auto leading-relaxed font-medium">
          Nuestro mayor y mejor regalo es tu presencia y bendición en este día tan soñado.
          Si deseás hacernos un presente para colaborar con nuestra luna de miel, podés hacerlo a través de transferencia bancaria:
        </p>

        {/* Bank Transfer Details Card */}
        <div className="mt-6 p-4 sm:p-6 rounded-2xl bg-[#182317]/55 backdrop-blur-md border border-[#6F7A69]/35 shadow-xl text-left">
          {/* Header of Bank Box */}
          <div className="flex items-center justify-between pb-3 border-b border-[#D1CAC3]/20 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#293725]/80 border border-[#B89A58]/40 flex items-center justify-center text-[#B89A58]">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-cinzel uppercase tracking-wider text-[#D1CAC3] font-medium block">
                  Entidad Bancaria
                </span>
                <span className="font-cinzel text-base font-extrabold text-[#B89A58]">
                  {bankDetails.entity}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyAll}
              className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#293725]/80 hover:bg-[#354730] border border-[#6F7A69]/40 text-xs font-cinzel text-[#F3EEE5] hover:text-[#FAF8F3] transition-all cursor-pointer shadow-sm"
              title="Copiar todos los datos de la cuenta"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#B89A58]" />}
              <span>{copiedAll ? '¡Copiados!' : 'Copiar Todo'}</span>
            </button>
          </div>

          {/* Key fields */}
          <div className="space-y-3.5">
            {/* Alias Box */}
            <div className="p-3.5 rounded-xl bg-[#1C271A]/60 backdrop-blur-sm border border-[#6F7A69]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#89968C] block">
                  Alias de Transferencia
                </span>
                <span className="font-mono text-lg sm:text-xl font-bold text-[#FAF8F3] tracking-wide select-all">
                  {bankDetails.alias}
                </span>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(bankDetails.alias, 'alias')}
                className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg bg-gradient-to-r from-[#293725] to-[#354730] hover:from-[#354730] hover:to-[#3E5139] border border-[#B89A58]/50 text-[#FAF8F3] font-cinzel text-xs font-bold tracking-wider cursor-pointer shadow-md transition-all"
              >
                {copiedAlias ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#B89A58]" />
                    <span>Copiar Alias</span>
                  </>
                )}
              </button>
            </div>

            {/* CBU Box */}
            <div className="p-3.5 rounded-xl bg-[#1C271A]/60 backdrop-blur-sm border border-[#6F7A69]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#89968C] block">
                  CBU
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-[#FAF8F3] tracking-wide select-all break-all">
                  {bankDetails.cbu}
                </span>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(bankDetails.cbu, 'cbu')}
                className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg bg-[#293725]/80 hover:bg-[#354730] border border-[#6F7A69]/40 text-[#F3EEE5] font-cinzel text-xs font-semibold tracking-wider cursor-pointer shadow-sm transition-all shrink-0"
              >
                {copiedCbu ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#B89A58]" />
                    <span>Copiar CBU</span>
                  </>
                )}
              </button>
            </div>

            {/* Supplementary Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
              <div className="p-2.5 rounded-lg bg-[#141C12]/55 backdrop-blur-sm border border-[#6F7A69]/25">
                <span className="text-[#89968C] block font-cinzel uppercase">Titular de Cuenta</span>
                <span className="text-[#FAF8F3] font-medium text-sm">{bankDetails.titular}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#141C12]/55 backdrop-blur-sm border border-[#6F7A69]/25">
                <span className="text-[#89968C] block font-cinzel uppercase">CUIL</span>
                <span className="text-[#FAF8F3] font-mono font-medium text-sm">{bankDetails.cuil}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#141C12]/55 backdrop-blur-sm border border-[#6F7A69]/25 sm:col-span-2">
                <span className="text-[#89968C] block font-cinzel uppercase">Caja de Ahorro en Pesos</span>
                <span className="text-[#FAF8F3] font-mono font-medium text-sm">{bankDetails.accountNumber}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-[#D1CAC3] font-body mt-5 flex items-center justify-center gap-1.5">
          <WeddingRingsIcon size={16} />
          <span>¡Muchísimas gracias por tu generosidad y cariño!</span>
          <WeddingRingsIcon size={16} />
        </p>
      </div>
    </div>
  );
};

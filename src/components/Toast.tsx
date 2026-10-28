import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#182317]/95 text-[#FAF8F3] border border-[#B89A58]/50 shadow-2xl backdrop-blur-md animate-bounce-subtle pointer-events-none">
      <div className="w-5 h-5 rounded-full bg-[#293725] border border-[#B89A58]/50 flex items-center justify-center text-[#B89A58] shrink-0">
        <Check className="w-3.5 h-3.5" />
      </div>
      <span className="text-xs font-cinzel tracking-wider text-[#FAF8F3] whitespace-nowrap">
        {message}
      </span>
    </div>
  );
};

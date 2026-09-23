import React from 'react';
import { Image, Video, Mic, CheckCircle2, Sparkles } from 'lucide-react';
import { MediaType, MODALITY_CONFIGS } from '../../types/media';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface ModalitySelectorProps {
  selectedModality: MediaType;
  onSelect: (type: MediaType) => void;
  disabled?: boolean;
}

export const ModalitySelector: React.FC<ModalitySelectorProps> = ({
  selectedModality,
  onSelect,
  disabled = false,
}) => {
  const getIcon = (type: MediaType) => {
    switch (type) {
      case 'IMAGE':
        return <Image className="w-6 h-6" />;
      case 'VIDEO':
        return <Video className="w-6 h-6" />;
      case 'AUDIO':
        return <Mic className="w-6 h-6" />;
    }
  };

  const modalities: MediaType[] = ['IMAGE', 'VIDEO', 'AUDIO'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {modalities.map(type => {
        const config = MODALITY_CONFIGS[type];
        const isSelected = selectedModality === type;

        return (
          <motion.div
            key={type}
            whileHover={!disabled ? { y: -2 } : undefined}
            whileTap={!disabled ? { scale: 0.99 } : undefined}
            onClick={() => !disabled && onSelect(type)}
            className={clsx(
              'relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left select-none overflow-hidden',
              isSelected
                ? 'bg-gradient-to-br from-[#151D2A] to-[#0F131C] border-cyan-500/60 shadow-[0_0_25px_-5px_rgba(56,189,248,0.25)]'
                : 'bg-[#10131B]/70 border-slate-800 hover:border-slate-700 hover:bg-[#131722]/80',
              disabled && 'opacity-60 cursor-not-allowed'
            )}
          >
            {/* Active glow accent line */}
            {isSelected && (
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            )}

            <div className="flex items-start justify-between mb-3">
              <div
                className={clsx(
                  'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-inner'
                    : 'bg-slate-800/80 text-slate-400 border border-slate-700/80'
                )}
              >
                {getIcon(type)}
              </div>

              <div className="flex items-center gap-1.5">
                <span
                  className={clsx(
                    'text-[10px] font-mono px-2 py-0.5 rounded-full border',
                    isSelected
                      ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  )}
                >
                  {config.badgeText}
                </span>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 animate-in fade-in" />
                )}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>{config.title}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                {config.description}
              </p>
            </div>

            {/* Supported format tags */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex gap-1.5">
                {config.acceptedExtensions.slice(0, 4).map(ext => (
                  <span key={ext} className="text-slate-400 font-semibold">
                    {ext.replace('.', '').toUpperCase()}
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-slate-400 font-sans">
                Max {config.maxSizeMB}MB
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

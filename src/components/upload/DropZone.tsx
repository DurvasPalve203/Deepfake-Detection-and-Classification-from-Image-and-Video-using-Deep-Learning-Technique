import React, { useRef } from 'react';
import { UploadCloud, AlertCircle, ShieldAlert } from 'lucide-react';
import { MediaType, MODALITY_CONFIGS } from '../../types/media';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface DropZoneProps {
  mediaType: MediaType;
  isDragOver: boolean;
  errorMessage?: string | null;
  onFileSelect: (file: File) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({
  mediaType,
  isDragOver,
  errorMessage,
  onFileSelect,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const config = MODALITY_CONFIGS[mediaType];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Target Area */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={clsx(
          'relative p-8 sm:p-12 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center group overflow-hidden',
          isDragOver
            ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_40px_rgba(56,189,248,0.2)]'
            : 'border-slate-700/80 hover:border-cyan-500/50 bg-[#0F131C]/90 hover:bg-[#131824]'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={config.acceptedExtensions.join(',')}
          className="hidden"
          onChange={handleInputChange}
        />

        {/* Animated Background Scanner Radar Line during hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="w-full h-full radar-grid opacity-20" />
        </div>

        {/* Center Icon */}
        <motion.div
          animate={isDragOver ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/10 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-lg group-hover:border-cyan-400/60 group-hover:shadow-cyan-500/10"
        >
          <UploadCloud className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
        </motion.div>

        {/* Text descriptions */}
        <div className="max-w-md space-y-1.5 relative z-10">
          <h4 className="text-base sm:text-lg font-bold text-slate-100 font-['Plus_Jakarta_Sans']">
            Drop your {config.shortTitle.toLowerCase()} file here, or{' '}
            <span className="text-cyan-400 underline underline-offset-4 decoration-cyan-500/40 group-hover:decoration-cyan-400">
              browse system
            </span>
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Forensic analysis supports {config.acceptedExtensions.map(e => e.toUpperCase().replace('.', '')).join(', ')} files up to {config.maxSizeMB}MB
          </p>
        </div>

        {/* Security / Privacy Seal */}
        <div className="mt-6 flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
          <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
          <span>Local Client Evaluation • No external cloud retention</span>
        </div>
      </div>

      {/* Error notification banner */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-start gap-3 text-xs text-rose-300"
        >
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </motion.div>
      )}

    </div>
  );
};

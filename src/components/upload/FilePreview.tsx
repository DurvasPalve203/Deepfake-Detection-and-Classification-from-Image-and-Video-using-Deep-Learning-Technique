import React from 'react';
import { Trash2, RefreshCw, Play, Volume2, Shield, FileCheck, CheckCircle2 } from 'lucide-react';
import { MediaType, FileMetadata } from '../../types/media';
import { formatBytes } from '../../utils/formatters';
import { Button } from '../common/Button';
import { motion } from 'framer-motion';

interface FilePreviewProps {
  mediaType: MediaType;
  file: File;
  metadata: FileMetadata;
  isAnalyzing: boolean;
  onRemove: () => void;
  onReplace: () => void;
  onAnalyze: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({
  mediaType,
  file,
  metadata,
  isAnalyzing,
  onRemove,
  onReplace,
  onAnalyze,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-5"
    >
      {/* Media Preview Container */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-[#0B0D13] shadow-2xl flex items-center justify-center min-h-[260px] max-h-[460px]">
        {mediaType === 'IMAGE' && (
          <img
            src={metadata.previewUrl}
            alt={file.name}
            className="w-full h-full object-contain max-h-[440px] select-none"
          />
        )}

        {mediaType === 'VIDEO' && (
          <video
            src={metadata.previewUrl}
            controls
            className="w-full h-full max-h-[440px] rounded-xl outline-none"
          />
        )}

        {mediaType === 'AUDIO' && (
          <div className="w-full p-8 flex flex-col items-center justify-center space-y-6">
            <div className="w-20 h-20 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-xl">
              <Volume2 className="w-10 h-10 animate-pulse" />
            </div>

            {/* Simulated soundwave visualizer */}
            <div className="flex items-center justify-center gap-1.5 h-12 w-full max-w-md px-4">
              {Array.from({ length: 32 }).map((_, i) => {
                const height = Math.sin(i * 0.4) * 20 + 24;
                return (
                  <div
                    key={i}
                    style={{ height: `${height}px` }}
                    className="flex-1 bg-gradient-to-t from-cyan-500 to-indigo-500 rounded-full opacity-70"
                  />
                );
              })}
            </div>

            <audio src={metadata.previewUrl} controls className="w-full max-w-md rounded-lg" />
          </div>
        )}

        {/* Top Status Pill Overlay */}
        <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-lg">
          <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Ingested • Ready for model</span>
        </div>
      </div>

      {/* File Details & Inspector Bar */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h5 className="text-sm font-bold text-slate-100 truncate">{file.name}</h5>
            <div className="flex items-center gap-2.5 text-xs text-slate-400 font-mono mt-0.5">
              <span>{formatBytes(file.size)}</span>
              <span>•</span>
              <span className="uppercase">{file.type || mediaType}</span>
            </div>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            type="button"
            disabled={isAnalyzing}
            onClick={onReplace}
            className="px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/80 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Replace</span>
          </button>
          <button
            type="button"
            disabled={isAnalyzing}
            onClick={onRemove}
            className="px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-900/50 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>
      </div>

      {/* Main Trigger Button */}
      <div className="pt-2">
        <Button
          size="lg"
          variant="primary"
          isLoading={isAnalyzing}
          onClick={onAnalyze}
          className="w-full py-4 text-base font-bold shadow-xl shadow-cyan-500/20 glow-blue"
          leftIcon={<Play className="w-5 h-5 fill-current" />}
        >
          {isAnalyzing ? 'Running Forensic Pipeline...' : `Execute ${mediaType} Deepfake Detection`}
        </Button>
      </div>
    </motion.div>
  );
};

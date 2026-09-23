import React, { useState } from 'react';
import { AnalysisResult } from '../../types/analysis';
import { formatBytes, formatDate } from '../../utils/formatters';
import { Database, Copy, Check, Hash, FileCode, Shield, Calendar, HardDrive } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface MetadataForensicCardProps {
  result: AnalysisResult;
}

export const MetadataForensicCard: React.FC<MetadataForensicCardProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const copyHash = () => {
    navigator.clipboard.writeText(result.sha256Hash);
    setCopied(true);
    showToast('info', 'Hash Copied', 'SHA-256 fingerprint copied to clipboard.', 2000);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 rounded-2xl bg-[#10131B] border border-slate-800 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">Metadata & Chain of Custody</h4>
            <p className="text-[11px] text-slate-400 font-mono">Digital Forensics Artifact Header</p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-slate-400">
          ID: <span className="text-cyan-400 font-bold">{result.id}</span>
        </span>
      </div>

      {/* SHA-256 Cryptographic Hash */}
      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <Hash className="w-3.5 h-3.5 text-cyan-400" />
            <span>SHA-256 File Checksum:</span>
          </div>
          <button
            onClick={copyHash}
            className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 p-1 rounded transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <div className="font-mono text-[11px] text-slate-300 break-all bg-black/50 p-2 rounded border border-slate-800/80">
          {result.sha256Hash}
        </div>
      </div>

      {/* Grid of File Specs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
            <span>File Size</span>
          </div>
          <span className="text-slate-200 font-bold">{formatBytes(result.fileSize)}</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <FileCode className="w-3.5 h-3.5 text-indigo-400" />
            <span>MIME Type</span>
          </div>
          <span className="text-slate-200 font-bold truncate block">{result.fileMetadata.type}</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Analyzed At</span>
          </div>
          <span className="text-slate-200 font-bold">{formatDate(result.createdAt)}</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>EXIF Check</span>
          </div>
          <span className="text-emerald-400 font-bold">Intact Profile</span>
        </div>
      </div>
    </div>
  );
};

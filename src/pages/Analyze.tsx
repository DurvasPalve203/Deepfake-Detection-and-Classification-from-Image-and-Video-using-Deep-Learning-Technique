import React from 'react';
import { MediaUploader } from '../components/upload/MediaUploader';
import { ShieldCheck, HelpCircle, FileSearch, Sparkles, Terminal } from 'lucide-react';
import { Card } from '../components/common/Card';

export const Analyze: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
          <span>Deep Forensic Inspection Engine</span>
        </div>
        <h2 className="text-3xl font-black text-slate-100 font-['Plus_Jakarta_Sans'] tracking-tight">
          Analyze Media Authenticity
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Upload an image, video, or audio file to inspect for generative AI synthesis, face swapping, temporal glitching, and cloned audio.
        </p>
      </div>

      {/* Main Core Media Uploader */}
      <MediaUploader initialModality="IMAGE" />

      {/* Inspection Guidelines / Technical Notes Card */}
      <div className="max-w-4xl mx-auto pt-6 border-t border-slate-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-200 flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Vision Analysis
            </span>
            <p className="text-slate-400 leading-relaxed">
              Spatial noise decomposition, 2D-FFT frequency spectrum analysis, and Grad-CAM class activation mapping.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-200 flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Temporal Tracking
            </span>
            <p className="text-slate-400 leading-relaxed">
              Spatiotemporal 3D-CNN frame evaluation, optical flow trajectories, and physiological landmark consistency.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-200 flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Acoustic Cloning
            </span>
            <p className="text-slate-400 leading-relaxed">
              Mel-spectrogram density mapping, neural vocoder phase artifacts, and synthetic vocal tract resonance tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

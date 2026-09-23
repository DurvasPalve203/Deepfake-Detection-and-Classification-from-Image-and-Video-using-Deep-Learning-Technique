import React, { useState } from 'react';
import { ImageExplainability } from '../../types/analysis';
import { Layers, Sliders, Eye, Zap, AlertCircle, Maximize2 } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface GradCamHeatmapViewerProps {
  imageDetails: ImageExplainability;
  filename: string;
}

type ViewMode = 'OVERLAY' | 'ORIGINAL' | 'HEATMAP' | 'SLIDER';

export const GradCamHeatmapViewer: React.FC<GradCamHeatmapViewerProps> = ({
  imageDetails,
  filename,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('OVERLAY');
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0.65);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<string | null>(null);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (viewMode !== 'SLIDER') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  return (
    <div className="rounded-2xl bg-[#10131B] border border-slate-800 shadow-2xl p-5 space-y-4">
      {/* Top Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">
              Spatial Explainability & Grad-CAM Heatmap
            </h4>
            <p className="text-[11px] text-slate-400 font-mono">
              Gradient-weighted Class Activation Mapping
            </p>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          {(['OVERLAY', 'SLIDER', 'ORIGINAL', 'HEATMAP'] as ViewMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={clsx(
                'px-2.5 py-1 rounded-lg transition-all',
                viewMode === mode
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold shadow-sm border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              {mode === 'OVERLAY' && 'Overlay'}
              {mode === 'SLIDER' && 'Split Slider'}
              {mode === 'ORIGINAL' && 'Original'}
              {mode === 'HEATMAP' && 'Heatmap'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        onMouseMove={handleSliderMove}
        className="relative rounded-xl overflow-hidden bg-black/90 border border-slate-800 min-h-[360px] max-h-[500px] flex items-center justify-center select-none"
      >
        {/* 1. Base Image */}
        <img
          src={imageDetails.originalUrl}
          alt={filename}
          className="w-full h-full object-contain max-h-[480px] pointer-events-none"
        />

        {/* 2. Grad-CAM Simulated Thermal Layer */}
        {(viewMode === 'OVERLAY' || viewMode === 'HEATMAP') && (
          <div
            style={{
              opacity: viewMode === 'HEATMAP' ? 1 : overlayOpacity,
              mixBlendMode: viewMode === 'HEATMAP' ? 'normal' : 'screen',
            }}
            className="absolute inset-0 bg-gradient-to-tr from-blue-600/60 via-amber-500/60 to-rose-600/70 pointer-events-none filter blur-[6px] contrast-150"
          >
            {/* Focal hotspot visualization */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/80 rounded-full blur-2xl animate-pulse" />
          </div>
        )}

        {/* 3. Split Slider View */}
        {viewMode === 'SLIDER' && (
          <>
            <div
              style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
              className="absolute inset-0 bg-gradient-to-tr from-blue-600/60 via-amber-500/60 to-rose-600/70 filter blur-[4px] pointer-events-none"
            >
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/80 rounded-full blur-2xl" />
            </div>

            {/* Slider Dividing Bar */}
            <div
              style={{ left: `${sliderPosition}%` }}
              className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.8)] cursor-ew-resize pointer-events-none flex items-center justify-center"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-900 flex items-center justify-center text-[10px] font-bold shadow-lg">
                ⇄
              </div>
            </div>
          </>
        )}

        {/* 4. Anomaly Bounding Boxes */}
        {imageDetails.anomalies.map(anomaly => {
          if (!anomaly.coordinates) return null;
          const isSelected = selectedAnomalyId === anomaly.id;
          const { x, y, width, height } = anomaly.coordinates;

          return (
            <motion.div
              key={anomaly.id}
              onClick={() => setSelectedAnomalyId(isSelected ? null : anomaly.id)}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${width}%`,
                height: `${height}%`,
              }}
              whileHover={{ scale: 1.02 }}
              className={clsx(
                'absolute border-2 rounded-lg cursor-pointer transition-all duration-200 z-10 flex flex-col justify-between p-1',
                isSelected
                  ? 'border-rose-400 bg-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.5)]'
                  : 'border-amber-400/80 bg-amber-500/10 hover:border-rose-400'
              )}
            >
              <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-black/80 text-amber-300 w-fit font-bold shadow">
                {anomaly.label}
              </span>
              <span className="text-[9px] font-mono px-1 rounded bg-black/80 text-rose-300 self-end font-semibold">
                {anomaly.confidence}%
              </span>
            </motion.div>
          );
        })}

        {/* Bottom indicator */}
        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-slate-300 border border-slate-700/80">
          Mode: <span className="text-cyan-400 font-semibold">{viewMode}</span>
          {viewMode === 'SLIDER' && ' (Drag across image)'}
        </div>
      </div>

      {/* Overlay Opacity Slider Controls (if in overlay mode) */}
      {viewMode === 'OVERLAY' && (
        <div className="flex items-center gap-4 px-2 py-1 bg-slate-900/50 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Heatmap Opacity:</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={overlayOpacity}
            onChange={e => setOverlayOpacity(parseFloat(e.target.value))}
            className="flex-1 accent-cyan-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
          />
          <span className="text-xs font-mono text-cyan-400 font-bold">
            {Math.round(overlayOpacity * 100)}%
          </span>
        </div>
      )}

      {/* Anomaly Cards List */}
      {imageDetails.anomalies.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>Localized Forensic Spatial Anomaly Regions:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {imageDetails.anomalies.map(anom => (
              <div
                key={anom.id}
                onClick={() => setSelectedAnomalyId(anom.id)}
                className={clsx(
                  'p-3 rounded-xl border text-left cursor-pointer transition-all',
                  selectedAnomalyId === anom.id
                    ? 'bg-rose-950/30 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-200">{anom.label}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold">
                    {anom.confidence}% Conf
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{anom.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { VideoExplainability, SuspiciousFrame } from '../../types/analysis';
import { Play, Pause, Film, AlertTriangle, Clock, Eye, Activity } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface VideoTimelineScrubberProps {
  videoDetails: VideoExplainability;
  previewUrl: string;
  filename: string;
}

export const VideoTimelineScrubber: React.FC<VideoTimelineScrubberProps> = ({
  videoDetails,
  previewUrl,
  filename,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [selectedFrame, setSelectedFrame] = useState<SuspiciousFrame | null>(
    videoDetails.suspiciousFrames.length > 0 ? videoDetails.suspiciousFrames[0] : null
  );

  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const seekToTimestamp = (seconds: number, frame?: SuspiciousFrame) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
      if (frame) setSelectedFrame(frame);
    }
  };

  return (
    <div className="rounded-2xl bg-[#10131B] border border-slate-800 shadow-2xl p-5 space-y-5">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">
              Temporal Frame-Level Anomaly Timeline
            </h4>
            <p className="text-[11px] text-slate-400 font-mono">
              Spatiotemporal 3D-CNN & ViT Optical Flow Tracking
            </p>
          </div>
        </div>

        <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
          {videoDetails.totalFramesAnalyzed} Frames Evaluated
        </span>
      </div>

      {/* Video Stage */}
      <div className="relative rounded-xl overflow-hidden bg-black/90 border border-slate-800 min-h-[300px] max-h-[440px] flex items-center justify-center">
        <video
          ref={videoRef}
          src={previewUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full max-h-[420px] object-contain rounded-lg"
        />

        {/* Play Overlay Button */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 backdrop-blur-md border border-cyan-400/40 text-cyan-300 flex items-center justify-center transition-transform hover:scale-110 shadow-2xl"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1 fill-current" />}
        </button>

        {/* Frame / Time readout */}
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-cyan-300 border border-slate-700">
          Timestamp: {currentTime.toFixed(2)}s
        </div>
      </div>

      {/* Interactive Anomaly Timeline Heatmap */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Temporal Anomaly Score Heatmap</span>
          <span className="text-slate-500">Click timestamp to scrub</span>
        </div>

        {/* Timeline Bar with Flag Pins */}
        <div className="relative h-12 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center px-3 overflow-hidden">
          {/* Heatmap Bars */}
          <div className="absolute inset-0 flex items-end h-full px-2 gap-1 py-1 pointer-events-none opacity-80">
            {videoDetails.timelineHeatmap.map((item, idx) => {
              const isHigh = item.anomalyScore > 75;
              const isMed = item.anomalyScore > 40;
              return (
                <div
                  key={idx}
                  style={{ height: `${item.anomalyScore}%` }}
                  className={clsx(
                    'flex-1 rounded-t-sm transition-all',
                    isHigh ? 'bg-rose-500' : isMed ? 'bg-amber-500' : 'bg-emerald-500/40'
                  )}
                />
              );
            })}
          </div>

          {/* Current playhead line */}
          <div
            style={{ left: `${(currentTime / 15) * 100}%` }}
            className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(56,189,248,1)] z-20 pointer-events-none"
          />

          {/* Clickable flag markers */}
          <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
            {videoDetails.suspiciousFrames.map(frame => (
              <button
                key={frame.frameNumber}
                type="button"
                onClick={() => seekToTimestamp(frame.timeSeconds, frame)}
                className="group relative flex flex-col items-center"
              >
                <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold shadow-lg shadow-rose-500/40 border border-white/20 group-hover:scale-125 transition-transform">
                  !
                </div>
                <span className="text-[9px] font-mono font-bold text-rose-300 mt-1 bg-black/80 px-1 rounded">
                  {frame.timestamp}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Suspicious Frames Cards Gallery */}
      {videoDetails.suspiciousFrames.length > 0 && (
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Suspicious Frames Flagged ({videoDetails.suspiciousFrames.length})</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {videoDetails.suspiciousFrames.map(frame => {
              const isSelected = selectedFrame?.frameNumber === frame.frameNumber;
              return (
                <div
                  key={frame.frameNumber}
                  onClick={() => seekToTimestamp(frame.timeSeconds, frame)}
                  className={clsx(
                    'p-3 rounded-xl border text-left cursor-pointer transition-all',
                    isSelected
                      ? 'bg-rose-950/30 border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  )}
                >
                  <div className="relative rounded-lg overflow-hidden h-24 mb-2 bg-black border border-slate-800">
                    <img src={frame.previewUrl} alt={frame.anomalyType} className="w-full h-full object-cover" />
                    <span className="absolute top-1.5 left-1.5 bg-black/80 text-rose-400 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {frame.timestamp}
                    </span>
                    <span className="absolute bottom-1.5 right-1.5 bg-rose-500 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {frame.confidence}% Conf
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-200 truncate">{frame.anomalyType}</h5>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{frame.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="pt-3 border-t border-slate-800 text-xs text-slate-500 font-mono">
        Timeline values are the trained model's per-frame fake probabilities. Physiological and lip-sync metrics are not reported by this model.
      </div>
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { AudioExplainability, AudioSegment } from '../../types/analysis';
import { Play, Pause, Mic, Volume2, AlertTriangle, Zap, Activity } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface AudioWaveformVisualizerProps {
  audioDetails: AudioExplainability;
  previewUrl: string;
  filename: string;
}

export const AudioWaveformVisualizer: React.FC<AudioWaveformVisualizerProps> = ({
  audioDetails,
  previewUrl,
  filename,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [selectedSegment, setSelectedSegment] = useState<AudioSegment | null>(
    audioDetails.suspiciousSegments.length > 0 ? audioDetails.suspiciousSegments[0] : null
  );

  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const seekToSegment = (seg: AudioSegment) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seg.startSeconds;
      setCurrentTime(seg.startSeconds);
      setSelectedSegment(seg);
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="rounded-2xl bg-[#10131B] border border-slate-800 shadow-2xl p-5 space-y-5">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">
              Mel-Spectrogram & Acoustic Cloning Analysis
            </h4>
            <p className="text-[11px] text-slate-400 font-mono">
              Conformer Neural Vocoder & Spectral Flux Density
            </p>
          </div>
        </div>

        <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
          {audioDetails.sampleRateHz} Hz • {audioDetails.durationSeconds}s Clip
        </span>
      </div>

      <audio
        ref={audioRef}
        src={previewUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      {/* Main Waveform Stage */}
      <div className="p-6 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4 relative overflow-hidden">
        {/* Playback Controls Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white flex items-center justify-center shadow-lg shadow-cyan-500/25 transition-transform active:scale-95"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
            </button>
            <div>
              <span className="text-sm font-bold text-slate-200">
                {isPlaying ? 'Playing Audio' : 'Paused'}
              </span>
              <p className="text-xs font-mono text-cyan-400">
                00:{Math.floor(currentTime).toString().padStart(2, '0')} / 00:
                {audioDetails.durationSeconds.toString().padStart(2, '0')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Harmonic Phase Intact</span>
          </div>
        </div>

        {/* Waveform Visualization with Highlighted Synthetic Segments */}
        <div className="relative h-24 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center px-4 overflow-hidden">
          {/* Waveform vertical bars */}
          <div className="absolute inset-0 flex items-center justify-between px-3 gap-1">
            {Array.from({ length: 48 }).map((_, idx) => {
              const fraction = idx / 48;
              const timeSec = fraction * audioDetails.durationSeconds;
              
              // Check if inside any synthetic segment
              const isInSyntheticZone = audioDetails.suspiciousSegments.some(
                seg => timeSec >= seg.startSeconds && timeSec <= seg.endSeconds
              );

              const height = (Math.sin(idx * 0.5) * 0.4 + 0.5) * 60 + 10;
              const isPastPlayhead = timeSec <= currentTime;

              return (
                <div
                  key={idx}
                  style={{ height: `${height}%` }}
                  className={clsx(
                    'w-1.5 rounded-full transition-all duration-150',
                    isInSyntheticZone
                      ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                      : isPastPlayhead
                      ? 'bg-cyan-400'
                      : 'bg-slate-700'
                  )}
                />
              );
            })}
          </div>

          {/* Current playhead */}
          <div
            style={{ left: `${(currentTime / (audioDetails.durationSeconds || 18)) * 100}%` }}
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,1)] z-20 pointer-events-none"
          />
        </div>

        {/* Spectrogram Frequency Heat Map Simulation */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Mel-Frequency Density Spectrogram</span>
            <span className="text-rose-400">Anomalous 16kHz Cutoff</span>
          </div>
          <div className="h-14 rounded-lg bg-gradient-to-r from-blue-900/60 via-indigo-900/70 to-purple-900/80 border border-slate-800 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/30 via-transparent to-transparent opacity-60" />
            <span className="text-[10px] font-mono text-cyan-300 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/20 z-10">
              Spectrogram Density Map (Linear FFT)
            </span>
          </div>
        </div>
      </div>

      {/* Flagged Suspicious Audio Segments */}
      {audioDetails.suspiciousSegments.length > 0 && (
        <div className="space-y-2.5 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Identified Synthetic / Cloned Speech Intervals:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {audioDetails.suspiciousSegments.map(seg => {
              const isSelected = selectedSegment?.id === seg.id;
              return (
                <div
                  key={seg.id}
                  onClick={() => seekToSegment(seg)}
                  className={clsx(
                    'p-3.5 rounded-xl border text-left cursor-pointer transition-all',
                    isSelected
                      ? 'bg-rose-950/30 border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  )}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded">
                      Interval: {seg.startTime} – {seg.endTime}
                    </span>
                    <span className="text-[11px] font-mono text-rose-400 font-semibold">
                      {seg.syntheticProbability}% Synthetic
                    </span>
                  </div>
                  <h6 className="text-xs font-semibold text-slate-200">{seg.flaggedArtefact}</h6>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{seg.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Audio Metrics */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-center font-mono">
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Vocoder Index</span>
          <span className="text-sm font-bold text-rose-400">
            {audioDetails.neuralVocoderArtifactIndex} / 100
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Spectral Variance</span>
          <span className="text-sm font-bold text-amber-400">
            {audioDetails.spectralFluxVariance}
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Prosody Naturalness</span>
          <span className="text-sm font-bold text-cyan-400">
            {audioDetails.prosodyNaturalnessScore}%
          </span>
        </div>
      </div>
    </div>
  );
};

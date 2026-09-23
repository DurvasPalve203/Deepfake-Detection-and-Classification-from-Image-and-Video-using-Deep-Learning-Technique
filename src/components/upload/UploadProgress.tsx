import React from 'react';
import { Cpu, CheckCircle2, Loader2, Sparkles, ShieldAlert } from 'lucide-react';
import { AnalysisPipelineStep } from '../../types/analysis';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface UploadProgressProps {
  progressPercentage: number;
  currentStepLabel: string;
  pipelineSteps: AnalysisPipelineStep[];
}

export const UploadProgress: React.FC<UploadProgressProps> = ({
  progressPercentage,
  currentStepLabel,
  pipelineSteps,
}) => {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#10141F] to-[#0A0D14] border border-cyan-500/40 shadow-2xl relative overflow-hidden">
      {/* Background Animated Pulse */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(56,189,248,0.8)]"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg relative">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Forensic Execution Engine
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                In Progress
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-100 mt-0.5">
              {currentStepLabel || 'Processing digital media...'}
            </h4>
          </div>
        </div>

        <div className="text-right self-end sm:self-center font-mono">
          <span className="text-3xl font-extrabold text-cyan-400 font-['JetBrains_Mono']">
            {Math.round(progressPercentage)}%
          </span>
          <p className="text-[11px] text-slate-400">Pipeline throughput</p>
        </div>
      </div>

      {/* Visual Pipeline Steps Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {pipelineSteps.map((step, idx) => (
          <div
            key={step.id}
            className={clsx(
              'p-3 rounded-xl border flex items-start gap-3 transition-all duration-300',
              step.status === 'completed'
                ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                : step.status === 'active'
                ? 'bg-cyan-950/30 border-cyan-500/50 text-white shadow-[0_0_20px_rgba(56,189,248,0.15)]'
                : 'bg-slate-900/40 border-slate-800 text-slate-400'
            )}
          >
            <div className="mt-0.5 shrink-0">
              {step.status === 'completed' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : step.status === 'active' ? (
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[9px] font-mono">
                  {idx + 1}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p
                className={clsx(
                  'text-xs font-semibold truncate',
                  step.status === 'active' ? 'text-cyan-300' : 'text-slate-300'
                )}
              >
                {step.label}
              </p>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Simulated Notice */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>Simulated Forensic Engine (EDI Prototype Mode)</span>
        </div>
        <span className="text-[11px]">Non-destructive inspection</span>
      </div>
    </div>
  );
};

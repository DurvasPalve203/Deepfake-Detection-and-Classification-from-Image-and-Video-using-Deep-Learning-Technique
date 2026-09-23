import React from 'react';
import { AnalysisResult } from '../../types/analysis';
import { ShieldCheck, FileSearch, Sparkles, Cpu, Clock, CheckCircle2, AlertOctagon } from 'lucide-react';
import { clsx } from 'clsx';

interface EvidenceCardProps {
  result: AnalysisResult;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({ result }) => {
  return (
    <div className="p-6 rounded-2xl bg-[#10131B] border border-slate-800 shadow-2xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <FileSearch className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">Forensic Evidence & Explainability</h4>
            <p className="text-[11px] text-slate-400 font-mono">Aggregated Multi-Feature Synthesis</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{result.processingTimeMs}ms inference</span>
        </div>
      </div>

      {/* Model Spec Badge */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span className="text-slate-300 font-semibold">{result.modelName}</span>
        </div>
        <span className="text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
          {result.modelVersion}
        </span>
      </div>

      {/* Primary Evidence Bullets */}
      <div className="space-y-3">
        <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Key Investigative Findings:
        </h5>
        <div className="space-y-2.5">
          {result.evidenceSummary.map((finding, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3"
            >
              {result.prediction === 'LIKELY_MANIPULATED' ? (
                <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              )}
              <p className="text-xs text-slate-300 leading-relaxed">{finding}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Forensic Footnote */}
      <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
        <span className="font-semibold text-slate-300">Forensic Methodology:</span> Multi-scale spatial-frequency decomposition combined with latent feature activation maps. Evidence presented is intended for assistive verification analysis.
      </div>
    </div>
  );
};

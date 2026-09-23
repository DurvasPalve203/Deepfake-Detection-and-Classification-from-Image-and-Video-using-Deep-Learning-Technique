import React from 'react';
import { PredictionVerdict, ProbabilityBreakdown } from '../../types/analysis';
import { getVerdictLabel, getVerdictBadgeClasses } from '../../utils/formatters';
import { ShieldCheck, AlertTriangle, AlertCircle, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ConfidenceMeterProps {
  verdict: PredictionVerdict;
  confidence: number;
  probabilities: ProbabilityBreakdown;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  verdict,
  confidence,
  probabilities,
  riskLevel,
}) => {
  const badgeClasses = getVerdictBadgeClasses(verdict);

  const getVerdictIcon = () => {
    switch (verdict) {
      case 'AUTHENTIC':
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'LIKELY_MANIPULATED':
        return <AlertTriangle className="w-6 h-6 text-rose-400" />;
      case 'INCONCLUSIVE':
        return <HelpCircle className="w-6 h-6 text-amber-400" />;
    }
  };

  const circumference = 2 * Math.PI * 46;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  const getMeterColor = () => {
    switch (verdict) {
      case 'AUTHENTIC':
        return '#10B981';
      case 'LIKELY_MANIPULATED':
        return '#F43F5E';
      case 'INCONCLUSIVE':
        return '#F59E0B';
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#10131B] to-[#0A0D14] border border-slate-800 shadow-2xl flex flex-col justify-between space-y-6">
      {/* Top Banner Verdict */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Forensic Verdict
          </span>
          <span
            className={clsx(
              'text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider font-semibold',
              riskLevel === 'CRITICAL' || riskLevel === 'HIGH'
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                : riskLevel === 'MODERATE'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            )}
          >
            Risk Level: {riskLevel}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <div className={clsx('p-3 rounded-xl border shrink-0', badgeClasses.badge, badgeClasses.glow)}>
            {getVerdictIcon()}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 font-['Plus_Jakarta_Sans'] tracking-tight">
              {getVerdictLabel(verdict)}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Scientific Model Consensus
            </p>
          </div>
        </div>
      </div>

      {/* Radial Confidence Gauge */}
      <div className="flex items-center justify-center py-2">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 110 110">
            {/* Background ring */}
            <circle
              cx="55"
              cy="55"
              r="46"
              stroke="#1E293B"
              strokeWidth="9"
              fill="transparent"
            />
            {/* Animated gauge meter */}
            <motion.circle
              cx="55"
              cy="55"
              r="46"
              stroke={getMeterColor()}
              strokeWidth="9"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: strokeDashoffset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-black text-slate-100 font-['JetBrains_Mono'] tracking-tight"
            >
              {confidence}%
            </motion.span>
            <span className="text-[11px] font-mono text-slate-400 mt-0.5 uppercase tracking-wider">
              Confidence
            </span>
          </div>
        </div>
      </div>

      {/* Probability Distribution Stacked Bar */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>Probability Breakdown</span>
          <span>100% Normalized</span>
        </div>

        {/* Stacked multi-color progress bar */}
        <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
          <div
            style={{ width: `${probabilities.manipulated}%` }}
            className="h-full bg-rose-500 rounded-l-full transition-all duration-500"
            title={`Manipulated: ${probabilities.manipulated}%`}
          />
          <div
            style={{ width: `${probabilities.inconclusive}%` }}
            className="h-full bg-amber-500 transition-all duration-500"
            title={`Inconclusive: ${probabilities.inconclusive}%`}
          />
          <div
            style={{ width: `${probabilities.authentic}%` }}
            className="h-full bg-emerald-500 rounded-r-full transition-all duration-500"
            title={`Authentic: ${probabilities.authentic}%`}
          />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-slate-400">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Manip: {probabilities.manipulated}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Inconcl: {probabilities.inconclusive}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Auth: {probabilities.authentic}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

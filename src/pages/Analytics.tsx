import React, { useState } from 'react';
import { ForensicCharts } from '../components/dashboard/ForensicCharts';
import { Card } from '../components/common/Card';
import { BarChart3, AlertTriangle, Calendar } from 'lucide-react';
import { clsx } from 'clsx';

export const Analytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const anomalyCategories: Array<{ category: string; severity: 'High' | 'Medium' | 'Low'; occurrences: number }> = [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-100 font-['Plus_Jakarta_Sans'] tracking-tight">
              Forensic Model Analytics
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Aggregated Metrics
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deep statistical breakdown of detection rates, anomaly patterns, and engine latency.
          </p>
        </div>

        {/* Date-range selector */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <Calendar className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
          {(['7d', '30d', '90d', 'all'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={clsx(
                'px-2.5 py-1 rounded-lg uppercase transition-all',
                timeframe === t
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              {t === 'all' ? 'All Time' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Charts Component */}
      <ForensicCharts />

      <div className="p-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 text-center text-sm text-slate-400">
        No analytics data is available yet. Once the real model pipeline is connected, this page will render live trend and anomaly metrics.
      </div>

      {/* Anomaly Category Frequency Table */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <h3 className="text-base font-bold text-slate-100 font-['Plus_Jakarta_Sans']">
              Forgery Anomaly Frequency Index
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Categorical Anomaly Breakdown
          </span>
        </div>

        {anomalyCategories.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs font-mono text-slate-400 text-center">
            No anomaly categories available until the real detector starts producing results.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {anomalyCategories.map((cat, idx) => (
              <Card key={idx} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">{cat.category}</span>
                  <span
                    className={clsx(
                      'text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border',
                      cat.severity === 'High'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : cat.severity === 'Medium'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                    )}
                  >
                    {cat.severity} Risk
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                  <span>Total Flagged:</span>
                  <span className="text-slate-100 font-bold">{cat.occurrences} instances</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

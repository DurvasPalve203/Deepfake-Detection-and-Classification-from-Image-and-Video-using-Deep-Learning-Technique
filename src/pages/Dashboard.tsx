import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../components/dashboard/StatCard';
import { ForensicCharts } from '../components/dashboard/ForensicCharts';
import { ActivityTable } from '../components/dashboard/ActivityTable';
import { Button } from '../components/common/Button';
import {
  ScanLine,
  ShieldCheck,
  AlertTriangle,
  Percent,
  PlusCircle,
  Clock,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useAnalysisContext } from '../context/AnalysisContext';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { analyses } = useAnalysisContext();

  const totalCount = analyses.length;
  const manipulatedCount = analyses.filter(item => item.prediction === 'LIKELY_MANIPULATED').length;
  const authenticCount = analyses.filter(item => item.prediction === 'AUTHENTIC').length;
  const averageConfidence = analyses.length
    ? Math.round(analyses.reduce((sum, item) => sum + item.confidence, 0) / analyses.length)
    : 0;

  return (
    <div className="space-y-8">
      {/* Dashboard Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-100 font-['Plus_Jakarta_Sans'] tracking-tight">
              Media Intelligence Dashboard
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Live Monitor
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Monitor and audit multi-modal media authenticity analyses across all detection engines.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="md"
            variant="primary"
            leftIcon={<PlusCircle className="w-4 h-4" />}
            onClick={() => navigate('/analyze')}
            className="shadow-lg shadow-cyan-500/20"
          >
            Start New Analysis
          </Button>
        </div>
      </div>

      {/* Top 4 KPI Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Analyses"
          value={totalCount.toLocaleString()}
          subtitle="All evaluated media files"
          icon={<ScanLine className="w-5 h-5" />}
          trend={{ value: analyses.length ? 'Live data' : 'No data yet', isPositive: true }}
          variant="cyan"
        />

        <StatCard
          title="Fake / Manipulated"
          value={manipulatedCount.toLocaleString()}
          subtitle="Flagged synthetic or altered"
          icon={<AlertTriangle className="w-5 h-5" />}
          trend={{ value: analyses.length ? `${Math.round((manipulatedCount / (totalCount || 1)) * 100)}% of total` : 'Waiting for analysis', isPositive: false }}
          variant="rose"
        />

        <StatCard
          title="Authentic Media"
          value={authenticCount.toLocaleString()}
          subtitle="Verified natural captures"
          icon={<ShieldCheck className="w-5 h-5" />}
          trend={{ value: analyses.length ? `${Math.round((authenticCount / (totalCount || 1)) * 100)}% of total` : 'Waiting for analysis', isPositive: true }}
          variant="emerald"
        />

        <StatCard
          title="Average Confidence"
          value={`${averageConfidence}%`}
          subtitle="Model consensus score"
          icon={<Percent className="w-5 h-5" />}
          trend={{ value: analyses.length ? 'Live score' : 'No score yet', isPositive: true }}
          variant="indigo"
        />
      </div>

      {/* Forensic Visual Charts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-100 font-['Plus_Jakarta_Sans']">
            Forensic Metrics & Trajectories
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            Real-time Aggregated Stream
          </span>
        </div>
        <ForensicCharts />
      </div>

      {/* Recent Activity Table */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 font-['Plus_Jakarta_Sans']">
              Recent Forensic Analyses
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Latest items evaluated through Image, Video, and Audio pipelines
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/history')}
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            View Full History
          </Button>
        </div>

        <ActivityTable limit={5} showFilters={false} />
      </div>
    </div>
  );
};

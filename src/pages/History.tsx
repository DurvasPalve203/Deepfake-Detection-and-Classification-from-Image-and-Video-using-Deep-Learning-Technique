import React from 'react';
import { ActivityTable } from '../components/dashboard/ActivityTable';
import { Button } from '../components/common/Button';
import { useAnalysisContext } from '../context/AnalysisContext';
import { History as HistoryIcon, Trash2, Download, ShieldCheck, Filter } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const History: React.FC = () => {
  const { analyses, clearAllHistory } = useAnalysisContext();
  const { showToast } = useToast();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all historical forensic analysis records?')) {
      clearAllHistory();
      showToast('info', 'History Cleared', 'All local forensic records have been wiped.', 2500);
    }
  };

  const handleExportCsv = () => {
    if (analyses.length === 0) return;
    const header = 'ID,Filename,MediaType,Prediction,Confidence,CreatedAt,SHA256\n';
    const rows = analyses
      .map(
        a =>
          `"${a.id}","${a.filename}","${a.mediaType}","${a.prediction}",${a.confidence},"${a.createdAt}","${a.sha256Hash}"`
      )
      .join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DeepTrace_Forensic_History_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('success', 'CSV Exported', 'Analysis audit log downloaded successfully.', 2500);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-100 font-['Plus_Jakarta_Sans'] tracking-tight">
              Analysis Audit History
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
              {analyses.length} Records
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Search, filter, and inspect past media forensic evaluations and cryptographic records.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            onClick={handleExportCsv}
            disabled={analyses.length === 0}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export CSV
          </Button>

          <Button
            size="sm"
            variant="danger"
            onClick={handleClearAll}
            disabled={analyses.length === 0}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Clear Log
          </Button>
        </div>
      </div>

      {/* Main Filterable History Table */}
      <ActivityTable showFilters={true} />
    </div>
  );
};

import React, { useState } from 'react';
import { ForensicReport } from '../types/report';
import { ReportExportModal } from '../components/analysis/ReportExportModal';
import { Button } from '../components/common/Button';
import { formatDate, getVerdictBadgeClasses, getVerdictLabel } from '../utils/formatters';
import {
  FileText,
  Download,
  Eye,
  ShieldCheck,
  QrCode,
  Search,
  ExternalLink,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { clsx } from 'clsx';
import { useToast } from '../context/ToastContext';

export const Reports: React.FC = () => {
  const [reports, setReports] = useState<ForensicReport[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<ForensicReport | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  const filteredReports = reports.filter(
    r =>
      r.reportId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.analysisSummary.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.digitalSignature.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openReportModal = (report: ForensicReport) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleDownload = (report: ForensicReport) => {
    showToast('success', 'Dossier Downloaded', `Certificate ${report.reportId} saved as text dossier.`, 2500);
    const content = `DEEPTRACE AI - CERTIFIED FORENSIC REPORT\nReport ID: ${report.reportId}\nSignature: ${report.digitalSignature}\nTarget: ${report.analysisSummary.filename}\nVerdict: ${report.analysisSummary.prediction}\nConfidence: ${report.analysisSummary.confidence}%\nCompliance: ${report.complianceStandards.join(', ')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.reportId}_Forensic_Certificate.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-100 font-['Plus_Jakarta_Sans'] tracking-tight">
              Certified Forensic Reports
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              NIST IR 8387 Compliant
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Standardized evidentiary dossiers with digital verification signatures and chain of custody.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search report ID or file..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="p-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 text-center text-sm text-slate-400">
          No certified reports yet. Connect your backend or report generator to populate this section.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredReports.map(report => {
            const item = report.analysisSummary;
            const badgeClasses = getVerdictBadgeClasses(item.prediction);

            return (
              <div
                key={report.reportId}
                className="p-5 rounded-2xl bg-[#10131B] border border-slate-800 shadow-xl space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                {/* Top Meta */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-100 font-mono">
                          {report.reportId}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-mono">
                          Issued: {formatDate(report.generatedDate)}
                        </p>
                      </div>
                    </div>

                    <span
                      className={clsx(
                        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border',
                        badgeClasses.badge
                      )}
                    >
                      <span className={clsx('w-1.5 h-1.5 rounded-full', badgeClasses.dot)} />
                      <span>{getVerdictLabel(item.prediction)}</span>
                    </span>
                  </div>

                  {/* File info */}
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs font-mono space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Media:</span>
                      <span className="text-slate-200 font-semibold truncate max-w-[180px]">
                        {item.filename}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Model Engine:</span>
                      <span className="text-cyan-400 font-medium">{item.modelName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Confidence:</span>
                      <span className="text-slate-200 font-bold">{item.confidence}%</span>
                    </div>
                  </div>

                  {/* Digital Signature */}
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-slate-950/60 px-2.5 py-1 rounded border border-slate-800/60">
                    <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{report.digitalSignature}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {report.status}
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openReportModal(report)}
                      leftIcon={<Eye className="w-3.5 h-3.5" />}
                    >
                      View Dossier
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDownload(report)}
                      leftIcon={<Download className="w-3.5 h-3.5" />}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selectedReport && (
        <ReportExportModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          result={selectedReport.analysisSummary}
        />
      )}
    </div>
  );
};

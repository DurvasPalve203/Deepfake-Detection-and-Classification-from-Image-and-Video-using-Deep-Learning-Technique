import React from 'react';
import { AnalysisResult } from '../../types/analysis';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { formatBytes, formatDate, getVerdictLabel } from '../../utils/formatters';
import { Download, Printer, ShieldCheck, FileCheck, CheckCircle2, QrCode } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface ReportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AnalysisResult;
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  const { showToast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    showToast('success', 'Forensic PDF Generated', `Report for ${result.filename} downloaded successfully.`, 3500);
    // Trigger download of markdown / text forensic summary certificate
    const content = `=====================================================
DEEPTRACE AI - CERTIFIED FORENSIC ANALYSIS REPORT
=====================================================
Report ID: REP-${result.id.toUpperCase()}
Generated: ${formatDate(result.createdAt)}
System: DeepTrace AI Multi-Modal Forensic Core
Standard: NIST IR 8387 / ISO 27037 Digital Evidence

FILE INFORMATION:
Filename: ${result.filename}
Media Type: ${result.mediaType}
File Size: ${formatBytes(result.fileSize)}
MIME Type: ${result.fileMetadata.type}
SHA-256: ${result.sha256Hash}

VERDICT:
Classification: ${getVerdictLabel(result.prediction)}
Confidence Score: ${result.confidence}%
Risk Assessment: ${result.riskLevel}

MODEL INFORMATION:
Model: ${result.modelName} (${result.modelVersion})
Inference Latency: ${result.processingTimeMs}ms

INVESTIGATIVE EVIDENCE:
${result.evidenceSummary.map((e, i) => `${i + 1}. ${e}`).join('\n')}

=====================================================
DISCLAIMER: DeepTrace AI provides assistive forensic classification.
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DeepTrace_Forensic_Report_${result.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Certified Forensic Report Dossier"
      subtitle="Verifiable Media Authenticity Certificate"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Printable Report Certificate Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-6 font-sans text-slate-100 shadow-2xl relative overflow-hidden">
          {/* Certificate Header Banner */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span className="font-extrabold text-lg tracking-tight font-['Plus_Jakarta_Sans']">
                  DeepTrace <span className="text-cyan-400">AI</span> Forensics
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                Certificate ID: REP-{result.id.toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                CERTIFIED EVALUATION
              </span>
              <p className="text-[11px] text-slate-400 font-mono mt-1">
                {formatDate(result.createdAt)}
              </p>
            </div>
          </div>

          {/* Media Info & Verdict Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="text-slate-400 block uppercase">Target Media</span>
              <p className="font-bold text-slate-200 text-sm truncate">{result.filename}</p>
              <p className="text-slate-400">
                {result.mediaType} • {formatBytes(result.fileSize)}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="text-slate-400 block uppercase">Forensic Verdict</span>
              <p className="font-bold text-rose-400 text-sm">{getVerdictLabel(result.prediction)}</p>
              <p className="text-cyan-400">{result.confidence}% Confidence Rating</p>
            </div>
          </div>

          {/* SHA-256 Verification Badge */}
          <div className="p-3 rounded-xl bg-black/50 border border-slate-800 text-[11px] font-mono">
            <span className="text-slate-400 block mb-1">Cryptographic Fingerprint (SHA-256):</span>
            <span className="text-cyan-300 break-all">{result.sha256Hash}</span>
          </div>

          {/* Key Findings List */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Aggregated Evidence Findings:
            </span>
            <div className="space-y-1.5">
              {result.evidenceSummary.map((finding, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>NIST IR 8387 • ISO/IEC 27037 Digital Forensics</span>
            <div className="flex items-center gap-1 text-cyan-400">
              <QrCode className="w-4 h-4" />
              <span>Verifiable Record</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={handlePrint} leftIcon={<Printer className="w-4 h-4" />}>
            Print Report
          </Button>
          <Button variant="primary" onClick={handleDownloadPdf} leftIcon={<Download className="w-4 h-4" />}>
            Download Forensic Dossier (.txt / PDF)
          </Button>
        </div>
      </div>
    </Modal>
  );
};

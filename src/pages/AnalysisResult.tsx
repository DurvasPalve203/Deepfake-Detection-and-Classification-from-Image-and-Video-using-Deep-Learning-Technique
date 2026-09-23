import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAnalysisContext } from '../context/AnalysisContext';
import { ConfidenceMeter } from '../components/analysis/ConfidenceMeter';
import { GradCamHeatmapViewer } from '../components/analysis/GradCamHeatmapViewer';
import { VideoTimelineScrubber } from '../components/analysis/VideoTimelineScrubber';
import { AudioWaveformVisualizer } from '../components/analysis/AudioWaveformVisualizer';
import { EvidenceCard } from '../components/analysis/EvidenceCard';
import { MetadataForensicCard } from '../components/analysis/MetadataForensicCard';
import { ReportExportModal } from '../components/analysis/ReportExportModal';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { formatBytes, formatDate } from '../utils/formatters';
import {
  FileText,
  Share2,
  RotateCcw,
  ArrowLeft,
  ShieldAlert,
  Download,
  Printer,
  Sparkles,
  Layers,
  Cpu
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const AnalysisResult: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAnalysisById, currentResult } = useAnalysisContext();
  const { showToast } = useToast();

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Retrieve analysis by ID or fallback to active result
  const analysis = (id ? getAnalysisById(id) : null) || currentResult;

  if (!analysis) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <ShieldAlert className="w-12 h-12 text-slate-600 mx-auto" />
        <h3 className="text-lg font-bold text-slate-200">Analysis Record Not Found</h3>
        <p className="text-xs text-slate-400">
          The requested forensic dossier could not be located in local memory.
        </p>
        <Button variant="primary" onClick={() => navigate('/analyze')}>
          Start New Analysis
        </Button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('info', 'Verification Link Copied', 'Forensic report link copied to clipboard.', 2500);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors font-mono mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-black text-slate-100 font-['Plus_Jakarta_Sans'] tracking-tight">
              Forensic Analysis Dossier
            </h2>
            <Badge variant="cyan" size="sm">
              {analysis.mediaType}
            </Badge>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Target: <span className="text-slate-200 font-semibold">{analysis.filename}</span> • Analyzed {formatDate(analysis.createdAt)}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleShare}
            leftIcon={<Share2 className="w-3.5 h-3.5" />}
          >
            Share Link
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsExportModalOpen(true)}
            leftIcon={<FileText className="w-3.5 h-3.5" />}
            className="shadow-lg shadow-cyan-500/20"
          >
            Export Certified Report
          </Button>
        </div>
      </div>

      {/* Main Forensic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Forensic Confidence Meter & Probability Breakdown */}
        <div className="lg:col-span-1 space-y-6">
          <ConfidenceMeter
            verdict={analysis.prediction}
            confidence={analysis.confidence}
            probabilities={analysis.probabilities}
            riskLevel={analysis.riskLevel}
          />

          <EvidenceCard result={analysis} />
        </div>

        {/* Right Column: Deep Modality Explainability Visualizer */}
        <div className="lg:col-span-2 space-y-6">
          {/* Modality Specific Inspector */}
          {analysis.mediaType === 'IMAGE' && analysis.imageDetails && (
            <GradCamHeatmapViewer
              imageDetails={analysis.imageDetails}
              filename={analysis.filename}
            />
          )}

          {analysis.mediaType === 'VIDEO' && analysis.videoDetails && (
            <VideoTimelineScrubber
              videoDetails={analysis.videoDetails}
              previewUrl={analysis.fileMetadata.previewUrl}
              filename={analysis.filename}
            />
          )}

          {analysis.mediaType === 'AUDIO' && analysis.audioDetails && (
            <AudioWaveformVisualizer
              audioDetails={analysis.audioDetails}
              previewUrl={analysis.fileMetadata.previewUrl}
              filename={analysis.filename}
            />
          )}

          {/* Metadata & Cryptographic Hash */}
          <MetadataForensicCard result={analysis} />
        </div>
      </div>

      {/* Bottom Re-analyze CTA */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">Need to inspect another file?</h4>
            <p className="text-xs text-slate-400">
              Upload additional digital evidence for multi-modal forgery verification.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate('/analyze')}
          leftIcon={<Sparkles className="w-4 h-4" />}
        >
          New Analysis
        </Button>
      </div>

      {/* PDF / Certified Report Dossier Modal */}
      <ReportExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        result={analysis}
      />
    </div>
  );
};

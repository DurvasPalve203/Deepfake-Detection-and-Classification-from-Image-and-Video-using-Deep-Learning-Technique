import React from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import {
  ShieldAlert,
  Info,
  Cpu,
  Layers,
  FileCheck,
  Terminal,
  Database,
  Code2,
  ExternalLink,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const About: React.FC = () => {
  const TECH_STACK = [
    { name: 'React 19 & Vite', role: 'High-Performance UI Framework', category: 'Frontend' },
    { name: 'TypeScript', role: 'Strict Type-Safe Architecture', category: 'Frontend' },
    { name: 'Tailwind CSS', role: 'Forensic Dark-First Design System', category: 'Styling' },
    { name: 'Framer Motion', role: 'Physics-Based Dynamic Transitions', category: 'Animation' },
    { name: 'FastAPI (Python)', role: 'Asynchronous Model Inference Bridge', category: 'Backend (Planned)' },
    { name: 'PyTorch & ConvNeXt', role: 'Spatial-Frequency Vision Classification', category: 'Vision AI (Planned)' },
    { name: '3D-CNN / TimeSformer', role: 'Spatiotemporal Optical Flow ViT', category: 'Video AI (Planned)' },
    { name: 'Conformer & Mel-Spectrogram', role: 'Synthetic Speech & Vocoder Classifier', category: 'Audio AI (Planned)' },
    { name: 'OpenCV & FFmpeg', role: 'Keyframe Extraction & Demuxing', category: 'Preprocessing' },
  ];

  const PIPELINE_STEPS = [
    { title: '01. Ingestion & Preprocessing', desc: 'Container demuxing, EXIF extraction, and SHA-256 fingerprint generation.' },
    { title: '02. Feature Decomposition', desc: '2D-FFT noise spectrum analysis, facial landmark tracking, and Mel-scale audio conversion.' },
    { title: '03. Deep Neural Classification', desc: 'Inference across 3 independent AI models specialized per modality.' },
    { title: '04. Grad-CAM Explainability', desc: 'Gradient-weighted class activation mapping to highlight exact forged pixels and frames.' },
    { title: '05. Evidence Aggregation', desc: 'Normalized probability consensus and risk severity assessment.' },
    { title: '06. Certified Report Dossier', desc: 'Issuing verifiable cryptographic certificates complying with digital evidence norms.' },
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="space-y-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Badge variant="cyan" size="sm">
            College EDI Project
          </Badge>
          <span className="text-xs font-mono text-slate-400">• Sem 5 Architecture</span>
        </div>
        <h2 className="text-3xl font-black text-slate-100 font-['Plus_Jakarta_Sans'] tracking-tight">
          Deepfake Detection and Classification from Image and Video using Deep Learning
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          DeepTrace AI is an assistive digital media forensics platform engineered to verify authenticity, identify generative AI artifacts, and present transparent explainability evidence for multi-modal digital media.
        </p>
      </div>

      {/* 1. Project Background & Importance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <BookOpen className="w-4 h-4" />
            <span>Why Deepfake Forensics Matters</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The proliferation of latent diffusion models, neural vocoders, and real-time facial reenactment has lowered the barrier for deceptive media synthesis. Unchecked synthetic media poses severe risks to journalism, democratic discourse, financial authentication, and digital identity.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Layers className="w-4 h-4" />
            <span>Explainability Over Black-Box Decisions</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Unlike opaque binary classifiers that output unexplained percentages, DeepTrace AI emphasizes explainable AI (XAI). Using Grad-CAM spatial heatmaps, suspicious frame sequences, and spectral cutoffs, forensic analysts can understand exactly *why* a file was flagged.
          </p>
        </Card>
      </div>

      {/* 2. Three Independent Future AI Detection Models */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-100 font-['Plus_Jakarta_Sans']">
          Three-Modality AI Architecture Specification
        </h3>
        <p className="text-xs text-slate-400">
          The platform frontend is architected to decouple UI components from the inference service layer, allowing these 3 independent AI models to be plugged in seamlessly via FastAPI endpoints.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-[#10131B] border border-cyan-500/30 space-y-3">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
              Model Engine 1: Vision
            </span>
            <h4 className="text-sm font-bold text-slate-100">Spatial-Frequency Image Net</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Analyzes subtle 2D-FFT noise spectrum residuals, GAN checkerboard patterns, latent diffusion inpainting seams, and generates Grad-CAM heatmaps.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#10131B] border border-indigo-500/30 space-y-3">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
              Model Engine 2: Temporal
            </span>
            <h4 className="text-sm font-bold text-slate-100">Spatiotemporal 3D-ViT</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Examines frame-by-frame temporal optical flow continuity, physiological blink rates, lip-sync phoneme alignment, and facial mesh stability.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#10131B] border border-purple-500/30 space-y-3">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-bold border border-purple-500/20">
              Model Engine 3: Acoustic
            </span>
            <h4 className="text-sm font-bold text-slate-100">Mel-Spectrogram Conformer</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspects synthetic voice cloning artifacts, neural vocoder phase jitter, high-frequency harmonic loss, and robotic prosody flatness.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Pipeline Architecture */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-100 font-['Plus_Jakarta_Sans']">
          End-to-End Forensic Processing Pipeline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PIPELINE_STEPS.map((step, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <h5 className="text-xs font-bold text-cyan-300 font-mono">{step.title}</h5>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Technology Stack Matrix */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-100 font-['Plus_Jakarta_Sans']">
          Technology & Tooling Stack
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TECH_STACK.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 block">{item.category}</span>
                <span className="text-xs font-bold text-slate-200">{item.name}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{item.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Disclaimer */}
      <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
            Assistive Forensic Platform Disclaimer
          </h5>
          <p className="text-xs text-slate-300 leading-relaxed">
            DeepTrace AI is developed for academic evaluation and assistive forensic media analysis. The probability estimates and Grad-CAM localized heatmaps represent model inferences and do not constitute legal determinations of authenticity.
          </p>
        </div>
      </div>
    </div>
  );
};

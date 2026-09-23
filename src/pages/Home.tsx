import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ScanLine,
  ShieldCheck,
  Image as ImageIcon,
  Video as VideoIcon,
  Mic as MicIcon,
  ArrowRight,
  Layers,
  BarChart3,
  FileCheck,
  Lock,
  Cpu,
  Sparkles,
  Zap,
  CheckCircle2,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const STEPS = [
    {
      num: '01',
      title: 'Ingest Media',
      description: 'Upload high-resolution image, video, or audio files through an encrypted local pipeline.',
      icon: ScanLine,
    },
    {
      num: '02',
      title: 'Forensic Detection',
      description: 'Multi-scale spatial-frequency CNNs, 3D-ViT temporal nets, and Mel-spectrogram engines inspect artifacts.',
      icon: Cpu,
    },
    {
      num: '03',
      title: 'Explainable AI',
      description: 'Review localized Grad-CAM heatmaps, suspicious frame sequences, and synthetic voice segments.',
      icon: Layers,
    },
    {
      num: '04',
      title: 'Certified Dossier',
      description: 'Generate standardized cryptographic reports complying with digital evidence guidelines.',
      icon: FileCheck,
    },
  ];

  const FEATURES = [
    {
      title: 'Multi-Modal Detection',
      description: 'Dedicated deep neural models engineered specifically for image, video, and audio forgery characteristics.',
      icon: Zap,
    },
    {
      title: 'Explainable AI (Grad-CAM)',
      description: 'Transparent visual heatmaps pinpointing exact facial boundaries, warping zones, and synthetic blend artifacts.',
      icon: Layers,
    },
    {
      title: 'Scientific Confidence Scoring',
      description: 'Probabilistic consensus metrics avoiding false certainty by delivering nuanced authentic vs manipulated ratios.',
      icon: BarChart3,
    },
    {
      title: 'Cryptographic Chain of Custody',
      description: 'SHA-256 digital fingerprinting, EXIF profile validation, and verifiable timestamped analysis logs.',
      icon: Lock,
    },
    {
      title: 'Forensic PDF Dossiers',
      description: 'One-click generation of certified evidence certificates with NIST IR 8387 compliance standards.',
      icon: FileCheck,
    },
    {
      title: 'Pluggable AI Architecture',
      description: 'Clean service abstraction ready for independent hot-swapping of future PyTorch and FastAPI deep models.',
      icon: Terminal,
    },
  ];

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Background Glows and Grids */}
      <div className="fixed inset-0 radar-grid opacity-35 pointer-events-none" />
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Global Top Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-[#090A0F]/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#090A0F] rounded-[9px] flex items-center justify-center">
                <ScanLine className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <span className="font-extrabold text-base tracking-tight font-['Plus_Jakarta_Sans']">
              DeepTrace<span className="text-cyan-400 ml-0.5">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#modalities" className="hover:text-cyan-400 transition-colors">
              Detection Engines
            </a>
            <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">
              Forensic Workflow
            </a>
            <a href="#features" className="hover:text-cyan-400 transition-colors">
              Platform Features
            </a>
            <Link to="/about" className="hover:text-cyan-400 transition-colors">
              EDI Research
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="hidden sm:inline-flex"
            >
              Dashboard
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/analyze')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Launch Workspace
            </Button>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI-Powered Digital Media Forensics & Deepfake Detection</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-100 font-['Plus_Jakarta_Sans'] tracking-tight leading-[1.1]"
          >
            Verify what <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              you see.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal"
          >
            DeepTrace AI analyzes images, videos and audio to identify signs of synthetic or manipulated media and present interpretable forensic evidence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4"
          >
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/analyze')}
              leftIcon={<ScanLine className="w-5 h-5" />}
              className="w-full sm:w-auto px-8 py-4 text-base shadow-xl shadow-cyan-500/20 glow-blue"
            >
              Analyze Media
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/dashboard')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto px-6 py-4 text-base"
            >
              Explore Dashboard
            </Button>
          </motion.div>
        </div>

        {/* 3 Modality Interactive Cards Visual */}
        <div id="modalities" className="mt-16 sm:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Image Card */}
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => navigate('/analyze')}
              className="relative p-6 rounded-2xl bg-gradient-to-b from-[#141926] to-[#0D1018] border border-cyan-500/30 shadow-2xl group cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <Badge variant="cyan" size="sm">
                  Vision Core
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-slate-100 font-['Plus_Jakarta_Sans']">
                IMAGE FORENSICS
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Visual manipulation detection, Grad-CAM spatial heatmaps, 2D-FFT frequency spectrum analysis, and boundary artifact isolation.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Inspect Image Artifacts</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>

            {/* Video Card */}
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => navigate('/analyze')}
              className="relative p-6 rounded-2xl bg-gradient-to-b from-[#141926] to-[#0D1018] border border-indigo-500/30 shadow-2xl group cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <VideoIcon className="w-6 h-6" />
                </div>
                <Badge variant="indigo" size="sm">
                  Temporal Engine
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-slate-100 font-['Plus_Jakarta_Sans']">
                VIDEO FORENSICS
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Frame-level temporal analysis, 3D-CNN spatiotemporal jitter scoring, suspicious frame flagging, and lip-sync inconsistency tracking.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-indigo-400 group-hover:translate-x-1 transition-transform">
                <span>Evaluate Video Frames</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>

            {/* Audio Card */}
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => navigate('/analyze')}
              className="relative p-6 rounded-2xl bg-gradient-to-b from-[#141926] to-[#0D1018] border border-purple-500/30 shadow-2xl group cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <MicIcon className="w-6 h-6" />
                </div>
                <Badge variant="indigo" size="sm">
                  Acoustic Engine
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-slate-100 font-['Plus_Jakarta_Sans']">
                AUDIO FORENSICS
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Synthetic speech and voice clone detection, neural vocoder phase artifacts, Mel-spectrogram density mapping, and prosody evaluation.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-purple-400 group-hover:translate-x-1 transition-transform">
                <span>Detect Cloned Voice</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS 4-STEP SECTION */}
      <section id="how-it-works" className="py-20 border-t border-slate-800/80 bg-[#0B0E16]/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              System Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-100 font-['Plus_Jakarta_Sans'] tracking-tight">
              How DeepTrace AI Works
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              A rigorous 4-step forensic methodology engineered for high reliability and interpretability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(step => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-6 rounded-2xl bg-[#10141F] border border-slate-800/90 shadow-xl space-y-4 relative group hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black font-['JetBrains_Mono'] text-slate-700 group-hover:text-cyan-400 transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-100 font-['Plus_Jakarta_Sans']">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. BUILT FOR MEDIA VERIFICATION */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
            Forensic Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 font-['Plus_Jakarta_Sans'] tracking-tight">
            Built for Media Verification
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Comprehensive digital forensics tools built for journalists, security researchers, and verification analysts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Card key={idx} isHoverable className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-100 font-['Plus_Jakarta_Sans']">
                  {feat.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#07080D] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <ScanLine className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-slate-200">DeepTrace AI</span>
              <p className="text-[11px] text-slate-400 font-mono">
                College EDI Project • Digital Media Forensics
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 text-center md:text-right font-mono">
            <p>Assistive Forensic Analysis System • Non-legal verification tool</p>
            <p className="text-[11px] text-slate-400 mt-1">
              Engineered with React, TypeScript, Tailwind CSS & PyTorch Architectures
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

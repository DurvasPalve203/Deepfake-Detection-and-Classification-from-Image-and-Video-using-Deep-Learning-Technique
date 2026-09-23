import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';
import { useAnalysisContext } from '../context/AnalysisContext';
import { useToast } from '../context/ToastContext';
import {
  Settings as SettingsIcon,
  Sun,
  Moon,
  Sliders,
  Cpu,
  HardDrive,
  CheckCircle2,
  Trash2,
  Activity,
  ShieldCheck,
  Zap,
  Server
} from 'lucide-react';
import { clsx } from 'clsx';
import { checkBackendHealth } from '../services/api';

export const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const {
    sensitivityPreset,
    setSensitivityPreset,
    backendUrl,
    setBackendUrl,
    isBackendConnected,
    setIsBackendConnected,
    clearAllHistory,
  } = useAnalysisContext();
  const { showToast } = useToast();

  const [inputUrl, setInputUrl] = useState(backendUrl);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const handleSaveBackendUrl = async () => {
    setBackendUrl(inputUrl);
    setIsTestingConnection(true);

    try {
      const isHealthy = await checkBackendHealth();
      setIsBackendConnected(isHealthy);
      if (isHealthy) {
        showToast('success', 'FastAPI Connected', `Successfully connected to DeepTrace backend at ${inputUrl}`, 3000);
      } else {
        showToast('info', 'Client Simulation Mode Active', `No live FastAPI server reached at ${inputUrl}. Running on browser simulation engine.`, 4000);
      }
    } catch {
      setIsBackendConnected(false);
      showToast('info', 'Client Simulation Active', 'Running local mock forensic service.', 3000);
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleClearCache = () => {
    if (window.confirm('Clear all stored analyses, temporary blobs, and preferences?')) {
      clearAllHistory();
      localStorage.clear();
      showToast('info', 'Cache Cleared', 'Workspace local storage reset.', 2500);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="pb-2 border-b border-slate-800">
        <h2 className="text-2xl font-black text-slate-100 font-['Plus_Jakarta_Sans'] tracking-tight">
          Platform Preferences & Calibration
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Tune forensic model sensitivity, configure backend API bridge endpoints, and adjust display theme.
        </p>
      </div>

      {/* 1. Appearance Section */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
          <Sun className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-slate-100">Appearance & Theme</h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-slate-200 block">Color Interface</span>
            <span className="text-xs text-slate-400">
              Select between dark forensic mode (recommended) and high-contrast light mode.
            </span>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setTheme('dark')}
              className={clsx(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                theme === 'dark'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dark (Default)</span>
            </button>
            <button
              onClick={() => setTheme('light')}
              className={clsx(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                theme === 'light'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Light Mode</span>
            </button>
          </div>
        </div>
      </Card>

      {/* 2. Forensic Analysis Sensitivity */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-slate-100">Forensic Detection Sensitivity Preset</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 'strict',
              label: 'Strict (High Precision)',
              desc: 'Flags media only with high confidence (>90%). Reduces false positives.',
            },
            {
              id: 'balanced',
              label: 'Balanced (Standard)',
              desc: 'Optimal threshold balancing precision and recall across all 3 modalities.',
            },
            {
              id: 'recall',
              label: 'High Sensitivity (Recall)',
              desc: 'Flags even subtle or ambiguous spatial/temporal anomalies for human review.',
            },
          ].map(preset => (
            <div
              key={preset.id}
              onClick={() => {
                setSensitivityPreset(preset.id as any);
                showToast('info', 'Preset Updated', `Sensitivity calibrated to ${preset.label}`, 2000);
              }}
              className={clsx(
                'p-4 rounded-xl border text-left cursor-pointer transition-all space-y-2',
                sensitivityPreset === preset.id
                  ? 'bg-cyan-950/30 border-cyan-500/50 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-100">{preset.label}</span>
                {sensitivityPreset === preset.id && (
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{preset.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. Backend API Connection Configuration */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Server className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100">FastAPI Model Backend API Bridge</h3>
          </div>
          <span
            className={clsx(
              'text-[10px] font-mono px-2 py-0.5 rounded-full border',
              isBackendConnected
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
            )}
          >
            {isBackendConnected ? 'Connected (FastAPI)' : 'Client Sim Engine'}
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Configure the REST API endpoint for the future FastAPI Python PyTorch inference server (`VITE_API_BASE_URL`). If disconnected or unavailable, DeepTrace AI seamlessly uses the client-side forensic mock engine.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={inputUrl}
            onChange={e => setInputUrl(e.target.value)}
            placeholder="http://127.0.0.1:8000"
            className="flex-1 w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <Button
            variant="primary"
            size="sm"
            isLoading={isTestingConnection}
            onClick={handleSaveBackendUrl}
            leftIcon={<Activity className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Save & Test Ping
          </Button>
        </div>
      </Card>

      {/* 4. Local Storage & Cache Management */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
          <HardDrive className="w-4 h-4 text-rose-400" />
          <h3 className="text-sm font-bold text-slate-100">Storage & Workspace Reset</h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-slate-200 block">Reset Local Cache</span>
            <span className="text-xs text-slate-400">
              Clear all uploaded analysis records, generated report signatures, and local browser state.
            </span>
          </div>

          <Button
            variant="danger"
            size="sm"
            onClick={handleClearCache}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Clear Local Cache
          </Button>
        </div>
      </Card>

      {/* 5. System Diagnostics */}
      <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
        <span>DeepTrace AI System v2.4.0 • Build 2026.09</span>
        <span className="text-emerald-400">All Diagnostic Probes Nominal</span>
      </div>
    </div>
  );
};

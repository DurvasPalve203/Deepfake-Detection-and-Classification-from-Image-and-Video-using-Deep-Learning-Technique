import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanLine,
  History,
  FileText,
  BarChart3,
  Info,
  Settings,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import { clsx } from 'clsx';
import { useAnalysisContext } from '../../context/AnalysisContext';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/analyze', label: 'Analyze Media', icon: ScanLine, badge: 'Core' },
  { to: '/history', label: 'Analysis History', icon: History },
  { to: '/reports', label: 'Forensic Reports', icon: FileText },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/about', label: 'About & EDI Tech', icon: Info },
];

export const Sidebar: React.FC = () => {
  const { analyses } = useAnalysisContext();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#0B0D14] border-r border-slate-800/80 h-screen sticky top-0 shrink-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-5 flex items-center gap-3.5 border-b border-slate-800/80">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20">
          <div className="w-full h-full bg-[#090A0F] rounded-[10px] flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <ScanLine className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-['Plus_Jakarta_Sans']">
              DeepTrace<span className="text-cyan-400 ml-0.5">AI</span>
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider">MEDIA FORENSICS</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-5 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-mono">
          Main Workspace
        </div>
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon
                      className={clsx(
                        'w-4 h-4 transition-colors',
                        isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                      )}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {item.badge}
                    </span>
                  )}
                  {item.to === '/history' && analyses.length > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-mono bg-slate-800 text-slate-400 border border-slate-700">
                      {analyses.length}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Model Engine Status Card */}
      <div className="p-3 mx-3 mb-3 rounded-xl bg-gradient-to-b from-slate-900/90 to-[#0A0D14] border border-slate-800/90 shadow-inner">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Engines Active</span>
          </div>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        <div className="space-y-1.5 text-[11px] font-mono text-slate-300">
          <div className="flex justify-between items-center text-slate-400">
            <span>Vision Core</span>
            <span className="text-emerald-400 font-semibold">Online (v2.4)</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Temporal 3D</span>
            <span className="text-cyan-400 font-semibold">Ready (v1.8)</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Acoustic Mel</span>
            <span className="text-indigo-400 font-semibold">Ready (v2.1)</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-3 border-t border-slate-800/80 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors',
              isActive ? 'text-cyan-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            )
          }
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Settings</span>
        </NavLink>

        {/* User / Station Info */}
        <div className="pt-2 px-3 flex items-center justify-between border-t border-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-xs font-bold">
              FS
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-200">Forensics Lab</span>
              <span className="text-[10px] text-slate-400 font-mono">Station #01</span>
            </div>
          </div>
          <div className="text-slate-400 hover:text-slate-300 cursor-pointer">
            <Activity className="w-3.5 h-3.5 text-cyan-400/80" />
          </div>
        </div>
      </div>
    </aside>
  );
};

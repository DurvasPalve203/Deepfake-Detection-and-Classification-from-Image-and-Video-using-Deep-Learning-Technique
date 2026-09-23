import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  LayoutDashboard,
  ScanLine,
  History,
  FileText,
  BarChart3,
  Info,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import { clsx } from 'clsx';
import { useAnalysisContext } from '../../context/AnalysisContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/analyze', label: 'Analyze Media', icon: ScanLine },
  { to: '/history', label: 'Analysis History', icon: History },
  { to: '/reports', label: 'Forensic Reports', icon: FileText },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/about', label: 'About Project', icon: Info },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { analyses } = useAnalysisContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-72 max-w-[85vw] h-full bg-[#0B0D14] border-r border-slate-800 flex flex-col p-5 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <ScanLine className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="font-bold text-base text-slate-100 font-['Plus_Jakarta_Sans']">
                  DeepTrace <span className="text-cyan-400">AI</span>
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav list */}
            <div className="flex-1 py-6 space-y-1.5 overflow-y-auto">
              {NAV_ITEMS.map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      clsx(
                        'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                      )
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span>{item.label}</span>
                    </div>
                    {item.to === '/history' && analyses.length > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-slate-800 text-slate-400">
                        {analyses.length}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Status Footer */}
            <div className="pt-4 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>DeepTrace AI v2.4 (Active)</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

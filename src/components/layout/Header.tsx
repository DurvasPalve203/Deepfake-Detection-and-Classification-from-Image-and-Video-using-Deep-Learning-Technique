import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, PlusCircle, Bell, ExternalLink, ShieldCheck, Sun, Moon, Cpu } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useTheme } from '../../context/ThemeContext';
import { useAnalysisContext } from '../../context/AnalysisContext';

interface HeaderProps {
  onOpenMobileNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileNav }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isBackendConnected } = useAnalysisContext();

  const getPageTitle = (pathname: string) => {
    if (pathname === '/') return 'Overview';
    if (pathname.startsWith('/dashboard')) return 'Media Intelligence Dashboard';
    if (pathname.startsWith('/analyze')) return 'Forensic Media Workspace';
    if (pathname.startsWith('/result')) return 'Forensic Verification Dossier';
    if (pathname.startsWith('/history')) return 'Analysis Audit History';
    if (pathname.startsWith('/reports')) return 'Certified Forensic Reports';
    if (pathname.startsWith('/analytics')) return 'Model Analytics & Distribution';
    if (pathname.startsWith('/about')) return 'EDI Project Architecture & Research';
    if (pathname.startsWith('/settings')) return 'Platform Preferences & Calibration';
    return 'DeepTrace AI';
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#090A0F]/85 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <h1 className="text-base sm:text-lg font-bold text-slate-100 font-['Plus_Jakarta_Sans'] tracking-tight">
            {getPageTitle(location.pathname)}
          </h1>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-slate-600">/</span>
            <Badge variant="cyan" size="sm">
              EDI Prototype
            </Badge>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* API Backend status badge */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">Mode:</span>
          {isBackendConnected ? (
            <span className="text-emerald-400 font-medium">FastAPI Engine</span>
          ) : (
            <span className="text-cyan-400 font-medium">Client Sim (Mock)</span>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-300" />}
        </button>

        {/* Quick New Analysis CTA */}
        {location.pathname !== '/analyze' && (
          <Button
            size="sm"
            variant="primary"
            leftIcon={<PlusCircle className="w-4 h-4" />}
            onClick={() => navigate('/analyze')}
            className="hidden sm:inline-flex"
          >
            New Analysis
          </Button>
        )}

        {/* Project Home Link */}
        <Link
          to="/"
          className="p-2 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80 rounded-xl border border-slate-800 transition-colors flex items-center gap-1.5"
          title="View Landing Page"
        >
          <span>Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
};

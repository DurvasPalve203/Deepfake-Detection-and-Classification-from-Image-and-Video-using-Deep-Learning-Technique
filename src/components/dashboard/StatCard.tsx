import React, { ReactNode } from 'react';
import { Card } from '../common/Card';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: 'cyan' | 'indigo' | 'rose' | 'emerald';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'cyan',
}) => {
  const iconColors = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  return (
    <Card isHoverable className="p-5 flex flex-col justify-between space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            {title}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-100 font-['JetBrains_Mono'] tracking-tight">
            {value}
          </h3>
        </div>

        <div className={clsx('p-3 rounded-xl border shrink-0', iconColors[variant])}>
          {icon}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
        {subtitle && <span className="text-slate-400 truncate">{subtitle}</span>}
        {trend && (
          <span
            className={clsx(
              'font-mono text-[11px] font-semibold flex items-center gap-1',
              trend.isPositive ? 'text-emerald-400' : 'text-rose-400'
            )}
          >
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
    </Card>
  );
};

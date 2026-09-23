import React, { ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  variant?: 'cyan' | 'indigo' | 'emerald' | 'rose' | 'amber' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
  children: ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'cyan',
  size = 'md',
  dot = false,
  children,
  className,
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full border';

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 tracking-wider uppercase',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  const variantStyles = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    neutral: 'bg-slate-800/80 text-slate-300 border-slate-700/80',
  };

  const dotColor = {
    cyan: 'bg-cyan-400',
    indigo: 'bg-indigo-400',
    emerald: 'bg-emerald-400',
    rose: 'bg-rose-400',
    amber: 'bg-amber-400',
    neutral: 'bg-slate-400',
  };

  return (
    <span className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}>
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full animate-pulse', dotColor[variant])} />}
      {children}
    </span>
  );
};

import React, { HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isHoverable?: boolean;
  isGlass?: boolean;
  glow?: 'none' | 'cyan' | 'indigo' | 'rose' | 'emerald';
}

export const Card: React.FC<CardProps> = ({
  children,
  isHoverable = false,
  isGlass = true,
  glow = 'none',
  className,
  ...props
}) => {
  const glowStyles = {
    none: '',
    cyan: 'shadow-[0_0_25px_-5px_rgba(56,189,248,0.15)] border-cyan-500/30',
    indigo: 'shadow-[0_0_25px_-5px_rgba(99,102,241,0.15)] border-indigo-500/30',
    rose: 'shadow-[0_0_25px_-5px_rgba(244,63,94,0.15)] border-rose-500/30',
    emerald: 'shadow-[0_0_25px_-5px_rgba(16,185,129,0.15)] border-emerald-500/30',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'rounded-2xl border transition-all duration-300 relative overflow-hidden',
          isGlass ? 'glass-panel bg-[#10131B]/90' : 'bg-[#10131B]',
          'border-slate-800/80',
          isHoverable && 'glass-card-hover cursor-pointer hover:border-slate-700 hover:bg-[#141923]',
          glowStyles[glow],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};

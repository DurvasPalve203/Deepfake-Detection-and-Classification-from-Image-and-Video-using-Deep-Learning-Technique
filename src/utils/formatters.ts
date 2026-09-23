import { PredictionVerdict } from '../types/analysis';

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getVerdictLabel(verdict: PredictionVerdict): string {
  switch (verdict) {
    case 'AUTHENTIC':
      return 'Authentic Media';
    case 'LIKELY_MANIPULATED':
      return 'Likely Manipulated';
    case 'INCONCLUSIVE':
      return 'Inconclusive / Low Quality';
  }
}

export function getVerdictBadgeClasses(verdict: PredictionVerdict): {
  badge: string;
  dot: string;
  border: string;
  glow: string;
  text: string;
} {
  switch (verdict) {
    case 'AUTHENTIC':
      return {
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        dot: 'bg-emerald-400',
        border: 'border-emerald-500/40',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.25)]',
        text: 'text-emerald-400',
      };
    case 'LIKELY_MANIPULATED':
      return {
        badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
        dot: 'bg-rose-400',
        border: 'border-rose-500/40',
        glow: 'shadow-[0_0_20px_rgba(244,63,94,0.25)]',
        text: 'text-rose-400',
      };
    case 'INCONCLUSIVE':
      return {
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        dot: 'bg-amber-400',
        border: 'border-amber-500/40',
        glow: 'shadow-[0_0_20px_rgba(245,158,11,0.25)]',
        text: 'text-amber-400',
      };
  }
}

export function truncateHash(hash: string, start = 8, end = 6): string {
  if (!hash || hash.length <= start + end) return hash;
  return `${hash.slice(0, start)}...${hash.slice(-end)}`;
}

export async function generateSimulatedHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

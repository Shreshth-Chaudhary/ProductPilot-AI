'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Bot, ShieldCheck, Menu } from 'lucide-react';

interface DashboardHeaderProps {
  onMenuToggle?: () => void;
}

export function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0f131c]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold font-mono">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <Bot className="h-3.5 w-3.5" />
          <span>Stitch AI Co-pilot: Active</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold font-mono">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>No Auth Required (MVP)</span>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}

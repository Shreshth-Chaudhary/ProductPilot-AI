'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  ListTodo,
  CheckSquare,
  Info,
  Zap,
  X,
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI PRD Generator', href: '/dashboard/prd-generator', icon: FileText },
  { name: 'User Story Generator', href: '/dashboard/user-stories', icon: ListTodo },
  { name: 'Acceptance Criteria', href: '/dashboard/acceptance-criteria', icon: CheckSquare },
  { name: 'Architecture & About', href: '/about', icon: Info },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && onClose && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 shrink-0 bg-white/95 dark:bg-[#0f131c]/95 border-r border-slate-200 dark:border-white/10 flex flex-col justify-between p-4 select-none transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Workspace Context Badge */}
          <div className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-[#161b26] border border-slate-200/60 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-xs shadow-glow-indigo">
                PP
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                  ProductPilot AI
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
                  Stitch Core v1.1
                </p>
              </div>
            </div>

            {onClose ? (
              <button
                onClick={onClose}
                className="lg:hidden p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="AI Engine Active" />
            )}
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2 block font-mono">
              Command Navigation
            </span>
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold border border-brand-500/20 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#161b26]'
                  }`}
                >
                  {/* Stitch Active Indicator Bar */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-brand-600 dark:bg-brand-500 shadow-glow-indigo" />
                  )}
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-brand-600 dark:text-brand-400' : ''}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer AI Status Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-brand-900/40 via-brand-950/40 to-slate-900/60 border border-brand-500/30 text-xs space-y-2">
          <div className="flex items-center gap-1.5 text-brand-400 font-bold">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>Stitch AI Co-Pilot</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Synthesize PRDs, RICE scores, and user stories instantly.
          </p>
        </div>
      </aside>
    </>
  );
}

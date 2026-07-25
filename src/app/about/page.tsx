'use client';

import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Users,
  Target,
  FileCheck,
  CheckCircle2,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>About ProductPilot AI</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built to Eliminate Friction in Product Specifications
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            ProductPilot AI was created to solve a fundamental challenge in modern product management: bridging the gap between high-level vision and execution-ready specifications.
          </p>
        </div>
      </section>

      {/* Core Persona Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Who Is ProductPilot AI Built For?
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Designed for high-velocity teams who value clarity, speed, and precision in product documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Persona 1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 w-fit">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Product Managers
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Save hours drafting repetitive specifications. Generate structured PRDs with problem statements, personas, metrics, and risks in seconds.
              </p>
            </div>

            {/* Persona 2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 w-fit">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Technical PMs & Leads
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Turn complex feature descriptions into standardized user stories (<span className="font-mono text-brand-600 dark:text-brand-400">"As a user..."</span>) and Given-When-Then acceptance criteria ready for engineering tickets.
              </p>
            </div>

            {/* Persona 3 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 w-fit">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Founders & Operators
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Transform customer feedback or early product ideas into clear scope boundaries before spending valuable development resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack & Architecture Section */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Modular Architecture (V1 MVP)
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Clean code structure engineered for long-term scalability and LLM provider independence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <Layers className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                Next.js App Router & TypeScript
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Built on Next.js App Router with strict TypeScript interfaces, ensuring clean component separation and reliable state handling.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <Zap className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                Extensible AI Provider Abstraction
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Uses an isolated AI Service layer (`src/lib/ai/ai-service.ts`) with intelligent local fallback. Connecting live Gemini or OpenAI APIs requires zero UI refactoring.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <ShieldCheck className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                Light & Dark Mode Support
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Tailored CSS tokenized themes using `next-themes` with clean, modern SaaS palette (Zinc base + Indigo primary accents).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                Zero Auth / Pure MVP Focus
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Focused strictly on utility and core document generation without unnecessary authentication or database overhead.
              </p>
            </div>
          </div>

          <div className="text-center pt-6">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
            >
              Start Using ProductPilot AI
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

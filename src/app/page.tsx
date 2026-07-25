'use client';

import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  FileText,
  ListTodo,
  CheckSquare,
  Zap,
  ShieldCheck,
  Layers,
  CheckCircle2,
  Copy,
  ChevronRight,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useState } from 'react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'prd' | 'stories' | 'criteria'>('prd');
  const [copied, setCopied] = useState(false);

  const samplePrdText = `# Customer Support AI Bot PRD
## Objectives
- Reduce median ticket response time by 60%
- Automate tier-1 inquiry resolution for active users

## User Personas
- Sarah (Support Operations Manager): Needs real-time escalation alerts.
- Alex (End Customer): Wants instant 24/7 resolution without queue delays.`;

  const handleCopySample = () => {
    navigator.clipboard.writeText(samplePrdText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        {/* Subtle Background Glow Accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/10 dark:bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
            <span>Introducing ProductPilot AI v1.0</span>
            <span className="h-1 w-1 rounded-full bg-brand-400" />
            <span className="text-brand-600 dark:text-brand-400">MVP Release</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Write Production-Ready PRDs & User Stories <span className="text-brand-600 dark:text-brand-400">10x Faster</span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            ProductPilot AI is the minimalist assistant for Product Managers. Transform high-level product ideas into structured PRDs, formatted user stories, and acceptance criteria in seconds.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base shadow-lg shadow-brand-500/25 transition-all hover:shadow-brand-500/35 active:scale-[0.98]"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-base shadow-sm transition-colors"
            >
              Explore Architecture
            </Link>
          </div>

          {/* Key Value Pill Highlights */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              No Auth Required (MVP)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Instant Markdown Export
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Modular LLM Integration Ready
            </span>
          </div>

          {/* Interactive Live Demo Preview Box */}
          <div className="mt-14 max-w-4xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden text-left">
            {/* Box Header Bar */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  product-pilot-preview.md
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setActiveTab('prd')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeTab === 'prd'
                      ? 'bg-brand-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  PRD View
                </button>
                <button
                  onClick={() => setActiveTab('stories')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeTab === 'stories'
                      ? 'bg-brand-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  User Stories
                </button>
                <button
                  onClick={() => setActiveTab('criteria')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeTab === 'criteria'
                      ? 'bg-brand-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Acceptance Criteria
                </button>
              </div>
            </div>

            {/* Box Content Body */}
            <div className="p-6 font-mono text-sm text-slate-800 dark:text-slate-200 bg-slate-900/5 dark:bg-slate-950/40 min-h-[220px]">
              {activeTab === 'prd' && (
                <div className="space-y-3 font-sans">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      AI Customer Support Bot — Product Requirements Document
                    </h3>
                    <button
                      onClick={handleCopySample}
                      className="inline-flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 hover:underline"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      {copied ? 'Copied!' : 'Copy Markdown'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
                    <strong className="text-slate-900 dark:text-slate-200">Problem Statement:</strong> Customer support teams spend 40% of their working hours answering repetitive tier-1 inquiries, leading to delayed escalations for high-value enterprise clients.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 block mb-1">Target Persona</span>
                      <p className="text-xs text-slate-700 dark:text-slate-300">Support Ops Leads seeking automated queue management & 24/7 ticket routing.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 block mb-1">Success Metric</span>
                      <p className="text-xs text-slate-700 dark:text-slate-300">60% reduction in first-response time within 30 days of deployment.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'stories' && (
                <div className="space-y-3 font-sans">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Generated User Story Output (Standard Format)
                  </span>
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 mb-2">
                      High Priority • US-01
                    </span>
                    <p className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed">
                      "As a <span className="text-brand-600 dark:text-brand-400 font-bold">Support Manager</span>, I want <span className="text-brand-600 dark:text-brand-400 font-bold">to configure auto-reply triggers based on keywords</span> so that <span className="text-brand-600 dark:text-brand-400 font-bold">common customer questions are answered instantly without human agent intervention</span>."
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'criteria' && (
                <div className="space-y-3 font-sans">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Acceptance Criteria (Given - When - Then)
                  </span>
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                    <p><strong className="text-brand-600 dark:text-brand-400">GIVEN</strong> an active support ticket containing registered intent keywords</p>
                    <p><strong className="text-brand-600 dark:text-brand-400">WHEN</strong> the AI triage engine evaluates the incoming payload</p>
                    <p><strong className="text-brand-600 dark:text-brand-400">THEN</strong> an automated solution draft is posted with an instant resolution link.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
              Everything You Need to Pilot Your Product
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
              Purpose-built tools for modern SaaS product managers. Minimalist interface, maximum clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 transition-all hover:shadow-lg group">
              <div className="p-3 rounded-xl bg-brand-600/10 text-brand-600 dark:text-brand-400 w-fit mb-5 group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                AI PRD Generator
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Input basic product details and receive a full, structured PRD including problem statement, objectives, personas, requirements, metrics, and risks.
              </p>
              <Link
                href="/dashboard/prd-generator"
                className="inline-flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline gap-1"
              >
                Launch PRD Tool <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 transition-all hover:shadow-lg group">
              <div className="p-3 rounded-xl bg-brand-600/10 text-brand-600 dark:text-brand-400 w-fit mb-5 group-hover:scale-110 transition-transform">
                <ListTodo className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                User Story Generator
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Generate clean user stories following the standard format: <span className="font-mono text-xs text-brand-600 dark:text-brand-400">"As a [user], I want [goal] so that [benefit]."</span>
              </p>
              <Link
                href="/dashboard/user-stories"
                className="inline-flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline gap-1"
              >
                Generate Stories <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 transition-all hover:shadow-lg group">
              <div className="p-3 rounded-xl bg-brand-600/10 text-brand-600 dark:text-brand-400 w-fit mb-5 group-hover:scale-110 transition-transform">
                <CheckSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Acceptance Criteria
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Convert stories into explicit Given-When-Then criteria and interactive verification checklists ready for Jira or Linear ticket descriptions.
              </p>
              <Link
                href="/dashboard/acceptance-criteria"
                className="inline-flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline gap-1"
              >
                Create Criteria <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Streamline Your Product Workflow?
          </h2>
          <p className="mt-4 text-slate-300 max-w-xl mx-auto text-base">
            Start creating clear, structured product documents with ProductPilot AI today. No signup required for MVP evaluation.
          </p>
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-base shadow-lg shadow-brand-600/30 transition-all active:scale-[0.98]"
            >
              Go to Dashboard
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

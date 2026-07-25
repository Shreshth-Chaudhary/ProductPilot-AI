'use client';

import { useState } from 'react';
import {
  FileText,
  Sparkles,
  Save,
  AlertCircle,
  RefreshCw,
  Edit3,
  Users,
  Target,
  ShieldAlert,
  Zap,
  Layers,
  Smartphone,
  Cpu,
  ShoppingCart,
  Share2,
  ListTodo,
  CheckSquare,
  Activity,
  Milestone,
  HelpCircle,
  Truck,
  Film,
  Car,
} from 'lucide-react';
import { AIService } from '@/lib/ai/ai-service';
import { PRDInput, PRDOutput, RICEData } from '@/lib/ai/types';
import { DocumentStore } from '@/lib/storage/document-store';
import { RICECalculator } from '@/components/prd/rice-calculator';
import { ExportModal } from '@/components/export-modal';

export default function PRDGeneratorPage() {
  const [formInput, setFormInput] = useState<PRDInput>({
    productName: 'Swiggy Food & Grocery Express',
    productDescription: 'Hyper-local food and quick-commerce delivery platform connecting consumers, merchant kitchens, and delivery partner fleets.',
    targetUsers: 'Hungry Consumers, Restaurant Kitchen Managers, Delivery Partners',
    problemStatement: 'Inaccurate delivery ETAs and delayed order prep times cause cold food delivery and high order cancellation rates.',
    goal: 'Reduce median order delivery time to under 26 minutes and boost repeat customer retention.',
    templateCategory: 'custom',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPRD, setGeneratedPRD] = useState<PRDOutput | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Preset Buttons Handlers
  const handlePresetSelect = (preset: 'swiggy' | 'netflix' | 'uber' | 'aisaas' | 'ecommerce') => {
    if (preset === 'swiggy') {
      setFormInput({
        productName: 'Swiggy Food Express',
        productDescription: 'Hyper-local food and quick-commerce delivery platform connecting consumers, merchant kitchens, and delivery partner fleets with sub-30 min SLA.',
        targetUsers: 'Hungry Consumers, Restaurant Partners, Delivery Fleet Executives',
        problemStatement: 'Inaccurate delivery ETAs and kitchen prep delays cause customer cancellations during peak dinner hours.',
        goal: 'Reduce average order delivery time to under 26 minutes and increase 30-day retention by 35%.',
        templateCategory: 'custom',
      });
    } else if (preset === 'netflix') {
      setFormInput({
        productName: 'Netflix StreamEngine',
        productDescription: 'Global 4K HDR video streaming platform featuring adaptive bitrate playback, personalized AI recommendations, and multi-device profile syncing.',
        targetUsers: 'Binge Watchers, Household Subscribers, Mobile Streamers',
        problemStatement: 'Subscribers face choice paralysis due to cluttered content carousels and stream quality drops on variable cellular networks.',
        goal: 'Increase average daily watch time per subscriber from 42 mins to 68 mins and reduce churn by 18%.',
        templateCategory: 'custom',
      });
    } else if (preset === 'uber') {
      setFormInput({
        productName: 'Uber Mobility Hub',
        productDescription: 'Urban ride-sharing platform connecting commuters with driver fleets via real-time GPS dispatch, dynamic surge heatmaps, and upfront fares.',
        targetUsers: 'Daily Commuters, Fleet Drivers, City Travelers',
        problemStatement: 'Riders face long pickup wait times during peak hours, while drivers lose revenue hunting for passengers without route optimization.',
        goal: 'Reduce average rider pickup wait time from 9 mins to under 3.5 mins.',
        templateCategory: 'custom',
      });
    } else if (preset === 'aisaas') {
      setFormInput({
        productName: 'ProductPilot AI Co-pilot',
        productDescription: 'AI co-pilot platform for Product Managers to draft 11-section PRDs, map user stories, and prioritize backlogs with RICE scores.',
        targetUsers: 'Product Managers, Engineering Leads, Product Operations',
        problemStatement: 'Product Managers spend 15+ hours per week manually writing PRDs and formatting Jira tickets, causing sprint planning bottlenecks.',
        goal: 'Reduce PRD creation time by 75% across product teams.',
        templateCategory: 'custom',
      });
    } else if (preset === 'ecommerce') {
      setFormInput({
        productName: 'Shopify Express Checkout',
        productDescription: 'High-conversion checkout sheet supporting Apple Pay, Google Pay, and inventory locks.',
        targetUsers: 'Mobile Shoppers, Merchants',
        problemStatement: 'Mobile shoppers abandon 68% of shopping carts due to lengthy shipping forms.',
        goal: 'Increase mobile cart checkout completion rate by 24%.',
        templateCategory: 'custom',
      });
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInput.productName.trim()) {
      setError('Please provide a Product Name or Idea.');
      return;
    }

    setError(null);
    setLoading(true);
    setSavedSuccess(false);

    try {
      const result = await AIService.generatePRD(formInput);
      setGeneratedPRD(result);
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating the PRD.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRICEScore = (frId: string, newRice: RICEData) => {
    if (!generatedPRD) return;
    const updatedFRs = generatedPRD.functionalRequirements.map((fr) =>
      fr.id === frId ? { ...fr, rice: newRice } : fr
    );
    setGeneratedPRD({ ...generatedPRD, functionalRequirements: updatedFRs });
  };

  const handleSaveDocument = () => {
    if (!generatedPRD) return;
    DocumentStore.save(
      formInput.productName || 'Generated PRD Document',
      'PRD',
      generatedPRD,
      `PRD for ${formInput.productName}. Synthesized with 11 custom sections & RICE scores.`
    );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <FileText className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Dynamic AI PRD Generator (11 Sections)
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Every section is synthesized dynamically for your specific product domain (Swiggy, Netflix, Uber, AI SaaS, E-Commerce, or Custom Ideas). Zero hardcoded templates.
          </p>
        </div>
      </div>

      {/* Domain Quick Presets Selector Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161b26] border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
        <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2 font-mono">
          <Zap className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          Test Domain Presets:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handlePresetSelect('swiggy')}
            className="px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-brand-500/50"
          >
            <Truck className="h-3.5 w-3.5 text-amber-500" />
            Swiggy (Food Delivery)
          </button>

          <button
            type="button"
            onClick={() => handlePresetSelect('netflix')}
            className="px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-brand-500/50"
          >
            <Film className="h-3.5 w-3.5 text-red-500" />
            Netflix (Video Streaming)
          </button>

          <button
            type="button"
            onClick={() => handlePresetSelect('uber')}
            className="px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-brand-500/50"
          >
            <Car className="h-3.5 w-3.5 text-emerald-500" />
            Uber (Ride-Sharing)
          </button>

          <button
            type="button"
            onClick={() => handlePresetSelect('aisaas')}
            className="px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-brand-500/50"
          >
            <Cpu className="h-3.5 w-3.5 text-brand-500" />
            AI B2B SaaS Co-Pilot
          </button>

          <button
            type="button"
            onClick={() => handlePresetSelect('ecommerce')}
            className="px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-brand-500/50"
          >
            <ShoppingCart className="h-3.5 w-3.5 text-purple-500" />
            Shopify E-Commerce
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs & Output Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-5 bg-white dark:bg-[#161b26] p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            Product Input Details
          </h2>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Product Name / Brand <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formInput.productName}
                onChange={(e) => setFormInput({ ...formInput, productName: e.target.value })}
                placeholder="e.g. Swiggy, Netflix, Uber, or your Custom Idea"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Product Scope & Core Concept
              </label>
              <textarea
                rows={3}
                value={formInput.productDescription}
                onChange={(e) => setFormInput({ ...formInput, productDescription: e.target.value })}
                placeholder="Describe what the product does and key capabilities..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Users & Stakeholders
              </label>
              <input
                type="text"
                value={formInput.targetUsers}
                onChange={(e) => setFormInput({ ...formInput, targetUsers: e.target.value })}
                placeholder="e.g. Consumers, Drivers, Restaurant Partners"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Core Problem Statement
              </label>
              <textarea
                rows={3}
                value={formInput.problemStatement}
                onChange={(e) => setFormInput({ ...formInput, problemStatement: e.target.value })}
                placeholder="What core user pain point or inefficiency does this solve?"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Primary Business Goal / Metric Target
              </label>
              <input
                type="text"
                value={formInput.goal}
                onChange={(e) => setFormInput({ ...formInput, goal: e.target.value })}
                placeholder="e.g. Reduce delivery time to < 26 mins"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Synthesizing 11 PRD Sections...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Dynamic PRD
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: 11-Section PRD Document Viewer */}
        <div className="lg:col-span-7 bg-white dark:bg-[#161b26] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden flex flex-col min-h-[550px]">
          {/* Document Header & Actions */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 font-mono">
                11-SECTION PRD
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate max-w-[200px]">
                {formInput.productName || 'Untitled Spec'}
              </span>
            </div>

            {generatedPRD && (
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1 ${
                    isEditing
                      ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  {isEditing ? 'Editing' : 'Edit'}
                </button>

                <button
                  onClick={() => setExportModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 transition-colors"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Export (Jira/Linear)
                </button>

                <button
                  onClick={handleSaveDocument}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-600 text-white hover:bg-brand-700 flex items-center gap-1 transition-colors shadow-sm"
                >
                  <Save className="h-3.5 w-3.5" />
                  {savedSuccess ? 'Saved!' : 'Save Document'}
                </button>
              </div>
            )}
          </div>

          {/* Document Content View */}
          <div className="p-6 flex-1 overflow-y-auto space-y-8">
            {loading ? (
              <div className="space-y-6 animate-pulse">
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                  <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                </div>
              </div>
            ) : !generatedPRD ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 text-slate-400">
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 mb-4">
                  <FileText className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
                  Ready to Generate PRD
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  Choose a preset above (Swiggy, Netflix, Uber, AI SaaS, E-Commerce) or enter your custom product idea to generate all 11 PRD sections.
                </p>
              </div>
            ) : (
              <div className="space-y-8 text-slate-800 dark:text-slate-200">
                {/* 1. Product Overview */}
                <section className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-brand-500" />
                    1. Product Overview
                  </h2>
                  <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    {generatedPRD.productOverview}
                  </p>
                </section>

                {/* 2. Problem Statement */}
                <section className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-amber-500" />
                    2. Problem Statement
                  </h2>
                  <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/20">
                    {generatedPRD.problemStatement}
                  </p>
                </section>

                {/* 3. Business Goals */}
                <section className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-emerald-500" />
                    3. Business Goals & Key Targets
                  </h2>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                    {generatedPRD.businessGoals.map((g, i) => (
                      <li key={i} className="leading-relaxed">{g}</li>
                    ))}
                  </ul>
                </section>

                {/* 4. User Personas */}
                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-brand-500" />
                    4. Target User Personas
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {generatedPRD.userPersonas.map((persona, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 dark:text-white">{persona.name}</h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-500/10 text-brand-500">
                            {persona.role}
                          </span>
                        </div>
                        <div className="space-y-1 pt-1">
                          <p className="text-[10px] text-slate-400 font-semibold uppercase">Pain Points:</p>
                          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-0.5 pl-1">
                            {persona.painPoints.map((p, i) => (
                              <li key={i}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 5. User Journey */}
                <section className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <Milestone className="h-4 w-4 text-purple-500" />
                    5. End-to-End User Journey
                  </h2>
                  <div className="space-y-2">
                    {generatedPRD.userJourney.map((step, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs">
                        <span className="h-5 w-5 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center font-mono font-bold text-[11px] shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 6. Functional Requirements & RICE Scores */}
                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-brand-500" />
                    6. Functional Requirements & RICE Scores
                  </h2>
                  <div className="space-y-4">
                    {generatedPRD.functionalRequirements.map((fr) => (
                      <div
                        key={fr.id}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono font-bold text-brand-500">{fr.id}</span>
                              <span className="font-bold text-slate-900 dark:text-white">{fr.title}</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                              {fr.description}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded font-mono font-bold shrink-0 ${
                              fr.priority === 'High'
                                ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                                : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                            }`}
                          >
                            {fr.priority}
                          </span>
                        </div>

                        {/* Interactive RICE Calculator widget */}
                        <RICECalculator
                          initialData={fr.rice}
                          onUpdate={(updatedRice) => handleUpdateRICEScore(fr.id, updatedRice)}
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {/* 7. Non-Functional Requirements */}
                <section className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-emerald-500" />
                    7. Non-Functional Requirements (Performance, Security, SLAs)
                  </h2>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside font-mono">
                    {generatedPRD.nonFunctionalRequirements.map((nfr, i) => (
                      <li key={i}>{nfr}</li>
                    ))}
                  </ul>
                </section>

                {/* 8. User Stories */}
                <section className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <ListTodo className="h-4 w-4 text-brand-500" />
                    8. User Stories
                  </h2>
                  <div className="space-y-2">
                    {generatedPRD.userStories.map((story) => (
                      <div key={story.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                        <span className="font-mono font-bold text-brand-500 mr-2">{story.id}</span>
                        <span>"{story.formattedStory}"</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 9. Acceptance Criteria */}
                <section className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-emerald-500" />
                    9. Acceptance Criteria (Given-When-Then)
                  </h2>
                  <div className="space-y-3">
                    {generatedPRD.acceptanceCriteria.map((ac) => (
                      <div key={ac.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                        <p className="font-mono font-bold text-brand-500 mb-1">{ac.id}</p>
                        <p><strong>GIVEN</strong> {ac.given}</p>
                        <p><strong>WHEN</strong> {ac.when}</p>
                        <p><strong>THEN</strong> {ac.then}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 10. Success Metrics & 11. Risks */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Target className="h-4 w-4 text-emerald-500" />
                      10. Success Metrics
                    </h3>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside font-mono">
                      {generatedPRD.successMetrics.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <ShieldAlert className="h-4 w-4 text-amber-500" />
                      11. Risks & Mitigations
                    </h3>
                    <div className="space-y-2 text-xs">
                      {generatedPRD.risks.map((r, i) => (
                        <div key={i} className="border-l-2 border-amber-400 pl-2">
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{r.risk}</p>
                          <p className="text-slate-500 dark:text-slate-400">{r.mitigation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {generatedPRD && (
        <ExportModal
          isOpen={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
          title={formInput.productName || 'Product Requirements Document'}
          type="PRD"
          content={generatedPRD}
        />
      )}
    </div>
  );
}

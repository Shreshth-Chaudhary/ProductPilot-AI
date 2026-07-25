'use client';

import { useState } from 'react';
import {
  CheckSquare,
  Sparkles,
  Save,
  AlertCircle,
  RefreshCw,
  Zap,
  Check,
  Share2,
} from 'lucide-react';
import { AIService } from '@/lib/ai/ai-service';
import { AcceptanceCriteriaInput, AcceptanceCriteriaOutput } from '@/lib/ai/types';
import { DocumentStore } from '@/lib/storage/document-store';
import { ExportModal } from '@/components/export-modal';

export default function AcceptanceCriteriaPage() {
  const [input, setInput] = useState<AcceptanceCriteriaInput>({
    featureName: '',
    userStory: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<AcceptanceCriteriaOutput | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const handleLoadPreset = (preset: string) => {
    if (preset === 'support-triage') {
      setInput({
        featureName: 'AI Support Ticket Auto-Triage',
        userStory: 'As a Support Lead, I want incoming tickets auto-categorized by urgency so that critical bugs get assigned immediately.',
      });
    } else if (preset === 'sso-login') {
      setInput({
        featureName: 'SAML 2.0 Single Sign-On',
        userStory: 'As an IT Admin, I want enterprise team members to log in via Okta SSO so that access remains compliant.',
      });
    } else if (preset === 'preview-modal') {
      setInput({
        featureName: 'Real-Time Document Preview Modal',
        userStory: 'As a Product Manager, I want to preview generated PRDs in a full-screen editor so that I can audit contents.',
      });
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.featureName.trim() || !input.userStory.trim()) {
      setError('Please provide both Feature Name and User Story.');
      return;
    }

    setError(null);
    setLoading(true);
    setSavedSuccess(false);

    try {
      const res = await AIService.generateAcceptanceCriteria(input);
      setOutput(res);
    } catch (err: any) {
      setError(err.message || 'Failed to generate acceptance criteria.');
    } finally {
      setLoading(false);
    }
  };

  const toggleCheck = (id: string) => {
    setCheckedState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    if (!output) return;
    DocumentStore.save(
      `${output.featureName} Criteria`,
      'AcceptanceCriteria',
      output,
      `Acceptance Criteria for story: ${output.userStory}`
    );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
              <CheckSquare className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Acceptance Criteria Generator
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Convert user stories into explicit Given-When-Then rules & verification checklists ready for Jira or Linear tickets.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-medium">Presets:</span>
          <button
            onClick={() => handleLoadPreset('support-triage')}
            className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
          >
            Auto-Triage
          </button>
          <button
            onClick={() => handleLoadPreset('sso-login')}
            className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
          >
            SSO Login
          </button>
          <button
            onClick={() => handleLoadPreset('preview-modal')}
            className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
          >
            Preview Modal
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            Story Context
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
                Feature Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={input.featureName}
                onChange={(e) => setInput({ ...input, featureName: e.target.value })}
                placeholder="e.g. AI Support Ticket Auto-Triage"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                User Story <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={input.userStory}
                onChange={(e) => setInput({ ...input, userStory: e.target.value })}
                placeholder='e.g. "As a Support Lead, I want incoming tickets auto-categorized by urgency..."'
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Synthesizing Criteria...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Acceptance Criteria
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Output Viewer */}
        <div className="lg:col-span-7 space-y-4">
          {output && (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-sm">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {output.criteria.length} Criteria Scenarios Generated
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExportModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 transition-colors"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Export (Jira/Linear)
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-600 text-white hover:bg-brand-700 flex items-center gap-1 transition-colors shadow-sm"
                >
                  <Save className="h-3.5 w-3.5" />
                  {savedSuccess ? 'Saved!' : 'Save Criteria'}
                </button>
              </div>
            </div>
          )}

          {loading ? (
            /* Skeleton Loading State */
            <div className="space-y-4 animate-pulse">
              {[1, 2].map((i) => (
                <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                  <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                </div>
              ))}
            </div>
          ) : !output ? (
            /* Empty State */
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400 min-h-[400px] flex flex-col items-center justify-center">
              <CheckSquare className="h-10 w-10 text-slate-400 mb-3" />
              <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
                No Criteria Generated Yet
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Enter your feature name and user story on the left to generate structured Given-When-Then rules.
              </p>
            </div>
          ) : (
            /* Generated Criteria Cards */
            <div className="space-y-5">
              {output.criteria.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                      {item.id}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Given-When-Then Rule</span>
                  </div>

                  {/* Given-When-Then Box */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
                    <p className="text-slate-700 dark:text-slate-300">
                      <strong className="text-brand-600 dark:text-brand-400 font-bold mr-1">GIVEN</strong> {item.given}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300">
                      <strong className="text-brand-600 dark:text-brand-400 font-bold mr-1">WHEN</strong> {item.when}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300">
                      <strong className="text-brand-600 dark:text-brand-400 font-bold mr-1">THEN</strong> {item.then}
                    </p>
                  </div>

                  {/* Interactive Verification Checklist */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                      Sprint Verification Checklist:
                    </span>
                    <div className="space-y-1.5">
                      {item.checklistItems.map((check, idx) => {
                        const checkKey = `${item.id}-${idx}`;
                        const isDone = !!checkedState[checkKey];
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleCheck(checkKey)}
                            className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors text-xs text-slate-700 dark:text-slate-300 select-none"
                          >
                            <div
                              className={`h-4 w-4 rounded flex items-center justify-center border transition-colors ${
                                isDone
                                  ? 'bg-emerald-500 border-emerald-500 text-white'
                                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                              }`}
                            >
                              {isDone && <Check className="h-3 w-3" />}
                            </div>
                            <span className={isDone ? 'line-through text-slate-400' : ''}>
                              {check}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Export Modal */}
      {output && (
        <ExportModal
          isOpen={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
          title={`${output.featureName} Criteria`}
          type="AcceptanceCriteria"
          content={output}
        />
      )}
    </div>
  );
}

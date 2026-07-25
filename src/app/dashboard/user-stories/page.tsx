'use client';

import { useState } from 'react';
import {
  ListTodo,
  Sparkles,
  Copy,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Share2,
  Zap,
} from 'lucide-react';
import { AIService } from '@/lib/ai/ai-service';
import { UserStoryInput, UserStoriesOutput, UserStory } from '@/lib/ai/types';
import { DocumentStore } from '@/lib/storage/document-store';
import { ExportModal } from '@/components/export-modal';

export default function UserStoriesPage() {
  const [input, setInput] = useState<UserStoryInput>({
    featureName: '',
    featureDescription: '',
    targetUserRole: 'Product Manager',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<UserStoriesOutput | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const handleLoadPreset = (preset: string) => {
    if (preset === 'email-digest') {
      setInput({
        featureName: 'Automated Email Digest',
        featureDescription: 'Send weekly metric summaries to active users based on workspace activity.',
        targetUserRole: 'Product Lead',
      });
    } else if (preset === 'sso-auth') {
      setInput({
        featureName: 'SAML 2.0 Single Sign-On',
        featureDescription: 'Allow enterprise team members to log in using Okta or Azure AD credentials.',
        targetUserRole: 'IT Administrator',
      });
    } else if (preset === 'csv-export') {
      setInput({
        featureName: 'CSV Data Exporter',
        featureDescription: 'Enable one-click downloading of raw table metrics into CSV files.',
        targetUserRole: 'Data Analyst',
      });
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.featureName.trim()) {
      setError('Please provide at least a Feature Name.');
      return;
    }

    setError(null);
    setLoading(true);
    setSavedSuccess(false);

    try {
      const res = await AIService.generateUserStories(input);
      setOutput(res);
    } catch (err: any) {
      setError(err.message || 'Failed to generate user stories.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopySingle = (story: UserStory) => {
    navigator.clipboard.writeText(story.formattedStory);
    setCopiedId(story.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = () => {
    if (!output) return;
    DocumentStore.save(
      `${output.featureName} Stories`,
      'UserStory',
      output,
      `Generated ${output.stories.length} user stories for feature: ${output.featureName}`
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
            <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
              <ListTodo className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              User Story Generator
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Convert feature definitions into standard format: <span className="font-mono text-brand-600 dark:text-brand-400 font-semibold">"As a [user], I want [goal] so that [benefit]."</span>
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-medium">Presets:</span>
          <button
            onClick={() => handleLoadPreset('email-digest')}
            className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
          >
            Email Digest
          </button>
          <button
            onClick={() => handleLoadPreset('sso-auth')}
            className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
          >
            SSO Auth
          </button>
          <button
            onClick={() => handleLoadPreset('csv-export')}
            className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
          >
            CSV Exporter
          </button>
        </div>
      </div>

      {/* Grid: Form & Output Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            Feature Context
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
                placeholder="e.g. Automated Email Digest"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Feature Description
              </label>
              <textarea
                rows={3}
                value={input.featureDescription}
                onChange={(e) => setInput({ ...input, featureDescription: e.target.value })}
                placeholder="Describe what this feature will allow users to accomplish..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target User Role
              </label>
              <input
                type="text"
                value={input.targetUserRole}
                onChange={(e) => setInput({ ...input, targetUserRole: e.target.value })}
                placeholder="e.g. Product Lead, Admin, End User"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
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
                  Generating Stories...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate User Stories
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Generated Stories */}
        <div className="lg:col-span-7 space-y-4">
          {/* Top Action Bar */}
          {output && (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-sm">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Generated {output.stories.length} User Stories
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
                  {savedSuccess ? 'Saved!' : 'Save Stories'}
                </button>
              </div>
            </div>
          )}

          {loading ? (
            /* Skeleton Loading State */
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                </div>
              ))}
            </div>
          ) : !output ? (
            /* Empty State */
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400 min-h-[400px] flex flex-col items-center justify-center">
              <ListTodo className="h-10 w-10 text-slate-400 mb-3" />
              <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
                No Stories Generated Yet
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Enter a feature name and click "Generate User Stories" to create standardized user story cards.
              </p>
            </div>
          ) : (
            /* Story Cards */
            <div className="space-y-4">
              {output.stories.map((story) => (
                <div
                  key={story.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                        {story.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                          story.priority === 'High'
                            ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                            : story.priority === 'Medium'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {story.priority} Priority
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Effort: {story.estimatedEffort}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopySingle(story)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors"
                      title="Copy Story"
                    >
                      {copiedId === story.id ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Structured Story Text */}
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
                    "As a <span className="text-brand-600 dark:text-brand-400 font-bold">{story.userRole}</span>, I want <span className="text-brand-600 dark:text-brand-400 font-bold">{story.goal}</span> so that <span className="text-brand-600 dark:text-brand-400 font-bold">{story.benefit}</span>."
                  </p>
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
          title={`${output.featureName} User Stories`}
          type="UserStory"
          content={output}
        />
      )}
    </div>
  );
}

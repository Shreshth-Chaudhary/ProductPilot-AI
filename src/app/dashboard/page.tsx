'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  ListTodo,
  CheckSquare,
  Sparkles,
  ArrowRight,
  Plus,
  Trash2,
  Share2,
  Clock,
  Zap,
  FolderOpen,
  Eye,
  Search,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Flame,
} from 'lucide-react';
import { DocumentStore } from '@/lib/storage/document-store';
import { SavedDocument } from '@/lib/ai/types';
import { formatDate } from '@/lib/utils';
import { ExportModal } from '@/components/export-modal';

export default function DashboardPage() {
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'PRD' | 'UserStory' | 'AcceptanceCriteria'>('All');
  const [selectedDoc, setSelectedDoc] = useState<SavedDocument | null>(null);
  const [exportModalDoc, setExportModalDoc] = useState<SavedDocument | null>(null);

  useEffect(() => {
    setDocuments(DocumentStore.getAll());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this document?')) {
      const updated = DocumentStore.delete(id);
      setDocuments(updated);
      if (selectedDoc?.id === id) {
        setSelectedDoc(null);
      }
    }
  };

  // Document Filtering Logic
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'All' || doc.type === typeFilter;

    return matchesSearch && matchesType;
  });

  // Calculate PM Impact Metrics
  const prdCount = documents.filter((d) => d.type === 'PRD').length;
  const storyCount = documents.filter((d) => d.type === 'UserStory').length;
  const criteriaCount = documents.filter((d) => d.type === 'AcceptanceCriteria').length;

  const estimatedHoursSaved = (prdCount * 4.5 + storyCount * 1.5 + criteriaCount * 1.2).toFixed(1);
  const sprintReadinessScore = Math.min(100, Math.round(documents.length * 15 + 40));

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome & Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-200 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>ProductPilot Assistant Active</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome to your Product Command Center
            </h2>
            <p className="text-sm text-brand-100/80 leading-relaxed">
              Synthesize PRDs with RICE feature scores, map standardized user stories, and produce sprint-ready acceptance criteria.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/prd-generator"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-brand-900 hover:bg-brand-50 font-bold text-xs shadow-sm transition-all"
            >
              <Plus className="h-4 w-4" />
              Create PRD
            </Link>
          </div>
        </div>
      </div>

      {/* PM Impact & Productivity Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
            <FolderOpen className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Total Specs Created
            </span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {documents.length}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Est. PM Hours Saved
            </span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              ~{estimatedHoursSaved} hrs
            </span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Sprint Readiness Score
            </span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {sprintReadinessScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          Generators & Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Action 1 */}
          <Link
            href="/dashboard/prd-generator"
            className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/60 transition-all hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 w-fit mb-3 group-hover:scale-105 transition-transform">
                <FileText className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                AI PRD Generator
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Draft PRDs with problem statements, personas, and live RICE scoring.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400">
              Start PRD <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Action 2 */}
          <Link
            href="/dashboard/user-stories"
            className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/60 transition-all hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 w-fit mb-3 group-hover:scale-105 transition-transform">
                <ListTodo className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                User Story Generator
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Convert features into standard "As a [user]..." story cards.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400">
              Generate Stories <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Action 3 */}
          <Link
            href="/dashboard/acceptance-criteria"
            className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/60 transition-all hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 w-fit mb-3 group-hover:scale-105 transition-transform">
                <CheckSquare className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                Acceptance Criteria
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Produce Given-When-Then rules & verification checklists.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400">
              Create Criteria <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Projects & Search/Filter Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FolderOpen className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            Saved Documents ({filteredDocuments.length})
          </h3>

          {/* Search Bar & Filter Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 w-48"
              />
            </div>

            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setTypeFilter('All')}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                  typeFilter === 'All'
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setTypeFilter('PRD')}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                  typeFilter === 'PRD'
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                PRD
              </button>
              <button
                onClick={() => setTypeFilter('UserStory')}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                  typeFilter === 'UserStory'
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Stories
              </button>
              <button
                onClick={() => setTypeFilter('AcceptanceCriteria')}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                  typeFilter === 'AcceptanceCriteria'
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Criteria
              </button>
            </div>
          </div>
        </div>

        {filteredDocuments.length === 0 ? (
          /* Empty Filter State */
          <div className="p-8 text-center rounded-xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800">
            <FolderOpen className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No matching documents found
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or switching the category filter.
            </p>
          </div>
        ) : (
          /* Documents List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        doc.type === 'PRD'
                          ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                          : doc.type === 'UserStory'
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800'
                      }`}
                    >
                      {doc.type}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="h-3 w-3" />
                      {formatDate(doc.createdAt)}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {doc.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                    <Eye className="h-3.5 w-3.5" />
                    View Details
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExportModalDoc(doc);
                      }}
                      className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title="Export Jira / Linear / Markdown"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(doc.id, e)}
                      className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-950 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      title="Delete Document"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Document Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                  {selectedDoc.type}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {selectedDoc.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 text-xs font-mono bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl my-4 text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
              {JSON.stringify(selectedDoc.content, null, 2)}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setExportModalDoc(selectedDoc);
                  setSelectedDoc(null);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
              >
                <Share2 className="h-3.5 w-3.5" />
                Format Export (Jira/Linear)
              </button>

              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportModalDoc && (
        <ExportModal
          isOpen={true}
          onClose={() => setExportModalDoc(null)}
          title={exportModalDoc.title}
          type={exportModalDoc.type}
          content={exportModalDoc.content}
        />
      )}
    </div>
  );
}

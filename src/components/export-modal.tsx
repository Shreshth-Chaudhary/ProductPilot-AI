'use client';

import { useState } from 'react';
import {
  Copy,
  Download,
  CheckCircle2,
  X,
  FileText,
  Code2,
  CheckSquare,
  Layers,
  FileType,
  Printer,
} from 'lucide-react';
import { PRDOutput, UserStoriesOutput, AcceptanceCriteriaOutput } from '@/lib/ai/types';
import { ExportService } from '@/lib/export/export-service';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'PRD' | 'UserStory' | 'AcceptanceCriteria';
  content: PRDOutput | UserStoriesOutput | AcceptanceCriteriaOutput;
}

export function ExportModal({
  isOpen,
  onClose,
  title,
  type,
  content,
}: ExportModalProps) {
  const [format, setFormat] = useState<'markdown' | 'jira' | 'linear' | 'confluence' | 'json'>('markdown');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const exportText = ExportService.generateTextExport(title, type, content, format);

  const handleCopy = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const ext = format === 'json' ? 'json' : 'md';
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${format}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    ExportService.exportPDF(title, type, content);
  };

  const handleExportDOCX = () => {
    ExportService.exportDOCX(title, type, content);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#161b26] rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 dark:border-white/10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-brand-500/10 text-brand-500">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Multi-Platform Exporter (PDF, DOCX, Jira, Linear)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Format and export <span className="font-semibold">{title}</span> for your product workflow
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Target Platform Tabs */}
        <div className="flex items-center gap-2 pt-4 overflow-x-auto pb-2">
          <button
            onClick={() => setFormat('markdown')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              format === 'markdown'
                ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            Markdown
          </button>

          <button
            onClick={() => setFormat('jira')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              format === 'jira'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            Jira Markup
          </button>

          <button
            onClick={() => setFormat('linear')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              format === 'linear'
                ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CheckSquare className="h-3.5 w-3.5" />
            Linear
          </button>

          <button
            onClick={() => setFormat('confluence')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              format === 'confluence'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            Confluence / Notion
          </button>

          <button
            onClick={() => setFormat('json')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              format === 'json'
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            JSON API
          </button>
        </div>

        {/* Text Preview Box */}
        <div className="flex-1 overflow-y-auto my-4 p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed whitespace-pre-wrap border border-slate-800">
          {exportText}
        </div>

        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPDF}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              PDF Export
            </button>

            <button
              onClick={handleExportDOCX}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 flex items-center gap-1.5 transition-colors"
            >
              <FileType className="h-3.5 w-3.5" />
              DOCX File
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Syntax</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadFile}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-brand-600 text-white hover:bg-brand-700 flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

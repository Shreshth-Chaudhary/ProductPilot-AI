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
} from 'lucide-react';
import { PRDOutput, UserStoriesOutput, AcceptanceCriteriaOutput } from '@/lib/ai/types';

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

  const generateExportText = (): string => {
    if (format === 'json') {
      return JSON.stringify({ title, type, content }, null, 2);
    }

    if (type === 'PRD') {
      const prd = content as PRDOutput;
      if (format === 'jira') {
        return `h1. ${title} - Product Requirements Document

h2. 1. Product Overview
${prd.productOverview}

h2. 2. Problem Statement
${prd.problemStatement}

h2. 3. Business Goals
${prd.businessGoals.map((bg) => `* ${bg}`).join('\n')}

h2. 4. User Personas
${prd.userPersonas.map((p) => `* *${p.name}* (${p.role}): Pain Points: ${p.painPoints.join(', ')}`).join('\n')}

h2. 5. User Journey
${prd.userJourney.map((step, i) => `${i + 1}. ${step}`).join('\n')}

h2. 6. Functional Requirements & RICE Scores
${prd.functionalRequirements.map((fr) => `* *[${fr.id}]* (${fr.priority}) *${fr.title}*: ${fr.description} ${fr.rice ? `(RICE Score: ${fr.rice.score})` : ''}`).join('\n')}

h2. 7. Non-Functional Requirements
${prd.nonFunctionalRequirements.map((nfr) => `* ${nfr}`).join('\n')}

h2. 8. User Stories
${prd.userStories.map((s) => `* *[${s.id}]*: "${s.formattedStory}"`).join('\n')}

h2. 9. Acceptance Criteria
${prd.acceptanceCriteria.map((ac) => `h3. ${ac.id}\n* *GIVEN* ${ac.given}\n* *WHEN* ${ac.when}\n* *THEN* ${ac.then}`).join('\n\n')}

h2. 10. Success Metrics
${prd.successMetrics.map((m) => `* ${m}`).join('\n')}

h2. 11. Risks & Mitigations
${prd.risks.map((r) => `* *Risk:* ${r.risk} | *Mitigation:* ${r.mitigation}`).join('\n')}`;
      }

      // Linear / Markdown / Confluence
      return `# ${title} — Product Requirements Document

## 1. Product Overview
${prd.productOverview}

## 2. Problem Statement
> ${prd.problemStatement}

## 3. Business Goals
${prd.businessGoals.map((g) => `- [ ] ${g}`).join('\n')}

## 4. Target User Personas
${prd.userPersonas.map((p) => `- **${p.name}** (${p.role}): Pain Points: ${p.painPoints.join(', ')}`).join('\n')}

## 5. End-to-End User Journey
${prd.userJourney.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## 6. Functional Requirements & RICE Scores
${prd.functionalRequirements.map((fr) => `- **[${fr.id}]** \`${fr.priority}\` **${fr.title}:** ${fr.description} ${fr.rice ? `*(RICE Score: ${fr.rice.score} pts)*` : ''}`).join('\n')}

## 7. Non-Functional Requirements
${prd.nonFunctionalRequirements.map((nfr) => `- ${nfr}`).join('\n')}

## 8. User Stories
${prd.userStories.map((s) => `- **[${s.id}]** \`${s.priority}\`: "${s.formattedStory}"`).join('\n')}

## 9. Acceptance Criteria
${prd.acceptanceCriteria.map((ac) => `### ${ac.id}\n- **GIVEN** ${ac.given}\n- **WHEN** ${ac.when}\n- **THEN** ${ac.then}`).join('\n\n')}

## 10. Success Metrics
${prd.successMetrics.map((m) => `- ${m}`).join('\n')}

## 11. Risks & Mitigations
${prd.risks.map((r) => `- **Risk:** ${r.risk} | **Mitigation:** ${r.mitigation}`).join('\n')}`;
    }

    if (type === 'UserStory') {
      const stories = content as UserStoriesOutput;
      if (format === 'jira') {
        return `h2. User Stories for ${stories.featureName}\n\n` +
          stories.stories
            .map((s) => `* *${s.id}* [${s.priority} Priority] ${s.formattedStory} (Effort: ${s.estimatedEffort})`)
            .join('\n');
      }
      return `# User Stories: ${stories.featureName}\n\n` +
        stories.stories
          .map((s) => `- [ ] **${s.id}** \`${s.priority}\`: "${s.formattedStory}" *(Effort: ${s.estimatedEffort})*`)
          .join('\n');
    }

    if (type === 'AcceptanceCriteria') {
      const criteria = content as AcceptanceCriteriaOutput;
      if (format === 'jira') {
        return `h2. Acceptance Criteria: ${criteria.featureName}\n*Story:* ${criteria.userStory}\n\n` +
          criteria.criteria
            .map(
              (c) =>
                `h3. ${c.id}\n* *GIVEN* ${c.given}\n* *WHEN* ${c.when}\n* *THEN* ${c.then}\n\n*Checklist:*\n` +
                c.checklistItems.map((ci) => `* [ ] ${ci}`).join('\n')
            )
            .join('\n\n');
      }
      return `# Acceptance Criteria: ${criteria.featureName}\n> ${criteria.userStory}\n\n` +
        criteria.criteria
          .map(
            (c) =>
              `### ${c.id}\n- **GIVEN** ${c.given}\n- **WHEN** ${c.when}\n- **THEN** ${c.then}\n\n**Verification Checklist:**\n` +
              c.checklistItems.map((ci) => `- [ ] ${ci}`).join('\n')
          )
          .join('\n\n');
    }

    return '';
  };

  const exportText = generateExportText();

  const handleCopy = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = format === 'json' ? 'json' : 'md';
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${format}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
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
                Multi-Platform Exporter (11 Sections)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Format and export <span className="font-semibold">{title}</span> for your product tools
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
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400 font-mono">
            Format: {format.toUpperCase()}
          </span>

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
              onClick={handleDownload}
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

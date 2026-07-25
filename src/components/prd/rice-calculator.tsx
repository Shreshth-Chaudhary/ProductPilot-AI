'use client';

import { useState } from 'react';
import { RICEData } from '@/lib/ai/types';
import { calculateRICEScore } from '@/lib/ai/mock-ai-engine';
import { Calculator, Zap, Info } from 'lucide-react';

interface RICECalculatorProps {
  initialData?: RICEData;
  onUpdate?: (updated: RICEData) => void;
}

export function RICECalculator({ initialData, onUpdate }: RICECalculatorProps) {
  const [reach, setReach] = useState(initialData?.reach || 10000);
  const [impact, setImpact] = useState(initialData?.impact || 4);
  const [confidence, setConfidence] = useState(initialData?.confidence || 90);
  const [effort, setEffort] = useState(initialData?.effort || 3);
  const [explanation, setExplanation] = useState(initialData?.explanation || '');
  const [isOpen, setIsOpen] = useState(false);

  const currentScore = calculateRICEScore(reach, impact, confidence, effort);

  const handleReachChange = (val: number) => {
    setReach(val);
    triggerUpdate(val, impact, confidence, effort);
  };

  const handleImpactChange = (val: number) => {
    setImpact(val);
    triggerUpdate(reach, val, confidence, effort);
  };

  const handleConfidenceChange = (val: number) => {
    setConfidence(val);
    triggerUpdate(reach, impact, val, effort);
  };

  const handleEffortChange = (val: number) => {
    setEffort(val);
    triggerUpdate(reach, impact, confidence, val);
  };

  const triggerUpdate = (r: number, i: number, c: number, e: number) => {
    const score = calculateRICEScore(r, i, c, e);
    if (onUpdate) {
      onUpdate({ reach: r, impact: i, confidence: c, effort: e, score, explanation });
    }
  };

  return (
    <div className="mt-3 p-3 rounded-xl bg-slate-100/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400">
            <Calculator className="h-3.5 w-3.5" />
          </span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
            RICE Formula Score:
          </span>
          <span className="text-xs font-mono font-extrabold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/30">
            {currentScore} pts
          </span>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
            ({reach} × {impact} × {confidence}% ÷ {effort})
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
        >
          {isOpen ? 'Hide Sliders' : 'Edit RICE Variables'}
          <Zap className="h-3 w-3" />
        </button>
      </div>

      {/* AI Estimation Rationale */}
      {explanation && !isOpen && (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic flex items-center gap-1">
          <Info className="h-3 w-3 text-brand-500 shrink-0" />
          <span>AI Estimation Rationale: {explanation}</span>
        </p>
      )}

      {isOpen && (
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* Reach */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-500 font-mono">
                Reach (Users)
              </label>
              <input
                type="number"
                value={reach}
                onChange={(e) => handleReachChange(Number(e.target.value))}
                className="w-full px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>

            {/* Impact */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-500 font-mono">
                Impact (1-5)
              </label>
              <select
                value={impact}
                onChange={(e) => handleImpactChange(Number(e.target.value))}
                className="w-full px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              >
                <option value={1}>1 - Minimal</option>
                <option value={2}>2 - Low</option>
                <option value={3}>3 - Medium</option>
                <option value={4}>4 - High</option>
                <option value={5}>5 - Massive</option>
              </select>
            </div>

            {/* Confidence */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-500 font-mono">
                Confidence (%)
              </label>
              <select
                value={confidence}
                onChange={(e) => handleConfidenceChange(Number(e.target.value))}
                className="w-full px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              >
                <option value={50}>50% - Low</option>
                <option value={80}>80% - Medium</option>
                <option value={90}>90% - High</option>
                <option value={100}>100% - Total</option>
              </select>
            </div>

            {/* Effort */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-500 font-mono">
                Effort (Weeks)
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={effort}
                onChange={(e) => handleEffortChange(Number(e.target.value))}
                className="w-full px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {explanation && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-950 p-2 rounded border border-slate-200 dark:border-slate-800 italic">
              <strong className="text-brand-500">AI Estimation Basis:</strong> {explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Info,
  ListTree,
} from "lucide-react";
import type { HeadingEntry, HeadingAnalysisResult } from "@/lib/helper";
import { analyzeHeadings } from "@/lib/helper";
import { cn } from "@/lib/utils";

const TAG_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
};

const TAG_COLORS: Record<string, string> = {
  h1: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-900/50",
  h2: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900/50",
  h3: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/50",
  h4: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/50",
  h5: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-900/50",
  h6: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-900/50",
};

const TAG_INDENT: Record<string, number> = {
  h1: 0,
  h2: 1,
  h3: 2,
  h4: 3,
  h5: 4,
  h6: 5,
};

interface HeadingAnalysisProps {
  headings: HeadingEntry[];
}

function IssueIcon({ severity }: { severity: string }) {
  if (severity === "error") return <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />;
  if (severity === "warning") return <Info className="w-4 h-4 text-amber-500 shrink-0" />;
  return <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />;
}

export default function HeadingAnalysis({ headings }: HeadingAnalysisProps) {
  const analysis: HeadingAnalysisResult = analyzeHeadings(headings);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Heading Counts */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {(["h1", "h2", "h3", "h4", "h5", "h6"] as const).map((tag) => {
          const Icon = TAG_ICONS[tag];
          const count = analysis.counts[tag] ?? 0;
          return (
            <div
              key={tag}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-xl border text-center transition-all",
                TAG_COLORS[tag]
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-lg font-bold leading-none">{count}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
                {tag}
              </span>
            </div>
          );
        })}
      </div>

      {/* Issues List */}
      <div className="space-y-2">
        {analysis.issues.map((issue, i) => {
          const bgClass =
            issue.severity === "error"
              ? "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/30"
              : issue.severity === "warning"
                ? "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/30"
                : "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900/30";

          return (
            <div
              key={i}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg border text-sm",
                bgClass
              )}
            >
              <IssueIcon severity={issue.severity} />
              <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {issue.message}
              </span>
            </div>
          );
        })}
      </div>

      {/* Heading Hierarchy Tree */}
      {headings.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <ListTree className="w-3.5 h-3.5" />
            Heading Hierarchy
          </h4>
          <ul className="space-y-0.5">
            {headings.map((h, i) => {
              const indent = TAG_INDENT[h.tag] ?? 0;
              return (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm"
                  style={{ paddingLeft: `${indent * 20}px` }}
                >
                  <span
                    className={cn(
                      "shrink-0 mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase border",
                      TAG_COLORS[h.tag]
                    )}
                  >
                    {h.tag}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 break-all leading-snug">
                    {h.text || <span className="italic text-slate-400">empty heading</span>}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

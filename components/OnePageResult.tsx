import React from "react";
import {
  isDescriptionSeoFriendly,
  isKeywordDescriptionOptimal,
  isKeywordTitleOptimal,
  isTitleSeoFriendly,
  SEO_LIMITS,
} from "../lib/helper";
import type { HeadingEntry } from "../lib/helper";

import ToolTipComponent from "./ToolTipComponent";
import HeadingAnalysis from "./HeadingAnalysis";
import { Keyboard, TicketCheck, TicketX, Sparkles, Globe, Link as LinkIcon, FileText, Heading } from "lucide-react";
import { Button } from "./ui/button";

interface OnePageResultProps {
  title: string;
  description: string;
  canonicalLink?: string;
  bodyWordCount?: number;
  headings?: HeadingEntry[];
  result?: string;
  setTitle?: (title: string) => void;
  setDescription?: (description: string) => void;
  keyword?: string | undefined;
  setKeyword?: (keyword: string) => void;
  showForm?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleGenerate?: (values: any) => Promise<void>;
  aiContentLoading?: boolean;
  showExtras?: boolean;
  url?: string;
}

export default function OnePageResult({
  title = "",
  description = "",
  canonicalLink,
  bodyWordCount,
  headings,
  result,
  setTitle,
  setDescription,
  keyword,
  showForm = false,
  showExtras = false,
  url,
  handleGenerate,
  aiContentLoading,
}: OnePageResultProps) {
  const recommendedTitleLength = SEO_LIMITS.title;
  const recommendedDescriptionLength = SEO_LIMITS.description;

  const titleLength = title?.length || 0;
  const descriptionLength = description?.length || 0;

  const getProgressColor = (length: number, max: number, min: number) => {
    if (length === 0) return "bg-slate-200 dark:bg-slate-700";
    if (length < min) return "bg-amber-400";
    if (length > max) return "bg-red-500";
    return "bg-green-500";
  };

  const getTitleProgressWidth = () => Math.min((titleLength / 70) * 100, 100);
  const getDescProgressWidth = () => Math.min((descriptionLength / 170) * 100, 100);

  return (
    <div className="w-full">
      {(title || description || showForm) && (
        <div className="mt-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

          {/* SERP Preview */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm transition-all hover:shadow-md">
            <div className="max-w-[600px]">
              <div className="flex items-center gap-2 text-[14px] text-[#202124] dark:text-slate-300 mb-1">
                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <Globe className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-normal truncate max-w-[280px] md:max-w-full">  {url
                    ? url.replace(/^https?:\/\/(www\.)?/, "")
                    : "Your Website"}</span>
                  <span className="text-[12px] text-[#4d5156] dark:text-slate-400 truncate max-w-[280px] md:max-w-full">
                    {url ? url : "https://example.com "} <span className="text-slate-400">›</span> your-page
                  </span>
                </div>
              </div>
              <div className="text-[20px] leading-[1.3] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer mb-1 truncate">
                {title || "Please enter a title to see the preview"}
              </div>
              <div className="text-[14px] leading-[1.58] text-[#4d5156] dark:text-[#bdc1c6] line-clamp-2">
                {description || "Please enter a meta description to see how it will appear in search engine results."}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Title Section */}
            <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-100 dark:border-slate-800 relative shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Title Tag</h3>
                <div className={`text-xs font-bold px-2 py-1 rounded-md ${titleLength > recommendedTitleLength.max || (titleLength > 0 && titleLength < recommendedTitleLength.min)
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  : titleLength === 0
                    ? 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                  {titleLength} / {recommendedTitleLength.max}
                </div>
              </div>

              {title || showForm ? (
                <input
                  value={title}
                  placeholder="Enter Title"
                  onChange={(e) => setTitle && setTitle(e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-medium text-slate-900 dark:text-slate-100"
                />
              ) : (
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">No title found</div>
              )}

              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${getProgressColor(titleLength, recommendedTitleLength.max, recommendedTitleLength.min)}`}
                  style={{ width: `${getTitleProgressWidth()}%` }}
                />
              </div>

              <div className="flex flex-wrap gap-2 items-center text-sm text-slate-600 dark:text-slate-400 pt-1">
                {!isTitleSeoFriendly(title) ? (
                  titleLength > recommendedTitleLength.max ? (
                    <ToolTipComponent text="Title character is greater than Recommended limit">
                      <div className="flex items-center gap-1 text-red-500 font-medium"><TicketX className="w-4 h-4" /> Too long</div>
                    </ToolTipComponent>
                  ) : (
                    <ToolTipComponent text="Title character is less than Recommended limit">
                      <div className="flex items-center gap-1 text-amber-500 font-medium"><TicketX className="w-4 h-4" /> Too short</div>
                    </ToolTipComponent>
                  )
                ) : (
                  <ToolTipComponent text="Title is SEO friendly">
                    <div className="flex items-center gap-1 text-green-500 font-medium"><TicketCheck className="w-4 h-4" /> Optimal length</div>
                  </ToolTipComponent>
                )}

                {keyword && (
                  <>
                    <span className="text-slate-300 dark:text-slate-600 px-1">|</span>
                    {!isKeywordTitleOptimal(title, keyword) ? (
                      <ToolTipComponent text="Recommended to add 1-2 keywords in title">
                        <div className="flex items-center gap-1 text-amber-500 font-medium"><Keyboard className="w-4 h-4" /> Missing keyword</div>
                      </ToolTipComponent>
                    ) : (
                      <ToolTipComponent text="Keyword is optimal in title">
                        <div className="flex items-center gap-1 text-green-500 font-medium"><Keyboard className="w-4 h-4" /> Keyword present</div>
                      </ToolTipComponent>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-100 dark:border-slate-800 relative shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Meta Description</h3>
                <div className={`text-xs font-bold px-2 py-1 rounded-md ${descriptionLength > recommendedDescriptionLength.max || (descriptionLength > 0 && descriptionLength < recommendedDescriptionLength.min)
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  : descriptionLength === 0
                    ? 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                  {descriptionLength} / {recommendedDescriptionLength.max}
                </div>
              </div>

              {description || showForm ? (
                <textarea
                  value={description}
                  placeholder="Enter Description"
                  rows={3}
                  onChange={(e) => setDescription && setDescription(e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm resize-none text-slate-900 dark:text-slate-100"
                />
              ) : (
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">No description found</div>
              )}

              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${getProgressColor(descriptionLength, recommendedDescriptionLength.max, recommendedDescriptionLength.min)}`}
                  style={{ width: `${getDescProgressWidth()}%` }}
                />
              </div>

              <div className="flex flex-wrap gap-2 items-center text-sm text-slate-600 dark:text-slate-400 pt-1">
                {!isDescriptionSeoFriendly(description) ? (
                  descriptionLength > recommendedDescriptionLength.max ? (
                    <ToolTipComponent text="Description character is greater than Recommended limit">
                      <div className="flex items-center gap-1 text-red-500 font-medium"><TicketX className="w-4 h-4" /> Too long</div>
                    </ToolTipComponent>
                  ) : (
                    <ToolTipComponent text="Description character is less than Recommended limit">
                      <div className="flex items-center gap-1 text-amber-500 font-medium"><TicketX className="w-4 h-4" /> Too short</div>
                    </ToolTipComponent>
                  )
                ) : (
                  <ToolTipComponent text="Description is SEO friendly">
                    <div className="flex items-center gap-1 text-green-500 font-medium"><TicketCheck className="w-4 h-4" /> Optimal length</div>
                  </ToolTipComponent>
                )}

                {keyword && (
                  <>
                    <span className="text-slate-300 dark:text-slate-600 px-1">|</span>
                    {!isKeywordDescriptionOptimal(description, keyword) ? (
                      <ToolTipComponent text="Recommended to add 1-3 keywords in Description">
                        <div className="flex items-center gap-1 text-amber-500 font-medium"><Keyboard className="w-4 h-4" /> Missing keyword</div>
                      </ToolTipComponent>
                    ) : (
                      <ToolTipComponent text="Keyword is optimal in Description">
                        <div className="flex items-center gap-1 text-green-500 font-medium"><Keyboard className="w-4 h-4" /> Keyword present</div>
                      </ToolTipComponent>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Extras (Canonical & Word Count) */}
          {showExtras && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex flex-col items-start bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-blue-300 dark:hover:border-blue-800 transition-colors">
                <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-20 group-hover:scale-110 transition-transform">
                  <LinkIcon className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2 relative z-10">
                  <LinkIcon className="w-4 h-4" />
                  Canonical Link
                </h3>
                <p className="text-slate-800 dark:text-slate-200 text-sm font-medium truncate w-full relative z-10" title={canonicalLink}>
                  {canonicalLink ? (
                    canonicalLink
                  ) : (
                    <span className="italic text-slate-400">Not found or not set</span>
                  )}
                </p>
              </div>

              <div className="flex flex-col items-start bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors">
                <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-20 group-hover:scale-110 transition-transform">
                  <FileText className="w-12 h-12 text-emerald-600" />
                </div>
                <h3 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-2 relative z-10">
                  <FileText className="w-4 h-4" />
                  Body Word Count
                </h3>
                <p className="text-slate-800 dark:text-slate-200 text-2xl font-bold relative z-10">
                  {typeof bodyWordCount === "number" ? (
                    bodyWordCount.toLocaleString()
                  ) : (
                    <span className="italic text-slate-400 text-sm font-medium">N/A</span>
                  )}
                  {typeof bodyWordCount === "number" && <span className="text-sm font-medium text-slate-500 dark:text-slate-400 ml-1">words</span>}
                </p>
              </div>
            </div>
          )}

          {/* Heading Analysis */}
          {showExtras && headings && headings.length > 0 && (
            <div className="flex flex-col items-start bg-violet-50/50 dark:bg-violet-900/10 border border-violet-100 dark:border-violet-900/30 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-violet-800 dark:text-violet-300 mb-4 flex items-center gap-2">
                <Heading className="w-4 h-4" />
                Heading Structure Analysis
              </h3>
              <HeadingAnalysis headings={headings} />
            </div>
          )}

          {/* Generate Button & AI Result */}
          <div className="mt-8 space-y-6">
            <Button
              onClick={handleGenerate}
              disabled={aiContentLoading}
              size="lg"
              className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-bold rounded-xl transition duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {aiContentLoading ? (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                  Generating AI Magic...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-300 dark:text-indigo-600" />
                  Optimize with Gemini AI
                </div>
              )}
            </Button>

            {result && (
              <div className="relative p-6 bg-slate-900 dark:bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>

                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  AI Generated Suggestions
                </h3>

                <div className="space-y-4 relative z-10">
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 shadow-inner">
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Suggested Title</p>
                    <p className="text-white font-medium text-lg leading-snug">
                      {result.split("**Description:**")[0].replace("**Title:**", "").trim()}
                    </p>
                  </div>

                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 shadow-inner">
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Suggested Description</p>
                    <p className="text-slate-300 leading-relaxed">
                      {result.split("**Description:**")[1]?.trim()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
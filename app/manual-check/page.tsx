"use client";

import OnePageResult from "@/components/OnePageResult";
import { RadialChart } from "@/components/RadialChart";
import { Keyboard, PenTool } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generativeAi } from "@/lib/generativeAi";
import { calculateOverallSeoPercentage } from "@/lib/helper";
import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [keyword, setKeyword] = useState("");
  const [aiContentLoading, setAiContentLoading] = useState(false);
  
  const seopercentage = keyword 
    ? calculateOverallSeoPercentage(title, description, keyword)
    : calculateOverallSeoPercentage(title, description);

  const handleGenerate = async () => {
    try {
      setAiContentLoading(true);
      const generatedResult = await generativeAi(title, description, keyword);
      setResult(generatedResult);
      setAiContentLoading(false);
    } catch (error) {
      console.error("Error generating content:", error);
      setAiContentLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-sm font-semibold mb-6">
          <PenTool className="w-4 h-4" />
          Pre-Publish Validator
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Manual SEO Check
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Drafting new content? Validate your SEO strategy before you hit publish. 
          Manually input titles and descriptions to ensure they meet standards.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        <Card className="flex-1 border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl bg-white dark:bg-slate-950 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20 pb-6">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              Optimization Editor
            </CardTitle>
            <CardDescription className="text-base">
              Fine-tune your tags and see real-time SERP previews
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="mb-6 space-y-3 bg-indigo-50/50 dark:bg-indigo-900/10 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
              <label className="flex items-center gap-2 text-sm font-bold text-indigo-900 dark:text-indigo-300">
                <Keyboard className="w-4 h-4" /> Focus Keyword (Optional)
              </label>
              <input
                value={keyword}
                placeholder="e.g. Next.js SEO"
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm font-medium text-slate-900 dark:text-slate-100"
              />
              <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70 font-medium">
                Add a target keyword to check density in your title and description.
              </p>
            </div>
            
            <OnePageResult
              title={title}
              description={description}
              setTitle={setTitle}
              setDescription={setDescription}
              keyword={keyword}
              showForm={true}
              aiContentLoading={aiContentLoading}
              result={result}
              handleGenerate={handleGenerate}
            />
          </CardContent>
        </Card>

        <div className="lg:w-[350px] w-full shrink-0 space-y-6">
          <div className="sticky top-24">
            {(title || description) ? (
              <RadialChart seoPercentage={seopercentage} />
            ) : (
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center h-[350px] flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <PenTool className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                </div>
                <p className="font-bold text-slate-900 dark:text-slate-100 text-lg">Scorecard</p>
                <p className="text-sm mt-2">Start typing a title or description to see your SEO score.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
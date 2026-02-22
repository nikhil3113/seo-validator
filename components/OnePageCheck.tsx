"use client";

interface OnePageCheckProps {
  generativeAi: (
    titleAI: string,
    descriptionAI: string,
    keywordAI?: string
  ) => Promise<string>;
}

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Form } from "./ui/form";
import FormFields from "./FormFields";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, Search, Link as LinkIcon, Activity } from "lucide-react";

import { calculateOverallSeoPercentage } from "@/lib/helper";

import { RadialChart } from "./RadialChart";
import OnePageResult from "./OnePageResult";
import Link from "next/link";

const formSchema = z.object({
  url: z.string().url({ message: "Invalid URL" }),
  keyword: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function OnePageCheck({ generativeAi }: OnePageCheckProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [canonicalLink, setCanonicalLink] = useState("");
  const [bodyWordCount, setBodyWordCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [aiContentLoading, setAiContentLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [hasScanned, setHasScanned] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      keyword: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);
      setError("");
      setHasScanned(false);
      const url = values.url;
      const response = await axios.post("/api/title-description-checker", {
        url,
      });
      setTitle(response.data.title);
      setDescription(response.data.description);
      setCanonicalLink(response.data.canonicalLink);
      setBodyWordCount(response.data.bodyWordCount);
      setHasScanned(true);
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching the data. Please ensure the URL is correct and accessible.");
    } finally {
      setLoading(false);
    }
  }

  const seopercentage = form.getValues().keyword
    ? calculateOverallSeoPercentage(
        title,
        description,
        form.getValues().keyword
      )
    : calculateOverallSeoPercentage(title, description);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleGenerate = async (values: FormValues) => {
    try {
      setAiContentLoading(true);
      const keyword = form.getValues().keyword;
      const aiResult = await generativeAi(title, description, keyword);
      setResult(aiResult);
      setAiContentLoading(false);
    } catch (error) {
      console.error("Error generating content:", error);
      setAiContentLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="max-w-5xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 text-sm font-semibold mb-6">
          <Search className="w-4 h-4" />
          Live URL Scanner
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Instant URL Analysis
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Stop guessing. Enter any URL and get a comprehensive breakdown
          of title tags, meta descriptions, and keyword density instantly.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        <Card className="flex-1 border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl bg-white dark:bg-slate-950 overflow-hidden relative">
          {/* Subtle Background accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20 pb-6">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
               Analyze URL
            </CardTitle>
            <CardDescription className="text-base">
              Extract and evaluate SEO meta data directly from a live page
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-100 dark:border-slate-800 mb-6 shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-4">
                    <FormFields
                      name="url"
                      control={form.control}
                      label="Website URL"
                      placeholder="https://example.com/your-page"
                    />
                    <FormFields
                      name="keyword"
                      control={form.control}
                      label="Target Keyword (Optional)"
                      placeholder="e.g. Next.js SEO optimization"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      disabled={loading} 
                      size="lg"
                      className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Scanning URL...
                        </>
                      ) : (
                        <>
                          <Activity className="mr-2 h-5 w-5" />
                          Analyze Now
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            {error && (
              <Alert variant="destructive" className="mt-4 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <AlertTitle className="text-red-800 dark:text-red-300 font-bold">Analysis Failed</AlertTitle>
                <AlertDescription className="text-red-700 dark:text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            {hasScanned && (
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">Analysis Results</h3>
                </div>
                
                <OnePageResult
                  title={title}
                  description={description}
                  canonicalLink={canonicalLink}
                  bodyWordCount={bodyWordCount}
                  result={result}
                  setTitle={setTitle}
                  setDescription={setDescription}
                  keyword={form.getValues().keyword}
                  handleGenerate={handleGenerate}
                  aiContentLoading={aiContentLoading}
                  showExtras={true}
                  url={form.getValues().url}
                />
              </div>
            )}

            <div className="mt-8 text-center bg-slate-50 dark:bg-slate-900/30 rounded-lg p-4 border border-slate-100 dark:border-slate-800/50">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Don&apos;t have a live URL yet?{" "}
                <Link
                  href={"/manual-check"}
                  className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <LinkIcon className="w-3 h-3" />
                  Try the Manual Validator
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="lg:w-[350px] w-full shrink-0 space-y-6">
          <div className="sticky top-24">
            {hasScanned ? (
              <RadialChart seoPercentage={seopercentage} />
            ) : (
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center h-[350px] flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 shadow-sm transition-all duration-500">
                {loading ? (
                  <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mb-4" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <Activity className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                  </div>
                )}
                <p className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                  {loading ? "Analyzing..." : "Awaiting URL"}
                </p>
                <p className="text-sm mt-2">
                  {loading ? "Fetching metadata and calculating score..." : "Enter a URL and click Analyze Now to see the SEO score."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
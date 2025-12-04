import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2, Zap, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_800px_at_100%_200px,#1e293b,transparent)]"></div>
      </div>

      <main className="flex-grow">
        <div className="container mx-auto px-4 relative">
          <div className="pt-32 pb-20 md:pt-40 md:pb-32 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium mb-8 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Make your site fully crawlable for better indexing
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-white drop-shadow-sm">
              Master Your <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                SEO Performance
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
              The all-in-one validator to analyze, optimize, and dominate search
              rankings. Real-time insights for{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                developers
              </span>{" "}
              and{" "}
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                Seo Masters
              </span>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/url-check" passHref>
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8 text-base bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Start Analyzing <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/manual-check" passHref>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full h-12 px-8 text-base border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 backdrop-blur-sm"
                >
                  Manual Check
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 space-y-32 mb-32">
          <div className="group relative">
            <div className="absolute -inset-y-6 -inset-x-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-950">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 pointer-events-none mix-blend-overlay" />
                  <Image
                    src="/url-check.svg"
                    alt="URL Check Interface"
                    width={800}
                    height={600}
                    className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Search className="h-6 w-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Instant URL Analysis
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Stop guessing. Paste any URL and get a comprehensive breakdown
                  of title tags, meta descriptions, and keyword density. Our
                  percentage-based scoring system tells you exactly what to fix.
                </p>
                <ul className="space-y-3">
                  {[
                    "Live meta-tag validation",
                    "Keyword density visualization",
                    "Status code verification",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="relative flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="w-full md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-950">
                  <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/10 to-pink-500/10 pointer-events-none mix-blend-overlay" />
                  <Image
                    src="/bulk-check.svg"
                    alt="Bulk Analysis"
                    width={800}
                    height={600}
                    className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <Zap className="h-6 w-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Bulk Power Processing
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Managing a large site? Validate dozens of URLs simultaneously.
                  Perfect for agencies and enterprise migrations where speed and
                  accuracy are non-negotiable.
                </p>
                <Link href="/url-check" passHref>
                  <Button
                    variant="ghost"
                    className="group text-purple-600 hover:text-purple-700 dark:text-purple-400 pl-0 hover:bg-transparent"
                  >
                    Try Bulk Check{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-y-6 -inset-x-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-950">
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-teal-500/10 pointer-events-none mix-blend-overlay" />
                  <Image
                    src="/manual-check.png"
                    alt="Manual Entry"
                    width={800}
                    height={600}
                    className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
                  <span className="text-xl">✍️</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Pre-Publish Validation
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Drafting new content? Validate your SEO strategy before you
                  even hit publish. Manually input titles and descriptions to
                  ensure they meet search engine standards.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mb-32">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 dark:bg-slate-900 px-6 py-20 text-center shadow-2xl">
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                <span className="text-sm font-medium">Powered by GPT-4</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Supercharge with AI Insights
              </h2>

              <p className="text-xl text-slate-300 leading-relaxed">
                Don&apos;t just validate—optimize. Let our AI generate
                high-converting title tags and meta descriptions tailored to
                your specific keywords.
              </p>

              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all duration-200"
              >
                Unlock AI Analysis
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

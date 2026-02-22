import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2, Zap, Search, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 overflow-hidden selection:bg-blue-100 selection:text-blue-900">


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
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-950">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 pointer-events-none mix-blend-overlay" />
                  <div className="w-full aspect-[4/3] bg-slate-50 dark:bg-slate-900 rounded-xl p-4 md:p-6 flex flex-col gap-4 transform transition-transform duration-700 group-hover:scale-105 shadow-inner border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <div className="ml-4 flex-1 h-6 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 flex items-center px-2">
                        <div className="w-3 h-3 text-slate-400 mr-2"><Search className="w-3 h-3" /></div>
                        <div className="h-1.5 w-1/2 bg-slate-200 dark:bg-slate-600 rounded"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div className="col-span-2 bg-white dark:bg-slate-950 rounded-lg p-4 border border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center gap-3 shadow-sm">
                        <div className="text-5xl font-extrabold text-green-500 tracking-tighter">98<span className="text-3xl">%</span></div>
                        <div className="h-2 w-32 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full w-[98%] bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">SEO Score</div>
                      </div>
                      <div className="bg-white dark:bg-slate-950 rounded-lg p-4 border border-slate-200 dark:border-slate-800 flex flex-col gap-3 shadow-sm">
                        <div className="h-2 w-16 bg-blue-200 dark:bg-blue-900/50 rounded"></div>
                        <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="flex gap-1 mt-auto">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-950 rounded-lg p-4 border border-slate-200 dark:border-slate-800 flex flex-col gap-3 shadow-sm">
                        <div className="h-2 w-20 bg-purple-200 dark:bg-purple-900/50 rounded"></div>
                        <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      </div>
                    </div>
                  </div>
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
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-950">
                  <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/10 to-pink-500/10 pointer-events-none mix-blend-overlay" />
                  <div className="w-full aspect-[4/3] bg-slate-50 dark:bg-slate-900 rounded-xl p-4 md:p-6 flex flex-col gap-3 transform transition-transform duration-700 group-hover:scale-105 shadow-inner border border-slate-100 dark:border-slate-800 overflow-hidden">
                    <div className="flex justify-between items-center mb-2">
                      <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-blue-100 dark:bg-blue-900/40 rounded-md"></div>
                        <div className="h-6 w-20 bg-purple-100 dark:bg-purple-900/40 rounded-md"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 px-3 py-3 bg-slate-200 dark:bg-slate-800 rounded-t-lg">
                      <div className="col-span-1 h-3 w-4 bg-slate-300 dark:bg-slate-600 rounded"></div>
                      <div className="col-span-6 h-3 w-20 bg-slate-300 dark:bg-slate-600 rounded"></div>
                      <div className="col-span-2 h-3 w-10 bg-slate-300 dark:bg-slate-600 rounded"></div>
                      <div className="col-span-3 h-3 w-16 bg-slate-300 dark:bg-slate-600 rounded"></div>
                    </div>

                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={`bulk-${i}`} className="grid grid-cols-12 gap-2 px-3 py-3 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg items-center shadow-sm">
                        <div className="col-span-1 flex items-center justify-start">
                          <div className={`h-4 w-4 rounded-full ${i === 2 ? 'bg-amber-400' : i === 4 ? 'bg-red-400' : 'bg-green-500'}`}></div>
                        </div>
                        <div className="col-span-6"><div className="h-2.5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded"></div></div>
                        <div className="col-span-2"><div className="h-5 w-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center"><div className="h-1.5 w-5 bg-slate-300 dark:bg-slate-600 rounded"></div></div></div>
                        <div className="col-span-3 flex gap-1 items-center">
                          <div className="h-1.5 w-1/3 bg-blue-400 rounded-l-full"></div>
                          <div className={`h-1.5 w-1/3 ${i === 4 ? 'bg-slate-200 dark:bg-slate-700' : 'bg-purple-400'}`}></div>
                          <div className={`h-1.5 w-1/3 ${i === 2 || i === 4 ? 'bg-slate-200 dark:bg-slate-700' : 'bg-green-400'} rounded-r-full`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
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
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-950">
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-teal-500/10 pointer-events-none mix-blend-overlay" />
                  <div className="w-full aspect-[4/3] bg-slate-50 dark:bg-slate-900 rounded-xl p-4 md:p-6 flex flex-col gap-6 transform transition-transform duration-700 group-hover:scale-105 shadow-inner border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                    <div className="space-y-5 w-full md:w-3/4 z-10">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="h-3 w-16 bg-slate-300 dark:bg-slate-600 rounded"></div>
                          <div className="h-4 w-14 bg-green-100 dark:bg-green-900/40 rounded text-[10px] text-green-700 dark:text-green-400 flex items-center justify-center font-bold">55 / 60</div>
                        </div>
                        <div className="h-10 w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md p-3 flex items-center shadow-sm">
                          <div className="h-2.5 w-3/4 bg-slate-700 dark:bg-slate-300 rounded"></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="h-3 w-24 bg-slate-300 dark:bg-slate-600 rounded"></div>
                          <div className="h-4 w-16 bg-amber-100 dark:bg-amber-900/40 rounded text-[10px] text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">150 / 160</div>
                        </div>
                        <div className="h-20 w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md p-3 flex flex-col gap-3 shadow-sm">
                          <div className="h-2.5 w-full bg-slate-500 dark:bg-slate-400 rounded"></div>
                          <div className="h-2.5 w-5/6 bg-slate-500 dark:bg-slate-400 rounded"></div>
                          <div className="h-2.5 w-1/2 bg-slate-500 dark:bg-slate-400 rounded"></div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute right-[-5%] bottom-[-5%] w-[85%] bg-white dark:bg-slate-950 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-2xl transform rotate-[-3deg] transition-transform duration-500 group-hover:rotate-[-1deg]">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-2 font-medium">
                        <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center"><Globe className="w-3 h-3 text-slate-500" /></div>
                        https://example.com <span className="text-slate-400">&rsaquo;</span> my-awesome-page
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 text-xl font-medium hover:underline mb-2 w-full truncate">
                        This is a Perfect SEO Title Tag - Example
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        Learn how to optimize your website with the best tools available. Improve your search engine rankings and dominate your niche with our advanced validator.
                      </div>
                    </div>
                  </div>
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
          <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 px-6 py-20 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-2xl border border-slate-100 dark:border-slate-800 transition-colors duration-300">
            {/* Soft background glows for light mode & dark mode */}
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-purple-200/60 dark:bg-purple-500/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-blue-200/60 dark:bg-blue-500/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-pink-100/60 dark:bg-pink-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                <Sparkles className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                  Powered by Gemini
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Supercharge with <br className="sm:hidden" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 drop-shadow-sm">
                  AI Insights
                </span>
              </h2>

              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Don&apos;t just validate—optimize. Let our AI generate
                high-converting title tags and meta descriptions tailored to
                your specific keywords.
              </p>

              <div className="pt-4">
                <Link href={"/url-check"} prefetch={true}>
                  <Button
                    size="lg"
                    className="rounded-full h-14 px-10 text-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group border border-transparent dark:border-slate-200"
                  >
                    <Sparkles className="mr-2 h-5 w-5 text-yellow-300 dark:text-indigo-600 group-hover:animate-pulse" />
                    Unlock AI Analysis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

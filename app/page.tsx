import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="container mx-auto px-4">
          <div className="py-32 md:py-40 relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-black dark:to-black opacity-50 rounded-3xl" />

            <div className="relative">
              <h1 className="text-6xl md:text-7xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white">
                SEO -{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  Validator
                </span>
              </h1>
              <p className="text-center mb-12 max-w-2xl mx-auto text-xl text-gray-600 dark:text-white">
                An SEO checker tool that helps you optimize your website for
                search engines. Analyze, improve, and dominate search rankings.
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-32">
            {/* URL Check */}
            <div className="flex flex-col md:flex-row items-center gap-12 px-4 md:px-20">
              <div className="w-full md:w-1/2 group">
                <div className="relative transition-transform duration-300 transform group-hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-black dark:to-black opacity-20 rounded-2xl" />
                  <Image
                    src="/url-check.svg"
                    alt="URL Check Illustration"
                    width={600}
                    height={400}
                    className="rounded-2xl relative shadow-lg"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  URL Check
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed dark:text-white">
                  Automatically analyze your page&apos;s SEO by entering its
                  URL. Get insights on title, description, and keyword
                  optimization. Our tool provides a percentage-based chart for
                  title and description length, helping you optimize your
                  content effectively.
                </p>
                <Link href="/url-check" passHref>
                  <Button size="lg" className="group mt-3">
                    Check by URL
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Bulk Check */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 px-4 md:px-20">
              <div className="w-full md:w-1/2 group">
                <div className="relative transition-transform duration-300 transform group-hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100  dark:from-black dark:to-black opacity-20 rounded-2xl" />
                  <Image
                    src="/bulk-check.svg"
                    alt="Bulk URL Check Illustration"
                    width={600}
                    height={400}
                    className="rounded-2xl relative shadow-lg"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  Bulk URL Check
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed dark:text-white">
                  Analyze multiple pages at once. Add several URLs to get
                  comprehensive SEO validation for your entire site. Perfect for
                  webmasters and SEO professionals managing large websites or
                  multiple clients.
                </p>
                <Link href="/url-check" passHref>
                  <Button size="lg" className="group mt-3">
                    Bulk URL Check
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Manual Check */}
            <div className="flex flex-col md:flex-row items-center gap-12 px-4 md:px-20">
              <div className="w-full md:w-1/2 group">
                <div className="relative transition-transform duration-300 transform group-hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-teal-100 dark:from-black dark:to-black  opacity-20 rounded-2xl" />
                  <Image
                    src="/manual-check.png"
                    alt="Manual Check Illustration"
                    width={600}
                    height={400}
                    className="rounded-2xl relative shadow-lg"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
                  Manual Check
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed dark:text-white">
                  Not live yet? No problem. Manually input your title and
                  description to validate your SEO before going live. Perfect
                  for content creators and developers working on new pages or
                  websites.
                </p>
                <Link href="/manual-check" passHref>
                  <Button size="lg" className="group mt-3">
                    Manual Check
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* AI Section */}
          <div className="mt-32 mb-20 text-center px-4">
            <div className="max-w-3xl mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:to-black  rounded-3xl" />
              <div className="relative py-16 px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  AI-Powered SEO Insights
                </h2>
                <p className="mb-8 text-xl text-gray-600 leading-relaxed dark:text-white">
                  Get AI-generated recommendations to improve your title,
                  description, and keywords. Optimize your content with
                  cutting-edge technology for better search engine rankings.
                </p>
                <Button size="lg" className="group">
                  Try AI Analysis
                  <Sparkles className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

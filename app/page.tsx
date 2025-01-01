import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="py-40">
            <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
              SEO - <span className="text-primary">Validator</span>
            </h1>
            <p className="text-center mb-12 max-w-2xl mx-auto text-xl text-muted-foreground">
              An SEO checker tool that helps you optimize your website for
              search engines. Analyze, improve, and dominate search rankings.
            </p>
          </div>
          <div className="space-y-24">
            <div className="flex flex-col md:flex-row items-center gap-8 px-20">
              <div className="w-full md:w-1/2">
                <Image
                  src="/url-check.svg"
                  alt="URL Check Illustration"
                  width={600}
                  height={400}
                  className="rounded"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold">URL Check</h2>
                <p className="text-[16px] text-muted-foreground">
                  Automatically analyze your page&apos;s SEO by entering its
                  URL. Get insights on title, description, and keyword
                  optimization. Our tool provides a percentage-based chart for
                  title and description length, helping you optimize your
                  content effectively.
                </p>
                <Link href="/url-check" passHref>
                  <Button size="lg" className="mt-4">
                    Check by URL
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8 px-20">
              <div className="w-full md:w-1/2">
                <Image
                  src="/bulk-check.svg"
                  alt="Bulk URL Check Illustration"
                  width={600}
                  height={400}
                  className="rounded"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold">Bulk URL Check</h2>
                <p className="text-[16px] text-muted-foreground">
                  Analyze multiple pages at once. Add several URLs to get
                  comprehensive SEO validation for your entire site. Perfect for
                  webmasters and SEO professionals managing large websites or
                  multiple clients.
                </p>
                <Link href="/bulk-check" passHref>
                  <Button size="lg" className="mt-4">
                    Bulk URL Check
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 px-20">
              <div className="w-full md:w-1/2">
                <Image
                  src="/manual-check.png"
                  alt="Manual Check Illustration"
                  width={600}
                  height={400}
                  className="rounded"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold">Manual Check</h2>
                <p className="text-[16px] text-muted-foreground">
                  Not live yet? No problem. Manually input your title and
                  description to validate your SEO before going live. Perfect
                  for content creators and developers working on new pages or
                  websites.
                </p>
                <Link href="/manual-check" passHref>
                  <Button size="lg" className="mt-4">
                    Manual Check
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-24 text-center">
            <h2 className="text-4xl font-bold mb-4">AI-Powered SEO Insights</h2>
            <p className="mb-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              Get AI-generated recommendations to improve your title,
              description, and keywords. Optimize your content with cutting-edge
              technology for better search engine rankings.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

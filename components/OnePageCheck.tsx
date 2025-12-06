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
import { Loader2, AlertCircle } from "lucide-react";

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
      const url = values.url;
      const response = await axios.post("/api/title-description-checker", {
        url,
      });
      setTitle(response.data.title);
      setDescription(response.data.description);
      setCanonicalLink(response.data.canonicalLink);
      setBodyWordCount(response.data.bodyWordCount);
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching the data. Please try again.");
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
      const keyword = values.keyword;
      const result = await generativeAi(title, description, keyword);
      setResult(result);
      setAiContentLoading(false);
    } catch (error) {
      console.error("Error generating content:", error);
      setAiContentLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Card className="w-full max-w-3xl mx-auto ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">One Page Check</CardTitle>
          <CardDescription>
            Enter a URL to check its title and description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormFields
                name="url"
                control={form.control}
                label="Enter URL"
                placeholder="https://example.com"
              />
              <FormFields
                name="keyword"
                control={form.control}
                label="Enter Keyword"
                placeholder="Keyword (Optional)"
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  "Check URL"
                )}
              </Button>
            </form>
          </Form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

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
          />

          <div className="mt-5">
            <Link
              href={"/manual-check"}
              className="text-blue-500 hover:underline text-[16px]"
            >
              Don&apos;t Have an URL? Click here to check manually
            </Link>
          </div>
        </CardContent>
      </Card>
      <div>{title && <RadialChart seoPercentage={seopercentage} />}</div>
    </div>
  );
}

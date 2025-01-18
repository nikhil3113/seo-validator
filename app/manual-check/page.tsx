"use client";

import OnePageResult from "@/components/OnePageResult";
import { RadialChart } from "@/components/RadialChart";

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
  const seopercentage = calculateOverallSeoPercentage(title, description);

  const handleGenerate = async () => {
    try {
      setAiContentLoading(true);

      const result = await generativeAi(title, description);
      console.log("Generated Content:", result);
      setResult(result);
      setAiContentLoading(false);
    } catch (error) {
      console.error("Error generating content:", error);
      setAiContentLoading(false);
    }
  };
  return (
    <div className="flex gap-5 justify-center items- mt-20 mb-5">
      <Card className="w-full max-w-3xl ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {" "}
            Check Using Title and Description{" "}
          </CardTitle>

          <CardDescription>
            Enter the title and description to check.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div>
                <label>
                  <span className="text-lg font-semibold">Keyword</span>
                  <input
                    value={keyword}
                    placeholder="Enter Keyword (Optional)"
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full p-2 rounded-lg border"
                  />
                </label>
              </div>
            </div>
          </form>
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

      <div>{title && <RadialChart seoPercentage={seopercentage} />}</div>
    </div>
  );
}

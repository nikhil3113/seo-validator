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

import { calculateOverallSeoPercentage } from "@/lib/helper";

import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const seopercentage = calculateOverallSeoPercentage(title, description);

  return (
    <div className="flex gap-5 justify-center items- mt-10 mb-5">
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
          <OnePageResult
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            showForm={true}
          />
        </CardContent>
      </Card>

      <div>{title && <RadialChart seoPercentage={seopercentage} />}</div>
    </div>
  );
}

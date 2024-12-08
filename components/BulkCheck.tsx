"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import FormFields from "./FormFields";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";

const getTitleAndDescriptionBulk = async (urls: string[]) => {
  try {
    const response = await axios.post("/api/title-description-checker/bulk", {
      urls,
    });
    if (!response.data) {
      throw new Error("Failed to fetch metadata");
    }

    return await response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const formSchema = z.object({
  urls: z
    .string()
    .min(1, { message: "Please enter at least one URL" })
    .refine((val) => val.split("\n").every((url) => url.trim() !== ""), {
      message: "URLs cannot be empty lines",
    }),
});

export default function BulkCheck() {
  const [results, setResults] = useState<
    { url: string; title: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      urls: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);
      setResults([]);

      const urls = values.urls
        .split("\n")
        .map((url) => url.trim())
        .filter((url) => url !== "");

      const response = await getTitleAndDescriptionBulk(urls);
      console.log(response);
      setResults(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Bulk URL Metadata Checker</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-lg"
        >
          <FormFields
            name="urls"
            control={form.control}
            label="Enter URLs (one per line)"
            placeholder="Enter URLs One Below the other" 
            type="textarea"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Submit"}
          </Button>
        </form>
      </Form>
      <div className="mt-4 w-full max-w-lg">
        <h2 className="text-xl font-semibold">Results</h2>
        {results.length > 0 ? (
          <ul className="list-disc pl-5">
            {results.map(({ url, title, description }, index) => (
              <li key={index} className="mb-2">
                <p>
                  <strong>URL:</strong> {url}
                </p>
                <p>
                  <strong>Title:</strong> {title}
                </p>
                <p>
                  <strong>Description:</strong> {description}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No results yet. Submit URLs to get metadata.</p>
        )}
      </div>
    </div>
  );
}

"use client";

interface OnePageCheckProps {
  generativeAi: (
    titleAI: string,
    descriptionAI: string,
    keywordAI?: string
  ) => Promise<string>;
}

import { useState } from "react";
import {  z } from "zod";
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
import { Loader2, AlertCircle, TicketCheck, TicketX } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  calculateOverallSeoPercentage,
  isDescriptionSeoFriendly,
  isTitleSeoFriendly,
  SEO_LIMITS,
} from "@/lib/helper";
import ToolTipComponent from "./ToolTipComponent";
import { RadialChart } from "./RadialChart";

const formSchema = z.object({
  url: z.string().url({ message: "Invalid URL" }),
  keyword: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function OnePageCheck({ generativeAi }: OnePageCheckProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
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
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching the data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const seopercentage = calculateOverallSeoPercentage(title, description);
  const recommendedTitleLength = SEO_LIMITS.title;
  const recommendedDescriptionLength = SEO_LIMITS.description;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleGenerate = async (values: FormValues) => {

    try {
      console.log(values);
      const keyword = values.keyword;
      const result = await generativeAi(title, description, keyword);
      console.log("Generated Content:", result);
      setResult(result);
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return (
    <div className="flex">
      <Card className="w-full max-w-3xl mx-auto">
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
                placeholder="Keyword"
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

          {(title || description) && (
            <div className="mt-6 space-y-4">
              <div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Title</h3>
                  <p className="text-muted-foreground">
                    {title ? (
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    ) : (
                      "No title found"
                    )}
                  </p>
                  <p className="flex gap-2 items-center">
                    Characters: {title ? title.length : 0}
                    {!isTitleSeoFriendly(title) ? (
                      <>
                        {title && title.length > recommendedTitleLength.max ? (
                          <ToolTipComponent text="Title character is greater than Recommended limit">
                            <TicketX className="inline-block text-red-500 ml-1 " />
                          </ToolTipComponent>
                        ) : (
                          <ToolTipComponent text="Title character is less than Recommended limit">
                            <TicketX className="inline-block text-red-500 ml-1 " />
                          </ToolTipComponent>
                        )}
                      </>
                    ) : (
                      <ToolTipComponent text="Title is SEO friendly">
                        <TicketCheck className="inline-block text-green-500 ml-1" />
                      </ToolTipComponent>
                    )}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="text-muted-foreground">
                    {description ? (
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    ) : (
                      "No description found"
                    )}
                  </p>
                  <p className="flex gap-2 items-center">
                    Characters: {description ? description.length : ""}
                    {!isDescriptionSeoFriendly(description) ? (
                      <>
                        {description &&
                        description.length >
                          recommendedDescriptionLength.max ? (
                          <ToolTipComponent text="Description character is greater than Recommended limit">
                            <TicketX className="inline-block text-red-500 ml-1" />
                          </ToolTipComponent>
                        ) : (
                          <ToolTipComponent text="Description character is less than Recommended limit">
                            <TicketX className="inline-block text-red-500 ml-1" />
                          </ToolTipComponent>
                        )}
                      </>
                    ) : (
                      <ToolTipComponent text="Title is SEO friendly">
                        <TicketCheck className="inline-block text-green-500 ml-1" />
                      </ToolTipComponent>
                    )}
                  </p>
                </div>
                <div>
                  {/* <Button onClick={form.handleSubmit(handleGenerate)} className="my-6">
                    Generate Meta Data
                  </Button> */}
                  {result && (
                    <div>
                      <h3 className="text-lg font-semibold">
                        Generated Content
                      </h3>
                      <p className="text-muted-foreground">{result}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <div>{title && <RadialChart seoPercentage={seopercentage} />}</div>
    </div>
  );
}

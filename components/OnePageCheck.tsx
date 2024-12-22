"use client";

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
import { Loader2, AlertCircle, Monitor, Smartphone } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { isDescriptionSeoFriendly, isTitleSeoFriendly } from "@/lib/helper";
import ToolTipComponent from "./ToolTipComponent";

const formSchema = z.object({
  url: z.string().url({ message: "Invalid URL" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function OnePageCheck() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <Card className="w-full max-w-5xl mx-auto">
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
                  <ToolTipComponent text="Title is not SEO friendly">
                    <Smartphone className="inline-block text-red-500 ml-1 " />
                  </ToolTipComponent>
                ) : (
                  <ToolTipComponent text="Title is SEO friendly">
                    <Smartphone className="inline-block text-green-500 ml-1" />
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
                Characters: {description ? description.length : 0}
                {!isDescriptionSeoFriendly(description) ? (
                  <ToolTipComponent text="Description is not SEO friendly">
                    <Smartphone className="inline-block text-red-500 ml-1" />
                  </ToolTipComponent>
                ) : (
                  <ToolTipComponent text="Title is SEO friendly">
                    <Smartphone className="inline-block text-green-500 ml-1" />
                  </ToolTipComponent>
                )}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

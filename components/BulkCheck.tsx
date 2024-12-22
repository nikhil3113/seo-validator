"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import FormFields from "./FormFields";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { isDescriptionSeoFriendly } from "@/lib/helper";
import { Monitor, Smartphone } from "lucide-react";
import ToolTipComponent from "./ToolTipComponent";
import { Input } from "./ui/input";

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
    <div className="flex flex-col items-center gap-4 w-full max-w-6xl mx-auto  p-5 rounded-md">
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
      <div className="mt-4 w-full ">
        <h2 className="text-xl font-semibold">Results</h2>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Url</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Title length</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Description length</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.length > 0 ? (
              <>
                {results.map((res, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{res.url}</TableCell>
                    <TableCell>
                      {res.title ? (
                        <Input
                          value={res.title}
                          onChange={(e) => {
                            const newTitle = e.target.value;
                            setResults((prevResults) =>
                              prevResults.map((item, idx) =>
                                idx === index
                                  ? { ...item, title: newTitle }
                                  : item
                              )
                            );
                          }}
                        />
                      ) : (
                        "No title found"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center gap-2">
                        {res.title.length}
                        <div>
                          {!isDescriptionSeoFriendly(res.title) ? (
                            <ToolTipComponent text="Title is not SEO friendly">
                              <Smartphone className="inline-block text-red-500 ml-1" />
                            </ToolTipComponent>
                          ) : (
                            <ToolTipComponent text="Title is SEO friendly">
                              <Smartphone className="inline-block text-green-500 ml-1" />
                            </ToolTipComponent>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {res.description ? (
                        <Input
                          value={res.description}
                          onChange={(e) => {
                            const newDesc = e.target.value;
                            setResults((prevResults) =>
                              prevResults.map((item, idx) =>
                                idx === index
                                  ? { ...item, description: newDesc } // Update the description field
                                  : item
                              )
                            );
                          }}
                        />
                      ) : (
                        "No Description found"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center gap-2">
                        {res.description ? res.description.length : 0}
                        <div>
                          {!isDescriptionSeoFriendly(res.description) ? (
                            <ToolTipComponent text="Title is not SEO friendly">
                              <Smartphone className="inline-block text-red-500 ml-1" />
                            </ToolTipComponent>
                          ) : (
                            <ToolTipComponent text="Title is SEO friendly">
                              <Smartphone className="inline-block text-green-500 ml-1" />
                            </ToolTipComponent>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableCell colSpan={4} className="text-center">
                No Data for this url
              </TableCell>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

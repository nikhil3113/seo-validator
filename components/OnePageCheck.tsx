"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import { Form } from "./ui/form"
import FormFields from "./FormFields"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'

const formSchema = z.object({
  url: z.string().url({ message: "Invalid URL" }),
})

type FormValues = z.infer<typeof formSchema>

export default function OnePageCheck() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true)
      setError("")
      const url = values.url
      const response = await axios.post("/api/title-description-checker", {
        url,
      })
      setTitle(response.data.title)
      setDescription(response.data.description)
    } catch (error) {
      console.error(error)
      setError("An error occurred while fetching the data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">One Page Check</CardTitle>
        <CardDescription>Enter a URL to check its title and description</CardDescription>
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
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Results</AlertTitle>
              <AlertDescription>
                Here are the title and description for the provided URL:
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Title</h3>
              <p className="text-muted-foreground">{title || "No title found"}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground">{description || "No description found"}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


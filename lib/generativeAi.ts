"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export const generativeAi = async (
  titleAI: string,
  descriptionAI: string,
  keywordAI?: string
) => {
  const apiKey = process.env.API_Key;
  if (!apiKey) {
    throw new Error("API_KEY is not defined");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

  const prompt = keywordAI
    ? `You are an SEO expert. Generate an optimized meta title and description for my website using the primary keyword "${keywordAI}".

Requirements:
- **Title (50-60 characters strictly):**
  - Place the primary keyword near the beginning
  - Make it compelling and click-worthy
  - Include a unique value proposition or benefit
  - Avoid keyword stuffing

- **Description (120-160 characters strictly):**
  - Include the primary keyword naturally within the first 100 characters
  - Add a clear call-to-action (e.g., "Learn more", "Discover", "Get started")
  - Highlight unique benefits or features
  - Create urgency or curiosity to improve CTR

Current title: "${titleAI}"
Current description: "${descriptionAI}"

Respond in this exact format (use **Title:** and **Description:** with bold markers):
**Title:** [your optimized title]
**Description:** [your optimized description]`
    : `You are an SEO expert. Generate an optimized meta title and description for my website.

Requirements:
- **Title (50-60 characters strictly):**
  - Make it compelling and click-worthy
  - Include a unique value proposition or benefit
  - Use power words to increase CTR

- **Description (120-160 characters strictly):**
  - Add a clear call-to-action (e.g., "Learn more", "Discover", "Get started")
  - Highlight unique benefits or features
  - Create urgency or curiosity to improve CTR
  - Make it actionable and engaging

Current title: "${titleAI}"
Current description: "${descriptionAI}"

Respond in this exact format (use **Title:** and **Description:** with bold markers):
**Title:** [your optimized title]
**Description:** [your optimized description]`;

  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  console.log("Generated Content:", text);
  return text;
};

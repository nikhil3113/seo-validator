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
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = keywordAI
    ? `Generate an SEO meta title (50-60 chars, keyword "${keywordAI}" at start, unique, no stuffing) and description (120-160 chars, keyword in first 100, CTA, benefits, urgency). Current title: "${titleAI}". Current description: "${descriptionAI}". Respond: **Title:** [title] **Description:** [description]`
    : `Generate an SEO meta title (50-60 chars, unique, click-worthy) and description (120-160 chars, CTA, benefits, urgency). Current title: "${titleAI}". Current description: "${descriptionAI}". Respond: **Title:** [title] **Description:** [description]`;  

  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  return text;
};

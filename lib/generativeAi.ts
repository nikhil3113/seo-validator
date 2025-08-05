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
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  const prompt = keywordAI
  ? `Generate an optimized meta title and description for my website using the keyword "${keywordAI}". Ensure the following:
    - The title must be strictly between 50 to 60 characters.
    - The description must be strictly between 120 to 160 characters.
    - Include the primary keyword near the beginning.
    - Make the title and description compelling and written for humans.
    - Each must be unique and relevant to the content.
    - Include a subtle call-to-action in the description.
    My current title is: "${titleAI}" 
    My current description is: "${descriptionAI}". 
    Provide only one result that adheres strictly to these limits.`
  : `Generate an optimized meta title and description for my website. Ensure the following:
    - The title must be strictly between 50 to 60 characters.
    - The description must be strictly between 120 to 160 characters.
    - Include the primary keyword near the beginning.
    - Make the title and description compelling and written for humans.
    - Each must be unique and relevant to the content.
    - Include a subtle call-to-action in the description.
    My current title is: "${titleAI}" 
    My current description is: "${descriptionAI}". 
    Provide only one result that adheres strictly to these limits.`;

  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  console.log("Generated Content:", text);
  return text;
};

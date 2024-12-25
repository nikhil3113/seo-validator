import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function GenerativeAI() {
  const apiKey = process.env.API_Key;
  if (!apiKey) {
    throw new Error("API_KEY is not defined");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Give me a best meta title and description for my website with keyword Digital Marketing. My current title is 'Digital Marketing Agency' and description is 'We are a digital marketing agency that helps businesses grow online.' just give me 1 option";

  const result = await model.generateContent(prompt);
  console.log(result.response.text());

  return <div>{result.response.text()}</div>;
}

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Write a story about a magic backpack.";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());
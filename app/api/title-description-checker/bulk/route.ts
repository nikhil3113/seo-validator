import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  const body = await req.json();
  const { urls } = body;

  if (!Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json(
      { message: "Invalid or missing URLs" },
      { status: 400 }
    );
  }

  try {
    const results = await Promise.all(
      urls.map(async (url: string) => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            return {
              url,
              title: "",
              description: "",
            };
          }

          const html = await response.text();
          const $ = cheerio.load(html);

          const title = $("title").text();
          const description = $('meta[property="og:description"]').attr("content") || $('meta[name="description"]').attr("content");

          return { url, title, description };
        } catch {
          return {
            url,
            title:"",
            description:"",
          };
        }
      })
    );

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

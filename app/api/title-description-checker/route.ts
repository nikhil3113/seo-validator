import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { message: "Invalid URL provided" },
        { status: 400 },
      );
    }

    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch the URL" },
        { status: response.status },
      );
    }

    const html = await response.text();

    const $ = cheerio.load(html);

    const title = $("title").text();
    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content");
    const canonicalLink = $('link[rel="canonical"]').attr("href");
    const bodyWordCount = $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter((word) => word.length > 0).length;

    const headings: { tag: string; text: string }[] = [];
    $("h1, h2, h3, h4, h5, h6").each((_, el) => {
      headings.push({
        tag: ($(el).prop("tagName") as string).toLowerCase(),
        text: $(el).text().trim(),
      });
    });

    return NextResponse.json(
      { title, description, canonicalLink, bodyWordCount, headings },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import * as cheerio from 'cheerio';

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const{url} = body;

        if (!url || typeof url !== "string") {
            return NextResponse.json(
                { message: "Invalid URL provided" },
                { status: 400 }
            );
        }

        const response = await fetch(url);
        if (!response.ok) {
            return NextResponse.json(
                { message: "Failed to fetch the URL" },
                { status: response.status }
            );
        }

        const html = await response.text();

        const $ = cheerio.load(html);

        const title = $("title").text() ;
        const description = $('meta[property="og:description"]').attr("content") || $('meta[name="description"]').attr("content");
        console.log(description)

        return NextResponse.json({ title, description }, { status: 200 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }    
}
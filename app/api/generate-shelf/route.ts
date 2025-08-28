import { shelfPrompt } from "@/prompts/shelfTemplate";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import sharp from "sharp";

export const runtime = "nodejs";           // needed for sharp (Edge doesn't support sharp)
export const dynamic = "force-dynamic";    // this route always runs on server
export const maxDuration = 60;             // Vercel serverless timeout hint

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const ALLOWED = new Set(["Shanghai", "Beijing", "Guangzhou", "Chengdu"]);

function badRequest(message: string) {
    return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(req: NextRequest) {
    try {
        const { city, variant = "photo", size = "1024x1792" } = await req.json();

        if (!city || typeof city !== "string") return badRequest("Missing 'city'");
        if (!ALLOWED.has(city)) return badRequest("City not allowed");
        const style = variant === "cartoon" ? "cartoon" : "photo realistic";

        const prompt = shelfPrompt({
            city,
            country: "China",
            language: "Chinese",
            style,
        });

        // Call Images API (choose your model; both often work similarly)
        const resp = await openai.images.generate({
            model: "dall-e-3",          // or "gpt-image-1" if you prefer
            prompt,
            size,                        // "1024x1792"
            n: 1,
            response_format: "b64_json"
        });

        const b64 = resp.data?.[0]?.b64_json;
        if (!b64) return NextResponse.json({ error: "No image returned" }, { status: 502 });

        const pngBuffer = Buffer.from(b64, "base64");

        // Convert to WebP (~60–80 KB target) – tune quality as you like
        const webpBuffer = await sharp(pngBuffer).webp({ quality: 60 }).toBuffer();

        return new NextResponse(webpBuffer, {
            status: 200,
            headers: {
                "Content-Type": "image/webp",
                // Allow your Expo app to call this endpoint directly:
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
            },
        });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
    }
}

// Simple CORS preflight
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}

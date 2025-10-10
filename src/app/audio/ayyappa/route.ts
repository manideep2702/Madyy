import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(_req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "Sreekovil-Nada-Thurannu-Jayan-Jaya-Vijaya.mp3");
    const data = await fs.readFile(filePath);
    // Wrap Node Buffer as Uint8Array for Web Response body compatibility
    const body = new Uint8Array(data);
    return new Response(body, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("Audio not found", { status: 404 });
  }
}

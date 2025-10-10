import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "ayya.pdf");
    const data = await fs.readFile(filePath);
    const headers = new Headers({
      "Content-Type": "application/pdf",
      "Cache-Control": "public, max-age=3600",
    });
    const download = req.nextUrl.searchParams.get("download");
    if (download) {
      headers.set("Content-Disposition", 'attachment; filename="ayya.pdf"');
    }
    // Wrap Buffer as Uint8Array for Web Response body
    const uint8 = new Uint8Array(data);
    return new Response(uint8, { headers });
  } catch (e) {
    return new Response("PDF not found", { status: 404 });
  }
}

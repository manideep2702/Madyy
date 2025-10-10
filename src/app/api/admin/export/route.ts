import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Build an Excel workbook with embedded images where possible
async function toExcelWithImages(dataByTable: Record<string, unknown[]>) {
  const ExcelJS = (await import("exceljs")).default;
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "ayya-admin";
  workbook.created = new Date();

  // Helper: detect if a field name suggests an image URL
  const looksLikeImageField = (key: string) => {
    const k = key.toLowerCase();
    return (
      k.includes("image") ||
      k.endsWith("_url") ||
      k.includes("avatar") ||
      k.includes("photo")
    );
  };

  // Helper: detect image URL by suffix
  const looksLikeImageUrl = (val: string) => /\.(png|jpe?g|gif|webp|bmp|svg)(\?|#|$)/i.test(val);

  // Fetch image as Buffer and derive extension
  async function fetchImage(url: string): Promise<{ buf: Buffer; ext: string } | null> {
    try {
      const r = await fetch(url, { cache: "no-store" });
      if (!r.ok) return null;
      const ctype = r.headers.get("content-type") || "";
      if (!ctype.startsWith("image/")) {
        // Not an image; skip
        return null;
      }
      const ab = await r.arrayBuffer();
      const buf = Buffer.from(ab);
      const ext = ctype.split("/")[1]?.split(";")[0] || "png";
      return { buf, ext };
    } catch {
      return null;
    }
  }

  for (const [table, items] of Object.entries(dataByTable)) {
    const rows = Array.isArray(items) ? (items as Record<string, unknown>[]) : [];
    const sheet = workbook.addWorksheet(table.slice(0, 31));

    if (!rows.length) continue;

    // Build column list from union of keys
    const columns = Array.from(
      rows.reduce((set, r) => {
        Object.keys(r || {}).forEach((k) => set.add(k));
        return set;
      }, new Set<string>())
    );

    // Configure columns with friendly widths
    sheet.columns = columns.map((k) => ({ header: k, key: k, width: looksLikeImageField(k) ? 20 : 24 }));

    // Add data rows (as text for non-images; stringify objects/arrays)
    const toCellValue = (v: unknown) => {
      if (v == null) return "";
      if (v instanceof Date) return v.toISOString();
      if (typeof v === "object") return JSON.stringify(v);
      return String(v);
    };

    rows.forEach((r) => {
      const row: Record<string, string> = {};
      for (const k of columns) row[k] = toCellValue((r as any)[k]);
      sheet.addRow(row);
    });

    // Try to embed images for image-like columns
    // Limit total images per sheet to avoid huge files
    const MAX_IMAGES = 200;
    let added = 0;
    for (let colIdx = 0; colIdx < columns.length; colIdx++) {
      const key = columns[colIdx];
      if (!looksLikeImageField(key)) continue;

      for (let rowIdx = 0; rowIdx < rows.length; rowIdx++) {
        if (added >= MAX_IMAGES) break;
        const val = rows[rowIdx]?.[key];
        if (!val || typeof val !== "string") continue;
        const url = val.trim();
        if (!url) continue;
        if (!looksLikeImageUrl(url)) continue;

        const fetched = await fetchImage(url);
        if (!fetched) continue;
        const imageId = workbook.addImage({ buffer: fetched.buf, extension: fetched.ext as any });

        // Row/column indices for exceljs image anchors are 0-based
        const tlCol = colIdx; // zero-based
        const tlRow = rowIdx + 1; // +1 to account for header row above data

        // Make row taller to show thumbnail
        const excelRow = sheet.getRow(rowIdx + 2); // +2 => header + 1-based row
        if (excelRow.height == null || excelRow.height < 60) excelRow.height = 60;

        // Anchor the image roughly inside the cell
        sheet.addImage(imageId, {
          tl: { col: tlCol, row: tlRow },
          ext: { width: 60, height: 60 },
          editAs: "oneCell",
        } as any);
        added++;
      }
    }
  }

  const buf = Buffer.from(await workbook.xlsx.writeBuffer());
  return buf;
}

export async function GET(req: Request) {
  if (!isAdminAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const format = (url.searchParams.get("format") || "json").toLowerCase();
  const start = url.searchParams.get("start");
  const end = url.searchParams.get("end");

  let startISO: string | undefined;
  let endISO: string | undefined;
  if (start) {
    const s = new Date(start);
    if (!isNaN(s.getTime())) startISO = s.toISOString();
  }
  if (end) {
    const e = new Date(end);
    if (!isNaN(e.getTime())) {
      // Include the full end day by adding almost one day
      const endOfDay = new Date(e);
      endOfDay.setHours(23, 59, 59, 999);
      endISO = endOfDay.toISOString();
    }
  }

  const admin = getSupabaseAdminClient();
  const tables = [
    "contact-us",
    "contact_us",
    "Profile-Table",
    "profile_photos",
  ];

  const dataByTable: Record<string, unknown[]> = {};

  for (const table of tables) {
    try {
      let query = admin.from(table).select("*");
      if (startISO) query = query.gte("created_at", startISO);
      if (endISO) query = query.lte("created_at", endISO);
      const { data, error } = await query;
      if (error) {
        // Skip missing tables
        if ((error as any)?.details?.includes?.("does not exist")) continue;
        continue;
      }
      if (Array.isArray(data) && data.length) {
        dataByTable[table] = data;
      }
    } catch {
      // ignore table errors
    }
  }

  const ts = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 19);
  if (format === "excel" || format === "xlsx") {
    const buf = await toExcelWithImages(dataByTable);
    return new Response(buf, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=ayya-export-${ts}.xlsx`,
        "Cache-Control": "no-store",
      },
    });
  }

  // default JSON
  return NextResponse.json(dataByTable, {
    headers: {
      "Content-Disposition": `attachment; filename=ayya-export-${ts}.json`,
    },
  });
}

"use client";

import Link from "next/link";
import { Folder } from "@/components/ui/folder";
import { ImageIcon, Music, BookOpenText } from "lucide-react";

export default function GalleryPage() {
  const folders = [
    { label: "Images", color: "#D4AF37", href: "/gallery/images", Icon: ImageIcon },
    { label: "Music", color: "#0F172A", href: "/gallery/music", Icon: Music },
    { label: "Slokhas", color: "#7C3AED", href: "/gallery/slokhas", Icon: BookOpenText },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 pt-24 md:pt-28 pb-16">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Media Gallery</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Tap a folder to explore. Sizes are kept medium for a clean layout.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {folders.map(({ label, color, href, Icon }) => (
            <Link key={label} href={href} className="group">
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/70 p-6 shadow-sm hover:shadow-md transition">
                <Folder color={color} size={1.6} />
                <div className="flex items-center gap-2 text-sm">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{label}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Placeholder links — we can wire these to actual subpages when ready.
        </p>
      </div>
    </main>
  );
}


"use client";

import { useEffect, useState } from "react";
import { useAlert } from "@/components/ui/alert-provider";
import { useRouter } from "next/navigation";
import ProfileEditorForm from "@/components/profile/ProfileEditorForm";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import RequireAuth from "@/components/auth/require-auth";

type ProfileData = {
  name?: string;
  designation?: string;
  tagline?: string;
  imageUrl?: string;
  bioParagraphs?: string[];
  videoUrl?: string;
  highlights?: string[];
  // New fields
  associatedSince?: string;
  roles?: string[];
  phone?: string;
  email?: string;
  location?: string;
  socialFacebook?: string;
  socialInstagram?: string;
  socialWhatsapp?: string;
};

export default function EditProfilePage() {
  const router = useRouter();
  const { show } = useAlert();
  const [value, setValue] = useState<ProfileData>({
    name: "",
    designation: "",
    tagline: "",
    imageUrl: "",
    bioParagraphs: [""],
    videoUrl: "",
    highlights: [""],
    associatedSince: "",
    roles: [""],
    phone: "",
    email: "",
    location: "",
    socialFacebook: "",
    socialInstagram: "",
    socialWhatsapp: "",
  });

  useEffect(() => {
    const run = async () => {
      const supabase = getSupabaseBrowserClient();
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes?.user;
      if (!user) {
        router.replace("/sign-in?next=/profile/edit");
        return;
      }
      // Load profile from Supabase if present
      // Try by user_id first; fallback to id for older schemas
      let { data, error } = await supabase
        .from("Profile-Table")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error || !data) {
        const second = await supabase
          .from("Profile-Table")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();
        data = second.data as any;
        error = second.error as any;
      }
      if (!error && data) {
        setValue((prev) => ({
          ...prev,
          name: (data.name || data.full_name || prev.name) as string,
          designation: (data.designation || prev.designation) as string,
          tagline: (data.tagline || prev.tagline) as string,
          imageUrl: (data.image_url || data.avatar_url || prev.imageUrl) as string,
          bioParagraphs: Array.isArray(data.bio_paragraphs) ? (data.bio_paragraphs as string[]) : prev.bioParagraphs,
          videoUrl: (data.video_url || prev.videoUrl) as string,
          highlights: Array.isArray(data.highlights) ? (data.highlights as string[]) : prev.highlights,
          associatedSince: (data.associated_since || prev.associatedSince) as string,
          roles: Array.isArray(data.roles) ? (data.roles as string[]) : prev.roles,
          phone: (data.phone || prev.phone) as string,
          email: (data.email || prev.email || user.email || "") as string,
          location: (data.location || prev.location) as string,
          socialFacebook: (data.social_facebook || prev.socialFacebook) as string,
          socialInstagram: (data.social_instagram || prev.socialInstagram) as string,
          socialWhatsapp: (data.social_whatsapp || prev.socialWhatsapp) as string,
        }));
      }
    };
    run();
  }, [router]);

  const handleSave = async (next: ProfileData) => {
    const supabase = getSupabaseBrowserClient();
    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes?.user;
    if (!user) {
      router.replace("/sign-in?next=/profile/edit");
      return;
    }
    const payloadBase = {
      name: next.name || "",
      full_name: next.name || "",
      designation: next.designation || "",
      tagline: next.tagline || "",
      avatar_url: next.imageUrl || "",
      image_url: next.imageUrl || "",
      bio_paragraphs: Array.isArray(next.bioParagraphs) ? next.bioParagraphs : [],
      video_url: next.videoUrl || "",
      highlights: Array.isArray(next.highlights) ? next.highlights : [],
      // New fields
      associated_since: next.associatedSince || "",
      roles: Array.isArray(next.roles) ? next.roles : [],
      phone: next.phone || "",
      email: (next.email || user.email || "").trim() || null,
      location: next.location || "",
      social_facebook: next.socialFacebook || "",
      social_instagram: next.socialInstagram || "",
      social_whatsapp: next.socialWhatsapp || "",
    } as Record<string, any>;

    // Try upsert using user_id, fallback to id. If unknown columns, retry with minimal payload.
    const attempt = async (key: "user_id" | "id", payload: Record<string, any>) =>
      supabase.from("Profile-Table").upsert({ [key]: user.id, ...payload }, { onConflict: key }).select("*");

    let ok = await attempt("user_id", payloadBase);
    if (ok.error) ok = await attempt("id", payloadBase);
    if (ok.error) {
      const minimal = {
        name: payloadBase.name,
        full_name: payloadBase.full_name,
        designation: payloadBase.designation,
        tagline: payloadBase.tagline,
        avatar_url: payloadBase.avatar_url,
        image_url: payloadBase.image_url,
        bio_paragraphs: payloadBase.bio_paragraphs,
        video_url: payloadBase.video_url,
        highlights: payloadBase.highlights,
        email: payloadBase.email,
      } as Record<string, any>;
      ok = await attempt("user_id", minimal);
      if (ok.error) ok = await attempt("id", minimal);
    }
    if (ok.error) {
      show({ title: "Save failed", description: ok.error.message, variant: "error" });
      return;
    }
    show({ title: "Profile updated", description: "Your changes have been saved.", variant: "success" });
    router.push("/");
  };

  const handleCancel = () => {
    router.back();
  };

  async function handleUpload(file: File): Promise<string> {
    const supabase = getSupabaseBrowserClient();
    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes?.user;
    if (!user) throw new Error("Not signed in");
    const ext = file.name.split(".").pop() || "jpg";
    const path = `avatars/${user.id}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: false, cacheControl: "3600" });
    if (upErr) throw upErr;
    const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
    const url = pub.publicUrl;
    // Best-effort: store photo record under the user's id for history
    try {
      await supabase.from("profile_photos").insert({ user_id: user.id, url });
    } catch {}
    return url;
  }

  return (
    <RequireAuth>
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-4xl px-4 pt-28 pb-12">
          <div className="mb-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-md px-3 py-1.5 text-sm ring-1 ring-border text-foreground hover:bg-white/5"
            >
              ← Back
            </button>
          </div>
          <ProfileEditorForm initialValue={value} onSave={handleSave} onCancel={handleCancel} onImageFileUpload={handleUpload} />
        </div>
      </main>
    </RequireAuth>
  );
}

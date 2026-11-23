"use server";

import { requireDashboardClient } from "@/lib/dashboard-auth";

const BUCKET = "site-images";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export async function uploadFeaturedImageAction(formData: FormData) {
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image to upload." };
  }

  const extension = MIME_EXTENSIONS[file.type];
  if (!extension) {
    return { error: "Use a JPG, PNG, WebP, or AVIF image." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { error: "Images must be 5MB or smaller." };
  }

  const { supabase } = await requireDashboardClient();

  const path = `featured/${new Date().getFullYear()}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    return { error: error.message };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}

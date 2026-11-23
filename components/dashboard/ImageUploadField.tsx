"use client";

import { useState, useTransition } from "react";
import { uploadFeaturedImageAction } from "@/app/dashboard/upload-actions";

type ImageUploadFieldProps = {
  name: string;
  label: string;
  defaultValue?: string;
  hint?: string;
};

export default function ImageUploadField({
  name,
  label,
  defaultValue = "",
  hint,
}: ImageUploadFieldProps) {
  const [url, setUrl] = useState(defaultValue);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setError("");
    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const result = await uploadFeaturedImageAction(formData);
      if (result.error) {
        setError(result.error);
        return;
      }
      if (result.url) {
        setUrl(result.url);
      }
    });
  }

  return (
    <div className="admin-image-field">
      <span className="admin-field-label">{label}</span>
      <input type="hidden" name={name} value={url} />
      <input
        type="url"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://..."
        aria-label={`${label} URL`}
      />
      <div className="admin-image-upload-row">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleFileChange}
          disabled={pending}
          aria-label={`Upload ${label}`}
        />
        {pending ? <span className="admin-form-note">Uploading…</span> : null}
      </div>
      {error ? <div className="admin-alert admin-alert-error admin-image-error">{error}</div> : null}
      {url ? <img className="admin-image-preview" src={url} alt="" /> : null}
      {hint ? <span className="admin-form-note">{hint}</span> : null}
    </div>
  );
}

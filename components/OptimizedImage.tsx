import Image from "next/image";
import type { CSSProperties } from "react";

type OptimizedImageProps = {
  src: string;
  alt: string;
  sizes: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
};

function canOptimize(src: string) {
  if (src.startsWith("/")) return true;

  try {
    const { hostname, protocol, pathname } = new URL(src);
    if (protocol !== "https:") return false;

    if (
      hostname === "bestinterstatemovingandstorage.com" ||
      hostname === "www.bestinterstatemovingandstorage.com"
    ) {
      return true;
    }

    return (
      hostname.endsWith(".supabase.co") &&
      pathname.startsWith("/storage/v1/object/public/")
    );
  } catch {
    return false;
  }
}

export default function OptimizedImage({
  src,
  alt,
  sizes,
  width,
  height,
  className,
  style,
  priority = false,
}: OptimizedImageProps) {
  if (!canOptimize(src)) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      style={style}
      priority={priority}
    />
  );
}

import fs from "fs";
import path from "path";

const publicDir = path.join(process.cwd(), "public");
const cache = new Map<string, [number, number] | null>();

function readWebp(buffer: Buffer): [number, number] | null {
  const chunk = buffer.toString("ascii", 12, 16);
  if (chunk === "VP8X") {
    return [buffer.readUIntLE(24, 3) + 1, buffer.readUIntLE(27, 3) + 1];
  }
  if (chunk === "VP8 ") {
    return [buffer.readUInt16LE(26) & 0x3fff, buffer.readUInt16LE(28) & 0x3fff];
  }
  if (chunk === "VP8L") {
    const bits = buffer.readUInt32LE(21);
    return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
  }
  return null;
}

function readJpeg(buffer: Buffer): [number, number] | null {
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }
    const length = buffer.readUInt16BE(offset + 2);
    if (
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc
    ) {
      return [buffer.readUInt16BE(offset + 7), buffer.readUInt16BE(offset + 5)];
    }
    offset += 2 + length;
  }
  return null;
}

function readSvg(contents: string): [number, number] | null {
  const openTag = contents.match(/<svg\b[^>]*>/i)?.[0];
  if (!openTag) {
    return null;
  }
  const width = openTag.match(/\bwidth\s*=\s*["']?([\d.]+)/i);
  const height = openTag.match(/\bheight\s*=\s*["']?([\d.]+)/i);
  if (width && height) {
    return [Number(width[1]), Number(height[1])];
  }
  const viewBox = openTag.match(/\bviewBox\s*=\s*["']?\s*[\d.-]+\s+[\d.-]+\s+([\d.]+)\s+([\d.]+)/i);
  if (viewBox) {
    return [Number(viewBox[1]), Number(viewBox[2])];
  }
  return null;
}

export function getLocalImageSize(src: string): [number, number] | null {
  if (!src.startsWith("/") || src.startsWith("//")) {
    return null;
  }

  const cached = cache.get(src);
  if (cached !== undefined) {
    return cached;
  }

  const filePath = path.resolve(publicDir, `.${src}`);
  if (!filePath.startsWith(`${publicDir}${path.sep}`)) {
    return null;
  }

  let size: [number, number] | null = null;
  try {
    const buffer = fs.readFileSync(filePath);
    if (filePath.toLowerCase().endsWith(".svg")) {
      size = readSvg(buffer.toString("utf8", 0, Math.min(buffer.length, 2048)));
    } else if (buffer.toString("ascii", 1, 4) === "PNG" && buffer.length >= 24) {
      size = [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
    } else if (buffer.toString("ascii", 8, 12) === "WEBP" && buffer.length >= 30) {
      size = readWebp(buffer);
    } else if (buffer[0] === 0xff && buffer[1] === 0xd8) {
      size = readJpeg(buffer);
    }
  } catch {
    size = null;
  }

  cache.set(src, size);
  return size;
}

import fs   from "fs";
import path from "path";
import { getProject, getProjects, normalizeMedia } from "@/app/data/projects";
import type { MediaItem } from "@/app/data/projects";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CaseStudyPage from "@/app/components/CaseStudyPage";

// ─── AUTO-SCAN ───────────────────────────────────────────────────────────────
// Runs server-side only. Reads public/projects/{slug}/ and derives layout
// from filename convention:  {order}-1.ext = full-width, {order}-2.ext = half-width

const IMAGE_EXT  = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const VIDEO_EXT  = new Set([".mp4", ".webm", ".mov"]);
const SKIP_FILES = new Set(["cover.png", "cover.jpg", "cover.jpeg", "cover.webp", "cover.avif"]);

function spanFromName(base: string, isVideo: boolean): "full" | "half" {
  const m = base.match(/-([12])$/);
  if (m) return m[1] === "1" ? "full" : "half";
  return isVideo ? "full" : "half";
}

// Slug → actual folder name in public/projects/
const FOLDER: Record<string, string> = {
  "prohost-ai":  "prohost",
  "iron-health": "iron",
};

function scanMedia(slug: string): MediaItem[] {
  const folder = FOLDER[slug] ?? slug;
  const dir = path.join(process.cwd(), "public", "projects", folder);
  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }

  type Parsed = { file: string; base: string; span: "full" | "half"; type: "image" | "video" };
  const parsed: Parsed[] = [];

  for (const file of files) {
    if (SKIP_FILES.has(file.toLowerCase())) continue;
    const ext  = path.extname(file).toLowerCase();
    const base = path.basename(file, ext);
    if (IMAGE_EXT.has(ext)) {
      parsed.push({ file, base, span: spanFromName(base, false), type: "image" });
    } else if (VIDEO_EXT.has(ext)) {
      parsed.push({ file, base, span: spanFromName(base, true), type: "video" });
    }
  }

  parsed.sort((a, b) =>
    a.base.localeCompare(b.base, undefined, { numeric: true, sensitivity: "base" })
  );

  return parsed.map(({ file, span, type }): MediaItem => {
    const src = `/projects/${folder}/${file}`;
    if (type === "video") return { type: "video", src, span };
    return { type: "image", src, alt: `${folder} — ${file}`, span };
  });
}

// ─── STATIC PARAMS ───────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

// ─── METADATA ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.name} — Elevate Studio`;
  const description = project.overview || project.tagline;
  const baseUrl = "https://elevatestudio.xyz";
  const imgUrl = project.img ? `${baseUrl}${project.img}` : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/projects/${project.slug}`,
      siteName: "Elevate Studio",
      images: imgUrl ? [{ url: imgUrl, width: 1200, height: 630 }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imgUrl ? [imgUrl] : [],
    },
  };
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  // If JSON media array is empty, auto-scan the public folder
  const media = project.media.length > 0 ? project.media : scanMedia(slug);

  return <CaseStudyPage project={{ ...project, media }} />;
}

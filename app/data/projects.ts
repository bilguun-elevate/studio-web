// ─── PROJECT DATA ────────────────────────────────────────────────────────────
// Content lives in content/projects/*.json — edit those files directly.
//
// MEDIA: leave "media": [] in JSON → auto-scanned from public/projects/{slug}/
// Naming convention:  {order}-1.jpg = full-width,  {order}-2.jpg = half-width
// cover.png / cover.jpg is always skipped (hero image).
// For fine-grained control (aspect ratio, objectPosition) fill the JSON array.

import prohostRaw  from "../../content/projects/prohost-ai.json";
import atlasRaw    from "../../content/projects/atlas.json";
import ironRaw     from "../../content/projects/iron-health.json";
import lanndyRaw   from "../../content/projects/lanndy.json";

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type MediaItem =
  | {
      type: "image";
      src: string;
      alt: string;
      span?: "full" | "half";
      aspect?: string;
      objectPosition?: string;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      span?: "full" | "half";
      aspect?: string;
    };

export type Project = {
  slug: string;
  name: string;
  category: string;
  tag?: "YC";
  description: string;
  cta: string;
  tagline: string;
  img: string;
  year: string;
  scope: string[];
  overview: string;
  media: MediaItem[];
  upcoming?: true;
};

// ─── NORMALIZATION ────────────────────────────────────────────────────────────

type RawMedia = {
  type?: string | null;
  src?: string | null;
  alt?: string | null;
  span?: string | null;
  aspect?: string | null;
  objectPosition?: string | null;
  poster?: string | null;
};

type RawProject = {
  name: string;
  category: string;
  tag?: string | null;
  description: string;
  cta: string;
  tagline: string;
  cover?: string | null;
  year: string;
  scope: string[];
  overview: string;
  upcoming?: boolean | null;
  media?: RawMedia[] | null;
};

export function normalizeMedia(rawMedia: RawMedia[]): MediaItem[] {
  return rawMedia.flatMap((m): MediaItem[] => {
    const src = m.src ?? "";
    if (!src) return [];
    const span = m.span === "full" ? "full" : m.span === "half" ? "half" : undefined;
    if (m.type === "video") {
      return [{ type: "video", src, poster: m.poster || undefined, span, aspect: m.aspect || undefined }];
    }
    return [{ type: "image", src, alt: m.alt ?? "", span, aspect: m.aspect || undefined, objectPosition: m.objectPosition || undefined }];
  });
}

function normalize(raw: RawProject, slug: string): Project {
  return {
    slug,
    name: raw.name,
    category: raw.category,
    tag: raw.tag === "YC" ? "YC" : undefined,
    description: raw.description,
    cta: raw.cta,
    tagline: raw.tagline,
    img: raw.cover ?? "",
    year: raw.year,
    scope: raw.scope ?? [],
    overview: raw.overview,
    upcoming: raw.upcoming === true ? true : undefined,
    // Media resolved later in the Server Component (scanMedia runs server-side only)
    media: normalizeMedia((raw.media ?? []).filter((m) => m.src)),
  };
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  normalize(prohostRaw  as RawProject, "prohost-ai"),
  normalize(atlasRaw    as RawProject, "atlas"),
  normalize(ironRaw     as RawProject, "iron-health"),
  normalize(lanndyRaw   as RawProject, "lanndy"),
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjects(): Project[] {
  return projects;
}

/**
 * sync-images.mjs
 *
 * Workaround for Keystatic v0.5 bug: fields.image() inside arrays saves image
 * files to public/ but does NOT write the src path back to the JSON. It also
 * places files in media/N/ subdirectories instead of the flat slug folder.
 *
 * This script:
 *   1. Rescues images from media/N/ subdirs Keystatic creates → moves them
 *      to the flat public/projects/[folder]/ directory
 *   2. Removes leftover empty media/ subdirs
 *   3. Patches any media items in content/projects/[slug].json missing a src
 *
 * Usage:
 *   node scripts/sync-images.mjs           → patch all projects
 *   node scripts/sync-images.mjs atlas     → patch one project
 *
 * Slug → folder mapping: some projects use a shorter folder name than slug.
 * Edit FOLDER_MAP below if your folder names differ from the slugs.
 */

import {
  readFileSync, writeFileSync, readdirSync,
  existsSync, renameSync, rmdirSync, statSync,
} from "fs";
import { join, extname, basename } from "path";

const ROOT = decodeURIComponent(new URL("..", import.meta.url).pathname);
const CONTENT_DIR = join(ROOT, "content", "projects");
const PUBLIC_DIR  = join(ROOT, "public",  "projects");
const IMAGE_EXTS  = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"]);

// Map slug → actual folder name under public/projects/
// Add entries here when the folder name differs from the slug.
const FOLDER_MAP = {
  "prohost-ai":  "prohost",
  "iron-health": "iron",
};

const SLUGS = ["prohost-ai", "atlas", "iron-health", "lanndy"];

const targetSlug   = process.argv[2];
const slugsToProcess = targetSlug ? [targetSlug] : SLUGS;

for (const slug of slugsToProcess) {
  const jsonPath = join(CONTENT_DIR, `${slug}.json`);
  if (!existsSync(jsonPath)) {
    console.log(`⚠  ${slug}.json not found, skipping`);
    continue;
  }

  const data = JSON.parse(readFileSync(jsonPath, "utf-8"));

  // Resolve folder name: check FOLDER_MAP first, then try slug and Title-cased slug
  const folderCandidates = [
    FOLDER_MAP[slug],
    slug,
    slug.charAt(0).toUpperCase() + slug.slice(1),
  ].filter(Boolean);

  let imgDir = null;
  for (const folder of folderCandidates) {
    const candidate = join(PUBLIC_DIR, folder);
    if (existsSync(candidate)) { imgDir = candidate; break; }
  }

  if (!imgDir) {
    console.log(`⚠  No image folder found for ${slug} (tried: ${folderCandidates.join(", ")})`);
    continue;
  }

  const folderName   = basename(imgDir);
  const publicPrefix = `/projects/${folderName}`;

  // ── Step 1: Rescue images from media/N/ subdirs ────────────────────────────
  const mediaSubdir = join(imgDir, "media");
  if (existsSync(mediaSubdir)) {
    let rescued = 0;
    try {
      const slots = readdirSync(mediaSubdir, { withFileTypes: true })
        .filter(e => e.isDirectory())
        .map(e => e.name)
        .sort((a, b) => parseInt(a) - parseInt(b));

      for (const slot of slots) {
        const slotDir = join(mediaSubdir, slot);
        const files = readdirSync(slotDir, { withFileTypes: true })
          .filter(f => f.isFile() && IMAGE_EXTS.has(extname(f.name).toLowerCase()))
          .map(f => f.name);

        for (const file of files) {
          const src  = join(slotDir, file);
          // Rename to avoid collisions: media-N-filename.ext
          const dest = join(imgDir, `media-${slot}-${file}`);
          renameSync(src, dest);
          console.log(`  rescued: media/${slot}/${file} → ${basename(dest)}`);
          rescued++;
        }

        // Remove empty slot dir
        try { rmdirSync(slotDir); } catch {}
      }
      // Remove empty media/ dir
      try { rmdirSync(mediaSubdir); } catch {}
    } catch (e) {
      console.log(`  could not process ${mediaSubdir}: ${e.message}`);
    }
    if (rescued > 0) console.log(`  ${slug}: rescued ${rescued} image(s) from Keystatic media/ subdirs`);
  }

  // ── Step 2: List all image files in flat folder, sorted ────────────────────
  let allFiles;
  try {
    allFiles = readdirSync(imgDir, { withFileTypes: true })
      .filter(f => f.isFile() && IMAGE_EXTS.has(extname(f.name).toLowerCase()))
      .map(f => f.name)
      .sort((a, b) => {
        const na = parseInt(a), nb = parseInt(b);
        if (!isNaN(na) && !isNaN(nb)) return na - nb;
        return a.localeCompare(b);
      });
  } catch {
    console.log(`⚠  Could not read ${imgDir}`);
    continue;
  }

  // ── Step 3: Patch cover if missing ─────────────────────────────────────────
  const coverFile = allFiles.find(f => f.toLowerCase().startsWith("cover"));
  if (!data.cover && coverFile) {
    data.cover = `${publicPrefix}/${coverFile}`;
    console.log(`  cover → ${data.cover}`);
  }

  // ── Step 4: Patch media srcs ───────────────────────────────────────────────
  const mediaFiles = allFiles.filter(f => !f.toLowerCase().startsWith("cover"));

  if (!data.media || data.media.length === 0) {
    console.log(`  ${slug}: no media array, skipping media`);
  } else {
    let fileIdx = 0;
    let patched  = 0;
    for (const item of data.media) {
      if (!item.src || item.src === "") {
        if (fileIdx < mediaFiles.length) {
          item.src = `${publicPrefix}/${mediaFiles[fileIdx]}`;
          fileIdx++;
          patched++;
        }
      } else {
        fileIdx++;
      }
    }
    if (patched > 0) {
      console.log(`  ${slug}: patched ${patched} media src(s)`);
    } else {
      console.log(`  ${slug}: all media srcs already set, no changes`);
    }
  }

  writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
  console.log(`✓  ${slug}.json saved`);
}

console.log("\nDone. Hard-refresh the case study page to see changes.");

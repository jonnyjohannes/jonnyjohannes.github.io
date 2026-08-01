const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { isInside, readNote, publicUrl, slugify, walk } = require("./note-utils");

function args(argv) {
  const result = { dryRun: false, strict: false };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--dry-run") result.dryRun = true;
    else if (argv[i] === "--strict") result.strict = true;
    else if (argv[i] === "--source") result.source = argv[++i];
    else if (argv[i] === "--destination") result.destination = argv[++i];
  }
  return result;
}

function fail(message) {
  console.error(`error: ${message}`);
  process.exitCode = 1;
}

const options = args(process.argv.slice(2));
const source = path.resolve(options.source || process.env.J2_NOTES_ROOT || "");
const destination = path.resolve(options.destination || path.join(process.cwd(), "src/notes"));
const assetsDestination = path.resolve(process.cwd(), "src/assets/images/notes");

if (!source || source === process.cwd() || !fs.existsSync(source)) {
  fail("j2 source is missing; pass --source or set J2_NOTES_ROOT");
  process.exit();
}
if (!isInside(source, source) || !["j2", "notes-j2"].includes(path.basename(source)) || /wayfair/i.test(source)) {
  fail(`source must be the j2 directory (or its notes-j2 backing directory), received ${source}`);
  process.exit();
}

const notes = walk(source).map((file) => {
  const note = readNote(file);
  note.sourceRelativePath = path.relative(source, file);
  return note;
});
const legacy = notes.filter((note) => note.tags.includes("publish") && note.parsed.data.publish !== true);
const selected = notes.filter((note) => note.parsed.data.publish === true);
const bySourcePath = new Map(selected.map((note) => [note.sourceRelativePath.split(path.sep).join("/"), note]));
const byTitle = new Map();
for (const note of selected) {
  const key = note.title.toLowerCase();
  if (!byTitle.has(key)) byTitle.set(key, []);
  byTitle.get(key).push(note);
}
const manifest = selected.map((note) => ({
  sourcePath: note.sourceRelativePath,
  title: note.title,
  permalink: publicUrl(note),
}));
const urls = new Map();
for (const note of manifest) {
  if (urls.has(note.permalink)) fail(`duplicate permalink ${note.permalink}: ${urls.get(note.permalink)} and ${note.sourcePath}`);
  urls.set(note.permalink, note.sourcePath);
}

const previousManifestPath = path.join(destination, ".j2-sync-manifest.json");
const previous = fs.existsSync(previousManifestPath) ? JSON.parse(fs.readFileSync(previousManifestPath, "utf8")) : { files: [] };
const generatedFiles = selected.map((note) => path.relative(destination, path.join(destination, note.sourceRelativePath)));
const stale = (previous.files || []).filter((file) => !generatedFiles.includes(file));

console.log(`source: ${source}`);
console.log(`selected: ${selected.length}`);
console.log(`skipped: ${notes.length - selected.length}`);
if (legacy.length) console.warn(`legacy publish-tag candidates (not copied): ${legacy.map((note) => note.sourceRelativePath).join(", ")}`);
if (stale.length) console.log(`stale generated files: ${stale.length}`);

function findNote(note, target) {
  const [rawPath, heading] = target.split("#", 2);
  if (rawPath) {
    const absolute = path.resolve(path.dirname(note.file), rawPath.endsWith(".md") ? rawPath : `${rawPath}.md`);
    const sourcePath = path.relative(source, absolute).split(path.sep).join("/");
    if (bySourcePath.has(sourcePath)) return { note: bySourcePath.get(sourcePath), heading };
  }
  const matches = byTitle.get(rawPath.toLowerCase()) || [];
  return matches.length === 1 ? { note: matches[0], heading } : null;
}

function assetPath(note, reference) {
  const clean = reference.split("#")[0].replace(/^\//, "");
  const candidates = [
    path.resolve(path.dirname(note.file), clean),
    path.resolve(source, clean),
  ];
  const file = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!file || !isInside(source, file)) return null;
  const relative = path.relative(source, file).split(path.sep).join("/");
  const target = path.join(assetsDestination, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(file, target);
  return `/assets/images/notes/${relative}`;
}

function rewriteContent(note) {
  let content = note.parsed.content;
  content = content.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (whole, reference, label) => {
    const url = assetPath(note, reference);
    return url ? `![${label || path.basename(reference)}](${url})` : whole;
  });
  content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (whole, label, reference) => {
    const url = assetPath(note, reference);
    return url ? `![${label}](${url})` : whole;
  });
  const link = (target, label) => {
    const resolved = findNote(note, target);
    if (!resolved) return null;
    const suffix = resolved.heading ? `#${slugify(resolved.heading)}` : "";
    return `[${label || resolved.note.title}](${publicUrl(resolved.note)}${suffix})`;
  };
  content = content.replace(/!?(?<!\!)\[([^\]]+)\]\(([^)]+\.md(?:#[^)]+)?)\)/gi, (whole, label, target) => link(target, label) || whole);
  content = content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (whole, target, label) => link(target, label) || whole);
  return content;
}

if (options.dryRun || process.exitCode) process.exit();
fs.mkdirSync(destination, { recursive: true });
const syncTime = new Date().toISOString();
for (const note of selected) {
  const target = path.join(destination, note.sourceRelativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const content = rewriteContent(note).trimStart();
  const existing = fs.existsSync(target) ? matter(fs.readFileSync(target, "utf8")) : null;
  const contentChanged = existing && existing.content.trim() !== content.trim();
  const createdAt = existing?.data.created_at || syncTime;
  const updatedAt = contentChanged ? syncTime : (existing?.data.updated_at || createdAt);
  const data = {
    ...note.parsed.data,
    source: "j2",
    title: note.title,
    layout: note.parsed.data.layout || "layouts/note.njk",
    created_at: createdAt,
    updated_at: updatedAt,
  };
  fs.writeFileSync(target, matter.stringify(content, data));
}
for (const file of stale) {
  const target = path.resolve(destination, file);
  if (isInside(destination, target) && fs.existsSync(target)) fs.rmSync(target);
}
fs.writeFileSync(previousManifestPath, JSON.stringify({ source: "j2", files: generatedFiles, notes: manifest }, null, 2) + "\n");
console.log(`synced ${selected.length} notes to ${destination}`);

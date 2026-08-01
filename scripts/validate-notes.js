const fs = require("fs");
const path = require("path");
const { readNote, publicUrl, slugify, walk } = require("./note-utils");

const root = path.resolve(process.argv[2] || path.join(process.cwd(), "src/notes"));
if (!fs.existsSync(root)) {
  console.error(`notes directory not found: ${root}`);
  process.exit(1);
}

const errors = [];
const warnings = [];
const notes = walk(root).map((file) => {
  try {
    const note = readNote(file);
    note.sourceRelativePath = path.relative(root, file);
    return note;
  } catch (error) {
    errors.push(`${path.relative(root, file)}: invalid front matter (${error.message})`);
    return null;
  }
}).filter(Boolean);

const urls = new Map();
const sourcePaths = new Map();
const titles = new Map();
for (const note of notes) {
  if (note.parsed.data.source === "j2" && note.parsed.data.publish !== true) {
    errors.push(`${note.sourceRelativePath}: staged j2 note must have publish: true`);
  }
  const url = publicUrl(note);
  if (urls.has(url)) errors.push(`${note.sourceRelativePath}: duplicate URL ${url} (also ${urls.get(url)})`);
  urls.set(url, note.sourceRelativePath);
  sourcePaths.set(note.sourceRelativePath.split(path.sep).join("/"), note);
  const titleKey = note.title.toLowerCase();
  if (!titles.has(titleKey)) titles.set(titleKey, []);
  titles.get(titleKey).push(note);
  if (!note.parsed.data.title) warnings.push(`${note.sourceRelativePath}: title derived from content/filename`);
  if (/\bwayfair\b|\.obsidian[\\/]|Users\/[^\s/]+\//i.test(note.source)) {
    errors.push(`${note.sourceRelativePath}: contains a forbidden private/local path`);
  }
}

function resolveTarget(note, target) {
  const [rawTarget, heading] = target.split("#", 2);
  if (!rawTarget) return { note, heading };
  if (rawTarget.startsWith("/notes/")) {
    const url = `${rawTarget.replace(/\/+$/, "")}/`;
    return urls.has(url) ? { note: notes.find((candidate) => publicUrl(candidate) === url), heading } : null;
  }
  const absolute = path.resolve(path.dirname(note.file), rawTarget);
  const relative = path.relative(root, absolute).split(path.sep).join("/");
  if (sourcePaths.has(relative)) return { note: sourcePaths.get(relative), heading };
  const withoutExtension = relative.replace(/\.md$/i, "");
  if (sourcePaths.has(`${withoutExtension}.md`)) return { note: sourcePaths.get(`${withoutExtension}.md`), heading };
  const matches = titles.get(rawTarget.replace(/\.md$/i, "").toLowerCase()) || [];
  return matches.length === 1 ? { note: matches[0], heading } : null;
}

function hasHeading(note, heading) {
  if (!heading) return true;
  const wanted = slugify(heading);
  return note.parsed.content.split(/^##?\s+/m).some((section) => slugify(section.split("\n", 1)[0]) === wanted);
}

function validateLinks(note) {
  const content = note.parsed.content;
  const references = [];
  for (const match of content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) references.push({ label: match[1], target: match[2] });
  for (const match of content.matchAll(/!?\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g)) {
    if (!match[0].startsWith("![[")) references.push({ label: match[2] || match[1], target: match[1] });
  }
  for (const { label, target } of references) {
    if (/^(?:[a-z]+:|#|mailto:)/i.test(target) || target.startsWith("//")) continue;
    const cleanTarget = target.split(/[?#]/, 1)[0];
    if (!cleanTarget || /\.(?:png|jpe?g|gif|webp|svg|pdf)$/i.test(cleanTarget)) continue;
    const resolved = resolveTarget(note, target);
    if (!resolved) {
      errors.push(`${note.sourceRelativePath}: unresolved link "${label}" -> ${target}`);
    } else if (!hasHeading(resolved.note, resolved.heading)) {
      errors.push(`${note.sourceRelativePath}: missing heading "${resolved.heading}" in ${resolved.note.sourceRelativePath}`);
    }
  }
}

for (const note of notes.filter((candidate) => candidate.parsed.data.source === "j2")) validateLinks(note);
for (const warning of warnings) console.warn(`warning: ${warning}`);
for (const error of errors) console.error(`error: ${error}`);
console.log(`validated ${notes.length} staged notes (${errors.length} errors, ${warnings.length} warnings)`);
process.exitCode = errors.length ? 1 : 0;

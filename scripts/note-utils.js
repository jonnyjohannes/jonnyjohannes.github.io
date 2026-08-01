const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function readNote(file) {
  const source = fs.readFileSync(file, "utf8");
  const parsed = matter(source);
  const firstHeading = parsed.content.match(/^#\s+(.+)$/m);
  const title = parsed.data.title || (firstHeading && firstHeading[1].trim()) || path.basename(file, path.extname(file));
  const tags = Array.isArray(parsed.data.tags)
    ? parsed.data.tags
    : typeof parsed.data.tags === "string"
      ? parsed.data.tags.split(/[\s,]+/).filter(Boolean)
      : [];
  const relativePath = parsed.data.permalink || null;
  return { file, source, parsed, title, tags, relativePath };
}

function publicUrl(note) {
  if (note.parsed.data.permalink) {
    const permalink = String(note.parsed.data.permalink);
    return `/${permalink.replace(/^\/+|\/+$/g, "")}/`;
  }
  const relative = note.sourceRelativePath.replace(/\.md$/i, "");
  return `/notes/${relative.split(path.sep).map(slugify).join("/")}/`;
}

function isInside(root, candidate) {
  const relative = path.relative(root, candidate);
  return relative === "" || (relative && !relative.startsWith("..") && !path.isAbsolute(relative));
}

function walk(root) {
  const ignored = new Set([".obsidian", ".git", "scratch", "_context"]);
  const files = [];
  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || ignored.has(entry.name)) continue;
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(file);
      else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) files.push(file);
    }
  }
  visit(root);
  return files;
}

module.exports = { isInside, readNote, publicUrl, slugify, walk };

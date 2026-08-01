const fs = require("fs");
const os = require("os");
const path = require("path");

const vault = path.resolve(process.argv[2] || process.env.OBSIDIAN_VAULT || path.join(os.homedir(), "exp/notes"));
const destination = path.resolve("src/notes");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : file.endsWith(".md") ? [file] : [];
  });
}

function hasPublishTag(source) {
  const frontMatter = source.match(/^---\n([\s\S]*?)\n---/);
  return frontMatter && /(?:tags:\s*\[?[^\n]*\bpublish\b|tags:[\s\S]*?-\s*publish)/m.test(frontMatter[1]);
}

if (!fs.existsSync(vault)) {
  console.error(`Obsidian vault not found: ${vault}`);
  process.exit(1);
}

fs.mkdirSync(destination, { recursive: true });
for (const file of walk(vault)) {
  const source = fs.readFileSync(file, "utf8");
  if (hasPublishTag(source)) fs.copyFileSync(file, path.join(destination, path.basename(file)));
}
console.log(`Pulled published notes from ${vault}`);

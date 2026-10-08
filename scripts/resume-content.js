const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const sourcePath = path.join(__dirname, "../src/cv/resume-proposal.md");
const notesBoundary = "\n---\n\n## Notes for Jonny";

function getResumeMarkdown() {
  const source = matter(fs.readFileSync(sourcePath, "utf8"));
  const notesStart = source.content.indexOf(notesBoundary);
  if (notesStart === -1) {
    throw new Error(`Could not find editorial-notes boundary in ${sourcePath}`);
  }

  const resume = source.content.slice(0, notesStart).trim();
  if (/\[(?:confirm|redacted)/i.test(resume)) {
    throw new Error("Resume output contains an unresolved or redacted placeholder");
  }
  return resume;
}

module.exports = { getResumeMarkdown };

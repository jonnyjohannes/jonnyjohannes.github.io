const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const sourcePath = path.join(__dirname, "../src/cv/resume-proposal.md");

function getResumeMarkdown() {
  const source = matter(fs.readFileSync(sourcePath, "utf8"));
  const resume = source.content.trim();
  if (/\[(?:confirm|redacted)/i.test(resume)) {
    throw new Error("Resume output contains an unresolved or redacted placeholder");
  }
  return resume;
}

module.exports = { getResumeMarkdown };

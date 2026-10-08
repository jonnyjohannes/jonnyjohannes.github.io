const fs = require("fs");
const path = require("path");
const MarkdownIt = require("markdown-it");
const { chromium } = require("playwright");
const { getResumeMarkdown } = require("./resume-content");

const cssPath = path.join(__dirname, "../src/assets/css/resume.css");
const outputDir = path.join(__dirname, "../_site/cv");
const pdfName = "jonnyjohannes-resume.pdf";

async function main() {
  const resumeMarkdown = getResumeMarkdown();
  const markdown = new MarkdownIt({ html: false, linkify: true, typographer: true });
  const css = fs.readFileSync(cssPath, "utf8");
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Jonny Johannes — software engineer resume">
  <title>Jonny Johannes — Resume</title>
  <style>${css}</style>
</head>
<body>
  <main class="resume">${markdown.render(resumeMarkdown)}</main>
</body>
</html>`;

  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.pdf({
      path: path.join(outputDir, pdfName),
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
    });
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

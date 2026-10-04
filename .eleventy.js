const fs = require("fs");
const markdownIt = require("markdown-it");
const footnote = require("markdown-it-footnote");
const wikilinks = require("markdown-it-wikilinks");

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

const spreadOrder = [1, 5, 3, 7, 2, 6, 4, 8];

function addConstellation(tokens) {
  let index = 0;
  const nextClass = () => {
    const slot = spreadOrder[index % spreadOrder.length];
    index += 1;
    return `constellation-${slot}`;
  };

  for (const token of tokens) {
    if (token.type === "heading_open") token.attrJoin("class", nextClass());
    if (token.type !== "inline" || !token.children) continue;

    for (const child of token.children) {
      if (child.type === "strong_open" || child.type === "em_open" || child.type === "code_inline") {
        child.attrJoin("class", nextClass());
      }
    }
  }
}

module.exports = function (eleventyConfig) {
  const markdown = markdownIt({ html: true, linkify: true, typographer: true, breaks: true })
    .use(footnote)
    .use(wikilinks({
      baseURL: "/notes/",
      uriSuffix: "",
      makeAllLinksAbsolute: true,
      generatePagePathFromLabel: slugify,
    }));
  markdown.core.ruler.push("markdown_constellation", (state) => addConstellation(state.tokens));

  eleventyConfig.setLibrary("md", markdown);
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addTransform("wikilink-slashes", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      return content.replace(/(href=\"\/notes\/[a-z0-9-]+)(\")/g, "$1/$2");
    }
    return content;
  });
  eleventyConfig.addTransform("note-constellation-offset", (content, outputPath) => {
    if (!outputPath || !outputPath.includes("/notes/") || !outputPath.endsWith(".html")) return content;
    const stablePath = outputPath.slice(outputPath.lastIndexOf("/notes/") + 7);
    let hash = 5381;
    for (const character of stablePath) hash = (hash * 33 + character.charCodeAt(0)) % 2147483647;
    const offset = hash % spreadOrder.length;
    return content.replace(/constellation-(\d)/g, (_match, value) => {
      const slot = Number(value);
      const index = spreadOrder.indexOf(slot);
      return `constellation-${spreadOrder[(index + offset) % spreadOrder.length]}`;
    });
  });

  eleventyConfig.addFilter("formatTimestamp", (value) => {
    if (!value) return "";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? String(value) : date.toISOString().slice(0, 10);
  });

  eleventyConfig.addCollection("notes", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/notes/**/*.md")
  );
  eleventyConfig.addCollection("archive", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/archive/**/*.md")
  );

  eleventyConfig.addFilter("backlinks", (title, notes) => {
    const label = String(title || "");
    const target = (notes || []).find((candidate) => candidate.data.title === label);
    const targetUrl = target ? target.url : `/notes/${slugify(label)}/`;
    return (notes || []).filter((candidate) => {
      if (candidate.data.title === label) return false;
      const source = candidate.inputPath && fs.existsSync(candidate.inputPath)
        ? fs.readFileSync(candidate.inputPath, "utf8")
        : candidate.templateContent || "";
      const linksToTarget = source.includes(targetUrl)
        || source.includes(`[[${label}]]`)
        || source.includes(`[[${label}|`)
        || source.includes(`[[${label}#`)
        || source.includes(`](${label}.md)`);
      return linksToTarget;
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
    passthroughFileCopy: true,
  };
};

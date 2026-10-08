# CV update: content-first refresh and minimal PDF design

## Current State

- Status: rendering pipeline in progress; proposal draft is the current public render source
- Verification: source transcription was checked against the existing PDF text; CI HTML/PDF generation is implemented but not yet run locally or visually reviewed
- Owner: Jonny
- Executor: Jonny
- Last updated: 2026-10-04
- Current focus: review the public-facing HTML and `jonnyjohannes-resume.pdf`; confirm remaining facts before replacing the proposal with approved copy
- Next action: run `npm run build` locally, inspect `_site/cv/` output, then resolve remaining content questions
- Branch / PR / session: `cv-update` worktree at `/Users/jj678a/src/j2/jonnyjohannes.github.io-cv-update`

## Abstract

Refresh the resume from the existing two-page PDF while preserving its terse, bullet-forward character. Establish an accurate Markdown transcription, review and update the content with Jonny, and render the current proposal as a responsive HTML page plus matching PDF so the design can be reviewed before content approval.

## Flow

```text
existing PDF ──faithful transcription──▶ src/cv/resume.md
resume.md ──editorial review──▶ src/cv/resume-proposal.md
proposal ──Eleventy/Markdown + shared CSS──▶ /cv/ HTML + PDF
Jonny's review ──confirmed facts──▶ approved resume source replaces proposal
```

The original Markdown transcription remains the content baseline. The current proposal is deliberately rendered for local review and published as a work in progress; editorial notes are excluded from the HTML/PDF. Jonny owns content decisions. The renderer must not silently rewrite or invent resume claims.

## Plan Ledger

Status: `[ ]` not started, `[~]` in progress, `[x]` verified, `[!]` blocked.

- [x] P1 — Transcribe the current PDF into Markdown without editorial changes
  - Deliverable: `src/cv/resume.md`
  - Verify: compare all text, sections, chronology, and dates with `src/assets/images/jonnyjohannes.pdf`
  - Evidence: extracted the two-page PDF text with PDFKit and checked the Markdown transcription against it; formatting is represented with Markdown headings and bullets.
- [~] P2 — Critically review the baseline and update resume content with Jonny
  - Deliverable: Jonny-approved content in `src/cv/resume.md`, preserving alignment with his LinkedIn profile and avoiding unsupported claims
  - Verify: review the final text with Jonny; confirm role titles, employers, dates, claims, and any selected profile details against source material
  - Evidence: a shorter, unverified working draft and review notes are in `src/cv/resume-proposal.md`; approval is pending.
- [~] P3 — Build shared HTML and PDF rendering for the proposal
  - Deliverable: `/cv/` page using the site's Eleventy layout and `jonnyjohannes-resume.pdf` rendered from the same Markdown source
  - Verify: inspect browser and PDF output for readability, page breaks, links, and content fidelity
  - Evidence: `scripts/build-resume.js`, `src/assets/css/resume.css`, and the Pages workflow are implemented; local render and visual review are pending.
- [~] P4 — Make the renderer repeatable in CI
  - Deliverable: CI installs Chromium, builds the HTML/PDF, and publishes both through GitHub Pages
  - Verify: run `npm run build` from a clean checkout and confirm `_site/cv/jonnyjohannes-resume.pdf` exists
  - Evidence: `npm run build` now invokes the renderer after Eleventy; local and CI execution are pending.

## Desired Outcome

A current, accurate resume whose source content is easy to edit in Markdown and whose PDF feels minimal, polished, and personal without straying far from a conventional resume. Keep the existing terse, bullet-forward voice. The content update happens before visual design; the final PDF remains easy to print and read.

## Current Reality

- The source is the two-page `src/assets/images/jonnyjohannes.pdf`; the source PDF was generated with LaTeX.
- `src/cv/resume.md` is a faithful content transcription with Markdown structure, not a designed resume or a claim of current accuracy.
- `src/cv/resume-proposal.md` is a shorter working draft with a focused checklist of unresolved facts and editorial choices. It is not approved content. A custom build step renders only its resume content (not editorial notes) to `/cv/` and `jonnyjohannes-resume.pdf` for public review.
- The original PDF's Wayfair chronology needs Jonny's confirmation; the proposal currently includes only the start month and year.
- The PDF includes detailed older software and research roles, education, a publication and thesis entries, and awards. Their relevance and level of detail need review rather than automatic deletion.
- Jonny's public LinkedIn About supports the existing physicist / software-engineer framing. The public page fetch did not expose the role details reliably enough to validate all titles, dates, or descriptions. Keep the resume aligned with LinkedIn where details can be confirmed; ask Jonny rather than infer.
- Jonny prefers Markdown as an editable source and values a minimal, pleasing aesthetic. Some creativity is welcome, but the result should remain recognizably resume-like and fit a PDF.
- Eleventy renders the proposal content within the site's shared layout and stylesheet. Playwright/Chromium generates the PDF from the same Markdown content with print-specific styling. The Pages workflow publishes `/cv/` and `/cv/jonnyjohannes-resume.pdf`.

## Scope

### Goals

- Preserve a faithful Markdown baseline of the current PDF.
- Review and refresh resume content before design work.
- Keep the resume concise and bullet-forward, while prioritizing current and relevant work.
- Produce a minimal, polished, printable PDF from a maintainable source.
- Keep factual claims and profile details accurate and consistent with LinkedIn where verifiable.

### Non-goals

- Do not fabricate outcomes, scale, metrics, responsibilities, titles, dates, or skills.
- Do not redesign the personal website or change unrelated site content.
- The draft renderer may be used for review before content approval; do not treat its current content as final or silently promote it to the approved transcription.
- Do not force a one-page limit; use the page count that best preserves clarity and relevance.
- Do not treat the PDF transcription as current merely because its wording is faithfully copied.

## Decisions

- **Content approval remains separate from rendering** — the proposal can be rendered for review, but remains a draft until Jonny approves its facts and copy.
- **Markdown is the content source; HTML/CSS is the shared renderer** — Playwright/Chromium produces the published PDF from the same HTML/CSS as the browser page.
- **Minimal, conventional resume structure with restrained personality** — prioritize typography, hierarchy, spacing, and legibility over decorative graphics or layout tricks.
- **Keep claims grounded and LinkedIn-consistent** — LinkedIn is a reference for alignment, but its public profile extraction did not provide enough detail to resolve every role.
- **No arbitrary one-page constraint** — a clear multi-page result is preferable to cramped typesetting if the content warrants it.
- The public proposal omits direct email and unconfirmed paid-search scale; editorial notes are not included in generated output.

## Detailed Plan

### 1. Faithful Markdown baseline

`src/cv/resume.md` represents the current PDF's wording and information, organized with Markdown headings and bullets. Preserve dates, names, titles, locations, degree descriptions, technologies, publication text, and awards as shown. Do not use the transcription step to modernize language or silently remove material. Any layout-driven transcription ambiguity is an open question for Jonny.

### 2. Critical content review with Jonny

Review `src/cv/resume-proposal.md` against the transcription with Jonny. Start with the Wayfair role and any subsequent roles: identify accurate, specific work to add and confirm titles and date ranges. Decide whether the proposed compression of early engineering and research roles fits the target audience. Reconcile facts and contact links with LinkedIn where visible and ask Jonny to supply missing details. Preserve terse bullets and do not invent results or metrics. Record the approved copy in `src/cv/resume.md`; remove editorial notes and unresolved placeholders before handing off design.

### 3. Shared HTML and PDF rendering

The initial renderer is implemented before approval to enable local review. Keep it minimal and legible: typographic hierarchy, balanced whitespace, readable dates, and careful page breaks. Avoid flourishes that hurt scanning, printing, accessibility, or text extraction. Keep content substantively unchanged unless Jonny reopens content review.

The Markdown source is rendered into `/cv/` through the shared Eleventy layout and site stylesheet. Playwright/Chromium renders the same Markdown as a print-oriented PDF. The public outputs are `/cv/` and `/cv/jonnyjohannes-resume.pdf`; editorial notes are excluded.

### 4. Review and verify

Review the PDF at normal screen size and print scale. Check page count and balance, clipping, orphaned headings, link behavior, text selection/extraction, and consistency with the approved Markdown. Confirm the documented build works from a clean checkout. Iterate with Jonny if the visual direction or content needs to change.

## Verification

### Automated

- Compare extracted text from the original PDF with `src/cv/resume.md` for the transcription stage.
- Run `npm run build` (after installing Chromium locally with `npx playwright install chromium`) and extract text from the generated PDF to check for missing or altered content.

### Manual / operational

- Jonny reviews and approves revised content before the aesthetic pass.
- Inspect every rendered page at screen and print scale, including page breaks, spacing, legibility, and selectable text.
- Confirm the final source and output remain consistent with LinkedIn facts that can be verified.

### Not verified / external pending

- Jonny reports that image-performance analysis helped pause automated LLM focus-tagging and prioritize measurement; clickbait claims still need testing. Paid-search scale and live automation status remain unconfirmed and are excluded from the public proposal render.
- LinkedIn's public extraction did not expose complete employment details.
- CI's Chromium-based renderer is implemented and has passed a local build; visual review is still pending.

## Open Questions

- What has changed in Jonny's Wayfair scope, title, and work since the existing PDF, and which accomplishments can be stated concretely?
- Which older roles, research details, awards, or academic material should remain prominent versus be compressed?
- Should the approved Markdown content remain in the proposal file or move to `src/cv/resume.md`?
- Should the final resume stay at two pages, or does the approved content naturally support a different length?
- Which contact details should appear in the approved public PDF? Direct email and phone remain omitted from the proposal render.

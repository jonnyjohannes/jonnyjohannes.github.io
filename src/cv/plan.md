# CV update: content-first refresh and minimal PDF design

## Current State

- Status: rendering pipeline in progress; proposal draft is the current public render source
- Verification: transcription was checked against the existing PDF; latest local HTML/PDF build passed and generated a one-page PDF after research was removed; visual review and CI execution remain pending
- Owner: Jonny
- Executor: Jonny
- Last updated: 2026-10-04
- Current focus: review the public-facing HTML and `jonnyjohannes-resume.pdf`; confirm remaining facts before replacing the proposal with approved copy
- Next action: review the content ledger below; resolve the remaining role, awards, and contact questions, then inspect the current render
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

The original Markdown transcription remains the content baseline. The current proposal contains only resume copy and is deliberately rendered for local review and published as a work in progress. Jonny owns content decisions. The renderer must not silently rewrite or invent resume claims.

## Plan Ledger

Status: `[ ]` not started, `[~]` in progress, `[x]` verified, `[!]` blocked.

- [x] P1 — Transcribe the current PDF into Markdown without editorial changes
  - Deliverable: `src/cv/resume.md`
  - Verify: compare all text, sections, chronology, and dates with `src/assets/images/jonnyjohannes.pdf`
  - Evidence: the original transcription was checked against the two-page PDF. Jonny later requested a bibliography correction in `resume.md`; the journal record now matches the publisher’s metadata, and the two theses are labeled as archived rather than unpublished.
- [~] P2 — Critically review the baseline and update resume content with Jonny
  - Deliverable: Jonny-approved current resume source, while preserving `src/cv/resume.md` as the faithful original transcription
  - Verify: review the final text with Jonny; confirm role titles, employers, dates, claims, and any selected profile details against source material
  - Evidence: the working draft is in `src/cv/resume-proposal.md`; confirmed decisions and open questions are recorded in this plan; approval is pending.
- [~] P3 — Build shared HTML and PDF rendering for the proposal
  - Deliverable: `/cv/` page using the site's Eleventy layout and `jonnyjohannes-resume.pdf` rendered from the same Markdown source
  - Verify: inspect browser and PDF output for readability, page breaks, links, and content fidelity
  - Evidence: `scripts/build-resume.js`, `src/assets/css/resume.css`, and the Pages workflow are implemented; local build passed and generated a one-page PDF after research was removed; visual review is pending.
- [~] P4 — Make the renderer repeatable in CI
  - Deliverable: CI installs Chromium, builds the HTML/PDF, and publishes both through GitHub Pages
  - Verify: run `npm run build` from a clean checkout and confirm `_site/cv/jonnyjohannes-resume.pdf` exists
  - Evidence: `npm run build` now invokes the renderer after Eleventy and passed locally; CI execution is pending.

## Desired Outcome

A current, accurate resume whose source content is easy to edit in Markdown and whose PDF feels minimal, polished, and personal without straying far from a conventional resume. Keep the existing terse, bullet-forward voice. The content update happens before visual design; the final PDF remains easy to print and read.

## Current Reality

- The source is the two-page `src/assets/images/jonnyjohannes.pdf`; the source PDF was generated with LaTeX.
- `src/cv/resume.md` preserves the original resume transcription, with a later corrected citation section: one peer-reviewed journal article and two institutionally archived theses.
- `src/cv/resume-proposal.md` is a working resume-only draft; it is not approved content. Confirmed decisions and remaining questions are recorded in the Content Review section below. The build publishes it to `/cv/` and `jonnyjohannes-resume.pdf` for public review.
- Jonny confirmed he is still a Software Engineer at Wayfair in Boston; the proposal now says `January 2019 – Present`. Whether there are other roles to include remains open.
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
- **Markdown is the shared content source** — Eleventy renders it in the site layout; Playwright/Chromium prints the same content with print-specific HTML/CSS.
- **Minimal, conventional resume structure with restrained personality** — prioritize typography, hierarchy, spacing, and legibility over decorative graphics or layout tricks.
- **Keep claims grounded and LinkedIn-consistent** — LinkedIn is a reference for alignment, but its public profile extraction did not provide enough detail to resolve every role.
- **No arbitrary one-page constraint** — a clear multi-page result is preferable to cramped typesetting if the content warrants it.
- The public proposal omits direct email and unconfirmed paid-search scale; the Markdown proposal contains only resume copy.

## Content Review

Confirmed resume decisions and facts live here so the proposal file contains only resume copy.

### Confirmed

- [x] **Wayfair chronology:** Software Engineer in Boston, January 2019–Present; no title or location changes.
- [x] **Product segmentation:** Led a four-person team building product-level segment labels used as campaign inputs across multiple advertising platforms. Keep provider names out; no measured outcome is claimed.
- [x] **Conversion feedback:** Designed and implemented the integration and mentored a junior engineer. The resume describes the system and Jonny’s role, not a measured optimization outcome.
- [x] **Image-performance analysis:** Jonny’s analysis helped the team pause LLM-based “in-focus” tagging and prioritize measurement. Treat “clickbait” ideas as hypotheses, not established findings.
- [x] **Budget and bidding automation:** Software automatically executes scheduled budget and target-ROAS changes in production. Do not include unconfirmed spend or campaign counts.
- [x] **Targeting:** Broad software-engineering resume, leaning senior; omit a skills line for now.
- [x] **Community leadership:** Code for Boston volunteer project lead, January 2026–Present. Leads CutePetsBoston, which raises awareness of Greater Boston adoptable pets through automated social outreach; scope includes pet sourcing, multi-platform publishing, redirects, and engagement analytics. No reach or adoption metrics claimed.
- [x] **Older engineering roles:** Keep AppColony brief and StaffingExperts/Foodtree to one-line entries.
- [x] **Research:** Omit research experience and papers/theses from the current broad, senior-leaning software resume. Preserve the research record in `src/cv/resume.md` for research- or physics-oriented roles. Its bibliography distinguishes the peer-reviewed article from the two archived theses; the article citation follows the publisher record.
- [x] **Chic Geek:** Omit. Public LinkedIn lists mentorship roles in 2017 and 2018; Jonny confirms these were not project-lead roles and prefers to leave them out.
- [x] **Privacy:** Omit direct email, phone, street address, and unconfirmed paid-search scale from the public draft.

### Still open

- [ ] Confirm whether there are additional current or post-Wayfair roles to include.
- [ ] Confirm exact website and GitHub/LinkedIn URLs.
- [ ] Decide whether any items from the original Honors & Awards list are worth restoring.
- [ ] Visually review the latest one-page render and confirm its length and page balance.

## Detailed Plan

### 1. Faithful Markdown baseline

`src/cv/resume.md` represents the current PDF's wording and information, organized with Markdown headings and bullets. Preserve dates, names, titles, locations, degree descriptions, technologies, publication text, and awards as shown. Do not use the transcription step to modernize language or silently remove material. Any layout-driven transcription ambiguity is an open question for Jonny.

### 2. Critical content review with Jonny

Review `src/cv/resume-proposal.md` against the transcription with Jonny and use the Content Review ledger below as the decision record. Keep terse bullets and do not invent results or metrics. The full original research record remains in `src/cv/resume.md` for targeted variants. Keep `src/cv/resume.md` as the faithful original; choose a separate approved-source path before treating the current resume as final.

### 3. Shared HTML and PDF rendering

The initial renderer is implemented before approval to enable local review. Keep it minimal and legible: typographic hierarchy, balanced whitespace, readable dates, and careful page breaks. Avoid flourishes that hurt scanning, printing, accessibility, or text extraction. Keep content substantively unchanged unless Jonny reopens content review.

The Markdown source is rendered into `/cv/` through the shared Eleventy layout and site stylesheet. Playwright/Chromium renders the same Markdown as a print-oriented PDF. The public outputs are `/cv/` and `/cv/jonnyjohannes-resume.pdf`.

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

- Jonny reports that image-performance analysis helped pause automated LLM focus-tagging and prioritize measurement; clickbait claims still need testing. The budget/target-ROAS system executes scheduled changes in production; paid-search scale remains excluded from the public proposal render.
- LinkedIn's public extraction did not expose complete employment details. Code for Boston project details were checked against the local CutePetsBoston repository; Jonny confirms project leadership. Resolved content facts and decisions are in the Content Review ledger below.
- CI's Chromium-based renderer is implemented and has passed a local build; visual review is still pending.

## Open Questions

- Are there any additional current or post-Wayfair roles to include?
- Should the original Honors & Awards list remain omitted, or are any awards worth restoring for the senior software-engineering target?
- Confirm the website and profile URLs; direct email, phone, and street address remain omitted from the public draft.
- The latest build is one page; inspect page balance and decide whether that length still works after the content review.

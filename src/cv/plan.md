# CV update: content-first refresh and minimal PDF design

## Current State

- Status: approved resume copy is the canonical source; the former LaTeX PDF and faithful transcription are retained in `archive/resume/`
- Verification: local HTML/PDF build passes; generated PDF uses US Letter; final visual review and CI execution remain pending
- Owner: Jonny
- Executor: Jonny
- Last updated: 2026-10-04
- Current focus: review the approved public-facing HTML and `jonnyjohannes-resume.pdf`
- Next action: inspect the final render for page balance and legibility, then confirm the CI publication
- Branch / PR / session: `cv-update` worktree at `/Users/jj678a/src/j2/jonnyjohannes.github.io-cv-update`

## Abstract

Refresh the resume from the existing two-page PDF while preserving its terse, bullet-forward character. Keep the source PDF and faithful transcription archived, publish the Jonny-approved Markdown resume as `/cv/` and as a matching, printable PDF, and retain a repeatable local and CI build.

## Flow

```text
archive/resume/jonnyjohannes-latex.pdf ──transcription──▶ archive/resume/original-transcription.md
approved src/cv/resume.md ──Eleventy/Markdown + shared CSS──▶ /cv/ HTML + Letter PDF
```

The former LaTeX PDF and its faithful Markdown transcription are retained as historical sources outside the published content tree. `src/cv/resume.md` is the approved, canonical copy. Jonny owns content decisions; the renderer must not silently rewrite or invent claims.

## Plan Ledger

Status: `[ ]` not started, `[~]` in progress, `[x]` verified, `[!]` blocked.

- [x] P1 — Transcribe and archive the former LaTeX resume
  - Deliverable: `archive/resume/original-transcription.md`
  - Verify: compare sections, chronology, and dates with `archive/resume/jonnyjohannes-latex.pdf`
  - Evidence: the transcription was checked against the original two-page PDF; its corrected bibliography distinguishes one peer-reviewed article from two archived theses.
- [x] P2 — Review and approve current resume content
  - Deliverable: approved canonical source at `src/cv/resume.md`
  - Verify: Jonny reviews the final text and confirms roles, dates, claims, and public profile links
  - Evidence: Jonny approved this cut; legacy resume materials remain archived.
- [~] P3 — Build and visually review shared HTML and PDF rendering
  - Deliverable: `/cv/` page and `jonnyjohannes-resume.pdf` rendered from the same Markdown source
  - Verify: inspect readability, page breaks, links, and content fidelity
  - Evidence: Letter-size PDF and site page build locally; final visual review remains pending.
- [~] P4 — Make the renderer repeatable in CI
  - Deliverable: CI installs Chromium, builds the HTML/PDF, and publishes both through GitHub Pages
  - Verify: confirm the Pages build publishes `_site/cv/jonnyjohannes-resume.pdf`
  - Evidence: local `npm run build` passes; CI publication remains pending.

## Desired Outcome

A current, accurate resume whose source content is easy to edit in Markdown and whose PDF feels minimal, polished, and personal without straying far from a conventional resume. Keep the existing terse, bullet-forward voice. The content update happens before visual design; the final PDF remains easy to print and read.

## Current Reality

- The former source is archived at `archive/resume/jonnyjohannes-latex.pdf`; it was generated with LaTeX.
- `src/cv/resume.md` is the approved public resume source; the build publishes it to `/cv/` and `jonnyjohannes-resume.pdf`.
- `archive/resume/` retains the original LaTeX PDF and faithful Markdown transcription; neither is part of the published site content.
- Jonny confirmed he is still a Software Engineer at Wayfair in Boston; the resume says `January 2019 – Present`.
- The archived PDF includes older software and research roles, education, a publication and thesis entries, and awards. Research and awards are intentionally omitted from this senior software-engineering resume.
- Jonny's public LinkedIn About supports the existing physicist / software-engineer framing. The public page fetch did not expose the role details reliably enough to validate all titles, dates, or descriptions. Keep the resume aligned with LinkedIn where details can be confirmed; ask Jonny rather than infer.
- Jonny prefers Markdown as an editable source and values a minimal, pleasing aesthetic. Some creativity is welcome, but the result should remain recognizably resume-like and fit a PDF.
- Eleventy renders the approved `src/cv/resume.md` content within the site's shared layout and stylesheet. Playwright/Chromium generates the PDF from the same Markdown content with print-specific styling. The Pages workflow publishes `/cv/` and `/cv/jonnyjohannes-resume.pdf`.

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
- Do not silently alter approved resume claims; reopen content decisions with Jonny before changing the canonical copy.
- Do not force a one-page limit; use the page count that best preserves clarity and relevance.
- Do not treat the PDF transcription as current merely because its wording is faithfully copied.

## Decisions

- **Approved copy is canonical** — Jonny approved `src/cv/resume.md`; HTML and PDF are rendered from this source.
- **Markdown is the shared content source** — Eleventy renders it in the site layout; Playwright/Chromium prints the same content with print-specific HTML/CSS.
- **Minimal, conventional resume structure with restrained personality** — prioritize typography, hierarchy, spacing, and legibility over decorative graphics or layout tricks.
- **Keep claims grounded and LinkedIn-consistent** — LinkedIn is a reference for alignment, but its public profile extraction did not provide enough detail to resolve every role.
- **No arbitrary one-page constraint** — a clear multi-page result is preferable to cramped typesetting if the content warrants it.
- The public resume omits direct email, phone, and street address. It includes the US$1M+ daily budget allocation scale supplied by Jonny.

## Content Review

Resume decisions and confirmed facts are recorded here; `src/cv/resume.md` contains only approved resume copy.

### Confirmed

- [x] **Wayfair chronology:** Software Engineer in Boston, January 2019–Present; no title or location changes.
- [x] **Product segmentation:** Led a four-person team building product-level segment labels used as campaign inputs across multiple advertising platforms. Keep provider names out; no measured outcome is claimed.
- [x] **Conversion feedback:** Designed and implemented the integration and mentored a junior engineer. The resume describes the system and Jonny’s role, not a measured optimization outcome.
- [x] **Image-performance analysis:** Jonny’s analysis helped the team pause LLM-based “in-focus” tagging and prioritize measurement. Treat “clickbait” ideas as hypotheses, not established findings.
- [x] **Budget and bidding automation:** Software automatically executes scheduled budget and target-ROAS changes in production for a US portfolio with more than US$1 million in daily budget allocation; scale is included per Jonny's confirmation.
- [x] **Targeting:** Broad software-engineering resume, leaning senior; omit a skills line for now.
- [x] **Community leadership:** Code for Boston volunteer project lead, January 2026–Present. Leads CutePetsBoston, which raises awareness of Greater Boston adoptable pets through automated social outreach; scope includes pet sourcing, multi-platform publishing, redirects, and engagement analytics. No reach or adoption metrics claimed.
- [x] **Older engineering roles:** Keep AppColony brief and StaffingExperts/Foodtree to one-line entries.
- [x] **Research:** Omit research experience and papers/theses from the current broad, senior-leaning software resume. Preserve the research record in `archive/resume/original-transcription.md` for research- or physics-oriented variants. Its bibliography distinguishes the peer-reviewed article from the two archived theses; the article citation follows the publisher record.
- [x] **Chic Geek:** Omit. Public LinkedIn lists mentorship roles in 2017 and 2018; Jonny confirms these were not project-lead roles and prefers to leave them out.
- [x] **Privacy:** Omit direct email, phone, and street address from the public resume.

### Remaining checks

- [ ] Visually review the latest Letter-size render for page balance, readability, and content fidelity.
- [ ] Confirm the CI workflow publishes the approved HTML and PDF.

## Detailed Plan

### 1. Faithful Markdown baseline

`archive/resume/original-transcription.md` preserves the former PDF's wording and information. It is retained as a historical reference, not as a current resume or public page.

### 2. Critical content review with Jonny

The approved copy in `src/cv/resume.md` reflects Jonny's decisions in the Content Review ledger below. Keep claims grounded and do not invent results or metrics. The full original research record remains in `archive/resume/original-transcription.md` for targeted variants.

### 3. Shared HTML and PDF rendering

The renderer publishes the approved source as accessible, legible HTML and a printable PDF. Preserve typographic hierarchy, balanced whitespace, readable dates, and careful page breaks. Avoid flourishes that hurt scanning, printing, accessibility, or text extraction. Keep content substantively unchanged unless Jonny reopens content review.

The Markdown source is rendered into `/cv/` through the shared Eleventy layout and site stylesheet. Playwright/Chromium renders the same Markdown as a print-oriented PDF. The public outputs are `/cv/` and `/cv/jonnyjohannes-resume.pdf`.

### 4. Review and verify

Review the PDF at normal screen size and print scale. Check page count and balance, clipping, orphaned headings, link behavior, text selection/extraction, and consistency with the approved Markdown. Confirm the documented build works from a clean checkout. Iterate with Jonny if the visual direction or content needs to change.

## Verification

### Automated

- The original PDF-to-Markdown transcription was checked during P1; preserve both archived source files.
- Run `npm run build` (after installing Chromium locally with `npx playwright install chromium`) and extract text from the generated PDF to check for missing or altered content.

### Manual / operational

- Jonny approved the current content and visual direction.
- Inspect every rendered page at screen and print scale, including page breaks, spacing, legibility, and selectable text.
- Confirm the final source and output remain consistent with LinkedIn facts that can be verified.

### Not verified / external pending

- Jonny confirms the US$1M+ daily budget allocation scale included in the resume; it has not been independently verified.
- LinkedIn's public extraction did not expose complete employment details. Code for Boston project details were checked against the local CutePetsBoston repository; Jonny confirms project leadership. Content decisions are recorded in the Content Review ledger above.
- CI's Chromium-based renderer is implemented and has passed locally; CI publication and final visual review remain pending.

## Remaining checks

- Inspect the final Letter-size PDF for page balance, readability, and content fidelity.
- Confirm CI publishes `/cv/` and `/cv/jonnyjohannes-resume.pdf`.

# CV update: content-first refresh and minimal PDF design

## Current State

- Status: planning
- Verification: source transcription checked against the existing PDF text; a proposed edit exists but its updated claims and contact links are not yet confirmed; layout not yet designed or rendered
- Owner: Jonny
- Executor: unassigned; a separate agent is intended for the visual pass after content approval
- Last updated: 2026-10-04
- Current focus: refine four recent Wayfair stories in `src/cv/resume-proposal.md`; frame the image work as systematic analysis that shifted product direction, not as building a particular chart, and quantify paid-search portfolio spend rather than automated impact
- Next action: Jonny confirms the spend figure is typical and shareable, precise ownership and automation status, current roles/dates, and target role; then reconcile approved copy into `src/cv/resume.md` before visual implementation
- Branch / PR / session: `cv-update` worktree at `/Users/jj678a/src/j2/jonnyjohannes.github.io-cv-update`

## Abstract

Refresh the resume from the existing two-page PDF while preserving its terse, bullet-forward character. First establish an accurate Markdown transcription, then critically review and update the content with Jonny, and only after content approval hand off a restrained, aesthetically considered PDF-oriented presentation pass to a separate agent.

## Flow

```text
existing PDF ──faithful transcription──▶ src/cv/resume.md
resume.md ──editorial review──▶ src/cv/resume-proposal.md
proposal + Jonny's confirmed facts ──approval──▶ updated resume.md
approved content ──separate-agent visual pass──▶ rendered, reviewed PDF
```

The Markdown transcription is the reviewable content baseline, not a claim that a rendering pipeline has already been chosen. Content decisions belong to Jonny in this planning conversation. The visual agent owns presentation implementation only after content approval; it must not silently rewrite or invent resume claims.

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
- [ ] P3 — Create the visual presentation in a separate agent pass after content approval
  - Deliverable: minimal, aesthetically pleasing, PDF-friendly resume presentation and a rendered PDF; retain concise bullets and the approved content
  - Verify: inspect rendered pages at screen and print scale; confirm links/contact details, legibility, page breaks, and content fidelity
  - Evidence: —
- [ ] P4 — Confirm the chosen Markdown-to-PDF workflow is maintainable in this repository
  - Deliverable: documented, repeatable source-to-PDF workflow using the approach selected during the visual pass
  - Verify: run the documented command from a clean checkout and compare generated output with the approved design
  - Evidence: —

## Desired Outcome

A current, accurate resume whose source content is easy to edit in Markdown and whose PDF feels minimal, polished, and personal without straying far from a conventional resume. Keep the existing terse, bullet-forward voice. The content update happens before visual design; the final PDF remains easy to print and read.

## Current Reality

- The source is the two-page `src/assets/images/jonnyjohannes.pdf`; the source PDF was generated with LaTeX.
- `src/cv/resume.md` is a faithful content transcription with Markdown structure, not a designed resume or a claim of current accuracy.
- `src/cv/resume-proposal.md` is a shorter working draft with four provisional recent-work bullets, explicit placeholders, and editorial notes. It is not approved content; it has `permalink: false` to avoid generating a public page through Eleventy. Repository source may still be public even when Eleventy does not render the page.
- The PDF's Wayfair entry says `January 2019 - Present`; that is stale and needs Jonny's confirmation/update.
- The PDF includes detailed older software and research roles, education, a publication and thesis entries, and awards. Their relevance and level of detail need review rather than automatic deletion.
- Jonny's public LinkedIn About supports the existing physicist / software-engineer framing. The public page fetch did not expose the role details reliably enough to validate all titles, dates, or descriptions. Keep the resume aligned with LinkedIn where details can be confirmed; ask Jonny rather than infer.
- Jonny prefers Markdown if it can serve as a comfortable source, still likes LaTeX, and values a minimal, pleasing aesthetic. Some creativity is welcome, but the result should remain recognizably resume-like and fit a PDF.
- No Markdown-to-PDF implementation has been selected. Candidate approaches include Markdown rendered through HTML/CSS print styles, Markdown through Pandoc and LaTeX, or another suitable typesetting workflow. Choose based on content and layout needs, maintainability, and reliable PDF output.

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
- Do not begin visual implementation before Jonny approves the revised content.
- Do not force a one-page limit; use the page count that best preserves clarity and relevance.
- Do not treat the PDF transcription as current merely because its wording is faithfully copied.

## Decisions

- **Content precedes design** — review and approve resume wording before handing off visual work.
- **Markdown is the preferred content source, not a settled renderer** — keep the source pleasant to edit; select the PDF workflow after requirements are clearer.
- **Minimal, conventional resume structure with restrained personality** — prioritize typography, hierarchy, spacing, and legibility over decorative graphics or layout tricks.
- **Keep claims grounded and LinkedIn-consistent** — LinkedIn is a reference for alignment, but its public profile extraction did not provide enough detail to resolve every role.
- **No arbitrary one-page constraint** — a clear two-page result is preferable to cramped typesetting if the approved content warrants it.

## Detailed Plan

### 1. Faithful Markdown baseline

`src/cv/resume.md` represents the current PDF's wording and information, organized with Markdown headings and bullets. Preserve dates, names, titles, locations, degree descriptions, technologies, publication text, and awards as shown. Do not use the transcription step to modernize language or silently remove material. Any layout-driven transcription ambiguity is an open question for Jonny.

### 2. Critical content review with Jonny

Review `src/cv/resume-proposal.md` against the transcription with Jonny. Start with the Wayfair role and any subsequent roles: identify accurate, specific work to add and confirm titles and date ranges. Decide whether the proposed compression of early engineering and research roles fits the target audience. Reconcile facts and contact links with LinkedIn where visible and ask Jonny to supply missing details. Preserve terse bullets and do not invent results or metrics. Record the approved copy in `src/cv/resume.md`; remove editorial notes and unresolved placeholders before handing off design.

### 3. Separate-agent visual pass

Only after content approval, hand off the approved source and this plan to a separate agent for presentation work. Aim for an aesthetically pleasing, minimal PDF: strong typographic hierarchy, balanced whitespace, restrained accent use, readable dates and contact details, and careful page breaks. Avoid visual flourishes that hurt scanning, printing, accessibility, or text extraction. Keep the content substantively unchanged unless Jonny reopens content review.

The agent should evaluate the rendering options against the approved content and existing site context. The PDF must render repeatably, remain selectable/searchable text, and preserve links where practical. Do not assume the site itself should publish the resume as a web page unless that becomes an explicit choice.

### 4. Review and verify

Review the PDF at normal screen size and print scale. Check page count and balance, clipping, orphaned headings, link behavior, text selection/extraction, and consistency with the approved Markdown. Confirm the documented build works from a clean checkout. Iterate with Jonny if the visual direction or content needs to change.

## Verification

### Automated

- Compare extracted text from the original PDF with `src/cv/resume.md` for the transcription stage.
- Once a renderer is selected, run its documented build command and extract text from the generated PDF to check for missing or altered content.

### Manual / operational

- Jonny reviews and approves revised content before the aesthetic pass.
- Inspect every rendered page at screen and print scale, including page breaks, spacing, legibility, and selectable text.
- Confirm the final source and output remain consistent with LinkedIn facts that can be verified.

### Not verified / external pending

- Jonny reports that KPI box plots helped pause automated LLM focus-tagging and prioritize measurement before further image-tagging work; clickbait claims still need testing against image-performance data. He describes the search portfolio as roughly $1M/day in actual ad spend, not automated savings or changes. Spend typicality and public-shareability, exact individual ownership, live automation status, titles/dates, inferred profile URLs, and condensed claims still require review.
- LinkedIn's public extraction did not expose complete employment details.
- No rendering toolchain or final layout has been chosen or tested.

## Open Questions

- What has changed in Jonny's Wayfair scope, title, and work since the existing PDF, and which accomplishments can be stated concretely?
- Which older roles, research details, awards, or academic material should remain prominent versus be compressed?
- Should the final source remain Markdown-only with an HTML/CSS print renderer, use Pandoc with LaTeX, or use another Markdown-friendly toolchain?
- Should the final resume stay at two pages, or does the approved content naturally support a different length?
- Which contact details should appear on the public PDF? The existing PDF contains a street address and phone number; the earlier discussion suggested removing the street address, but Jonny has not yet confirmed the final contact line.

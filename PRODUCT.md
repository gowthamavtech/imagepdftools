# Product

## Register

product

## Users

People who need image or PDF tools right now: bloggers resizing a screenshot, developers converting a logo, office workers compressing a PDF before emailing it. They arrive with a specific file and a specific job. They are not exploring — they are executing. Frequency varies from one-off to weekly. Context: personal laptop or work machine, daytime, goal-oriented mindset, zero patience for setup or friction.

## Product Purpose

ImagePDF.Tools is a browser-native image and PDF tool suite. Every processing step runs on the user's own CPU via WebAssembly and Canvas API — no file is ever transmitted to a server. The product succeeds when a user finds the right tool, drops their file, and downloads the result in under 30 seconds without having created an account or worried about privacy.

## Brand Personality

Sharp, private, instant.

Voice: declarative, precise, never cheerful. Copy reads like a good commit message — says exactly what it does, nothing extra. No exclamation marks in UI text. No mascots. No "Hey there!" The product earns trust through absence of friction, not through reassurance copy.

## Anti-references

- **TinyPNG / Squoosh**: cartoon mascots, server-upload-as-default mental model, compression-only scope.
- **iLovePDF / Smallpdf**: ad-cluttered layouts, cramped grids of tools, low-trust visual design, dark patterns around free limits.
- **Doclair.in style**: warm-cream editorial tone, magazine-style type hierarchy — too brand-magazine for a utility product.
- **Generic SaaS dashboard**: sidebar navigation, data tables, blue-on-white enterprise visual language, unnecessary chrome.

## Design Principles

1. **The tool is the UI.** The upload zone and the output are the whole product. Everything else — hero copy, trust badges, FAQ — exists to reduce anxiety, not to compete for attention with the task.
2. **Privacy is visible, not promised.** "No upload" is not in a footer tooltip. It is on the page, in the interface, in the copy. The processing model is the feature.
3. **One page, one job.** Tool pages do exactly one thing. No upsell interruptions before the task completes. No modal gates on first use.
4. **Results speak.** Show file size before and after. Show the output. Do not describe what the tool will do — show it doing it.
5. **Instant over instructional.** No onboarding flow, no "getting started" copy. The interface teaches by being obvious. If a tooltip is needed, the UI has failed.

## Accessibility & Inclusion

WCAG AA minimum across all tool pages. Keyboard navigation through the full task flow (upload, adjust, download). Focus indicators visible. Color is never the only signal. Reduced-motion: no looping or ambient animations beyond the processing state indicator.

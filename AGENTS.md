# Beyond Myanmar — AI Development & Editorial Protocol

## 1. Project identity

Beyond Myanmar is an independent digital cultural journal about Myanmar. Its editorial mission is to introduce everyday traditions, food, celebrations, heritage, arts and language through concise, evocative, verifiable stories. Audiences include international readers, Taiwan-based readers and students, and curious cultural travelers.

The public-facing experience is **an immersive cultural magazine**, not a travel booking service, government portal or encyclopedia dump. The tone is warm, literate, precise and respectful. Favor real details over grand claims. Never claim to represent every person, ethnic group or region.

## 2. Mandatory workflow for any AI contributor

1. Read this entire `AGENTS.md`, `README.md`, the `content/` schemas and at least one existing story.
2. Determine whether the change affects copy, media, map, language, structure or behavior.
3. Check factual sources and media rights **before publishing**. No fabricated citations, cultural history, geographical origins, interviews or image permissions.
4. Update source JSON or shared code in `content/`, `src/` and `scripts/`, **not the generated files inside `docs/`**.
5. Run `npm test` to rebuild and validate the public site. Fix all failed checks.
6. Preview homepage, Explore, Map, About and at least the affected story in desktop/mobile widths. Test keyboard access and language switching.
7. Include new `docs/` output when committing. Summarize the actual changes and unresolved issues accurately.

## 3. Canonical file layout

```
AGENTS.md                  AI contributor protocol
README.md                  public project documentation
package.json               build / validation / preview commands
content/site.json          site identity, category registry, map locations
content/media.json         photograph and map attribution registry
content/phrases.json       word entries and verified audio metadata
content/stories/<slug>.json  one cultural story per file
src/styles.css             shared responsive design system
src/app.js                 shared interaction and localization logic
scripts/build.mjs          static site generator
scripts/check.mjs          content / output validator
scripts/new-story.mjs      draft scaffold utility
assets/fallback/           original abstract SVG fallback graphics
assets/images/             optimized photographs used by the live site
assets/audio/              playable local recordings (MP3 by default)
assets/original-media/     original contributor assets (not deployed)
docs/                      generated GitHub Pages site (commit after build)
```

`docs/index.html` is the published homepage. GitHub Pages must use branch `main` and directory `/docs`. Keep `AGENTS.md` at the repository root.

## 4. Design system (apply to every new page)

- Palette: forest `#203e35`, deep forest `#132a23`, Myanmar-inspired red `#a64037`, editorial gold `#c49c5b`, cream `#f4f0e8`, paper `#faf7f0`.
- Fonts: editorial headings use Playfair Display with Noto Serif TC fallback; general UI uses Manrope/DM Sans; Myanmar text uses Noto Sans Myanmar. All have system fallbacks.
- Hero: single prominent real photograph where possible, restrained dark gradient overlay, uppercase micro-label, large editorial heading and short subheading.
- Layout: desktop max content width ~1280 px; generously spaced sections; 3-column story grid desktop, 2 or 1 on small screens. Avoid crowded widgets.
- Motion: slow image entrance / gentle zoom, scroll-triggered reveal, subtle hover response. Support `prefers-reduced-motion`; avoid autoplay video or forced audio.
- Image handling: every media ID appears in `content/media.json` and records known photo credit, actual rights status and captions; external images additionally require original URL and license. Allow local personally owned images through media.localFile and external Commons images otherwise; always keep an illustrated SVG fallback and do not misrepresent illustrations as documentary photographs.
- Maintain visible keyboard focus, appropriate alt text, responsive nav and readable text contrast.

## 5. Content structure and quality

Each `content/stories/<slug>.json` uses:

- `slug`: lowercase ASCII kebab-case, identical to filename and final URL.
- `order`: unique display order number.
- `category`: one of the IDs in `content/site.json`.
- `media`: an approved ID in `content/media.json`.
- `geography`: `nationwide` or an established, relevant location ID.
- `name`, `eyebrow`, `teaser`: complete `zh`, `en` and concise `my` fields.
- `story`, `context`, `note`: complete `zh` and `en` fields.
- `moments`: exactly three items with `zh` and `en` text.
- `sources`: one or more descriptive titles and real HTTPS source URLs.

Writing guidance: opening vignette ~60–100 Traditional Chinese characters where appropriate; context ~120–200 characters. English should read naturally, not be literal line-by-line translation. Use short, meaningful paragraphs. Introduce the Myanmar term and script accurately. Vignettes may be scene-setting but **must not invent personal testimony or claim to describe a documented encounter**. Label editorial vignettes as such in the site About page.

Cultural safeguards:

- Distinguish widely practiced traditions from regional, ethnic, religious or individual practices.
- Never infer that one community's culture represents all of Myanmar.
- Avoid unsupported superlatives and disputed or invented origin stories.
- For recognition and designations (such as UNESCO), check the official listing and year. A nomination is **not** an inscription.
- Never invent oral histories, quotes, historical dates, photos, approval or academic citations.
- If an essential cultural statement lacks a credible reference, do not release it as confirmed fact.

## 6. Language protocol

- Traditional Chinese (`zh`) and English (`en`) are the full story languages.
- Myanmar (`my`) is a deliberately shorter, honest, clearly layered experience: full primary navigation and topic names; concise blurbs, not an invented full translation of missing paragraphs.
- Keep Myanmar script in Unicode and use `<span lang="my">` / `Noto Sans Myanmar` when possible.
- For high-impact or nuanced translations, obtain a fluent speaker review if available; never mark machine-generated text as verified by a person without evidence.
- Language picker must preserve user preference via localStorage; avoid broken links or untranslated empty controls.

## 7. Media, sound and rights

- Image sources: personally owned photos with permission (set `media.localFile` to a file in `assets/images/` and provide author, usage rights, captions; remove obsolete Commons URLs) or Wikimedia Commons assets with inspectable license metadata. Preserve accurate attribution and crop disclosures on About.
- **Do not assume internet images are reusable.** Do not copy photos without validated rights. Media may stay externally hosted; on failure, present an *original clearly illustrative* SVG fallback.
- Audio entries are maintained in `content/phrases.json`: `status` must be `pending-verification`, `licensed-recording`, `personal-recording`, or `verified-tts`.
- A `verified-tts` entry requires confirmed correct Myanmar pronunciation, permitted distribution, an actual stable audio asset file/URL and attribution/license records. Do not create fake voices or state that a recorded human pronunciation is synthesized speech.
- Unverified audio is displayed without an enabled play action. If a remote file is inaccessible, give an accurate playback error. Never silently replace Myanmar with English TTS.
- Personal voice recordings may be stored in `assets/audio/`; specify a safe `audio.localFile`, `author`, and `license`, and use `status: "personal-recording"`. `scripts/build.mjs` copies these into `docs/assets/audio/`. Update About credits accordingly. See `MEDIA_GUIDE.md`.

## 8. Map rules

- Map markers correspond to verified geographic coordinates and links to stories.
- If a tradition is nationwide or widespread, do **not** force a unique origin point. Use documented photo locations or representative city examples and say so explicitly.
- The map base comes from an openly licensed, attributed asset; retain its source attribution and coordinate reference bounds (E 92–102, N 9–29 for the current map).
- Update `content/site.json` location objects (`id`, multilingual `name`, `lat`, `lon`, `story`, bilingual `note`) when adding geographic data.
- The map list must remain useful when the map image cannot load or when operated with keyboard only.

## 9. Adding a new culture story (repeatable recipe)

1. Choose a specific non-conflicting slug, e.g. `tea-shop-culture`.
2. Run `npm run new:story -- tea-shop-culture "Tea Shop Culture"` to scaffold the JSON.
3. Research the practice and obtain real references. Fill ALL `TODO` fields; the validator must reject incomplete drafts.
4. Confirm a media asset's author, file page, license and usage rights. Register a unique media ID in `content/media.json`; add a suitable original SVG fallback file with the same ID under `assets/fallback/`.
5. Fill Traditional Chinese and English long-form fields and precise concise Myanmar fields per schema. Ensure three brief `moments` and real `sources`.
6. When appropriate, update category registry or documented map locations. Do not add map markers for unverified cultural origins.
7. If pronunciation is relevant, register phrase with checked spelling and audio status; do not mark audio playable before verifying rights/quality.
8. Run `npm test`. The generator automatically creates `docs/stories/<slug>/index.html` and updates Explore and the homepage list. Verify the new card, story, map, links and language switching.
9. Commit changed source, media records, generated `docs/`, and any actual checked assets.

**Never** manually duplicate an old HTML page and hand-edit the copy. New story pages must be generated from JSON and the shared page template.

## 10. Modifying existing stories or code

- Preserve existing slugs, file paths, authors' credits and valid URLs unless the change is deliberate and documented.
- Style changes belong in `src/styles.css`; interactions in `src/app.js`; templates in `scripts/build.mjs`; factual copy in `content/`.
- Do not overwrite user photographs or audio without explicit permission.
- Keep all generated pages linked from the site navigation and preserve GitHub Pages relative asset paths.
- Use web-safe, semantic HTML; avoid unnecessary dependencies, paid APIs and secrets in the repository.

## 11. Verification gates

Run `npm test`. This checks story schemas, names, media records, approved audio statuses, reference link shape, map bounds, file paths, clean content, and presence of generated pages. It is **not** a substitute for human fact-checking, fluent translation review, remote image availability or copyright assessment. Perform those separately.

Before releasing: open desktop and mobile layouts; confirm Home / Explore / Map / About / all story URLs; test search and category filters, language switch, map click, disabled unverified audio, verified recording playbacks, image fallbacks and keyboard focus. Note what was actually tested and what remains externally dependent.

## 12. Public documentation

`README.md`, this protocol and all public site text must describe only the product, development, editorial standards, credits and deployment. Do not include unrelated administrative checklists or external evaluation instructions.

## 13. Source and optimized media

The live site uses six optimized `assets/images/*.webp` files and four locally playable `assets/audio/*.mp3` files. Original uploaded PNG/M4A sources are retained under `assets/original-media/` and are not deployed. Do not replace them without permission. When updating media, change the relevant JSON registry and run `npm test`, which refreshes `docs/`. Do not falsely label contributor-supplied photographs as owned or licensed when photographer details or redistribution permissions remain unverified; obtain and record confirmation before public deployment.

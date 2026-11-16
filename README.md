# Beyond Myanmar — 不止於印象，看見緬甸。

**Beyond Myanmar** is an independent digital cultural journal introducing Myanmar through short visual narratives, traditions, food, festivals, heritage, living arts and language. It is designed for curious international readers, Taiwan-based readers and anyone who wants to understand daily life beyond familiar images.

A magazine-style experience combines an immersive editorial homepage, six cultural stories, a searchable Explore collection, a location-aware culture map, and carefully attributed images and pronunciation clips.

## Discover the collection

| Story | Theme |
| --- | --- |
| Thanaka · သနပ်ခါး | An everyday beauty practice and cultural memory |
| Mohinga · မုန့်ဟင်းခါး | Rice noodles, breakfast traditions and regional variation |
| Thingyan · သင်္ကြန် | The traditional New Year water festival |
| Bagan · ပုဂံ | Architecture, heritage and historical landscapes |
| Traditional Arts | Puppetry and performing traditions |
| Myanmar Language · မြန်မာဘာသာ | Script, greetings and pronunciation |

## Features

- Elegant, responsive editorial layout with immersive but accessible motion.
- Traditional Chinese and English story text, with a shorter Myanmar-language interface and introductions.
- Search and category filters across all stories.
- Interactive culture map linking **documented locations** to stories; representative markers never imply exclusive cultural origins.
- Four locally hosted Myanmar pronunciation recordings provided by the site contributor, with no external playback dependency.
- Cultural images supplied by the site contributor, with photography credit and reuse rights explicitly marked for verification; the map keeps its original attribution.
- Structured content source files and one shared story layout, enabling consistent new pages without copying HTML.

## Architecture

```text
beyond-myanmar/
├── AGENTS.md                  AI development and editorial protocol
├── README.md                  Public project documentation
├── package.json               Build, validation and preview scripts
├── content/
│   ├── site.json              Brand, category and map location data
│   ├── media.json             Image/map attribution data
│   ├── phrases.json           Language entries and audio status
│   └── stories/*.json         Independent cultural story content
├── src/
│   ├── styles.css             Shared design system
│   └── app.js                 UI, search, language and map interactions
├── scripts/
│   ├── build.mjs              Static page generator
│   ├── check.mjs              Data/output validation
│   ├── new-story.mjs          Story draft scaffolder
│   └── make-fallbacks.py      Original abstract fallback illustrations
├── assets/
│   ├── fallback/              Original illustrations when photos fail
│   ├── images/                Web-optimized cultural photographs
│   └── audio/                 Locally hosted voice clips
└── docs/                      Generated public GitHub Pages website
```

`docs/` is **generated**. For any future changes, edit the JSON source, CSS, JS or templates, then run the build again. Do not hand-edit generated pages.

## Run locally

Requirements: **Node.js 18 or newer** and Python 3 for the preview server.

```bash
npm test
python -m http.server 8000 --directory docs
```

Visit `http://localhost:8000/` in your browser. Alternatively, open the already-generated files in `docs/` via a local HTTP server even if Node.js is not installed. No backend, database, API key or paid service is required for ordinary browsing.

## Add a story

For example, add a new page about tea shop culture:

```bash
npm run new:story -- tea-shop-culture "Tea Shop Culture"
# Edit content/stories/tea-shop-culture.json and register media with verified rights.
npm test
```

The scaffold contains deliberately incomplete fields that must be researched and filled before the build is considered releasable. The validator rejects missing translations, source references, disallowed media statuses and other schema issues. Once complete, `npm test` generates the new page and automatically updates the story collection. For full editorial and development rules, read **[AGENTS.md](AGENTS.md)**.

## Publish on GitHub Pages

1. Create a new public repository, for example `beyond-myanmar`.
2. Commit all root files and directories, including `AGENTS.md`, `content/`, `src/`, `scripts/` and `docs/`. Upload the **contents of this folder**, not the ZIP itself.
3. From repository **Settings → Pages**, select **Deploy from a branch**, branch **main**, folder **/docs**. Save.
4. Use the actual URL shown on the Pages settings screen and check the homepage plus a few culture stories.

A typical project URL is `https://YOUR-USERNAME.github.io/beyond-myanmar/` (replace the placeholder with your username).

## Photographs, pronunciation and sources

The published website contains **six locally hosted, web-optimized photographs** (`assets/images/*.webp`) and **four locally hosted MP3 recordings** (`assets/audio/*.mp3`). The original uploaded PNG and M4A assets are preserved in `assets/original-media/` for future editing. The published `docs/` directory contains only the optimized variants. Content metadata lives in `content/media.json` and `content/phrases.json`.

Original cultural text is supported by the references on each story page. Map imagery is from Wikimedia Commons and remains subject to its own license and credits. Cultural photographs were supplied by the project contributor; **their actual photographers, redistribution rights and necessary model permissions have not been independently established**. Before publishing or reusing these images, verify ownership or license and update the metadata and About page. Voice recordings are provided by the site contributor; verify their pronunciation and rights before broader distribution.

See **[MEDIA_GUIDE.md](MEDIA_GUIDE.md)** for replacing pictures, audio and rebuilding `docs/`.

## Rights

The project includes original website design, code and editorial writing; the map uses a separate Creative Commons license, while cultural photographs and recorded audio require confirmed credits and permissions before reuse. No blanket open-source license is granted for original content by this README. Respect each image/audio license and attribution if you reuse individual media. This project is not affiliated with the Myanmar government, UNESCO, Wikimedia or other cited institutions.

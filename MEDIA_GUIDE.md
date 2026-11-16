# Media management — Beyond Myanmar

This website contains **the six images and four recordings supplied for Beyond Myanmar**, already integrated into all generated pages.

## Where the files live

| Content | Editable source | Published version | Registry |
| --- | --- | --- | --- |
| Six photographs | `assets/original-media/images/*.png` | `assets/images/*.webp` → `docs/assets/images/*.webp` | `content/media.json` |
| Four pronunciations | `assets/original-media/audio/*.m4a` | `assets/audio/*.mp3` → `docs/assets/audio/*.mp3` | `content/phrases.json` |

All images have descriptive filenames: `thanaka`, `mohinga`, `thingyan`, `bagan`, `traditional-arts`, `myanmar-language`. Audio tracks are `hello`, `thanks`, `howareyou`, `myanmar`.

The published photographs are optimized WebP copies and the audio files are MP3 copies for wider browser compatibility. Original uploads remain preserved for editing. These are the actual user-provided images and voices, not previous Wikimedia photograph URLs or audio links. The map base remains credited to Wikimedia Commons.

## Replace an image later

1. Replace or add a photo in `assets/images/` (JPG, PNG or WebP). Optimize its resolution for the web; you may also save the original under `assets/original-media/images/` for archival use.
2. In `content/media.json` locate the relevant media entry and set `localFile` to the **exact** filename in `assets/images/`.
3. Correct both language captions, photographer credit and true image use permission. Do not label downloaded images as your own. Do not delete the `map` entry.
4. Run `npm test` to update `docs/`; upload/commit **both** the source files and `docs/` to GitHub.

## Replace a voice clip later

1. Put the replacement in `assets/audio/` using MP3, WAV, M4A, or OGG.
2. In `content/phrases.json` find its `id` (`hello`, `thanks`, `howareyou`, `myanmar`) and change its `audio.localFile` to the exact saved filename.
3. Keep `status: "personal-recording"` for a contributor recording and set a correct `author` and `license`.
4. Run `npm test`. Confirm playback at `http://localhost:8000/` after launching `npm run preview`.
5. Upload or commit the regenerated `docs/` folder. Files placed only in `assets/audio/` will not update an existing GitHub Pages website.

## Publish on GitHub Pages

Set GitHub Repository **Settings → Pages → Deploy from a branch → main → /docs**. Files in `docs/` are generated; edit source data instead and rebuild.

## Rights and accessibility

Photos uploaded by a contributor do not prove they own copyright. Confirm the photographer, any necessary permission from depicted people, and allowed online reuse; update `content/media.json` and the About credits before publishing. Avoid autoplay audio. Always provide alt text and retain keyboard operability and reduced-motion support.

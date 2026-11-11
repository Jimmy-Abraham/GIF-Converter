# X GIF to WhatsApp sticker (Netlify)

Paste an X post link, get an animated WhatsApp sticker (WebP, 512x512, under 500 KB, up to 10 s).
Conversion runs in the visitor's browser with ffmpeg.wasm. Two small Netlify Functions fetch the GIF.

## Deploy (free)

1. Push this folder to a GitHub repo.
2. In Netlify: Add new site > Import an existing project > pick the repo. Settings come from `netlify.toml`.
3. Deploy. Open the site on your phone (Netlify provides the HTTPS that "Send to WhatsApp" needs).

Or with the CLI: `npm i -g netlify-cli && netlify deploy --prod`.

## Local test

```bash
npm install && npm run build
npx netlify-cli dev
```

## Limits

- First visit downloads ~30 MB of converter code, then the browser caches it. Conversion takes a few seconds, longer on slow phones.
- The video proxy is a Netlify Function; very large videos may hit its response size limit. Typical X GIFs are small.
- WhatsApp has no web API for adding stickers. The share sheet may send a picture instead of a sticker; if so, import the file into a sticker-pack app and add the pack to WhatsApp.
- FxTwitter is a third-party service and could change. Private or deleted posts won't work.

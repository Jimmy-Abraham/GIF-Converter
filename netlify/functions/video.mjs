// GET /api/video?src=<twimg mp4 url>  ->  the MP4 (proxied so the browser can read it)
export const config = { path: "/api/video" };

export default async (req) => {
  const src = new URL(req.url).searchParams.get("src") || "";
  let host = "";
  try { host = new URL(src).hostname; } catch {}
  if (!host.endsWith("twimg.com")) return Response.json({ error: "Blocked URL." }, { status: 400 });

  const r = await fetch(src);
  if (!r.ok) return Response.json({ error: "Couldn't download the GIF." }, { status: 502 });
  return new Response(r.body, { headers: { "Content-Type": "video/mp4" } });
};

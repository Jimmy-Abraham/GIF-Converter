// GET /api/resolve?link=<x post url>  ->  { url, isGif }
export const config = { path: "/api/resolve" };

export default async (req) => {
  const link = new URL(req.url).searchParams.get("link") || "";
  const m = link.match(/(?:twitter|x)\.com\/[^/]+\/status\/(\d+)/i);
  if (!m) return Response.json({ error: "That doesn't look like an X post link." }, { status: 400 });

  const r = await fetch(`https://api.fxtwitter.com/status/${m[1]}`);
  if (!r.ok) return Response.json({ error: "Couldn't load that post. It may be private or deleted." }, { status: 404 });

  const data = await r.json();
  const media = data?.tweet?.media?.all || [];
  const item = media.find((x) => x.type === "gif") || media.find((x) => x.type === "video");
  if (!item) return Response.json({ error: "No GIF or video found in that post." }, { status: 404 });

  return Response.json({ url: item.url, isGif: item.type === "gif" });
};

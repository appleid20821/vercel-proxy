export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    const url = new URL(req.url);
    const target = url.pathname.slice(1);

    if (!target.startsWith("http")) {
      return new Response("Invalid URL", { status: 400 });
    }

    const resp = await fetch(target, {
      method: req.method,
      headers: req.headers,
      body: req.body,
      redirect: "manual",
    });

    return new Response(resp.body, {
      status: resp.status,
      headers: resp.headers,
    });

  } catch (e) {
    return new Response("Proxy error", { status: 500 });
  }
}

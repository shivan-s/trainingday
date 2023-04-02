export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URLPattern(request.url);

    console.log(pathname);

    const { results } = await env.DB.prepare(
      "SELECT * FROM trainingdays WHERE id = ?",
    )
      .bind(pathname.replace("/", ""))
      .all();

    if (results?.length === 1) {
      return Response.json(results[0]);
    }
    return Response.json({ detail: "No trainindays found." });
  },
};

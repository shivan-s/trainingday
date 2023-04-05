export interface Env {
  DB: D1Database;
}

export default {
  async fetch(_request: Request, env: Env): Promise<Response> {
    const { results } = await env.DB.prepare(
      "SELECT * FROM trainingdays",
    ).all();
    return Response.json(results);
  },
};

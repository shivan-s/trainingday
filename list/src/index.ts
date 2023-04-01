export interface Env {
  db: D1Database;
}

export default {
  async fetch(_request: Request, env: Env): Promise<Response> {
    const { results } = await env.db
      .prepare("SELECT * FROM trainingdays")
      .all();
    return Response.json(results);
  },
};

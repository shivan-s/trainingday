import { TrainingDay } from "./types";

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "POST") {
      const { date, exercises } = (await request.json()) as TrainingDay;
      const { results } = await env.DB.prepare(
        `
      INSERT INTO trainingdays (date, notes) VALUES (?1, ?2)
      `,
      )
        .bind(trainingDay)
        .all();
    }

    return Response.json({ detail: "POST method only." });
  },
};

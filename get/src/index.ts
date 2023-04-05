import { TrainingDay } from "../types";

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URLPattern(request.url);

    const { results } = await env.DB.prepare(
      `
       SELECT
        trainingdays.id AS td_id,
        trainingdays.day AS td_day,
        trainingdays.notes AS td_notes,
        exercises.id AS e_id,
        exercises.name AS e_name
       FROM trainingdays
       INNER JOIN exercises ON exercises.trainingday = trainingdays.id
       WHERE trainingdays.id = ?
      `,
    )
      .bind(pathname.replace("/", ""))
      .all();

    if (results && results?.length > 0) {
      const trainingDay = Object.keys(
        Object.fromEntries(
          Object.entries(results[0] as TrainingDay).filter((e) =>
            e[0].includes("td_"),
          ),
        ),
      );
      const exercises = results.map((item) =>
        Object.fromEntries(
          Object.entries(item as TrainingDay).filter((e) =>
            e[0].includes("e_"),
          ),
        ),
      );
      return Response.json({
        ...trainingDay,
        exercises,
      });
    }
    return Response.json({ detail: "No Training Day found." });
  },
};

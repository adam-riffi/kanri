import type { HealthResponse } from "@pm/domain";

/** Liveness probe: answers ok whenever the app is serving requests. */
export function GET(): Response {
  const body: HealthResponse = { status: "ok" };
  return Response.json(body);
}

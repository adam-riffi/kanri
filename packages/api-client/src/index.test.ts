import { describe, expect, it } from "vitest";
import { createApiClient } from "./index.ts";

const BASE_URL = "http://localhost:3000";

describe("createApiClient", () => {
  it("returns the typed health body for GET /api/v1/health", async () => {
    const client = createApiClient({
      baseUrl: BASE_URL,
      fetch: async () => Response.json({ status: "ok" }),
    });

    const { data } = await client.GET("/api/v1/health");

    expect(data).toEqual({ status: "ok" });
  });

  it("sends GET /api/v1/health to the configured base URL", async () => {
    const requests: Request[] = [];
    const client = createApiClient({
      baseUrl: BASE_URL,
      fetch: async (request) => {
        requests.push(request);
        return Response.json({ status: "ok" });
      },
    });

    await client.GET("/api/v1/health");

    expect(requests.map((request) => `${request.method} ${request.url}`)).toEqual([
      `GET ${BASE_URL}/api/v1/health`,
    ]);
  });

  it("rejects paths missing from the OpenAPI document at compile time", () => {
    const client = createApiClient({ baseUrl: BASE_URL });

    // The expectation is enforced by `pnpm typecheck`, not at runtime.
    // @ts-expect-error "/api/v1/unknown" is not a path of the API
    const callUnknownPath = () => client.GET("/api/v1/unknown");

    expect(callUnknownPath).toBeTypeOf("function");
  });
});

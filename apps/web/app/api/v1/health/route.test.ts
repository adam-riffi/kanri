import { healthResponseSchema } from "@pm/domain";
import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/v1/health", () => {
  it("responds 200 with a body that matches the health schema", async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    expect(healthResponseSchema.safeParse(await response.json()).success).toBe(true);
  });
});

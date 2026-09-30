import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildOpenApiDocument } from "./openapi.ts";

describe("buildOpenApiDocument", () => {
  it("describes GET /api/v1/health as returning the HealthResponse schema", () => {
    const document = buildOpenApiDocument();

    expect(document.paths?.["/api/v1/health"]?.get?.responses?.["200"]).toMatchObject({
      content: {
        "application/json": { schema: { $ref: "#/components/schemas/HealthResponse" } },
      },
    });
  });

  it("matches the committed openapi.json", () => {
    const committed: unknown = JSON.parse(
      readFileSync(new URL("../openapi.json", import.meta.url), "utf8"),
    );

    expect(buildOpenApiDocument()).toEqual(committed);
  });
});

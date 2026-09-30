import { describe, expect, it } from "vitest";
import { healthResponseSchema } from "./health";

describe("healthResponseSchema", () => {
  it("accepts a response whose status is ok", () => {
    expect(healthResponseSchema.safeParse({ status: "ok" }).success).toBe(true);
  });

  it("rejects a response whose status is anything else", () => {
    expect(healthResponseSchema.safeParse({ status: "degraded" }).success).toBe(false);
  });

  it("rejects a response without a status", () => {
    expect(healthResponseSchema.safeParse({}).success).toBe(false);
  });
});

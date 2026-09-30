import { z } from "zod";

/** Body of `GET /api/v1/health`. */
export const healthResponseSchema = z.object({ status: z.literal("ok") });

export type HealthResponse = z.infer<typeof healthResponseSchema>;

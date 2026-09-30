import { OpenAPIRegistry, OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";
import { healthResponseSchema } from "./health.ts";

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "get",
  path: "/api/v1/health",
  summary: "Liveness probe",
  responses: {
    200: {
      description: "The app is serving requests.",
      content: { "application/json": { schema: healthResponseSchema } },
    },
  },
});

/** Builds the OpenAPI 3.1 document of the public API from the registered Zod schemas. */
export function buildOpenApiDocument() {
  return new OpenApiGeneratorV31(registry.definitions).generateDocument({
    openapi: "3.1.0",
    info: { title: "Project Management App API", version: "1.0.0" },
  });
}

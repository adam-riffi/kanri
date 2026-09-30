import createClient, { type ClientOptions } from "openapi-fetch";
import type { paths } from "./schema.d.ts";

/** Typed client for the `/api/v1` endpoints described by the OpenAPI document. */
export function createApiClient(options: ClientOptions) {
  return createClient<paths>(options);
}

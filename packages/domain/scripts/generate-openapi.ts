import { writeFileSync } from "node:fs";
import { buildOpenApiDocument } from "../src/openapi.ts";

const OUTPUT_URL = new URL("../openapi.json", import.meta.url);

writeFileSync(OUTPUT_URL, `${JSON.stringify(buildOpenApiDocument(), null, 2)}\n`);

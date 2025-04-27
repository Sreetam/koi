// src/index.ts

import { Hono } from "hono";
import { fromHono } from "chanfana";
import { LogController } from "./controllers/log.controller";
import type { Env } from "./models/env.d.ts";

// Start Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/", // ⚡ exactly like your previous style
});

// Register OpenAPI endpoints
openapi.post("/api/log", LogController.createLog);

// (Optional) Non-OpenAPI direct routes can use `app.get()` etc later

// Export app
export default app;
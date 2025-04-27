// src/controllers/log.controller.ts

import { Context } from "hono";
import { LogService } from "../services/log.service";
import { Log } from "../models/log.model";
import type { Env } from "../models/env.d.ts";

export class LogController {
  static async createLog(c: Context<{ Bindings: Env }>): Promise<Response> {
    const authHeader = c.req.header("Authorization") || "";
    const labelHeader = c.req.header("X-Logger-Label") || "";

    const keyFromRequest = authHeader.replace("Bearer ", "").trim();
    const labelFromRequest = labelHeader.trim();

    if (!keyFromRequest || !labelFromRequest) {
      return c.text("Missing Authorization or Label headers", 400);
    }

    // ⚡ Now validate using LABEL → fetch API Key
    const expectedKey = await c.env.koi_kv.get(labelFromRequest);

    if (!expectedKey || expectedKey !== keyFromRequest) {
      return c.text("Unauthorized", 401);
    }

    // Parse and validate body
    let body: unknown;
    try {
      body = await c.req.json();
    } catch (err) {
      console.error("Invalid JSON body:", err);
      return c.text("Bad Request: Invalid JSON", 400);
    }

    if (!LogController.isValidLog(body)) {
      return c.text("Bad Request: Missing or invalid 'log' field", 400);
    }

    const logBody = body as Log;

    const logService = new LogService();
    try {
      await logService.insertLog(c.env.koi_db, logBody.log, keyFromRequest);
    } catch (err) {
      console.error("Database insert error:", err);
      return c.text("Internal Server Error", 500);
    }

    return c.text("Log stored successfully", 200);
  }

  private static isValidLog(obj: unknown): obj is Log {
    if (typeof obj !== "object" || obj === null) {
      return false;
    }
    const maybeLog = obj as Log;
    return typeof maybeLog.log === "string" && maybeLog.log.trim().length > 0;
  }
}
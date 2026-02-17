import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-83d701ee/health", (c) => {
  return c.json({ status: "ok" });
});

// Journal routes
app.get("/make-server-83d701ee/journal", async (c) => {
  try {
    const entries = await kv.getByPrefix("journal_");
    // Sort by timestamp descending
    const sorted = entries.sort((a, b) => b.timestamp - a.timestamp);
    return c.json(sorted);
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return c.json({ error: "Failed to fetch journal entries" }, 500);
  }
});

app.post("/make-server-83d701ee/journal", async (c) => {
  try {
    const body = await c.req.json();
    const id = `journal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const entry = {
      id,
      ...body
    };
    await kv.set(id, entry);
    return c.json(entry);
  } catch (error) {
    console.error("Error creating journal entry:", error);
    return c.json({ error: "Failed to create journal entry" }, 500);
  }
});

// Anxiety log routes
app.get("/make-server-83d701ee/anxiety", async (c) => {
  try {
    const logs = await kv.getByPrefix("anxiety_");
    // Sort by timestamp descending
    const sorted = logs.sort((a, b) => b.timestamp - a.timestamp);
    return c.json(sorted);
  } catch (error) {
    console.error("Error fetching anxiety logs:", error);
    return c.json({ error: "Failed to fetch anxiety logs" }, 500);
  }
});

app.post("/make-server-83d701ee/anxiety", async (c) => {
  try {
    const body = await c.req.json();
    const id = `anxiety_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const log = {
      id,
      ...body
    };
    await kv.set(id, log);
    return c.json(log);
  } catch (error) {
    console.error("Error creating anxiety log:", error);
    return c.json({ error: "Failed to create anxiety log" }, 500);
  }
});

Deno.serve(app.fetch);
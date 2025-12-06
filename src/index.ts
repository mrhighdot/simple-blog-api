import { Context, Hono } from "hono";
import {cors } from "hono/cors"
import payload from "./files/payload.json";
import secondaryPayload from "./files/secondary.json";

const app = new Hono();

app.use(cors())

app.get("/", async (c) => {
  return c.text("Who sent you here?");
});

app.get("/blogs/get", async (c: Context) => {
  return c.json(payload);
});

app.get("/blogs/:slug", async (c: Context) => {
  const slug = c.req.param("slug");

  const getSelectedBlog = payload.posts?.find(
    (item: any) => item.slug === slug,
  );

  if (!getSelectedBlog) {
    return c.json({ message: "Blog not found" }, 404);
  }

  return c.json(getSelectedBlog);
});

app.get("/categories/get", async (c: Context) => {
  return c.json(secondaryPayload.categories);
});

app.get("/categories/:id", async (c: Context) => {
  const id = c.req.param("id");

  const category = secondaryPayload.categories?.find(
    (item: any) => item.id === id,
  );

  return c.json(category);
});

export default app;

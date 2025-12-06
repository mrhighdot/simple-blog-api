import { Context, Hono } from "hono";
import payload from "./files/payload.json";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
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

export default app;

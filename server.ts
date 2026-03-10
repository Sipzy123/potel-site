import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";

const PRODUCTS_FILE = path.join(process.cwd(), "public", "products.json");

async function getProducts() {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading products file:", error);
    return [];
  }
}

async function saveProducts(products: any[]) {
  try {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving products file:", error);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/products", async (req, res) => {
    const products = await getProducts();
    res.json(products);
  });

  app.post("/api/products", async (req, res) => {
    const products = await getProducts();
    const newProduct = {
      ...req.body,
      id: products.length > 0 ? Math.max(...products.map((p: any) => p.id)) + 1 : 1,
      specs: typeof req.body.specs === 'string' ? req.body.specs : JSON.stringify(req.body.specs),
      is_featured: req.body.is_featured ? 1 : 0
    };
    products.push(newProduct);
    await saveProducts(products);
    res.json({ id: newProduct.id });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

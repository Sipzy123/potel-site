import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
<<<<<<< HEAD
import { existsSync, mkdirSync } from "fs";
import multer from "multer";

// ─── Config ───────────────────────────────────────────────────────────────────
const PRODUCTS_FILE   = path.join(process.cwd(), "public", "products.json");
const UPLOAD_IMG_DIR  = path.join(process.cwd(), "public", "uploads", "images");
const UPLOAD_FILE_DIR = path.join(process.cwd(), "public", "uploads", "downloads");

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "potel@2025";

// ─── Ensure upload directories exist ─────────────────────────────────────────
[UPLOAD_IMG_DIR, UPLOAD_FILE_DIR].forEach(dir => {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
});

// ─── Multer storage factories ─────────────────────────────────────────────────
function makeStorage(dest: string) {
  return multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, dest),
    filename: (_req, file, cb) => {
      // Sanitise: keep extension, prefix with timestamp to avoid collisions
      const ext  = path.extname(file.originalname).toLowerCase();
      const base = path.basename(file.originalname, ext)
        .replace(/[^a-z0-9_\-]/gi, "_")
        .toLowerCase()
        .slice(0, 60);
      cb(null, `${Date.now()}_${base}${ext}`);
    },
  });
}

const uploadImage = multer({
  storage: makeStorage(UPLOAD_IMG_DIR),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    if (/^image\/(jpeg|png|webp|gif|svg\+xml)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

const uploadFile = multer({
  storage: makeStorage(UPLOAD_FILE_DIR),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/zip",
      "application/x-zip-compressed",
      "application/octet-stream",
      "application/step",
      "model/step",
      "model/x.stl-binary",
      "text/plain",
    ];
    if (allowed.includes(file.mimetype) || file.mimetype.startsWith("application/")) cb(null, true);
    else cb(new Error("File type not allowed"));
  },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function getProducts() {
  try { return JSON.parse(await fs.readFile(PRODUCTS_FILE, "utf-8")); }
  catch { return []; }
}
async function saveProducts(products: any[]) {
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
}

// ─── Server ───────────────────────────────────────────────────────────────────
async function startServer() {
  const app  = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // ── Auth ──────────────────────────────────────────────────────────────────
  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD)
      res.json({ success: true });
    else
      res.status(401).json({ success: false, message: "Invalid credentials" });
  });

  // ── Image upload  POST /api/upload/image ──────────────────────────────────
  // Returns: { url: "/uploads/images/filename.jpg" }
  app.post(
    "/api/upload/image",
    uploadImage.single("file"),
    (req: any, res) => {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      res.json({ url: `/uploads/images/${req.file.filename}` });
    }
  );

  // ── File upload  POST /api/upload/file ────────────────────────────────────
  // Returns: { url, name, size }
  app.post(
    "/api/upload/file",
    uploadFile.single("file"),
    (req: any, res) => {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      const sizeMB = (req.file.size / (1024 * 1024)).toFixed(1) + " MB";
      res.json({
        url:  `/uploads/downloads/${req.file.filename}`,
        name: req.file.originalname,
        size: sizeMB,
      });
    }
  );

  // ── Products CRUD ─────────────────────────────────────────────────────────
  app.get("/api/products", async (_req, res) => res.json(await getProducts()));

=======

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

>>>>>>> ed1eee7765d5e32992c9220fc4fed5f440c7f09f
  app.post("/api/products", async (req, res) => {
    const products = await getProducts();
    const newProduct = {
      ...req.body,
      id: products.length > 0 ? Math.max(...products.map((p: any) => p.id)) + 1 : 1,
<<<<<<< HEAD
      specs: typeof req.body.specs === "string" ? req.body.specs : JSON.stringify(req.body.specs),
      is_featured: req.body.is_featured ? 1 : 0,
    };
    products.push(newProduct);
    await saveProducts(products);
    res.json(newProduct);
  });

  app.put("/api/products/:id", async (req, res) => {
    const products = await getProducts();
    const idx = products.findIndex((p: any) => p.id === Number(req.params.id));
    if (idx === -1) return res.status(404).json({ message: "Not found" });
    products[idx] = {
      ...products[idx], ...req.body,
      id: Number(req.params.id),
      specs: typeof req.body.specs === "string" ? req.body.specs : JSON.stringify(req.body.specs),
      is_featured: req.body.is_featured ? 1 : 0,
    };
    await saveProducts(products);
    res.json(products[idx]);
  });

  app.delete("/api/products/:id", async (req, res) => {
    const products = await getProducts();
    const filtered = products.filter((p: any) => p.id !== Number(req.params.id));
    if (filtered.length === products.length) return res.status(404).json({ message: "Not found" });
    await saveProducts(filtered);
    res.json({ success: true });
  });

  // ── Vite / Static ─────────────────────────────────────────────────────────
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (_req, res) => res.sendFile(path.join(process.cwd(), "dist", "index.html")));
  }

  app.listen(PORT, "0.0.0.0", () => console.log(`Server → http://localhost:${PORT}`));
=======
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
>>>>>>> ed1eee7765d5e32992c9220fc4fed5f440c7f09f
}

startServer();

# POTEL — Project Structure & Data Guide

## Where products data lives

```
public/
└── products.json        ← THE LIVE DATA FILE (read + written by server)
                           This file is served by Express AND mutated by admin actions.
                           Commit this file to git to persist changes.

src/
└── data/
    └── products.json    ← REFERENCE COPY only (not used at runtime).
                           Useful as a backup / seed. Not imported by any code.
```

All pages fetch from `/api/products` (served by `server.ts`).  
Admin add / edit / delete writes back to `public/products.json` via the API.

---

## Admin Panel

**Access URL:** `http://localhost:3000/admin?admin=1`

The `?admin=1` query param is **required** — without it you're redirected home.

**Login credentials** (hardcoded, change before production):

| Field    | Value          |
|----------|----------------|
| Username | `admin`        |
| Password | `potel@2025`   |

Credentials live in two places (keep them in sync):
- `server.ts` — `ADMIN_USERNAME` / `ADMIN_PASSWORD` constants
- `src/pages/AdminPage.tsx` — `ADMIN_USER` / `ADMIN_PASS` constants (offline fallback)

Session is stored in `sessionStorage` so it clears when the tab closes.

---

## API Endpoints

| Method | Path                  | Description           |
|--------|-----------------------|-----------------------|
| POST   | `/api/admin/login`    | Authenticate admin    |
| GET    | `/api/products`       | Fetch all products    |
| POST   | `/api/products`       | Create new product    |
| PUT    | `/api/products/:id`   | Update product by ID  |
| DELETE | `/api/products/:id`   | Delete product by ID  |

---

## Dev Setup

```bash
npm install
npm run dev       # starts Vite + Express on port 3000
```

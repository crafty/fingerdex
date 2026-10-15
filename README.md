<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="src/assets/fingerdex-v2-logo-light.svg">
  <img src="src/assets/fingerdex-v2-logo.svg" alt="FingerDex" width="280">
</picture>

### The community directory of fingerboard brands & creators

[**fingerdex.org**](https://fingerdex.org) · [Instagram](https://www.instagram.com/crafty.fb/)

[![Deploy](https://github.com/crafty/fingerdex/actions/workflows/deploy.yml/badge.svg)](https://github.com/crafty/fingerdex/actions/workflows/deploy.yml)
![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)

</div>

---

## ✨ Features

- **500+ brands & creators** with their products, Instagram, and website
- **Search** by name or Instagram handle
- **Filter by product** (decks, trucks, wheels, obstacles, …). Click any tag on a card to add it to the filter
- **Instagram stats** on each card: profile picture, follower count, and how long ago they last posted
- **Submit a creator** through the built-in form

## 🧰 Tech Stack

|               |                                                                   |
| ------------- | ----------------------------------------------------------------- |
| **Framework** | React 19 with the React Compiler                                  |
| **Build**     | Vite 8 + TypeScript                                               |
| **UI**        | PrimeReact v11 (`@primereact/ui`) with the Aura theme, PrimeIcons |
| **Styling**   | Tailwind CSS v4                                                   |
| **State**     | Zustand                                                           |
| **Hosting**   | GitHub Pages via GitHub Actions                                   |

The site is fully static: no backend and no database. All creator data lives in the source.

## 🚀 Getting Started

Requires **Node 22+**.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## 📜 Scripts

| Command                | What it does                                                           |
| ---------------------- | ---------------------------------------------------------------------- |
| `npm run dev`          | Start the dev server                                                   |
| `npm run build`        | Type-check and build to `dist/`                                        |
| `npm run preview`      | Serve the production build locally                                     |
| `npm run lint`         | Run ESLint                                                             |
| `npm run trim-dataset` | Trim the raw Instagram export to `src/helpers/instagram-profiles.json` |
| `npm run avatars`      | Download profile pictures into `public/avatars/`                       |

## 📸 Updating Instagram Data

Follower counts, last-post dates, and profile pictures come from an Instagram profile scraper export. To refresh them:

1. **Get the profile URLs.** `copyToClipboardCreatorsInstaUrls(BRANDS_CREATORS)` in `src/helpers/utilities.tsx` copies one `https://instagram.com/<handle>` URL per creator to the clipboard. Call it temporarily in dev, and don't ship it.
2. **Run the scraper** on that list. Export the **full dataset as JSON** with at least these fields:
   ```
   username, profilePicUrlHD, private, followersCount, latestPosts
   ```
3. **Save the export** as `src/helpers/dataset_instagram-scraper.json`.
4. **Process it:**
   ```bash
   npm run trim-dataset   # → src/helpers/instagram-profiles.json
   npm run avatars        # → public/avatars/<username>.jpg
   ```
5. **Commit** `instagram-profiles.json` and `public/avatars/`.

> [!NOTE]
> The raw export is tens of MB and is git-ignored. Only the trimmed file (~70 KB) is bundled into the site. Keep the raw file locally, because `npm run avatars` reads picture URLs from it.

> [!IMPORTANT]
> Avatars are self-hosted because Instagram's image CDN blocks cross-origin loads (`Cross-Origin-Resource-Policy: same-origin`) and its URLs expire after a few days. Pictures are resized to 96×96 (about 2 KB each). Cards fall back to the creator's initial when a picture is missing or the profile is private.

## ➕ Adding or Editing a Creator

Creators are listed in `BRANDS_CREATORS` in `src/helpers/constants.tsx`:

```ts
{
  name: "Null FB",
  instagram: "@nullfb.co",
  products: ["decks", "tape", "obstacles"],
  website: "http://www.nullfb.co/",
  promoted: true,
},
```

- `name` or `instagram` may be `null`, but not both.
- `products: []` shows the creator as "Products not listed".
- A new product category must be added to **both** the `Product` type and the `PRODUCTS` array.
- Order on the page is automatic: promoted creators first, then creators with a website and products, then creators with products only, then everyone else.

Submissions from the site's **Add Creator** form arrive by email and are added here by hand.

## 🗂️ Project Structure

```
├── public/avatars/              Self-hosted Instagram profile pictures
├── scripts/
│   ├── trim-dataset.mjs         Raw scraper export → instagram-profiles.json
│   └── download-avatars.mjs     Downloads and resizes profile pictures
└── src/
    ├── App.tsx                  Page layout, search and filter logic
    ├── components/              Creator card, search, filters, popovers
    ├── helpers/
    │   ├── constants.tsx        Creator data, product list, types
    │   ├── utilities.tsx        Sorting, Instagram merge, formatting helpers
    │   └── instagram-profiles.json
    └── store/filtersStore.tsx   Zustand store for search and filters
```

## 🌐 Deployment

Every push to `main` builds the site and deploys it to GitHub Pages ([`deploy.yml`](.github/workflows/deploy.yml)). There's no separate release step, so run `npm run build` locally before pushing, because a failed build blocks the deploy.

---

<div align="center">

Made for the fingerboarding community by [@crafty.fb](https://www.instagram.com/crafty.fb/) 🛹

</div>

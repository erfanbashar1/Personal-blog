# Personal Blog - Claude Documentation

## Project Overview

This is a personal blog built with **Astro** (static site generator) using the **AstroPaper** template. The blog is deployed to GitHub Pages at `/Personal-blog` subdirectory.

**Repository**: https://github.com/erfanbashar1/Personal-blog
**Live Site**: https://erfanbashar1.github.io/Personal-blog/

## Tech Stack

- **Framework**: Astro v5.15.9
- **Styling**: Tailwind CSS + CSS variables
- **Theming**: Light/Dark mode with localStorage persistence
- **CMS**: Front Matter CMS (VS Code extension)
- **Package Manager**: pnpm (NOT npm) - See critical note below
- **Deployment**: GitHub Pages (automatic via GitHub Actions)
- **Blog Posts**: Markdown files in `src/data/blog/`
- **Notion Integration**: notion-to-md for importing Notion pages

## Key Architecture

### Directory Structure
```
src/
├── components/       # Reusable Astro components
│   ├── Header.astro          # Navigation header (with base path handling)
│   ├── BackButton.astro       # Back navigation button
│   ├── Footer.astro
│   ├── Card.astro             # Blog post card component
│   └── ...
├── layouts/
│   ├── Layout.astro           # Main layout (loads toggle-theme.js)
│   └── Main.astro             # Content layout with back button URL tracking
├── pages/
│   ├── index.astro            # Homepage
│   ├── search.astro           # Search page (pagefind integration)
│   └── posts/[...slug]/index.astro  # Blog post pages
├── utils/
│   ├── getPath.ts             # CRITICAL: Generates blog post URLs with base path
│   ├── getSortedPosts.ts
│   └── ...
└── styles/
    ├── global.css             # Global styles and dark mode CSS variables
    └── ...

public/
└── toggle-theme.js            # Dark mode toggle script (critical for functionality)
```

### Base Path Configuration

**Important**: This blog is deployed at `/Personal-blog` subdirectory, NOT at the root.

**Key files that include `/Personal-blog` base path**:
- `astro.config.ts`: `base: "/Personal-blog"`
- `src/utils/getPath.ts`: Line 24 - `"/Personal-blog/posts"`
- `src/components/Header.astro`: Line 15 - `withBase()` helper function
- `src/layouts/Layout.astro`: Line 133 - script path `/Personal-blog/toggle-theme.js`
- `src/layouts/Main.astro`: Line 20 - `backUrl` includes `/Personal-blog` prefix
- `src/pages/index.astro`: Lines 32, 104 - RSS and All Posts links

## Recently Encountered Bugs & Fixes

### Bug 1: Broken Navigation Links (FIXED ✅)

**Problem**: Clicking on header navigation links (Posts, Tags, About, Archives, Search) returned 404 errors.

**Root Cause**: Navigation links were hardcoded as `/posts`, `/tags`, etc., missing the `/Personal-blog` base path.

**Solution Applied**:
- Created `withBase()` helper function in [Header.astro:15](src/components/Header.astro#L15)
- Updated all navigation links to use `withBase("/posts")`, `withBase("/tags")`, etc.
- Build succeeded with 0 errors

**Relevant Commit**: `02ee089`

---

### Bug 2: Broken Blog Post Links (FIXED ✅)

**Problem**: Blog post links from the homepage returned 404 errors.

**Root Cause**: The `getPath()` function was generating `/posts/post-slug/` instead of `/Personal-blog/posts/post-slug/`.

**Solution Applied**:
- Updated [src/utils/getPath.ts:24](src/utils/getPath.ts#L24) to include `/Personal-blog` prefix
- Changed `const basePath = includeBase ? "/posts" : "";` to `const basePath = includeBase ? "/Personal-blog/posts" : "";`

**Relevant Commit**: `bee3026`

---

### Bug 3: Back Button 404 Errors (FIXED ✅)

**Problem**: Clicking the back button on blog posts returned 404 errors.

**Root Cause**: The `backUrl` stored in `sessionStorage` was missing the `/Personal-blog` base path.

**Solution Applied**:
1. **[Main.astro:20](src/layouts/Main.astro#L20)**: Changed from `Astro.url.pathname` to `/Personal-blog${Astro.url.pathname}`
2. **[index.astro:118](src/pages/index.astro#L118)**: Changed from `/` to `/Personal-blog/`
3. **[search.astro:9](src/pages/search.astro#L9)**: Added `/Personal-blog` prefix to pathname
4. **[BackButton.astro](src/components/BackButton.astro)**:
   - Listen to `astro:after-swap` event for reliable sessionStorage access
   - Added timeout to ensure sessionStorage is populated

**Relevant Commit**: `b034ed6`

---

### Bug 4: Dark Mode Toggle Not Working (FIXED ✅)

**Problem**: The dark mode toggle button was not clickable/functional.

**Root Cause (Complex)**: Multiple issues:
1. **Script Loading Issue**: The toggle-theme.js script was loaded from `/toggle-theme.js` instead of `/Personal-blog/toggle-theme.js` (404 error)
2. **Event Listener Timing**: The script used `window.onload` which only fires on initial load, not during Astro view transitions

**Solution Applied**:

**Part 1 - Script Path Fix** [Layout.astro:133](src/layouts/Layout.astro#L133)
```astro
<!-- WRONG: -->
<script is:inline src="/toggle-theme.js"></script>

<!-- CORRECT: -->
<script is:inline src="/Personal-blog/toggle-theme.js"></script>
```

**Part 2 - Event Listener Fix** [public/toggle-theme.js](public/toggle-theme.js)
- Kept the original AstroPaper implementation using `window.onload`
- Added `astro:after-swap` listener to reinitialize theme functionality after view transitions
- The `setThemeFeature()` function runs on both initial load and view transitions

**Why This Works**:
- With Astro view transitions, page navigation is client-side (no full reload)
- `astro:after-swap` event fires after the DOM is updated, allowing us to reattach event listeners
- The original `window.onload` method wouldn't fire again, so we needed the additional listener

**Relevant Commits**:
- `61338de` - Fixed script path
- `8a2c2cf` - Aligned with AstroPaper original implementation

---

## Critical Components & Files

### 1. **Dark Mode Toggle** (`public/toggle-theme.js`)
- **Purpose**: Toggles between light and dark themes
- **How it works**:
  - Sets `data-theme` attribute on `<html>` element
  - CSS uses `html[data-theme="dark"]` selector for dark mode styles
  - Persists preference in localStorage
  - Syncs with system dark mode preference
- **Event Listeners**:
  - `window.onload` - Initial setup
  - `astro:after-swap` - Reattach after view transitions
  - `astro:before-swap` - Save theme before navigation

### 2. **Navigation Helper** (`src/components/Header.astro`)
- **Key Feature**: `withBase()` function on line 15
  ```typescript
  const withBase = (path: string) => `/Personal-blog${path}`;
  ```
- **Usage**: All navigation links use `withBase("/path")` to ensure correct URLs

### 3. **Blog Post URL Generation** (`src/utils/getPath.ts`)
- **Purpose**: Generates correct blog post URLs with proper base path and slugification
- **Critical Line 24**:
  ```typescript
  const basePath = includeBase ? "/Personal-blog/posts" : "";
  ```

### 4. **Back Button Navigation** (`src/components/BackButton.astro`)
- **How it works**:
  1. [Main.astro](src/layouts/Main.astro) stores current pathname in `sessionStorage` on page load
  2. [BackButton.astro](src/components/BackButton.astro) retrieves it and updates button href
  3. Uses both `DOMContentLoaded` and `astro:after-swap` listeners for reliability

### 5. **Styles & Theme** (`src/styles/global.css`)
- **Dark Mode CSS**: Uses `html[data-theme="dark"]` selector
- **CSS Variables**: All colors defined as custom properties
  - Light mode: `html[data-theme="light"]`
  - Dark mode: `html[data-theme="dark"]`

## Setting Up Front Matter CMS

Front Matter CMS is configured for visual editing of blog posts.

### Quick Start
1. Open the project in VS Code
2. Install "Front Matter" extension (eliostruyf)
3. The CMS dashboard appears in VS Code sidebar
4. Create/edit posts with the visual interface
5. Posts are saved to `src/data/blog/` as markdown

### Blog Post Structure
```yaml
---
title: Post Title
description: Brief description
pubDatetime: 2025-11-18T10:23:13.030Z
modDatetime: (optional)
slug: post-slug
featured: false
draft: false
tags: []
---

Your blog content here...
```

## Building & Deployment

### Local Development
```bash
# Use pnpm (NOT npm!)
npx pnpm@latest install
npx pnpm@latest run dev

# Or if pnpm is installed globally:
pnpm install
pnpm run dev
```

### Build for Production
```bash
# Use pnpm
npx pnpm@latest run build

# Or if pnpm is installed globally:
pnpm run build
```
This runs:
1. `astro check` - Type checking
2. `astro build` - Build static site to `dist/`
3. `pagefind` - Generate search index
4. Copy pagefind results to public folder

### GitHub Pages Deployment
- Automatic via GitHub Actions
- Triggered on push to `main` branch
- Deploys to `https://erfanbashar1.github.io/Personal-blog/`

## Common Tasks

### Adding a New Blog Post
1. Open Front Matter CMS in VS Code
2. Click "New" and create a markdown file
3. Fill in metadata (title, description, tags, etc.)
4. Write content in markdown
5. Save file (automatically goes to `src/data/blog/`)
6. Run `npm run build` locally to test

### Fixing Links
**Rule**: All internal links must include `/Personal-blog` prefix
- ✅ Correct: `href="/Personal-blog/posts/"`
- ❌ Wrong: `href="/posts/"`

### Adding New Pages
Pages in `src/pages/` automatically become routes:
- `src/pages/index.astro` → `/Personal-blog/`
- `src/pages/about.astro` → `/Personal-blog/about/`
- `src/pages/posts/[slug].astro` → `/Personal-blog/posts/[slug]/`

## Important Notes

1. **Never hardcode paths without `/Personal-blog` base path** - This is the #1 cause of 404 errors
2. **Use `withBase()` helper** - In Header.astro, all links use the `withBase()` function
3. **View Transitions**: Astro view transitions are enabled, so event listeners need `astro:after-swap` for proper reinitializion
4. **sessionStorage Timing**: Back button uses both `DOMContentLoaded` and `astro:after-swap` to ensure sessionStorage is populated
5. **Dark Mode Persistence**: User theme preference is stored in localStorage and persists across sessions

---

## ⚠️ CRITICAL: Package Manager Is pnpm (NOT npm)

**THIS IS IMPORTANT** - The project uses **pnpm**, not npm!

### Lock File Management

- **Use**: `pnpm-lock.yaml` (main lock file for CI/CD)
- **Ignore**: `package-lock.json` (auto-generated by npm, causes conflicts)
- **Never commit** `package-lock.json` when modifying dependencies

### When Adding/Updating Dependencies

```bash
# ✅ CORRECT - Use pnpm
npx pnpm@latest install

# ❌ WRONG - Never use npm
npm install  # This creates package-lock.json which breaks the build!
```

### Package Manager Configuration

- Set in `package.json`: `"packageManager": "pnpm@9.0.0"`
- GitHub Actions uses this to know which package manager to use
- If lock file is out of sync with package.json, GitHub Actions will fail with:
  ```
  ERR_PNPM_OUTDATED_LOCKFILE Cannot install with "frozen-lockfile"
  ```

### Fixing Out-of-Sync Lock Files

If you accidentally run `npm install`:

```bash
# Remove npm lock file
rm package-lock.json

# Regenerate pnpm lock file
npx pnpm@latest install

# Commit the updated pnpm-lock.yaml
git add pnpm-lock.yaml
git commit -m "Update pnpm lock file"
```

### Historical Issue

During Notion import setup (commit c3bfb9b), we:
1. Added `@notionhq/client`, `notion-to-md`, and `dotenv` dependencies
2. Accidentally ran `npm install` instead of `pnpm install`
3. Created `package-lock.json` instead of updating `pnpm-lock.yaml`
4. GitHub Actions build failed with "outdated lockfile" error
5. Fixed by running `npx pnpm@latest install` and committing `pnpm-lock.yaml`

**To prevent this in future**: Always remember this project uses pnpm! ✅

## Troubleshooting

### Links Return 404
- Check if URL includes `/Personal-blog` prefix
- Verify in browser dev tools that the href attribute is correct
- Look at generated `dist/` files to see what Astro built

### Dark Mode Not Working
- Check browser console for errors
- Verify `/Personal-blog/toggle-theme.js` loads (check Network tab)
- Check if `data-theme` attribute is on `<html>` element
- Clear localStorage and refresh

### Back Button Not Working
- Check sessionStorage in browser dev tools
- Verify `backUrl` is being set in sessionStorage
- Check that button href is being updated

## Additional Resources

- **Astro Docs**: https://docs.astro.build
- **AstroPaper Template**: https://github.com/satnaing/astro-paper
- **Front Matter CMS**: https://frontmatter.codes/
- **GitHub Pages**: https://pages.github.com/

## Last Updated

November 18, 2025

### Recent Additions (Nov 18, 2025)
- Added Notion blog import functionality (notion-to-md integration)
- Critical pnpm package manager documentation to prevent lock file errors
- Import script: `npm run import:notion:shared <PAGE_ID> "Title"`
- First imported post: "College Degrees Are Becoming Useless"

## Contact & Maintenance

This documentation should be updated whenever:
- New bugs are discovered and fixed
- New features are added
- Dependencies are upgraded
- Configuration changes are made

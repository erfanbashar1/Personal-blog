# Erfan's Personal Blog

A minimal, fast, and accessible blog built with [Astro](https://astro.build) and deployed to GitHub Pages.

**Live Site**: https://erfanbashar1.github.io/Personal-blog/

## Features

- ✨ Minimal and responsive design
- 🌓 Light & dark mode toggle
- 📝 Markdown-based blog posts with Front Matter CMS visual editor
- 🔍 Full-text search with Pagefind
- 📱 Mobile-friendly and accessible
- ⚡ Super fast performance (static site generation)
- 🎨 SEO-friendly with dynamic OG images
- 📰 RSS feed and sitemap
- 🚀 Automatic deployment via GitHub Actions

## Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/erfanbashar1/Personal-blog.git
cd "Personal Blog"

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000/Personal-blog/](http://localhost:3000/Personal-blog/) in your browser.

### Build for Production

```bash
npm run build
```

This generates a static site in the `dist/` folder.

## Creating Blog Posts

### Using Front Matter CMS (Visual Editor)

1. Open the project in VS Code
2. Install the "Front Matter" extension
3. Use the CMS dashboard to create/edit posts
4. Posts are automatically saved to `src/data/blog/`

### Manual Creation

Create a markdown file in `src/data/blog/`:

```markdown
---
title: My First Post
description: A brief description
pubDatetime: 2025-11-18T10:00:00Z
slug: my-first-post
featured: false
draft: false
tags: [astro, blog]
---

Your blog content in markdown...
```

## Project Structure

```
src/
├── components/     # Reusable Astro components
├── layouts/        # Layout templates
├── pages/          # Page routes
├── data/blog/      # Blog post markdown files
├── utils/          # Utility functions
└── styles/         # Global styles

public/
├── assets/         # Static images and icons
└── toggle-theme.js # Dark mode script

```

## Configuration

- **Astro Config**: `astro.config.ts`
- **Site Config**: `src/config.ts` (title, description, author, etc.)
- **Theme**: `src/styles/global.css` (CSS variables for colors)

## Deployment

This blog is automatically deployed to GitHub Pages on every push to the `main` branch via GitHub Actions.

**Deployment URL**: `https://erfanbashar1.github.io/Personal-blog/`

## Troubleshooting

### Links return 404
- Ensure all internal links include the `/Personal-blog` base path
- Example: `href="/Personal-blog/posts/"` not `href="/posts/"`

### Dark mode not working
- Check browser console for errors
- Clear localStorage and refresh
- Verify `toggle-theme.js` loads in Network tab

### Back button not working
- Check sessionStorage in browser dev tools
- Ensure `backUrl` is being stored

For detailed troubleshooting, see [claude.md](claude.md).

## Technologies

- **Framework**: Astro v5
- **Styling**: Tailwind CSS
- **Search**: Pagefind
- **CMS**: Front Matter
- **Deployment**: GitHub Pages + GitHub Actions
- **Language**: TypeScript

## Resources

- [Astro Documentation](https://docs.astro.build)
- [AstroPaper Template](https://github.com/satnaing/astro-paper) (Original template)
- [Front Matter CMS](https://frontmatter.codes/)

## License

MIT License - See LICENSE file for details

## Author

Erfan Bashar

## Documentation

For detailed information about project setup, architecture, and bug fixes, see [claude.md](claude.md).

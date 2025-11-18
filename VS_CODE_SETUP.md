# VS Code Setup Guide - Blog Visual Editing

This guide walks you through setting up VS Code with Front Matter CMS for a seamless blog editing experience.

## Why VS Code + Front Matter?

- **Visual Editor**: Front Matter CMS provides a beautiful UI without leaving VS Code
- **Full Git Control**: All changes tracked in git, no external platform lock-in
- **Markdown Native**: Work with markdown files directly with live preview
- **Free & Open**: No subscriptions or external dependencies
- **Works Offline**: Edit locally, sync when ready
- **Instant Deploy**: Push to GitHub → automatic build & deploy

## Prerequisites

- Git installed on your machine
- Visual Studio Code (free from [code.visualstudio.com](https://code.visualstudio.com))
- Node.js 18+ (for local development)

## Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/erfanbashar1/Personal-blog.git
cd Personal-blog
```

## Step 2: Install Dependencies

```bash
npm install
```

This installs Astro and other tools needed to build and preview your blog locally.

## Step 3: Open in VS Code

```bash
code .
```

Or open VS Code manually and select "File → Open Folder" and choose the `Personal-blog` directory.

## Step 4: Install Recommended Extensions

VS Code will automatically prompt you to install recommended extensions. Click "Install All" or install individually:

### Essential Extensions

| Extension | Purpose |
|-----------|---------|
| **Front Matter CMS** (`estruyf.front-matter`) | Visual editing interface for your blog posts |
| **Markdown All in One** (`yzhang.markdown-all-in-one`) | Markdown editing with preview and shortcuts |
| **Prettier** (`esbenp.prettier-vscode`) | Auto-format code and markdown on save |
| **Code Spell Checker** (`streetsidesoftware.code-spell-checker`) | Catch typos in your writing |
| **Astro** (`astro-build.astro-vscode`) | Syntax highlighting for Astro files |
| **GitHub Theme** (`github.github-vscode-theme`) | Beautiful GitHub light/dark theme |
| **Git Graph** (`mhutchie.git-graph`) | Visualize your git commits |

To install manually:
1. Click the Extensions icon in the left sidebar (or Cmd+Shift+X)
2. Search for the extension name
3. Click "Install"

## Step 5: Start Using Front Matter CMS

### Open the Front Matter Panel

1. Look for the **Front Matter icon** in the left sidebar (it looks like a document with lines)
2. Click it to open the Front Matter CMS panel
3. You should see a "Create New" button

### Create a New Blog Post

1. In the Front Matter panel, click **"Create New"**
2. Select **"Blog Post"** from the content type dropdown
3. A form will appear with fields for:
   - **Title** - Your post title
   - **Author** - Defaults to "Erfan Bashar"
   - **Publish Date** - When the post should go live
   - **Modify Date** - Last edit date (leave blank initially)
   - **Description** - Brief summary for search/feeds
   - **Featured** - Check to feature on homepage
   - **Draft** - Keep checked while writing
   - **Tags** - Add relevant tags

4. Fill in the metadata fields
5. Click **"Create"** - A new markdown file is created in `src/data/blog/`

### Write Your Post

The file opens in the editor with the frontmatter at the top and body below.

**Markdown formatting:**
- `# Heading` for titles
- `## Heading 2` for sections
- `**bold**` for bold text
- `*italic*` for italic text
- `` `code` `` for inline code
- Three backticks for code blocks:
  ````markdown
  ```javascript
  const hello = "world";
  ```
  ````
- `[Link text](https://example.com)` for links
- `- Item` for bullet lists
- `1. Item` for numbered lists

### Preview Your Post

1. Open the markdown file
2. Press **Cmd+K** then **V** (or right-click → "Open Preview")
3. VS Code shows a live preview of your rendered markdown

### Save Your Work

**Auto-save is enabled**, but you can also manually save with Cmd+S.

The file is automatically formatted with Prettier when you save.

## Step 6: Publishing Your Post

### To Publish a Post:

1. Open your blog post markdown file in VS Code
2. At the top, you'll see the frontmatter (YAML section between the `---` lines)
3. Change `draft: true` to `draft: false`
4. Leave `pubDatetime` as your publication date
5. Save the file (Cmd+S)

### Push to GitHub:

After publishing, push your changes:

```bash
git add .
git commit -m "Publish new blog post: [Your Post Title]"
git push
```

Or use the Git panel in VS Code:
1. Click the **Source Control** icon in the left sidebar (or Cmd+Shift+G)
2. Review your changes
3. Enter a commit message like "Publish: My New Post"
4. Click the checkmark to commit
5. Click the arrow icon to push

### Automatic Deployment

Once you push to GitHub:
1. GitHub Actions automatically builds your site (2-3 minutes)
2. Your post appears live at https://erfanbashar1.github.io/Personal-blog/
3. The post is automatically added to the homepage

## Step 7: Local Preview (Optional)

To see how your blog looks locally before publishing:

```bash
npm run dev
```

Your blog will be available at `http://localhost:3000/Personal-blog/`

Press Ctrl+C in the terminal to stop the server.

## Editing Existing Posts

1. In the Front Matter panel, find your post in the **Recent Files** or **All Posts** section
2. Click it to open
3. Make your changes
4. Save (Cmd+S) - Prettier auto-formats
5. Commit and push via Git

## File Structure

Your blog content is organized as:

```
Personal-blog/
├── src/
│   ├── data/
│   │   └── blog/
│   │       ├── your-first-post.md
│   │       ├── another-post.md
│   │       └── ... more posts
│   └── pages/
└── public/
```

Each `.md` file in `src/data/blog/` is a blog post.

## Markdown Template Reference

Every blog post uses this structure:

```yaml
---
author: Erfan Bashar
pubDatetime: 2024-11-20T00:00:00Z
modDatetime:
title: Your Blog Post Title
slug: your-slug-here
featured: false
draft: true
tags:
  - technology
  - web
description: A brief description that appears in search results and feeds.
---

## Your Post Content

Write your blog post content here in markdown.
```

## Keyboard Shortcuts in VS Code

| Shortcut | Action |
|----------|--------|
| Cmd+S | Save file |
| Cmd+Shift+G | Open Source Control (Git) |
| Cmd+K Cmd+V | Preview markdown in split view |
| Cmd+Shift+X | Open Extensions |
| Cmd+B | Toggle sidebar |
| Ctrl+` | Toggle integrated terminal |

## Troubleshooting

**"I don't see the Front Matter icon"**
- Make sure you installed the Front Matter CMS extension
- Reload VS Code (Cmd+R)
- Check the Extensions panel to confirm it's installed

**"Front Matter says 'No content folder configured'"**
- Close and reopen VS Code
- The `.vscode/settings.json` file has the configuration
- Verify you're in the correct project folder

**"My post isn't showing on the live blog"**
1. Make sure `draft: false` in the frontmatter
2. Check `pubDatetime` is in the past
3. Verify you pushed to GitHub with `git push`
4. Wait 2-3 minutes for GitHub Actions to build
5. Hard-refresh your browser (Cmd+Shift+R)

**"Git commands aren't working"**
- Ensure you're in the project directory: `cd Personal-blog`
- Check git is installed: `git --version`
- Verify your GitHub SSH key is set up or use GitHub CLI

## Next Steps

1. ✅ VS Code installed and configured
2. ✅ Front Matter CMS set up
3. ✅ Created first blog post
4. Push to GitHub
5. Verify post appears on live blog
6. Continue writing and sharing your thoughts!

## Pro Tips

- **Use tags consistently** - Makes it easier to categorize posts
- **Write draft posts** - Keep `draft: true` while writing, publish when ready
- **Use descriptive slugs** - Make post URLs readable and SEO-friendly
- **Feature your best posts** - Set `featured: true` for posts you want highlighted
- **Commit frequently** - Make small commits with descriptive messages
- **Review before publishing** - Use local preview (`npm run dev`) to check formatting

## Command Reference

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Git commands
git status          # See what changed
git add .          # Stage all changes
git commit -m "message" # Create commit
git push           # Push to GitHub
```

## Resources

- [Front Matter CMS Docs](https://frontmatter.codes/)
- [VS Code Documentation](https://code.visualstudio.com/docs)
- [Markdown Guide](https://www.markdownguide.org/)
- [Astro Documentation](https://docs.astro.build/)
- [Git Documentation](https://git-scm.com/doc)

---

Happy writing! Your blog setup is complete. Start creating posts with Front Matter and pushing them to GitHub. Your changes will be live in minutes!

# Quick Start - Front Matter CMS Setup Complete ✅

All extensions have been installed and VS Code is open with your Personal Blog project!

## What's Ready:

✅ **Front Matter CMS** (v10.9.0) - Visual blog editor
✅ **Markdown All in One** (v3.6.3) - Markdown support with preview
✅ **Prettier** (v11.0.0) - Auto-formatting on save
✅ **Code Spell Checker** (v4.3.2) - Catch typos
✅ **GitHub Theme** (v6.3.5) - Beautiful theme
✅ **Git Graph** (v1.30.0) - Visualize git commits
✅ **Path Autocomplete** (v1.25.0) - Faster file navigation
✅ **Astro** - Syntax highlighting

## Next Step: Create Your First Blog Post

### Option A: Using Front Matter CMS (Visual Editor)

1. Look at the **left sidebar** in VS Code
2. Find the **Front Matter icon** (looks like a document with lines)
3. Click it to open the Front Matter panel
4. Click the **"Create new"** button
5. Select **"Blog Post"** from the dropdown
6. Fill in:
   - **Title** - Your post title
   - **Description** - Brief summary
   - **Publish Date** - When to publish
   - Other metadata as desired
7. Click **"Create"** - File opens in editor
8. Write your post in markdown
9. Save with Cmd+S (Prettier auto-formats)

### Option B: Use the Template Directly

1. Open `templates/blog-post-template.md`
2. Copy its content
3. Create a new file in `src/data/blog/your-post-title.md`
4. Paste the template
5. Edit the frontmatter and content
6. Save with Cmd+S

## Publishing Your Post

Once you've written your post:

1. Open the markdown file
2. Find `draft: true` in the frontmatter (top section)
3. Change it to `draft: false`
4. Save the file

Then push to GitHub:

```bash
git add .
git commit -m "Publish: Your Post Title"
git push
```

Or use VS Code's Git interface:
- Click **Source Control** icon in left sidebar
- Review changes
- Enter commit message
- Click checkmark to commit
- Click arrows to push

## View Your Blog Locally (Optional)

Before publishing, preview your blog:

```bash
npm run dev
```

Visit `http://localhost:3000/Personal-blog/` in your browser

Press Ctrl+C to stop the server

## Helpful Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Cmd+S | Save file |
| Cmd+Shift+G | Open Git panel |
| Cmd+K Cmd+V | Preview markdown |
| Cmd+Shift+X | Open Extensions |
| Cmd+B | Toggle sidebar |

## Common Tasks

**Edit existing post:**
- Click "All Files" in Front Matter panel
- Find your post
- Click to open
- Make changes
- Save (Cmd+S)
- Commit and push

**Add tags to posts:**
- In Front Matter editor, find the "Tags" field
- Type tag name and press Enter
- Multiple tags supported

**Feature a post on homepage:**
- Change `featured: false` to `featured: true` in frontmatter
- Save and commit

**Change publication date:**
- Edit `pubDatetime` in frontmatter
- Format: `YYYY-MM-DDTHH:MM:SSZ`

## If Front Matter Icon Doesn't Show

1. Reload VS Code: Cmd+R
2. Check Extensions: Cmd+Shift+X
3. Search for "front matter"
4. Should see "Front Matter CMS" version 10.9.0
5. If not installed, click Install

## Your Blog is Live At:

**https://erfanbashar1.github.io/Personal-blog/**

Changes take 2-3 minutes to deploy after you push to GitHub.

## Need Help?

- [Front Matter CMS Docs](https://frontmatter.codes/docs)
- [VS Code Setup Guide](VS_CODE_SETUP.md)
- [Blog Template](templates/blog-post-template.md)
- [GitHub Repository](https://github.com/erfanbashar1/Personal-blog)

---

You're all set! Start creating blog posts with Front Matter CMS. Enjoy! 🚀

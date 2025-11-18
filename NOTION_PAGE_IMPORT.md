# Import Single Notion Page - Quick Guide

Use this for importing individual Notion pages (no database required).

## Setup (One Time)

✅ Already done! You have:
- Notion API token in `.env.local`
- Import script ready to use

## Get Your Page ID

### Method 1: From Notion URL (Easiest)

1. **Open your Notion page** in the browser
2. **Look at the URL**:
   ```
   https://www.notion.so/Your-Page-Title-a1b2c3d4e5f6g7h8i9j0k1l2m3n?pvs=4
                                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                      This is your PAGE_ID
   ```

3. **Copy the ID** (the long string without hyphens)
   - Example: `a1b2c3d4e5f6g7h8i9j0k1l2m3n`

### Method 2: Share with Integration First

1. **Open your Notion page**
2. **Click share button** (top right)
3. **Click "Invite"**
4. **Search** for your integration (e.g., "Personal Blog Importer")
5. **Add it** and confirm

This allows the integration to access the page.

## Import the Page

```bash
npm run import:notion:shared <PAGE_ID> "Your Page Title"
```

### Example:

```bash
npm run import:notion:shared a1b2c3d4e5f6g7h8i9j0k1l2m3n "My Awesome Article"
```

## What Happens

✅ Connects to Notion
✅ Fetches your page content
✅ Converts to Markdown
✅ Adds Front Matter metadata
✅ Saves to `src/data/blog/`
✅ Sets `draft: true` (you review first)

### Example Output:

```
🚀 Importing Notion page (with shared link)...

✅ Page title: "My Awesome Article"

📝 Converting to markdown...
✅ Conversion successful

📄 Creating blog post file...
✅ Created: my-awesome-article.md

==================================================
✨ Import Complete!
   Title: My Awesome Article
   File: my-awesome-article.md
   Status: Draft (draft: true)
==================================================
```

## Review Your Import

### In VS Code

1. **Open** `src/data/blog/my-awesome-article.md`
2. **Check** the Front Matter (YAML at the top)
3. **Review** the content for formatting issues
4. **Edit** as needed

### In Front Matter CMS

1. **Open Front Matter CMS** in VS Code sidebar
2. **Find** your imported post
3. **Click** to preview
4. **Edit** metadata (title, tags, description)
5. **Change** `draft: false` to publish

## Import Multiple Pages

Run the command for each page:

```bash
npm run import:notion:shared a1b2c3d4e5f6g7h8i9j0k1l2m3n "First Post"
npm run import:notion:shared b2c3d4e5f6g7h8i9j0k1l2m3n0 "Second Post"
npm run import:notion:shared c3d4e5f6g7h8i9j0k1l2m3n0p1 "Third Post"
```

## Troubleshooting

### ❌ "No page ID provided"

**Solution**: You forgot to add the page ID

```bash
# Wrong:
npm run import:notion:shared

# Correct:
npm run import:notion:shared a1b2c3d4e5f6g7h8i9j0k1l2m3n "Page Title"
```

### ❌ "Error retrieving page"

**Solutions**:
1. Make sure you shared the page with your integration
2. Check the page ID is correct (copy from URL)
3. Verify your API token in `.env.local` is correct

### ❌ "File already exists"

**Solution**: Delete the old file first

```bash
rm src/data/blog/old-post.md
npm run import:notion:shared a1b2c3d4e5f6g7h8i9j0k1l2m3n "Page Title"
```

### Markdown looks weird

Some Notion formatting may not convert perfectly:
- Edit manually in VS Code
- Preview in Front Matter CMS
- Use standard Markdown syntax

## Tips

1. **Always provide the page title** for best results
2. **Copy the page ID carefully** (very long string)
3. **Check the output** for any error messages
4. **Review in Front Matter CMS** before publishing
5. **Start with one page** to test the process

## Setup Instructions (First Time Only)

### 1. Create a Notion Integration

1. Go to: https://www.notion.so/my-integrations
2. Click: "+ New integration"
3. Name: "Personal Blog Importer"
4. Submit
5. Copy: "Internal Integration Token"

### 2. Update .env.local

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and paste your token:

```env
NOTION_API_KEY=your_token_here
```

### 3. Share Pages with Integration

When you want to import a page:
1. Open the Notion page
2. Click share button
3. Add your integration
4. Confirm

### That's it! Ready to import 🚀

## Quick Command Reference

```bash
# Import a single Notion page
npm run import:notion:shared <PAGE_ID> "Page Title"

# Build blog (after importing)
npm run build

# Preview locally
npm run dev
```

---

**Need help?** Check the error message output - it usually tells you what's wrong!

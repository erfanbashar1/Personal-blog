# Sanity.io Setup Guide for Your Blog

Your blog is now integrated with Sanity.io! This guide walks you through completing the setup.

## What is Sanity?

Sanity is a headless CMS that provides:
- Beautiful visual editor for writing blog posts
- Reliable cloud hosting
- API access for your Astro blog
- Automatic deployments via webhooks

## Step 1: Create Your API Token

1. Go to your Sanity project dashboard:
   https://sanity.io/manage/t0k6d7ki

2. Click **Settings** (gear icon in top left)

3. Go to **API** tab

4. Click **Add API token**

5. Create a token:
   - **Name**: `Blog Reader`
   - **Role**: Select `Viewer` (read-only is fine for your use case)
   - Click **Save**

6. **Copy the token** - you won't see it again!

## Step 2: Add Token to Your Project

1. Open `.env.local` in your project root

2. Replace `your_token_here` with the token you just copied:
   ```
   SANITY_API_TOKEN=your_actual_token_here
   ```

3. Save the file

4. **Never commit this file** - it's in `.gitignore` for security

## Step 3: Test the Connection

Run this command locally to test:
```bash
npm run build
```

If successful, you should see no errors about Sanity configuration.

## Step 4: Access Your Editor

Your Sanity Studio is accessible at:
**https://sanity.io/desk**

Or directly at:
**https://sanity.io/projects/t0k6d7ki/desk**

## Step 5: Create Your First Blog Post

1. Go to Sanity Studio
2. In the left sidebar, click **Blog Posts**
3. Click **Create** or **+** button
4. Fill in:
   - **Title** - Your post title
   - **Slug** - Auto-generated from title
   - **Author** - (defaults to "Erfan Bashar")
   - **Description** - Brief summary
   - **Publish Date** - When to publish
   - **Featured** - Check to feature on homepage
   - **Draft** - Uncheck when ready to publish
   - **Tags** - Add relevant tags
   - **Content** - Write your post (rich text editor)
5. Click **Publish**

## Step 6: Deploy Your Blog

Once you publish a post in Sanity:

1. Your local build will fetch the post
2. Push to GitHub
3. GitHub Actions will build and deploy automatically
4. Your post appears live on your blog

## Step 7: Set Up Webhooks (Optional but Recommended)

For automatic rebuilds when you publish:

1. Go to Sanity project settings: https://sanity.io/manage/t0k6d7ki
2. Click **API** → **Webhooks**
3. Add a new webhook:
   - **Name**: `GitHub Rebuild`
   - **URL**: `https://api.github.com/repos/erfanbashar1/Personal-blog/dispatches`
   - **Trigger on**: Select `Publish` for document type `post`
   - **HTTP Headers**:
     - `Authorization: token YOUR_GITHUB_PAT`
     - `Accept: application/vnd.github.everest-preview+json`
   - **Body**:
     ```json
     {
       "event_type": "sanity-publish"
     }
     ```

Then add this to your GitHub Actions workflow to handle the webhook.

**Actually**, for now, just:
1. Publish post in Sanity
2. Manually push to GitHub
3. GitHub Actions builds automatically

We can add webhooks later if you want true auto-deploy.

## Content Editor Features

### Rich Text Editor
- **Bold, Italic, Code** - Click formatting buttons
- **Headings** - Change block style dropdown
- **Lists** - Bullet and numbered lists
- **Links** - Highlight text, click link button
- **Images** - Add images directly
- **Code Blocks** - Insert highlighted code

### Metadata
- **Tags**: Type and press Enter to add multiple tags
- **Dates**: Click date fields for calendar picker
- **Featured**: Toggle checkbox to feature on homepage
- **Draft**: Keep checked while writing, uncheck to publish

## Blog Publishing Workflow

### For Writing:
1. Open Sanity Studio
2. Create new post, keep as **Draft**
3. Write and save regularly (auto-saves)
4. Preview in real-time

### For Publishing:
1. Finish writing
2. Uncheck **Draft** checkbox
3. Click **Publish**
4. In your terminal: `git push`
5. GitHub Actions builds (2-3 minutes)
6. Post appears live!

### For Editing:
1. Go to Sanity Studio
2. Find post in Blog Posts list
3. Edit and save
4. Push to GitHub to update live site

## Environment Variables

```env
# Public (safe to commit)
PUBLIC_SANITY_PROJECT_ID=t0k6d7ki
PUBLIC_SANITY_DATASET=production

# Secret (DO NOT COMMIT - in .env.local)
SANITY_API_TOKEN=your_token_here
```

## Troubleshooting

**"Cannot fetch posts" error?**
- Check `SANITY_API_TOKEN` is correct in `.env.local`
- Verify token has `Viewer` role
- Token might be invalid - create a new one

**Posts not appearing?**
- Make sure draft is **unchecked**
- Verify you clicked **Publish**
- Wait a moment for sync
- Push to GitHub to trigger build

**Editor looks broken?**
- Clear browser cache
- Try incognito/private window
- Check you're logged into Sanity

**"This project has no dataset"?**
- This is normal - Sanity auto-creates the dataset on first use

## Next Steps

1. ✅ Create API token
2. ✅ Add to `.env.local`
3. ✅ Access Sanity Studio
4. ✅ Create first post
5. Push to GitHub
6. Verify post appears on your blog

## Important Security Notes

🔒 **Keep your API token private!**
- Never share it
- Don't commit `.env.local` to Git (it's in `.gitignore`)
- If you leak it, create a new token immediately

## Useful Links

- **Sanity Dashboard**: https://sanity.io/manage/t0k6d7ki
- **Sanity Studio**: https://sanity.io/desk
- **Sanity Docs**: https://www.sanity.io/docs
- **Your Blog**: https://erfanbashar1.github.io/Personal-blog/
- **GitHub Repo**: https://github.com/erfanbashar1/Personal-blog

## Support

- Sanity Support: https://www.sanity.io/contact/support
- Astro Docs: https://docs.astro.build/
- GitHub Help: https://docs.github.com/

---

You're all set! Start writing at https://sanity.io/desk

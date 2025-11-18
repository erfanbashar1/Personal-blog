# Netlify CMS Setup - GitHub Personal Access Token

Your CMS is ready! To use it, you need a **GitHub Personal Access Token**.

## How to Create Your Token

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/tokens/new
   - Or: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Create New Token**
   - Token name: `Personal Blog CMS`
   - Expiration: Choose "No expiration" or set a date
   - Scopes: Select **`repo`** (this gives full access to your repositories)

3. **Generate & Copy**
   - Click "Generate token"
   - **⚠️ Copy the token immediately** - you won't see it again!
   - Keep it safe

## How to Login to Your CMS

1. **Open the Admin Panel**
   - Visit: https://erfanbashar1.github.io/Personal-blog/admin/

2. **Enter Your Credentials**
   - **Username**: `erfanbashar1` (your GitHub username)
   - **Password**: Paste your Personal Access Token
   - Click "Login"

3. **You're In!**
   - You can now create and edit blog posts
   - Changes automatically commit to GitHub and deploy

## Creating a Blog Post

1. Click **"New Blog Posts"** button
2. Fill in:
   - **Title** - Your post title
   - **Author** - (defaults to your name)
   - **Description** - Brief summary
   - **Publish Date** - When to publish
   - **Featured** - Check to feature on homepage
   - **Draft** - Check to save as draft
   - **Tags** - Add relevant tags
   - **Post Content** - Write your post in markdown

3. Click **"Publish"**
4. GitHub automatically commits and deploys (2-3 minutes)

## Important Security Notes

🔒 **Keep your token private!**
- Never share your token with anyone
- Never commit it to your repository
- If you accidentally leak it, immediately delete it: https://github.com/settings/tokens

🔄 **Token Management**
- You can create multiple tokens for different purposes
- Tokens can be revoked anytime
- Set an expiration date for security

💾 **Store Safely**
- Use a password manager (1Password, Bitwarden, etc.)
- Don't write it down
- Don't share it via email/chat

## Troubleshooting

**"Login failed" error?**
- Make sure you copied the entire token
- Check username is correct (erfanbashar1)
- Try creating a new token if old one is invalid

**"Cannot push to repository" error?**
- Token might have expired - create a new one
- Check token has `repo` scope
- Verify token wasn't accidentally revoked

**Posts not appearing?**
- Wait 2-3 minutes for GitHub Actions to build
- Check GitHub Actions tab for errors: https://github.com/erfanbashar1/Personal-blog/actions
- Try publishing again

**Token not working anymore?**
- Go to https://github.com/settings/tokens
- Delete the old token
- Create a new one
- Update CMS with new token

## Advanced: Multiple Tokens

Create different tokens for different uses:
- One for CMS editing
- One for local development
- Rotate them periodically

Each can have limited permissions for better security.

## Need Help?

- **Netlify CMS Docs**: https://v2-docs.netlifycms.org/
- **GitHub Token Docs**: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
- **GitHub Actions**: https://github.com/erfanbashar1/Personal-blog/actions (check deployment status)

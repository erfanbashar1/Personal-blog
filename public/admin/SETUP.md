# Netlify CMS Setup for GitHub Pages

Your CMS is now running! However, to complete authentication, you need to set up GitHub access.

## Option 1: Use GitHub Personal Access Token (Recommended for GitHub Pages)

This is the simplest method for GitHub Pages hosting.

### Steps:

1. **Create a GitHub Personal Access Token**
   - Go to: https://github.com/settings/tokens/new
   - Give it a name: "Personal Blog CMS"
   - Select these scopes:
     - `repo` (full control of private repositories)
     - `public_repo` (access to public repositories)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

2. **Use the token in the CMS**
   - Go back to https://erfanbashar1.github.io/Personal-blog/admin/
   - You should see a login prompt asking for GitHub credentials
   - Paste your Personal Access Token as the password
   - Use any username (it's not validated)

3. **You're logged in!**
   - You can now create and edit blog posts
   - Changes are automatically committed to your GitHub repository

---

## Option 2: Deploy to Netlify for Better OAuth (Advanced)

If you want a more polished authentication experience without tokens, you can:

1. Deploy your site to Netlify
2. Configure OAuth through Netlify's identity service
3. Users login seamlessly with GitHub

This requires moving hosting from GitHub Pages to Netlify.

---

## Troubleshooting

**"Cannot read properties of null" error?**
- Clear your browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Try a different browser
- Check that you're using the correct token

**Token not working?**
- Make sure you copied the full token
- Token might have expired - create a new one
- Check that the token has `repo` scope

**Changes not saving?**
- Verify your token has write permissions
- Check your GitHub repository settings
- Ensure the repository is public or your token has access

---

## Security Notes

- **Never share your Personal Access Token**
- If you accidentally commit it, regenerate it immediately: https://github.com/settings/tokens
- Consider creating a separate GitHub account for your blog if this is sensitive content
- Tokens can be revoked anytime at https://github.com/settings/tokens

---

## Need Help?

- Netlify CMS Docs: https://v2-docs.netlifycms.org/
- GitHub Docs: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

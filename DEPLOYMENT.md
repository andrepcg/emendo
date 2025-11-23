# Deployment Guide

## Prerequisites

1. **GitHub Repository**
   - Create a repository and push your code
   - Enable GitHub Actions in repository settings

2. **Cloudflare Account**
   - Sign up at https://cloudflare.com
   - Get Turnstile keys at https://dash.cloudflare.com/turnstile

3. **GitHub Personal Access Token**
   - Go to https://github.com/settings/tokens
   - Create a token with `repo` scope
   - Save it securely

## Cloudflare Pages Deployment

### Step 1: Connect Repository

1. Go to Cloudflare Dashboard → Pages
2. Click "Create a project"
3. Connect your GitHub account
4. Select your `emendo` repository

### Step 2: Configure Build Settings

- **Framework preset:** Next.js
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Node version:** 18 or higher

### Step 3: Environment Variables

Add these environment variables in Cloudflare Pages settings:

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
GITHUB_REPO_OWNER=your_github_username
GITHUB_REPO_NAME=emendo
GITHUB_TOKEN=your_github_personal_access_token
```

### Step 4: Deploy

Click "Save and Deploy". Your site will be built and deployed automatically.

## Submission Handler Options

### Option 1: Direct GitHub PR (Recommended)

Uses the default `/functions/api/submit.js` which creates PRs directly.

**Pros:**
- Faster
- Direct integration
- No additional setup needed

**Cons:**
- More complex error handling

### Option 2: GitHub Actions via Dispatch

Uses `/functions/api/submit-alt.js` which triggers a GitHub Action.

**To use this option:**

1. Rename files:
   ```bash
   mv functions/api/submit.js functions/api/submit-direct.js
   mv functions/api/submit-alt.js functions/api/submit.js
   ```

2. The GitHub Action workflow is already set up in `.github/workflows/process-submission.yml`

**Pros:**
- More flexible
- Better for complex workflows
- Easier to debug

**Cons:**
- Slightly slower
- Requires GitHub Actions enabled

## Post-Deployment

### 1. Test Turnstile

For testing, you can use Cloudflare's test keys:
- Site Key: `1x00000000000000000000AA` (always passes)
- Secret Key: `1x0000000000000000000000000000000AA`

### 2. Test Submission

1. Go to your deployed site
2. Click "Reportar"
3. Fill out the form
4. Submit
5. Check GitHub for a new pull request

### 3. Review Process

When a submission PR is created:
1. Review the submission content
2. Check for spam or inappropriate content
3. Merge to publish the submission
4. Site will automatically rebuild

## Automatic Rebuilds

Cloudflare Pages will automatically rebuild your site when:
- Code is pushed to the main branch
- A PR is merged (including submission PRs)

## Custom Domain (Optional)

1. In Cloudflare Pages, go to your project
2. Go to "Custom domains"
3. Add your domain
4. Update DNS settings as instructed

## Monitoring

- **Cloudflare Pages Dashboard:** Monitor builds and deployments
- **GitHub Actions:** Monitor submission processing
- **Cloudflare Analytics:** Track site traffic

## Troubleshooting

### Build Failures

Check:
- Node version is 18+
- All dependencies are in `package.json`
- Environment variables are set

### Submission Failures

Check:
- Turnstile keys are correct
- GitHub token has `repo` scope
- Repository name and owner are correct

### 404 Errors

Ensure:
- Build output directory is set to `out`
- Next.js config has `output: 'export'`

## Security Notes

1. **Never commit `.env.local`** - Use environment variables in CF Pages
2. **Rotate tokens regularly** - Change GitHub token periodically
3. **Review submissions** - Always review PRs before merging
4. **Rate limiting** - Consider adding rate limiting to the CF Function

## Support

For issues, open a ticket on the GitHub repository.


# Deploying Stampede to Cloudflare Pages

Production lives at **https://urbansafari.app**, served from the Cloudflare Pages project `urbansafari-site`. Deploys run automatically via GitHub Actions on every push to `main`.

## How a deploy happens

1. Push to `main` on `git-lucky/urbansafari-site`.
2. `.github/workflows/deploy.yml` runs:
   - `pnpm install --frozen-lockfile`
   - `pnpm build` (Astro → `dist/`)
   - `cloudflare/wrangler-action@v3` → `wrangler pages deploy dist --project-name=urbansafari-site`
3. Cloudflare rolls `dist/` out to the edge. `urbansafari.app` updates within ~30s of the workflow turning green.

Watch runs: **https://github.com/git-lucky/urbansafari-site/actions**

## Why not Cloudflare's Git integration?

The Pages project was originally created as a **direct-upload** project, and Cloudflare does not allow direct-upload projects to be retroactively connected to Git. Recreating the project to enable Git integration would force re-attaching the three custom domains (brief DNS churn). Running Wrangler from GitHub Actions is the equivalent pattern and keeps the existing project intact.

## Required secrets

Stored at `https://github.com/git-lucky/urbansafari-site/settings/secrets/actions`:

| Secret | Purpose |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with **Account → Cloudflare Pages → Edit** scope. Prefer an account-owned token (survives staff changes) over a user token. |
| `CLOUDFLARE_ACCOUNT_ID` | `22c1e6fec596e2cd6decb53230fbc518` — identifies which Cloudflare account to deploy into. |

Rotate the API token at `https://dash.cloudflare.com/profile/api-tokens` (user-owned) or the account API Tokens page (account-owned). Update the GitHub secret with the new value; no other code changes required.

## Manual re-deploy

Without pushing code:

- **From GitHub UI** — Actions tab → *Deploy to Cloudflare Pages* → *Run workflow* → branch `main` → *Run workflow*.
- **From local, bypassing CI** (emergency only):
  ```bash
  pnpm build
  CLOUDFLARE_API_TOKEN=... pnpm dlx wrangler pages deploy dist --project-name urbansafari-site --branch main
  ```

## Local sanity check before pushing

```bash
pnpm install
pnpm build       # must succeed; identical command CI runs
pnpm preview     # serves ./dist locally on :4321 or similar
```

If `pnpm build` fails locally, CI will fail the same way.

## Custom domain

`urbansafari.app` (apex + `www`) is already attached to the Pages project. To change or add a domain: Cloudflare dashboard → `urbansafari-site` → **Custom domains** → *Set up a custom domain*. Cloudflare auto-creates DNS records when the zone is on Cloudflare.

## Troubleshooting

- **Workflow red, `pnpm install` failed with frozen-lockfile error** — lockfile drift. Run `pnpm install` locally, commit the updated `pnpm-lock.yaml`, push.
- **Workflow red, wrangler step says `Authentication error`** — API token is missing, revoked, or lacks *Cloudflare Pages Edit*. Check the secret, rotate the token if needed.
- **Workflow green, site still shows old content** — Cloudflare edge cache. Hard-refresh the browser. If it persists, purge the cache: Cloudflare dashboard → *Caching* → *Configuration* → *Purge Everything*.
- **GitHub Actions shows a `pages-build-deployment` run alongside ours** — GitHub Pages auto-builder is enabled on the repo (legacy). Disable via `gh api -X DELETE /repos/git-lucky/urbansafari-site/pages` or repo Settings → Pages → Source: None.

## Verify a deploy

```bash
curl -sI https://urbansafari.app | grep -iE 'HTTP|server'          # 200, server: cloudflare
curl -s  https://urbansafari.app | grep -o '<meta name="generator"[^>]*>'  # confirms Astro version
curl -sI https://urbansafari.app/img/atlas-flag.webp | head -2   # 200 + content-type: image/webp
```

# Deploying the Stampede site

Repository: `git-lucky/stampede-site` (renamed from `urbansafari-site` in October 2026; GitHub redirects the old URL).

Production is **https://stampede.quest** (and `www`), served by the Cloudflare Pages project
`stampede-site` in Tim@itsybits.io's Cloudflare account (`stampede-site-7rx.pages.dev`).

## How a deploy happens

Merge to `main`, then run the workspace ship script, which builds exactly `origin/main` and publishes it
with Wrangler's OAuth login:

```bash
SHIP_WHO=<your name> bash /Users/timthyme/Developer/Huntstack/.passport-orchestration/ship/site.sh
```

It ends with "live at …" once the site serves the new build. GitHub Actions (`.github/workflows/deploy.yml`)
only builds, on every push and pull request; it deploys nothing.

`stampede-site` is a direct-upload project, so Cloudflare's Git integration can't be attached to it. To
deploy from Actions again, add an account API token with **Cloudflare Pages → Edit** for Tim's account as
the `CLOUDFLARE_API_TOKEN` secret, set `CLOUDFLARE_ACCOUNT_ID` to `fdf0ad345bac9095c8304391f1cf47f4`, and
restore a `wrangler pages deploy dist --project-name=stampede-site` step.

## The old address

`urbansafari.app` and `www.urbansafari.app` 301 to the same path on `stampede.quest` through a Cloudflare
Redirect Rule in the urbansafari.app zone (Mike's Cloudflare account), kept for twelve months from October
2026. The old Pages project there, `urbansafari-site`, no longer receives deploys.

## Verify a deploy

```bash
curl -sI https://stampede.quest | grep -iE 'HTTP|server'          # 200, server: cloudflare
curl -s  https://stampede.quest | grep -o '<meta name="generator"[^>]*>'
curl -sI https://urbansafari.app/plan/ | grep -iE 'HTTP|location' # 301 → https://stampede.quest/plan/
```

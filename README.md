<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Pmbb2vNZenU5cJuybwoQaq9XwL72k1PK

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

1. Push to `main` (the workflow in `.github/workflows/deploy.yml` builds and deploys).
2. In GitHub repo settings: **Pages** -> **Source** -> **GitHub Actions**.
3. Your site will be at `https://<user>.github.io/20251218-AIstudio-RotatingDashboard/`.

If you use a different repo name or custom domain, set `VITE_BASE` in `.env.production`.

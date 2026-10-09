# OB/GYN Master

A responsive educational study companion for 30 core obstetrics and gynecology topics.

## Included in this starter version
- 30 topic cards organized into Obstetrics and Gynecology
- Search and category filters
- Topic study cards with overview, learning objectives, and high-yield reminders
- Save topics and mark topics as studied (saved locally in the browser)
- Responsive layout for mobile, tablet, and desktop

> Medical safety: this is an educational starter, not a clinical decision-support system. Add and verify detailed medical content against current authoritative guidance before clinical use.

## Easiest route: upload this project to GitHub in your browser

1. Open https://github.com/new
2. Repository name: `obgyn-master`
3. Choose **Public** (needed for the simplest free GitHub Pages setup), then click **Create repository**.
4. On the empty repository page, choose **uploading an existing file**.
5. Unzip this downloaded project on your device, then upload the *contents* of the `obgyn-master` folder (not the outer zip).
6. Click **Commit changes**.

## Publish the app (GitHub Pages)

This project uses Vite. The easiest reliable publishing method is GitHub Actions:

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Add a workflow file at `.github/workflows/deploy.yml` with the contents below.
4. Commit the file. Open **Actions** and wait for the deployment workflow to finish.
5. Your app URL will be `https://YOUR-GITHUB-USERNAME.github.io/obgyn-master/`.

### Workflow file

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy OB/GYN Master
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Run locally (optional)
Requires Node.js. In this folder:
```bash
npm install
npm run dev
```

## Customize
- Topic titles and learning content are in `src/main.jsx`.
- Visual styling is in `src/style.css`.
- The app is in English by design.

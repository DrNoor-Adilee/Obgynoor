# OB/GYN Master — Complete Starter Project

A responsive React + Vite educational study companion with 30 obstetrics and gynecology topic modules, searchable navigation, category filters, progress tracking, key-point review, and interactive flashcards.

## Render Static Site settings
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment variables: none required

## Run locally
```bash
npm install
npm run dev
```

## Project structure
- `index.html` — app entry
- `package.json` — scripts and dependencies
- `vite.config.js` — Vite/React configuration
- `src/main.jsx` — application interface and interactions
- `src/styles.css` — responsive styling
- `src/topics.js` — 30 topic modules with learning objectives and flashcards

## Hosting note
This configuration uses the root path and is suitable for Render Static Sites. If using GitHub Pages at `https://USERNAME.github.io/obgyn-master/`, configure `base: '/obgyn-master/'` in `vite.config.js` before building for that host.

## Educational note
The included topic summaries and flashcards are introductory revision prompts, not a complete clinical reference or a substitute for current guidelines, local protocols, textbooks, or supervision. Verify clinical decisions and medication dosing with authoritative current sources.

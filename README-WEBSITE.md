# Portfolio Website

A responsive static portfolio website for Code Fuxion, built with semantic HTML, CSS and vanilla JavaScript.

## Preview locally

You can open `index.html` directly in a browser, or run a local static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy with GitHub Pages

A GitHub Actions workflow is included at `.github/workflows/pages.yml`. To activate deployment:

1. Open the repository **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Open the **Actions** tab and allow the workflow to complete.
4. The published site should be available at `https://codefuxion.github.io/codefuxion/`.

The deployment workflow runs on pushes to `main` and can also be started manually.

## Customize

- Update project descriptions in `index.html` and `PROJECTS.md`.
- Edit visual styling in `styles.css`.
- Change navigation behavior in `script.js`.
- Replace `assets/banner.svg` and `assets/favicon.svg` with approved brand artwork if desired.

## Accuracy and privacy

Only add verified skills, deployed product links, client testimonials, certifications, and contact details. Do not add API keys, credentials, customer records, or confidential project material.

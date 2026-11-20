# Orca AI website

Marketing site for **Orca AI**: automation solutions, AI integrations, AI workflows, and AI agents and chatbots embedded across a company's ecosystem.

Live: https://shadymayez.github.io/orca-ai/

## Stack

Plain static HTML, CSS and JavaScript with no build step, served by GitHub Pages from the `main` branch.

```
index.html              the homepage (all sections)
assets/css/style.css    tokens (light and dark), layout, animations
assets/js/main.js       intro, 3D reel, auto-advancing tabs, task grid, brief wizard, contact handoff
assets/brand/           logo files, mask mark, share image
favicon.svg / .ico      favicons from the Orca mark
```

## Editing

- Brand colours and fonts live in the `:root` token block at the top of `style.css`.
- Contact details: `orcaaiofficial1@gmail.com`, `+20 100 274 3113` (set as `EMAIL` and `WHATSAPP` at the top of `main.js` and in the page).
- The forms have no backend: they open the visitor's email app or WhatsApp with the brief filled in.

## Run locally

```bash
python3 -m http.server 8765
```

Then open http://localhost:8765.

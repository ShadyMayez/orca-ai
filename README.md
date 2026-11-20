# Orca AI website

Marketing site for **Orca AI**: automation solutions, AI integrations, AI workflows, and AI agents and chatbots embedded across a company's ecosystem.

Live: https://shadymayez.github.io/orca-ai/

## Stack

Plain static HTML, CSS and JavaScript with no build step, served by GitHub Pages from the `main` branch.

```
index.html              the homepage (all sections)
assets/css/style.css    tokens (light theme), layout, animations
assets/js/main.js       intro, 3D reel, auto-advancing tabs, task grid, brief wizard, contact handoff
assets/brand/           logo files, mask mark, share image
favicon.svg / .ico      favicons from the Orca mark
```

## Editing

- Brand colours and fonts live in the `:root` token block at the top of `style.css`.
- Contact details: `orcaaiofficial1@gmail.com`, `+20 100 274 3113` (set as `EMAIL` and `WHATSAPP` at the top of `main.js` and in the page).
- Forms ("Plan my build" wizard and the contact section) are delivered to `shadymayezs@gmail.com` through [FormSubmit](https://formsubmit.co). The first submission sends a one-time activation email to that inbox; click it once and every later brief arrives as an email. Visitors can also send the brief on WhatsApp.

## Run locally

```bash
python3 -m http.server 8765
```

Then open http://localhost:8765.

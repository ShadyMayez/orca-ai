# Orca AI website: project notes for Claude Code

- Static site (HTML/CSS/JS, no build). Deployed by GitHub Pages from `main` of `ShadyMayez/orca-ai`: https://shadymayez.github.io/orca-ai/
- Layout and motion follow alfangroup.com by the owner's request; brand, colours and copy are Orca AI's own. Never add client logos, press, testimonials or result numbers that the owner has not supplied.
- Brand: logo mark is a black ring with a red R (white ring on black surfaces; `orca-mark-bold*.svg` for UI sizes, `orca-ai-icon-*-bg.svg` full size); one red signal colour (`--signal` #e8132e), font Sora. Light theme only, all-white full-width page (owner removed dark mode). All colours go through tokens in `:root`. Reel cards are square.
- Contact shown on the page: orcaaiofficial1@gmail.com, +20 100 274 3113 (WhatsApp wa.me/201002743113).
- Form delivery: "Plan my build" and the contact form POST to FormSubmit (`https://formsubmit.co/ajax/shadymayezs@gmail.com`, set as `INBOX` in `main.js`). FormSubmit needs a one-time activation link clicked in that inbox after the first submission.
- Design and copy skills to use on this project (installed as user-scope plugins, also declared in `.claude/settings.json`):
  - `hallmark` (Nutlope/hallmark): anti-slop design floor. Lint with `node ~/.claude/plugins/cache/hallmark/hallmark/*/hallmark/scripts/sloplint.mjs index.html assets/css/style.css`.
  - `taste-skill` (Leonxlnx/taste-skill): frontend taste and browser checks.
  - `marketing-skills` (coreyhaines31/marketingskills), especially `marketing-psychology` and `copywriting`, for page copy.
  - `egm` (google/elephant-goldfish-model): design and review with fresh-context agents.
  - `craft-anything` (in `~/.claude/skills`): evidence-first investigation of shipped sites and apps.
- Preview: `.claude/launch.json` serves the folder on port 8765.

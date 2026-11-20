# Orca AI website: project notes for Claude Code

- Static site (HTML/CSS/JS, no build). Deployed by GitHub Pages from `main` of `ShadyMayez/orca-ai`: https://shadymayez.github.io/orca-ai/
- Layout and motion follow alfangroup.com by the owner's request; brand, colours and copy are Orca AI's own. Never add client logos, press, testimonials or result numbers that the owner has not supplied.
- Brand: black and white logo (`assets/brand/`), one teal signal colour (`--signal`), font Outfit. All colours go through tokens in `:root` (light) and the dark blocks.
- Contact: orcaaiofficial1@gmail.com, +20 100 274 3113 (WhatsApp wa.me/201002743113).
- Design and copy skills to use on this project (installed as user-scope plugins, also declared in `.claude/settings.json`):
  - `hallmark` (Nutlope/hallmark): anti-slop design floor. Lint with `node ~/.claude/plugins/cache/hallmark/hallmark/*/hallmark/scripts/sloplint.mjs index.html assets/css/style.css`.
  - `taste-skill` (Leonxlnx/taste-skill): frontend taste and browser checks.
  - `marketing-skills` (coreyhaines31/marketingskills), especially `marketing-psychology` and `copywriting`, for page copy.
  - `egm` (google/elephant-goldfish-model): design and review with fresh-context agents.
  - `craft-anything` (in `~/.claude/skills`): evidence-first investigation of shipped sites and apps.
- Preview: `.claude/launch.json` serves the folder on port 8765.

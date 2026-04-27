# Girls Bouldering Club — Cleanup & Architecture Design

**Date:** 2026-04-27

---

## Goal

Restructure the project from 4 duplicated section folders into a clean flat asset structure, eliminate all CSS/font/normalize duplication, remove unused code, and replace all placeholder content with real Girls Bouldering Club content.

---

## File Structure

### After (target)

```
/
  index.html
  favicon-96x96.png
  assets/
    base.css          ← normalize, body, fonts, CSS custom properties
    hero.css          ← mwg_effect044 styles only
    carousel.css      ← mwg_effect028 styles only
    faq.css           ← mwg_effect025 styles (repurposed for FAQ)
    scroll.css        ← mwg_effect009 styles only
    hero.js
    carousel.js
    faq.js
    scroll.js
    medias/           ← all images and SVGs, flat
      1.png           ← hero image (duplicate overlay)
      2.png           ← hero image (main)
      star.png        ← moved from root
      icon.svg        ← carousel drag icon
      carousel-1.png … carousel-7.png
      faq-1.svg … faq-4.svg
  docs/
    superpowers/
      specs/
        2026-04-27-cleanup-architecture-design.md
```

### Deleted

- `hero/` folder (all contents)
- `section-01/` folder (all contents)
- `section-02/` folder (all contents)
- `section-03/` folder (all contents)
- `star.png` at project root
- All `.DS_Store` files

---

## CSS Strategy

### base.css (new)

Owns everything currently duplicated across all 4 section stylesheets:

```css
/* Google Fonts — imported once */
@import url('Inter 500');
@import url('IBM Plex Mono 500');

/* Normalize — declared once */
* { margin: 0; padding: 0; box-sizing: border-box; appearance: none; -webkit-font-smoothing: antialiased; }

/* Design tokens */
:root {
  --bg: #121212;
  --fg: #f1f1f1;
  --accent: #ff99db;
  --border: rgb(95, 95, 95);
  --border-dark: rgb(74, 74, 74);
}

body { background: var(--bg); color: var(--fg); font: 500 normal 22px/1.3 'Inter', sans-serif; }
```

### Removed unused rules

- `hero.css`: `.mwg_effect044 .header` (nav), `.mwg_effect044 .icon`, `.mwg_effect044 .photo` — none of these elements exist in `index.html`
- `scroll.css`: `.mwg_effect009 .text`, `.mwg_effect009 .visual` — none of these elements exist in `index.html`
- Inline `<style>` block in `index.html` (position context fixes) — these move into the appropriate section CSS files

### index.html link order

```html
<link rel="stylesheet" href="assets/base.css">
<link rel="stylesheet" href="assets/hero.css">
<link rel="stylesheet" href="assets/carousel.css">
<link rel="stylesheet" href="assets/faq.css">
<link rel="stylesheet" href="assets/scroll.css">
```

---

## Content Changes

### Section 01 — Carousel header

**Before:** *"At Soundtrack® we believe that music has the power to unite and inspire..."*

**After:** *"Girls Bouldering Club is a community for women who climb together in Copenhagen."*

### Section 02 — FAQ cards (was: generic testimonials)

Reduced from 8 cards to 5. Structure reuses the existing stacked card hover interaction.

| # | Question (`.top`) | Answer (`.bottom`) |
|---|---|---|
| 1 | When do we meet? | Friday evenings and Saturday mornings |
| 2 | How long is a session? | Around 2 hours |
| 3 | Where do we go? | We rotate between gyms across Copenhagen |
| 4 | Who can join? | Any woman — complete beginners to seasoned boulderers |
| 5 | How do I sign up? | Follow us on Instagram or join our Facebook group |

Section title changes from *"They say it better than we do"* to *"Everything you need to know"*.

### Section 03 — Scroll sentence reveal

**Before:** *"The Red Planet / may have once / fostered life. / Isn't it crazy?"*

**After:**
```
"Chalk up.
Show up.
Lift each other."
```

---

## JavaScript

No logic changes. JS files are moved as-is to `assets/`, with asset paths updated to reflect `assets/medias/`. The only fix: `section-03/assets/script.js` declares `lenis` as an implicit global — this becomes `const lenis`.

---

## Out of Scope

- No build system, bundler, or module system introduced
- No changes to GSAP animation logic
- No new sections or features

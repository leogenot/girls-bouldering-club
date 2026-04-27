# Girls Bouldering Club — Cleanup & Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the project into a flat asset architecture, eliminate all CSS/font duplication, remove unused code and stale content, and replace placeholder text with real Girls Bouldering Club content.

**Architecture:** Single `index.html` at root loads CSS from `assets/` (one file per section, plus shared `base.css`) and JS from `assets/` (one file per section). All media lives in `assets/medias/`. No build tool.

**Tech Stack:** Vanilla HTML/CSS/JS, GSAP 3.12.5 (Observer, ScrollTrigger), Lenis 1.1.16

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `assets/base.css` | Normalize, fonts, CSS vars, body |
| Create | `assets/hero.css` | mwg_effect044 styles (cleaned) |
| Create | `assets/carousel.css` | mwg_effect028 styles (cleaned) |
| Create | `assets/faq.css` | mwg_effect025 styles (adapted for FAQ) |
| Create | `assets/scroll.css` | mwg_effect009 styles (cleaned) |
| Create | `assets/hero.js` | Hero mousemove effect |
| Create | `assets/carousel.js` | Draggable infinite carousel |
| Create | `assets/faq.js` | Stacked card hover interaction |
| Create | `assets/scroll.js` | Scroll-driven sentence reveal + Lenis |
| Create | `assets/medias/` | All images and SVGs (renamed) |
| Modify | `index.html` | New CSS/JS links, updated content, cleaned markup |
| Delete | `hero/` | Entire folder |
| Delete | `section-01/` | Entire folder |
| Delete | `section-02/` | Entire folder |
| Delete | `section-03/` | Entire folder |
| Delete | `star.png` | Root-level leftover |

---

## Task 1: Create assets folder and copy media files

**Files:**
- Create: `assets/medias/` directory
- Copy: `star.png` -> `assets/medias/star.png`
- Copy + rename: `section-01/assets/medias/1.png` -> `assets/medias/carousel-1.png` (x7)
- Copy + rename: `section-01/assets/medias/icon.svg` -> `assets/medias/drag-icon.svg`
- Copy: `section-01/assets/favicon-96x96.png` -> `favicon-96x96.png` (root)

Note: hero images (hero/assets/medias/1.png, 2.png) and section-02 SVGs are NOT copied - they are only used in the standalone demo files being deleted.

- [ ] **Step 1: Create directory and copy files**

```bash
mkdir -p assets/medias
cp star.png assets/medias/star.png
cp section-01/assets/medias/1.png assets/medias/carousel-1.png
cp section-01/assets/medias/2.png assets/medias/carousel-2.png
cp section-01/assets/medias/3.png assets/medias/carousel-3.png
cp section-01/assets/medias/4.png assets/medias/carousel-4.png
cp section-01/assets/medias/5.png assets/medias/carousel-5.png
cp section-01/assets/medias/6.png assets/medias/carousel-6.png
cp section-01/assets/medias/7.png assets/medias/carousel-7.png
cp section-01/assets/medias/icon.svg assets/medias/drag-icon.svg
cp section-01/assets/favicon-96x96.png favicon-96x96.png
```

- [ ] **Step 2: Verify files are in place**

```bash
ls assets/medias/
```
Expected: `carousel-1.png carousel-2.png carousel-3.png carousel-4.png carousel-5.png carousel-6.png carousel-7.png drag-icon.svg star.png`

---

## Task 2: Create base.css

**Files:**
- Create: `assets/base.css`

- [ ] **Step 1: Write assets/base.css**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root {
  --bg: #121212;
  --fg: #f1f1f1;
  --accent: #ff99db;
  --border: rgb(95, 95, 95);
  --border-dark: rgb(74, 74, 74);
}

body {
  background: var(--bg);
  color: var(--fg);
  font: 500 normal 22px/1.3 'Inter', sans-serif;
}
```

---

## Task 3: Create hero.css

**Files:**
- Create: `assets/hero.css`
- Source: `hero/assets/style.css`

Changes from source:
- Remove @import, NORMALIZE block, body declaration (now in base.css)
- Remove .mwg_effect044 .header rules (no .header element in main index.html)
- Remove .mwg_effect044 .icon and .photo rules (unused)
- Replace hardcoded colors: rgb(95,95,95) -> var(--border), #ff99db -> var(--accent)
- Fix var(--white) bug (undefined variable) -> var(--fg)
- Media query: remove .header references

- [ ] **Step 1: Write assets/hero.css**

```css
.mwg_effect044 .root {
  position: relative;
  padding-top: 2rem;
}
.mwg_effect044 .footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 25px 0;
  position: relative;
  border-top: 1px solid var(--border);
  margin: calc(2 * 25px) 0 0;
}
.mwg_effect044 .footer p,
.mwg_effect044 .footer a {
  pointer-events: auto;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  font-size: 16px;
  color: var(--border);
}
.mwg_effect044 .footer a {
  color: inherit;
  text-decoration: none;
}
.mwg_effect044 .duplicate .footer p,
.mwg_effect044 .duplicate .footer a {
  color: var(--fg);
}
.mwg_effect044 .line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mwg_effect044 .line p,
.mwg_effect044 .line a {
  font: 500 normal 10.5vw/0.9 'Inter', sans-serif;
  letter-spacing: -0.05em;
  text-transform: uppercase;
}
.mwg_effect044 .line p:first-child,
.mwg_effect044 .line a:first-child {
  margin: 0 0 0 -0.07em;
}
.mwg_effect044 .star {
  width: 9vw;
  height: auto;
  aspect-ratio: 1;
  object-fit: contain;
  transform-origin: center;
}
.mwg_effect044 .duplicate .star {
  visibility: hidden;
}
.mwg_effect044 .containers {
  position: relative;
  pointer-events: none;
}
.mwg_effect044 .container {
  position: relative;
  padding: 0 25px;
}
.mwg_effect044 .duplicate {
  --xpercent: 50%;
  --ypercent: 50%;
  mask-image: radial-gradient(
    circle at var(--xpercent) var(--ypercent),
    #000 20%,
    transparent 25%
  );
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: var(--accent);
}

@media (max-width: 768px) {
  .mwg_effect044 .footer p:last-child,
  .mwg_effect044 .footer a:last-child {
    display: none;
  }
  .mwg_effect044 .star {
    width: 7vw;
  }
}
```

---

## Task 4: Create carousel.css

**Files:**
- Create: `assets/carousel.css`
- Source: `section-01/assets/style.css`

Changes from source:
- Remove @import, NORMALIZE block, body declaration (now in base.css)
- Add position: relative to .mwg_effect028 (was inline style in index.html)
- Remove commented-out padding line
- Replace rgb(74,74,74) -> var(--border-dark)

- [ ] **Step 1: Write assets/carousel.css**

```css
.mwg_effect028 {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: clip;
}
.mwg_effect028 .header .top {
  width: 100%;
  border-bottom: 1px solid var(--border-dark);
  padding: 25px;
}
.mwg_effect028 .header .top p {
  width: 60%;
  font: 500 normal 2.1vw/0.9 'Inter', sans-serif;
  letter-spacing: -0.03em;
}
.mwg_effect028 .header .drag {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 25px;
}
.mwg_effect028 .header .drag img {
  width: 23px;
  height: auto;
}
.mwg_effect028 .header .drag p {
  text-transform: uppercase;
  font: 500 normal 13px/normal 'IBM Plex Mono';
}
.mwg_effect028 .container {
  width: max-content;
  white-space: nowrap;
  display: flex;
  gap: 15px;
  padding: 0 1vw 0 0;
  user-select: none;
  cursor: grab;
}
.mwg_effect028 .card {
  width: 20vw;
  aspect-ratio: 0.9;
  transform-origin: 50% 100%;
}
.mwg_effect028 img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 0.03em;
  pointer-events: none;
}

@media (max-width: 768px) {
  .mwg_effect028 .header .top p {
    font-size: 20px;
    width: 100%;
  }
  .mwg_effect028 .card {
    width: 42vw;
  }
}
```

---

## Task 5: Create faq.css

**Files:**
- Create: `assets/faq.css`
- Source: `section-02/assets/style.css`

Changes from source:
- Remove @import, NORMALIZE block, body declaration (now in base.css)
- Add position: relative to .mwg_effect025 (was inline style in index.html)
- Simplify .bottom: remove display:flex, align-items, column-gap; add line-height:1.3 (it is now a plain paragraph, not a flex row with avatar)
- Remove .bubble and .job rules entirely (no avatars in FAQ cards)
- Remove nth-child rules for cards 6, 7, 8 (only 5 FAQ cards)
- Mobile: remove .job font-size rule

- [ ] **Step 1: Write assets/faq.css**

```css
.mwg_effect025 {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 160px 0 80px;
}
.mwg_effect025 .container {
  display: flex;
}
.mwg_effect025 .title {
  position: absolute;
  top: 25px;
  left: 25px;
  font: 500 normal 4vw/0.9 'Inter', sans-serif;
  letter-spacing: -0.03em;
}
.mwg_effect025 .card {
  width: 20vw;
  aspect-ratio: 0.8;
}
.mwg_effect025 .card:not(:first-child) {
  margin: 0 0 0 -10vw;
}
.mwg_effect025 .card .content {
  width: 100%;
  height: 100%;
  border-radius: 0.6em;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
}
.mwg_effect025 .card .content .top {
  font: 500 normal 1.9vw/0.9 'Inter', sans-serif;
  letter-spacing: -0.03em;
}
.mwg_effect025 .card .content .bottom {
  font: 500 normal 1.1vw/1.3 'Inter', sans-serif;
  letter-spacing: -0.03em;
  border-top: 1px dashed #000;
  padding: 25px 0 0;
}
.mwg_effect025 .card:nth-child(1) { z-index: 3; }
.mwg_effect025 .card:nth-child(1) .content { background-color: #F14A3A; }
.mwg_effect025 .card:nth-child(2) { z-index: 2; }
.mwg_effect025 .card:nth-child(2) .content { background-color: #FB7350; }
.mwg_effect025 .card:nth-child(3) { z-index: 7; }
.mwg_effect025 .card:nth-child(3) .content { background-color: #F79C42; }
.mwg_effect025 .card:nth-child(4) { z-index: 1; }
.mwg_effect025 .card:nth-child(4) .content { background-color: #FFDF40; }
.mwg_effect025 .card:nth-child(5) { z-index: 4; }
.mwg_effect025 .card:nth-child(5) .content { background-color: #DEDA8D; }

@media (max-width: 768px) {
  .mwg_effect025 {
    overflow: visible;
  }
  .mwg_effect025 .container {
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    width: 100vw;
    gap: 16px;
    padding: 0 20px;
    scroll-padding-left: 20px;
    scrollbar-width: none;
    align-items: center;
  }
  .mwg_effect025 .container::-webkit-scrollbar {
    display: none;
  }
  .mwg_effect025 .card {
    flex: 0 0 calc(100vw - 40px);
    width: calc(100vw - 40px);
    aspect-ratio: 3/4;
    margin: 0 !important;
    scroll-snap-align: start;
  }
  .mwg_effect025 .card .content p,
  .mwg_effect025 .card .content .bottom {
    opacity: 1;
  }
  .mwg_effect025 .card .content .top {
    font-size: 16px;
    line-height: 1.3;
  }
  .mwg_effect025 .card .content .bottom {
    font-size: 13px;
    line-height: 1.3;
  }
  .mwg_effect025 .title {
    font-size: 36px;
  }
}
```

---

## Task 6: Create scroll.css

**Files:**
- Create: `assets/scroll.css`
- Source: `section-03/assets/style.css`

Changes from source:
- Remove @import, NORMALIZE block, body declaration (now in base.css)
- Remove .mwg_effect009 .text rule (no .text element in main index.html)
- Remove .mwg_effect009 .visual rule (no .visual element in main index.html)
- Add position: relative to .mwg_effect009 .container (was inline style in index.html)

- [ ] **Step 1: Write assets/scroll.css**

```css
.mwg_effect009 .pin-height {
  height: 600vh;
}
.mwg_effect009 .container {
  position: relative;
  display: flex;
  align-items: center;
  height: 100vh;
}
.mwg_effect009 .center {
  position: relative;
  width: 100%;
}
.mwg_effect009 .sentence {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  font: 500 normal 10vw/0.9 'Inter', sans-serif;
}
.mwg_effect009 .sentence span {
  display: inline-block;
  letter-spacing: -0.06em;
}
.mwg_effect009 .sentence:not(:first-child) {
  position: absolute;
  left: 0;
  top: 0;
}
```

---

## Task 7: Create hero.js, carousel.js, faq.js

**Files:**
- Create: `assets/hero.js` (copied from hero/assets/script.js, no changes)
- Create: `assets/carousel.js` (copied from section-01/assets/script.js, no changes)
- Create: `assets/faq.js` (copied from section-02/assets/script.js, whitespace cleanup only)

- [ ] **Step 1: Write assets/hero.js**

```javascript
window.addEventListener("DOMContentLoaded", () => {
    const xTo = gsap.quickTo('.mwg_effect044 .duplicate', '--xpercent', {
        duration: 0.4,
        ease: "back"
    })

    const yTo = gsap.quickTo('.mwg_effect044 .duplicate', '--ypercent', {
        duration: 0.4,
        ease: "back"
    })

    const star = document.querySelector('.mwg_effect044 .container:not(.duplicate) .star')

    const rotateTo = gsap.quickTo(star, 'rotation', {
        duration: 0.4,
        ease: "power2.out"
    })

    let lastAngle = 0

    document.querySelector('.mwg_effect044').addEventListener("mousemove", (e) => {
        const mRangeX = gsap.utils.mapRange(0, window.innerWidth, 0, 100, e.clientX)
        xTo(mRangeX)

        const bound = e.target.getBoundingClientRect()
        const mRangeY = gsap.utils.mapRange(bound.top, bound.top + bound.height, 0, 100, e.clientY)
        yTo(mRangeY)

        const rect = star.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const rawAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)

        // Normalize delta to [-180, 180] so the star always takes the shortest path
        let delta = rawAngle - lastAngle
        delta = ((delta + 180) % 360 + 360) % 360 - 180
        lastAngle += delta
        rotateTo(lastAngle)
    })
})
```

- [ ] **Step 2: Write assets/carousel.js**

```javascript
gsap.registerPlugin(Observer)

window.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector('.mwg_effect028 .container')
    const cards = document.querySelectorAll('.mwg_effect028 .card')
    const half = container.clientWidth / 2

    const wrap = gsap.utils.wrap(-half, 0)
    const xTo = gsap.quickTo(container, "x", {
        duration: 0.5,
        ease: 'power3',
        modifiers: {
            x: gsap.utils.unitize(wrap)
        },
    })

    const rotateTo = gsap.quickTo(cards, "rotation", {
        duration: 1,
        ease: 'power3'
    })

    let total = 0
    Observer.create({
        target: container,
        type: "touch,pointer",
        onDrag: (self) => {
            total += self.deltaX
            xTo(total)

            const normalizedDelta = (self.deltaX / window.innerWidth) * 100
            rotateTo(-normalizedDelta)
        },
        onRelease: () => {
            rotateTo(0)
        },
        onStop: () => {
            rotateTo(0)
        }
    })
})
```

- [ ] **Step 3: Write assets/faq.js**

```javascript
window.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth <= 768) return

    const container = document.querySelector('.mwg_effect025 .container')
    const containerW = container.clientWidth
    const cards = document.querySelectorAll('.mwg_effect025 .card')
    const cardsLength = cards.length
    const cardContent = document.querySelectorAll('.mwg_effect025 .card .content')

    let currentPortion = 0

    cards.forEach(card => {
        gsap.set(card, {
            xPercent: (Math.random() - 0.5) * 10,
            yPercent: (Math.random() - 0.5) * 10,
            rotation: (Math.random() - 0.5) * 20,
        })
    })

    container.addEventListener("mousemove", e => {
        const mouseX = e.clientX - container.getBoundingClientRect().left
        const percentage = mouseX / containerW
        const activePortion = Math.ceil(percentage * cardsLength)

        if (currentPortion !== activePortion && activePortion > 0 && activePortion <= cardsLength) {
            if (currentPortion !== 0) { resetPortion(currentPortion - 1) }
            currentPortion = activePortion
            newPortion(currentPortion - 1)
        }
    })

    container.addEventListener("mouseleave", () => {
        resetPortion(currentPortion - 1)
        currentPortion = 0
        gsap.to(cardContent, { xPercent: 0, ease: 'elastic.out(1, 0.75)', duration: 0.8 })
    })

    function resetPortion(index) {
        gsap.to(cards[index], {
            xPercent: (Math.random() - 0.5) * 10,
            yPercent: (Math.random() - 0.5) * 10,
            rotation: (Math.random() - 0.5) * 20,
            scale: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.75)',
        })
    }

    function newPortion(i) {
        gsap.to(cards[i], {
            xPercent: 0, yPercent: 0, rotation: 0,
            duration: 0.8, scale: 1.1,
            ease: 'elastic.out(1, 0.75)'
        })
        cardContent.forEach((content, index) => {
            gsap.to(content, {
                xPercent: index !== i ? 80 / (index - i) : 0,
                ease: 'elastic.out(1, 0.75)',
                duration: 0.8
            })
        })
    }
})
```

---

## Task 8: Create scroll.js

**Files:**
- Create: `assets/scroll.js`
- Source: `section-03/assets/script.js`

Changes from source:
- `lenis = new Lenis(...)` -> `const lenis = new Lenis(...)` (fixes implicit global variable)
- `wrapLettersInSpan`: replace innerHTML with DOM methods to avoid HTML injection patterns
  (source is textContent which is safe, but DOM methods are cleaner practice)

- [ ] **Step 1: Write assets/scroll.js**

```javascript
gsap.registerPlugin(ScrollTrigger)

window.addEventListener("DOMContentLoaded", () => {

    const lenis = new Lenis({ autoRaf: true })

    const root = document.querySelector('.mwg_effect009')
    const sentences = root.querySelectorAll('.sentence')
    const pinHeight = root.querySelector('.pin-height')
    const container = root.querySelector('.container')

    sentences.forEach(sentence => { wrapLettersInSpan(sentence) })

    ScrollTrigger.create({
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container
    })

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: pinHeight,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        }
    })

    sentences.forEach((sentence, index) => {
        if (sentences[index + 1]) {
            tl.to(sentences[index], { yPercent: -50, y: '-50vh', ease: 'power4.in' })
            tl.to(sentences[index].querySelectorAll('span'), {
                yPercent: -50, y: '-50vh', stagger: -0.02, ease: 'power2.in'
            }, '<')
            tl.from(sentences[index + 1], { yPercent: 50, y: '50vh', ease: 'power4.out' }, '<')
            tl.from(sentences[index + 1].querySelectorAll('span'), {
                yPercent: 50, y: '50vh', ease: 'power2.out', stagger: -0.02
            }, '<')
        }
    })
})

function wrapLettersInSpan(element) {
    const chars = element.textContent.split('')
    element.textContent = ''
    chars.forEach(char => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? ' ' : char
        element.appendChild(span)
    })
}
```

---

## Task 9: Rewrite index.html

**Files:**
- Modify: `index.html`

Changes:
- Add favicon link
- Replace 4 section CSS links with 5 flat asset links (base + 4 sections)
- Remove inline style block (position fixes now live in their CSS files)
- Hero: star.png -> assets/medias/star.png
- Carousel: update description; update image paths to assets/medias/carousel-*.png; update drag icon to assets/medias/drag-icon.svg; fix "carouSel" typo
- FAQ: replace 8 testimonial cards with 5 FAQ cards; update title; simplified card HTML (no .bubble, no .job)
- Scroll: replace Mars quote with GBC sentences
- Update 4 script src paths to assets/*.js

- [ ] **Step 1: Write the new index.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Girls Bouldering Club</title>
  <link rel="icon" type="image/png" href="favicon-96x96.png" sizes="96x96">
  <link rel="stylesheet" href="assets/base.css">
  <link rel="stylesheet" href="assets/hero.css">
  <link rel="stylesheet" href="assets/carousel.css">
  <link rel="stylesheet" href="assets/faq.css">
  <link rel="stylesheet" href="assets/scroll.css">
</head>

<body>

  <!-- HERO -->
  <section class="mwg_effect044">
    <div class="root">
      <div class="containers">
        <div class="container">
          <div class="line">
            <p>GIRLS</p>
          </div>
          <div class="line">
            <p>BOULDERING</p>
            <img class="star" src="assets/medias/star.png" alt="">
          </div>
          <div class="line">
            <p>CLUB</p>
          </div>
          <div class="footer">
            <a href="https://instagram.com/girls.bouldering.club" target="_blank">Instagram</a>
            <a href="https://www.facebook.com/groups/588064030737081" target="_blank">Facebook</a>
            <p>Copenhagen</p>
          </div>
        </div>
        <div class="container duplicate" aria-hidden="true">
          <div class="line">
            <p>GIRLS</p>
          </div>
          <div class="line">
            <p>BOULDERING</p>
            <img class="star" src="assets/medias/star.png" alt="">
          </div>
          <div class="line">
            <p>CLUB</p>
          </div>
          <div class="footer">
            <a href="https://instagram.com/girls.bouldering.club" target="_blank">Instagram</a>
            <a href="https://www.facebook.com/groups/588064030737081" target="_blank">Facebook</a>
            <p>Copenhagen</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CAROUSEL -->
  <section class="mwg_effect028">
    <div class="header">
      <div class="top">
        <p>Girls Bouldering Club is a community for women who climb together in Copenhagen.</p>
      </div>
      <div class="drag">
        <img src="assets/medias/drag-icon.svg" alt="">
        <p>Drag the carousel to be wowed</p>
      </div>
    </div>
    <div class="container">
      <div class="card"><img src="assets/medias/carousel-1.png" alt=""></div>
      <div class="card"><img src="assets/medias/carousel-2.png" alt=""></div>
      <div class="card"><img src="assets/medias/carousel-3.png" alt=""></div>
      <div class="card"><img src="assets/medias/carousel-4.png" alt=""></div>
      <div class="card"><img src="assets/medias/carousel-5.png" alt=""></div>
      <div class="card"><img src="assets/medias/carousel-6.png" alt=""></div>
      <div class="card"><img src="assets/medias/carousel-7.png" alt=""></div>
      <!-- Duplicate for infinite loop -->
      <div class="card"><img src="assets/medias/carousel-1.png" alt=""></div>
      <div class="card"><img src="assets/medias/carousel-2.png" alt=""></div>
      <div class="card"><img src="assets/medias/carousel-3.png" alt=""></div>
      <div class="card"><img src="assets/medias/carousel-4.png" alt=""></div>
      <div class="card"><img src="assets/medias/carousel-5.png" alt=""></div>
      <div class="card"><img src="assets/medias/carousel-6.png" alt=""></div>
      <div class="card"><img src="assets/medias/carousel-7.png" alt=""></div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="mwg_effect025">
    <p class="title">Everything you<br>need to know</p>
    <div class="container">
      <div class="card">
        <div class="content">
          <p class="top">When do we meet?</p>
          <p class="bottom">Friday evenings and Saturday mornings</p>
        </div>
      </div>
      <div class="card">
        <div class="content">
          <p class="top">How long is a session?</p>
          <p class="bottom">Around 2 hours</p>
        </div>
      </div>
      <div class="card">
        <div class="content">
          <p class="top">Where do we go?</p>
          <p class="bottom">We rotate between gyms across Copenhagen</p>
        </div>
      </div>
      <div class="card">
        <div class="content">
          <p class="top">Who can join?</p>
          <p class="bottom">Any woman — complete beginners to seasoned boulderers</p>
        </div>
      </div>
      <div class="card">
        <div class="content">
          <p class="top">How do I sign up?</p>
          <p class="bottom">Follow us on Instagram or join our Facebook group</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SCROLL REVEAL -->
  <section class="mwg_effect009">
    <div class="pin-height">
      <div class="container">
        <div class="center">
          <div class="sentence">Chalk up.</div>
          <div class="sentence">Show up.</div>
          <div class="sentence">Lift each other.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- GSAP + plugins -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Observer.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
  <script src="https://unpkg.com/lenis@1.1.16/dist/lenis.min.js"></script>

  <script src="assets/hero.js"></script>
  <script src="assets/carousel.js"></script>
  <script src="assets/faq.js"></script>
  <script src="assets/scroll.js"></script>

</body>

</html>
```

---

## Task 10: Delete old folders and files

- [ ] **Step 1: Remove section folders**

```bash
rm -rf hero/ section-01/ section-02/ section-03/
```

- [ ] **Step 2: Remove root-level star.png**

```bash
rm star.png
```

- [ ] **Step 3: Remove all .DS_Store files**

```bash
find . -name '.DS_Store' -delete
```

- [ ] **Step 4: Verify clean state**

```bash
find . -type f | grep -v node_modules | grep -v .git | grep -v docs | sort
```

Expected output:
```
./assets/base.css
./assets/carousel.css
./assets/carousel.js
./assets/faq.css
./assets/faq.js
./assets/hero.css
./assets/hero.js
./assets/medias/carousel-1.png
./assets/medias/carousel-2.png
./assets/medias/carousel-3.png
./assets/medias/carousel-4.png
./assets/medias/carousel-5.png
./assets/medias/carousel-6.png
./assets/medias/carousel-7.png
./assets/medias/drag-icon.svg
./assets/medias/star.png
./assets/scroll.css
./assets/scroll.js
./favicon-96x96.png
./index.html
./README.md
```

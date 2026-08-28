# 🦸 Mind Math Heroes

> A single-file web game that turns mental-math practice into a hero's journey — built for children (roughly ages 5–10), their parents, and their teachers.

**▶ [Play now](https://moattaz-osama.github.io/mind-math-heroes/)**  ·  English / Arabic (RTL)  ·  Works offline  ·  No install

![Build: none](https://img.shields.io/badge/build-none-brightgreen)
![Dependencies: 0](https://img.shields.io/badge/dependencies-0-brightgreen)
![PWA: offline-ready](https://img.shields.io/badge/PWA-offline--ready-blue)
![i18n: EN and AR RTL](https://img.shields.io/badge/i18n-EN_%2F_AR_RTL-blue)

Children pick a hero, choose a mode, and solve addition, subtraction, multiplication and
division problems to earn coins, unlock gear, and progress through a 13-level skill map.
Everything runs in the browser from one HTML file, and progress is saved on the device.

---

## Contents

- [Highlights](#-highlights)
- [Game modes](#-game-modes)
- [Progression & rewards](#-progression--rewards)
- [Teacher / Presenter Mode](#-teacher--presenter-mode)
- [Bilingual & RTL](#-bilingual--rtl)
- [Accessibility](#-accessibility)
- [Offline support](#-offline-support-pwa)
- [Running & deploying](#-running--deploying)
- [Project structure](#-project-structure)
- [Technical notes](#-technical-notes)
- [Saved data](#-saved-data)
- [License](#-license)

---

## ✨ Highlights

- **13-level skill map** from *Friends of 5* through times tables, division and mixed
  mastery, with difficulty that adapts to performance.
- **Six ways to practise** — story mode, timed drills, a daily mission, free play, an
  interactive abacus, and targeted weak-spot review.
- **Motivation loop** — coins, a hero shop with upgradable gear, achievements, and
  printable certificates.
- **Built for classrooms** — a dedicated Presenter Mode for projecting problems and
  keeping a class tally.
- **Bilingual** — full English and Arabic, including right-to-left layout, switchable at
  any time.
- **Zero dependencies** — one `index.html`, hand-drawn inline SVG, no framework, no build
  step.

## 🎮 Game modes

| Mode | Description | Length |
| --- | --- | --- |
| **Hero Journey** | Story-driven progression through the skill map, chapter by chapter. | 15 questions / level |
| **Speed Dash** | Timed challenge — answer correctly before the clock runs out. | 12 questions |
| **Daily Mission** | One short, focused session per day, with a streak counter. | 2 questions |
| **Free Play** | Untimed, no-pressure practice. | 20 questions |
| **Abacus Lab** | Say or tap a number and watch it form on an interactive soroban — a hands-on introduction to place value. | open-ended |
| **Weak Spots** | Automatically surfaces and drills the facts a child gets wrong most often. | 12 questions |

## 🏆 Progression & rewards

- **Coins** are earned for correct answers and spent in the **Hero Shop** on cosmetic gear
  (cuffs, boots, capes, crowns …), each with a second-tier **upgrade**.
- **Eight heroes** to choose from; the selection persists between sessions.
- **Achievements** and **certificates** mark milestones; certificates print in landscape.
- The **Skill Map** presents the full path as a level board and scrolls to the current
  level on entry.
- A **parent gate** — a two-digit arithmetic check — protects settings, Presenter Mode,
  and the higher difficulty tiers.

## 👩‍🏫 Teacher / Presenter Mode

A single screen designed for projecting to a class, reached through the parent gate:

- Choose a level and flash problems one at a time.
- Reveal the answer on demand; toggle a large abacus for a visual walkthrough.
- Read-aloud support.
- A running class tally of **Correct** vs **Try Again**, with a two-step confirmation on
  reset.
- Typography scales up on large displays for back-of-room legibility.

## 🌍 Bilingual & RTL

English and Arabic are both first-class:

- Every string — gameplay feedback, the certificate, the dashboard — is localized.
- Arabic switches the entire layout to right-to-left with Arabic-appropriate fonts.
- Voice input recognizes English and Arabic number words, plus Eastern Arabic numerals.

## ♿ Accessibility

- Interactive controls meet a 44–48 px minimum touch target; abacus beads are
  keyboard-operable.
- `touch-action: manipulation` removes the double-tap-zoom delay on controls while
  leaving pinch-zoom available.
- Focus moves into dialogs on open and returns on close; `Escape` dismisses non-blocking
  overlays.
- Live regions announce feedback politely; the coin balance is exposed to screen readers
  with units.
- `prefers-reduced-motion` is honoured, and colour is never the only signal for
  correct / wrong / locked / next.
- Layout is verified from 320 px wide upward, in portrait and landscape, in light and
  dark themes.

## 📴 Offline support (PWA)

A service worker (`sw.js`) caches the app shell and fonts on first visit using a
cache-first strategy, so the game loads instantly and runs with no connection. A web app
manifest allows installation to the home screen.

> **Deploy note:** bump the `CACHE` constant at the top of `sw.js` on every deployment
> (for example `mmh-2026-08-28a` → `mmh-2026-08-28b`). Returning players pick up the new
> build on their next visit; without a version bump they stay on the cached copy until the
> visit after that.

Registration is limited to HTTPS origins that are not `localhost`, so local development
stays service-worker-free.

## 🚀 Running & deploying

**Locally** — no tooling required:

```bash
open index.html      # macOS
start index.html     # Windows
xdg-open index.html  # Linux
```

To exercise the service worker locally, serve over HTTP from a non-`localhost` host name;
otherwise test offline behaviour on the deployed site.

**Deploying** — the app is a static site, so any host works. This repository publishes to
GitHub Pages from `main`:

```bash
# 1. bump the CACHE constant in sw.js
# 2. commit and push
git add index.html sw.js
git commit -m "Deploy: <summary>"
git push origin main
```

The `.nojekyll` file disables Jekyll so `sw.js` and other assets are served verbatim.

## 🗂️ Project structure

```text
mind-math-heroes/
├── index.html   # the entire app — markup, styles, logic, inline SVG art
├── sw.js        # service worker (offline cache)
├── .nojekyll    # serve assets verbatim on GitHub Pages
└── README.md
```

## 🛠️ Technical notes

- **Stack:** plain HTML, CSS and JavaScript in a single file — no framework, no bundler,
  no runtime dependencies.
- **Art:** every character, gear item and UI icon is hand-drawn inline SVG. Critical
  glyphs (coin, theme, sound, language) are SVG rather than emoji for consistent
  cross-platform rendering.
- **Fonts:** Baloo 2, Quicksand, Baloo Bhaijaan 2 and Tajawal, loaded from Google Fonts
  with system-font fallbacks.
- **Audio:** sound effects are synthesized with the Web Audio API; narration uses the Web
  Speech API. Both respect the mute toggle.
- **State:** a single JSON object in `localStorage`.

## 💾 Saved data

All progress lives in the browser under the `localStorage` key `mind-math-state-v2`:
chosen hero, coins, unlocked levels and stars, owned gear, achievements, daily streak,
per-fact accuracy, language and theme. Clearing site data resets the game. No data leaves
the device.

## 📄 License

No license has been specified — all rights reserved by default. Add a `LICENSE` file to
permit reuse.

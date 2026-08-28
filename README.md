# 🦸 Mind Math Heroes

> A single-file web game that turns mental-math practice into a hero's journey, for children roughly ages 5 to 10, their parents, and their teachers.

**▶ [Play now](https://moattaz-osama.github.io/mind-math-heroes/)**  ·  English / Arabic (RTL)  ·  Works offline  ·  No install

![Build: none](https://img.shields.io/badge/build-none-brightgreen)
![Dependencies: 0](https://img.shields.io/badge/dependencies-0-brightgreen)
![PWA: offline-ready](https://img.shields.io/badge/PWA-offline--ready-blue)
![i18n: EN and AR RTL](https://img.shields.io/badge/i18n-EN_%2F_AR_RTL-blue)

Children pick a hero, choose a mode, and solve addition, subtraction, multiplication, and
division problems to earn coins, unlock gear, and work through a 13-level skill map. The
whole app is one HTML file that runs in the browser, and progress is saved on the device.

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

- A 13-level skill map that runs from *Friends of 5* through times tables, division, and
  mixed mastery, with difficulty that adjusts to how the child is doing.
- Six practice modes: story progression, timed drills, a daily mission, free play, an
  interactive abacus, and review of the facts a child keeps missing.
- Coins, a hero shop with upgradable gear, achievements, and printable certificates.
- A Presenter Mode built for projecting problems to a class and keeping a running tally.
- Full English and Arabic, including right-to-left layout, switchable at any time.
- One `index.html` of hand-drawn inline SVG, with no framework and no build step.

## 🎮 Game modes

| Mode | Description | Length |
| --- | --- | --- |
| Hero Journey | Story progression through the skill map, chapter by chapter. | 15 questions per level |
| Speed Dash | A timed round: answer correctly before the clock runs out. | 12 questions |
| Daily Mission | One short session per day, with a streak counter. | 2 questions |
| Free Play | Untimed practice with no clock. | 20 questions |
| Abacus Lab | Say or tap a number and watch it form on an interactive soroban, a hands-on way into place value. | open-ended |
| Weak Spots | Surfaces and drills the facts a child gets wrong most often. | 12 questions |

## 🏆 Progression & rewards

- Correct answers earn coins, which the child spends in the Hero Shop on cosmetic gear
  such as cuffs, boots, capes, and crowns. Owned gear can be upgraded once.
- Eight heroes to choose from. The choice carries over between sessions.
- Achievements and certificates mark milestones. Certificates print in landscape.
- The Skill Map lays the full path out as a level board and scrolls to the current level
  when you open it.
- A parent gate, a two-digit arithmetic question, gates settings, Presenter Mode, and the
  harder levels.

## 👩‍🏫 Teacher / Presenter Mode

One screen for projecting to a class, reached through the parent gate:

- Pick a level and flash problems one at a time.
- Reveal the answer when you want it, and toggle a large abacus for a visual walkthrough.
- Read-aloud support.
- A running tally of Correct against Try Again, with a two-step confirmation before it
  resets.
- Text scales up on large displays so it reads from the back of a room.

## 🌍 Bilingual & RTL

- Every string is translated, including gameplay feedback, the certificate, and the
  dashboard.
- Arabic switches the whole layout to right-to-left and uses Arabic fonts.
- Voice input understands English and Arabic number words as well as Eastern Arabic
  numerals.

## ♿ Accessibility

- Interactive controls are at least 44 to 48 px; the abacus beads also work from the
  keyboard.
- `touch-action: manipulation` drops the double-tap-zoom delay on controls while leaving
  pinch-zoom available.
- Opening a dialog moves focus into it, and closing it returns focus; `Escape` closes any
  overlay that is safe to dismiss.
- Feedback is announced through polite live regions, and the coin balance is read out with
  its unit.
- `prefers-reduced-motion` is respected, and colour alone never signals correct, wrong,
  locked, or next.
- The layout is checked from 320 px wide upward, in portrait and landscape, and in both
  themes.

## 📴 Offline support (PWA)

`sw.js` caches the app shell and fonts on the first visit, cache-first, so the game loads
fast and works with no connection. A web app manifest lets people install it to the home
screen.

Bump the `CACHE` constant at the top of `sw.js` on every deploy, for example rename
`mmh-2026-08-28a` to `mmh-2026-08-28b`. Players get the new build on their next visit. If
you skip the bump, they keep the cached copy for one more visit.

The service worker only registers on HTTPS origins other than `localhost`, so local
development is unaffected.

## 🚀 Running & deploying

Run it locally with no tools:

```bash
open index.html      # macOS
start index.html     # Windows
xdg-open index.html  # Linux
```

To test the service worker locally, serve it over HTTP from a host name other than
`localhost`. Otherwise, check offline behaviour on the deployed site.

The app is a static site, so any host works. This repository deploys to GitHub Pages from
`main`:

```bash
# bump the CACHE constant in sw.js first
git add index.html sw.js
git commit -m "Deploy: <summary>"
git push origin main
```

The `.nojekyll` file turns Jekyll off so `sw.js` and the other assets are served as-is.

## 🗂️ Project structure

```text
mind-math-heroes/
├── index.html   # the whole app: markup, styles, logic, inline SVG art
├── sw.js        # service worker (offline cache)
├── .nojekyll    # serve assets as-is on GitHub Pages
└── README.md
```

## 🛠️ Technical notes

Plain HTML, CSS, and JavaScript in one file, with no framework, bundler, or runtime
dependencies.

Every character, gear item, and UI icon is hand-drawn inline SVG. The coin, theme, sound,
and language glyphs are SVG rather than emoji so they render the same across platforms.

Fonts are Baloo 2, Quicksand, Baloo Bhaijaan 2, and Tajawal, loaded from Google Fonts with
system-font fallbacks.

Sound effects use the Web Audio API and narration uses the Web Speech API. Both follow the
mute toggle.

State is one JSON object in `localStorage`.

## 💾 Saved data

Progress is stored in the browser under the `localStorage` key `mind-math-state-v2`: the
chosen hero, coins, unlocked levels and stars, owned gear, achievements, the daily streak,
per-fact accuracy, language, and theme. Clearing site data resets the game. Nothing is
sent off the device.

## 📄 License

There is no license yet, so the default is all rights reserved. Add a `LICENSE` file to
allow reuse.

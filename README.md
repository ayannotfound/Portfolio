<div align="center">

# Ayush Anand — Portfolio / Living Resume
_I build practical, fast, no‑nonsense web & AI things. This repo is the code behind the site:_  
**🔗 Live:** https://ayannotfound.github.io/Portfolio

</div>

---

## Why this exists
I wanted something that: loads fast, isn't a React boilerplate clone, looks clean in dark mode at 2 AM, and doubles as a quick résumé snapshot. So I wrote it in plain HTML/CSS/JS. No build steps. No webpack config soul‑drain. Just code you can read in one sitting.

## Me (compressed)
- BCA @ BIT Mesra
- Ship-first mindset; polish after it's real
- Comfortable across Python / JS / Java / Kotlin
- Currently tinkering with: lightweight AI tooling, real‑time apps, PWA-ish UX patterns
- Recently: 3rd place at Codefest (LexiCounsel), built a sarcastic LLM parody (NotGPT), face recognition attendance system (FaceTrace)

## Snapshot / At a glance
| Area | Stuff I actually use |
| ---- | -------------------- |
| Frontend | HTML5, CSS3 (Grid/Flex, custom props), Vanilla JS |
| Backend | Flask, Express / Node, Fast APIs when needed |
| Data | MongoDB, MySQL, JSON configs, LocalStorage |
| AI / ML | Groq API, OpenCV, basic NLP tooling |
| Mobile | Kotlin + Jetpack Compose (select projects) |
| Infra / Deploy | Render, GitHub Pages, lightweight Docker when required |

Minimal dependencies -> fewer surprises.

---

## Featured Builds (human descriptions)
| Project | What it is | Stack Highlights |
| ------- | ---------- | ---------------- |
| FaceTrace | Real-time face recognition & attendance logging | Flask, OpenCV, MongoDB, WebSocket |
| EchoRoom | Realtime chat w/ typing indicators & grouping | Node, Socket.IO, MongoDB, bcrypt |
| LexiCounsel | AI legal assistant (placed 3rd @ Codefest) | Kotlin (Compose), Flask API, NLP bits |
| NotGPT | Parody chatbot w/ moods + streaming responses | Flask, Groq API, PWA, SSE |
| SkyCast | Clean weather UI w/ location awareness | Vanilla JS, Weather API |

> I try to keep each one ruthlessly scoped so it ships.

---

## Philosophy (small rants)
**Vanilla first** – If I can solve it with a few hundred lines of JS, I do.  
**Own the CSS** – 2k+ lines, yes—but it’s intentional: tokens, layering, no Tailwind churn.  
**Performance > cleverness** – Fewer redraws, throttled observers, zero client frameworks.  
**Dark mode done right** – Not just inverted colors; tuned contrasts & subtle motion.

---

## Structure
```
portfolio/
├── index.html        # Markup – semantic & lean
├── styles.css        # Design system, theming, layout, animations
├── script.js         # Theme toggle, section reveals, interactions
└── README.md         # This document
```

---

## Core Bits (tech in plain words)
**Theming** – CSS custom properties + localStorage persistence + prefers-color-scheme detection.  
**Animations** – IntersectionObserver for progressive reveal; no scroll-jank listeners.  
**Accessibility** – Focus states preserved; contrast tuned; semantic headings kept logical.  
**Performance** – No frameworks, no transpile step, no runtime hydration overhead.

---

## Run it locally (it’s static)
```bash
git clone https://github.com/ayannotfound/Portfolio.git
cd Portfolio
python -m http.server 8000  # or just open index.html directly
```
Visit: http://localhost:8000

---

## Quick Resume Snapshot
**Roles I've simulated building**: real-time messaging, face recognition pipelines, AI interaction layers, mobile-first chat UX, legal research assistant flows.  
**Strengths**: adapting quickly, turning vague ideas into working prototypes fast, then tightening UX/perf loop.  
**Weak edges (improving)**: deeper infra automation & larger distributed systems scaling.

---

## If you’re skimming for signal
- Shipped multiple production-ish prototypes solo
- Can move from backend route → data model → UI affordance quickly
- Comfortable debugging across layers (network → DOM → DB query)
- Don’t reinvent where a battle-tested lib is justified—but default lean

---

## Editing / Extending
| Want to… | Change |
| -------- | ------ |
| Add a project | Append to `projects` array in `data.json` |
| Tweak palette | Edit CSS vars at top of `styles.css` |
| Adjust reveal behavior | Modify observer logic in `script.js` |

---

## Contact

| Channel | Link |
| ------- | ---- |
| Email | [ayanwastaken0@gmail.com](mailto:ayanwastaken0@gmail.com) |
| LinkedIn | https://www.linkedin.com/in/ayannotfound/ |
| GitHub | https://github.com/ayannotfound |

---

## License
MIT – Fork it, remix it, build your own flavor.

---
_If this felt handcrafted, good—that was the point._


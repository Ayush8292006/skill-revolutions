# Skill Revolution — 3D website (v3, built on the PillarPride codebase)

Same engine, same animations as pillarpride.vercel.app — re-skinned for Skill Revolution in a white & beige theme.

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build in /dist
```
Vercel: import the folder, preset **Vite**. `vercel.json` rewrites every route to `index.html`.

## What is identical to PillarPride
Lenis smooth scroll · GSAP ScrollTrigger pinned hero (scrubbed) · Three.js scroll engine with camera keyframes,
3D callout tags and bloom · rotating text beats + career HUD · 3D tilted logo marquee · tabbed sections (framer-motion) ·
rolling counters · pinned curved 3D gallery · hinge reveal on every heading/card (useReveal3D) · custom cursor · preloader ·
showcase orbit in the final CTA.

## What changed for Skill Revolution
| Area | Change |
|---|---|
| 3D hero (`src/three/StudyEngine.js`) | Construction scene replaced with a **study scene** that builds on scroll: blueprint → desk, chair, study wall with window & shelf → 8 course books fly onto the desk → laptop opens on a live Azure project → lamp turns on, framed certificate & graduation cap → offer letter at golden hour. Same pinned GSAP scrub, camera keyframes, 3D tags, HUD and bloom as PillarPride |
| Hero copy & HUD (`src/sections/Hero3D.jsx`) | "Building careers" → "From the first class to the final offer…" → "AI cannot beat Skill Revolution"; Career sequence: Enroll · Foundation · Learn · Live projects · Certification · Placement |
| Cost estimator → Career planner (`src/sections/CostEstimator.jsx`) | Pick domain, program, background and batch; weeks / modules / projects / career roles roll |
| Projects → Courses | `src/data/projects.js` maps the 8 courses (`src/data/courses.js`) into the original shape → 3D gallery, `/courses`, `/courses/:slug` |
| Services → Placements | `/placements`: stats, process, career-support steps, certification tracks, 8 success stories, partner logos |
| About | Who we are, mission/vision/goal, core values, stats |
| Theme | `tailwind.config.js` colours + `src/index.css` variables |

## Where to edit content
- Courses (modules, projects, careers, certifications): `src/data/courses.js`
- Contact, stats, stories, about, certifications, placements: `src/data/site.js`
- Career-support tabs: `src/data/services.js`
- FAQ tabs: `src/data/faqs.js`
- Hiring-partner logos: `src/data/partners.js`

## Before launch
- Forms (enquiry form, career planner call-back) are front-end only — connect them to your backend / Google Sheet / WhatsApp API.
- Images load from the client's Cloudinary and the Unsplash images already used on skillrevolution.in.
- The client's own pages show different numbers (e.g. 100+ vs 80+ hiring partners). Each page uses the figure from the matching page of the current site — confirm with the client.

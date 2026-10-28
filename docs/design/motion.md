# Motion references — exact original links

These seven URLs were recovered from the previously shared references. They are **inspiration links, not implemented effects**. Open each applicable demo in a browser and observe the actual interaction before writing a motion spec. Never assume an effect is lightweight or suitable merely because it looks good.

| ID | Demo/site | Exact URL | Investigate | Candidate use |
|---|---|---|---|---|
| M01 | Codrops Atmospheric Depth Gallery | https://tympanus.net/Tutorials/DepthGallery/ | Layered depth, perspective, scroll response | Select editorial showcases |
| M02 | Codrops Sticky Grid Scroll | https://tympanus.net/Tutorials/StickyGridScroll/ | Grid pinned during scroll, sequence and release | Feature/story sections if useful |
| M03 | GSAP Proximity Scale Grid | https://codepen.io/GreenSock/full/zxKyeEm | Pointer proximity and scale feedback | Optional card/gallery hover |
| M04 | Codrops Horizontal Parallax Gallery | https://tympanus.net/Tutorials/HorizontalParallaxGallery/index2.html | Horizontal gallery motion on scroll; verify WebGL vs DOM demo | Interactive feature narrative |
| M05 | Realevate — By the Sea | https://realevate.agency/bythesea | Editorial transitions, section handoffs, cinematic pacing | Overall landing narrative |
| M06 | Riotters — Drone | https://drone.riotters.com/ | Interactive presentation, depth, scroll pacing | Hero or focused showcase — selective adaptation |
| M07 | WeScale | https://wescaleit.ca/ | Scroll choreography, typographic emphasis, section staging | Section transition rhythm |

## Implementation-agnostic motion guidelines
- Plan before code. For each target section define trigger (scroll/hover/click), transformation, progression, duration/easing **only after inspecting demo**, exit behavior, reduced-motion fallback and mobile substitute.
- Avoid global scroll hijacking, long sticky locks, performance-heavy WebGL by default, and endless decorative motion.
- Prioritize clarity, accessible controls, good mobile performance, and `prefers-reduced-motion`.
- Do not implement every reference. Select only appropriate effects approved per section.

## Additional links and video/gif references
Add user-provided exact URLs here with IDs M08+, and put recorded GIF/MP4 in `frontend/references/motion/`. There are no confirmed additional exact URLs in recovered conversation; do not invent them.

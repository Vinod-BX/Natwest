# Sirius Intro: Figma Motion Brief

**Canvas:** 1920×1080 · 30 fps · 27.7 s · one frame, animated on a single timeline (no prototype links)
**Audio:** none (added later; timings below are exact)
**Feel:** light, airy, elegant. Smooth, evolving motion. No shaking, no hard cuts, no boxes.

---

## 1. Look

| Token | Value |
|---|---|
| Light background | gradient `#F2EAF9` → `#FFFFFF`, faint dot grid, soft purple glow behind content |
| Dark background (Beat 6–7) | `#3C1053`, radial glow `#8138E0` at 35%, tiny twinkling stars |
| Purple | `#E6D7F5` · `#D3B8F0` · `#A66BF0` · **`#8138E0`** · `#5A287D` · `#4A1C67` |
| Neutrals | `#FFFFFF` · `#646068` · `#2D2D2D` |
| Accents (sparingly) | amber `#FBB200` · pink `#E51565` · green `#3AD356` |
| Font | Nunito Sans 800 / 900 |
| Logo | attached Sirius SVG: ring + 8-point star + inner X + white core dot + wordmark |

**Hard rules**
- Every icon container is a **circle**: white fill, thin `#8138E0` ring, soft purple shadow. No squares or rounded squares.
- No big headlines. Words appear only as **small floating labels** (Nunito Sans 800, 30 px, `#5A287D`) that fade up 12 px beside the relevant circle on the spoken word, then fade out.
- Easing: entrances **ease-out 350 ms**; moves **ease-in-out 800–1200 ms**. Pulses are slow and subtle.

---

## 2. Objects

**Nodes (5):** circle Ø200, white, purple ring, 56 px line icon `#8138E0`.
People · Processes · Data · Systems · Controls.
Positions: loose pentagon around (960, 575), rx 520, ry 260.

**Links:** 3 px curved lines, gradient `#A66BF0` → `#8138E0`.

**Pulse (reusable):** node scale 1.00 → 1.04 → 1.00, plus a ring expanding 100% → 140% while fading 60% → 0. Length 900 ms, ease-in-out.

**Interaction rule:** when a node pulses, a small glowing dot travels along its links; each neighbour answers with its own pulse 300–600 ms later. Fire pulses at random, uneven times per node.

**Outcomes core:** soft purple glowing circle Ø210 with a sparkle and the label "Outcomes".

---

## 3. Timeline

### Beat 1: 0.0–6.2 s: "Delivering outcomes requires people, processes, data, systems and controls working together seamlessly"

| t | Action |
|---|---|
| 0.0 | Empty field. A tiny glowing point appears at the centre and breathes. |
| 1.6 | **People** blooms out of the point, drifts to place. Label "People". |
| 2.1 | **Processes** blooms, label. |
| 2.9 | **Data** blooms, label. |
| 3.3 | **Systems** blooms, label. |
| 4.1 | **Controls** blooms, label. |
| 4.7–5.8 | Links draw one by one, each led by a glowing dot. First ripple travels round the whole network. |
| 5.5 | "Outcomes" core fades in at the centre. |

### Beat 2: 7.2–12.6 s: "As customer expectations, business priorities and ways of working evolve at NatWest"

No shaking, no red chips. Soft coloured **waves** wash through the field and the network responds like something alive.

| t | Action |
|---|---|
| 7.4 | Soft **amber** wave rolls in from the left edge. Label "Customer expectations". |
| 8.8 | Soft **pink** wave from the top right. Label "Business priorities". |
| 9.8 | Soft **purple** wave from the bottom. Label "Ways of working". |
| 7.4–11.3 | Links stretch and thin. Nodes drift 10–15% apart. Pulses fall **out of sync**: each node pulses at its own uneven pace. |
| 11.3 | Stretched links soften to dotted lines. |

### Beat 3: 12.6–15.2 s: "we need a more connected and adaptable way of working"

| t | Action |
|---|---|
| 12.6 | Waves dissolve. Nodes drift back. |
| 13.2 | **"connected"**: links re-weave into smooth flowing curves. All five pulses **lock into one shared rhythm**. Label "Connected". |
| 13.9 | **"adaptable"**: curves flex gently and settle. Label "Adaptable". |

### Beat 4: 15.9–18.0 s: "Sirius enables that shift"

| t | Action |
|---|---|
| 15.95 | Centre glows brighter. |
| 16.5–17.7 | Nodes **spiral inward** along curved paths, shrinking, leaving light trails. Links fade as they are absorbed. |
| 17.5 | Fuse into one luminous core. Shockwave ring expands. **Sirius star** (8-point star + white core dot, `#8138E0`) forms, glowing. |

### Beat 5: 18.1–23.9 s: "creating a connected, AI-enabled environment where work can be set up, managed and continuously improved"

| t | Action |
|---|---|
| 18.1 | Thin orbit ring (r 300) draws around the star. Small dots begin to orbit. |
| 19.1 | **"AI-enabled"**: circular sparkle badge on the ring, label "AI-enabled environment". |
| 21.3 | **"set up"**: circle node on the ring pulses once. Label "Set up". |
| 21.9 | **"managed"**: second node. Label "Managed". |
| 22.6 | **"continuously improved"**: third node. Label "Continuously improved". Faint curved arrows join the three into a slowly rotating cycle. |
| 23.1–23.9 | Star grows and glows until light fills the frame. |

### Beat 6: 23.3–24.6 s: transition to dark
Light expands as a circle and wipes the frame to `#3C1053` (dark background spec above).

### Beat 7: 24.4–26.5 s: "Getting started with Sirius is simple"

| t | Action |
|---|---|
| 24.4–25.3 | **Mark only**, centred: ring draws → 8-point star scales in with slight rotation → inner X counter-rotates in → white core dot pops. |
| 25.35–26.0 | **Wordmark reveals** left to right. Lockup centres. |
| 25.5 | Caption fades up beneath: "Getting started is **simple.**" (white, "simple." brighter). |

### Beat 8: 26.5–27.7 s: transition to product
Logo shrinks and glides to the top-left header position (x 158, y 158, height 46, purple). A lavender circle opens from the centre, replacing the dark background, ending on a **blank white app frame** (leave empty for the next scene).

---

## 4. Layer naming
`bg-light`, `bg-dark`, `node-people|processes|data|systems|controls`, `link-<a>-<b>`, `pulse-ring-<node>`, `wave-amber|pink|purple`, `label-<word>`, `core-outcomes`, `star-sirius`, `orbit-ring`, `badge-ai`, `node-setup|managed|improved`, `logo-mark`, `logo-wordmark`, `caption-simple`.

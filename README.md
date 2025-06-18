# Three.js Page Transition

A spinning WebGL cube that survives a full page navigation without dropping a frame.

Click a cube and the URL changes, the entire page DOM gets torn down and replaced
with the next route - but the `<canvas>` running the three.js scene is *not* one of
the things that gets destroyed. The same live WebGL context is plucked out of the
old page and dropped into the new one, so the cube keeps spinning, mid-rotation,
straight through the transition.

## What this demonstrates

Normally, navigating between pages unmounts and remounts the DOM. For a three.js /
WebGL canvas that is expensive and destructive: the GL context is lost, the scene
is rebuilt from scratch, and any animation state resets to zero.

This project keeps a single canvas alive across route changes. When you go from the
gallery to a cube's page:

- the URL changes and Next.js swaps out the whole page,
- framer-motion animates the canvas from its little grid tile to the full-size view,
- and the three.js render loop never stops - it is literally the same canvas element
  the entire time.

## How it works

The trick is a detached DOM node that lives outside the routed page tree:

- `src/app/layout.tsx` is the one component that never unmounts. On mount it creates
  one portal node per cube with [`react-reverse-portal`](https://github.com/httptoolkit/react-reverse-portal)
  and stashes them in a zustand store.
- `CanvasSelector` renders each cube's `<Canvas>` (a [`@react-three/fiber`](https://github.com/pmndrs/react-three-fiber)
  scene) into its detached portal node via `InPortal`. Because this lives in the
  persistent layout, each WebGL scene is created exactly once.
- Each page renders an `OutPortal` to *show* a canvas wherever it wants - three small
  tiles on the gallery (`/` and `/home`), one big view on the cube page
  (`/cubes/[id]`). Moving an `OutPortal` relocates the live node; it does not
  recreate it.
- A framer-motion `motion.div` with a shared `layoutId` wraps each `OutPortal`, so
  the canvas smoothly animates between its gallery position and its full-page
  position as the route changes.

Net result: the DOM around the canvas is fully swapped on navigation, but the canvas
- and its running render loop - is preserved and just moved.

## Live demo

https://nijotz.github.io/three.js-page-transition/

Deployed as a static export to GitHub Pages on every push to `main` (see
`.github/workflows/deploy.yml`).

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Stack

- Next.js (App Router) + React
- three.js via @react-three/fiber
- react-reverse-portal - keeps the canvas alive across route changes
- framer-motion - the shared-layout transition between grid and full view
- zustand - holds the cubes and their portal nodes

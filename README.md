# Ekvi Air — FTO Operations Suite (UI Prototype)

A polished, **UI-only** dashboard prototype for **Ekvi Air**, a flying training
organisation (FTO). Built to demo to a client — it prioritises visual polish,
colour, and smooth interactions. There is **no backend**: everything runs on
hardcoded mock data and local component state.

## Tech stack

- **React 18** + **Vite**
- **Tailwind CSS** for styling
- **lucide-react** for icons
- **recharts** for charts
- State-based view switching (no routing library)

## Highlights

- **Collapsible sidebar** — a narrow icon rail (64px) that smoothly expands to
  240px on hover to reveal labels.
- **Hover-to-expand cards** — dashboard/fleet/cadet/instructor cards lift, scale
  slightly, and reveal extra detail (mini breakdowns, progress bars, snags) on
  hover.
- **Aviation doodle background** — a faint, low-opacity WhatsApp-style SVG
  texture of planes, clouds, propellers, wrenches, compasses, control towers.
- Vibrant per-module accent colours, rounded corners, soft shadows, status
  pills, progress rings and micro-animations.

## Modules

Dashboard · Fleet & Maintenance · Cadets & Training · Scheduling ·
Compliance & DGCA · Finance · Instructors · Inventory / Spares · Settings

## Run it

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview the build
```

> Prototype only — no API calls, no auth, no persistence. All data is mock.

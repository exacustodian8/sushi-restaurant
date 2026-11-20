# Hanare Sushi Bar (placeholder)

A one-page website for a **fictional** sushi restaurant, built with Angular 22. Every name, address, phone number, menu item and price is placeholder content, meant to be replaced.

```bash
npm install
npm start       # http://localhost:4200
npm test        # unit tests
npm run build
```

## Changing the content

Almost everything lives in **`src/app/restaurant.config.ts`**:

| What | Where in the file |
|---|---|
| Name, tagline, intro, phone, email, Instagram, address | `RESTAURANT` |
| Map pin | `RESTAURANT.location` (`lat`, `lng`), the map and the "directions" link follow it |
| Opening hours | `HOURS` (drives the "Open now" badge, the hours table and the bookable times) |
| Menu (max 10 dishes, a test enforces it) | `MENU` and `CATEGORIES` |
| Photos and credits | `PHOTOS`, `GALLERY` (files live in `public/images`) |

Copy in the story section is in `src/app/about/about.ts`.

## Changing the colours

The whole palette is one block at the top of `src/styles.css` (`--paper`, `--sand`, `--clay`, `--moss`, `--bark`, ...). The components only use the semantic tokens below it (`--bg`, `--accent`, `--dark`, ...), so editing those few values re-themes the site. Fonts are `--font-display` and `--font-body`.

## What is where

- `header/`, `hero/`, `about/`, `menu/`, `gallery/`, `reserve/`, `visit/`, `footer/`: one component per section, composed in `home/`.
- `hours.ts`: pure functions for opening hours (open now, time slots, weekday maths in the restaurant's own time zone).
- `reserve/`: reactive form with validators that know the opening hours (no bookings on closed days, no past dates, times follow the chosen day). The submit is a **demo**: replace the timeout in `reserve.ts` with a call to a real booking endpoint.
- `motion/`: a quiet scroll reveal and a scroll-spy that highlights the current section in the header.
- `seo.ts`: schema.org `Restaurant` data generated from the same config.
- The map is OpenStreetMap's free embed (no API key).

## Credits

Photographs from Wikimedia Commons under open licences; each one is credited, with a link, in the footer ("Photo credits").

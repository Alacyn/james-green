# PRD — Aaron Kirman Group Team Landing Page (Recreation)

## Original Problem Statement
"Build a landing page: https://aaronkirman.com/team" — user asked for a faithful recreation of the Aaron Kirman Group (AKG) team page, then confirmed: "Do the exact same and I'll make edits after." After first build, user clarified it must match the original page structure exactly (no invented flourishes).

## User Personas
- **Prospective agent**: researching AKG as a brokerage to join; lands on the team page, reads the story/stats, submits the "Find Your Place" career form.
- **Luxury client / site owner (Aaron Kirman Group)**: wants the page to present the brokerage, its Christie's partnership, and its track record with the same content and structure as the original site.

## Core Requirements (static)
1. Faithful 1:1 recreation of aaronkirman.com/team section order, copy, AND visual design (user provided reference screenshots of the real site).
2. LIGHT theme: white page background, inset hero image with white margins, small serif title inside image bottom-left; white navbar with left dropdown links (About/Listings/Media), centered "AARONKIRMAN" serif wordmark, right Contact + search; dark sections only for stats/form/instagram/footer.
3. Typography: Bodoni Moda (Didone serif, uppercase headings with bronze highlights) + Montserrat (light gray body); underlined letterspaced eyebrows; bronze accent #A8926E.
4. Sticky bottom-left chrome: search circle + bronze "LET'S CONNECT" pill scrolling to the form.
5. Career contact form persisted to MongoDB via backend API.
6. Premium motion subordinate to fidelity: masked hero title reveal, subtle parallax, animated stat counters, lenis smooth scroll.

## Architecture
- **Frontend**: React (CRA + craco), Tailwind, framer-motion, lenis, sonner. Single page `/` composed of section components in `frontend/src/components/`.
- **Backend**: FastAPI (`backend/server.py`), MongoDB via motor. `POST /api/connect` stores career inquiries (BaseDocument pattern, PyObjectId, camelCase alias support).
- **Assets**: Original site photography downloaded to `frontend/public/images/` (hero.jpg, team.jpg, network.jpg). Original AKG recruitment video streamed from its Cloudinary source in a modal.
- **Fonts**: Cormorant Garamond (display serif) + Jost (sans) via Google Fonts; custom AK monogram favicon (public/favicon.svg).

## Section Order (matches original)
1. Hero — full-bleed image, "Aaron Kirman Group" masked line-by-line reveal, scroll cue
2. About — "The Rise of AKG" (verbatim copy, est. 2017, Christie's partnership Fall 2022, 7 → 300+ people, LA Business Journal footnote)
3. Full-width team photo with parallax
4. Unparalleled Network — "Unmatched Sales" image + verbatim copy ($19B sold; Garcia House, Wall House, Brentwood Estate)
5. Featured — "With over $24 Billion in luxury home sales" + animated counters ($24B+, .01%, $1.7B+)
6. Index — Leadership / Brand / Culture / Marketing / Empowerment / Technology (light grid, as original's custom-index)
7. Video CTA — "Empowering Your Success" + Play Video modal (real AKG recruitment video)
8. Connect — "Find Your Place" career form (First/Last/Email/Phone/DRE#/Total Sales + consent) → POST /api/connect → MongoDB
9. Instagram feed — "Follow @aaronkirman" tiles linking to instagram.com/aaronkirman
10. Footer — contact (Aaron Kirman, CA DRE #01296524, (424) 249-7162), office address, socials (real links), Equal Housing Opportunity

## Implemented (2026-09-28)
- All sections above; removed non-original flourishes after user feedback (marquee, hero subtitle, cursor-follow previews, footer wordmark, extra about line).
- Full light-theme redesign after user shared real-site screenshots: Bodoni Moda + Montserrat, centered About, text-left/image-right Network, centered dark stats, sticky Let's Connect pill, favicon.
- Hero v3 per user request: user-supplied interior photo as FULL-BLEED hero (no white frame), transparent navbar (white text) that turns white/dark on scroll.
- Hero v4 (Kristin-style, per user reference screenshot): dark gradient at top blending nav into photo; "Global Real Estate Advisor" eyebrow ABOVE the name, brighter/whiter; name kept at text-7xl max (user rejected larger size); EXPLORE outlined button; single-page flat nav with NO dropdowns; simple flat mobile menu; all Aaron Kirman branding removed (nav wordmark -> JAMES GREEN, footer, IG handle -> @jamesgreen, consent text, page title, JG favicon).
- Hero v5: name in the third-shelf opening on desktop (slight raise), lifted higher on mobile; one line per hero row on mobile; nav tabs Home / About / Buy / Sell / Contact.
- Palette v6 (official, per user): Warm Ivory #F1E6D7 light backgrounds, Cognac Brown #654731 accents/buttons, Soft Black #16100C typography/dark sections; official eXp-Luxury 2-color white horizontal logo in nav (tints cognac on the white scrolled nav via CSS filter) and footer.
- Content v6 from "James Green - Digital Residence Client Discovery.pdf": About = his real bio (20+ yrs client-centered experience, financial services/lending/relocation/advocacy, clarity philosophy); "Listen. Educate. Advise." section; stats = 20+ years, 3 years real estate, DFW Metroplex (AKG's $24B/#1 claims removed per his no-unearned-claims rule); AKG recruitment video section removed; values index = Relationships/Professionalism/Integrity/Personal Service/Clarity/Strategy; Connect form is now client-facing (First/Last/Email/Phone/Interest select/Message); real contact info (972.876.8030, JamesAGreen@eXpRealty.com), real socials (IG/FB/YouTube/TikTok/Threads @jamesagreenrealestate), DFW service area in footer.
- POST /api/connect with camelCase alias support; endpoint + models updated for the new client form fields (old DRE/Total Sales fields removed).
- No horizontal overflow at 1440px or 390px; form success toast verified through the UI; inquiry persisted to MongoDB.

## Backlog
- P2: Duplicate light "Find Your Place" form variant (original renders the form twice, dark + light).
- P2: Live Instagram API feed (current tiles reuse the three site photos).
- P2: Full site (home search, listings, media pages) if user extends scope.

## Next Tasks
- Await user's content edits (they said "I'll make edits after").

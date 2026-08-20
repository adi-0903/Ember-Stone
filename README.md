# 🔥 Ember & Stone — Prime Wood-Fired Steakhouse & Cocktail Alchemy Bar

<div align="center">

![Ember & Stone Banner](https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85)

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white&style=for-the-badge)](https://expressjs.com/)
[![Motion](https://img.shields.io/badge/Motion-12.2-FF4154?logo=framer&logoColor=white&style=for-the-badge)](https://motion.dev/)
[![License](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)](LICENSE)

<p align="center">
  <strong>An immersive, Michelin-grade digital dining and mixology experience.</strong><br>
  Featuring real-time table reservations, host stand QR check-ins, automated HTML VIP pass delivery, an interactive Cocktail Alchemy Lab, and a lossless 320kbps Hearth Lounge music streamer.
</p>

[✨ Live Demo](#-live-demo) • [🍽️ Features](#-features) • [🛠️ Architecture](#️-architecture) • [🚀 Quick Start](#-quick-start) • [📡 API Reference](#-api-reference) • [📂 File Structure](#-project-structure)

</div>

---

## 📖 Overview

**Ember & Stone** is a modern full-stack web application designed for a luxury wood-fired steakhouse and cocktail lounge located in Chicago’s West Loop (Randolph Restaurant Row). 

Crafted with an editorial dark aesthetic, warm golden hearth tones, responsive spring-based physics, and seamless client-server workflows, it bridges the gap between digital discovery and tableside hospitality.

---

## 🌟 Key Highlights & Features

### 1. 🎬 Cinematic Food & Beverage Splash Experience
- **5-Second Full-Screen Visual Immersion**: High-resolution photography crossfading smoothly between wood-fired A5 wagyu cuts, smoked cocktail cloches, handmade truffle pasta, and ambient dining rooms.
- **Synchronized Countdown & Progress**: Real-time timer and glowing gold progress bar with instant one-click skip option.

### 2. 🥩 Wood-Fired Gastronomy & Curated Menus
- **Interactive Multi-Section Menu**: Explore Prime Dry-Aged Steaks, Handmade Pastas, Raw Bar, Hearth Roasts, and Desserts.
- **Dietary Precision**: Real-time filtering for Vegetarian, Vegan, Gluten-Free, and Prime Carnivore preferences.
- **Provenance & Tasting Notes**: Complete cut origin details (Miyazaki Japan, Snake River Farms, Norcia Italy), aging metrics, and cellar wine pairings.

### 3. 🍸 Cocktail Alchemy Lab & Virtual Backbar
- **Interactive Cocktail Customizer**: Craft bespoke cocktails by selecting spirit bases, wood smoke infusions, bitters, and artisanal hand-carved ice.
- **Live Seat Radar**: Real-time occupancy radar for the Chef's Hearth Counter, Cocktail Lounge Booths, and Heated Terrace.
- **Interactive Bar Tab Drawer**: Virtual cart to build, review, and simulate your evening drink flight.

### 4. 🎟️ VIP Table Reservation Engine & Automated Email Passes
- **Smart Booking Flow**: Intuitive visual calendar date picker, time slot selector, party size counter, seating preference selector, and custom dietary note fields.
- **Automated HTML Email Delivery**: Instant dispatch of responsive VIP dining passes containing unique confirmation codes (`ES-XXXXXX`), reservation summaries, valet guidelines, and scannable host stand QR codes (powered by Resend API or fallback dispatch).
- **WhatsApp Concierge Helper**: Pre-formatted one-tap WhatsApp reservation confirmations.
- **Reservation Lookup & Ticket Management**: Instant lookup modal to search, verify, or re-send passes to any email.

### 5. 🛎️ Host Stand Reception & QR Check-In
- **Real-Time Hostess Desk**: Access live guest details and table check-ins by scanning reservation QR passes or appending `?checkin=true&ref=ES-XXXXXX` to the URL.

### 6. 📻 Hearth Lounge Lossless Music Player
- **Lossless 320kbps Audio Engine**: Curated 90s nostalgia and ambient dining tracks streamed with real-time volume controls, scrubbing, track metadata, and live search.

### 7. 🎨 Editorial Polish & Ergonomics
- **Scroll Progress Tracker**: Fixed viewport progress bar with spring physics guiding users through editorial content.
- **Custom Gold Cursor & Noise Overlays**: Custom cursor with interactive hover expansion and textured visual depth.
- **Fully Responsive**: Optimized for desktop, tablet, and mobile touch targets.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite 6 |
| **Styling & Design** | Tailwind CSS v4, Lucide Icons, Cormorant Garamond / Playfair Typography |
| **Animations & Motion** | Motion (`motion/react`), Spring Physics, Canvas Confetti |
| **Data Visualization** | D3.js, HTML5 Canvas, SVG Radar Visualizers |
| **Backend & Server** | Express 4, Node.js, TSX, ESBuild |
| **Email & Communications** | Resend Cloud API, Dynamic Responsive HTML Email Engine |
| **Audio & Media** | JioSaavn Lossless 320kbps Audio Proxy API, HTML5 Web Audio |
| **Code Quality** | TypeScript Strict Type-Checking (`tsc --noEmit`), ESLint |

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm`, `pnpm`, `yarn`, or `bun`

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ember-and-stone.git
cd ember-and-stone
```

### 2. Install Dependencies

```bash
npm install
# or
bun install
```

### 3. Configure Environment Variables

Copy the example environment template:

```bash
cp .env.example .env
```

Edit `.env` with your preferred credentials:

```env
# Port & URL
PORT=3000
APP_URL="http://localhost:3000"

# Optional: Email Automated Dispatch (Resend API)
# Get a free key at https://resend.com (3,000 free emails/mo)
RESEND_API_KEY="re_123456789"
SENDER_EMAIL="reservations@yourdomain.com"

# Optional: Gemini AI Integration
GEMINI_API_KEY="your-gemini-api-key"
```

> **Note**: The application includes a self-contained mock fallback for email dispatch and audio playback, so it works completely out of the box even without external API keys!

### 4. Run Development Server

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

### 5. Build for Production

```bash
# Builds the client-side SPA and bundles the backend server into dist/server.cjs
npm run build

# Start the production server
npm start
```

---

## 📡 API Reference

The backend Express server (`server.ts`) exposes the following endpoints:

### Reservations

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/reservations/book` | Creates a reservation, generates an `ES-XXXXXX` confirmation pass, and dispatches the HTML email with QR code. |
| `POST` | `/api/reservations/lookup` | Looks up a booking by reference code or guest email. |
| `POST` | `/api/reservations/resend-pass` | Re-generates and re-delivers the VIP dining pass to a target email. |
| `GET` | `/api/reservations/history` | Fetches the recent in-memory reservation audit log (telemetry). |

#### Sample Reservation Booking Request:
```json
POST /api/reservations/book
Content-Type: application/json

{
  "name": "Alexander Wright",
  "email": "alex.wright@example.com",
  "phone": "3125550199",
  "countryCode": "+1",
  "date": "2026-08-28",
  "time": "7:30 PM",
  "partySize": "4 Guests",
  "seatingPreference": "chefs_counter",
  "dietaryPreference": "non-veg",
  "specialRequests": "Anniversary celebration; window or hearth view preferred."
}
```

### Music & Media

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/music/curated` | Returns cached high-fidelity curated tracks for the Hearth Lounge. |
| `GET` | `/api/music/search?q=:query` | Live search for Bollywood and global tracks with 320kbps audio streams. |

### System & Health

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health check and uptime monitor. |
| `GET` | `/api/email-status` | Inspects status of the Resend API key and total processed bookings. |

---

## 📂 Project Structure

```text
ember-and-stone/
├── .env.example                    # Environment variable specification template
├── package.json                    # Project metadata, scripts, and dependencies
├── server.ts                       # Express backend server (APIs, email, Vite middleware)
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build and Tailwind integration config
│
├── src/
│   ├── main.tsx                    # Application entry point
│   ├── App.tsx                     # Top-level routing, modals, audio player & preloader
│   ├── index.css                   # Global Tailwind CSS imports and custom utility layers
│   ├── types.ts                    # Global TypeScript interfaces and models
│   │
│   ├── pages/
│   │   ├── HomePage.tsx            # Main landing experience (Hero, Philosophy, Chef, Booking)
│   │   ├── MenuPage.tsx            # Full culinary menu, cellar pairings & filters
│   │   └── BarPage.tsx             # Alchemy Lab, Virtual Backbar & Cocktail Explorer
│   │
│   ├── components/
│   │   ├── Preloader.tsx           # 5-second cinematic food & drink crossfade splash
│   │   ├── ScrollProgressBar.tsx   # Spring-physics viewport scroll progress bar
│   │   ├── Navbar.tsx              # Sticky brand navigation with reservation shortcut
│   │   ├── Hero.tsx                # Hero section with video/imagery background & CTA
│   │   ├── Philosophy.tsx          # Culinary fire & stone craftsmanship statement
│   │   ├── ChefFeature.tsx         # Executive chef highlight & kitchen philosophy
│   │   ├── MenuTeaser.tsx          # Featured signature dishes preview
│   │   ├── BarTeaser.tsx           # Cocktail lounge highlights preview
│   │   ├── Reservations.tsx        # Interactive reservation booking form
│   │   ├── ReservationLookup.tsx   # Booking reference search and pass viewer
│   │   ├── ReservationSuccessOverlay.tsx # Post-booking confetti & QR pass display
│   │   ├── HostReceptionModal.tsx  # Hostess desk QR check-in overlay
│   │   ├── HearthMusicPlayer.tsx   # Floating 320kbps vintage cassette music player
│   │   ├── VisualDatePicker.tsx    # Custom visual calendar date picker
│   │   ├── PhoneInputField.tsx     # International telephone code input
│   │   ├── CustomCursor.tsx        # Interactive amber glowing cursor
│   │   ├── PrivateDining.tsx       # Private dining and group events section
│   │   ├── PrivateDiningModal.tsx  # Group event inquiry modal
│   │   ├── LoungeBoothModal.tsx    # Lounge VIP booth reservation modal
│   │   ├── Testimonials.tsx        # Guest critique & Michelin guide quotes
│   │   └── Footer.tsx              # Brand footer with hours, location & socials
│   │
│   ├── components/bar/
│   │   ├── CocktailAlchemyLab.tsx  # Bespoke mixology flavor profile builder
│   │   ├── VirtualBackbar.tsx      # Rare spirits showcase & bottle inspector
│   │   ├── BarSeatRadar.tsx        # Visual occupancy radar for lounge seating
│   │   ├── BarTabDrawer.tsx        # Slide-out virtual bar order drawer
│   │   ├── BarAmbienceBar.tsx      # Ambience lighting and sound controller
│   │   └── BarFloatingEmbers.tsx   # Ambient floating fire embers canvas
│   │
│   ├── data/
│   │   ├── restaurantData.ts       # Menu items, wines, testimonials, chef profile
│   │   ├── barData.ts              # Cocktail recipes, spirits list, mixology ingredients
│   │   ├── countryCodes.ts         # Global country calling code directory
│   │   └── bollywoodTracks.ts      # Offline fallback playlist for Hearth Lounge
│   │
│   └── utils/
│       ├── barAudio.ts             # Sound effects for cocktail shaker & ice clinks
│       └── whatsappHelper.ts       # WhatsApp reservation message formatting utility
```

---

## 🍷 Design & Typography Philosophy

- **Color Palette**:
  - `Ember Gold` (`#c9973e` / `#f3d489`): Hearth glow, focal highlights, and active states.
  - `Obsidian Charcoal` (`#070503` / `#120c07`): Deep, low-fatigue dark background canvas.
  - `Hickory Amber` (`#e07a5f` / `#8a5d1e`): Cocktail bitters, smoky accents, and secondary badges.
  - `Bone White` (`#f5f0e8`): High-contrast, legible serif and sans-serif copy.
- **Typographic Hierarchy**:
  - Headings: `Cormorant Garamond` & `Playfair Display` (Classic Michelin editorial flair).
  - Body & UI: Modern system sans-serif paired with spacious tracking and balanced leading.

---

## 🔒 Security & Best Practices

- **Zero Client-Side Secret Leaks**: All private tokens (Resend API key, Gemini key) reside strictly server-side in `server.ts`.
- **Input Sanitization**: Clean HTML entity stripping on external music and reservation payloads.
- **Container Ingress Ready**: Binds to `0.0.0.0:3000` with graceful SPA routing fallback for container platforms (Cloud Run, Docker, AWS ECS).

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Crafted with passion for fine food, wood fire, and cocktail alchemy.</sub><br>
  <sub>© 2026 Ember & Stone Steakhouse. All rights reserved.</sub>
</div>

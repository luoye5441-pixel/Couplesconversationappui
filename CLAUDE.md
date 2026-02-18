# CLAUDE.md

## Project Overview

This repository contains two applications:

1. **Couples Conversation & Wellness App** (`src/`) — A React + Vite web app with breathing exercises, mood journal, anxiety tracker, grounding techniques, and a Chinese-style couples conversation card game (缘牌)
2. **江湖卡牌 Wuxia Card Game** (`wuxia-cards/`) — A standalone HTML/CSS/JS PWA: a Hearthstone-like card battle game with Chinese ink wash (水墨) martial arts theme, 18 unique cards, AI opponent

The project originated from a Figma design export and uses Supabase for backend persistence (React app only).

## Tech Stack

### Main React App (`src/`)
- **Framework**: React 18 + TypeScript
- **Build**: Vite 6.3 with `@vitejs/plugin-react`
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin) + inline styles
- **UI Components**: Radix UI / shadcn/ui (50+ components in `src/app/components/ui/`)
- **Animation**: `motion` (Framer Motion compatible), import as `motion/react`
- **Routing**: React Router v7
- **Backend**: Supabase Edge Functions (Hono) with KV store
- **Icons**: lucide-react
- **Charts**: Recharts

### Wuxia Card Game (`wuxia-cards/`)
- **Tech**: Vanilla HTML + CSS + JavaScript (no frameworks)
- **PWA**: manifest.json + Service Worker for full offline play
- **Storage**: localStorage for game records
- **Art**: CSS gradients + unicode characters for ink wash card art, no external images or fonts
- **Zero dependencies**: Fully self-contained, works offline

## Commands

```bash
# Main React app
npm install        # Install dependencies
npm run dev        # Start dev server (Vite, port 5173)
npm run build      # Production build (dist/)

# Wuxia Card Game (standalone, serve with any static server)
npx serve wuxia-cards
# or: python3 -m http.server -d wuxia-cards 8080
```

No test or lint commands are configured. Verify with `npm run build`.

## Project Structure

```
src/
├── main.tsx                    # React entry point
├── styles/                     # CSS: index.css → fonts → tailwind → theme
├── app/
│   ├── App.tsx                 # BrowserRouter, routes, state, Supabase fetching
│   ├── screens/
│   │   ├── Dashboard.tsx       # Home page with stats + navigation
│   │   ├── BreathingGuide.tsx  # Animated breathing exercise
│   │   ├── Journal.tsx         # Mood journaling
│   │   ├── AnxietyTracker.tsx  # Anxiety tracking + Recharts
│   │   ├── Resources.tsx       # Grounding techniques
│   │   └── CardGame.tsx        # Couples card game (缘牌)
│   ├── data/
│   │   ├── questions.ts        # Couples questions (Chinese)
│   │   └── cardGameData.ts     # 缘牌 Five Elements card data
│   └── components/
│       └── ui/                 # shadcn/ui components (do not manually edit)

wuxia-cards/                    # ★ Standalone PWA card battle game
├── index.html                  # Game HTML structure
├── style.css                   # Ink wash visual design
├── game.js                     # Game logic + AI + rendering
├── manifest.json               # PWA manifest for install
└── sw.js                       # Service Worker for offline caching

supabase/functions/server/      # Supabase Edge Functions (Hono)
utils/supabase/info.tsx         # Supabase credentials (auto-generated)
```

## Routes (React App)

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Dashboard | Home with stats and navigation |
| `/breathing` | BreathingGuide | Guided breathing exercise |
| `/journal` | Journal | Mood journal |
| `/tracker` | AnxietyTracker | Anxiety level tracking |
| `/resources` | Resources | Grounding techniques |
| `/card-game` | CardGame | Couples conversation card game (缘牌) |

## Wuxia Card Game (江湖卡牌) Details

### Game Mechanics
- Player vs AI, each starts with 30 HP, deck of 20 cards
- Draw 3 cards initially; draw 1 per turn
- Gain 1 mana crystal per turn (max 10)
- Play minions by spending mana; minions can attack next turn (unless Charge)
- Keywords: Taunt (must attack first), Charge, Poisonous, Elusive
- Battlecry effects: damage, healing, buffs, card draw, AOE
- Win by reducing opponent HP to 0

### 18 Unique Cards (all Chinese martial arts themed)
Cost 1: 药童, 少女, 暗器师 | Cost 2: 镖师, 毒医, 游侠, 捕快
Cost 3: 琴师, 道士, 刺客, 护法, 丐帮弟子 | Cost 4: 侠客, 铸剑师, 武僧
Cost 5: 掌门 | Cost 6: 隐士 | Cost 7: 大侠

### AI Logic
1. Plays cards greedily (highest cost first)
2. Attacks taunt minions first, then favorable trades, then hero

### Mobile Controls
- Tap card in hand to select → tap again or tap board to play
- Tap friendly minion → tap enemy minion or hero bar to attack
- "结束回合" button to end turn

## Conventions

- **Language**: Card game content in **Chinese (Mandarin)**; wellness screens in English
- **Components**: Functional React components with hooks only
- **Imports**: `@/` for src imports; `motion/react` for animations (not `framer-motion`)
- **UI components**: `components/ui/` is auto-generated shadcn/ui — do not manually edit
- **Icons**: lucide-react for all icons
- **No strict TypeScript**: Some implicit `any` types exist
- **Styling**: Tailwind + inline styles (React); pure CSS (wuxia-cards)
- **Color palettes**:
  - Wellness: greens (#81A68D, #6B9F8E)
  - 缘牌: reds/golds (#C41E3A, #D4A574, #1A0A0A)
  - 江湖卡牌: ink wash (#2a1a0e paper, #f5f0e8 bg, #c41e3a vermillion accent)
- **Path aliases**: `@` → `./src` in vite.config.ts
- **Assets**: SVG/CSV as raw imports; never add .css/.tsx/.ts to assetsInclude
- **Supabase**: Fetch-based API calls, Bearer token auth, Hono Edge Functions, KV table `kv_store_83d701ee`

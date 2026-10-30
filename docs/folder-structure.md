# MindBalance — Complete Folder & Project Structure
**Document Code:** FS-MB-V1.0  
**Pattern:** Decoupled Monorepo (`client/` and `server/` with shared contract interfaces)

---

## 1. Top-Level Repository Overview

The repository is organized into a clean, modular structure with distinct frontend (`client/`) and backend (`server/`) environments, unified documentation (`docs/`), and root-level orchestration:

```
Mind balance/
├── client/                     # Next.js 14+ Frontend Application
├── server/                     # Express.js + TypeScript Backend Application
├── docs/                       # Architectural & Planning Documentation
│   ├── project-overview.md
│   ├── functional-requirements.md
│   ├── non-functional-requirements.md
│   ├── system-architecture.md
│   ├── database-design.md
│   ├── api-design.md
│   ├── ui-ux-design-guidelines.md
│   ├── development-roadmap.md
│   ├── testing-strategy.md
│   ├── security-and-privacy-plan.md
│   ├── architecture-review.md
│   ├── folder-structure.md
│   ├── module-dependencies.md
│   └── development-setup.md
├── .gitignore                  # Global Git ignore rules (node_modules, .env, dist)
├── package.json                # Root orchestrator script (concurrent execution)
└── README.md                   # Project overview & quickstart guide
```

---

## 2. Frontend Application Directory (`client/`)

The frontend leverages the Next.js 14+ App Router, TypeScript, Tailwind CSS, shadcn/ui components, and Framer Motion.

```
client/
├── public/                     # Static public assets
│   ├── audio/                  # Mind Relief ambient soundscapes (rain.mp3, forest.mp3, etc.)
│   ├── icons/                  # SVG icons, favicon, Apple touch icons
│   └── images/                 # Desk stretch illustrations, brand graphics
├── src/
│   ├── app/                    # Next.js App Router (Pages, Layouts & Route Handlers)
│   │   ├── (auth)/             # Authentication route group (minimalist layout)
│   │   │   ├── layout.tsx      # Centered card layout for auth flows
│   │   │   ├── login/
│   │   │   │   └── page.tsx    # Employee/HR login screen
│   │   │   └── register/
│   │   │       └── page.tsx    # User registration screen
│   │   ├── (dashboard)/        # Authenticated workspace route group
│   │   │   ├── layout.tsx      # Main application shell (Sidebar, Header, Bell, Profile)
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx    # Employee wellness cockpit (Streak, Today, Mini-charts)
│   │   │   ├── relief/
│   │   │   │   └── page.tsx    # Mind Relief Zone (Breathwork, Audio, Memory Game, Pomodoro)
│   │   │   ├── assessments/
│   │   │   │   └── page.tsx    # PSS-4 & WHO-5 Self-Assessment questionnaires
│   │   │   ├── habits/
│   │   │   │   └── page.tsx    # Physical wellness, hydration, and desk stretches
│   │   │   ├── assistant/
│   │   │   │   └── page.tsx    # AI Wellness Assistant & CBT Reframing pocket
│   │   │   ├── events/
│   │   │   │   └── page.tsx    # Wellness webinars, workshops & calendar RSVP
│   │   │   ├── resources/
│   │   │   │   └── page.tsx    # Curated articles, audio guides & stress library
│   │   │   └── admin/          # HR & Admin Analytics (RBAC Guarded)
│   │   │       ├── layout.tsx  # Admin tab layout
│   │   │       ├── page.tsx    # Overview, participation rate, company burnout index
│   │   │       ├── departments/
│   │   │       │   └── page.tsx # Departmental stress heatmaps with k-anonymity masking
│   │   │       └── events-manage/
│   │   │           └── page.tsx # HR event creation and attendee management
│   │   ├── globals.css         # Tailwind base directives and CSS color variables
│   │   ├── layout.tsx          # Root HTML layout with font imports (Inter/Fraunces)
│   │   └── page.tsx            # Landing page / intelligent redirect to dashboard
│   ├── components/             # Reusable React components
│   │   ├── ui/                 # shadcn/ui primitives (Radix UI wrappers)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   └── badge.tsx
│   │   ├── shared/             # Cross-cutting UI components
│   │   │   ├── Header.tsx      # App navigation bar with user profile & streak
│   │   │   ├── Sidebar.tsx     # Responsive navigation sidebar
│   │   │   ├── ProtectedRoute.tsx # Client-side role and session guard
│   │   │   ├── MedicalDisclaimer.tsx # Persistent non-clinical legal disclaimer
│   │   │   └── ErrorBoundary.tsx # Graceful widget error fallback
│   │   ├── dashboard/          # Wellness dashboard widgets
│   │   │   ├── DailyCheckInModal.tsx # 2-step valence & stress slider check-in
│   │   │   ├── StreakBadge.tsx # Fire streak indicator with motivational toast
│   │   │   ├── StressChartWidget.tsx # Recharts 14-day stress trajectory
│   │   │   └── QuickReliefCard.tsx # Jump triggers for micro-interventions
│   │   ├── relief/             # Mind Relief Zone interactive modules
│   │   │   ├── BreathworkVisualizer.tsx # Framer Motion SVG expanding breath circle
│   │   │   ├── SoundscapePlayer.tsx # Ambient audio track selector & volume slider
│   │   │   ├── MemoryMatrixGame.tsx # 4x4 card matching 90-second focus game
│   │   │   └── PomodoroTimer.tsx # 25-5 min focus intervals with chime
│   │   ├── habits/             # Physical wellness tracking widgets
│   │   │   ├── WaterTracker.tsx # Animated hydration bottle gauge with +250ml log
│   │   │   ├── PostureReminder.tsx # 20-20-20 eye strain and posture break counter
│   │   │   └── StretchCarousel.tsx # Illustrated desk stretches with timer
│   │   ├── assistant/          # AI reflection components
│   │   │   ├── ChatInterface.tsx # Conversational stream view with auto-scroll
│   │   │   ├── CbtReframer.tsx # Negative thought deconstruction tool
│   │   │   └── CrisisModal.tsx # Immediate 988 lifeline emergency takeover modal
│   │   └── admin/              # HR & Leadership analytics components
│   │       ├── DepartmentHeatmap.tsx # Anonymized stress distribution grid
│   │       ├── PrivacyGuardBanner.tsx # Visual notice when N < 7 sample size
│   │       ├── BurnoutGauge.tsx # Organization-wide burnout index widget
│   │       └── EventEditorDialog.tsx # HR workshop creator dialog
│   ├── context/                # Global React Contexts
│   │   ├── AuthContext.tsx     # User authentication state, login/logout handlers
│   │   └── ThemeContext.tsx    # Sound preferences and reduced motion settings
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts          # Auth context consumer
│   │   ├── useBreathwork.ts    # Box & 4-7-8 breathing phase state machine
│   │   ├── useAudioPlayer.ts   # HTML5 audio playback and crossfade engine
│   │   └── useNotifications.ts # In-app notification poller / Web Push
│   ├── lib/                    # Client utility libraries
│   │   ├── apiClient.ts        # Typed fetch client with credentials: 'include'
│   │   ├── utils.ts            # ClassNames merger (clsx + tailwind-merge)
│   │   └── animations.ts       # Shared Framer Motion physics constants
│   └── types/                  # TypeScript interface declarations
│       ├── auth.types.ts       # User, Session, Role types
│       ├── wellness.types.ts   # MoodEntry, Assessment, Habit types
│       └── analytics.types.ts  # Department metrics and aggregation types
├── e2e/                        # Playwright End-to-End Test Suite
│   ├── auth.spec.ts            # Login, register, logout flows
│   ├── checkin.spec.ts         # Daily mood check-in and streak increment
│   ├── breathwork.spec.ts      # Visual breathwork cycle execution
│   └── privacy-mask.spec.ts    # HR departmental k-anonymity UI assertion
├── .env.example                # Frontend environment template
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind tokens (Warm Ivory, Forest Green)
├── tsconfig.json               # TypeScript frontend settings
└── package.json                # Frontend scripts and dependencies
```

---

## 3. Backend Application Directory (`server/`)

The backend is structured around a clean **Controller-Service-Repository** pattern with TypeScript, Express.js, Firebase Admin SDK + Firestore, and Zod.

```
server/
├── src/
│   ├── config/                 # Environment & Database Configuration
│   │   ├── database.ts         # Firebase Admin SDK connection manager
│   │   ├── session.ts          # Express-session & Firebase Auth configuration
│   │   ├── env.ts              # Zod environment variable schema validation
│   │   └── constants.ts        # Application constants (k=7 threshold, bands)
│   ├── controllers/            # Request handlers & response formatters
│   │   ├── auth.controller.ts  # Login, register, logout, me, change-password
│   │   ├── wellness.controller.ts # Today summary, mood check-ins, history, purge
│   │   ├── assessment.controller.ts # PSS-4 & WHO-5 submissions & history
│   │   ├── relief.controller.ts # Mind relief session logging & soundscapes
│   │   ├── physical.controller.ts # Hydration increment, posture breaks, steps
│   │   ├── ai.controller.ts    # AI chat reflection, CBT reframer, crisis flag
│   │   ├── event.controller.ts # Wellness webinars, workshops, and RSVPs
│   │   ├── resource.controller.ts # Curated articles and guide publishing
│   │   └── admin.controller.ts # Anonymized departmental analytics & audit logs
│   ├── services/               # Authoritative Business & Domain Logic
│   │   ├── auth.service.ts     # Password hashing, user provisioning, credential verification
│   │   ├── wellness.service.ts # Streak calculations, today's telemetry synthesis
│   │   ├── assessment.service.ts # Standardized scoring logic (PSS-4, WHO-5)
│   │   ├── physical.service.ts # Hydration targets & break aggregation
│   │   ├── ai.service.ts       # LLM streaming with 4.5s circuit breaker
│   │   ├── crisisGuard.service.ts # Regex & semantic distress lexicon detection
│   │   ├── localReflection.service.ts # 50+ deterministic CBT prompts (offline fallback)
│   │   ├── analytics.service.ts # k-Anonymity Firestore query pipeline (N >= 7)
│   │   └── encryption.service.ts # AES-256-GCM cipher for private journal notes
│   ├── models/                 # Firebase Admin SDK + Firestore Data Schemas & TypeScript Documents
│   │   ├── user.model.ts       # User account, role, preferences
│   │   ├── moodEntry.model.ts  # Daily valence, energy, stress level, encrypted note
│   │   ├── assessment.model.ts # PSS-4 and WHO-5 assessment records
│   │   ├── physical.model.ts   # Water intake, posture breaks, daily steps
│   │   ├── reliefSession.model.ts # Breathwork, memory game, pomodoro records
│   │   ├── aiConversation.model.ts # AI conversation metadata
│   │   ├── aiMessage.model.ts  # Individual messages & crisis flags
│   │   ├── event.model.ts      # Wellness events and attendee arrays
│   │   ├── resource.model.ts   # Curated wellness articles and markdown content
│   │   └── auditLog.model.ts   # Administrative compliance trail
│   ├── middleware/             # Express Middlewares
│   │   ├── auth.middleware.ts  # Session validation & req.user hydration
│   │   ├── rbac.middleware.ts  # Role guard (requiresRole('HR_MANAGER' | 'ADMIN'))
│   │   ├── validate.middleware.ts # Zod request validation wrapper
│   │   ├── rateLimiter.middleware.ts # Granular route rate limiting
│   │   ├── security.middleware.ts # Helmet, CORS whitelist, input sanitization
│   │   └── error.middleware.ts # Centralized JSON error envelope formatter
│   ├── validators/             # Zod Input Validation Schemas
│   │   ├── auth.validator.ts   # Login, register, profile schemas
│   │   ├── wellness.validator.ts # Mood check-in schema (-5 to +5, stress 1-10)
│   │   ├── assessment.validator.ts # PSS-4 & WHO-5 answer array schemas
│   │   ├── physical.validator.ts # Water increment & break logging schemas
│   │   └── ai.validator.ts     # Chat prompt & CBT thought schemas
│   ├── utils/                  # Helper utilities
│   │   ├── logger.ts           # Structured logging utility
│   │   ├── apiResponse.ts      # Standardized JSON response envelope generator
│   │   └── seeder.ts           # Synthetic database seeder (35+ employees, 60 days)
│   ├── tests/                  # Automated Test Suites
│   │   ├── unit/               # Vitest Unit Tests
│   │   │   ├── pss4.test.ts    # PSS-4 scoring & inversion logic
│   │   │   ├── who5.test.ts    # WHO-5 calculation & percentage scaling
│   │   │   ├── streak.test.ts  # Streak continuity across dates
│   │   │   ├── safetyFilter.test.ts # Crisis lexicon detection
│   │   │   └── encryption.test.ts # AES-256-GCM cipher verification
│   │   └── integration/        # Supertest API Tests
│   │       ├── auth.test.ts    # Login, Firebase ID tokens, logout
│   │       ├── rbac.test.ts    # Employee blocked from /admin routes (403)
│   │       ├── wellness.test.ts # Today summary, mood check-ins, validation
│   │       └── privacy.test.ts # k-Anonymity suppression assertions (N < 7)
│   └── index.ts                # Application entrypoint & HTTP server bootstrap
├── .env.example                # Backend environment variable template
├── tsconfig.json               # TypeScript backend compiler configuration
├── vitest.config.ts            # Vitest testing configuration
└── package.json                # Backend scripts and dependencies
```

---

## 4. Environment Configuration Templates

### 4.1. Client Environment (`client/.env.example`)
```env
# Next.js Application Environment
NEXT_PUBLIC_APP_NAME="MindBalance"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"
```

### 4.2. Server Environment (`server/.env.example`)
```env
# Node Environment & Server Port
NODE_ENV=development
PORT=5000

# Client Origin (CORS Whitelist)
CLIENT_ORIGIN=http://localhost:3000

# Database Persistence
FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY = Firebase project configuration in server/.env

# Session & Encryption Secrets (Min 32 characters)
SESSION_SECRET = mindbalance_super_secure_session_secret_key_32chars!
ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef

# Optional AI API Key (Falls back to deterministic CBT engine if left empty)
AI_API_KEY=
AI_PROVIDER=google # or openai
```

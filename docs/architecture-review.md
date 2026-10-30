# MindBalance — Architecture & Requirements Review
**Document Code:** AR-MB-V1.0  
**Status:** Completed Analysis & Architecture Alignment

---

## 1. Executive Summary & Review Objectives

This review evaluates the ten initial specification documents (`project-overview.md` through `security-and-privacy-plan.md`) to detect architectural tensions, missing specifications, cross-origin communication hurdles, security loopholes, and implementation risks before any codebase scaffolding begins.

---

## 2. Inconsistencies & Ambiguities Resolved

### 2.1. Authentication Strategy: Next.js App Router vs. External Express Backend
- **Identified Friction**: Next.js App Router performs both Server-Side Rendering (SSR) and Client-Side Rendering (CSR). When interacting with an independent Express API (`http://localhost:5000` from `http://localhost:3000` in development), cross-origin Firebase ID tokens require careful handling:
  - If `secure: true` is hardcoded on cookies in development without HTTPS, modern browsers silently reject storing the Firebase ID token.
  - Server components in Next.js cannot read client-side document cookies directly unless forwarded via Next.js headers or proxied through Next.js route handlers.
- **Resolution & Decision**:
  1. The backend cookie configuration dynamically toggles `secure`:
     ```typescript
     cookie: {
       httpOnly: true,
       secure: process.env.NODE_ENV === 'production',
       sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
       maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
     }
     ```
  2. CORS on Express explicitly whitelists the frontend URL (`http://localhost:3000`) with `credentials: true`.
  3. Client-side authentication state is managed via an `AuthContext` powered by TanStack Query, which calls `GET /api/v1/auth/me` on mount with `credentials: 'include'`. Route protection on the client is enforced via a shared layout guard component (`<ProtectedRoute requiredRole="...">`).

### 2.2. Session Storage & Statefulness
- **Identified Friction**: In `system-architecture.md` and `security-and-privacy-plan.md`, stateful sessions via `Firebase Auth` were specified. A high query rate for session lookups on every single API request could introduce database overhead if unindexed.
- **Resolution**:
  - `Firebase Auth` is configured with auto-removal of expired sessions via Firebase Cloud Firestore TTL indexes on `expires`.
  - The session collection is isolated from domain data and connection pooling is sized appropriately ($PoolSize = 50$).

### 2.3. Encryption of Private Journal Notes
- **Identified Ambiguity**: `database-design.md` mentions `privateJournalEncrypted?: string` in `MoodEntry`, but the specific cipher and key management were not defined.
- **Resolution**:
  - Symmetric **AES-256-GCM** encryption is applied at the service layer prior to saving to Firebase Cloud Firestore.
  - The encryption uses a dedicated `ENCRYPTION_KEY` (32 bytes / 64 hex characters) from environment variables.
  - Encrypted fields store: `iv:authTag:encryptedContent`. Decryption happens only when the individual owner retrieves their personal history, ensuring the raw text is never exposed in plain database dumps.

### 2.4. Audio Autoplay & Browser Security Policies
- **Identified Issue**: Modern browsers (Chrome, Edge, Firefox) prohibit audio playback without prior direct user interaction.
- **Resolution**:
  - The Mind Relief Zone audio player will not autoplay on page navigation. Audio playback is strictly triggered by explicit user interaction with a visual "Play" / "Pause" toggle, respecting browser Media Engagement Index (MEI) policies.

---

## 3. Missing Requirements & Additions

The following functional and operational gaps were identified across the initial documents and are now incorporated:

1. **User Profile & Password Update Flow**:
   - Added `PATCH /api/v1/auth/profile` for updating personal name and preferences.
   - Added `POST /api/v1/auth/change-password` requiring current password verification to prevent account takeover.
2. **Local Calendar (.ics) Export**:
   - Added dynamic client-side `.ics` file generation for confirmed event RSVPs without requiring external calendar OAuth integrations.
3. **Timezone-Safe Daily Tracking**:
   - Daily wellness logs require a client-provided local date string (e.g., `dateStr: "2026-10-26"`) in addition to UTC timestamps to ensure midnight check-in consistency regardless of server timezone.
4. **Synthetic Data Seeder for Demonstrations**:
   - For university viva demonstrations, an automated seed script (`npm run seed`) is required to populate 5 departments, 35+ realistic synthetic employees, 60 days of historical check-ins, and both masked ($N < 7$) and unmasked ($N \ge 7$) departmental analytics.

---

## 4. Architectural Risk Assessment & Mitigations

| Risk | Severity | Probability | Architectural Mitigation |
|---|:---:|:---:|---|
| **Inference Attacks on Small Departments** | High | Medium | Hard $k$-anonymity threshold ($k=7$) enforced at the database aggregation layer; suppression banner rendered on UI. |
| **External AI API Rate Limits / Failure** | High | Medium | Local deterministic fallback engine containing 50+ CBT cognitive reframing prompts; circuit breaker timeout of 4.5s. |
| **Cross-Origin Cookie Blockage in Local Dev** | Medium | High | Environment-aware cookie security (`sameSite: 'lax'`, `secure: false` in development); explicit CORS credential whitelist. |
| **Memory Leaks during Audio Streaming** | Low | Low | Single global HTML5 Audio singleton with proper cleanup on React component unmount (`useEffect` return cleanup). |
| **Accidental Secret Leakage to GitHub** | High | Low | Root `.gitignore` excluding all `.env*` files; `envValidator.ts` schema validation on application boot. |

---

## 5. Technology Alignment Confirmation

The core stack is fully validated for the implementation phase:

```
[ Frontend: Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion + Recharts ]
                                      ▲
                                      │ (REST JSON / SameSite Cookies)
                                      ▼
[ Backend: Node.js 20 LTS + Express.js + TypeScript + Zod + Firebase Admin SDK + Firestore 8+ ]
                                      ▲
                                      │ (Connection Pool / TTL Sessions)
                                      ▼
[ Persistence: Firebase Cloud Firestore ]
```

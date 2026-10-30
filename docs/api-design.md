# MindBalance — RESTful API Specification
**Document Code:** API-MB-V1.0  
**Base URL:** `/api/v1`  
**Protocol:** HTTPS with Signed HTTP-Only Session Cookies

---

## 1. Global Conventions & Standard Response Envelope

All API endpoints strictly follow REST semantics and respond with a standardized JSON envelope to guarantee predictable client-side consumption.

### 1.1. Success Envelope (`HTTP 200 / 201`)
```json
{
  "success": true,
  "statusCode": 200,
  "data": { ... },
  "message": "Operation completed successfully",
  "meta": {
    "timestamp": "2026-10-26T15:30:00.000Z",
    "requestId": "req_8d241631_001"
  }
}
```

### 1.2. Error Envelope (`HTTP 400 / 401 / 403 / 404 / 422 / 429 / 500`)
```json
{
  "success": false,
  "statusCode": 422,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The submitted payload failed schema validation",
    "details": [
      {
        "field": "valence",
        "issue": "Number must be greater than or equal to -5"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-10-26T15:30:00.000Z",
    "requestId": "req_8d241631_002"
  }
}
```

---

## 2. Authentication & Session Management Endpoints

| Method | Endpoint | RBAC | Description |
|---|---|:---:|---|
| `POST` | `/api/v1/auth/register` | Public | Register new enterprise user |
| `POST` | `/api/v1/auth/login` | Public | Authenticate user & issue signed Firebase ID token |
| `POST` | `/api/v1/auth/logout` | All | Invalidate session & clear cookies |
| `GET` | `/api/v1/auth/me` | All | Fetch authenticated user profile & preferences |
| `PATCH`| `/api/v1/auth/preferences`| All | Update personal hydration, motion & sound settings |

### `POST /api/v1/auth/login`
**Request Payload:**
```json
{
  "email": "employee@enterprise.com",
  "password": "SecurePassword123!"
}
```
**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "user": {
      "id": "671ce90a12f5a43b8e7c1001",
      "email": "employee@enterprise.com",
      "firstName": "Sarah",
      "lastName": "Chen",
      "role": "EMPLOYEE",
      "department": "Engineering"
    }
  },
  "message": "Login successful"
}
```
*(Sets cookie `mb_session=s%3A...; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`)*

---

## 3. Employee Wellness & Telemetry Endpoints

### 3.1. Today's Summary & Streak
- **`GET /api/v1/wellness/today-summary`**
  - **Access:** `EMPLOYEE`
  - **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "hasCheckedInToday": true,
        "todayMood": { "valence": 3, "energy": "HIGH", "stressLevel": 4 },
        "currentStreak": 5,
        "physical": { "waterIntakeMl": 1250, "waterGoalMl": 2000, "postureBreaks": 3 },
        "recommendedIntervention": {
          "type": "BREATHWORK",
          "title": "4-7-8 Deep Relaxation",
          "durationMinutes": 3
        }
      }
    }
    ```

### 3.2. Mood & Valence Logging
- **`POST /api/v1/wellness/mood`**
  - **Access:** `EMPLOYEE`
  - **Zod Schema:**
    ```typescript
    export const CreateMoodSchema = z.object({
      valence: z.number().int().min(-5).max(5),
      energy: z.enum(['LOW', 'MEDIUM', 'HIGH']),
      stressLevel: z.number().int().min(1).max(10),
      tags: z.array(z.string().trim().max(30)).max(8).optional().default([]),
      privateJournalText: z.string().max(2000).optional()
    });
    ```
  - **Request Payload:**
    ```json
    {
      "valence": 2,
      "energy": "MEDIUM",
      "stressLevel": 5,
      "tags": ["deep work", "code review"],
      "privateJournalText": "Felt productive this morning, slight neck tension from sitting."
    }
    ```

- **`GET /api/v1/wellness/mood/history?days=30`**
  - **Access:** `EMPLOYEE`
  - **Description:** Returns personal historical logs for Recharts trend rendering.

---

## 4. Standardized Stress Assessment Endpoints

- **`POST /api/v1/wellness/assessments`**
  - **Access:** `EMPLOYEE`
  - **Zod Schema:**
    ```typescript
    export const CreateAssessmentSchema = z.object({
      assessmentType: z.enum(['PSS_4', 'WHO_5']),
      answers: z.array(z.number().int().min(0).max(5)).min(4).max(5)
    });
    ```
  - **Request Payload (PSS-4):**
    ```json
    {
      "assessmentType": "PSS_4",
      "answers": [2, 1, 3, 2]
    }
    ```
  - **Response (201 Created):**
    ```json
    {
      "success": true,
      "data": {
        "assessmentType": "PSS_4",
        "rawScore": 8,
        "normalizedScore": 50.0,
        "severityBand": "MODERATE",
        "nonClinicalGuidance": "Your answers indicate moderate everyday stress. Consider incorporating a 3-minute mid-day breathwork break or taking a brief outdoor walk.",
        "completedAt": "2026-10-26T15:30:00.000Z"
      }
    }
    ```

---

## 5. Mind Relief Zone Endpoints

- **`POST /api/v1/relief/sessions`**
  - **Access:** All Authenticated
  - **Request Payload:**
    ```json
    {
      "exerciseType": "BOX_BREATHING",
      "durationSeconds": 180,
      "cyclesCompleted": 11
    }
    ```

- **`GET /api/v1/relief/soundscapes`**
  - **Access:** All Authenticated
  - **Response:** Curated list of high-quality ambient audio streams, track titles, and waveform assets.

---

## 6. Physical Wellness Endpoints

- **`POST /api/v1/physical/water/log`**
  - **Payload:** `{ "incrementMl": 250 }`
  - **Response:** Returns updated daily `waterIntakeMl` and percentage towards `waterGoalMl`.

- **`POST /api/v1/physical/break/log`**
  - **Payload:** `{ "breakType": "POSTURE" | "EYE" }`
  - **Response:** Increments counter and logs streak timestamp.

---

## 7. AI Wellness Assistant Endpoints

- **`POST /api/v1/ai/chat`**
  - **Access:** `EMPLOYEE` (Rate limited: 15 req/15 min)
  - **Zod Schema:**
    ```typescript
    export const AiChatSchema = z.object({
      conversationId: z.string().optional(),
      message: z.string().trim().min(1).max(1000)
    });
    ```
  - **Request:**
    ```json
    {
      "conversationId": "671ce90a12f5a43b8e7c2005",
      "message": "I have an overwhelming presentation tomorrow and I feel completely paralyzed by anxiety."
    }
    ```
  - **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "conversationId": "671ce90a12f5a43b8e7c2005",
        "message": {
          "id": "671ce90a12f5a43b8e7c2010",
          "sender": "ASSISTANT",
          "content": "It is completely understandable to feel overwhelmed before a major presentation. Let's take a deep breath together. What is one small, manageable slide or topic you feel most confident about right now?",
          "crisisFlagDetected": false
        }
      }
    }
    ```

- **`POST /api/v1/ai/reframe`**
  - **Payload:** `{ "negativeThought": "If I mess up this demo, my career is completely ruined." }`
  - **Response:** Returns structured cognitive reframing suggestions (Catastrophizing deconstruction, Balanced alternative, Action step).

---

## 8. HR & Administrator Analytics Endpoints (Privacy Guarded)

- **`GET /api/v1/admin/analytics/department?dept=Engineering&range=30d`**
  - **Access:** `HR_MANAGER`, `ADMIN`
  - **Response Case A ($N \ge 7$ Respondents - Data Released):**
    ```json
    {
      "success": true,
      "data": {
        "department": "Engineering",
        "sampleSize": 24,
        "isMasked": false,
        "averageStressLevel": 5.4,
        "averageValence": 1.8,
        "participationRatePct": 68.5,
        "burnoutRiskIndicator": "MODERATE",
        "dominantStressors": ["Deadlines", "Context Switching"]
      }
    }
    ```
  - **Response Case B ($N < 7$ Respondents - $k$-Anonymity Suppression):**
    ```json
    {
      "success": true,
      "data": {
        "department": "Legal",
        "sampleSize": 4,
        "isMasked": true,
        "maskReason": "Sample size below privacy threshold (N < 7). Individual data is protected.",
        "averageStressLevel": null,
        "averageValence": null,
        "participationRatePct": null
      }
    }
    ```

- **`GET /api/v1/admin/audit-logs?page=1&limit=50`**
  - **Access:** `ADMIN`
  - **Response:** Audit trail of logins, privilege adjustments, and policy updates.

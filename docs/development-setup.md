# MindBalance — Development Setup & Configuration Guide
**Document Code:** DS-MB-V1.0  
**Environment Requirements:** Node.js 20 LTS (or higher), npm 10+, Firebase project with Firestore enabled

---

## 1. Prerequisites & Tooling Environment

| Tool / Runtime | Required Version | Verification Command | Purpose |
|---|---|---|---|
| **Node.js** | `>= 20.10.0 LTS` | `node -v` | Core JavaScript runtime for client & server |
| **npm** | `>= 10.2.0` | `npm -v` | Dependency management & script execution |
| **Firebase Cloud Firestore** | `>= 7.0` | `firebase --version` (optional CLI) | Database engine (Firebase project or Firestore emulator) |
| **Git** | `>= 2.40` | `git --version` | Version control |

---

## 2. Package Management & Root Orchestration

MindBalance uses a dual-workspace structure coordinated by root scripts using `concurrently`. This allows developers and examiners to boot both frontend and backend development servers with a single command.

### 2.1. Root `package.json` Configuration
```json
{
  "name": "mindbalance-root",
  "version": "1.0.0",
  "private": true,
  "description": "MindBalance — Intelligent Workforce Well-being and Stress Management System",
  "scripts": {
    "install:all": "npm install && cd client && npm install && cd ../server && npm install",
    "dev": "concurrently -n \"CLIENT,SERVER\" -c \"cyan,green\" \"npm run dev:client\" \"npm run dev:server\"",
    "dev:client": "cd client && npm run dev",
    "dev:server": "cd server && npm run dev",
    "build": "cd server && npm run build && cd ../client && npm run build",
    "test": "cd server && npm run test && cd ../client && npm run test",
    "test:coverage": "cd server && npm run test:coverage",
    "test:e2e": "cd client && npm run test:e2e",
    "seed": "cd server && npm run seed",
    "lint": "cd client && npm run lint && cd ../server && npm run lint",
    "format": "prettier --write \"**/*.{ts,tsx,js,json,md}\""
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "prettier": "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.5.11"
  }
}
```

---

## 3. Package Configurations & Scripts

### 3.1. Client Package (`client/package.json`)
```json
{
  "name": "mindbalance-client",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint",
    "test": "vitest run",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@tanstack/react-query": "^5.28.0",
    "clsx": "^2.1.0",
    "framer-motion": "^11.0.24",
    "lucide-react": "^0.363.0",
    "next": "14.1.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.12.3",
    "tailwind-merge": "^2.2.2",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@playwright/test": "^1.42.1",
    "@types/node": "^20.11.30",
    "@types/react": "^18.2.70",
    "@types/react-dom": "^18.2.22",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.1.4",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.4.3",
    "vitest": "^1.4.0"
  }
}
```

### 3.2. Server Package (`server/package.json`)
```json
{
  "name": "mindbalance-server",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint src --ext .ts",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "seed": "tsx src/utils/seeder.ts"
  },
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-rate-limit": "^7.2.1",
    "firebase-admin": "^13.0.0",
    "helmet": "^7.1.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/node": "^20.11.30",
    "@types/supertest": "^6.0.2",
    "@typescript-eslint/eslint-plugin": "^7.4.0",
    "@typescript-eslint/parser": "^7.4.0",
    "eslint": "^8.57.0",
    "supertest": "^6.3.4",
    "tsx": "^4.7.1",
    "typescript": "^5.4.3",
    "vitest": "^1.4.0"
  }
}
```

---

## 4. Linting, Formatting & TypeScript Standards

### 4.1. TypeScript Strictness
Both `client/tsconfig.json` and `server/tsconfig.json` enforce strict compiler options:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "skipLibCheck": true,
    "esModuleInterop": true
  }
}
```

### 4.2. Prettier Configuration (`.prettierrc`)
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## 5. Step-by-Step Initial Setup Instructions

Follow these exact steps to clone, configure, and initialize the development environment:

### Step 1: Clone Repository & Open Workspace
```bash
cd "c:\Users\victus\Desktop\Mind balance"
```

### Step 2: Configure Environment Variables
Copy the template files into actual `.env` files:
```powershell
# Client environment
Copy-Item client\.env.example client\.env.local

# Server environment
Copy-Item server\.env.example server\.env
```

### Step 3: Install Dependencies Across All Workspaces
```bash
npm run install:all
```

### Step 4: Seed Synthetic Enterprise Database (For Demo & Testing)
Ensure your Firebase project has Firestore enabled and populate `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` in `server/.env`. Then execute:
```bash
npm run seed
```
*Output: Seeds 5 departments (Engineering, Design, Marketing, Customer Support, Legal), 35+ users, and 60 days of historical check-ins.*

### Step 5: Start Unified Development Environment
```bash
npm run dev
```
- **Frontend URL**: `http://localhost:3000`
- **Backend API URL**: `http://localhost:5000/api/v1`
- **API Health Check**: `http://localhost:5000/api/v1/health`

### Step 6: Execute Automated Test Suites
```bash
# Run backend unit and integration tests with coverage report
npm run test:coverage

# Run client-side end-to-end tests (Chromium / Firefox)
npm run test:e2e
```

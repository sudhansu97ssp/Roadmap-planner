# FAANG Nexus — Elite Prep OS (MERN + TypeScript)

A production-ready, full-stack MERN application for FAANG interview preparation.

## 🏗️ Architecture

```
faang-nexus/
├── backend/          # Node.js + Express + TypeScript + MongoDB
└── frontend/         # React 18 + TypeScript + Vite + Zustand
```

## ✨ Features

- **Dashboard** — Heatmap, streak tracker, domain readiness, weekly bar chart
- **DSA Practice** — 150+ questions with pattern guide, filters (difficulty, company, status)
- **CS Fundamentals** — OS, Networking, DBMS, Computer Architecture
- **System Design** — HLD/LLD patterns, scalability concepts
- **Java + Spring** — Core Java, JVM, Spring Boot, Microservices
- **React + Next.js** — Hooks, patterns, performance, Next.js rendering
- **Node.js + Express** — Event loop, streams, REST/GraphQL patterns
- **Behavioral** — STAR method, Amazon leadership principles
- **Mock Interviews** — Timed sessions, self-evaluation
- **Company Prep** — Company-specific question banks
- **Hour Logger** — Session tracking, CSV export
- **Revision Queue** — Spaced repetition (SM-2 algorithm)
- **Study Plan** — 48-week phased plan with daily schedule
- **AI/ML + Agents** — LLM fundamentals, vector DBs, RAG
- **Cloud + DevOps** — AWS/GCP, Kubernetes, CI/CD
- **Settings** — Theme, notifications, data export

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6+ (local or Atlas)
- npm or yarn

### Backend
```bash
cd backend
cp .env.example .env        # fill in your values
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables (backend/.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/faang-nexus
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| GET | /api/sessions | List study sessions |
| POST | /api/sessions | Create session |
| DELETE | /api/sessions/:id | Delete session |
| GET | /api/questions/status | Get solved question statuses |
| PUT | /api/questions/status/:qId | Toggle question status |
| GET | /api/stats/dashboard | Full dashboard data |
| GET | /api/stats/heatmap | 48-week heatmap data |

## 🧪 Tech Stack

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express 4
- **Language**: TypeScript 5
- **Database**: MongoDB with Mongoose 7
- **Auth**: JWT + bcryptjs
- **Validation**: express-validator
- **Security**: Helmet, CORS, rate-limiting

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Language**: TypeScript 5
- **State**: Zustand
- **Data Fetching**: TanStack Query v5
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Fonts**: Space Grotesk, JetBrains Mono, Orbitron (Google Fonts)

## 📁 File Delivery Order

Files are provided in this order to avoid message limits:

1. **Message 1** — README, backend config (package.json, tsconfig, .env)
2. **Message 2** — Backend models (User, StudySession, Question, QuestionStatus)
3. **Message 3** — Backend middleware + controllers
4. **Message 4** — Backend routes + index.ts
5. **Message 5** — Frontend config + types + api layer
6. **Message 6** — Frontend store + data (DSA questions)
7. **Message 7** — Frontend layout components (Sidebar, Topbar, Layout)
8. **Message 8** — Frontend common components
9. **Message 9** — Frontend pages Part 1 (Dashboard, TodaySession, DSAPractice)
10. **Message 10** — Frontend pages Part 2 (Logger, Revision, StudyPlan, remaining pages)
11. **Message 11** — Frontend App.tsx, main.tsx, globals.css, index.html

# TeamTask Pro Frontend

Static/mock Next.js frontend for the Team Task & Project Management System.

This app ports the old HTML/CSS/JS reference UI into a structured Next.js frontend with mock data, reusable components, feature folders, and routes ready for future FastAPI integration.

## Getting Started

Install dependencies, then run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Main Routes

- `/` prototype hub copied from the old static UI
- `/login`, `/register`, `/onboarding`
- `/dashboard`
- `/projects`, `/projects/[projectId]`
- `/tasks`, `/tasks/[taskId]`
- `/members`
- `/analytics`, `/calendar`, `/workload`, `/files`, `/automation`, `/clients`
- `/reference/[slug]` preview pages for old extra static screens

## Mock Data

Mock projects, tasks, members, activity, files, events, automations, and client reviews live in:

```text
src/lib/mock-data.ts
```

Future backend integration should replace the mock service calls in:

```text
src/lib/mock-api.ts
src/features/*/services/*.ts
```

## Checks

```bash
pnpm lint
pnpm build
```

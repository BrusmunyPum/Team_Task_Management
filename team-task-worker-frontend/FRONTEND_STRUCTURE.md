# Frontend Structure — TeamTask Pro

> Complete file map of every file in the frontend project.
> Use this as a reference when connecting the backend (FastAPI) API.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Folder Map](#folder-map)
3. [App Routes (Pages)](#app-routes-pages)
4. [Layout Components](#layout-components)
5. [UI Components](#ui-components)
6. [Feature Modules](#feature-modules)
7. [Shared Libraries](#shared-libraries)
8. [Hooks](#hooks)
9. [Types](#types)
10. [Styles](#styles)
11. [Config Files](#config-files)
12. [Backend Integration Guide](#backend-integration-guide)

---

## Architecture Overview

```
Next.js 16 (App Router) + TypeScript + Vanilla CSS
```

### Key patterns used

- **App Router** — File-based routing under `src/app/`
- **Route groups** — `(auth)`, `(workspace)`, `(onboarding)` for layout isolation
- **Feature modules** — `src/features/{name}/` bundles components, types, services, and mock data per domain
- **Mock-first** — All data comes from `src/lib/mock-data.ts`. Services call `src/lib/mock-api.ts`. Replace these with real API calls.
- **Design system** — "Cosmic Indigo" implemented via vanilla CSS class names in `globals.css`

---

## Folder Map

```
src/
├── app/                          # Next.js App Router (pages & layouts)
│   ├── (auth)/                   # Auth route group (no sidebar)
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (onboarding)/             # Onboarding route group (no sidebar)
│   │   └── onboarding/page.tsx
│   ├── (workspace)/              # Workspace route group (with sidebar + topbar)
│   │   ├── layout.tsx            # Wraps children in AppShell (sidebar + topbar)
│   │   ├── dashboard/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── projects/[projectId]/page.tsx
│   │   ├── tasks/page.tsx
│   │   ├── tasks/[taskId]/page.tsx
│   │   ├── my-tasks/page.tsx
│   │   ├── members/page.tsx
│   │   ├── calendar/page.tsx
│   │   ├── timeline/page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── activity/page.tsx
│   │   ├── workload/page.tsx
│   │   ├── files/page.tsx
│   │   ├── automation/page.tsx
│   │   ├── clients/page.tsx
│   │   └── settings/
│   │       ├── profile/page.tsx
│   │       └── workspace/page.tsx
│   ├── layout.tsx                # Root layout (html, body, fonts)
│   ├── page.tsx                  # Root "/" → redirects to /dashboard
│   └── globals.css               # All CSS (1,890+ lines)
│
├── components/                   # Shared reusable components
│   ├── layout/                   # Layout structure
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   └── SettingsTabs.tsx
│   └── ui/                       # Generic UI primitives
│       ├── ActionModalButton.tsx
│       ├── AppIcon.tsx
│       ├── Avatar.tsx
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── EmptyState.tsx
│       ├── Input.tsx
│       ├── MockSubmitButton.tsx
│       └── Modal.tsx
│
├── features/                     # Domain feature modules
│   ├── auth/
│   ├── comments/
│   ├── dashboard/
│   ├── members/
│   ├── organizations/
│   ├── projects/
│   └── tasks/
│
├── hooks/                        # Custom React hooks
│   ├── useDebounce.ts
│   ├── useDisclosure.ts
│   └── useLocalStorage.ts
│
├── lib/                          # Shared utilities & config
│   ├── api-client.ts
│   ├── auth.ts
│   ├── constants.ts
│   ├── mock-api.ts
│   ├── mock-data.ts
│   ├── routes.ts
│   └── utils.ts
│
├── styles/
│   └── theme.css
│
└── types/                        # Shared TypeScript types
    ├── api.types.ts
    ├── common.types.ts
    └── permission.types.ts
```

---

## App Routes (Pages)

### Auth Pages (no sidebar)

| Route | File | Type | Description |
|---|---|---|---|
| `/login` | `(auth)/login/page.tsx` | Server | Login form — email, password, sign in button → dashboard |
| `/register` | `(auth)/register/page.tsx` | Server | Register form — name, email, password, confirm → onboarding |

### Onboarding (no sidebar)

| Route | File | Type | Description |
|---|---|---|---|
| `/onboarding` | `(onboarding)/onboarding/page.tsx` | Server | 3-step wizard — org name, slug, invite, first project → dashboard |

### Workspace Pages (with sidebar + topbar)

| Route | File | Type | Description |
|---|---|---|---|
| `/dashboard` | `dashboard/page.tsx` | Server | 4 metric cards, task status flow (kanban preview), quick deadlines, activity feed |
| `/projects` | `projects/page.tsx` | Client | Project grid cards, search input, status filter, create project modal |
| `/projects/[projectId]` | `projects/[projectId]/page.tsx` | Server | Project detail — status breakdown, team members, task list |
| `/tasks` | `tasks/page.tsx` | Server | Wraps `TaskBoardClient` — kanban board with 4 columns |
| `/tasks/[taskId]` | `tasks/[taskId]/page.tsx` | Server | Task detail — assignee, priority, due, progress bar, comment activity |
| `/my-tasks` | `my-tasks/page.tsx` | Client | Personal queue — 4 metrics, search, segmented status filter (All/To do/In progress/Review/Done) |
| `/members` | `members/page.tsx` | Server | Member table (name, email, role, joined), permission matrix table |
| `/calendar` | `calendar/page.tsx` | Client | Search, event type filter, timeline event list, team owner cards |
| `/timeline` | `timeline/page.tsx` | Client | Search, status filter, milestone progress bars |
| `/analytics` | `analytics/page.tsx` | Server | 4 metrics, velocity bar chart, donut chart, task activity feed |
| `/activity` | `activity/page.tsx` | Client | Search, member filter, activity log with avatars |
| `/workload` | `workload/page.tsx` | Client | 4 metrics, sort toggle, color-coded capacity bars (red/yellow/green) |
| `/files` | `files/page.tsx` | Client | Search, owner filter, file table (name, file, owner, date) |
| `/automation` | `automation/page.tsx` | Client | Search, status filter, rule cards (Active/Draft/Paused) |
| `/clients` | `clients/page.tsx` | Client | Search, status filter, review cards (Approved/Waiting/Internal) |
| `/settings/profile` | `settings/profile/page.tsx` | Client | Avatar, name, email, role, timezone, password change, notification toggles, danger zone |
| `/settings/workspace` | `settings/workspace/page.tsx` | Client | Org form, org switcher, member summary metrics, workspace rules, billing card, danger zone |

> **Server** = static rendered (no `"use client"`)
> **Client** = interactive with `"use client"` (search, filters, modals)

### Other

| Route | File | Description |
|---|---|---|
| `/` | `page.tsx` | Redirects to `/dashboard` |
| `/_not-found` | (built-in) | Next.js 404 page |

---

## Layout Components

### `src/components/layout/`

| File | Export | Description | Used by |
|---|---|---|---|
| `AppShell.tsx` | `AppShell` | Main layout wrapper — renders Sidebar + Topbar + content area | `(workspace)/layout.tsx` |
| `Sidebar.tsx` | `Sidebar` | Left navigation — 13 nav items, brand logo, active state highlighting, sidebar note | `AppShell` |
| `Topbar.tsx` | `Topbar` | Top header — workspace name, page title, contextual action button. Hides button on settings pages. | `AppShell` |
| `SettingsTabs.tsx` | `SettingsTabs` | Tab bar — switches between Profile and Workspace settings with active state | Profile page, Workspace page |

---

## UI Components

### `src/components/ui/`

| File | Export | Description | Backend note |
|---|---|---|---|
| `ActionModalButton.tsx` | `ActionModalButton` | Modal trigger + form for 9 action types: task, project, member, event, milestone, file, automation, client, comment | 🔴 **Replace mock submit with real API calls** |
| `AppIcon.tsx` | `AppIcon` | SVG icon component — 25+ icons (dashboard, tasks, folder, search, save, close, etc.) | No change needed |
| `Avatar.tsx` | `Avatar` | Avatar circle with initials | No change needed |
| `Badge.tsx` | `Badge` | Status badge / pill | No change needed |
| `Button.tsx` | `Button` | Styled button wrapper | No change needed |
| `Card.tsx` | `Card` | Card container | No change needed |
| `EmptyState.tsx` | `EmptyState` | Empty state with icon and message | No change needed |
| `Input.tsx` | `Input` | Form input wrapper | No change needed |
| `MockSubmitButton.tsx` | `MockSubmitButton` | Fake submit button with "Saved!" feedback animation | 🔴 **Replace with real form submission** |
| `Modal.tsx` | `Modal` | Modal dialog wrapper | No change needed |

---

## Feature Modules

Each feature module follows the same structure:

```
features/{name}/
├── components/    # UI components specific to this feature
├── mock/          # Mock data (replace with API)
├── services/      # API service functions (replace mock calls with real API)
└── types/         # TypeScript type definitions
```

---

### `features/auth/` — Authentication

| File | Export | Purpose | Backend integration |
|---|---|---|---|
| `components/LoginForm.tsx` | `LoginForm` | Login form component (stub — not currently used, login is inline in page) | Wire to `POST /api/auth/login` |
| `components/RegisterForm.tsx` | `RegisterForm` | Register form component (stub — not currently used) | Wire to `POST /api/auth/register` |
| `mock/auth.mock.ts` | Mock data | Fake auth responses | 🔴 Remove after API integration |
| `services/auth.service.ts` | `authService` | `login()`, `register()` — currently calls `mockApi` | 🔴 Replace with real `apiClient` calls |
| `types/auth.types.ts` | `LoginInput`, `RegisterInput` | Type definitions for auth payloads | Keep — match to API contract |

---

### `features/tasks/` — Task Management

| File | Export | Purpose | Backend integration |
|---|---|---|---|
| `components/TaskBoard.tsx` | `TaskBoard` | Server wrapper that renders `TaskBoardClient` | No change needed |
| `components/TaskBoardClient.tsx` | `TaskBoardClient` | **Main task board** — kanban columns, search, task modal, create/edit form | 🔴 Replace `mock-data` imports with API calls |
| `components/TaskCard.tsx` | `TaskCard` | Individual task card (stub) | Can be used to refactor board cards |
| `components/TaskFilters.tsx` | `TaskFilters` | Filter controls (stub) | Can be expanded for API query params |
| `components/TaskForm.tsx` | `TaskForm` | Task create/edit form (stub) | Wire to `POST/PUT /api/tasks` |
| `components/TaskTable.tsx` | `TaskTable` | Table view of tasks (stub) | Can add as alternative to board view |
| `components/TaskStatusBadge.tsx` | `TaskStatusBadge` | Status pill (stub) | No change needed |
| `components/TaskPriorityBadge.tsx` | `TaskPriorityBadge` | Priority pill (stub) | No change needed |
| `mock/tasks.mock.ts` | Mock data | Fake task list | 🔴 Remove after API integration |
| `services/task.service.ts` | `taskService` | `list()`, `get(id)` — currently calls `mockApi` | 🔴 Replace with `apiClient` calls to `GET /api/tasks` |
| `types/task.types.ts` | `Task`, `TaskStatus`, `TaskPriority` | Type definitions | Keep — match to API response shape |

---

### `features/projects/` — Project Management

| File | Export | Purpose | Backend integration |
|---|---|---|---|
| `components/ProjectCard.tsx` | `ProjectCard` | Project card (stub) | Can be used to refactor project grid |
| `components/ProjectForm.tsx` | `ProjectForm` | Project create/edit form (stub) | Wire to `POST/PUT /api/projects` |
| `components/ProjectList.tsx` | `ProjectList` | Project list wrapper (stub) | Can be used to refactor projects page |
| `components/ProjectStatusBadge.tsx` | `ProjectStatusBadge` | Status badge (stub) | No change needed |
| `mock/projects.mock.ts` | Mock data | Fake project list | 🔴 Remove after API integration |
| `services/project.service.ts` | `projectService` | `list()`, `get(id)` — currently calls `mockApi` | 🔴 Replace with `apiClient` calls |
| `types/project.types.ts` | `Project` | Type definition | Keep — match to API response |

---

### `features/members/` — Team Members

| File | Export | Purpose | Backend integration |
|---|---|---|---|
| `components/MemberTable.tsx` | `MemberTable` | Member table (stub) | Can be used to refactor members page |
| `components/MemberRoleBadge.tsx` | `MemberRoleBadge` | Role badge (stub) | No change needed |
| `components/InviteMemberForm.tsx` | `InviteMemberForm` | Invite form (stub) | Wire to `POST /api/members/invite` |
| `mock/members.mock.ts` | Mock data | Fake member list | 🔴 Remove after API integration |
| `services/member.service.ts` | `memberService` | `list()` — currently calls `mockApi` | 🔴 Replace with `apiClient` calls |
| `types/member.types.ts` | `Member` | Type definition | Keep — match to API response |

---

### `features/organizations/` — Workspace / Organization

| File | Export | Purpose | Backend integration |
|---|---|---|---|
| `components/OrganizationForm.tsx` | `OrganizationForm` | Org name + slug form with save button | 🔴 Wire to `PUT /api/organizations/:id` |
| `components/OrganizationSwitcher.tsx` | `OrganizationSwitcher` | Dropdown to switch workspaces | 🔴 Wire to `GET /api/organizations` |
| `mock/organizations.mock.ts` | Mock data | Fake org list | 🔴 Remove after API integration |
| `services/organization.service.ts` | `organizationService` | `list()`, `create()` — currently calls `mockApi` | 🔴 Replace with `apiClient` calls |
| `types/organization.types.ts` | `Organization` | Type definition | Keep — match to API response |

---

### `features/comments/` — Comments / Activity

| File | Export | Purpose | Backend integration |
|---|---|---|---|
| `components/CommentForm.tsx` | `CommentForm` | Comment input (stub) | Wire to `POST /api/tasks/:id/comments` |
| `components/CommentList.tsx` | `CommentList` | Comment list (stub) | Wire to `GET /api/tasks/:id/comments` |
| `mock/comments.mock.ts` | Mock data | Fake comments | 🔴 Remove after API integration |
| `services/comment.service.ts` | `commentService` | `list()` — currently calls `mockApi` | 🔴 Replace with `apiClient` calls |
| `types/comment.types.ts` | `Comment` | Type definition | Keep — match to API response |

---

### `features/dashboard/` — Dashboard Widgets

| File | Export | Purpose | Backend integration |
|---|---|---|---|
| `components/DashboardStats.tsx` | `DashboardStats` | Metric cards (stub) | Wire to `GET /api/dashboard/stats` |
| `components/ProjectProgress.tsx` | `ProjectProgress` | Progress bar widget (stub) | Wire to `GET /api/dashboard/progress` |
| `components/RecentTasks.tsx` | `RecentTasks` | Recent tasks list (stub) | Wire to `GET /api/dashboard/recent` |
| `mock/dashboard.mock.ts` | Mock data | Fake stats | 🔴 Remove after API integration |
| `services/dashboard.service.ts` | `dashboardService` | Aggregation endpoints | 🔴 Replace with `apiClient` calls |
| `types/dashboard.types.ts` | `DashboardStats` | Type definition | Keep — match to API response |

---

## Shared Libraries

### `src/lib/`

| File | Export | Purpose | Backend note |
|---|---|---|---|
| `api-client.ts` | `apiClient<T>()` | Generic fetch wrapper — sends JSON to `API_BASE_URL`, throws on error | ✅ **Ready to use** — all services should call this |
| `auth.ts` | `mockCurrentUser`, `isAuthenticated()`, `canAccessWorkspace()` | Currently returns mock user, always `true` | 🔴 Replace with real JWT token check |
| `constants.ts` | `APP_NAME`, `DEFAULT_ORGANIZATION`, `API_BASE_URL`, `taskStatuses`, `taskPriorities` | App-wide constants. `API_BASE_URL` reads from `NEXT_PUBLIC_API_BASE_URL` env var, defaults to `http://localhost:8000` | ✅ Set env var to point to your FastAPI server |
| `mock-api.ts` | `mockApi` | Fake API simulation — returns mock data with delays | 🔴 **Remove entirely** when all services use `apiClient` |
| `mock-data.ts` | `teamMembers`, `projects`, `tasks`, `activity`, `calendarEvents`, `files`, `automations`, `clientReviews`, `timelineMilestones` | All static mock data — 240 lines | 🔴 **Remove entirely** when pages fetch from API |
| `routes.ts` | `routes` | Centralized route path constants — 20 routes | ✅ No change needed |
| `utils.ts` | Utility functions | Formatting, helpers | ✅ No change needed |

---

## Hooks

### `src/hooks/`

| File | Export | Purpose | Backend note |
|---|---|---|---|
| `useDebounce.ts` | `useDebounce(value, delay)` | Debounces a value for search inputs | ✅ Use for API search queries |
| `useDisclosure.ts` | `useDisclosure()` | Open/close state for modals and dropdowns | ✅ No change needed |
| `useLocalStorage.ts` | `useLocalStorage(key, initial)` | Persists state to localStorage | ✅ Can store JWT token here |

---

## Types

### `src/types/`

| File | Export | Purpose |
|---|---|---|
| `api.types.ts` | `ApiResponse<T>`, `PaginatedResponse<T>`, `ApiError` | Standard API response wrappers — use for all API calls |
| `common.types.ts` | `ID`, `Timestamped`, `SelectOption<T>` | Common utility types |
| `permission.types.ts` | `MemberRole`, `PermissionAction`, `permissionMatrix` | Role-based permission checks (Owner/Admin/Member) |

---

## Styles

| File | Purpose | Lines |
|---|---|---|
| `src/app/globals.css` | **All CSS** — layout, components, utilities, responsive breakpoints, design tokens | ~1,890 lines |
| `src/styles/theme.css` | CSS variable overrides for dark/light theme (minimal) | ~50 lines |

### CSS class naming convention

| Class | Usage |
|---|---|
| `.app-shell`, `.sidebar`, `.content` | Page layout structure |
| `.primary-action`, `.secondary-action` | Button styles |
| `.panel` | Card/container with shadow |
| `.metric-card`, `.metric-grid` | Dashboard stat cards |
| `.section-heading`, `.eyebrow` | Section titles |
| `.pill .danger/.warning/.calm/.progress/.neutral` | Status badges |
| `.form-stack`, `.form-label`, `.form-input` | Form elements |
| `.toolbar`, `.search`, `.segmented-control`, `.select-control` | Toolbar controls |
| `.task-card`, `.project-card`, `.member-card`, `.detail-card` | Content cards |
| `.board-grid`, `.board-column` | Kanban board layout |
| `.task-table`, `.member-table`, `.permission-table` | Data tables |
| `.timeline-list`, `.timeline-item` | Timeline/milestone layout |
| `.activity-list`, `.avatar` | Activity feed |
| `.auth-page`, `.auth-shell`, `.auth-form-card` | Auth page layout |
| `.settings-tabs` | Settings sub-navigation |
| `.danger-zone`, `.danger-action` | Destructive action panels |
| `.toggle-switch`, `.toggle-row`, `.toggle-track` | Toggle switches |
| `.modal-backdrop`, `.task-modal`, `.task-form` | Modal dialogs |
| `.empty-state`, `.error-banner` | State indicators |
| `.workload-list`, `.capacity-high/.capacity-medium/.capacity-low` | Workload bars |

---

## Config Files

| File | Purpose |
|---|---|
| `package.json` | Dependencies and scripts (`dev`, `build`, `start`, `lint`) |
| `tsconfig.json` | TypeScript configuration with `@/` path alias to `src/` |
| `next.config.ts` | Next.js configuration |
| `tailwind.config.ts` | Tailwind config (imported but CSS is mostly vanilla) |
| `.env.local` | **Create this** — set `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000` |

---

## Backend Integration Guide

### Step-by-step when your FastAPI backend is ready

#### Step 1 — Set the API URL

Create `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

#### Step 2 — Replace service files

Each `features/{name}/services/{name}.service.ts` currently calls `mockApi`. Replace with `apiClient`:

```typescript
// BEFORE (mock)
import { mockApi } from "@/lib/mock-api";
export const taskService = {
  list: () => mockApi.tasks.list(),
};

// AFTER (real API)
import { apiClient } from "@/lib/api-client";
import type { Task } from "@/features/tasks/types/task.types";
import type { PaginatedResponse } from "@/types/api.types";

export const taskService = {
  list: () => apiClient<PaginatedResponse<Task>>("/api/tasks"),
  get: (id: string) => apiClient<Task>(`/api/tasks/${id}`),
  create: (data: Partial<Task>) => apiClient<Task>("/api/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};
```

#### Step 3 — Update pages to fetch from services

Replace static imports:
```typescript
// BEFORE
import { tasks } from "@/lib/mock-data";

// AFTER
import { taskService } from "@/features/tasks/services/task.service";
const tasks = await taskService.list();
```

#### Step 4 — Add real auth

Update `src/lib/auth.ts`:
```typescript
// BEFORE
export function isAuthenticated() { return true; }

// AFTER
export function isAuthenticated() {
  return !!localStorage.getItem("access_token");
}
```

Add JWT token to `api-client.ts`:
```typescript
const token = localStorage.getItem("access_token");
headers: {
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
}
```

#### Step 5 — Remove mock files

After all services use real API, delete:
- `src/lib/mock-api.ts`
- `src/lib/mock-data.ts`
- All `features/{name}/mock/` folders

#### Files to modify per feature

| Feature | Service file to update | Pages that import mock data |
|---|---|---|
| **Auth** | `auth/services/auth.service.ts` | `login/page.tsx`, `register/page.tsx` |
| **Tasks** | `tasks/services/task.service.ts` | `tasks/page.tsx`, `tasks/[taskId]/page.tsx`, `my-tasks/page.tsx`, `dashboard/page.tsx` |
| **Projects** | `projects/services/project.service.ts` | `projects/page.tsx`, `projects/[projectId]/page.tsx`, `dashboard/page.tsx` |
| **Members** | `members/services/member.service.ts` | `members/page.tsx`, `workload/page.tsx`, `dashboard/page.tsx` |
| **Organizations** | `organizations/services/organization.service.ts` | `settings/workspace/page.tsx`, `onboarding/page.tsx` |
| **Comments** | `comments/services/comment.service.ts` | `tasks/[taskId]/page.tsx`, `activity/page.tsx` |
| **Dashboard** | `dashboard/services/dashboard.service.ts` | `dashboard/page.tsx`, `analytics/page.tsx` |

---

> **Total files: 87** | **Total pages: 22** | **Total components: 40** | **Total services: 7** | **Build: 32 routes, 0 errors**

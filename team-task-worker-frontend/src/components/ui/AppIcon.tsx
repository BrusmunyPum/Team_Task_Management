export type AppIconName =
  | "add"
  | "addBox"
  | "addTask"
  | "calendar"
  | "check"
  | "close"
  | "dashboard"
  | "error"
  | "folder"
  | "folderOff"
  | "groupAdd"
  | "groups"
  | "home"
  | "hub"
  | "login"
  | "personAdd"
  | "playlistAdd"
  | "rocket"
  | "save"
  | "search"
  | "searchOff"
  | "tasks"
  | "workspace";

type AppIconProps = {
  name: AppIconName;
  className?: string;
};

const paths: Record<AppIconName, React.ReactNode> = {
  add: <path d="M12 5v14M5 12h14" />,
  addBox: (
    <>
      <rect width="16" height="16" x="4" y="4" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  addTask: (
    <>
      <rect width="16" height="16" x="4" y="4" rx="3" />
      <path d="M12 8v8M8 12h8" />
      <path d="M7 18h10" />
    </>
  ),
  calendar: (
    <>
      <path d="M8 2v4M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="3" />
      <path d="M3 10h18" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  dashboard: (
    <>
      <rect width="7" height="9" x="3" y="3" rx="2" />
      <rect width="7" height="5" x="14" y="3" rx="2" />
      <rect width="7" height="9" x="14" y="12" rx="2" />
      <rect width="7" height="5" x="3" y="16" rx="2" />
    </>
  ),
  error: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6M12 17h.01" />
    </>
  ),
  folder: (
    <>
      <path d="M3 7a3 3 0 0 1 3-3h4l2 3h6a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z" />
      <path d="M3 10h18" />
    </>
  ),
  folderOff: (
    <>
      <path d="m3 3 18 18" />
      <path d="M3 7a3 3 0 0 1 3-3h4l2 3h6a3 3 0 0 1 3 3v7" />
      <path d="M18 20H6a3 3 0 0 1-3-3v-7" />
    </>
  ),
  groupAdd: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6M16 11h6" />
    </>
  ),
  groups: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  home: (
    <>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  hub: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="m7 7 3 3M17 7l-3 3M7 17l3-3M17 17l-3-3" />
    </>
  ),
  login: (
    <>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="m10 17 5-5-5-5" />
      <path d="M15 12H3" />
    </>
  ),
  personAdd: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M20 8v6M17 11h6" />
    </>
  ),
  playlistAdd: (
    <>
      <path d="M4 6h10M4 12h8M4 18h8" />
      <path d="M18 14v6M15 17h6" />
    </>
  ),
  rocket: (
    <>
      <path d="M4.5 16.5c-1 1-1.5 3-1.5 4.5 1.5 0 3.5-.5 4.5-1.5" />
      <path d="M9 15 4 10l4-2 3-5c3.5.5 6.5 3.5 7 7l-5 3Z" />
      <circle cx="14" cy="8" r="1.5" />
    </>
  ),
  save: (
    <>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
      <path d="M17 21v-8H7v8M7 3v5h8" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  searchOff: (
    <>
      <path d="m3 3 18 18" />
      <path d="M10.6 10.6a3 3 0 0 0 3.8 3.8" />
      <path d="M17 17a7 7 0 0 1-10-10" />
      <path d="M9.5 4.2A7 7 0 0 1 19 11c0 1.2-.3 2.4-.8 3.4" />
    </>
  ),
  tasks: (
    <>
      <path d="m4 12 4 4L20 4" />
      <path d="M4 20h16" />
    </>
  ),
  workspace: (
    <>
      <rect width="8" height="8" x="3" y="3" rx="2" />
      <rect width="8" height="8" x="13" y="3" rx="2" />
      <rect width="8" height="8" x="3" y="13" rx="2" />
      <rect width="8" height="8" x="13" y="13" rx="2" />
    </>
  ),
};

export function AppIcon({ name, className = "" }: AppIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`app-icon ${className}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}

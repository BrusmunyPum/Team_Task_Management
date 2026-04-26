import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Sidebar />
      <main className="content" id="main-content" tabIndex={-1}>
        <Topbar />
        {children}
      </main>
      <MobileNav />
    </div>
  );
}

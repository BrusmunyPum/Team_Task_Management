import Link from "next/link";
import { AppIcon } from "@/components/ui/AppIcon";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { routes } from "@/lib/routes";

export default function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-intro">
          <Link className="brand" href={routes.dashboard}>
            <span className="brand-mark" aria-hidden="true">
              <AppIcon name="hub" />
            </span>
            <span>
              <strong>TeamTask Pro</strong>
              <small>Project Management</small>
            </span>
          </Link>
          <div>
            <p className="eyebrow">Secure workspace access</p>
            <h1>Welcome back to your delivery hub</h1>
          </div>
          <p>
            Sign in to manage projects, task ownership, due dates, and team
            collaboration from the V1 prototype.
          </p>
        </div>

        <div className="auth-form-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Login</p>
              <h2>Sign in</h2>
            </div>
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import { AppIcon } from "@/components/ui/AppIcon";
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
          <form className="form-stack">
            <label className="form-label">
              Email
              <input
                className="form-input"
                type="email"
                defaultValue="maya@teamtask.test"
              />
            </label>
            <label className="form-label">
              Password
              <input
                className="form-input"
                type="password"
                defaultValue="password"
              />
            </label>
            <Link className="primary-action" href={routes.dashboard}>
              <AppIcon name="login" />
              Sign in
            </Link>
            <p className="form-help">
              Do not have an account?{" "}
              <Link className="auth-link" href={routes.register}>
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

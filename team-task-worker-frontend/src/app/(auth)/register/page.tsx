import Link from "next/link";
import { AppIcon } from "@/components/ui/AppIcon";
import { routes } from "@/lib/routes";

export default function RegisterPage() {
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
            <p className="eyebrow">New workspace member</p>
            <h1>Create your account</h1>
          </div>
          <p>
            Register first, then create an organization, invite teammates, and
            start the first project.
          </p>
        </div>

        <div className="auth-form-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Register</p>
              <h2>Account details</h2>
            </div>
          </div>
          <form className="form-stack">
            <label className="form-label">
              Full name
              <input className="form-input" type="text" defaultValue="Maya Chen" />
            </label>
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
              <input className="form-input" type="password" defaultValue="password" />
            </label>
            <label className="form-label">
              Confirm password
              <input className="form-input" type="password" defaultValue="password" />
            </label>
            <p className="form-help">
              Use at least 8 characters with a number and a letter.
            </p>
            <Link className="primary-action" href={routes.onboarding}>
              <AppIcon name="personAdd" />
              Create account
            </Link>
            <p className="form-help">
              Already registered?{" "}
              <Link className="auth-link" href={routes.login}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

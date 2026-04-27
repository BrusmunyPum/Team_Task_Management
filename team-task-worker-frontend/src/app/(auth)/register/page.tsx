import Link from "next/link";
import { AppIcon } from "@/components/ui/AppIcon";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
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
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
